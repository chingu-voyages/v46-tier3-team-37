import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma'

async function main() {
// These are variables for the transactions
// - Will allow us to have an Open, Active, and Completed transaction
// One week ago
const oneWeekAgoStartDate = new Date();
oneWeekAgoStartDate.setDate(oneWeekAgoStartDate.getDate() - 7);
const oneWeekAgoEndDate = new Date();
oneWeekAgoEndDate.setDate(oneWeekAgoEndDate.getDate() - 6);

// Started today and ends in 2 days
const today = new Date();
const twoDaysLater = new Date();
twoDaysLater.setDate(today.getDate() + 2);

// In 1 week 
const oneWeekLater = new Date();
oneWeekLater.setDate(today.getDate() + 7);
const twoDaysAfterOneWeek = new Date();
twoDaysAfterOneWeek.setDate(oneWeekLater.getDate() + 2);

  const user1 = await prisma.user.create({
    data: {
      email: 'james@raw.com',
      username: 'james',
      password: '123',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'sean@raw.com',
      username: 'sean',
      password: '123',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'yong@raw.com',
      username: 'yong',
      password: '123',
    },
  });

  const user4 = await prisma.user.create({
    data: {
      email: 'harrison@raw.com',
      username: 'harrison',
      password: '123',
    },
  });

  const locationAustin = await prisma.location.create({
    data: {
      name: 'Austin, Texas',
      latitude: 30.2672,
      longitude: -97.7431,
    },
  });

  const item1 = await prisma.item.create({
    data: {
      name: 'Hammer',
      description: 'Bang on wall - I hit nails, I try not to hit thumbs... But sometimes I do try!',
      price: 2,
      owner: {
        connect: { id: user1.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      text: 'It was a hammer that nailed it. Grip was meh though',
      reviewer: {
        connect: { id: user2.id },
      },
      item: {
        connect: { id: item1.id },
      },
    },
  });

  await prisma.transaction.create({
    data: {
      status: 'COMPLETED',
      renter: {
        connect: { id: user2.id },
      },
      item: {
        connect: { id: item1.id },
      },
      startDate: oneWeekAgoStartDate,
      endDate: oneWeekAgoEndDate,
      fee: 4,
    },
  });
  await prisma.transaction.create({
    data: {
      status: 'ACTIVE',
      renter: {
        connect: { id: user2.id },
      },
      item: {
        connect: { id: item1.id },
      },
      startDate: today,
      endDate: twoDaysLater,
      fee: 4,
    },
  });
  await prisma.transaction.create({
    data: {
      status: 'OPEN',
      renter: {
        connect: { id: user2.id },
      },
      item: {
        connect: { id: item1.id },
      },
      startDate: oneWeekLater,
      endDate: twoDaysAfterOneWeek,
      fee: 4,
    },
  });

  await prisma.category.create({
    data: {
      name: 'hand tool',
      items: {
        connect: { id: item1.id }
      }
    }
  })

  await prisma.image.create({
    data: {
      url: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/6/7/67716_W3.jpg',
      item: {
        connect: { id: item1.id}
      }
    }
  })

  console.log('the data is seeded!')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
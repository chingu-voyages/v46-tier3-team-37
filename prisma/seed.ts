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


// USERS - Password = 123
  const user1 = await prisma.user.create({
    data: {
      email: 'james@raw.com',
      username: 'james',
      name: 'james',
      password: '$2b$10$051D0g/g47D.DlM6IxgNHumZu6wiSMqda8AlOCluL/19X5oivIDby',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'sean@raw.com',
      username: 'sean',
      name: 'sean',
      password: '$2b$10$051D0g/g47D.DlM6IxgNHumZu6wiSMqda8AlOCluL/19X5oivIDby',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'yong@raw.com',
      username: 'yong',
      name: 'yong',
      password: '$2b$10$051D0g/g47D.DlM6IxgNHumZu6wiSMqda8AlOCluL/19X5oivIDby',
    },
  });

  const user4 = await prisma.user.create({
    data: {
      email: 'harrison@raw.com',
      username: 'harrison',
      name: 'harrison',
      password: '$2b$10$051D0g/g47D.DlM6IxgNHumZu6wiSMqda8AlOCluL/19X5oivIDby',
    },
  });


  //LOCATIONS
  const locationAustin = await prisma.location.create({
    data: {
      name: 'Austin, Texas',
      latitude: 30.2672,
      longitude: -97.7431,
    },
  });

  //ITEMS
  const hammer2 = await prisma.item.create({
    data: {
      name: 'Hammer',
      description: 'I am the real one!',
      price: 2,
      owner: {
        connect: { id: user1.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });

  const hammer3 = await prisma.item.create({
    data: {
      name: 'Hammer',
      description: 'Many like meee',
      price: 5,
      owner: {
        connect: { id: user1.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });

  const item1 = await prisma.item.create({
    data: {
      name: 'Hammer',
      description: 'Bang on wall - I hit nails, I try not to hit thumbs... But sometimes I do try!',
      price: 10,
      owner: {
        connect: { id: user1.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });

  const item2 = await prisma.item.create({
    data: {
      name: 'Drill/Driver',
      description: 'The BAUER™ Brushless Cordless 1/2 in. Drill/Driver is designed with a high performance brushless motor for up to 60% longer runtime*, a max torque of 405 in. lbs., and a max speed of 1900 RPM for demanding fastening applications.',
      price: 5,
      owner: {
        connect: { id: user1.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });

  const item3 = await prisma.item.create({
    data: {
      name: 'Belt Sander',
      description: 'The 1/4 HP motor on this belt sander delivers speeds up to 3500 FPM for fast stock removal and a smooth finish. This sander has adjustable tracking to keep the belt in perfect alignment. The sturdy housing, die cast aluminum table, and rubber feet work together to reduce vibration. The sander is equipped with a dust collection port to keep the work area clean.',
      price: 10,
      owner: {
        connect: { id: user1.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });

  const item4 = await prisma.item.create({
    data: {
      name: 'Wet/Dry Vacuum',
      description: 'The BAUER™ 3 Gallon* Wet/Dry Vacuum delivers 3 peak horsepower** of powerful suction for cleaning up liquids and spills. This wet/dry vac is designed with an ergonomic top carrying handle for maximum comfort, an accessory holder for easy tool organization, and a lightweight design ideal for shop and home use.',
      price: 50,
      owner: {
        connect: { id: user1.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });
  const item5 = await prisma.item.create({
    data: {
      name: 'High Performance Contractor Grade Hose',
      description: 'The NIAGARA™ High Performance Contractor Grade Hose delivers the professional performance and quality needed for extreme weather. With a 500 PSI burst rating and 2X the abrasion resistance** this hose was designed to tackle the hardest jobs. The easy-connect rotating grips prevent the hose from twisting, while the 100 ft. length makes it ideal for farms, ranches and other large properties',
      price: 20,
      owner: {
        connect: { id: user1.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });
  const item6 = await prisma.item.create({
    data: {
      name: '2000 PSI Max Performance Electric Pressure Washer',
      description: 'The 2000 PSI Max Performance Electric Pressure Washer from BAUER™ delivers ultimate cleaning performance with more power than standard electric pressure washers. Featuring 2000 PSI output, powerful enough to strip a wooden deck, remove road tar, tree sap and insect stains from cars, heavy mildew, oil and rust stains, combined with the convenience of quick-connect fittings and a built-in hose reel, this pressure washer is rugged and easy to use. Large 10 in., flat-free wheels make this pressure washer easy to transport, and the professional spray gun with metal wand provides long-lasting durability.',
      price: 75,
      owner: {
        connect: { id: user2.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });
  const item7 = await prisma.item.create({
    data: {
      name: '3500 Watt SUPER QUIET Inverter Generator with CO SECURE Technology',
      description: 'This PREDATOR® SUPER QUIET™ 3500 Max Starting Watt, 3000 Max Running Watt Inverter Generator uses a reliable PREDATOR® 212cc engine to deliver clean, efficient power where its needed most. With a 2.3 gallon fuel tank, this closed frame inverter generator delivers runtime up to 11 hours @ 25% load. Designed for efficiency, this inverter generator is built with Electronic Speed Control Mode (ESC Mode) to optimize engine performance, maximize runtime and lower fuel consumption. Rated at 56 dBA, this 3500 max starting watt closed-frame inverter generator delivers plenty of power while operating at the same volume as a quiet conversation. The lightweight, compact design is ideal for RVs and other applications. Smooth-rolling wheels provide effortless portability. Comes with an RV adapter.',
      price: 90,
      owner: {
        connect: { id: user2.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });
  
  const item8 = await prisma.item.create({
    data: {
      name: 'Mechanics Tool Set, 225 Piece',
      description: 'This high quality mechanics tool set includes the most used automotive and mechanics wrenches, pliers, ratchets, sockets and drivers in SAE and metric sizes. Constructed of durable chrome vanadium, this mechanics tool set is built to last. Includes a custom storage case to keep tools organized and protected.',
      price: 10,
      owner: {
        connect: { id: user2.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });
  const item9 = await prisma.item.create({
    data: {
      name: '24 in. Ratcheting Bar Clamp/Spreader',
      description: 'This ratcheting clamp exerts a force of 287 lb. for pressure-gluing and a firm hold while cutting. The handy tool pulls double duty by easily converting from a ratcheting bar clamp to a spreader in seconds with no tools required. Easy, single-handed operation and a quick release button for added convenience.',
      price: 12,
      owner: {
        connect: { id: user2.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });
  const item10 = await prisma.item.create({
    data: {
      name: '12 in. Bolt Cutters',
      description: 'Designed for maximum leverage, these bolt cutters are ideal for cutting rods, bolts, bars and chains. The high carbon machined steel jaws on the bolt cutters are fully adjustable to maintain a perfect cutting edge. Angled grips for comfortable, easy handling.',
      price: 2,
      owner: {
        connect: { id: user2.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });
  const item11 = await prisma.item.create({
    data: {
      name: 'Professional Radiator Hose Pick Set, 6 Piece',
      description: 'ICON™ Professional Tools are designed for the master technician, and uniquely designed for unparalleled strength and durability. With a durable special alloy steel shaft, long pick and hooked tip this, 6 Piece radiator hose set aids in a variety of applications including removing stubborn radiator hoses and extracting cotter pins. Like all ICON™ hand tools, this pick set is backed with a hassle free, lifetime warranty.',
      price: 8,
      owner: {
        connect: { id: user2.id },
      },
      location: {
        connect: { id: locationAustin.id },
      },
    },
  });


  //REVIEWS
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


  //TRANSACTIONS
  await prisma.transaction.create({
    data: {
      status: 'COMPLETED',
      renter: {
        connect: { id: user2.id },
      },
      item: {
        connect: { id: item3.id },
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
        connect: { id: item5.id },
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
        connect: { id: user1.id },
      },
      item: {
        connect: { id: item7.id },
      },
      startDate: oneWeekLater,
      endDate: twoDaysAfterOneWeek,
      fee: 4,
    },
  });
  await prisma.transaction.create({
    data: {
      status: 'HOLD',
      renter: {
        connect: { id: user1.id },
      },
      item: {
        connect: { id: item8.id },
      },
      startDate: today,
      endDate: twoDaysLater,
      fee: 4,
    },
  });

  //CATEGORIES
  await prisma.category.create({
    data: {
      name: 'Hand Tools',
      items: {
        connect: [
          { id: item1.id },
          { id: item8.id },
          { id: hammer2.id },
          { id: hammer3.id },
          { id: item8.id },
          { id: item9.id },
          { id: item10.id },
          { id: item11.id }
        ]
      }
    }
  })

  await prisma.category.create({
    data: {
      name: 'Power Tools',
      items: {
        connect: [
          { id: item2.id },
          { id: item3.id },
          { id: item4.id }
        ]
      }
    }
  })

  await prisma.category.create({
    data: {
      name: 'Lawn & Garden',
      items: {
        connect: [
          { id: item5.id }
        ]
      }
    }
  })

  await prisma.category.create({
    data: {
      name: 'Generators & Engines',
      items: {
        connect: [
          { id: item6.id },
          { id: item7.id }
        ]
      }
    }
  })

  //IMAGES
  await prisma.image.create({
    data: {
      url: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/6/7/67716_W3.jpg',
      item: {
        connect: { id: item1.id}
      }
    }
  })
  await prisma.image.create({
    data: {
      url: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/5/8/58952_W3.jpg',
      item: {
        connect: { id: item2.id}
      }
    }
  })
  await prisma.image.create({
    data: {
      url: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/5/8/58359_W3.jpg',
      item: {
        connect: { id: item3.id}
      }
    }
  })
  await prisma.image.create({
    data: {
      url: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/6/4/64753_W3.jpg',
      item: {
        connect: { id: item4.id}
      }
    }
  })
  await prisma.image.create({
    data: {
      url: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/5/8/58739_W3.jpg',
      item: {
        connect: { id: item5.id}
      }
    }
  })
  await prisma.image.create({
    data: {
      url: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/5/6/56877_W3.jpg',
      item: {
        connect: { id: item6.id}
      }
    }
  })
  await prisma.image.create({
    data: {
      url: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/5/9/59137_W3.jpg',
      item: {
        connect: { id: item7.id}
      }
    }
  })
  await prisma.image.create({
    data: {
      url: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/6/2/62664_W3.jpg',
      item: {
        connect: { id: item8.id}
      }
    }
  })
  await prisma.image.create({
    data: {
      url: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/i/m/image_8263.jpg',
      item: {
        connect: { id: item9.id}
      }
    }
  })
  await prisma.image.create({
    data: {
      url: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/6/0/60677_I.jpg',
      item: {
        connect: { id: item10.id}
      }
    }
  })
  await prisma.image.create({
    data: {
      url: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/5/7/57573_W3.jpg',
      item: {
        connect: { id: item11.id}
      }
    }
  })

  await prisma.$queryRaw`

  DROP PROCEDURE IF EXISTS public.update_transaction_status();
  
  CREATE OR REPLACE PROCEDURE public.update_transaction_status(
    )
  LANGUAGE 'plpgsql'
  AS $BODY$
  DECLARE transaction RECORD;
  BEGIN
  RAISE NOTICE 'updating transaction.status';
  FOR transaction IN
  SELECT * FROM public."Transaction"
    LOOP
      IF CURRENT_DATE >= transaction."endDate" THEN
        UPDATE public."Transaction"
        SET status = 'COMPLETED'
        WHERE id = transaction.id;
        RAISE NOTICE 'transaction % updated to completed!', transaction.id;
      END IF;
      IF CURRENT_DATE >= transaction."startDate" AND CURRENT_DATE <= transaction."endDate" THEN
        UPDATE public."Transaction"
        SET status = 'ACTIVE'
        WHERE id = transaction.id;
        RAISE NOTICE 'transaction % updated to active!', transaction.id;
      END IF;
    END LOOP;
  END
  
  $BODY$;
  ALTER PROCEDURE public.update_transaction_status()
      OWNER TO postgres;
  `

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
import { getUserListings } from '@/app/actions';
import Button from '@/components/uiComponents/Button';
import Card from '@/components/uiComponents/Card';
import { ItemComplete } from '@/types/schemaTypes';

export default async function Listings() {
  const listings = await getUserListings();

  function hasActive(item: ItemComplete): boolean {
    const isActive = item.Transaction.some(
      (t) => t.status === 'ACTIVE'
    );
    return isActive;
  }

  const items: ItemComplete[] = listings?.items || [];
  return (
    <section className='flex flex-col items-center gap-5 mt-4'>
      <ul className='flex gap-2 flex-col md:w-1/2'>
        {items &&
          items.map((item, index) => (
            <li key={index}>
              <Card
                active={hasActive(item)}
                imageSrc={
                  item.images[0] && item.images[0].url
                }
                variant={'detailed'}
                title={item.name}
                description={item.description}
                transactions={item.Transaction.map(
                  (transaction) => ({
                    item: {
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      locationId: item.locationId,
                      ownerId: item.ownerId,
                      images: item.images,
                    },
                    ...transaction,
                  })
                )}
                price={item.price.toString()}
              >
                <Button
                  variant={'thin'}
                  size={'sm'}
                  cardType='detailed'
                >
                  edit
                </Button>
              </Card>
            </li>
          ))}
      </ul>
      <a
        className='w-full flex justify-center  md:w-1/2'
        href='/profile/listings/newListing'
      >
        <Button className='w-full md:w-1/2'>
          Create Listing
        </Button>
      </a>
    </section>
  );
}

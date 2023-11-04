import { getUserListings } from "@/app/actions";
import Button from "@/components/uiComponents/Button";
import Card from "@/components/uiComponents/Card";
import { ItemComplete } from "@/types/schemaTypes";

export default async function Listings() {
    const listings = await getUserListings();

    function hasActive(item: ItemComplete): boolean {
        const isActive = item.Transaction.some(t => t.status === 'ACTIVE')
        return isActive;
    }

    return (
        <section className="flex flex-col items-center gap-5 mt-4">
            <ul className="flex gap-2 flex-col md:w-1/2">
                {
                    listings && listings.items.map((item) => (
                        <li key={1}>
                            <Card active={hasActive(item)} variant={'detailed'} title={item.name} description={item.description} price={item.price.toString()}>
                                <Button variant={'thin'} size={'sm'} cardType='detailed'>edit</Button>
                            </Card>
                        </li>
                    ))
                }
            </ul>
            <a className="w-full flex justify-center  md:w-1/2" href="/profile/listings/newListing" ><Button className="w-full md:w-1/2">Create Listing</Button></a>
        </section>
    )
}
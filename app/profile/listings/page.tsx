import Button from "@/components/uiComponents/Button";
import Card from "@/components/uiComponents/Card";

export default function Listings() {
    return (
        <section className="flex flex-col items-center gap-5 mt-4">
            <ul className="flex gap-2 flex-col md:w-1/2">
                <li key={1}>
                    <Card active={true} variant={'detailed'} title={'lawn mower'} description="Green eggs and lawn lowers! I cut grass and pass gas.">
                        <Button variant={'thin'} size={'sm'} cardType='detailed'>edit</Button>
                    </Card>
                </li>
                <li key={1}>
                    <Card variant={'detailed'} title={'lawn mower'} description="Green eggs and lawn lowers! I cut grass and pass gas.">
                        <Button variant={'thin'} size={'sm'} cardType='detailed'>edit</Button>
                    </Card>
                </li>
                <li key={1}>
                    <Card variant={'detailed'} title={'lawn mower'} description="Green eggs and lawn lowers! I cut grass and pass gas.">
                        <Button variant={'thin'} size={'sm'} cardType='detailed'>edit</Button>
                    </Card>
                </li>
            </ul>
            <a className="w-full flex justify-center  md:w-1/2" href="/profile/listings/newListing" ><Button className="w-full md:w-1/2">Create Listing</Button></a>
        </section>
    )
}
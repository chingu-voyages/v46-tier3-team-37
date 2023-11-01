import { activeUserListings } from "@/app/actions";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Button from "@/components/uiComponents/Button";
import Card from "@/components/uiComponents/Card";
import { ItemWithImages } from "@/types/schemaTypes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Listings() {
    const session = await getServerSession(options);
    if (!session) redirect('/login');

    const activeRentals = await activeUserListings(session.user.id)
    return (
        <section className="flex justify-center mt-4">
            <ul className="flex gap-2 flex-col md:w-1/2">
                {activeRentals?.items.map((item) => (
                    <li key={item.id}>
                        <Card active={true} variant={'detailed'} title={item.name} description={item.description} price={item.price.toString()}>
                            <Button variant={'thin'} size={'sm'} cardType='detailed'>edit</Button>
                        </Card>
                    </li>
                ))}
                {/* example of open item */}
                <Card active={false} variant={'detailed'} title={'lawn mower'} description={'fkdajfljasdfjadsf'} price={'100000'}>
                    <Button variant={'thin'} size={'sm'} cardType='detailed'>edit</Button>
                </Card>
            </ul>
        </section>
    )
}
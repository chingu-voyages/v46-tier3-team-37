'use client'
import { getUserRentals } from "@/app/actions";
import Button from "@/components/uiComponents/Button";
import Card from "@/components/uiComponents/Card";

export default function RentalList({ transactions }: {transactions: Awaited<ReturnType<typeof getUserRentals>>}) {
    return (
        <section className="flex justify-center mt-4">
            <ul className="flex lg:w-1/2  gap-2 flex-col">
                {transactions.map(t => (
                    <li key={t.id}>
                        <Card variant={'default'} title={t.item.name} imageSrc={t.item.images[0].url} description={t.item.description}>
                            <Button variant={'thin'} size={'sm'} cardType="default">More Info</Button>
                            <Button variant={'thin'} size={'sm'} cardType="default">cancel</Button>
                        </Card>
                    </li>
                ))}
            </ul>
        </section>
    )
}
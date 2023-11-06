'use client'
import getRenterById, { getUserRentals } from "@/app/actions";
import Button from "@/components/uiComponents/Button";
import Card from "@/components/uiComponents/Card";
import { Transaction } from "@/types/schemaTypes";
import { useState } from "react";

export default function RentalList({ transactions }: { transactions: Awaited<ReturnType<typeof getUserRentals>> }) {

    const [isExpanded, setIsExpanded] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState<typeof transactions[0]>()

    const showDetails = (transaction: typeof transactions[0]) => {
        if (isExpanded && transaction.id !== transactionDetails!.id) {
            setTransactionDetails(transaction);
        } else {
            setIsExpanded(!isExpanded);
            setTransactionDetails(transaction);
        }
    }

    return (
        <section className="flex justify-between mt-4 lg:mx-24">
            <ul className={`${isExpanded ? 'flex w-1/2 gap-2 m-auto flex-col' : 'flex lg:w-1/2 gap-2 m-auto flex-col'}`}>
                {transactions.map(t => (
                    <li key={t.id}>
                        <Card variant={'default'} title={t.item.name} imageSrc={t.item.images[0].url} description={t.item.description}>
                            <Button onClick={(e) => { console.log(e);showDetails(t)}} variant={'thin'} size={'sm'} cardType="default">More Info</Button>
                            <Button variant={'thin'} size={'sm'} cardType="default">cancel</Button>
                        </Card>
                    </li>
                ))}
            </ul>
            {
                isExpanded && transactionDetails &&
                <ul className="w-1/2  mr-auto px-8 my-auto">
                    <li><b>Item:</b> {transactionDetails.item.name}</li>
                    <li><b>fee:</b> {transactionDetails.fee}</li>
                    <li><b>start date:</b> {transactionDetails.startDate.toISOString().split('T')[0]}</li>
                    <li><b>end date:</b> {transactionDetails.endDate.toISOString().split('T')[0]}</li>
                    <li><b>status:</b> {transactionDetails.status}</li>
                </ul>
            }
        </section>
    )
}
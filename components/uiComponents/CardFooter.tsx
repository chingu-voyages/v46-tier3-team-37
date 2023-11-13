import { Transaction } from "@/types/schemaTypes";
import { cva, type VariantProps } from "class-variance-authority";
import React from 'react';
import { ActiveUser } from "./Card";

const CardFooterVariants = cva(
    "flex dark:bg-foregroundPrimary",
    {
        variants: {
            variant: {
                default: "my-3 justify-end gap-5",
                detailed: "bg-[white] flex-col gap-4 shadow-md font-normal text-sm py-4",
            },
            size: {
                default: "w-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

interface CardFooterVariantProps
    extends React.HTMLAttributes<HTMLImageElement>,
    VariantProps<typeof CardFooterVariants> {
    price?: string,
    show?: boolean,
    parentVariant?: "default" | "detailed" | null | undefined,
    transactions?: Transaction[],
    activeRenters?: Array<ActiveUser> | null,
    children: React.ReactNode | React.ReactNode[]
}

export default function CardFooter({ variant, parentVariant, size, price, children, show, transactions, activeRenters }: CardFooterVariantProps) {
    variant = parentVariant;
    let btnChildren: React.ReactNode | React.ReactNode[];;

    React.Children.toArray(children)
    React.Children.forEach(children, (child, index) => {
        if (!React.isValidElement(child)) return;
        if (child.type === 'button') {
            btnChildren = children;
        } else { return }
})
    return (
        <div className={CardFooterVariants({ variant, size })}>
            <span className={`${show && variant === 'detailed' ? 'self-start px-4' : 'hidden self-start'} `}>
                <p><b>price:</b> {price}</p>
                <div>
                    {transactions && transactions.map((t) => (
                        t.status === 'ACTIVE' &&
                            <ul key={t.id}>
                                { activeRenters && activeRenters.map((user, index) => (
                                    <li key={index}>
                                        <b>Current renter: </b>{user?.id === t.renterId && user.username}
                                    </li>
                                ))
                                }
                                <li>
                                    <b>start Date:</b> {t.startDate.toISOString().split('T')[0]}
                                </li>
                                <li>
                                    <b>end date:</b> {t.endDate.toISOString().split('T')[0]}
                                </li>
                            </ul>
                    ))}
                </div>
            </span>
            <div className="flex justify-end gap-3">
                {React.Children.map(btnChildren, (child) => <>{child}</>)}
            </div>
        </div>
    )

}

import { cva, type VariantProps } from "class-variance-authority";
import React from 'react';

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
    show: boolean,
    parentVariant?: "default" | "detailed" | null | undefined,
    children: React.ReactNode | React.ReactNode[]
}

export default function CardFooter({ variant, parentVariant, size, price, children, show }: CardFooterVariantProps) {
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
            <span className={`${show && variant === 'detailed' ? 'self-start' : 'hidden self-start'} `}>
                <p><b>price:</b> {price}</p>
                <p>other details TODO</p>
            </span>
            <div className="flex justify-end gap-3">
                {React.Children.map(btnChildren, (child) => <>{child}</>)}
            </div>
        </div>
    )

}

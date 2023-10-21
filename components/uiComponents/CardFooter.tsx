import { cva, type VariantProps } from "class-variance-authority";
import React from 'react';

const CardFooterVariants = cva(
    "flex px-5 ",
    {
        variants: {
            variant: {
                default: "my-3 justify-end gap-5 max-h-5",
                detailed: "bg-[white] flex-col gap-4 shadow-md dark:bg-foregroundPrimary font-normal text-sm py-4",
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

    let detailedBtn: React.ReactNode | React.ReactNode[] = children;
    let defaultBtn: React.ReactNode = children;

    React.Children.toArray(children)
    React.Children.forEach(children, (child, index) => {
        if (!React.isValidElement(child)) return;
        if (child.type === 'button' && parentVariant === 'default' && index === 0) {
            defaultBtn = child
        } else { return }
    })
    return (
        <div className={CardFooterVariants({ variant, size })}>
            {
                variant === 'detailed' && show ?
                    <div className={`bg-[white] flex flex-col w-full gap-4 shadow-md dark:bg-foregroundPrimary font-normal text-sm px-5 py-4`}>
                        <span>
                            <p><b>price:</b> {price}</p>
                            <p>other details TODO</p>
                        </span>
                        {React.Children.map(detailedBtn, (child) => <>{child}</>)}
                    </div>
                    :
                    <>{defaultBtn}</>
            }
        </div>
    )

}

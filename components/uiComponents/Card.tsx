import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
// import { twMerge as cnm } from "tailwind-merge";


/**********
 * Line 10 is the default styles applied to this button. 
 * If you need to make changes or create a new button add a variant with the tailwind classes you need the warning variant is there as an example. feel free to add more sizes also. 
 */
const cardVariants = cva(
    "group flex flex-col items-center text-sm font-semibold bg-white border-[#DADADA] hover:bg-[#e6e6e6] text-black ",
    {
        variants: {
            variant: {
                default: " dark:text-[#FFFFFF] dark:bg-backgroundPrimary dark:hover:bg-[#424242] dark:border-[#2F2F2F]",
                detailed: ""
            },
            size: {
                default: "w-full h-72",
                sm: "h-9 ",
                lg: "h-11 ",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface cardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
    imageSrc?: string
}

type Ref = HTMLDivElement;

export default function Card({
    className,
    variant,
    size,
    imageSrc = '/2516402-21-base-v2.webp',
    children,

    ...props
}: cardProps) {
    return (
        <div className={cardVariants({ className, variant, size })} {...props}>
            <div className="w-full bg-[white]">
            < Image
                src={imageSrc}
                alt="Product Preview"
                height={100}
                width={100}
                priority
                className="relative m-auto"
            />
            </div>
            <div className="h-1/2 bg-[white] w-full">
                <p>text</p>
            </div>
        </div>
    )
}

'use client';

import React, { useState } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { twMerge as cm } from "tailwind-merge";
import Image from "next/image";
import Button from "./Button";
// import { twMerge as cnm } from "tailwind-merge";


/**********
 * card container tailwind variants
 * Line 10 is the default styles applied to this button. 
 * If you need to make changes or create a new button add a variant with the tailwind classes you need the warning variant is there as an example. feel free to add more sizes also. 
 */
const cardVariants = cva(
    "group flex flex-wrap text-sm font-semibold text-black shadow-md bg-white dark:text-[#FFFFFF] dark:bg-backgroundPrimary dark:hover:bg-[#424242] dark:border-[#2F2F2F]",
    {
        variants: {
            variant: {
                default: "flex-row items-center border-b border-[lightgray] h-72 mx-5 my-2",
                detailed: "flex-row justify-center bg-[lightgray] h-auto"
            },
            size: {
                default: "w-full",
                md: "w-80",
                lg: "w-96 ",
            },
        },
        compoundVariants: [
            {
                size: 'default',
                variant: 'detailed',
                class: 'h-72  max-h-72'
            },
            {
                size: 'default',
                variant: 'default',
                class: 'max-h-72'
            }
        ],
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface cardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
    imageSrc?: string,
    title: string,
    active?: boolean,
    price?: string,
    description?: string,
}

const ImageContainerVariants = {
    variants: {
        default: "flex border border-x-0 border-t-0 border-b-1 border-[lightgray] h-1/2 w-full bg-[white]",
        detailed: "border-0  basis-1/4 bg-[white]"
    }
}

export default function Card({
    className,
    variant,
    size,
    imageSrc = '/2516402-21-base-v2.webp',
    description = 'No Description Provided',
    title,
    active = false,
    price,
    children,

    ...props
}: cardProps) {


    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(!show)
    }

    return (
        <>
            <div onClick={handleClick} className={cardVariants({ className, variant, size })} {...props}>
                <div className={`${variant === 'default' ? ImageContainerVariants.variants.default : ImageContainerVariants.variants.detailed}`}>
                    < Image
                        src={imageSrc}
                        alt="Product Preview"
                        height={400}
                        width={100}
                        priority
                        className="relative m-auto"
                    />
                </div>
                <div className="flex flex-row justify-center shrink-0 basis-3/4 grow text-center text-clip bg-[#F6F6F6] dark:bg-foregroundPrimary w-full border-b-1 border-[black]">
                    {variant === 'detailed' ? <div className={`m-1 p-1 h-2 w-2 rounded-full ${active ? 'bg-[#12ad12]' : 'bg-[red]'}`} /> : null}
                    <span >
                        <h4>{title}</h4>
                        <p className="font-normal text-xs text-ellipsis text-[black] dark:text-[white] ">{description}</p>
                    </span>
                </div>
                {
                    variant === 'default' ? <div className="w-full px-5 my-3 flex justify-end gap-5 max-h-5" >
                        <Button size={'sm'} variant={'sm'}>Cancel</Button>
                        <Button size={'icon'} variant={'icon'}>I</Button>
                    </div> : null
                }
                {
                    variant === 'detailed' && show ?
                        <div className={`bg-[white] flex flex-col w-full gap-4 shadow-md dark:bg-foregroundPrimary font-normal text-sm border border-1 border-[white] px-5 py-4`}>
                            <span>
                                <p><b>price:</b> {price}</p>
                                <p>other details TODO</p>
                            </span>
                            <Button className="self-end" variant={'sm'} size={'sm'}>Edit</Button>
                        </div>

                        : null

                }
            </div >

        </>
    )
}

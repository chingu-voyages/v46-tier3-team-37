'use client';

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import CardImage from "./CardImage";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
// import { twMerge as cnm } from "tailwind-merge";


/**********
 * card container tailwind variants
 * Line 10 is the default styles applied to this button. 
 * If you need to make changes or create a new button add a variant with the tailwind classes you need the warning variant is there as an example. feel free to add more sizes also. 
 */
const cardVariants = cva(
    'flex flex-col dark:bg-foregroundPrimary shadow-md shadow-[#797979] dark:shadow-[#0b0b0b] bg-[#f6f6f6] dark:text-[#FFFFFF] h-fit hover:cursor-pointer ',
    {
        variants: {
            variant: {
                default: "",
                detailed: ""
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

interface cardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
    imageSrc?: string,
    title: string,
    active?: boolean,
    price?: string,
    description?: string,
}


/**
 * 
 * @param className
* @param   variant
* @param   size
* @param   imageSrc = '/2516402-21-base-v2.webp'
* @param   description = 'No Description Provided'
* @param   title
* @param   active = false
* @param   price
* @param   children only excepts button children
 * @returns Card Element
 * 
 * @description < Card >< Button >btn 1</ Button ></ Card >
 * card in default mode only uses the first button passed.
 */
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
                <div className={`${variant === 'detailed' ? 'flex' : 'flex flex-col'}`}>
                    <CardImage variant={variant} size={'default'} imageSrc={imageSrc} />
                    <CardBody active={active} variant={variant} size={'default'} description={description} title={title} />
                </div>
                <CardFooter price={price} parentVariant={variant} show={show} >
                    {children}
                    <button style={{ display: 'none' }}></button>
                </CardFooter>
            </div >

        </>
    )
}


import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

interface CardImageProps
    extends React.HTMLAttributes<HTMLImageElement>,
    VariantProps<typeof CardImageVariants> {
    imageSrc: string
}

const CardImageVariants = cva(
    "flex w-full bg-[white]",
    {
        variants: {
            variant: {
                default: "border border-x-0 border-t-0 border-b-1 border-[lightgray]  h-1/2",
                detailed: " self-stretch basis-1/4 "
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


export default function CardImage({ variant, size, imageSrc }: CardImageProps) {
    return (
        <div className={CardImageVariants({ variant, size })}>
            < Image
                src={imageSrc}
                alt="Product Preview"
                height={400}
                width={100}
                priority
                className="relative m-auto self-center"
            />
        </div >
    )
}
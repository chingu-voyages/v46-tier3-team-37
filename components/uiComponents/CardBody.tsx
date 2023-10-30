import { cva, type VariantProps } from "class-variance-authority";

const CardBodyVariants = cva(
    "flex flex-row justify-center shrink-0 basis-3/4 grow text-center text-clip bg-[#F6F6F6] dark:bg-foregroundPrimary w-full border-b-1 border-[black]",
    {
        variants: {
            variant: {
                default: "",
                detailed: "",
            },
            size: {
                default: "w-full",
            },
            // active: {

            // }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

interface CardBodyVariantProps
    extends React.HTMLAttributes<HTMLImageElement>,
    VariantProps<typeof CardBodyVariants> {
    active: boolean,
    title: string,
    description: string,
}

export default function CardBody({ variant, size, active, title, description }: CardBodyVariantProps) {
    return (
        <div className={CardBodyVariants({ variant, size })}>
            {variant === 'detailed' ? <div className={`m-1 p-1 h-2 w-2 rounded-full ${active ? 'bg-[#12ad12]' : 'bg-[red]'}`} /> : null}
            <span >
                <h4>{title}</h4>
                <p className="font-normal text-xs text-ellipsis text-[black] dark:text-[white] ">{description}</p>
            </span>
        </div>
    )
}



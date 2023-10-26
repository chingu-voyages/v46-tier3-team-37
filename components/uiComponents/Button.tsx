import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
// import { twMerge as cnm } from "tailwind-merge";


/**********
 * Line 10 is the default styles applied to this button. 
 * If you need to make changes or create a new button add a variant with the tailwind classes you need the warning variant is there as an example. feel free to add more sizes also. 
 */
const buttonVariants = cva(
  "rounded-full bg-white border-[#DADADA] hover:bg-[#e6e6e6] hover:dark:bg-[#0f0f0f] dark:border-[#2F2F2F]",
  {
    variants: {
      variant: {
        default: "dark:text-[#FFFFFF] border-4 text-sm font-semibold text-black dark:bg-backgroundPrimary ",
        icon: "text-sm font-light border-1 border ",
        thin: "border border-1",
        warning: "text-red dark:text-pink"
      },
      size: {
        default: "h-10  px-6 py-2 ",
        sm: "h-5 px-4",
        md: "h-9 px-3",
        lg: "h-11  px-8",
        icon: "h-5 w-5",
      },
    },
    compoundVariants: [
      {
        size: 'sm',
        class: 'font-normal mx-1 text-xs border-1'

      }
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
    cardType?: 'default' | 'detailed'
}

export default function Button({ className, variant, size, cardType, children, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} >{children}</button>
  )
}

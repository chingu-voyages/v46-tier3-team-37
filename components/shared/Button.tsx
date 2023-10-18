import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
// import { twMerge as cnm } from "tailwind-merge";


/**********
 * Line 10 is the default styles applied to this button. 
 * If you need to make changes or create a new button add a variant with the tailwind classes you need the warning variant is there as an example. feel free to add more sizes also. 
 */
const buttonVariants = cva(
  "rounded-full text-sm font-semibold border-4 px-6 py-1 bg-white border-[#DADADA] hover:bg-[#e6e6e6] text-black ",
  {
    variants: {
      variant: {
        default: "dark:text-[#FFFFFF] dark:bg-backgroundPrimary dark:hover:bg-[#424242] dark:border-[#2F2F2F]",
        warning: "text-red dark:text-pink"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11  px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  }

export default function Button({className, variant, size, children, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({variant, size, className})} {...props} >{children}</button>
  )
}

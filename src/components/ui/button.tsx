import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui button, restyled to the M.M Fashions tokens: pill shape,
// 48px minimum height, one easing curve.
const buttonVariants = cva(
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold leading-none transition-[background-color,color,border-color,transform] duration-300 ease-premium active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-red text-white hover:bg-red-deep",
        // Ink text keeps WCAG AA contrast on the WhatsApp green (5.3:1).
        whatsapp: "bg-whatsapp text-ink hover:bg-whatsapp-hover",
        dark: "bg-fg text-surface hover:bg-fg/85",
        outline: "border border-fg/20 bg-transparent text-fg hover:border-fg hover:bg-fg hover:text-surface",
        outlineLight: "border border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink",
        ghost: "text-fg hover:bg-fg/5",
        ghostLight: "text-white/85 hover:bg-white/10 hover:text-white",
      },
      size: {
        md: "min-h-12 px-6 text-[15px]",
        lg: "min-h-14 px-7 text-base",
        sm: "min-h-11 px-4 text-sm",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" data-cursor="cta" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };

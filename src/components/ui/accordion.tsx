import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b border-line", className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-cursor="cta"
        className={cn(
          "group flex min-h-11 flex-1 items-start justify-between gap-6 py-5 text-left text-h3 text-fg transition-colors duration-300 hover:text-red-fg sm:py-6",
          className,
        )}
        {...props}
      >
        <span className="pt-0.5">{children}</span>
        <span
          aria-hidden
          className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-line text-fg transition-[background-color,border-color,color,transform] duration-500 ease-premium group-hover:border-red group-data-[state=open]:rotate-45 group-data-[state=open]:border-red group-data-[state=open]:bg-red group-data-[state=open]:text-white"
        >
          <Plus className="size-4" strokeWidth={2.25} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("measure pb-6 pr-12 text-muted sm:pb-7", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

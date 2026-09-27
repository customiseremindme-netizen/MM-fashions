import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui-style form controls. Native <select> keeps the phone's own picker.

const control =
  "w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] duration-200 hover:border-ink/25 focus-visible:border-teal focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/15 aria-[invalid=true]:border-red aria-[invalid=true]:ring-red/10";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("mb-2 block text-sm font-medium text-ink", className)} {...props} />;
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(control, "min-h-32 resize-y py-3 leading-relaxed", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(control, "h-12 appearance-none pr-11", className)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

import { Globe, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

function Row({ icon: IconCmp, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 border-t border-white/10 py-5 first:border-t-0 first:pt-0">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/[0.07] text-teal-light">
        <IconCmp className="size-5" strokeWidth={1.75} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-white/60">{label}</p>
        <div className="text-[16px] font-medium text-white">{children}</div>
      </div>
    </li>
  );
}

const link = "inline-flex min-h-11 items-center transition-colors hover:text-teal-light";

/** Phones, email, website and address for dark sections. */
export function ContactList({ className }: { className?: string }) {
  return (
    <ul className={cn("mt-10", className)}>
      <Row icon={Phone} label="Call">
        <span className="flex flex-col">
          {site.phones.map((p) => (
            <a key={p.href} href={p.href} className={link}>
              {p.label}
            </a>
          ))}
        </span>
      </Row>
      <Row icon={Mail} label="Email">
        <a href={`mailto:${site.email}`} className={cn(link, "break-all")}>
          {site.email}
        </a>
      </Row>
      <Row icon={Globe} label="Website">
        <a href={`${site.url}/`} className={link}>
          {site.websiteLabel}
        </a>
      </Row>
      <Row icon={MapPin} label="Factory">
        <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="block min-h-11 py-2.5 leading-relaxed transition-colors hover:text-teal-light">
          <address className="not-italic">{site.address.full}</address>
        </a>
      </Row>
    </ul>
  );
}

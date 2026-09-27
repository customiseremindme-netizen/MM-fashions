import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Mail, Phone, X } from "lucide-react";
import type { RefObject } from "react";
import { Link, NavLink } from "react-router";
import { Arrow } from "@/components/Arrow";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/config/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type PanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusTo: RefObject<HTMLButtonElement | null>;
};

/**
 * Full-height slide-down menu. Radix Dialog handles focus trapping, Escape
 * and scroll locking; links close it on tap.
 */
export default function MobileMenuPanel({ open, onOpenChange, returnFocusTo }: PanelProps) {
  const reduce = useReducedMotion();
  const close = () => onOpenChange(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount className="fixed inset-0 z-50 lg:hidden" />
            <Dialog.Content
              forceMount
              asChild
              aria-describedby={undefined}
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                returnFocusTo.current?.focus();
              }}
            >
              <m.div
                className="fixed inset-0 z-50 flex h-dvh flex-col overflow-y-auto bg-white lg:hidden"
                initial={reduce ? false : { y: "-100%" }}
                animate={{ y: 0 }}
                exit={reduce ? { opacity: 0 } : { y: "-100%" }}
                transition={{ duration: 0.6, ease }}
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>

                <div className="container-page flex h-16 shrink-0 items-center justify-between border-b border-line">
                  <Link to="/" onClick={close} aria-label="M.M Fashions, home" className="-ml-1 rounded-md p-1">
                    <Logo className="h-10" />
                  </Link>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink"
                    >
                      <X className="size-5" strokeWidth={2} />
                    </button>
                  </Dialog.Close>
                </div>

                <nav aria-label="Mobile" className="container-page flex-1 py-6 sm:py-10">
                  <ul className="flex flex-col">
                    {nav.map((item, i) => (
                      <m.li
                        key={item.to}
                        initial={reduce ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease, delay: 0.18 + i * 0.06 }}
                        className="border-b border-line/70"
                      >
                        <NavLink
                          to={item.to}
                          end={item.to === "/"}
                          onClick={close}
                          className={({ isActive }) =>
                            cn(
                              "group flex min-h-16 items-center justify-between gap-4 py-3 text-[32px] leading-none font-bold tracking-tight transition-colors sm:text-[40px]",
                              isActive ? "text-red" : "text-ink hover:text-red",
                            )
                          }
                        >
                          <span className="flex items-baseline gap-4">
                            <span className="w-7 text-sm font-semibold text-muted tabular-nums">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {item.label}
                          </span>
                          <Arrow className="size-6 text-muted group-hover:text-red" />
                        </NavLink>
                      </m.li>
                    ))}
                  </ul>
                </nav>

                <m.div
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="container-page shrink-0 border-t border-line bg-chalk pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
                >
                  <Button asChild variant="primary" className="w-full">
                    <a href={site.whatsapp.quoteUrl} target="_blank" rel="noopener noreferrer" onClick={close}>
                      <WhatsAppIcon className="size-[18px]" />
                      Get a quote
                    </a>
                  </Button>
                  <ul className="mt-5 grid gap-1 text-[15px] sm:grid-cols-2">
                    {site.phones.map((p) => (
                      <li key={p.href}>
                        <a href={p.href} className="flex min-h-11 items-center gap-3 font-medium text-ink hover:text-red">
                          <Phone className="size-4 text-teal" aria-hidden />
                          {p.label}
                        </a>
                      </li>
                    ))}
                    <li className="sm:col-span-2">
                      <a
                        href={`mailto:${site.email}`}
                        className="flex min-h-11 items-center gap-3 font-medium break-all text-ink hover:text-red"
                      >
                        <Mail className="size-4 shrink-0 text-teal" aria-hidden />
                        {site.email}
                      </a>
                    </li>
                  </ul>
                </m.div>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/config/site";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky white header: 76px, shrinking to 64px with a hairline and soft shadow
 * once the page scrolls. It is fixed over a 76px spacer, so the shrink never
 * shifts the page content.
 */
export function Header() {
  const scrolled = useScrolled(12);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname, location.search]);

  return (
    <>
      <div aria-hidden className="h-[76px]" />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b bg-white transition-[height,box-shadow,border-color] duration-500 ease-premium",
          scrolled
            ? "h-16 border-line shadow-[0_10px_30px_-20px_rgba(28,31,38,0.35)]"
            : "h-[76px] border-transparent",
        )}
      >
        <div className="container-page flex h-full items-center gap-4">
          <Link to="/" aria-label="M.M Fashions, home" className="-ml-1 shrink-0 rounded-md p-1" data-cursor="cta">
            <Logo
              className={cn(
                "w-auto transition-[height] duration-500 ease-premium",
                scrolled ? "h-10" : "h-11 sm:h-12",
              )}
            />
          </Link>

          <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-1 xl:gap-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    data-cursor="cta"
                    className={({ isActive }) =>
                      cn(
                        "group relative inline-flex h-11 items-center px-3 text-[15px] font-medium transition-colors duration-300",
                        isActive ? "text-ink" : "text-body hover:text-ink",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-red transition-transform duration-500 ease-premium",
                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                          )}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button asChild className="hidden lg:inline-flex">
              <a href={site.whatsapp.quoteUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-[18px]" />
                Get a quote
              </a>
            </Button>
            <a
              href={site.whatsapp.quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get a quote on WhatsApp"
              data-cursor="cta"
              className="grid size-11 place-items-center rounded-full bg-whatsapp text-white transition-colors hover:bg-whatsapp-hover lg:hidden"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
          </div>
        </div>
      </header>
    </>
  );
}

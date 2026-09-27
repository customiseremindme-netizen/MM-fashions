import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/config/site";
import { footer } from "@/content/shared";
import { catalogueHref, getRangeName } from "@/lib/models";

const linkClass =
  "inline-flex min-h-11 items-center text-[15px] text-white/70 transition-colors duration-300 hover:text-white";

// The year in the prerendered HTML; refreshed in the browser so it never goes stale.
const BUILD_YEAR = new Date().getFullYear();

export function Footer() {
  const [year, setYear] = useState(BUILD_YEAR);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="on-dark bg-ink-deep text-white/70">
      <div className="container-page grid gap-12 pt-16 pb-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[1.35fr_0.8fr_1fr_1.35fr] lg:gap-x-12 lg:pt-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" aria-label="M.M Fashions, home" className="inline-block rounded-2xl bg-white px-4 py-3">
            <Logo className="h-14" eager={false} />
          </Link>
          <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed">{footer.about}</p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="mb-4 text-sm font-semibold tracking-wide text-white">
            {footer.exploreTitle}
          </h2>
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-ranges">
          <h2 id="footer-ranges" className="mb-4 text-sm font-semibold tracking-wide text-white">
            {footer.rangesTitle}
          </h2>
          <ul>
            {footer.ranges.map((slug) => (
              <li key={slug}>
                <Link to={catalogueHref(slug)} className={linkClass}>
                  {getRangeName(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-white">{footer.contactTitle}</h2>
          <ul className="space-y-3 text-[15px]">
            <li className="flex gap-3">
              <Phone className="mt-3.5 size-4 shrink-0 text-teal-light" aria-hidden />
              <span className="flex flex-col">
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className={linkClass}>
                    {p.label}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-3.5 size-4 shrink-0 text-teal-light" aria-hidden />
              <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-teal-light" aria-hidden />
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="leading-relaxed text-white/70 transition-colors hover:text-white"
              >
                <address className="not-italic">
                  {site.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {footer.rights}
          </p>
          <p>
            {footer.creditPrefix}{" "}
            <a
              href={site.credit.url}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              {site.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router";
import { Arrow } from "@/components/Arrow";
import { Seo } from "@/components/layout/Seo";
import { Button } from "@/components/ui/button";
import { notFound } from "@/content/contact";

export default function NotFoundPage() {
  return (
    <>
      <Seo page="notFound" />
      <section className="relative isolate overflow-hidden bg-chalk">
        {/* Oversized faint 404, drawn as generated content so it stays decorative. */}
        <span
          aria-hidden
          data-num="404"
          className="pointer-events-none absolute -right-6 -bottom-10 -z-10 text-[180px] leading-none font-extrabold tracking-tighter text-ink/[0.05] select-none before:content-[attr(data-num)] sm:text-[280px] lg:-bottom-16 lg:text-[380px]"
        />
        <div className="container-page flex min-h-[62vh] flex-col justify-center py-20 sm:py-24">
          <span aria-hidden className="mb-6 block h-1 w-12 rounded-full bg-red" />
          <h1 className="text-h1 max-w-[16ch]">{notFound.title}</h1>
          <p className="text-lead mt-4 text-muted">{notFound.text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/">
                {notFound.home}
                <Arrow />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/catalogue">{notFound.catalogue}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

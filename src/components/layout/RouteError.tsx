import { buttonVariants } from "@/components/ui/button";

/** Shown if a page fails to load, e.g. an old chunk after a new deploy. */
export function RouteError() {
  return (
    <section className="container-page section-y flex min-h-[60vh] flex-col items-start justify-center">
      <h1 className="text-h1">Something went wrong loading this page</h1>
      <p className="mt-4 text-muted">Please reload the page. If it keeps happening, message us on WhatsApp.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" className={buttonVariants()} onClick={() => window.location.reload()}>
          Reload
        </button>
        <a href="/" className={buttonVariants({ variant: "outline" })}>
          Go to home page
        </a>
      </div>
    </section>
  );
}

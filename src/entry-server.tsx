// Build-time renderer used by scripts/prerender.mjs to write static HTML for
// every route. Not part of the browser bundle.
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router";
import { AppProviders, AppRoutes } from "./App";

export { renderLlmsTxt } from "./lib/llms";
export { renderHead, routePages } from "./lib/seo";

export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <AppProviders>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </AppProviders>
    </StrictMode>,
    {
      // Keep every Suspense boundary inline. By default React outlines large
      // boundaries as hidden segments that an inline script reveals later,
      // which delays the first paint of static pages.
      progressiveChunkSize: Number.POSITIVE_INFINITY,
      onError(error) {
        throw error;
      },
    },
  );
  let html = "";
  for await (const chunk of prelude) html += chunk.toString();
  return html;
}

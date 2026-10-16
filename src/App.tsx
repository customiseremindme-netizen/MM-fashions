import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { RootLayout } from "@/components/layout/RootLayout";
import { ShortlistProvider } from "@/hooks/useShortlist";
import { lazyWithPreload } from "@/lib/lazyWithPreload";
import HomePage, { loadHomeSections } from "@/pages/Home";

// Home ships in the main bundle; the other pages are separate chunks. Each
// prerendered page preloads its own chunk, and the rest are warmed when idle.
export const pageLoaders = {
  about: () => import("@/pages/About"),
  collections: () => import("@/pages/Collections"),
  catalogue: () => import("@/pages/Catalogue"),
  fabrics: () => import("@/pages/Fabrics"),
  contact: () => import("@/pages/Contact"),
  notFound: () => import("@/pages/NotFound"),
  homeSections: loadHomeSections,
};

const AboutPage = lazyWithPreload(pageLoaders.about);
const CollectionsPage = lazyWithPreload(pageLoaders.collections);
const CataloguePage = lazyWithPreload(pageLoaders.catalogue);
const FabricsPage = lazyWithPreload(pageLoaders.fabrics);
const ContactPage = lazyWithPreload(pageLoaders.contact);
const NotFoundPage = lazyWithPreload(pageLoaders.notFound);

/** Paths with their own page; anything else renders the 404 page. */
export const knownPaths = ["/", "/about", "/collections", "/catalogue", "/fabrics", "/contact"];

// Home is in the main bundle; its below-the-fold sections keep hydrating on
// their own, after the hero, so they are not preloaded here.
const preloaders: Record<string, () => Promise<unknown>> = {
  "/": () => Promise.resolve(),
  "/about": AboutPage.preload,
  "/collections": CollectionsPage.preload,
  "/catalogue": CataloguePage.preload,
  "/fabrics": FabricsPage.preload,
  "/contact": ContactPage.preload,
};

/** Loads the code for a path's page, so it can hydrate without suspending. */
export function preloadPage(path: string): Promise<unknown> {
  return (preloaders[path] ?? NotFoundPage.preload)();
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ShortlistProvider>{children}</ShortlistProvider>
      </MotionConfig>
    </LazyMotion>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="catalogue" element={<CataloguePage />} />
        <Route path="fabrics" element={<FabricsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}

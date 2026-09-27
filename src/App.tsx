import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import { lazy, type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { RootLayout } from "@/components/layout/RootLayout";
import { ShortlistProvider } from "@/hooks/useShortlist";
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

const AboutPage = lazy(pageLoaders.about);
const CollectionsPage = lazy(pageLoaders.collections);
const CataloguePage = lazy(pageLoaders.catalogue);
const FabricsPage = lazy(pageLoaders.fabrics);
const ContactPage = lazy(pageLoaders.contact);
const NotFoundPage = lazy(pageLoaders.notFound);

/** Paths with their own page; anything else renders the 404 page. */
export const knownPaths = ["/", "/about", "/collections", "/catalogue", "/fabrics", "/contact"];

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

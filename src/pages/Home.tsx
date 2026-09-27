import { lazy, Suspense } from "react";
import { HomeHero } from "@/components/home/HomeHero";
import { Stats } from "@/components/home/Stats";
import { Seo } from "@/components/layout/Seo";

// Hero and stats are in the main bundle; the rest of the page is its own
// chunk (preloaded by the prerendered home page) and hydrates separately,
// so it never holds up the first screen.
export const loadHomeSections = () => import("@/components/home/HomeSections");
const HomeSections = lazy(loadHomeSections);

export default function HomePage() {
  return (
    <>
      <Seo page="home" />
      <HomeHero />
      <Stats />
      <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
        <HomeSections />
      </Suspense>
    </>
  );
}

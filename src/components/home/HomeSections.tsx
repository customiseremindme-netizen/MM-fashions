import { Customisation } from "@/components/sections/Customisation";
import { Faq } from "@/components/sections/Faq";
import { Process } from "@/components/sections/Process";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { CollectionsTeaser } from "./CollectionsTeaser";
import { FabricsPreview } from "./FabricsPreview";
import { Intro } from "./Intro";
import { ModelMarquee } from "./ModelMarquee";
import { RangeGrid } from "./RangeGrid";

/** Everything below the hero and stats band, loaded as its own chunk. */
export default function HomeSections() {
  return (
    <>
      <Intro />
      <CollectionsTeaser />
      <ModelMarquee />
      <RangeGrid />
      <Customisation />
      <Process />
      <FabricsPreview />
      <Faq />
      <QuoteSection />
    </>
  );
}

import { modelAlt, modelThumb, type Model } from "@/lib/models";
import { cn } from "@/lib/utils";

/**
 * A catalogue model image: 240/480px WebP thumbnails, falling back to the
 * original /models/mm-XXX.jpg.
 */
export function ModelImage({
  model,
  className,
  eager,
  alt,
  sizes = "(min-width: 1024px) 200px, (min-width: 640px) 30vw, 46vw",
}: {
  model: Model;
  className?: string;
  eager?: boolean;
  /** Override the default "Model 057, Cut & sew polos" alt text (use "" when a caption already says it). */
  alt?: string;
  /** Rendered width, for choosing between the 240px and 480px thumbnails. */
  sizes?: string;
}) {
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={`${modelThumb(model, true)} 240w, ${modelThumb(model)} 480w`} sizes={sizes} />
      <img
        src={model.img}
        alt={alt ?? modelAlt(model)}
        width={480}
        height={480}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className={cn("block aspect-square object-contain", className)}
      />
    </picture>
  );
}

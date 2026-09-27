// Generates WebP derivatives of the supplied photos and model images.
// Originals in public/photos and public/models are never modified; they stay
// referenced as <picture> fallbacks and as the full-size lightbox source.
//
//   npm run images
//
// Output:
//   public/photos/opt/<name>-<width>.webp
//   public/models/thumbs/mm-XXX.webp        (480px square)
//   public/models/thumbs/mm-XXX-240.webp    (240px square, for small tiles)
//   src/data/photo-manifest.json            (intrinsic sizes + generated widths)

import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const photosDir = path.join(root, "public/photos");
const photosOut = path.join(photosDir, "opt");
const modelsDir = path.join(root, "public/models");
const modelsOut = path.join(modelsDir, "thumbs");
const manifestPath = path.join(root, "src/data/photo-manifest.json");

const PHOTO_WIDTHS = [480, 800, 1200, 1600];
const PNG_WIDTHS = [400, 640, 960];
const MODEL_THUMBS = [
  { size: 480, suffix: "" },
  { size: 240, suffix: "-240" },
];

async function isFresh(src, out) {
  try {
    const [a, b] = await Promise.all([stat(src), stat(out)]);
    return b.mtimeMs >= a.mtimeMs;
  } catch {
    return false;
  }
}

async function photos() {
  await mkdir(photosOut, { recursive: true });
  // logo.png is always served exactly as supplied, so it gets no derivatives.
  const files = (await readdir(photosDir)).filter((f) => /\.(jpe?g|png)$/i.test(f) && f !== "logo.png");
  const manifest = {};

  for (const file of files.sort()) {
    const src = path.join(photosDir, file);
    const meta = await sharp(src).metadata();
    const base = file.replace(/\.[^.]+$/, "");
    const isPng = /\.png$/i.test(file);
    const candidates = isPng ? PNG_WIDTHS : PHOTO_WIDTHS;
    const widths = candidates.filter((w) => w < meta.width);
    if (!widths.length || widths[widths.length - 1] < meta.width * 0.9) widths.push(meta.width);

    for (const w of widths) {
      const out = path.join(photosOut, `${base}-${w}.webp`);
      if (await isFresh(src, out)) continue;
      await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: isPng ? 82 : 76, alphaQuality: 90, effort: 5 })
        .toFile(out);
    }
    manifest[file] = { width: meta.width, height: meta.height, widths };
    console.log(`photo  ${file.padEnd(16)} ${meta.width}x${meta.height} -> ${widths.join(", ")}`);
  }

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
}

async function models() {
  await mkdir(modelsOut, { recursive: true });
  const files = (await readdir(modelsDir)).filter((f) => /\.jpe?g$/i.test(f));
  let made = 0;
  for (const file of files) {
    const src = path.join(modelsDir, file);
    for (const { size, suffix } of MODEL_THUMBS) {
      const out = path.join(modelsOut, file.replace(/\.[^.]+$/, `${suffix}.webp`));
      if (await isFresh(src, out)) continue;
      await sharp(src)
        .resize({ width: size, height: size, fit: "contain", background: "#ffffff" })
        .webp({ quality: 80, effort: 5 })
        .toFile(out);
      made++;
    }
  }
  console.log(`models ${files.length} images, ${made} thumbnails written`);
}

await photos();
await models();

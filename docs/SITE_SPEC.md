# M.M Fashions website — build spec

Build a complete, professional, fully responsive marketing website for M.M FASHIONS, Tirupur — manufacturers of hosiery garments, sportswear, regular and house uniforms. All copy below is final and must be used as written. Do not invent years, client names, testimonials, certifications, awards, minimum order quantities, prices or delivery times.

## 1. Stack and rules
React + Vite + TypeScript + Tailwind + shadcn/ui, framer-motion, react-router, lucide-react icons. Static site, no backend, no API keys (Google Map is a plain iframe embed). Keep all copy in /src/content/*.ts and all contact details in /src/config/site.ts.

Assets (already in the repo; use these exact paths):
- /public/photos/logo.png — use as-is, never redraw or recolour
- /public/photos/hero_sew.jpg, hero_polos.png (transparent), about.jpg, infra.jpg
- /public/photos/kg1–kg4.jpg, boy1–boy4.jpg, girl1–girl4.jpg, dig1–dig4.jpg
- /public/models/mm-XXX.jpg + /src/data/models.json = { ranges:[{slug,name}], models:[{no,range,img}] } → 255 models in 12 ranges

## 2. Design tokens
Colours: Red #D2232A (primary, CTAs) · Ink #1C1F26 (dark sections, headings) · Teal #2A6F6B (accent on light) · Teal-light #4FA39D (accent on dark) · Chalk #F2F4F3 (alternate sections) · Text #3B414B · Muted #5F6671 · Line #E1E5E4 · WhatsApp #1FA855 · White.
Font: Poppins only (400/500/600/700/800), system fallback.
Type scale (desktop / tablet / mobile): hero H1 88/72/48 · page H1 52/42/34 · H2 42/34/28 · H3 22/20/18 · body 17/16/16 · small 14. Line-height 1.15 headings, 1.7 body. Max 65ch per text line.
Shapes: cards radius 16px, pill buttons min-height 48px, 1px Line borders, shadows only on hover.
Style: clean, confident, industrial-premium. Sentence-case headings; only the hero headline is uppercase. No emoji, no decorative gradients.

## 3. Responsive rules (mandatory)
Breakpoints: mobile <640, tablet 640–1023, desktop ≥1024, wide ≥1280. Container max 1240px, side padding 16 / 24 / 24.
Section vertical padding: 52 mobile / 64 tablet / 88 desktop. No half-empty rows or orphan cards; grids reflow to the column counts given per section. Two-column blocks stack on tablet and mobile (text first). No horizontal scroll from 320px up. Tap targets ≥44px. Fixed aspect ratios on images to avoid layout shift. Test at 360, 390, 768, 1024, 1440.

## 4. Animation (subtle, premium)
- Hero headline: each line slides up from a mask, 90ms stagger; teal bar grows left→right after.
- Hero image: slow Ken Burns zoom (18s alternate); polo cluster floats ±10px (7s loop); dashed outer ring rotates (60s).
- Scroll reveal: fade up 20px, once, 0.7s, ease cubic-bezier(.22,.8,.24,1), 60–100ms stagger in grids.
- Stats count up when visible. Cards lift 4px on hover; collection images zoom 1.07; link arrows nudge 6px.
- Model marquee: two rows, opposite directions, 65s loop, pause on hover, edge fade mask.
- Page transitions: 250ms fade.
- prefers-reduced-motion: disable all motion, show final states.

## 5. Site data (src/config/site.ts)
- name: M.M Fashions
- tagline: Mfrs of hosiery garments, sports wear, regular and house uniforms
- phones: +91 99524 01313, +91 95431 21313
- whatsapp: 919952401313
- email: mmfashionstirupur@gmail.com
- website: www.mmfashions.in
- address: SF.No.3/253, Athupalayam, Pattathurasi Amman Kovil Back Side, Thirumurugan Poondi (PO), Tirupur 641652, Tamil Nadu
- mapsUrl: https://www.google.com/maps/search/?api=1&query=Pattathurasi+Amman+Kovil+Athupalayam+Thirumurugan+Poondi+Tirupur+641652
- WhatsApp quote link: https://wa.me/919952401313?text=Hello%20M.M%20Fashions%2C%20I%20would%20like%20a%20quote%20for%20uniforms.

## 6. Global components
HEADER — sticky, white, 76px → 64px on scroll with hairline border + shadow. Logo left. Nav: Home · About · Collections · Catalogue · Fabrics · Contact. Right: red pill "Get a quote" (WhatsApp icon) → WhatsApp quote link. Below 1024px: WhatsApp icon button + hamburger opening a full-height slide-down menu with large stacked links (staggered in), phone and email at the bottom; closes on link tap or Escape.

FLOATING WHATSAPP — 58px green circle bottom-right with a soft ping ring; moves up when the catalogue shortlist bar is open.

CTA BAND (bottom of About, Collections, Fabrics) — Ink bg. H2 "Ready to plan your next uniform order?" · "Send us the model numbers you like, quantities and sizes. We'll reply with fabric options, customisation and pricing." · buttons "Chat on WhatsApp" (green) + "Call +91 99524 01313" (white outline).

PAGE HERO (inner pages) — Ink bg with an asymmetric curved red bottom edge; breadcrumb, H1, one-line intro.

FOOTER (darker ink) — Col 1: logo on a white rounded plate + "Manufacturers of hosiery garments, sportswear, regular and house uniforms for schools, corporates and sports institutions across Tamil Nadu and South India." Col 2 "Explore": Home, About, Collections, Catalogue, Fabrics, Contact. Col 3 "Ranges": Cut & sew polos, Sublimation prints, Kindergarten sets, Girls' sets, Tracksuits, Sweatshirts & hoodies (→ /catalogue?range=slug). Col 4 "Contact": phones, email, address. Bottom bar: "© {current year} M.M Fashions. All rights reserved." · "Website by Designing Portal" → https://www.designingportal.com. Columns 4 / 2 / 1.

ENQUIRY FORM (reusable) — white card, title "Send your requirement", intro "Fill this in and WhatsApp opens with your message ready to send." Fields (2 cols desktop/tablet, 1 mobile): Your name* · School / organisation · Enquiry for (School, College, Corporate, Sports academy or club, Event or promotion, Other) · Garment (12 ranges + "Not sure yet") · Approx. quantity (placeholder "e.g. 400 pieces") · City · Details (model numbers, colours, sizes) full-width textarea. Name required → inline error "Add your name so we know who to reply to." Submit "Send on WhatsApp" (green, full width) opens wa.me/919952401313 in a new tab with "Hello M.M Fashions, I have an enquiry." then one line per filled field, then the details.

## 7. Home (/)
[1] HERO — Ink bg, curved bottom edge into the red stats band. Small muted line "Manufacturers of hosiery garments, sportswear, regular and house uniforms in Tirupur". H1 stacked, one word per line, uppercase, weight 800: WE / STITCH / QUALITY (red) / WEAR / CONFIDENCE (teal-light), then teal bar. Text "Crafting uniforms that represent your identity with pride. School, house, sports and corporate wear — cut, stitched, printed and finished under one roof." Buttons "Browse 250+ models" (red → /catalogue) + "Get a quote" (white outline, WhatsApp). Right: hero_sew.jpg as a grayscale circle with 10px teal ring + rotating dashed outer ring; hero_polos.png overlapping bottom-left. 56/44 split desktop; stacked on tablet/mobile with visual max 420 / 320px, centred.

[2] STATS — Red bg, white text, count-up: 253 "Uniform models in our catalogue" · 12 "Garment ranges, from polos to hoodies" · 13 "Fabric options for tees, pants and sportswear" · 4 "In-house departments, from sampling to packing". Grid 4 / 2 / 2, thin white dividers on desktop.

[3] INTRO — White. H2 "Your uniform partner in Tirupur". P1 "M.M Fashions is one of Tirupur's reliable names in custom apparel and uniform manufacturing. Every fabric is handpicked for its texture, breathability and long-lasting performance, and every garment is made to balance durability, comfort and style." P2 "We make school uniforms, corporate wear, sportswear, T-shirts, track pants, hoodies and promotional apparel for schools, corporates and sports institutions across Tamil Nadu and South India." Button "About us" (→ /about). Right: 2×2 "Who we serve" cards — Schools "Regular, house, PE and kindergarten uniforms in your school colours and crest." · Corporates "Branded polos, T-shirts and workwear for teams and staff." · Sports institutions "Moisture-wicking jerseys, tracksuits and shorts for training and matches." · Promotional apparel "Printed T-shirts and hoodies for events, campaigns and launches." Layout 42/58 desktop; stacked below; cards 2 / 2 / 1 (icon left of text on mobile).

[4] COLLECTIONS — Chalk. H2 "Uniforms for every age and activity". Intro "From kindergarten co-ords to house-team jerseys, every collection is cut, stitched, printed and finished in our own Tirupur unit." Button "Explore collections" (→ /collections). 4 tall image cards, dark bottom gradient, title, line, "See models →", whole card clickable: kg2 "Kindergarten" "Soft co-ord sets in prints, checks and stripes." → ?range=kg · boy1 "Boys collections" "Polos, layered tees, waistcoats, shorts and track pants." → ?range=polo · girl4 "Girls collections" "Pinafores, skirt sets and pleated skirts." → ?range=girls · dig1 "Digital printed" "Full-colour sublimation for sports days and houses." → ?range=sub. Grid 4 / 2 / 2; height 440 / 380 / 240; hide the line on mobile.

[5] MODEL MARQUEE — White, full width. Centred H2 "A glimpse of 250+ models" + "Every design carries a model number, so ordering is as simple as sending us the numbers you like." Two infinite rows of white square tiles (180 / 150 / 120px) with a model-number badge; tiles link to their range.

[6] RANGE GRID — Chalk. H2 "Everything a uniform wardrobe needs" · "Twelve ranges from one factory. Tap a range to see its models." · button "Browse all models". 12 tiles: cover image (first model in range), name, "N models". Grid 6 / 4 / 3.

[7] CUSTOMISATION — Ink. Left: dig2.jpg with offset teal outline frame. H2 "Made to your colours, crest and brief" · "From concept development to final delivery, every stage is handled in-house, so your uniform looks exactly the way you imagined it." 6 items (red circle icon), grid 2 / 2 / 1: Logo embroidery "School crests and company logos embroidered in-house." · Screen and digital printing "Names, slogans and artwork printed sharp and wash-fast." · Sublimation prints "All-over, full-colour designs that won't crack or peel." · Your colours "Body, collar, cuff and panel colours matched to your house colours." · Sampling first "Our design and sampling team makes a sample before bulk production." · Quality checked "Every order passes our in-house quality control and packing."

[8] PROCESS (id="process") — White. Centred H2 "How an order moves" · "Four clear steps from your first message to the delivered carton." 4 cards with faint numerals 01–04, grid 4 / 2 / 1: Share your requirement "Send model numbers, quantities and sizes on WhatsApp, or call us." · Design and sampling "We confirm fabric, colours and branding, then make a sample for your approval." · Production and QC "Cutting, stitching, printing and embroidery run in-house, followed by quality checks." · Packed and delivered "Our packing team labels by size and dispatches to your school or office."

[9] FABRICS PREVIEW — Chalk. H2 "Fabrics we work with" · "Chosen for breathability, stretch and shape retention, so uniforms keep looking right through daily wear and washing." 3 cards (Sports / T-shirt / Pant and shorts) with fabric names as chips + button "See all fabrics" → /fabrics. Grid 3 / 1 / 1.

[10] FAQ (id="faq") — White. Left: H2 "Questions buyers ask" · "Can't find your answer? Message us on WhatsApp." · green "Ask on WhatsApp". Right accordion (first open):
- Can you make uniforms in our school colours and crest? — Yes. Our design and sampling team matches body, collar, cuff and panel colours to your brief and adds your crest by embroidery or printing. We make a sample for approval before bulk production.
- How do I order from the catalogue? — Open the catalogue, tap + on the models you like and send the shortlist to us on WhatsApp with quantities and sizes. We reply with fabric options, customisation and pricing.
- Which fabric is best for sports and PE uniforms? — Moisture-wicking, quick-dry performance fabrics. For T-shirts, Honey Comb and Mars are popular; for track pants, Four-Way Lycra or NS Lycra give the most stretch.
- Can you change a catalogue design? — Yes. Any model can be adapted — colours, panels, collar, logo placement and fabric. Share the model number and what you'd like changed.
- Do you make corporate and promotional apparel? — Yes. Alongside school wear we make corporate polos and T-shirts, hoodies, track pants and printed promotional apparel for events and campaigns.
- Where do you supply? — We serve schools, corporates and sports institutions across Tamil Nadu and South India. For other locations, message us and we'll confirm delivery.
Layout 38/62 desktop, stacked below.

[11] QUOTE — Ink. H2 "Get a quote for your school or team" · "Share the models you like, quantities and sizes. We'll come back with fabric options, customisation and pricing." Contact list with icons (phones, email, website, address → maps). Right: ENQUIRY FORM. Stacked on tablet/mobile.

## 8. About (/about)
PAGE HERO: "Home / About" · H1 "About M.M Fashions" · "Uniforms and sportswear made in Tirupur, the textile hub of India, for schools, corporates and sports institutions."

STORY (two columns, about.jpg with offset frame right) — H2 "We don't just manufacture garments — we craft confidence". P1 "M.M Fashions is one of Tirupur's most reliable names in custom apparel and uniform manufacturing. Built on a foundation of quality craftsmanship and innovation, we design and produce garments that balance durability, comfort and style for every client." P2 "Each fabric is handpicked for its premium texture, breathability and long-lasting performance, so our products stand out in both look and feel. From concept development to final delivery, every stage of production is handled with care." P3 "Our in-house embroidery, printing and customisation services bring your brand or institution's vision to life with accuracy."

MISSION (Chalk, centred) — H2 "Our mission" · large text "To create apparel that reflects identity, unity and pride."

WHAT WE STAND FOR — 4 cards, grid 4 / 2 / 1: Quality manufacturing "Precision stitching and advanced finishing on every garment." · Wide range of garments "Twelve ranges, from polos and tracksuits to hoodies and kindergarten sets." · Uniforms for every need "School, house, sports, corporate and promotional wear from one partner." · Commitment to excellence "Consistent quality and on-time delivery, order after order."

INFRASTRUCTURE (two columns, infra.jpg left) — H2 "Our infrastructure" · "Located in the textile hub of Tirupur, our production facility is equipped with modern technology and managed by skilled professionals dedicated to consistent quality and timely delivery." Checklist: State-of-the-art cutting and stitching units · Advanced digital printing and embroidery division · Dedicated design and sampling team for customised apparel · In-house quality control and packaging department. Motto "Designed to perform." / "Made to last." (second line teal).

WHO WE SERVE — reuse Home [3] cards, grid 4 / 2 / 1. Then CTA BAND.

## 9. Collections (/collections)
PAGE HERO: "Home / Collections" · H1 "Collections" · "Four collections and twelve ranges, designed for every age, activity and occasion."

4 alternating feature blocks (mosaic = 1 tall + 2 stacked images; swap sides each block on desktop; stacked on tablet/mobile with mosaic first):
1. Kindergarten (kg2, kg1, kg4) — "Comfortable, colourful and easy to wear. Our kindergarten sets pair soft polo tops with shorts or skirts in fun prints, checks and stripes — made to handle playtime, washing and everyday school life." Chips: Kindergarten sets · 64 models. Button "See kindergarten models" → /catalogue?range=kg
2. Boys collections (boy1, boy4, boy3) — "Smart everyday uniforms and active sportswear for boys: panelled polos, layered-look tees, waistcoats, shorts and track pants, in your school and house colours." Chips: Cut & sew polos · Layered-look tees · Waistcoats · Shorts · Track pants. Button "See polo models" → ?range=polo
3. Girls collections (girl4, girl2, girl1) — "Neat, comfortable uniforms for girls: polo tops with pleated skirts, pinafore-style dresses and skirts in solids and checks, cut for easy movement." Chips: Girls' sets · Skirts. Button "See girls' models" → ?range=girls
4. Digital printed (dig1, dig2, dig3) — "Sublimation-printed uniforms in full colour, edge to edge. Ideal for sports days, house teams, clubs and events — bold designs that stay bright wash after wash." Chips: Sublimation prints · 40 models. Button "See sublimation models" → ?range=sub

ALL RANGES — H2 "All 12 ranges"; cards (image, name, count, line), grid 4 / 3 / 2:
Sports sets (sports) "Polo and shorts sets for PE, sports days and house teams." · Girls' sets (girls) "Polo tops with pleated skirts and pinafore-style dresses." · Tracksuits (track) "Full sets with jackets or polos and matching track pants." · Cut & sew polos (polo) "Panelled polo T-shirts in school and house colours." · Sublimation prints (sub) "All-over digitally printed polos for sports and events." · Layered-look tees (layered) "Polos with a waistcoat-style front in one garment." · Waistcoats (vest) "Sleeveless waistcoats and vests in checks and solids." · Shorts (shorts) "School and sports shorts with contrast piping and panels." · Skirts (skirts) "Pleated and panelled skirts, including checks." · Track pants (pants) "Track pants with side stripes and cuffed hems." · Sweatshirts & hoodies (winter) "Sweatshirts, hoodies and varsity jackets for cooler days." · Kindergarten sets (kg) "Printed, checked and striped co-ord sets for little ones."
Then CTA BAND.

## 10. Catalogue (/catalogue)
PAGE HERO (compact): "Home / Catalogue" · H1 "Uniform catalogue" · "250+ designs across 12 ranges. Filter by range or search a model number, shortlist what you like and send the list to us on WhatsApp for a quote."

MODEL FINDER (Chalk bg):
- Sticky filter bar under the header: horizontal-scroll range chips with counts ("All models 255" + 12 ranges) and search "Model no. e.g. 057" (digits match anywhere). Reads/writes ?range= in the URL. Mobile: search on top, chips below, full-bleed scroll.
- Status line "Showing 30 of 71 models in Cut & sew polos" · hint "Tap + to shortlist, then send your list on WhatsApp. Colours, logos and fabrics can be customised."
- Cards: square white image area (object-contain, 10px padding), model number bold, range name small, round "+" button → red with a check, card gets a red outline and a small pop. Grid auto-fill min 176px desktop; 3 cols tablet; 2 cols mobile.
- Load 30 desktop / 12 mobile, "Show more models"; new cards fade up with 35ms stagger.
- Image click → lightbox: large image, "Model 057", range, prev/next (buttons, arrow keys, swipe), Add/Remove shortlist, close via button/Esc/backdrop.
- Shortlist saved in localStorage. When not empty, a fixed Ink bottom bar slides up: "4 models shortlisted" · numbers (truncated) · "Clear" · green "Send on WhatsApp" opening wa.me/919952401313 with: "Hello M.M Fashions, I would like a quote for these models from your catalogue:" then one line per range ("Cut & sew polos: 057, 061"), then blank lines "Quantity:", "Sizes:", "School / organisation:".
- Empty state: "No model matches "X". Check the number, or clear the search to see every model."

BELOW: Ink strip — H2 "Didn't find the exact design?" · "Our design team creates custom uniforms from your brief, sketch or reference photo." · "Talk to us on WhatsApp" + "Call now".

## 11. Fabrics (/fabrics)
PAGE HERO: "Home / Fabrics" · H1 "Fabrics and customisation" · "The right fabric makes a uniform comfortable, durable and easy to care for. Here's what we work with."

3 GROUPS (cards, grid 3 / 1 / 1; each fabric = bold name + description):
Sports uniform fabrics — "Performance-driven materials designed for athletic comfort." Moisture-wicking: Keeps students cool and dry. · Flexible and lightweight: Allows unrestricted movement. · Quick-dry performance: Suited to physical education and sports activities. (Put dig3.jpg at the bottom of this card so the three cards stay balanced.)
T-shirt fabrics — "Chosen for breathability, softness and shape retention. All are durable and stretchable, keeping their shape with daily wear." Honey Comb: Breathable textured knit that keeps air circulating. · Lacoste: Premium pique weave known for strength and a refined look. · Spun Nirmal Knit: Smooth, soft-touch knit for all-day comfort. · Mars: Lightweight and wrinkle-resistant, great for active students. · Polycotton: Polyester-cotton blend that resists shrinkage and fading. · 100% Combed Cotton: Naturally soft, durable and gentle on skin. · Saleena: Soft-feel, high-stretch knit for easy movement.
Pant and shorts fabrics — "Engineered for comfort and endurance, with strength, flexibility and a smart finish that lasts." Superpoly: High-tenacity fabric with a smooth finish and easy maintenance. · T815: Premium polyester blend, durable with a crisp appearance. · NS Lycra: Soft-stretch knit with excellent recovery and comfort. · Four-Way Lycra: Maximum flexibility; stretches in all directions. · Two-Way Lycra: Balanced stretch and strength for daily school wear. · Loopknit: Soft and warm; ideal for pants and sweaters.

HOW TO CHOOSE — H2 "Which fabric for which uniform?" · note "A starting guide — we'll confirm the best option with your sample." Responsive table (stacked cards on mobile): Everyday school T-shirts → Polycotton, 100% Combed Cotton · Premium school polos → Lacoste, Spun Nirmal Knit · PE and sports T-shirts → Honey Comb, Mars, Saleena · Daily school pants and shorts → Two-Way Lycra, T815, Superpoly · Sports track pants → Four-Way Lycra, NS Lycra · Winter wear and sweaters → Loopknit.

CUSTOMISATION — reuse Home [7] items on white, grid 3 / 2 / 1. PROCESS — reuse Home [8]. Then CTA BAND.

## 12. Contact (/contact) and 404
PAGE HERO: "Home / Contact" · H1 "Contact M.M Fashions" · "Tell us what you need — school, house, sports or corporate uniforms. We reply with fabric options, customisation and pricing."
4 CARDS (grid 4 / 2 / 1): Call us (both numbers, tel links) · WhatsApp ("Quick replies on +91 99524 01313") · Email (mailto) · Visit the factory ("Thirumurugan Poondi, Tirupur 641652", maps link).
FORM + MAP (Chalk; 52/48 desktop, stacked below): ENQUIRY FORM left; right H3 "Factory address", full address, Google Maps iframe embed (no API key; query "Pattathurasi Amman Kovil, Athupalayam, Thirumurugan Poondi, Tirupur 641652"), height 360 / 320 / 280, radius 16, lazy-loaded.
FAQ — reuse Home [10].
404: H1 "This page isn't here" · "The link may be old or mistyped." · buttons "Go to home page" / "Browse the catalogue".

## 13. SEO and quality
Titles / descriptions:
- Home: "M.M Fashions | School, Sports & House Uniform Manufacturers in Tirupur" / "Custom school, house, sports and corporate uniforms made in Tirupur. Browse 250+ models and get a quote on WhatsApp."
- About: "About M.M Fashions | Uniform Manufacturer, Tirupur"
- Collections: "Uniform Collections | Kindergarten, Boys, Girls & Sublimation | M.M Fashions"
- Catalogue: "Uniform Catalogue – 250+ Models | M.M Fashions"
- Fabrics: "Uniform Fabrics & Customisation | M.M Fashions"
- Contact: "Contact M.M Fashions, Tirupur | Get a Uniform Quote"
Open Graph image from the hero. JSON-LD LocalBusiness on all pages; FAQPage on Home and Contact.
Accessibility: one H1 per page, semantic landmarks, alt text on every image (models: "Model 057, Cut & sew polos"), visible focus rings, AA contrast, keyboard-usable menu and lightbox.
Performance: lazy-load below-the-fold images, width/height on all images, preload hero image and Poppins, Lighthouse 90+ on mobile.
Consistency: always "M.M Fashions" and "Tirupur". Keep the two page-32 shorts as "008 (shorts A)" and "008 (shorts B)".

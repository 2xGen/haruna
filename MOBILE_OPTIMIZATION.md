# Mobiel-optimalisaties (zonder desktop aan te passen)

Alle voorstellen gebruiken **alleen** `max-lg:` of `max-md:` / `max-sm:` zodat het desktop-ontwerp hetzelfde blijft.

---

## 1. Touch targets (min. 44px)

- **Header – hamburgerknop:** grotere tikzone op mobiel, bijv. `max-lg:min-w-[48px] max-lg:min-h-[48px] max-lg:flex max-lg:items-center max-lg:justify-center`.
- **Footer – “Snel naar” links:** links als blok met extra verticale ruimte op mobiel: `max-lg:block max-lg:py-2.5` zodat ze makkelijker te raken zijn.
- **Sticky CTA-bar – knop:** op kleine schermen `max-sm:w-full max-sm:justify-center` en `max-lg:min-h-[48px]` voor duidelijke tap target.

---

## 2. Safe area (notch / home-indicator)

- **StickyCtaBar:** onderkant uitlijnen met safe area:  
  `max-lg:pb-[max(0.75rem,env(safe-area-inset-bottom))]`.
- **Footer:** extra onderpadding op mobiel voor sticky bar + safe area:  
  behoud `pb-20` en voeg toe: `max-lg:pb-[max(5rem,calc(5rem+env(safe-area-inset-bottom)))]`.
- **Main (pagina’s met StickyCtaBar):** `pb-24` op mobiel eventueel:  
  `max-lg:pb-[max(6rem,calc(6rem+env(safe-area-inset-bottom)))]` zodat content niet onder de bar/indicator verdwijnt.

---

## 3. Formulieren – geen zoom op iOS

- **Inputs:** op iOS zoomt de browser bij focus als `font-size` &lt; 16px. Overal waar inputs `text-[15px]` hebben, op mobiel 16px maken:  
  `max-lg:text-base` (of in globals: inputs binnen een mobiel media query op 16px).
- **Footer nieuwsbrief** en **AfspraakMakenForm**: controleren dat inputs op mobiel `text-base` (16px) hebben.

---

## 4. Sticky CTA-bar – leesbaarheid en ruimte

- **Alleen mobiel:** iets meer verticale ruimte: `max-lg:py-4` (nu overal `py-3`).
- Tekst en knop iets meer ruimte: `max-lg:gap-4`.

---

## 5. Horizontale scroll voorkomen

- **Body:** `max-lg:overflow-x-hidden` om horizontaal scrollen op kleine schermen te voorkomen (als ergens content uitsteekt).

---

## 6. Secties en leesbaarheid

- **USP-strip (home):** op mobiel iets meer regelafstand of grotere tekst: bijv. `max-lg:text-base` voor betere leesbaarheid.
- **Cijfers/stats (home):** 2×2 grid op mobiel iets meer ruimte: `max-md:gap-10` of `max-md:gap-y-10`.

---

## 7. Cards en artikelen

- **ArticleCard:** op zeer kleine schermen eventueel `max-sm:p-5` i.p.v. overal `p-6` om meer witruimte te behouden (optioneel).

---

## 8. Scroll-trigger StickyCtaBar (optioneel)

- `SHOW_AFTER_SCROLL = 1100` is voor desktop logisch; op mobiel zou je eerder tonen (bijv. na 400–600px). Dat vraagt om een hook die `window.innerWidth` gebruikt en de drempel per breakpoint zet – alleen doen als de bar op mobiel te laat verschijnt.

---

## Samenvatting – snel toe te passen

| Onderdeel        | Wijziging (alleen mobiel) | Status |
|------------------|---------------------------|--------|
| Header hamburger | `min-w-[48px] min-h-[48px]` + flex center | ✅ Gedaan |
| StickyCtaBar     | Safe area `pb-[max(…)]`, `py-4`, knop `min-h-[48px]` | ✅ Gedaan |
| Footer           | Safe area in `pb-20`, Snel naar links `block py-2.5` | ✅ Gedaan |
| Inputs           | 16px op mobiel via globals.css media query (geen iOS-zoom) | ✅ Gedaan |
| Body             | `max-lg:overflow-x-hidden` | ✅ Gedaan |

De overige punten (USP-strip, stats gap, ArticleCard padding, scroll-drempel) zijn optioneel en nog niet doorgevoerd.

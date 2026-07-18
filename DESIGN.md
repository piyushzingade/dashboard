---
name: NexUI Precision Ledger
description: A dense, monochrome-first dashboard system built for fast operational scanning.
colors:
  canvas: "#09090b"
  surface: "#111113"
  surface-raised: "#18181b"
  ink: "#fafafa"
  ink-muted: "#a1a1aa"
  line: "#2b2b30"
  positive: "#34d399"
  negative: "#fb7185"
  warning: "#fbbf24"
typography:
  headline:
    fontFamily: "Manrope, ui-sans-serif, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, ui-sans-serif, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Manrope, ui-sans-serif, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 450
    lineHeight: 1.5
  label:
    fontFamily: "Manrope, ui-sans-serif, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 550
    lineHeight: 1.35
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
    height: "40px"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
    height: "44px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
---

# Design System: NexUI Precision Ledger

## 1. Overview

**Creative North Star: "The Precision Ledger"**

NexUI should feel like a calibrated operational ledger viewed in a dim studio: near-black planes, exact alignment, hairline structure, and information that becomes clearer the longer it is used. The attached references establish a monochrome-first, high-density dashboard language with calm surface layering and intentionally scarce state color.

The system rejects generic soft SaaS cards, colorful decorative gradients, glassmorphism, oversized radii, low-contrast gray-on-gray text, and ornamental motion. Familiar controls and rigorous consistency should let the interface disappear into the user’s task.

**Key Characteristics:**

- Near-black layered surfaces with crisp structural dividers
- Compact, tabular data and controlled information density
- One consistent control vocabulary across every route
- Green, red, and amber reserved for semantic state
- Responsive structure, visible keyboard focus, and motion restraint

## 2. Colors

The palette is graphite and ink, with state colors used sparingly enough to retain meaning.

### Primary

- **Signal Ink** (`#fafafa`): primary actions, selected controls, and high-emphasis text on dark surfaces.

### Secondary

- **Positive Signal** (`#34d399`): favorable trends and confirmed success.
- **Negative Signal** (`#fb7185`): unfavorable trends, errors, and destructive actions.
- **Attention Signal** (`#fbbf24`): warning and nearing-limit states.

### Neutral

- **Ledger Canvas** (`#09090b`): dark-mode application background.
- **Working Surface** (`#111113`): panels, navigation, and fields.
- **Raised Surface** (`#18181b`): selected rows, menus, and elevated controls.
- **Primary Ink** (`#fafafa`): primary content.
- **Secondary Ink** (`#a1a1aa`): supporting labels that still meet AA contrast.
- **Hairline** (`#2b2b30`): structural borders and separators.

### Named Rules

**The State Owns Color Rule.** Accent color communicates selection, status, or action; it is never ambient decoration.

## 3. Typography

**Display Font:** Manrope (with `ui-sans-serif` fallback)  
**Body Font:** Manrope (with `ui-sans-serif` fallback)  
**Label/Mono Font:** Manrope with tabular numeral features for data

**Character:** A single precise sans keeps the dashboard coherent and avoids competing display voices. Weight and spacing create hierarchy; data uses tabular numerals to prevent layout shift.

### Hierarchy

- **Headline** (650, 24px, 1.2): route titles and the dominant dashboard greeting.
- **Title** (600, 14px, 1.35): panel titles and primary row labels.
- **Body** (450, 14px, 1.5): descriptions and operational content, capped at 70ch for prose.
- **Label** (550, 12px, 1.35): metadata, chart labels, and compact control copy; sentence case by default.

### Named Rules

**The Stable Measure Rule.** Never change font weight to indicate hover or selection; use color, surface, or an indicator so layout remains stable.

## 4. Elevation

The system is flat and layered rather than shadow-heavy. Background tone and hairline boundaries define depth at rest; menus and dialogs may use a compact shadow only when they must separate from a nearby surface.

### Shadow Vocabulary

- **Floating control** (`0 8px 24px rgba(0,0,0,.28)`): popovers, dropdowns, and dialogs only.
- **Focus halo** (`0 0 0 2px color-mix(in oklch, currentColor 28%, transparent)`): keyboard focus without changing layout.

### Named Rules

**The Flat-by-Default Rule.** Panels do not hover above the page. Elevation appears only when interaction creates a true stacking relationship.

## 5. Components

### Buttons

- **Shape:** compact rounded rectangle (8px) with a minimum 40px visual height and 44px touch target.
- **Primary:** high-contrast ink fill, canvas text, 14px medium label.
- **Hover / Focus:** subtle tone shift on fine pointers; neutral 2px focus ring; `scale(.98)` active feedback.
- **Secondary / Ghost:** raised neutral or transparent surface with the same geometry and label treatment.

### Chips

- **Style:** compact 6px radius, hairline boundary, and sentence-case label.
- **State:** selected chips use the high-contrast ink/canvas inversion; status chips pair text with an icon or explicit word so color is never the only signal.

### Cards / Containers

- **Corner Style:** 12px maximum.
- **Background:** working surface on canvas, or transparent when a simple divider is sufficient.
- **Shadow Strategy:** none at rest.
- **Border:** one hairline structural boundary; no accent side stripes.
- **Internal Padding:** 16–24px based on content density.

### Inputs / Fields

- **Style:** 44px minimum height, 8px radius, working-surface fill, visible label, and 16px text on mobile.
- **Focus:** neutral high-contrast ring with no layout shift.
- **Error / Disabled:** error copy is colocated and announced; disabled controls retain legible text and an explicit unavailable state.

### Navigation

The desktop rail is compact, structurally separated, and optimized for recognition; mobile navigation becomes an accessible sheet. Active items use a raised surface and persistent marker, while icon-only states always expose labels through tooltips and `aria-label` text.

### Data Panels

Charts use the neutral ramp first, semantic color second, and line/dash/shape differentiation for color-blind resilience. Values use tabular numerals, legends remain visible without hover, and tooltips repeat series names and exact values.

## 6. Do's and Don'ts

### Do:

- **Do** use canvas, working surface, and raised surface to create a clear three-level hierarchy.
- **Do** keep interactive targets at least 44px and provide visible neutral focus rings.
- **Do** use tabular numerals for prices, counts, percentages, and changing values.
- **Do** pair every state color with text, iconography, shape, or line style.
- **Do** disable nonessential transitions and motion when `prefers-reduced-motion` is set.

### Don't:

- **Don't** use generic soft SaaS cards, colorful decorative gradients, glassmorphism, or oversized radii.
- **Don't** use low-contrast gray-on-gray text or rely on color alone for meaning.
- **Don't** scatter unrelated accent colors across charts or decorative surfaces.
- **Don't** add ornamental page-load choreography to frequently used product screens.
- **Don't** combine a decorative 1px border with a wide, soft card shadow.
- **Don't** use colored side-stripe borders or gradient text.

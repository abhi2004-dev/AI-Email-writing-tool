---
version: alpha
name: Mailmodo Bright SaaS
description: A clean, high-trust marketing platform system with a vivid indigo accent and airy editorial spacing.
colors:
  primary: "#5A45FE"
  primary-60: "#7B6BFF"
  primary-20: "#DCD7FF"
  secondary: "#101043"
  tertiary: "#E7E7E7"
  neutral: "#FFFFFF"
  surface: "#FFFFFF"
  surface-raised: "#F8FAFF"
  on-surface: "#101043"
  muted: "#5B5E7A"
  border: "#E5ECF3"
  border-soft: "#F0F3F8"
  success: "#21C27A"
  error: "#E5484D"
typography:
  headline-display:
    fontFamily: Inter
    fontSize: 62px
    fontWeight: 600
    lineHeight: 65px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 600
    lineHeight: 65px
    letterSpacing: 0em
  headline-md:
    fontFamily: Inter
    fontSize: 37px
    fontWeight: 400
    lineHeight: 58px
    letterSpacing: -0.03em
  headline-sm:
    fontFamily: Inter
    fontSize: 29px
    fontWeight: 400
    lineHeight: 35px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: 400
    lineHeight: 33px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0em
  label-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 600
    lineHeight: 18px
    letterSpacing: 0em
  link-sm:
    fontFamily: -apple-system
    fontSize: 13px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 9px
  xl: 16px
  full: 9999px
spacing:
  xs: 10px
  sm: 20px
  md: 30px
  lg: 60px
  xl: 84px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 21px 19px
    size: 215px
    height: 60px
  button-primary-hover:
    backgroundColor: "{colors.primary-60}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 21px 19px
    size: 215px
    height: 60px
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 0px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 29px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 16px
  chip:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 8px
---

# Mailmodo Bright SaaS

## Overview
Mailmodo feels modern, approachable, and conversion-focused, with a polished SaaS tone rather than a playful consumer feel. The visual language is spacious and airy, using a lot of white space and soft blue glow to make the interface feel optimistic and easy to scan. It is clearly designed for marketers and growth teams who want confidence, clarity, and quick action.

## Colors
- **Primary (#5A45FE):** A vivid indigo-violet used for the main CTA, active brand moments, and emphasis. It gives the UI a lively, high-conversion energy without becoming neon.
- **Secondary (#101043):** A deep navy-ink text color used for headings, navigation, and body copy. It creates strong contrast and keeps the interface feeling professional.
- **Surface (#FFFFFF):** The dominant background and card color. The system leans heavily on white to preserve openness and readability.
- **Surface-raised (#F8FAFF):** A faint cool tint for subtle elevated areas and soft UI layers. It helps sections feel slightly separated without adding heavy chrome.
- **Border (#E5ECF3):** A pale cool border tone for cards, buttons, and inputs. It supports structure with minimal visual weight.
- **Border-soft (#F0F3F8):** An even lighter separator tone for fine dividing lines and understated containers.
- **Primary-60 (#7B6BFF):** A lighter indigo used for hover/focus variation and softer accent moments.
- **Primary-20 (#DCD7FF):** A washed lavender tint useful for chips, badges, and gentle highlight surfaces.
- **Muted (#5B5E7A):** A softened slate for supportive text and secondary metadata.
- **Success (#21C27A):** A restrained green for positive confirmations and success indicators.
- **Error (#E5484D):** A clear warning color reserved for destructive or invalid states.

## Typography
Inter is the core typeface, with a clean geometric-neutral feel that suits a SaaS landing page. Headings use medium to semibold weight, with the display headline at 62px/65px and the main page headline at 48px/65px for strong hierarchy. Body copy stays simple and highly legible, while labels and buttons use 600 weight to feel decisive and action-oriented. Letter spacing is mostly neutral, with only a slightly tightened display treatment for the largest headline; there is no visible uppercase system or aggressive tracking.

## Layout
The page is built around a centered hero composition with generous vertical breathing room and a fixed-content feel rather than a dense grid. Spacing follows a broad rhythm from 10px up to 84px, producing distinct separation between navigation, hero copy, CTA, and the product preview. Cards and dialogs use medium internal padding, and sections rely on large outer whitespace instead of dense column packing. The overall structure feels like a wide desktop landing page with carefully staged focal points.

## Elevation & Depth
Depth is used sparingly but intentionally. The system prefers flat white surfaces with soft borders, then adds subtle shadow to buttons and cards for a gentle lifted effect. The primary button has the strongest depth cue through an inset highlight plus a soft drop shadow, while cards use a very light shadow and pale outline. Background glow gradients create atmospheric depth more than component shadow does.

## Shapes
The shape language is gently rounded and friendly, with 4px radii on controls and about 9px on cards. This keeps the UI crisp and product-led rather than pill-shaped or whimsical. Corners feel controlled and functional, reinforcing a professional marketing-tool aesthetic.

## Components
Buttons are the clearest expression of the system. `button-primary` should be used for the main conversion action: indigo fill, white text, 21px by 19px padding, 60px height, and a minimum width of 215px. Hover states should lighten slightly using `button-primary-hover`, not change the silhouette. `button-secondary` is a white outlined alternative with dark text and the same sizing, ideal for login or less important actions. `button-tertiary` should stay minimal and text-only for lightweight navigation or inline actions.

Cards should use the `card` treatment: white background, soft border, 29px padding, and the subtle 9px radius. Keep shadows restrained so cards feel like containers, not floating panels. Inputs should mirror the same calm language: white fill, soft border, and rounded corners with enough padding for comfortable typing. Chips and tags should be quiet and low-contrast, using soft tinted backgrounds and compact padding.

Navigation links and small utility actions should remain understated, typically using the body or label typography with minimal chrome. Avoid overly decorative states, heavy gradients inside components, or aggressive icon framing. The interface works best when actions are clearly differentiated by color and weight rather than by complex ornament.

## Do's and Don'ts
- Do keep the layout airy, with large margins and generous section spacing.
- Do use the primary indigo only for key actions and focal emphasis.
- Do preserve the simple, high-contrast typography hierarchy.
- Do rely on soft borders and subtle shadows for depth.
- Don't introduce heavy dark surfaces or dense dashboard-style panels.
- Don't over-round controls into pills unless the component is explicitly a chip.
- Don't use bright secondary accent colors that compete with the primary indigo.
- Don't crowd the hero or card content; the system depends on breathing room.
# Pixel Perfect | Design System (STRICT ENFORCEMENT)

## 1. Anti-Generic UI Directives
*   **BANNED ELEMENTS:** Left-bordered quote bubbles, soft pastel gradients, generic line icons (unless functional), and heavy border-radiuses (`rounded-xl`+).
*   **AESTHETIC:** Cyber-Brutalist / Esports Arena. Sharp, high-contrast, technical, and data-heavy. Utilize grids, sharp lines, and neon typography.

## 2. Color System & UI State Mapping
*   **Global Theme (Pixel Perfect):**
    *   `Primary Background`: `#242424` (Deep space/dark mode).
    *   `Surface Cards`: `#111111` with strict 1px solid borders in `#333333`.
    *   `Primary Brand / Accent`: `#15ffff` (Cyan). Used for sharp highlights, glowing text shadows, and active states.
    *   `Destructive/Hype Accent`: `#ff2c63` (Pink/Magenta).
    *   `Text Primary`: `#ffffff`.
    *   `Text Muted`: `rgba(255, 255, 255, 0.6)`.
*   **Sub-Theme (Campus Masters Override):**
    *   `Primary Background`: `#0f172a` (Deep Navy).
    *   `Primary Accent`: `#ffea00` (Vibrant CM Yellow).
    *   `Text Inverse` (On Yellow): `#000000`.

## 3. Typography & Geometries
*   **Primary Typeface:** 'Orbitron', 'Montserrat Black', or 'Space Grotesk'. Must be blocky, wide, and aggressive. No soft sans-serifs for headers.
*   **Secondary Typeface:** 'Inter' or 'Roboto Mono' for technical readouts.
*   **Borders & Radii:** 
    *   Buttons & Cards: `rounded-none` or `rounded-sm` (max 2px-4px). Sharp edges emphasize technical precision.
    *   Focus States: 2px solid `#15ffff` outline with zero offset.
# Components

- `Alert`
- `Avatar`
- `Badge`
- `BottomSheet`
- `BottomSheetHeader`
- `BrandLogo`
- `Button`
- `Card`
- `CardControl`
- `Checkbox`
- `Chip`
- `Dropdown`
- `HomeIndicator`
- `Icon`
- `Keyboard`
- `ListItem`
- `Loading`
- `Logo`
- `OtpTextField`
- `OverflowMenu`
- `PageControl`
- `Radio`
- `SegmentedControl`
- `Snackbar`
- `StatusBar`
- `Switch`
- `Tabs` (`src/components/Tab/`)
- `TextField`
- `Tile`

# Widgets

- `ActivityTimeline`
- `BottomNav`
- `DataPoints`
- `GraphWidget`
- `Header`
- `HeatmapWidget`
- `MFCardWidget`
- `NewsWidget`
- `PortfolioWidget`
- `ReminderWidget`
- `Search`
- `SectionHeader`
- `StocksCard`
- `Ticker`
- `WheelCarousel`

# Layouts

- `AppShell` (`src/layout/AppShell.tsx`)

# Tokens

- `src/tokens/colors.css` — color primitives; semantic background, text, icon, border, surface, brand, glass, interaction, shadow, overlay, glow, snackbar (light `:root` + dark `[data-theme='dark']`)
- `src/tokens/numbers.css` — unit scale; semantic spacing; card/phone/card/carousel sizing; hairline border; touch target; radius; heatmap and wheel-carousel layout tokens
- `src/tokens/typography.css` — `--font-family`, weights, core size/line-height tokens; typography utility classes (e.g. `body-regular`, `display-2-medium`, `title-4-medium`)
- Storybook token references — `src/stories/Colors.stories.tsx`, `src/stories/Numbers.stories.tsx`, `src/stories/Typography.stories.tsx`
- App-level semantic aliases in `src/index.css` (e.g. `--text`, `--bg`, `--accent`) that map onto design tokens

# Ambiguous Items

- **Screen-level compositions** (not exported from `src/components/` as a single primitive): `StockHomePage`, `DiscoverPage`, `LoginPage`, `SignUpPage`, etc. — each pairs TSX with page-scoped CSS (`StockHome.css`, `Discover.css`, etc.). Removed demos (Cards, Goals, …) are summarized in **`docs/LEARNINGS.md`** only.
- **Page layout as CSS convention** — shared patterns like `.stock-home`, `.sh-content`, `.sh-section` live in page stylesheets rather than a dedicated `Stack` / `Section` / `Container` layout component library
- **No dedicated token files** in `src/tokens/` for z-index scales or breakpoint tokens (responsive rules appear ad hoc in CSS / Storybook)
- **Storybook** — `Introduction.stories.tsx` (meta/docs) and component stories — documentation/preview, not UI building blocks

# @frontforge/ui: review

Reviewed 2026-11-01. This is a static review: the code was read but nothing was installed, built, linted or tested. Findings marked *(likely)* need a run to confirm.

## What it is

The component library behind FrontForge (`frontforge-labs/web`). It is React 19 + TypeScript, styled with Tailwind 3 over `--fe-*` CSS variables, built with tsup to ESM + CJS, with Storybook 9 stories. `web` consumes it through an npm link to the sibling folder `../ui`.

About 35 components in `src/components`:

| Group | Components | State |
|---|---|---|
| Primitives | Button, Card, Input, Textarea, Select, Spinner, Skeleton | Mostly finished (cva variants, forwardRef) |
| Form controls | Checkbox, RadioGroup, Switch, FormField, Form | Rough: stale ARIA, uncontrolled-only RadioGroup, buggy Switch |
| Overlays & disclosure | Modal, Drawer, Popover, Tooltip, Tabs, Accordion, Toast | Hand-rolled, with accessibility bugs (below) |
| Navigation | Navbar, Breadcrumb, RouterBreadcrumb, Sidebar, PageHeader | Rough; Sidebar is FrontForge-specific |
| FrontForge tool shell | ToolContainer, ToolLayout, ToolControlPanel, CodePanel, CodePreviewPanel, PreviewPanel, ControlGroup, FullWidthGroup, AppIcon, ColorInput | App-specific code living in the library |
| Theme | ThemeProvider, ThemeToggle, `theme/tokens.ts`, `styles.css` | Works, with a flash on load and two dark-mode systems |

## What is broken

- **Lint cannot run.** There is no `eslint.config.js`. ESLint 9 ignores the `eslintConfig` key in `package.json`, and the `lint` script uses `--ext`, which flat config removed.
- **There are no unit tests.** `vitest.config.ts` defines only the Storybook project, which runs stories in Chromium through Playwright. That is slow and not suitable for a cheap deterministic gate. `"test": "vitest"` also starts watch mode.
- **XSS in the code panels.** CodePanel, CodePreviewPanel and ToolContainer render user-editable CSS with `dangerouslySetInnerHTML` without escaping it. The regex highlighter also matches inside its own inserted `<span>`s and garbles the output.
- **Accessibility bugs:**
  - **Drawer:** listens for Escape even while closed, so any Escape keypress anywhere calls `onClose`.
  - **Modal:** no Escape, no focus trap, no initial focus or focus restore, no portal, and a fixed `id="modal-title"`.
  - **Tabs:** arrow keys change the selection but not focus. Focus stays on a button that now has `tabIndex=-1`.
  - **Switch:** passes both `checked` and `defaultChecked`. `checked || props.checked` misreports a controlled `false`. The switch has no visible focus ring.
  - **Checkbox / RadioGroup:** `aria-checked` is set from the initial value, so it goes stale after the user toggles.
  - **Tooltip:** ignores `className` and uses hard-coded light colours. That breaks Sidebar's "hide tooltip when expanded" trick.
  - **Ids:** global ids (`tab-${id}`, `form-title`, radio ids taken from option values) collide between instances.
- **Packaging:**
  - `class-variance-authority`, `clsx` and `tailwind-merge` are imported at runtime but listed as devDependencies, so tsup inlines them into `dist`.
  - `tailwindcss` is listed as a runtime dependency but never imported at runtime.
  - The exports map's `require` branch points `types` at `.d.ts`; tsup emits `.d.cts` for CJS.
  - There is no `sideEffects` field, and `cn` is not exported.
- **Theming *(likely)*:**
  - Colours are bare `var(--fe-x)` with no `<alpha-value>`, so opacity modifiers like `ring-accent/50` and `text-text/70` probably generate nothing.
  - `dark:` classes follow the OS setting while the theme follows `data-theme`, because `tailwind.config.ts` has no `darkMode`.
  - Several shadcn-style class names (`bg-primary`, `text-muted-foreground`, `text-foreground`, `text-muted`) don't exist in this config.
- **ThemeProvider:**
  - It resolves the theme in an effect, so pages flash light first.
  - It reads `localStorage` without a guard.
  - It never sets `color-scheme`.
  - Its context value isn't memoised.
- **Duplicate tokens:** `theme/tokens.ts` repeats the hex values from `styles.css` and nothing imports it.

## What is missing or dated

- No `typecheck` script, no CI, no `.nvmrc`. The README is one line.
- `/stories` is the untouched Storybook template, and Storybook never loads it because `main.ts` only globs `src`.
- Tailwind 3 with a JS config. The consuming app copies the whole `theme.extend` block by hand and scans `node_modules/@frontforge/ui/dist` for classes. Tailwind 4's CSS-first `@theme` would let ui ship its tokens as one CSS file.
- Overlays are hand-rolled where a headless primitive is now the norm.
- Copy-to-clipboard and the highlighter are copy-pasted in three components, and the copy timers are never cleared on unmount.

## Target shape (agreed 2026-11-01)

- **Role:** ui stays a separate repo. `web` installs it from a git tag (`github:frontforge-labs/ui#v0.x`), and a `prepare` script builds `dist` on install. Every repo must check on its own in a fresh checkout. `npm link` remains for local work.
- **Releases:** Fred tags them by hand. The repo is public.
- **Toolchain:** Node 24 LTS (`.nvmrc`), npm, TypeScript 5.x strict.
- **Checks:**
  - `npm run lint`: ESLint 9 flat config with typescript-eslint, react-hooks, jsx-a11y, storybook and Prettier.
  - `npm run typecheck`: `tsc --noEmit`.
  - `npm run test`: `vitest run` in jsdom with Testing Library and user-event.
  - `npm run check`: runs all three, then `build`.
  - GitHub Actions runs `check`.
  - Storybook browser tests stay as an optional extra, outside `check`.
- **Styling:** Tailwind 4. ui ships `theme.css` with an `@theme` block of tokens, dark mode keyed on `[data-theme="dark"]`, and opacity through `color-mix`. `web` imports that file instead of copying config.
- **Overlays:** Modal, Drawer, Popover, Tooltip, Tabs and Accordion are rebuilt on Radix primitives.
- **Visual direction:** "Studio": dark-first, dense and IDE-like (Linear and VS Code as references), with monospace accents and one cool accent colour. A light theme exists but is secondary.
- **Scope:** the FrontForge tool shell moves to `web` over time (see the web backlog). ui becomes a generic library.

The plan is in [docs/workflow/BACKLOG.md](docs/workflow/BACKLOG.md).

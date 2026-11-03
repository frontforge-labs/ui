import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import storybook from "eslint-plugin-storybook";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  { ignores: ["dist/**", "storybook-static/**"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks, "jsx-a11y": jsxA11y },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
    },
  },
  {
    files: [
      "src/components/{Modal,Drawer,Popover,Tooltip,Tabs,Accordion,Switch,Checkbox,RadioGroup}/**/*.tsx",
    ],
    // UI-06 to UI-09 address these existing accessibility issues.
    rules: Object.fromEntries(
      Object.entries(jsxA11y.configs.recommended.rules)
        .filter(([, rule]) => ![0, "off"].includes([rule].flat()[0]))
        .map(([rule, setting]) => [
          rule,
          Array.isArray(setting) ? ["warn", ...setting.slice(1)] : "warn",
        ]),
    ),
  },
  storybook.configs["flat/recommended"],
  {
    files: ["**/*.stories.tsx"],
    // Existing renderer imports are type-only; migrating stories is separate work.
    rules: { "storybook/no-renderer-packages": "off" },
  },
  {
    files: [
      "src/components/{CodePanel,CodePreviewPanel}/*.tsx",
      "src/theme/ThemeProvider.tsx",
    ],
    // Preserve existing prop/theme synchronization; behavior changes are out of scope.
    rules: { "react-hooks/set-state-in-effect": "off" },
  },
  {
    files: ["src/components/{CodePanel,CodePreviewPanel,ToolContainer}/*.tsx"],
    // Existing click-to-edit code panels need a separate keyboard interaction redesign.
    rules: {
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
    },
  },
  prettier,
);

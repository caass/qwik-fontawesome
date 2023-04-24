import type { StorybookConfig } from "storybook-framework-qwik";

export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "storybook-framework-qwik",
  },
  docs: {
    autodocs: "tag",
  },
} satisfies StorybookConfig;

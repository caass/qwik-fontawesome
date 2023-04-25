// import { action } from "@storybook/addon-actions";
// import { $ } from "@builder.io/qwik";
import type { Meta, StoryObj } from "storybook-framework-qwik";
import { FaIcon } from "./icon";
import type { IconProps } from "./icon";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const meta = {
  title: "Icon",
  component: FaIcon,
  args: {
    icon: faThumbsUp,
    size: "8x",
  },
} satisfies Meta<IconProps>;

export default meta;

type Story = StoryObj<IconProps>;

export const Static: Story = {};

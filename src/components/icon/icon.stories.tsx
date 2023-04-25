// import { action } from "@storybook/addon-actions";
// import { $ } from "@builder.io/qwik";
import type { Meta, StoryObj } from "storybook-framework-qwik";
import { FaIcon } from "./icon";
import type { IconProps } from "./icon";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCss } from "../..";

const meta = {
  title: "Icon",
  component: FaIcon,
  render: (args) => (
    <>
      <style dangerouslySetInnerHTML={faCss} />
      <FaIcon {...args} />
    </>
  ),
} satisfies Meta<IconProps>;

export default meta;

type Story = StoryObj<IconProps>;

export const Static: Story = { args: { icon: faThumbsUp } };
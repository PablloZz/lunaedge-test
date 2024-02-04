import { type StoryObj, type Meta } from "@storybook/react";
import { Badge } from "./badge.js";
import { StorybookBadge } from "./libs/components/components.js";

/**
 * Badge components is used as values in the multiple select
 */
export default {
  title: "Components/Badge",
  component: Badge,
  docs: {
    title: "Badge",
  },
  decorators: [
    Story => (
      <section className="flex flex-wrap gap-6">
        <Story />
      </section>
    ),
  ],
} as Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: "Badge",
  },

  render: args => (
    <StorybookBadge title="Default">
      <Badge {...args} />
    </StorybookBadge>
  ),
};

export const Icons: Story = {
  args: {
    ...Default.args,
  },

  render: args => (
    <>
      <StorybookBadge title="None">
        <Badge {...args} />
      </StorybookBadge>
      <StorybookBadge title="Circle">
        <Badge {...args} icon="circle" />
      </StorybookBadge>
      <StorybookBadge title="Close">
        <Badge {...args} icon="close" />
      </StorybookBadge>
    </>
  ),
};

export const Variants: Story = {
  args: {
    ...Default.args,
  },

  render: args => (
    <>
      <StorybookBadge title="Circle">
        <Badge {...args} variant="circle" />
      </StorybookBadge>
      <StorybookBadge title="Square">
        <Badge {...args} variant="square" />
      </StorybookBadge>
    </>
  ),
};

export const Colors: Story = {
  args: {
    ...Default.args,
  },

  render: args => (
    <>
      <StorybookBadge title="Gray">
        <Badge {...args} color="gray" />
      </StorybookBadge>
      <StorybookBadge title="Red">
        <Badge {...args} color="red" />
      </StorybookBadge>
      <StorybookBadge title="Yellow">
        <Badge {...args} color="yellow" />
      </StorybookBadge>
      <StorybookBadge title="Green">
        <Badge {...args} color="green" />
      </StorybookBadge>
      <StorybookBadge title="Blue">
        <Badge {...args} color="blue" />
      </StorybookBadge>
      <StorybookBadge title="Purple">
        <Badge {...args} color="purple" />
      </StorybookBadge>
      <StorybookBadge title="Pink">
        <Badge {...args} color="pink" />
      </StorybookBadge>
      <StorybookBadge title="Dark Gray">
        <Badge {...args} color="darkGray" />
      </StorybookBadge>
      <StorybookBadge title="Orange">
        <Badge {...args} color="orange" />
      </StorybookBadge>
    </>
  ),
};

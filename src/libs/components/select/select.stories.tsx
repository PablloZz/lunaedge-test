import { type Meta } from "@storybook/react";
import { Select } from "./select.js";
import {
  StorybookMultipleSelect,
  StorybookSingleSelect,
} from "./libs/components/components.js";

/**
 * Select components allow users to select one option from a list. They typically appear in forms.
 */
export default {
  title: "Components/Select",
  component: Select,
  docs: {
    title: "Select",
  },
  decorators: [
    Story => (
      <section className="flex items-start justify-between flex-wrap gap-4 w-full max-w-[1000px]">
        <Story />
      </section>
    ),
  ],
} as Meta;

export const Default = () => <StorybookSingleSelect title="Default" />;

export const Variant = () => {
  return (
    <>
      <StorybookMultipleSelect title="Multiple" />
      <StorybookSingleSelect title="Single" />
    </>
  );
};

export const Disabled = () => {
  return (
    <>
      <StorybookMultipleSelect title="Multiple Disabled" disabled />
      <StorybookSingleSelect title="Single Disabled" disabled />
    </>
  );
};

export const Error = () => {
  const selectError = { message: "Error" };

  return (
    <>
      <StorybookMultipleSelect title="Multiple Error" error={selectError} />
      <StorybookSingleSelect title="Single Error" error={selectError} />
    </>
  );
};

export const MultipleSelectBadgeVariants = () => {
  return (
    <>
      <StorybookMultipleSelect
        title="Multiple Select Badge Square Variant"
        badgeVariant="square"
      />
      <StorybookMultipleSelect
        title="Multiple Select Badge Circle Variant"
        badgeVariant="circle"
      />
    </>
  );
};

export const MultipleSelectBadgeIcons = () => {
  return (
    <>
      <StorybookMultipleSelect title="Multiple Select Badge Without Icon" />
      <StorybookMultipleSelect
        title="Multiple Select Badge Delete Icon"
        badgeIcon="close"
      />
      <StorybookMultipleSelect
        title="Multiple Select Badge Circle Icon"
        badgeIcon="circle"
      />
    </>
  );
};

export const MultipleSelectBadgeColors = () => {
  return (
    <>
      <StorybookMultipleSelect
        title="Multiple Select Badge Blue Color"
        badgeColor="blue"
      />
      <StorybookMultipleSelect
        title="Multiple Select Badge Dark Gray Color"
        badgeColor="darkGray"
      />
      <StorybookMultipleSelect
        title="Multiple Select Badge Gray Color"
        badgeColor="gray"
      />
      <StorybookMultipleSelect
        title="Multiple Select Badge Green Color"
        badgeColor="green"
      />
      <StorybookMultipleSelect
        title="Multiple Select Badge Orange Color"
        badgeColor="orange"
      />
      <StorybookMultipleSelect
        title="Multiple Select Badge Pink Color"
        badgeColor="pink"
      />
      <StorybookMultipleSelect
        title="Multiple Select Badge Purple Color"
        badgeColor="purple"
      />
      <StorybookMultipleSelect
        title="Multiple Select Badge Red Color"
        badgeColor="red"
      />
      <StorybookMultipleSelect
        title="Multiple Select Badge Yellow Color"
        badgeColor="yellow"
      />
    </>
  );
};

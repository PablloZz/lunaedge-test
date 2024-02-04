import { useState } from "react";
import {
  type SelectOption,
  type MultipleSelectProperties,
} from "../../types/types.js";
import { Select } from "~/libs/components/components.js";
import { type SelectProperties } from "../../../select.js";
import { STORYBOOK_SELECT_OPTIONS } from "../../constants/constants.js";

type Properties = Pick<
  MultipleSelectProperties,
  "error" | "badgeVariant" | "badgeIcon" | "badgeColor"
> &
  Pick<SelectProperties, "disabled"> & {
    title: string;
  };

const StorybookMultipleSelect: React.FC<Properties> = ({
  title,
  disabled,
  error,
  badgeVariant,
  badgeIcon,
  badgeColor,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [options] = useState<SelectOption[]>(STORYBOOK_SELECT_OPTIONS);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);

  const filteredOptions = options.filter(pokemon => {
    return pokemon.label.startsWith(searchQuery);
  });

  const handleChange = (options: SelectOption[]) => {
    setSelectedOptions(options);
  };

  const handleSearchOptions = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-[400px]">
      <span className="text-sm">{title}</span>
      <Select
        label="Label"
        hint="Hint"
        placeholder="Placeholder"
        options={filteredOptions}
        value={selectedOptions}
        multiple
        badgeVariant={badgeVariant}
        badgeIcon={badgeIcon}
        badgeColor={badgeColor}
        onChange={handleChange}
        searchQuery={searchQuery}
        onSearchOption={handleSearchOptions}
        disabled={disabled}
        error={error}
      />
    </div>
  );
};

export { StorybookMultipleSelect };

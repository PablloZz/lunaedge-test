import {
  type BadgeColor,
  type BadgeIcon,
  type BadgeVariant,
} from "../../libs/components/badge/badge.js";
import {
  type MultipleSelectError,
  type SingleSelectError,
} from "./select-error.type.js";
import { SelectOption } from "./types.js";

type SingleSelectProperties = {
  multiple?: false;
  value: SelectOption | null;
  onChange: (value: SelectOption | null) => void;
  badgeIcon?: null;
  badgeVariant?: null;
  badgeColor?: null;
  error?: SingleSelectError;
};

type MultipleSelectProperties = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  badgeIcon?: BadgeIcon;
  badgeVariant: BadgeVariant;
  badgeColor: BadgeColor;
  error?: MultipleSelectError;
};

export { type SingleSelectProperties, type MultipleSelectProperties };

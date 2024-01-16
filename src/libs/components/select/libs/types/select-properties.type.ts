import {
  type BadgeColor,
  type BadgeIcon,
  type BadgeVariant,
} from "../../libs/components/badge/badge.js";
import { SelectOption } from "./types.js";

type SingleSelectProperties = {
  multiple?: false;
  value: SelectOption | null;
  onChange: (value: SelectOption | null) => void;
  badgeIcon?: null;
  badgeVariant?: null;
  badgeColor?: null;
};

type MultipleSelectProperties = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  badgeIcon?: BadgeIcon;
  badgeVariant: BadgeVariant;
  badgeColor: BadgeColor;
};

export { type SingleSelectProperties, type MultipleSelectProperties };

import { Icon } from "~/libs/components/components.js";
import {
  type BadgeIcon,
  type BadgeVariant,
  type BadgeColor,
} from "./libs/types/types.js";
import { getBadgeColorClasses } from "./libs/helpers/helpers.js";

type Properties = {
  label: string;
  onClick?: () => void;
  icon?: BadgeIcon;
  variant?: BadgeVariant;
  color?: BadgeColor;
};

const Badge: React.FC<Properties> = ({
  label,
  onClick,
  icon,
  variant = "circle",
  color = "gray",
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Clear the option"
    className={`flex items-center justify-center gap-1.5 whitespace-nowrap py-0.5 px-2.5 ${
      variant === "square" ? "rounded-md" : "rounded-full"
    } text-xs sm:text-base ${getBadgeColorClasses(color, icon).badge}`}
  >
    {icon === "circle" && (
      <span
        className={`border-4 rounded-full ${
          getBadgeColorClasses(color, icon).icon
        }`}
      ></span>
    )}
    {label}
    {icon === "close" && (
      <Icon
        iconName="close"
        className={`w-4 hover:text-gray-600 ${
          getBadgeColorClasses(color, icon).icon
        }`}
      />
    )}
  </button>
);

export { Badge };
export { type Properties as BadgeProperties };
export {
  type BadgeIcon,
  type BadgeVariant,
  type BadgeColor,
} from "./libs/types/types.js";

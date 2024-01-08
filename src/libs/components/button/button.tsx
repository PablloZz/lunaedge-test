import { Icon } from "../icon/icon.js";
import { getButtonStyles } from "./libs/helpers/helpers.js";
import { type ButtonIcon, type ButtonVariant } from "./libs/types/types.js";

type Properties = {
  variant: ButtonVariant;
  className?: string;
  disabled?: boolean;
  icon?: ButtonIcon;
  iconClassName?: string;
};

const Button: React.FC<Properties> = ({
  variant,
  className = "",
  disabled,
  icon,
  iconClassName = "",
}) => (
  <button
    disabled={disabled}
    className={`${getButtonStyles(variant, icon)} ${className}`}
  >
    {icon && (
      <Icon
        iconName={icon}
        className={`flex items-center justify-center h-[1em] w-[1em] text-inherit ${iconClassName}`}
      />
    )}
    Fight
  </button>
);

export { Button };

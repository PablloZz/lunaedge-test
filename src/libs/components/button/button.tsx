import { Icon } from "../icon/icon.js";
import {
  type ButtonIcon,
  type ButtonVariant,
  type ButtonType,
} from "./libs/types/types.js";
import { BUTTON_STYLES } from "./libs/constants/constants.js";

type Properties = {
  type: ButtonType;
  label?: string;
  variant: ButtonVariant;
  className?: string;
  disabled?: boolean;
  icon?: ButtonIcon;
  iconClassName?: string;
  onClick?: (() => void) | ((event: React.MouseEvent) => void);
};

const Button: React.FC<Properties> = ({
  type,
  label,
  variant,
  className = "",
  disabled,
  icon,
  iconClassName = "",
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`flex ${
      icon === "curetDown" ? "row-reverse" : "row"
    } items-center justify-center gap-[5px] text-sm md:text-xl px-2 py-1 sm:px-3 md:px-3.5 lg:px-4 xl:px-5 min-w-fit h-5 sm:h-6 md:h-8 lg:h-10 xl:h-12 rounded ${
      BUTTON_STYLES[variant]
    } ${className}`}
  >
    {icon && (
      <Icon
        iconName={icon}
        className={`flex items-center justify-center h-[1em] w-[1em] text-inherit ${iconClassName}`}
      />
    )}
    {label}
  </button>
);

export { Button };

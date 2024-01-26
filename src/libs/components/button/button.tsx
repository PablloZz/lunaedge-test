import { Icon } from "../icon/icon.js";
import {
  type ButtonIcon,
  type ButtonVariant,
  type ButtonType,
} from "./libs/types/types.js";
import { BUTTON_STYLES } from "./libs/constants/constants.js";

type Properties = {
  type: ButtonType;
  label: string;
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
  onClick,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center gap-[5px] border-0 ${
      icon === "curetDown" ? "row-reverse" : "row"
    }  text-xs sm:text-sm md:text-base xl:text-lg min-w-fit px-1 sm:w-20 md:w-28 lg:w-[120px] xl:w-[130px] h-5 sm:h-6 md:h-8 lg:h-10 xl:h-12 rounded ${
      BUTTON_STYLES[variant]
    } ${className}`}
  >
    {icon && (
      <Icon
        iconName={icon}
        className={`flex items-center justify-center h-[1.3em] w-[1.3em] text-inherit ${iconClassName}`}
      />
    )}
    {label}
  </button>
);

export { Button };

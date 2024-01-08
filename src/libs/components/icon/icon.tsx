import Envelope from "~/assets/icons/envelope.icon.svg?react";
import Eye from "~/assets/icons/eye.icon.svg?react";
import EyeSlash from "~/assets/icons/eye-slash.icon.svg?react";
import Star from "~/assets/icons/star.icon.svg?react";
import CuretDown from "~/assets/icons/curet-down.icon.svg?react";

type IconName = "envelope" | "eye" | "eyeSlash" | "star" | "curetDown";

const iconNameToIcon: Record<
  IconName,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  envelope: Envelope,
  eye: Eye,
  eyeSlash: EyeSlash,
  star: Star,
  curetDown: CuretDown,
};

type Properties = {
  iconName: IconName;
  ariaLabel?: string;
  ariaRole?: "img" | "none";
  className?: string;
};

const Icon: React.FC<Properties> = ({
  iconName,
  ariaLabel = "",
  ariaRole = "none",
  className,
}) => {
  const SvgElement = iconNameToIcon[iconName];
  return (
    <SvgElement aria-label={ariaLabel} role={ariaRole} className={className} />
  );
};

export { Icon };
export { type IconName };

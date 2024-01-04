import envelope from "~/assets/icons/envelope.icon.svg";
import eye from "~/assets/icons/eye.icon.svg";
import eyeSlash from "~/assets/icons/eye-slash.icon.svg";

type IconName = "envelope" | "eye" | "eyeSlash";

const iconNameToIcon: Record<IconName, string> = {
  envelope,
  eye,
  eyeSlash,
};

type Properties = {
  iconName: IconName;
  alt?: string;
  ariaRole?: "img" | "none";
  className?: string;
};

const Icon: React.FC<Properties> = ({
  iconName,
  alt = "",
  ariaRole = "none",
  className,
}) => (
  <img
    src={iconNameToIcon[iconName]}
    alt={alt}
    role={ariaRole}
    className={className}
  />
);

export { Icon };

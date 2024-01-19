import {
  InformationCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

type IconName =
  | "envelope"
  | "show"
  | "hide"
  | "star"
  | "curetUp"
  | "curetDown"
  | "info"
  | "close";

const iconNameToIcon: Record<
  IconName,
  React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >
> = {
  envelope: EnvelopeIcon,
  show: EyeIcon,
  hide: EyeSlashIcon,
  star: StarIcon,
  curetUp: ChevronUpIcon,
  curetDown: ChevronDownIcon,
  info: InformationCircleIcon,
  close: XMarkIcon,
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

import { ButtonIcon, type ButtonVariant } from "../../types/types.js";

const getButtonStyles = (variant: ButtonVariant, icon?: ButtonIcon) => {
  const buttonStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-indigo-700 hover:bg-indigo-500 active:bg-indigo-500 focus:bg-indigo-500 focus:outline-indigo-700 text-white disabled:bg-indigo-200 disabled:text-indigo-300",
    outline:
      "text-indigo-700 hover:text-indigo-500 active:text-indigo-500 hover:bg-indigo-300 active:bg-indigo-300 focus:bg-indigo-300 focus:outline-indigo-700 border-2 disabled:border-0 disabled:bg-indigo-200 disabled:text-indigo-300",
    text: "hover:text-indigo-500 active:text-indigo-500 hover:bg-indigo-300 active:bg-indigo-300 focus:outline-indigo-700 focus:text-indigo-700 disabled:border-0 disabled:bg-indigo-200 disabled:text-indigo-300",
  };

  const styles = `flex ${
    icon === "star" ? "flex-row" : "flex-row-reverse"
  } items-center justify-center gap-[5px] text-sm md:text-xl px-2 py-1 sm:px-3 md:px-3.5 lg:px-4 xl:px-5 min-w-fit h-5 sm:h-6 md:h-8 lg:h-10 xl:h-12 rounded`;
  if (variant === "outline") {
    return `${styles} ${buttonStyles.outline}`;
  } else if (variant === "primary") {
    return `${styles} ${buttonStyles.primary}`;
  } else {
    return `${styles} ${buttonStyles.text}`;
  }
};

export { getButtonStyles };

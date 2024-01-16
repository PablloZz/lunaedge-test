import { type ButtonVariant } from "../../types/types.js";

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-700 hover:bg-indigo-500 active:bg-indigo-500 focus:bg-indigo-500 focus:outline-indigo-700 text-white disabled:bg-indigo-200 disabled:text-indigo-300",
  outline:
    "text-indigo-700 hover:text-indigo-500 active:text-indigo-500 hover:bg-indigo-300 active:bg-indigo-300 focus:bg-indigo-300 focus:outline-indigo-700 border-2 disabled:border-0 disabled:bg-indigo-200 disabled:text-indigo-300",
  text: "hover:text-indigo-500 active:text-indigo-500 hover:bg-indigo-300 active:bg-indigo-300 focus:outline-indigo-700 focus:text-indigo-700 disabled:border-0 disabled:bg-indigo-200 disabled:text-indigo-300",
};

export { BUTTON_STYLES };

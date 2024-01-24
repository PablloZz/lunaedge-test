import { type ButtonVariant } from "../../types/types.js";

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary:
    "text-white disabled:text-indigo-300 bg-indigo-700 hover:bg-indigo-500 active:bg-indigo-500 focus:bg-indigo-500 disabled:bg-indigo-200 focus:outline focus:outline-2 focus:outline-indigo-700",
  outline:
    "text-indigo-700 hover:text-indigo-500 active:text-indigo-500 disabled:text-indigo-300 bg-white hover:bg-indigo-300 active:bg-indigo-300 focus:bg-indigo-300 disabled:bg-indigo-200 outline outline-1 outline-indigo-700 hover:outline-indigo-500 focus:outline-2 disabled:outline-0",
  text: "hover:text-indigo-500 active:text-indigo-500 focus:text-indigo-700 disabled:text-indigo-300 bg-white hover:bg-indigo-300 active:bg-indigo-300 disabled:bg-indigo-200 focus:outline focus:outline-2 focus:outline-indigo-700",
};

export { BUTTON_STYLES };

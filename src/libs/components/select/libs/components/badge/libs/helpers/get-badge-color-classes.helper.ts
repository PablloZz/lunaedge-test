import { type BadgeColor, type BadgeIcon } from "../types/types.js";
import { type BadgeClassesVariant } from "../types/types.js";
import { combineBadgeClasses } from "./helpers.js";

const getBadgeColorClasses = (
  color: BadgeColor,
  icon?: BadgeIcon
): BadgeClassesVariant => {
  switch (color) {
    case "gray": {
      return combineBadgeClasses(
        {
          badge: "text-black bg-gray-200 hover:bg-gray-300",
          icon: "text-gray-400 group-hover:text-gray-500",
        },
        icon
      );
    }
    case "red": {
      return combineBadgeClasses(
        {
          badge: "text-red-600 bg-red-200 hover:bg-red-300",
          icon: "text-red-400 group-hover:text-red-500",
        },
        icon
      );
    }
    case "yellow": {
      return combineBadgeClasses(
        {
          badge: "text-amber-800 bg-amber-200 hover:bg-amber-300",
          icon: "text-amber-400 group-hover:text-amber-500",
        },
        icon
      );
    }
    case "green": {
      return combineBadgeClasses(
        {
          badge: "text-green-800 bg-green-200 hover:bg-green-300",
          icon: "text-green-400 group-hover:text-green-500",
        },
        icon
      );
    }
    case "blue": {
      return combineBadgeClasses(
        {
          badge: "text-sky-800 bg-sky-200 hover:bg-sky-300",
          icon: "text-sky-400 group-hover:text-sky-500",
        },
        icon
      );
    }
    case "purple": {
      return combineBadgeClasses(
        {
          badge: "text-purple-800 bg-purple-100 hover:bg-purple-200",
          icon: "text-purple-400 group-hover:text-purple-500",
        },
        icon
      );
    }
    case "pink": {
      return combineBadgeClasses(
        {
          badge: "text-pink-800 bg-pink-100 hover:bg-pink-200",
          icon: "text-pink-400 group-hover:text-pink-500",
        },
        icon
      );
    }
    case "darkGray": {
      return combineBadgeClasses(
        {
          badge: "text-stone-200 bg-stone-800 hover:bg-stone-900",
          icon: "text-stone-200 group-hover:text-stone-300",
        },
        icon
      );
    }
    case "orange": {
      return combineBadgeClasses(
        {
          badge: "text-orange-800 bg-orange-100 hover:bg-orange-200",
          icon: "text-orange-800 group-hover:text-orange-900",
        },
        icon
      );
    }
  }
};

export { getBadgeColorClasses };

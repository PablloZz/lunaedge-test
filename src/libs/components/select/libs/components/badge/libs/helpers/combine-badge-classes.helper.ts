import { type BadgeIcon, type BadgeClassesVariant } from "../types/types.js";

const combineBadgeClasses = (
  classes: BadgeClassesVariant,
  icon?: BadgeIcon
): BadgeClassesVariant => {
  if (icon) {
    return {
      badge: `group ${classes.badge}`,
      icon: `border-current ${classes.icon}`,
    };
  }

  return { badge: classes.badge };
};

export { combineBadgeClasses };

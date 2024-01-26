import { useEffect, useState } from "react";
import { FIRST_OPTION_INDEX } from "../../constants/constants.js";

const useSelect = (searchOption: (search: string) => void) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(FIRST_OPTION_INDEX);

  const handleOpenSelectOptions = () => {
    setIsOpen(true);
  };

  const handleCloseSelectOptions = () => {
    setIsOpen(false);
  };

  const handleToggleSelectOptions = () => {
    setIsOpen(previousState => !previousState);
  };

  const handleSetHighlightedIndex = (index: number) => {
    setHighlightedIndex(index);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const isClickOutside = !event.currentTarget.contains(event.relatedTarget);
    if (isClickOutside) {
      handleCloseSelectOptions();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      handleSetHighlightedIndex(FIRST_OPTION_INDEX);
      searchOption("");
    }
  }, [isOpen]);

  return {
    isOpen,
    highlightedIndex,
    handleBlur,
    handleOpenSelectOptions,
    handleCloseSelectOptions,
    handleToggleSelectOptions,
    handleSetHighlightedIndex,
  };
};

export { useSelect };

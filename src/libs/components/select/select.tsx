import { useEffect, useRef, useState } from "react";
import { Icon } from "../components.js";
import { Badge } from "./libs/components/components.js";
import {
  type SingleSelectProperties,
  type SelectOption,
  type MultipleSelectProperties,
} from "./libs/types/types.js";
import {
  FIRST_OPTION_INDEX,
  NEXT_OPTION_INDEX,
  PREVIOUS_OPTION_INDEX,
} from "./libs/constants/constants.js";

type Properties = {
  label: string;
  options: SelectOption[];
  hint?: string;
  placeholder: string;
  onSearchOption: (search: string) => void;
  searchQuery: string;
  disabled?: boolean;
} & (SingleSelectProperties | MultipleSelectProperties);

const Select: React.FC<Properties> = ({
  label,
  options,
  hint,
  value,
  placeholder,
  onChange,
  multiple,
  badgeVariant,
  badgeIcon,
  badgeColor,
  onSearchOption,
  searchQuery,
  error,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(FIRST_OPTION_INDEX);
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleToggleSelectMenu = () => {
    setIsOpen(previousState => !previousState);
  };

  const handleCloseSelectMenu = () => {
    setIsOpen(false);
    setHighlightedIndex(FIRST_OPTION_INDEX);
    onSearchOption("");
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const isClickOutside = !event.currentTarget.contains(event.relatedTarget);
    if (isClickOutside) {
      handleCloseSelectMenu();
    }
  };

  const handleClearOptions = () => {
    multiple ? onChange([]) : onChange(null);
  };

  const handleSelectOption = (selectedOption: SelectOption) => {
    if (multiple) {
      if (value.includes(selectedOption)) {
        onChange(value.filter(option => option !== selectedOption));
      } else {
        onChange([...value, selectedOption]);
      }
    } else {
      onChange(selectedOption);
    }
    handleCloseSelectMenu();
  };

  const handleChangeHighlightedIndex = (index: number) => {
    setHighlightedIndex(index);
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  const isValueEmpty = () => {
    if (multiple) {
      return !Boolean(value.length);
    }
    return !Boolean(value);
  };

  useEffect(() => {
    const keyboardHandler = (event: KeyboardEvent) => {
      if (
        event.target !== selectRef.current &&
        event.target !== searchInputRef.current
      ) {
        return;
      }

      switch (event.code) {
        case "Enter":
        case "Space": {
          handleToggleSelectMenu();

          if (isOpen) {
            selectRef.current?.focus();
            handleSelectOption(options[highlightedIndex]);
          }
          break;
        }
        case "ArrowDown":
        case "ArrowUp": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newHighlightedIndex =
            highlightedIndex +
            (event.code === "ArrowDown"
              ? NEXT_OPTION_INDEX
              : PREVIOUS_OPTION_INDEX);

          if (
            newHighlightedIndex >= FIRST_OPTION_INDEX &&
            newHighlightedIndex < options.length
          ) {
            setHighlightedIndex(newHighlightedIndex);
          }
          break;
        }
        case "Escape": {
          handleCloseSelectMenu();
          break;
        }
      }
    };

    selectRef.current?.addEventListener("keydown", keyboardHandler);

    return () => {
      selectRef.current?.removeEventListener("keydown", keyboardHandler);
    };
  }, [isOpen, highlightedIndex, options]);

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div
      aria-labelledby="label"
      className="flex flex-col gap-2 w-full max-w-[400px]"
    >
      <div className="flex items-center gap-[5px]">
        <span id="label">{label}</span>
        <Icon iconName="info" className="w-4" />
      </div>
      <div
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        onBlur={handleBlur}
        ref={selectRef}
        className={`relative flex items-center gap-1 w-full h-[40px] outline outline-1 outline-gray-300 rounded-lg py-3 ${
          multiple ? "pl-1.5 pr-4" : "px-4"
        } ${
          disabled
            ? "bg-sky-100"
            : "hover:outline-2 hover:outline-indigo-600 focus:outline-2 focus:outline-indigo-600"
        } ${error?.message ? "outline-2 outline-red-600" : ""}`}
      >
        {isValueEmpty() && (
          <span
            className={`absolute ${multiple ? "pl-2.5" : "pl-0"} ${
              disabled ? "text-sky-200" : "text-gray-400"
            } select-none`}
          >
            {placeholder}
          </span>
        )}
        <span className="grow flex items-center gap-1 overflow-x-auto no-scrollbar">
          {multiple
            ? value.map(option => (
                <Badge
                  key={option.value}
                  label={option.label}
                  onClick={() => handleSelectOption(option)}
                  variant={badgeVariant}
                  icon={badgeIcon}
                  color={badgeColor}
                />
              ))
            : value?.label}
        </span>
        {!isValueEmpty() && (
          <button
            type="button"
            onClick={handleClearOptions}
            aria-label="Clear options"
          >
            <Icon iconName="close" className="w-5 hover:text-gray-600" />
          </button>
        )}
        <button
          type="button"
          disabled={disabled}
          onClick={handleToggleSelectMenu}
          aria-label="Toggle select menu"
        >
          <Icon
            iconName={isOpen ? "curetUp" : "curetDown"}
            className={`w-5 ${
              disabled ? "text-sky-200" : "hover:text-gray-600"
            }`}
          />
        </button>
        <ul
          className={`absolute top-full left-0 w-full max-h-[240px] overflow-y-auto border rounded-lg mt-2 bg-white z-10 ${
            isOpen ? "" : "hidden"
          }`}
        >
          <label>
            <span className="absolute left-[-10000px]">Search</span>
            <input
              type="text"
              value={searchQuery}
              placeholder="Search"
              onChange={event => onSearchOption(event.target.value)}
              className="w-full py-1.5 px-4"
              ref={searchInputRef}
            />
          </label>
          {options.map((option, index) => (
            <li
              key={option.value}
              role="menuitem"
              onClick={() => handleSelectOption(option)}
              onMouseEnter={() => handleChangeHighlightedIndex(index)}
              className={`py-1.5 px-4 cursor-pointer ${
                isOptionSelected(option) ? "bg-indigo-200" : ""
              } ${
                index === highlightedIndex ? "bg-indigo-500 text-white" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      <span className="text-red-600 text-sm">{error?.message}</span>
      <span className="text-gray-500">{hint}</span>
    </div>
  );
};

export { Select };
export { type SelectOption };

import { type Ref, forwardRef, useState } from "react";
import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import { Icon } from "~/libs/components/components.js";
import { type InputType } from "./libs/types/types.js";

type Properties = {
  label?: string;
  placeholder?: string;
  variant: InputType;
  className?: string;
  labelClassName?: string;
  required?: boolean;
  disabled?: boolean;
  error: FieldError | undefined;
} & UseFormRegisterReturn<string>;

const Input = forwardRef(
  (
    {
      label,
      placeholder,
      variant,
      className = "",
      labelClassName = "",
      required,
      disabled,
      error,
      ...useFormRegisterReturn
    }: Properties,
    ref: Ref<HTMLInputElement>
  ) => {
    const [inputType, setInputType] = useState<InputType>(variant);

    const handleChangePasswordVisibility = () => {
      setInputType(previousType => {
        return previousType === "password" ? "text" : "password";
      });
    };

    return (
      <label className="flex flex-col gap-2 w-full max-w-[400px]">
        <span className={labelClassName}>{label}</span>
        <div className="relative flex items-center">
          {variant === "email" && (
            <Icon
              iconName="envelope"
              className={`absolute w-5 left-4 text-black ${
                error?.message && "text-red-600"
              }`}
            />
          )}
          <input
            type={inputType}
            id={useFormRegisterReturn.name}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            {...useFormRegisterReturn}
            ref={ref}
            className={`w-full h-[40px] rounded-lg outline outline-1 outline-gray-300 py-3 ${
              variant !== "email" ? "pl-4" : "pl-11"
            } pr-4 flex align-center ${
              disabled
                ? "bg-sky-100 text-sky-200"
                : "hover:outline-2 hover:outline-indigo-600"
            } focus:outline-2 focus:outline-indigo-600
             ${error?.message && "outline-2 outline-red-600"} ${className}`}
          />
          {variant === "password" && (
            <button
              type="button"
              onClick={handleChangePasswordVisibility}
              aria-label={"Toggle password visibility"}
              className="absolute right-4"
            >
              <Icon
                iconName={inputType === "password" ? "show" : "hide"}
                ariaRole="img"
                ariaLabel={
                  inputType === "password" ? "Show password" : "Hide password"
                }
                className="text-gray-600 w-6"
              />
            </button>
          )}
        </div>
        {required && (
          <span className="text-gray-500">This information is required.</span>
        )}
        {error?.message && (
          <span className="text-red-600">{error?.message as string}</span>
        )}
      </label>
    );
  }
);

export { Input };

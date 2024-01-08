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
      <label className="flex flex-col gap-[8px]">
        <span className={labelClassName}>{label}</span>
        <div className="relative flex items-center">
          {variant === "email" && (
            <Icon
              iconName="envelope"
              className="absolute left-[16px] text-black"
            />
          )}
          <input
            type={inputType}
            id={useFormRegisterReturn.name}
            placeholder={placeholder}
            {...useFormRegisterReturn}
            ref={ref}
            className={`w-[400px] h-[40px] rounded-[8px] border-[1px] py-[12px] ${
              variant !== "email" ? "pl-[16px]" : "pl-[48px]"
            } pr-[16px] flex align-center outline outline-blue-600 outline-0 hover:outline-2 focus:outline-2 ${className}`}
          />
          {variant === "password" && (
            <button
              type="button"
              onClick={handleChangePasswordVisibility}
              aria-label={"Toggle password visibility"}
              className="absolute right-[16px]"
            >
              <Icon
                iconName={inputType === "password" ? "eye" : "eyeSlash"}
                ariaRole="img"
                ariaLabel={
                  inputType === "password" ? "Show password" : "Hide password"
                }
                className="text-gray-600"
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

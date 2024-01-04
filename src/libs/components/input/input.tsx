import { type Ref, forwardRef, useEffect, useRef, useState } from "react";
import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import { Icon } from "~/libs/components/components.js";
import { type InputType } from "./libs/types/types.js";

type Properties = {
  error: FieldError | undefined;
  label?: string;
  placeholder?: string;
  type: InputType;
  className?: string;
  labelClassName?: string;
  isRequired?: boolean;
} & UseFormRegisterReturn<string>;

const Input = forwardRef(
  (
    {
      error,
      type,
      className,
      isRequired,
      label,
      labelClassName,
      placeholder,
      ...useFormRegisterReturn
    }: Properties,
    ref: Ref<HTMLInputElement>
  ) => {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    let isPasswordType = useRef<boolean>(type === "password");
    const [inputType, setInputType] = useState<InputType>(type);

    const handleChangePasswordVisibility = () => {
      setPasswordVisibility(isPreviouslyVisible => {
        setInputType(isPreviouslyVisible ? "password" : "text");
        return !isPreviouslyVisible;
      });
    };

    useEffect(() => {
      if (type === "password") {
        isPasswordType.current = true;
      }
    }, [type]);

    return (
      <label className="flex flex-col gap-[8px]">
        <span className={labelClassName}>{label}</span>
        <div className="relative flex items-center">
          {type === "email" && (
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
            className={`${className} w-[400px] h-[40px] rounded-[8px] border-[1px] py-[12px] ${
              type !== "email" ? "pl-[16px]" : "pl-[48px]"
            } pr-[16px] flex align-center outline outline-blue-600 outline-0 hover:outline-2 focus:outline-2`}
          />
          {isPasswordType.current && (
            <button
              type="button"
              onClick={handleChangePasswordVisibility}
              aria-label={"Toggle password visibility"}
              className="absolute right-[16px]"
            >
              <Icon
                iconName={isPasswordVisible ? "eyeSlash" : "eye"}
                ariaRole="img"
                alt={isPasswordVisible ? "Hide password" : "Show password"}
                className="text-gray-600"
              />
            </button>
          )}
        </div>
        {isRequired && (
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

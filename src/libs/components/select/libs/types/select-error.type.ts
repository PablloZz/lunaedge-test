import {
  type FieldError,
  type FieldErrorsImpl,
  type Merge,
} from "react-hook-form";

type SingleSelectError = Merge<
  FieldError,
  FieldErrorsImpl<{ value: NonNullable<string | number>; label: string }>
>;

type MultipleSelectError = Merge<
  FieldError,
  (
    | Merge<
        FieldError,
        FieldErrorsImpl<{
          value: NonNullable<string | number>;
          label: string;
        }>
      >
    | undefined
  )[]
>;

export { type SingleSelectError, type MultipleSelectError };

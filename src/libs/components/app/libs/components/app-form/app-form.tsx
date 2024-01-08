import { useForm } from "react-hook-form";
import {  Input } from "~/libs/components/components.js";
import { AppFormFields } from "./libs/types/app-form-fields.type.js";
import { DEFAULT_APP_FORM_VALUES } from "./libs/constants/constants.js";

const AppForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppFormFields>({ defaultValues: DEFAULT_APP_FORM_VALUES });

  const onSubmit = (fields: AppFormFields) => {};

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-4"
    >
      <Input
        {...register("name", {
          required: "Please, provide your name",
        })}
        error={errors.name}
        name="name"
        variant="text"
        label="Name:"
        placeholder="Name"
        isRequired
      />
      <Input
        {...register("lastName", {
          required: "Please, provide your last name",
        })}
        error={errors.lastName}
        name="lastName"
        variant="password"
        label="Last Name:"
        placeholder="Last Name"
        isRequired
      />
    </form>
  );
};

export { AppForm };

import { useForm } from "react-hook-form";
import { Input } from "~/libs/components/components.js";
import { DevTool } from "@hookform/devtools";
import { AppFormFields } from "./libs/types/app-form-fields.type.js";
import { DEFAULT_APP_FORM_VALUES } from "./libs/constants/constants.js";

const AppForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AppFormFields>({ defaultValues: DEFAULT_APP_FORM_VALUES });

  const onSubmit = (fields: AppFormFields) => {};

  return (
    <>
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
          type="text"
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
          type="password"
          label="Last Name:"
          placeholder="Last Name"
          isRequired
        />
        <button className="flex items-center bg-blue-700 hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600 disabled:bg-blue-200 text-white disabled:text-blue-400 text-sm md:text-xl px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 h-5 sm:h-6 md:h-8 lg:h-10 xl:h-12 rounded">
          Fight
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export { AppForm };

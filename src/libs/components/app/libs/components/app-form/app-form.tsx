import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select } from "~/libs/components/components.js";
import { type AppFormFields } from "./libs/types/app-form-fields.type.js";
import {
  DEFAULT_APP_FORM_VALUES,
  MAX_POKEMON_NUMBER,
} from "./libs/constants/constants.js";
import { useState } from "react";
import { type SelectOption } from "~/libs/components/select/select.js";

const AppForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AppFormFields>({ defaultValues: DEFAULT_APP_FORM_VALUES });
  const [pokemon, setPokemon] = useState([
    { value: 1, label: "First" },
    { value: 2, label: "Second" },
    { value: 3, label: "Third" },
    { value: 4, label: "Fourth" },
    { value: 5, label: "Fifth" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchPokemon = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  const filteredPokemon = pokemon.filter(p => p.label.startsWith(searchQuery));

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
        label="Name"
        placeholder="Name"
        required
      />
      <Input
        {...register("lastName", {
          required: "Please, provide your last name",
        })}
        error={errors.lastName}
        name="lastName"
        variant="text"
        label="Last Name"
        placeholder="Last Name"
        required
      />
      <Controller
        control={control}
        name="pokemon"
        rules={{
          validate: {
            checkPokemonNumber: pokemon => {
              if (pokemon.length > MAX_POKEMON_NUMBER) {
                return "Please, choose four pokémon";
              }
            },
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Select
            multiple
            options={filteredPokemon}
            value={value}
            label="Pokémon"
            placeholder="Select a pokémon"
            badgeVariant="circle"
            badgeColor="blue"
            badgeIcon="close"
            onSearchOption={handleSearchPokemon}
            searchQuery={searchQuery}
            hint="Choose four pokémon"
            error={errors.pokemon}
            onChange={(pokemon: SelectOption[]) => onChange(pokemon)}
          />
        )}
      />
      <Button type="submit" variant="outline" icon="star" label="Fight" />
    </form>
  );
};

export { AppForm };

import { useForm } from "react-hook-form";
import { Button, Input, Select } from "~/libs/components/components.js";
import { AppFormFields } from "./libs/types/app-form-fields.type.js";
import { DEFAULT_APP_FORM_VALUES } from "./libs/constants/constants.js";
import { useState } from "react";
import { type SelectOption } from "~/libs/components/select/select.js";

const AppForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppFormFields>({ defaultValues: DEFAULT_APP_FORM_VALUES });

  const [pokemons, setPokemons] = useState([
    { value: 1, label: "First" },
    { value: 2, label: "Second" },
    { value: 3, label: "Third" },
    { value: 4, label: "Fourth" },
    { value: 5, label: "Fifth" },
  ]);
  const [selectedPokemons, setSelectedPokemons] = useState<SelectOption[]>([
    pokemons[2],
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectPokemon = (pokemon: SelectOption[]) => {
    setSelectedPokemons(pokemon);
  };

  const handleSearchPokemon = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  const filteredPokemons = pokemons.filter(pokemon => {
    return pokemon.label.startsWith(searchQuery);
  });

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
        required
      />
      <Input
        {...register("lastName", {
          required: "Please, provide your last name",
        })}
        error={errors.lastName}
        name="lastName"
        variant="text"
        label="Last Name:"
        placeholder="Last Name"
        required
      />
      <Select
        multiple
        options={filteredPokemons}
        value={selectedPokemons}
        label="Pokemons"
        onChange={handleSelectPokemon}
        badgeVariant="square"
        badgeColor="blue"
        badgeIcon="close"
        onSearchPokemon={handleSearchPokemon}
        searchQuery={searchQuery}
        hint="Choose four pokemons"
      />
      <Button type="submit" variant="outline" icon="star" label="Fight" />
    </form>
  );
};

export { AppForm };

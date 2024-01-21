import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select } from "~/libs/components/components.js";
import { type AppFormFields } from "./libs/types/types.js";
import {
  DEFAULT_APP_FORM_VALUES,
  DEFAULT_QUERY_LIMIT,
  MAX_POKEMON_NUMBER,
  QUERY_OFFSET_INCREASE_COUNT,
} from "./libs/constants/constants.js";
import { useEffect, useState } from "react";
import { type SelectOption } from "~/libs/components/select/select.js";
import { pokemon } from "~/packages/pokemon/pokemon.js";

const AppForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AppFormFields>({ defaultValues: DEFAULT_APP_FORM_VALUES });
  const [allPokemon, setAllPokemon] = useState<SelectOption[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonOffset, setPokemonOffset] = useState(0);

  const filteredPokemon = allPokemon.filter(pokemon => {
    return pokemon.label.startsWith(searchQuery);
  });

  const handleSearchPokemon = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  const handleSetPokemonOffset = () => {
    if (!searchQuery) {
      setPokemonOffset(
        previousOffset => previousOffset + QUERY_OFFSET_INCREASE_COUNT
      );
    }
  };

  const onSubmit = (fields: AppFormFields) => {};

  useEffect(() => {
    const controller = new AbortController();

    pokemon
      .getPokemon(controller, pokemonOffset, DEFAULT_QUERY_LIMIT)
      .then(newPokemon => {
        console.log("fetched");
        const selectOptionFormPokemon = newPokemon!.map(({ url, name }) => {
          return { label: name, value: url };
        });
        setAllPokemon(pokemon => [...pokemon, ...selectOptionFormPokemon]);
      })
      .catch((error): void => {
        console.error(error);
      });

    return () => {
      controller.abort();
    };
  }, [pokemonOffset]);

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
            hint="Choose up to 4 pokémon"
            error={errors.pokemon}
            onChange={(pokemon: SelectOption[]) => onChange(pokemon)}
            onListScrolled={handleSetPokemonOffset}
          />
        )}
      />
      <Button type="submit" variant="outline" icon="star" label="Fight" />
    </form>
  );
};

export { AppForm };

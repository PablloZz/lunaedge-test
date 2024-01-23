import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select } from "~/libs/components/components.js";
import { type AppFormFields } from "./libs/types/types.js";
import {
  DEFAULT_APP_FORM_VALUES,
  REQUIRED_POKEMON_NUMBER,
} from "./libs/constants/constants.js";
import { useEffect, useState } from "react";
import { type SelectOption } from "~/libs/components/select/select.js";
import { pokemon } from "~/packages/pokemon/pokemon.js";
import { PokemonOffsetQuery, PokemonLimitQuery } from "./libs/enums/enums.js";

const AppForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AppFormFields>({ defaultValues: DEFAULT_APP_FORM_VALUES });
  const [allPokemon, setAllPokemon] = useState<SelectOption[]>([]);
  const [pokemonForSearch, setPokemonForSearch] = useState<SelectOption[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonOffset, setPokemonOffset] = useState<number>(
    PokemonOffsetQuery.ZERO_COUNT
  );

  const filteredPokemon = searchQuery
    ? pokemonForSearch.filter(pokemon => {
        return pokemon.label.startsWith(searchQuery);
      })
    : allPokemon;

  const handleSearchPokemon = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  const handleSetPokemonOffset = () => {
    if (!searchQuery) {
      setPokemonOffset(
        previousOffset => previousOffset + PokemonOffsetQuery.INCREASE_COUNT
      );
    }
  };

  const onSubmit = (fields: AppFormFields) => {};

  useEffect(() => {
    const controller = new AbortController();

    pokemon
      .getPokemon(controller, pokemonOffset, PokemonLimitQuery.DEFAULT)
      .then(newPokemon => {
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

  useEffect(() => {
    const controller = new AbortController();

    pokemon
      .getPokemon(
        controller,
        PokemonOffsetQuery.ZERO_COUNT,
        PokemonLimitQuery.MAX
      )
      .then(newPokemon => {
        const selectOptionFormPokemon = newPokemon!.map(({ url, name }) => {
          return { label: name, value: url };
        });
        setPokemonForSearch(selectOptionFormPokemon);
      })
      .catch((error): void => {
        console.error(error);
      });

    return () => {
      controller.abort();
    };
  }, []);

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
              if (pokemon.length !== REQUIRED_POKEMON_NUMBER) {
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
            hint="Choose 4 pokémon"
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

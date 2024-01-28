import { useEffect, useState } from "react";
import { type SelectOption } from "~/libs/components/select/select.js";
import { pokemon } from "~/packages/pokemon/pokemon.js";
import { PokemonLimitQuery, PokemonOffsetQuery } from "../../enums/enums.js";
import { SelectedPokemon } from "~/libs/types/types.js";

type Parameters = {
  pokemonOffset: number;
  isValid: boolean;
  isSubmitting: boolean;
  selectedPokemonOptions: SelectOption[];
};

const useFetchPokemon = ({
  pokemonOffset,
  isValid,
  isSubmitting,
  selectedPokemonOptions,
}: Parameters) => {
  const [isPokemonForSearchLoading, setIsPokemonForSearchLoading] =
    useState(false);
  const [pokemonForSearch, setPokemonForSearch] = useState<SelectOption[]>([]);
  const [allPokemon, setAllPokemon] = useState<SelectOption[]>([]);
  const [isAllPokemonLoading, setIsAllPokemonLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon[]>([]);
  const [isSelectedPokemonLoading, setIsSelectedPokemonLoading] =
    useState(false);

  useEffect(() => {
    setIsAllPokemonLoading(true);
    const controller = new AbortController();

    pokemon
      .getPokemon(controller, pokemonOffset, PokemonLimitQuery.DEFAULT)
      .then(newPokemon => {
        const selectOptionFormPokemon = newPokemon!.map(({ url, name }) => {
          return { label: name, value: url };
        });
        setAllPokemon(pokemon => [...pokemon, ...selectOptionFormPokemon]);
      })
      .catch(error => console.error(error))
      .finally(() => setIsAllPokemonLoading(false));

    return () => {
      controller.abort();
    };
  }, [pokemonOffset]);

  useEffect(() => {
    setIsPokemonForSearchLoading(true);
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
      .catch(error => console.error(error))
      .finally(() => setIsPokemonForSearchLoading(false));

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    if (isValid && isSubmitting) {
      setIsSelectedPokemonLoading(true);
      const pokemonEndpoints = selectedPokemonOptions.map(value => value.value);
      Promise.all(
        pokemonEndpoints.map(endpoint =>
          pokemon.getSinglePokemon(controller, endpoint as string)
        )
      )
        .then(selectedPokemonData => {
          return setSelectedPokemon(selectedPokemonData as SelectedPokemon[]);
        })
        .catch(error => console.error(error))
        .finally(() => setIsSelectedPokemonLoading(false));
    }
  }, [isValid, isSubmitting]);

  return {
    isPokemonForSearchLoading,
    pokemonForSearch,
    allPokemon,
    isAllPokemonLoading,
    selectedPokemon,
    isSelectedPokemonLoading,
  };
};

export { useFetchPokemon };

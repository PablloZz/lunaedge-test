import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Modal, Select } from "~/libs/components/components.js";
import { type AppFormFields } from "./libs/types/types.js";
import { DEFAULT_APP_FORM_VALUES } from "./libs/constants/constants.js";
import { type SelectOption } from "~/libs/components/select/select.js";
import {
  PokemonOffsetQuery,
  PokemonFormValidationPattern,
  PokemonFormValidationMessage,
} from "./libs/enums/enums.js";
import { validatePokemonFormFieldPattern } from "./libs/helpers/helpers.js";
import { useModal } from "~/libs/hooks/hooks.js";
import { PokemonView } from "../components.js";
import { useFetchPokemon } from "./libs/hooks/hooks.js";

const AppForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    getValues,
  } = useForm<AppFormFields>({ defaultValues: DEFAULT_APP_FORM_VALUES });
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonOffset, setPokemonOffset] = useState<number>(
    PokemonOffsetQuery.ZERO_COUNT
  );
  const {
    pokemonForSearch,
    allPokemon,
    isSelectedPokemonLoading,
    selectedPokemon,
  } = useFetchPokemon({
    pokemonOffset,
    isValid,
    isSubmitting,
    selectedPokemonOptions: getValues("pokemon"),
  });

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

  const onSubmit = () => {
    handleOpenModal();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-4 mt-[100px] max-w-[400px] w-[400px]"
    >
      <Input
        {...register("name", {
          required: PokemonFormValidationMessage.NAME_REQUIRED,
          validate: {
            validateSymbols: value => {
              return validatePokemonFormFieldPattern(
                value,
                PokemonFormValidationPattern.NAME_ALLOWED_CHARACTERS,
                PokemonFormValidationMessage.NAME_INCORRECT_CHARACTERS
              );
            },
            validateLength: value => {
              return validatePokemonFormFieldPattern(
                value,
                PokemonFormValidationPattern.NAME_LENGTH,
                PokemonFormValidationMessage.NAME_INCORRECT_LENGTH
              );
            },
          },
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
          required: PokemonFormValidationMessage.LAST_NAME_REQUIRED,
          validate: {
            validateSymbols: value => {
              return validatePokemonFormFieldPattern(
                value,
                PokemonFormValidationPattern.LAST_NAME_ALLOWED_CHARACTERS,
                PokemonFormValidationMessage.LAST_NAME_INCORRECT_CHARACTERS
              );
            },
            validateLength: value => {
              return validatePokemonFormFieldPattern(
                value,
                PokemonFormValidationPattern.LAST_NAME_LENGTH,
                PokemonFormValidationMessage.LAST_NAME_INCORRECT_LENGTH
              );
            },
          },
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
            pokemonNumber: pokemon =>
              validatePokemonFormFieldPattern(
                String(pokemon.length),
                PokemonFormValidationPattern.REQUIRED_POKEMON_NUMBER,
                PokemonFormValidationMessage.POKEMON_INCORRECT_NUMBER
              ),
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
      {isModalOpen && Boolean(selectedPokemon.length) && (
        <Modal
          title="Your Pokémon"
          description={`Trainer: ${getValues("name")} ${getValues("lastName")}`}
          onClose={handleCloseModal}
        >
          {selectedPokemon.map(pokemon => (
            <PokemonView {...pokemon} />
          ))}
        </Modal>
      )}
      <Button
        type="submit"
        variant="text"
        icon="star"
        label="Fight"
        isLoading={isSelectedPokemonLoading}
      />
    </form>
  );
};

export { AppForm };

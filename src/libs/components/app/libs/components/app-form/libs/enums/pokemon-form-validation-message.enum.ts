const PokemonFormValidationMessage = {
  NAME_REQUIRED: "Please, provide your name",
  NAME_INCORRECT_LENGTH: "Your name must be between 2 and 12 characters long",
  NAME_INCORRECT_CHARACTERS:
    "Your name must contain only characters from a-z and A-Z",
  LAST_NAME_REQUIRED: "Please, provide your last name",
  LAST_NAME_INCORRECT_LENGTH:
    "Your last name must be between 2 and 12 characters long",
  LAST_NAME_INCORRECT_CHARACTERS:
    "Your last name must contain only characters from a-z and A-Z",
  POKEMON_INCORRECT_NUMBER: "Please, choose four pokémon",
} as const;

export { PokemonFormValidationMessage };

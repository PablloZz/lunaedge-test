const PokemonFormValidationPattern = {
  NAME_LENGTH: /^[a-zA-Z]{2,12}$/,
  NAME_ALLOWED_CHARACTERS: /^[a-zA-Z]+$/,
  LAST_NAME_LENGTH: /^[a-zA-Z]{2,12}$/,
  LAST_NAME_ALLOWED_CHARACTERS: /^[a-zA-Z]+$/,
  REQUIRED_POKEMON_NUMBER: /^4$/,
} as const;

export { PokemonFormValidationPattern };

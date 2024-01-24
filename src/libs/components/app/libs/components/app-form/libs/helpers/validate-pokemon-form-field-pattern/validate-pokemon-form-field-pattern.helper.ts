const validatePokemonFormFieldPattern = (
  value: string,
  pattern: RegExp,
  message: string
) => {
  const isValid = pattern.test(value);

  if (!isValid) {
    return message;
  }
};

export { validatePokemonFormFieldPattern };

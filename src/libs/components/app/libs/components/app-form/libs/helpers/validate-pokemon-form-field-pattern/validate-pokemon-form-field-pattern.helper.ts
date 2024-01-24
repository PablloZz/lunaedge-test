const validatePokemonFormFieldPattern = (
  value: string,
  pattern: RegExp,
  message: string
) => {
  const isValid = pattern.test(value);
console.log(isValid)
  if (!isValid) {
    return message;
  }
};

export { validatePokemonFormFieldPattern };

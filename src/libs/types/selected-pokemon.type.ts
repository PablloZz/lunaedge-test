type PokemonSprite = {
  back: string;
  front: string;
};

type SelectedPokemon = {
  name: string;
  sprites: PokemonSprite;
};

export { type SelectedPokemon };

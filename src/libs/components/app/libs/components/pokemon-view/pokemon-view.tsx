import { type SelectedPokemon } from "~/libs/types/types.js";

type Properties = SelectedPokemon;

const PokemonView: React.FC<Properties> = ({
  name,
  sprites: { front, back },
}) => (
  <section>
    <h3 className="text-xs sm:text-lg font-semibold">{name}</h3>
    <div className="flex flex-col sm:flex-row justify-between">
      <img src={front} alt={`${name}'s front view`} width="96" height="96" />
      <img src={back} alt={`${name}'s back view`} width="96" height="96" />
    </div>
  </section>
);

export { PokemonView };

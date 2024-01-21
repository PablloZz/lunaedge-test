import { BASE_POKEMON_ENDPOINT } from "./libs/constants/base-pokemon-endpoint.constant.js";
import { Pokemon } from "./pokemon-api.js";

const pokemon = new Pokemon(BASE_POKEMON_ENDPOINT);

export { pokemon };

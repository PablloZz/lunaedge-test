import axios from "axios";
import { SelectedPokemon } from "~/libs/types/types.js";

class Pokemon {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  async getPokemon(controller: AbortController, offset: number, limit: number) {
    try {
      const response = await axios.get(
        `${this.url}?offset=${offset}&limit=${limit}`,
        { signal: controller.signal }
      );
      return response.data.results as { name: string; url: string }[];
    } catch (error) {
      console.error(error);
    }
  }

  async getSinglePokemon(controller: AbortController, endpoint: string) {
    try {
      const response = await axios.get(endpoint, { signal: controller.signal });
      const {
        data: { name, sprites },
      } = response;

      return {
        name: name,
        sprites: {
          front: sprites.front_default,
          back: sprites.back_default,
        },
      } as SelectedPokemon;
    } catch (error) {
      console.error(error);
    }
  }
}

export { Pokemon };

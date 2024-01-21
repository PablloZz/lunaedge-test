class Pokemon {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  async getPokemon(controller: AbortController, offset: number, limit: number) {
    try {
      const response = await fetch(
        `${this.url}?offset=${offset}&limit=${limit}`,
        {
          signal: controller.signal,
        }
      );
      const data = await response.json();
      return data.results as { name: string; url: string }[];
    } catch (error) {
      console.error(error);
    }
  }
}

export { Pokemon };

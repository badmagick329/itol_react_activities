import { Pokemon, PokenameResult } from "@/common/poke-api-types";

export class PokeClient {
  static async list({
    limit = 20,
  }: {
    limit: number;
  }): Promise<PokenameResult[]> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
    try {
      const result = await fetch(url);
      const json = await result.json();
      return json.results as PokenameResult[];
    } catch (error) {
      console.error("Error fetching pokemon list:", error);
      throw error;
    }
  }

  static async details(name: string): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    try {
      const result = await fetch(url);
      const json = await result.json();
      return {
        name: json.name,
        image: json.sprites.front_default,
        species: json.species.name,
        abilities: json.abilities.map((ability: any) => ({
          name: ability.ability.name,
          url: ability.ability.url,
        })),
      };
    } catch (error) {
      console.error(`Error fetching details for ${name}:`, error);
      throw error;
    }
  }
}

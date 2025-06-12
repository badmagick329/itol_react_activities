import { useEffect, useState } from "react";
import { PokeClient } from "@/lib/common/poke-client";
import { Pokemon } from "@/lib/common/poke-api-types";
import Card, { Bio } from "./Card";

export default function ProfileCardComp() {
  const [pokemons, setPokemons] = useState<Pokemon[] | undefined | null>(
    undefined
  );
  useEffect(() => {
    (async () => {
      try {
        const pokemons = PokeClient.list({ limit: 5 });
        const details: Pokemon[] = [];
        for (const pokemon of await pokemons) {
          const detailsPokemon = await PokeClient.details(pokemon.name);
          details.push(detailsPokemon);
        }
        setPokemons(details);
      } catch (err) {
        console.error("Error fetching pokemons:", err);
        setPokemons(null);
      }
    })();
  }, []);

  if (pokemons === undefined) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (pokemons === null || pokemons.length === 0) {
    return (
      <div>
        <p>Error loading pokemons.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.name}
          name={pokemon.name}
          image={pokemon.image}
          jobTitle={pokemon.species}
          bio={<Bio name={pokemon.name} ability={pokemon.abilities[0].name} />}
          skills={pokemon.abilities}
        />
      ))}
    </div>
  );
}

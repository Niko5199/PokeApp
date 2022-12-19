import { useEffect, useState } from 'react';
import { Pokemon } from '../interfaces/Pokemon';

export default function useFetchPokemons() {
  const [arrPokemons, setArrPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    async function fetchPokemon() {
      const arr = [];
      try {
        for (let x = 1; x <= 10; x++) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${x}`
          );
          const data = await response.json();
          arr.push(data);
        }
        setArrPokemons([...arr]);
      } catch (error) {
        setArrPokemons([]);
      }
    }

    fetchPokemon();
  }, []);

  return arrPokemons;
}

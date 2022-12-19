import { useEffect, useState } from 'react';
import { Pokemon } from '../interfaces/Pokemon';

const useFetchPokemon = function (
  name: string,
  setState: Function
): Pokemon | any {
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        console.log(res);
        const data = await res.json();
        setPokemon(data);
        setState(true);
      } catch (error) {
        setPokemon({});
        setState(false);
      }
    }

    fetchPokemon();
  }, [name, setState]);

  return pokemon;
};

export default useFetchPokemon;

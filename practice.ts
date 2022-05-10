import fetch from "node-fetch";

interface PokemonList {
  count: number;
  previous: null;
  results: {
  name: string;
  url: string;
  } []
}

interface Pokemon {
  id: number;
  name: string;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}

async function listAllPokemons (): Promise<PokemonList> {
  const listResp = await fetch("https://pokeapi.co/api/v2/pokemon/")
  return await listResp.json()
}

const getPokemon = async (url: string): Promise<Pokemon> => {
  const dataResp = await fetch(url)
  return await dataResp.json()
}

(async function () {
  try {
    const list = await listAllPokemons()
    const pokemon = await getPokemon(list.results[0].url)
    console.log(pokemon.name)
  } catch(err) {
  console.log(err)
  }
}) ()

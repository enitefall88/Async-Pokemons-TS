import fetch from "node-fetch"

interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: {
    name: string,
    url: string;
  } []; // array of objects
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
/*
fetch("https://pokeapi.co/api/v2/pokemon/") // returns a promise and
// then there are 3 options: .then .catch .finally
    .then(response => response.json()) //turn into json
    .then((data: PokemonList) => {
      fetch(data.results[0].url)
          .then((res) => res.json())
          .then((data) => console.log(data.stats))
    })
    .catch(error => {
      console.log(error)
    })
*/

//rewrite using async/await



//await should be inside async functions

const getPokemonList = async (): Promise<PokemonList> => { // specifying return as promise
  const listResp = await fetch("https://pokeapi.co/api/v2/pokemon/")
  return await listResp.json()
}

const getPokemon = async (url:string): Promise<Pokemon> => {
      const dataResp = await fetch(url)
      return await dataResp.json()
}

  (async function () {
    try {
      const list = await getPokemonList()

      const pokemon = await getPokemon(list.results[0].url)
      const dataResp = await fetch(list.results[0].url)
      const data = await dataResp.json()
      console.log(data.stats)
    } catch (err) {
      console.log(err)
    }
  }) () // Immediately invoked function



import fetch from "node-fetch"

interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: {
    name: string,
    url: string;
  } []; // array of objects?
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
  return await listResp.json()  // Promise<PokemonList> does it return a promise here?
}

const getPokemon = async (url:string): Promise<Pokemon> => {
      const dataResp = await fetch(url) // url for the pokemon
      return await dataResp.json()
}

const getFirstPokemon = async (): Promise<Pokemon> => { //try and catch is implemented together with resolve reject
  return new Promise(async (resolve, reject) => { // async here as well
        try {
          const list = await getPokemonList()
          resolve(await getPokemon(list.results[0].url))
        } catch (err) {
          reject(err)
        }
      }
  )
}


  (async function () {
    try {
      const list = await getFirstPokemon()

      const pokemon = await getFirstPokemon()
      console.log(pokemon.name)
    } catch (err) { // catch is better to do for every function call?
      console.log(err)
    }
  }) () // Immediately invoked function




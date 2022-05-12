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

/*
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

*/

// then way with promises
function listAllPokemons () {
  let response = fetch("https://pokeapi.co/api/v2/pokemon/")
  .then((result)=> {
     result.json()
     .then((data: PokemonList) => {
       fetch(data.results[0].url)
           .then((response) => response.json())
           .then((data) => console.log(data.stats))
     })

  })
      .catch((err) => {
        console.log(err)
      })

}

/*//async await syntax
(async function () { // all async functions return a promise
  try {
    const listResponse = await fetch("https://pokeapi.co/api/v2/pokemon/")
    const list: PokemonList = await listResponse.json()

    //console.log(list)
    const dataResp = await fetch(list.results[1].url) /// fetching again but we already have that list fetched?
    const data = await dataResp.json()
    console.log(data.stats)
  } catch (e) {
    console.log(e)
  }
})()*/

//making it more modular extracting some functions

const getPokemonList = async (): Promise<PokemonList> => {
   const listResponse = await fetch("https://pokeapi.co/api/v2/pokemon/")
   return await listResponse.json()
}

const getPokemon = async (url:string):Promise<Pokemon> => {
   const dataResp = await fetch(url)
  return await dataResp.json()
}

/* const getData = async (list: PokemonList): Promise<Pokemon>  =>{
  const dataResp: Pokemon = (list.results[1].url) /// fetching again but we already have that list fetched?
  const data = await dataResp.json()
   return data
}*/

(async function () {
  try {
   const list = await getPokemonList() // list contains url links for each pokemon
   const pokemon = await getPokemon(list.results[0].url)
  const dataResp = await fetch(list.results[0].url)
   const data = await  dataResp.json()
   console.log(data)
  } catch (e) {  // without catch is not working
    console.log(e)
  }
})
()

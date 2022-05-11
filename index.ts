import fetch from "node-fetch"
import {PromisePool} from "@supercharge/promise-pool"

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
      const dataResp = await fetch(url) // url of the pokemon`s description
      return await dataResp.json()
}

const getFirstPokemon = async (): Promise<Pokemon> => { //try and catch is implemented together with resolve reject
  return new Promise(async (resolve, reject) => { // async here as well
        try {
          console.log("Getting the list")
          const list = await getPokemonList()
          resolve(await getPokemon(list.results[0].url))
        } catch (err) {
          reject(err)
        }
      }
  )
}


/*  (async function () {
    try {
      //const list = await getFirstPokemon()

      const pokemonPromise = await getFirstPokemon()
      const pokemon = await pokemonPromise //?? waiting for the promise to get settled and return an object?
      console.log(pokemon.name)
      const pokemon2 = await pokemonPromise // the promise is fulfilled already - get the result immediately
      console.log(pokemon2.name)// pokemon2 above makes a cache, promise as a cache, makes a closure?
    } catch (err) { // catch is better to do for every function call?
      console.log(err)
    }
  }) () // Immediately invoked function*/

(async function () {
  try {
    const list = await getPokemonList()
    /*    for(let listItem of list.results) {
          const pokemon = await getPokemon(listItem.url)*!/
        list.results.reduce<Promise<unknown>>(async (promise, pokemon) => {
          await promise //?? how does it work?
          return getPokemon(pokemon.url).then(p => console.log(p.name))
        }, Promise.resolve(undefined))*/
/*    const data = await Promise.all(list.results.slice(0,5).map((pokemon) => { // => {getPokemon(pokemon.url)} it is not gonna work as there is no return
      return getPokemon(pokemon.url)} // await here returns a promise
    ))
    console.log(data)*/
    const {PromisePool} = require('@supercharge/promise-pool')

    const users = [
      {name: 'Marcus'},
      {name: 'Norman'},
      {name: 'Christian'}
    ]

    const {results, errors} = await PromisePool
        .withConcurrency(10)
        .for(list.results)
        .process(async (data: any ) => { // how to fix here?
          return await getPokemon(data.url)
  })
    console.log(results.map((pokemon: any)=> {
      console.log(pokemon.name)
    }))
  }
      // list.results.slice(0,10).forEach(async (listItem) => {  // forEach is incompatible with sync await
      //   const pokemon = await getPokemon(listItem.url)
      //   console.log(pokemon.name)
      // })
  catch (error) {
    console.log(error)
  }
})()


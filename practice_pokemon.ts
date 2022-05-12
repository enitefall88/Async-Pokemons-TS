import fetch from "node-fetch"

interface PokemonList {
  count: number
  next: string
  previous: null
  results:
    {
      name: string
      url: string
    } []

}

interface Pokemon {
  id: number
  name: string
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }[]
}

//with then
/*const getListOfPokemons = () => {
  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((response) => {
      response.json()// returns promise
    .then((data: PokemonList) => {
        fetch(data.results[0].url)
            .then((response) => {
              return response.json()
            })
            .then(data => console.log(data))
          }
         )}
        )
}
getListOfPokemons()*/

const getListOfPokemons = async (): Promise<PokemonList> => {
  const listResponse = await fetch("https://pokeapi.co/api/v2/pokemon/")
  return await listResponse.json()
}

const getPokemon = async (url:string): Promise<Pokemon> => {
  const dataResponse = await fetch(url)
  return await dataResponse.json()
  }

const getFirstPokemon = async (): Promise<Pokemon> => {
  return new Promise(async (resolve, reject) => {   // async func here and has to return a promise N.B!
    try {
      const list = await getListOfPokemons()
      resolve(await getPokemon(list.results[0].url))

    } catch (e) {
      console.log(e)
    }
  })
}

/*
(async function() {
  try {
  const list = await getListOfPokemons() // if omit await then it`s not gonna work
  //const pokemon = await getPokemon(list.results[0].url)
  console.log("getting the list")
  const pokemon = await getFirstPokemon()
  console.log(pokemon.name)
  } catch (e) {
    console.log(e)
  }
  }) ()
*/
/*(async function() {
  try {
    const list = await getListOfPokemons()
    list.results.slice(0,10).forEach(async (listItem) => { // forEach is incompatible with sync/await
      const pokemon = await getPokemon(listItem.url)
      console.log(pokemon.name)
    })
  } catch (e) {
    console.log(e)
  }
  }) ()*/

/*
(async function() {
  try {
    const list = await getListOfPokemons()
    for (const listItem of list.results) { // forEach is incompatible with sync/await
      const pokemon = await getPokemon(listItem.url)
      console.log(pokemon.name)
    }
  } catch (e) {
    console.log(e)
  }
  }) ()
*/

(async function() {
  try {
    const list = await getListOfPokemons()
      const data = await Promise.all(list.results.slice(0,10).map(pokemon => {
        return getPokemon(pokemon.url) // iterates through here https://pokeapi.co/api/v2/pokemon/3/
        }
      ))
    console.log(data)
    console.log("done")
    } catch (e) {
    console.log(e)
  }
  }) ()

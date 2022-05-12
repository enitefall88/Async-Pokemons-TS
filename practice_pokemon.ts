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
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
  return await response.json()
}

  const getPokemon = async (url:string) => {
  const data = await fetch(url)
  return await data.json()
  }

(async function() {
  const list = await getListOfPokemons() // if omit await then it`s not gonna work
  const pokemon = await getPokemon(list.results[0].url)
  console.log(pokemon.name)
  }) ()

import fetch from "node-fetch";

async function listAllPokemons () {
  const listResp = await fetch("https://pokeapi.co/api/v2/pokemon/")
  return await listResp.json()
}

(async function () {
  try {
    const list = await listAllPokemons()
    console.log(list)
  } catch(err) {

  }
}) ()

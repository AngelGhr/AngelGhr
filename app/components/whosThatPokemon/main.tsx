import WhosThatPokemonGame from "@components/whosThatPokemon/game"

export interface PokemonData {
  id: number
  name: string
  image: string
}

export interface WhosThatPokemonProps {
  pokemon: PokemonData
}

export default async function WhosThatPokemonMain() {
  const id = Math.floor(Math.random() * 1025) + 1
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const pokemon: PokemonData = await res.json()
  const idLength = id < 1000 ? 3 : 4
  const pkNmr = (`000${id}`).slice(-idLength)
  pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pkNmr}.png`

  return <WhosThatPokemonGame pokemon={pokemon} />
}

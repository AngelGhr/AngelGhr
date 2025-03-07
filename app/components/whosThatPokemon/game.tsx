'use client'

import { useState, FormEvent, ChangeEvent } from "react"
import { WhosThatPokemonProps } from "@components/whosThatPokemon/main";
import { twMerge } from "tailwind-merge";

export default function WhosThatPokemonGame({ pokemon }: WhosThatPokemonProps) {
  const [guessed, setGuessed] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<boolean>(false);
  const [inputVl, setinputVl] = useState<string>('');

  if (!pokemon) {
    return null
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setinputVl(event.target.value)
  }

  const handleGuessed = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setOutcome(inputVl.trim().toLowerCase() == pokemon.name.toLowerCase())
    setGuessed(true)
  };

  return (
    <>
      <h1 className="text-4xl md:text-6xl mb-2 text-center capitalize font-pokemon text-yellow-400">
        Who's That Pokémon?
      </h1>

      <img
        className={twMerge(
          "mx-auto ease-in-out duration-300",
          guessed ? "brightness-100" : "brightness-0"
        )}
        src={pokemon.image}
        alt={guessed ? pokemon.name : "?"}
      />

      {guessed ? (
        <div>
          <h2 className="text-4xl md:text-6xl mb-2 text-center capitalize font-pokemon text-yellow-400">
            {outcome ? "YES" : "NO"}!, It's {pokemon.name}
          </h2>
          <p className="text-2xl mt-16 text-center">
            Refresh page to try again.
          </p>
        </div>
      ) : (
        <form className="flex justify-center" onSubmit={handleGuessed}>
          <input
            type="text"
            maxLength={100}
            autoFocus={true}
            value={inputVl}
            onChange={handleInputChange}
            placeholder="Who's that Pokemon?"
            className="rounded text-blue-700 text-xl md:text-3xl mr-2 p-2 w-7/12 md:w-fit"
          />

          <button
            type="submit"
            className="ease-in-out duration-300 text-3xl border-2 rounded text-blue-700 border-blue-700 hover:border-blue-700 hover:text-yellow-400 hover:bg-blue-700 p-0.5 md:p-1.5"
          >
            Guess
          </button>
        </form>
      )}
    </>
  )
}

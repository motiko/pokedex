// Renders the profile and games of a single pokemon
import React, { useState, useEffect } from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

let games = null;
let error = null;

const fetchGames = pokemon =>
  fetchPokemonGames(pokemon.game_indices.map(game => game.version.name))
    .then(result => {
      games = result;
    })
    .catch(err => {
      error = err;
    });

function PokemonGames({ pokemon }) {
  if (!games) {
    throw fetchGames(pokemon);
  }
  if (error) {
    throw error;
  }
  return <PokemonGamesSection games={games} />;
}

const createResource = promise => {
  // 💡 Use promise.then and a mutable "status" variable
  // to keep track of promise status
  // Store "data" and "error" in mutable variables and set
  // them from promise.then and promise.catch
  let data = null;
  let error = null;
  promise
    .then(resul => {
      data = resul;
    })
    .catch(err => {
      error = err;
    });
  return {
    read() {
      // 💡 return data if there is data,
      // otherwise throw error if there is error
      // otherwise throw promise
      if (data) {
        return data;
      }
      if (error) {
        throw error;
      }
      throw promise;
    }
  };
};

function Pokemon({ pokemonResource }) {
  const pokemon = pokemonResource.read();
  return (
    <Column width={1} p={4}>
          <PokemonProfile pokemon={pokemon} />
          <PokemonGames pokemon={pokemon} />
    </Column>
  );
}

function usePokemon(name) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    setPokemon(null);

    if (!name) return;
    fetchPokemonByName(name).then(pokemon => {
      setPokemon(pokemon);
    });
  }, [name]);
  return pokemon;
}

function usePokemonGames(pokemon) {
  const [games, setGames] = useState(null);

  useEffect(() => {
    setGames(null);

    if (!pokemon) return;
  }, [pokemon]);
  return games;
}

export default Pokemon;

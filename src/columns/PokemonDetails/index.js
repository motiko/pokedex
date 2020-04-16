// Renders the profile and games of a single pokemon
import React, { useState, useEffect } from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

function PokemonGames({ pokemon }) {
  const [games, setGames] = useState(null);

  useEffect(() => {
    setGames(null);

    if (!pokemon) return;
    fetchPokemonGames(pokemon.game_indices.map(game => game.version.name)).then(
      games => {
        setGames(games);
      }
    );
  }, [pokemon]);

  return !games ? <Spinner /> : <PokemonGamesSection games={games} />;
}

function Pokemon({ name }) {
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = () => {
    setPokemon(null);

    if (!name) return;
    fetchPokemonByName(name).then(pokemon => {
      setPokemon(pokemon);
    });
  };

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon, name]);
  return (
    <Column width={1} p={4}>
      {!name ? null : !pokemon ? (
        <Spinner />
      ) : (
        <>
          <PokemonProfile pokemon={pokemon} />
          <PokemonGames pokemon={pokemon} />
        </>
      )}
    </Column>
  );
}

export default Pokemon;

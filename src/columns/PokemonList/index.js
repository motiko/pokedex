// Renders the sidebar with the list of pokemons in the pokedex
import React, { useEffect, useState } from "react";
import { Link } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";

function PokemonList({ setSelectedPokemon }) {
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    fetchPokemons().then(pokemons => {
      setPokemons(pokemons);
    });
  }, []);
  return (
    <Sidebar>
      <Link onClick={() => setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {!pokemons ? (
        <Spinner />
      ) : (
        pokemons.map(pokemon => (
          <Link
            key={pokemon.name}
            onClick={() => setSelectedPokemon(pokemon.name)}
          >
            <SidebarItem>{pokemon.name}</SidebarItem>
          </Link>
        ))
      )}
    </Sidebar>
  );
}
export default PokemonList;

// Renders the sidebar with the list of pokemons in the pokedex
import React, { useEffect, useState } from "react";
import { Link } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";

function usePokemons() {
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    fetchPokemons().then(pokemons => {
      setPokemons(pokemons);
    });
  }, []);
  return pokemons;
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
const resource = createResource(fetchPokemons());

function PokemonList({ setSelectedPokemon }) {
  const pokemons = resource.read();
  return (
    <Sidebar>
      <Link onClick={() => setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {pokemons.map(pokemon => (
          <Link
            key={pokemon.name}
            onClick={() => setSelectedPokemon(pokemon.name)}
          >
            <SidebarItem>{pokemon.name}</SidebarItem>
          </Link>
      ))}
    </Sidebar>
  );
}
export default PokemonList;

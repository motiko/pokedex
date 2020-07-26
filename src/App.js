// The <App /> component is responsible for rendering the two main columns
import React, { useState, useEffect } from "react";
import { BaseStyles } from "@primer/components";
import { Flex } from "@primer/components";
import PokemonList from "./columns/PokemonList";
import { fetchPokemonGames, fetchPokemonByName } from "./api/pokeapi";
// import PokemonDetails from "./columns/PokemonDetails";
const PokemonDetails = React.lazy(() =>
  import(/* webpackChunkName: "pokemonDetails" */ "./columns/PokemonDetails")
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
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

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonResource, setPokemonResource] = useState(null);

  useEffect(() => {
    if (selectedPokemon) {
      setPokemonResource(
        createResource(fetchPokemonByName(selectedPokemon.name))
      );
    }
  }, [selectedPokemon]);

  useEffect(() => {
    document.title = `${
      selectedPokemon ? `${selectedPokemon} | ` : ""
    } My Pokedex`;
  }, [selectedPokemon]);

  return (
    <BaseStyles>
      <Flex>
        <ErrorBoundary>
          <React.Suspense fallback={<div>Loading...</div>}>
            <PokemonList setSelectedPokemon={setSelectedPokemon} />
            {pokemonResource && (
              <React.Suspense fallback={<div>Loading2222...</div>}>
                <PokemonDetails pokemonResource={pokemonResource} />
              </React.Suspense>
            )}
          </React.Suspense>
        </ErrorBoundary>
      </Flex>
    </BaseStyles>
  );
}

// class App extends React.Component {

//   componentDidMount() {
//     this.updateDocumentTitle();
//   }

//   componentDidUpdate(_, prevState) {
//     if (prevState.selectedPokemon !== this.state.selectedPokemon) {
//       this.updateDocumentTitle();
//     }
//   }

//   updateDocumentTitle() {
//     const { selectedPokemon } = this.state;
//     document.title = `${selectedPokemon ? `${selectedPokemon} | ` : ""}Pokedex`;
//   }

//   render() {
//     return (
//       <BaseStyles>
//         <Flex>
//           <PokemonList setSelectedPokemon={this.setSelectedPokemon} />
//           <PokemonDetails name={this.state.selectedPokemon} />
//         </Flex>
//       </BaseStyles>
//     );
//   }
// }

export default App;

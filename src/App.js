// The <App /> component is responsible for rendering the two main columns
import React, { useState, useEffect } from "react";
import { BaseStyles } from "@primer/components";
import { Flex } from "@primer/components";
import PokemonList from "./columns/PokemonList";
import PokemonDetails from "./columns/PokemonDetails";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  useEffect(() => {
    document.title = `${
      selectedPokemon ? `${selectedPokemon} | ` : ""
    } My Pokedex`;
  }, [selectedPokemon]);
  return (
    <BaseStyles>
      <Flex>
        <PokemonList setSelectedPokemon={setSelectedPokemon} />
        <PokemonDetails name={selectedPokemon} />
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

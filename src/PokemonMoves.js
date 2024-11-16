import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pokemonmoves.css';

function PokemonMoves({ pokemonData }) {
  const [moves, setMoves] = useState([]);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //console.log(pokemonData); 
  if (pokemonData.moves && Array.isArray(pokemonData.moves)) {
    setMoves(pokemonData.moves.slice(0, 4).map(move => move.move.name.toUpperCase()));
  } else {
    setMoves([]);
  }


    const speciesUrl = pokemonData.species.url;
    fetch(speciesUrl)
      .then(res => res.json())
      .then(speciesData => {
        const evolutionChainUrl = speciesData.evolution_chain.url;
        return fetch(evolutionChainUrl);
      })
      .then(res => res.json())
      .then(evolutionChainData => {
        setEvolutionChain(extractEvolutionNames(evolutionChainData.chain));
      });
  }, [pokemonData]);

  const extractEvolutionNames = (chain) => {
    let names = [];
    let currentChain = chain;
    do {
      names.push(currentChain.species);
      currentChain = currentChain.evolves_to[0];
    } while (currentChain && currentChain.species);
    return names;
  };

  const handleEvolutionClick = (evolutionName) => {
    navigate(`/pokemon/${evolutionName}`, { state: { page: 'info' } });
  };

  return (

    <div>
        <div className="moves-group">
            <div className="overlap-13">
              <div className="rectangle-18" />
              <div className="rectangle-19" />
              <div className="moves-text">
              <ol>
              {moves.map((move, index) => (
                  <li key={index}>{move}</li>
                   ))}
                  </ol>
              </div>
            </div>
          </div>
          <div className="moves-title">MOVES</div>


          <div className="evolutions-group">
            <div className="overlap-14">
              <div className="rectangle-20" />
              <div className="evolutions-text">
              <p>{evolutionChain.map((species, index) => [
          index > 0 && " -> ",
          <span className='evolinks' key={index} onClick={() => handleEvolutionClick(species.name)} >
            {species.name}
          </span>
        ])}
      </p>
      </div>
    </div>
  </div>
    <div className="evolutions-title">EVOLUTIONS</div>


    </div>
  );
}

    export default PokemonMoves;
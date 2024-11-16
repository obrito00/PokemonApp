import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import pokemonCollageImage from './pokemoncollage.jpeg'; 

function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pokemonName = searchParams.get('pokemonName');
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    if (pokemonName) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`)
        .then((res) => res.json())
        .then((data) => {
          setPokemonData(data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setPokemonData(null);
        });
    }
  }, [pokemonName]);

  function handleViewStats() {
    navigate(`/pokemon/${pokemonName.toLowerCase()}`);
  }

  return (
    <div className='pokenavhome'>
      {/* Render the image only if pokemonData is null */}
      {!pokemonData && (
        <div>
          <img src={pokemonCollageImage} alt="Pokemon Collage" />
        </div>
      )}

      {/* Render the image only if pokemonData is not null */}
      {pokemonData && (
        <div>
          <img src={pokemonData.sprites.front_default} alt={pokemonName} />
          <p>{pokemonName.toUpperCase()}</p>
          <button onClick={handleViewStats}>View Pokémon</button>
        </div>
      )}
    </div>
  );
}

export default Home;

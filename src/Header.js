import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [suggestedPokemonNames, setSuggestedPokemonNames] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    if ((location.pathname === '/' || location.pathname.startsWith('/pokemon/')) && searchInput.length >= 1) {
      fetchSuggestedPokemonNames(searchInput);
    } else {
      setSuggestedPokemonNames([]);
    }
  }, [searchInput, location]);

  const fetchSuggestedPokemonNames = async (inputValue) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
      const data = await response.json();
      const filteredPokemonNames = data.results
        .map(pokemon => pokemon.name)
        .filter(name => name.startsWith(inputValue.toLowerCase()));
      setSuggestedPokemonNames(filteredPokemonNames);
    } catch (error) {
      console.error("Error fetching suggested Pokemon names: ", error);
      setSuggestedPokemonNames([]);
    }
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };
  
  const handleInputBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
    }, 150); 
  };
  
  const handleSelectSuggestion = (name) => {
    setSearchInput(name);
    setIsInputFocused(false); 
    setSuggestedPokemonNames([]);
    navigate(`/?pokemonName=${name.toLowerCase()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      setIsInputFocused(false); 
      navigate(`/?pokemonName=${searchInput.toLowerCase()}`);
    }
  };


  return (
    <header>
      <h1><a href="/">PokéNav</a></h1>
      <form onSubmit={handleSearch}>
        <div className="search-container">
          <input
            name="pokemonName"
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search for Pokémon"
            autoComplete="off"
          />
          {isInputFocused && suggestedPokemonNames.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestedPokemonNames.map((name, index) => (
                <li key={index} onClick={() => handleSelectSuggestion(name)}>
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;

import { useParams, useLocation } from 'react-router-dom';
import PokemonInfo from './PokemonInfo';
import PokemonSkills from './PokemonSkills';
import PokemonMoves from './PokemonMoves';
import { useState, useEffect } from 'react';
import Profilehome from './Profilehome';
import Pokeball from './Pokeball';

function PokemonProfile() {
  const { pokemonName } = useParams();
  const location = useLocation(); 
  const [currentPage, setCurrentPage] = useState('info');
  const [pokemonData, setPokemonData] = useState({});
  const [encounterDetails, setEncounterDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('Pokémon Info'); 

  useEffect(() => {
    
    if (location.state?.page) {
      setCurrentPage(location.state.page);
    }
  }, [location]); 

  useEffect(() => {

    const fetchPokemonData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`);
        const data = await response.json();
        setPokemonData(data);
  
        const encountersResponse = await fetch(data.location_area_encounters);
        const encountersData = await encountersResponse.json();
        let encounter = encountersData.length > 1 ? encountersData[1] : null; 
  
        if (encounter) {
          setEncounterDetails({
            level: encounter.version_details[0].encounter_details[0].min_level,
            location: encounter.location_area.name.replace(/-/g, ' '),
          });
        } else {
          // if no encounter level get the min level from evo
          const speciesResponse = await fetch(data.species.url);
          const speciesData = await speciesResponse.json();
          const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
          const evolutionChainData = await evolutionChainResponse.json();
          const { minLevel, triggerName } = extractMinLevelAndTriggerFromEvolutionChain(evolutionChainData.chain, pokemonName.toLowerCase());
        
          if (minLevel) {
            setEncounterDetails({
              level: minLevel,
              location: triggerName, 
            }); 
          } else {
            setEncounterDetails({
              level: 30,
              location: 'Evolution by stone',
            });
          }
        }
      } catch (error) {
        console.error("Error fetching Pokemon data: ", error);
      } finally {
        setIsLoading(false);
      }
    };



    fetchPokemonData();
  }, [pokemonName]);



  const extractMinLevelAndTriggerFromEvolutionChain = (chain, pokemonName) => {
    let currentChain = chain;
    while (currentChain && currentChain.species.name !== pokemonName && currentChain.evolves_to.length) {
      currentChain = currentChain.evolves_to.find(e => e.species.name === pokemonName) || currentChain.evolves_to[0];
    }
  
    if (currentChain && currentChain.evolution_details.length) {
      const minLevel = currentChain.evolution_details[0].min_level;
      const triggerName = currentChain.evolution_details[0].trigger.name.replace(/-/g, ' '); 
  
      return {
        minLevel,
        triggerName,
      };
    }
  
    return null;
  };

  
  useEffect(() => {
    switch (currentPage) {
      case 'info':
        setPageTitle('Pokémon Info');
        break;
      case 'skills':
        setPageTitle('Pokémon Skills');
        break;
      case 'moves':
        setPageTitle('Pokémon Moves');
        break;
      default:
        setPageTitle('Pokémon Info');
    }
  }, [currentPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (

    
    <div className='pokemonprofile'>
      <Profilehome />

      {/* dark green rectangle and light blue glow rectangle */}
      <div className="dark-green-rectangle" />
            <div className="blue-glow-rectangle" />


            <div className="constant-info-group">
              <div className="overlap-9">
                <div className="constant-info-rectangle" />
                <div className="level-text">Lv{encounterDetails.level}</div>
                <Pokeball className="pokeball-1" />
                <div className="pokemon-name-text">
                {pokemonName.toUpperCase()}
                  <br />
                  /{pokemonName.toUpperCase()}
                </div>
                <div className="pokemon-number-text">No{pokemonData.id}</div>
                <img className="pokemon-image" alt={pokemonName} src={pokemonData.sprites.front_default} />
              </div>
            </div>
            <div className="page-title-text">{pageTitle}</div>


          {currentPage === 'info' && <PokemonInfo pokemonData={pokemonData} encounterDetails={encounterDetails} />}
          {currentPage === 'skills' && <PokemonSkills pokemonData={pokemonData} encounterDetails={encounterDetails} />}
          {currentPage === 'moves' && <PokemonMoves pokemonData={pokemonData} encounterDetails={encounterDetails} />}
          

          {/* info, skills and moves buttons */}
          <div className="info-button-group"> 
              <div className="overlap-3">
                <div className="info-button-text-wrapper"><button onClick={() => setCurrentPage('info')} className={currentPage === 'info' ? 'active' : 'inactive'}>Info</button></div>
              </div>
            </div>

            <div className="skills-button-group">
              <div className="overlap-4"> 
                <div className="skills-button-text-wrapper"><button onClick={() => setCurrentPage('skills')} className={currentPage === 'skills' ? 'active' : 'inactive'}>Skills</button></div>
              </div>
            </div>

            <div className="moves-button-group">
              <div className="overlap-5">
                
                <div className="moves-button-text-wrapper"><button onClick={() => setCurrentPage('moves')} className={currentPage === 'moves' ? 'active' : 'inactive'}>Moves</button></div>
              </div>
            </div>
     
    </div>
  );


  
}

export default PokemonProfile;
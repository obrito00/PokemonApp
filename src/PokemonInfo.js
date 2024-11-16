import { useState, useEffect } from 'react';


function PokemonInfo({ pokemonData, encounterDetails }) {
  const [abilityFlavorText, setAbilityFlavorText] = useState('');

  useEffect(() => {
    
    const abilityUrl = pokemonData.abilities[0].ability.url;
    fetch(abilityUrl)
      .then(res => res.json())
      .then(data => {
        const flavorText = data.flavor_text_entries.find(entry => entry.language.name === 'en');
        setAbilityFlavorText(flavorText ? flavorText.flavor_text : '');
      });

  }, [pokemonData]);

  return (
    <div>
      {}
      <div className="pokemon-ability-group">
              <div className="overlap-6">
                <div className="rectangle-6" />
                <div className="pokemon-ability-text">{pokemonData.abilities[0].ability.name.toUpperCase()}</div>
                <div className="rectangle-7" />
                <div className="pokemon-ability-flavor-text">{abilityFlavorText}</div>
              </div>
            </div>
            <div className="ability-title">ABILITY</div>

            <div className="trainer-memo-group">
              <div className="overlap-7">
                <div className="rectangle-8" />
                <p className="encounter-details">
                  Met at Lv{encounterDetails.level}, {encounterDetails.location}.
                </p>
              </div>
            </div>
            <div className="trainer-memo-title">TRAINER&nbsp;&nbsp;MEMO</div>

            <div className="pokemon-type-group">
              <div className="overlap-8">
                <div className="rectangle-9" />
                <div className="OT-TRAINER-RED">OT/ TRAINER&nbsp;&nbsp;RED</div>
                <div className="rectangle-10" />
                <div className="pokemon-type-text">TYPE/ {pokemonData.types.map(type => type.type.name.toUpperCase()).join(', ')}</div>
                
              </div>
            </div>
            <div className="profile-title">PROFILE</div>

      
    </div>


  );
}

    export default PokemonInfo;
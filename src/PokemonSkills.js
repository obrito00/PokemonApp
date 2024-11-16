import React, { useState, useEffect } from 'react';
import './pokemonskills.css';

function PokemonSkills({ pokemonData }) {
    const [heldItems, setHeldItems] = useState('None');
    const [stats, setStats] = useState({});
  
    useEffect(() => {
      setHeldItems(pokemonData.held_items.map(item => item.item.name).join(', ') || 'None');
  
      const extractedStats = {};
      pokemonData.stats.forEach(stat => {
        extractedStats[stat.stat.name] = stat.base_stat;
      });
      setStats(extractedStats);
    }, [pokemonData]);
  
    return (
      <div>

          <div className="load-group">
            <div className="overlap-10">
              <div className="rectangle-12" />
              <div className="weight-title">WEIGHT</div>
              <div className="rectangle-13" />
              <div className="weight-text">{pokemonData.weight} LBS</div>
            </div>
          </div>
          <div className="load-title">LOAD</div>


          <div className="item-group">
            <div className="overlap-11">
              <div className="rectangle-14" />
              <div className="item-text">{heldItems}</div>
            </div>
          </div>
          <div className="item-title">ITEM</div>


          <div className="stats-group">
            <div className="overlap-12">
              <div className="rectangle-15" />
              <div className="sp-atk-title">SP.ATK</div>
              <div className="sp-def-title">SP.DEF</div>
              <div className="speed-title">SPEED</div>
              <div className="hp-title">HP</div>
              <div className="attack-title">ATTACK</div>
              <div className="defense-title">DEFENSE</div>
              <div className="rectangle-16" />
              <div className="rectangle-17" />
              <div className="hp-text">{stats.hp}/{stats.hp}</div>
              <div className="sp-atk-text">{stats['special-attack']}</div>
              <div className="sp-def-text">{stats['special-defense']}</div>
              <div className="speed-text">{stats.speed}</div>
              <div className="attack-text">
                &nbsp;&nbsp;&nbsp;&nbsp;{stats.attack}
              </div>
              <div className="defense-text">
                &nbsp;&nbsp; {stats.defense}
              </div>
            </div>
          </div>
          <div className="stats-title">STATS</div>

      </div>
    );
  }

    export default PokemonSkills;
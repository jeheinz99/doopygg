import React, { useEffect } from 'react';

const Blue = props => {

  const { runeInfo } = props;

  useEffect(() => {
    document.getElementById(`${runeInfo[0].id}`).classList.remove('inactiveKeystone');
    document.getElementById(`${runeInfo[0].id}`).classList.add('activeKeystone');

    document.getElementById(`${runeInfo[1].id}`).classList.remove('inactiveRune');
    document.getElementById(`${runeInfo[1].id}`).classList.add('activeRune');

    document.getElementById(`${runeInfo[2].id}`).classList.remove('inactiveRune');
    document.getElementById(`${runeInfo[2].id}`).classList.add('activeRune');

    document.getElementById(`${runeInfo[3].id}`).classList.remove('inactiveRune');
    document.getElementById(`${runeInfo[3].id}`).classList.add('activeRune');
  }, []);

  return (
    <div className="TreeBox">

      <div className="Keystone">
        <img className="inactiveKeystone" id="8214" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/summonaery/summonaery.png"/>
        <img className="inactiveKeystone" id="8229" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/arcanecomet/arcanecomet.png"/>
        <img className="inactiveKeystone" id="8230" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/phaserush/phaserush.png"/>
      </div>

      <div className="minorRuneRow" id="Blue">
        <img className="inactiveRune" id="8224" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/nullifyingorb/pokeshield.png"/>
        <img className="inactiveRune" id="8226" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/manaflowband/manaflowband.png"/>
        <img className="inactiveRune" id="8275" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/nimbuscloak/6361.png"/>
      </div>

      <div className="minorRuneRow" id="Blue">
        <img className="inactiveRune" id="8210" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/transcendence/transcendence.png"/>
        <img className="inactiveRune" id="8234" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/celerity/celeritytemp.png"/>
        <img className="inactiveRune" id="8233" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/absolutefocus/absolutefocus.png"/>
      </div>

      <div className="minorRuneRow" id="Blue">
        <img className="inactiveRune" id="8237" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/scorch/scorch.png"/>
        <img className="inactiveRune" id="8232" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/waterwalking/waterwalking.png"/>
        <img className="inactiveRune" id="8236" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/gatheringstorm/gatheringstorm.png"/>
      </div>

    </div>
  );
};

export default Blue;
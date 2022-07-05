import React, { useEffect } from 'react';

const Yellow2 = props => {

  const { runeInfo } = props;

  useEffect(() => {
    document.getElementById(`${runeInfo[6].id}`).classList.remove('inactiveRune');
    document.getElementById(`${runeInfo[6].id}`).classList.add('activeRune');

    document.getElementById(`${runeInfo[7].id}`).classList.remove('inactiveRune');
    document.getElementById(`${runeInfo[7].id}`).classList.add('activeRune');
  });

  return (
    <div className="TreeBox">

      <div className="Keystone">
        <img className="TreeStyle" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7201_precision.png"/>
      </div>

      <div className="minorRuneRow" id="Yellow">
        <img className="inactiveRune" id="9101" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/overheal.png"/>
        <img className="inactiveRune" id="9111" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/triumph.png"/>
        <img className="inactiveRune" id="8009" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/presenceofmind/presenceofmind.png"/>
      </div>

      <div className="minorRuneRow" id="Yellow">
        <img className="inactiveRune" id="9104" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/legendalacrity/legendalacrity.png"/>
        <img className="inactiveRune" id="9105" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/legendtenacity/legendtenacity.png"/>
        <img className="inactiveRune" id="9103" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/legendbloodline/legendbloodline.png"/>
      </div>

      <div className="minorRuneRow" id="Yellow">
        <img className="inactiveRune" id="8014" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/coupdegrace/coupdegrace.png"/>
        <img className="inactiveRune" id="8017" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/cutdown/cutdown.png"/>
        <img className="inactiveRune" id="8299" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/laststand/laststand.png"/>
      </div>

  </div>
  );
};

export default Yellow2;
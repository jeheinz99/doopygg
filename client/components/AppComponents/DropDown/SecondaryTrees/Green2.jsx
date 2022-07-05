import React, { useEffect } from 'react';

const Green2 = props => {

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
        <img className="TreeStyle" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7204_resolve.png"/>
      </div>

      <div className="minorRuneRow" id="Green">
        <img className="inactiveRune" id="8446" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/demolish/demolish.png"/>
        <img className="inactiveRune" id="8463" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/fontoflife/fontoflife.png"/>
        <img className="inactiveRune" id="8401" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/mirrorshell/mirrorshell.png"/>
      </div>

      <div className="minorRuneRow" id="Green">
        <img className="inactiveRune" id="8429" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/conditioning/conditioning.png"/>
        <img className="inactiveRune" id="8444" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/secondwind/secondwind.png"/>
        <img className="inactiveRune" id="8473" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/boneplating/boneplating.png"/>
      </div>

      <div className="minorRuneRow" id="Green">
        <img className="inactiveRune" id="8451" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/overgrowth/overgrowth.png"/>
        <img className="inactiveRune" id="8453" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/revitalize/revitalize.png"/>
        <img className="inactiveRune" id="8242" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/unflinching/unflinching.png"/>
      </div>

    </div>
  );
};

export default Green2;
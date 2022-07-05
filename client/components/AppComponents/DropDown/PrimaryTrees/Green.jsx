import React, { useEffect } from 'react';

const Green = props => {

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
        <img className="inactiveKeystone" id="8437" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/graspoftheundying/graspoftheundying.png"/>
        <img className="inactiveKeystone" id="8439" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/veteranaftershock/veteranaftershock.png"/>
        <img className="inactiveKeystone" id="8465" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/guardian/guardian.png"/>
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

export default Green;
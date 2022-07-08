import React, { useEffect } from 'react';

const Green2 = props => {

  const { matchNum, runeInfo } = props;

  useEffect(() => {
    document.getElementById(`${matchNum}-${runeInfo[6].id}`).classList.remove('inactiveRune');
    document.getElementById(`${matchNum}-${runeInfo[6].id}`).classList.add('activeRune');

    document.getElementById(`${matchNum}-${runeInfo[7].id}`).classList.remove('inactiveRune');
    document.getElementById(`${matchNum}-${runeInfo[7].id}`).classList.add('activeRune');
  });

  return (
    <div className="TreeBox">

      <div className="Keystone">
        <img className="TreeStyle" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7204_resolve.png"/>
      </div>

      <div className="minorRuneRow" id="Green">
        <img className="inactiveRune" id={`${matchNum}-8446`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/demolish/demolish.png"/>
        <img className="inactiveRune" id={`${matchNum}-8463`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/fontoflife/fontoflife.png"/>
        <img className="inactiveRune" id={`${matchNum}-8401`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/mirrorshell/mirrorshell.png"/>
      </div>

      <div className="minorRuneRow" id="Green">
        <img className="inactiveRune" id={`${matchNum}-8429`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/conditioning/conditioning.png"/>
        <img className="inactiveRune" id={`${matchNum}-8444`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/secondwind/secondwind.png"/>
        <img className="inactiveRune" id={`${matchNum}-8473`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/boneplating/boneplating.png"/>
      </div>

      <div className="minorRuneRow" id="Green">
        <img className="inactiveRune" id={`${matchNum}-8451`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/overgrowth/overgrowth.png"/>
        <img className="inactiveRune" id={`${matchNum}-8453`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/revitalize/revitalize.png"/>
        <img className="inactiveRune" id={`${matchNum}-8242`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/unflinching/unflinching.png"/>
      </div>

    </div>
  );
};

export default Green2;
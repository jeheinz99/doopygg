import React, { useEffect } from 'react';

const Red2 = props => {

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
        <img className="TreeStyle" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7200_domination.png"/>
      </div>

      <div className="minorRuneRow" id="Red">
        <img className="inactiveRune" id={`${matchNum}-8126`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/cheapshot/cheapshot.png"/>
        <img className="inactiveRune" id={`${matchNum}-8139`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/tasteofblood/greenterror_tasteofblood.png"/>
        <img className="inactiveRune" id={`${matchNum}-8143`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/suddenimpact/suddenimpact.png"/>
      </div>

      <div className="minorRuneRow" id="Red">
        <img className="inactiveRune" id={`${matchNum}-8136`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/zombieward/zombieward.png"/>
        <img className="inactiveRune" id={`${matchNum}-8120`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/ghostporo/ghostporo.png"/>
        <img className="inactiveRune" id={`${matchNum}-8138`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/eyeballcollection/eyeballcollection.png"/>
      </div>

      <div className="minorRuneRow" id="Red">
        <img className="inactiveRune" id={`${matchNum}-8135`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/treasurehunter/treasurehunter.png"/>
        <img className="inactiveRune" id={`${matchNum}-8134`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/ingenioushunter/ingenioushunter.png"/>
        <img className="inactiveRune" id={`${matchNum}-8105`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/relentlesshunter/relentlesshunter.png"/>
        <img className="inactiveRune" id={`${matchNum}-8106`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/ultimatehunter/ultimatehunter.png"/>
      </div>

    </div>
  );
};

export default Red2;
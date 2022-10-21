import { useEffect } from 'react';

const Red = props => {

  const { matchNum, runeInfo } = props;

  useEffect(() => {
    document.getElementById(`${matchNum}-${runeInfo[0].id}`).classList.remove('inactiveKeystone');
    document.getElementById(`${matchNum}-${runeInfo[0].id}`).classList.add('activeKeystone');

    document.getElementById(`${matchNum}-${runeInfo[1].id}`).classList.remove('inactiveRune');
    document.getElementById(`${matchNum}-${runeInfo[1].id}`).classList.add('activeRune');

    document.getElementById(`${matchNum}-${runeInfo[2].id}`).classList.remove('inactiveRune');
    document.getElementById(`${matchNum}-${runeInfo[2].id}`).classList.add('activeRune');

    document.getElementById(`${matchNum}-${runeInfo[3].id}`).classList.remove('inactiveRune');
    document.getElementById(`${matchNum}-${runeInfo[3].id}`).classList.add('activeRune');
  }, []);

  return (
    <div className="TreeBox">

      <div className="Keystone">
        <img className="inactiveKeystone" id={`${matchNum}-8112`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/electrocute/electrocute.png"/>
        <img className="inactiveKeystone" id={`${matchNum}-8124`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/predator/predator.png"/>
        <img className="inactiveKeystone" id={`${matchNum}-8128`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/darkharvest/darkharvest.png"/>
        <img className="inactiveKeystone" id={`${matchNum}-9923`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/hailofblades/hailofblades.png"/>
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

export default Red;
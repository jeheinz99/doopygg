import { useEffect } from 'react';

const Yellow = props => {

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
        <img className="inactiveKeystone" id={`${matchNum}-8005`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/presstheattack/presstheattack.png"/>
        <img className="inactiveKeystone" id={`${matchNum}-8008`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/lethaltempo/lethaltempotemp.png"/>
        <img className="inactiveKeystone" id={`${matchNum}-8021`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/fleetfootwork/fleetfootwork.png"/>
        <img className="inactiveKeystone" id={`${matchNum}-8010`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/conqueror/conqueror.png"/>
      </div>

      <div className="minorRuneRow" id="Yellow">
        <img className="inactiveRune" id={`${matchNum}-9101`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/overheal.png"/>
        <img className="inactiveRune" id={`${matchNum}-9111`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/triumph.png"/>
        <img className="inactiveRune" id={`${matchNum}-8009`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/presenceofmind/presenceofmind.png"/>
      </div>

      <div className="minorRuneRow" id="Yellow">
        <img className="inactiveRune" id={`${matchNum}-9104`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/legendalacrity/legendalacrity.png"/>
        <img className="inactiveRune" id={`${matchNum}-9105`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/legendtenacity/legendtenacity.png"/>
        <img className="inactiveRune" id={`${matchNum}-9103`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/legendbloodline/legendbloodline.png"/>
      </div>

      <div className="minorRuneRow" id="Yellow">
        <img className="inactiveRune" id={`${matchNum}-8014`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/coupdegrace/coupdegrace.png"/>
        <img className="inactiveRune" id={`${matchNum}-8017`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/cutdown/cutdown.png"/>
        <img className="inactiveRune" id={`${matchNum}-8299`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/laststand/laststand.png"/>
      </div>

    </div>
  );
};

export default Yellow;
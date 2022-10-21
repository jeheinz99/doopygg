import { useEffect } from 'react';

const Yellow2 = props => {

  const { matchNum, runeInfo } = props;

  useEffect(() => {
    document.getElementById(`${matchNum}-${runeInfo[6].id}`).classList.remove('inactiveRune');
    document.getElementById(`${matchNum}-${runeInfo[6].id}`).classList.add('activeRune');

    document.getElementById(`${matchNum}-${runeInfo[7].id}`).classList.remove('inactiveRune');
    document.getElementById(`${matchNum}-${runeInfo[7].id}`).classList.add('activeRune');
  }, []);

  return (
    <div className="TreeBox">

      <div className="Keystone">
        <img className="TreeStyle" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7201_precision.png"/>
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
        <img className="inactiveRune" id={`${matchNum}-8229`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/laststand/laststand.png"/>
      </div>

  </div>
  );
};

export default Yellow2;
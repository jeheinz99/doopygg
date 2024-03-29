import { useEffect } from 'react';

const White2 = props => {

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
      <img className="TreeStyle" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7203_whimsy.png"/>
    </div>

    <div className="minorRuneRow" id="White">
        <img className="inactiveRune" id={`${matchNum}-8306`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/hextechflashtraption/hextechflashtraption.png"/>
        <img className="inactiveRune" id={`${matchNum}-8304`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/magicalfootwear/magicalfootwear.png"/>
        <img className="inactiveRune" id={`${matchNum}-8313`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/perfecttiming/perfecttiming.png"/>
      </div>

      <div className="minorRuneRow" id="White">
        <img className="inactiveRune" id={`${matchNum}-8321`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/futuresmarket/futuresmarket.png"/>
        <img className="inactiveRune" id={`${matchNum}-8316`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/miniondematerializer/miniondematerializer.png"/>
        <img className="inactiveRune" id={`${matchNum}-8345`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/biscuitdelivery/biscuitdelivery.png"/>
      </div>

      <div className="minorRuneRow" id="White">
        <img className="inactiveRune" id={`${matchNum}-8347`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/cosmicinsight/cosmicinsight.png"/>
        <img className="inactiveRune" id={`${matchNum}-8410`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/approachvelocity/approachvelocity.png"/>
        <img className="inactiveRune" id={`${matchNum}-8352`} src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/timewarptonic/timewarptonic.png"/>
      </div>

  </div>
  );
};

export default White2;
import React, { useEffect } from 'react';

const White = props => {

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
        <img className="inactiveKeystone" id="8351" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/glacialaugment/glacialaugment.png"/>
        <img className="inactiveKeystone" id="8360" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/unsealedspellbook/unsealedspellbook.png"/>
        <img className="inactiveKeystone" id="8369" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/firststrike/firststrike.png"/>
      </div>

      <div className="minorRuneRow" id="White">
        <img className="inactiveRune" id="8306" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/hextechflashtraption/hextechflashtraption.png"/>
        <img className="inactiveRune" id="8304" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/magicalfootwear/magicalfootwear.png"/>
        <img className="inactiveRune" id="8313" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/perfecttiming/perfecttiming.png"/>
      </div>

      <div className="minorRuneRow" id="White">
        <img className="inactiveRune" id="8321" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/futuresmarket/futuresmarket.png"/>
        <img className="inactiveRune" id="8316" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/miniondematerializer/miniondematerializer.png"/>
        <img className="inactiveRune" id="8345" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/biscuitdelivery/biscuitdelivery.png"/>
      </div>

      <div className="minorRuneRow" id="White">
        <img className="inactiveRune" id="8347" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/cosmicinsight/cosmicinsight.png"/>
        <img className="inactiveRune" id="8410" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/approachvelocity/approachvelocity.png"/>
        <img className="inactiveRune" id="8352" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/timewarptonic/timewarptonic.png"/>
      </div>

    </div>
  );
};

export default White;
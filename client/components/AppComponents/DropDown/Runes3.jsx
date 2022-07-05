import React, { useEffect } from 'react';

const Runes3 = props => {

  const { runeInfo } = props;

  useEffect(() => {
    document.getElementById(`r3-${runeInfo[8].id}`).classList.remove('inactiveRune');
    document.getElementById(`r3-${runeInfo[8].id}`).classList.add('activeRune');

    document.getElementById(`r2-${runeInfo[9].id}`).classList.remove('inactiveRune');
    document.getElementById(`r2-${runeInfo[9].id}`).classList.add('activeRune');

    document.getElementById(`r1-${runeInfo[10].id}`).classList.remove('inactiveRune');
    document.getElementById(`r1-${runeInfo[10].id}`).classList.add('activeRune');
  });

  return (
    <div className="TreeDiv">

      <div className="minorShardRow">
        <img className="inactiveRune" id="r1-5008" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsadaptiveforceicon.png"/>
        <img className="inactiveRune" id="r1-5005" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsattackspeedicon.png"/>
        <img className="inactiveRune" id="r1-5007" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodscdrscalingicon.png"/>
      </div>

      <div className="minorShardRow">
        <img className="inactiveRune" id="r2-5008" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsadaptiveforceicon.png"/>
        <img className="inactiveRune" id="r2-5002" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsarmoricon.png"/>
        <img className="inactiveRune" id="r2-5003" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsmagicresicon.magicresist_fix.png"/>
      </div>

      <div className="minorShardRow">
        <img className="inactiveRune" id="r3-5001" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodshealthscalingicon.png"/>
        <img className="inactiveRune" id="r3-5002" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsarmoricon.png"/>
        <img className="inactiveRune" id="r3-5003" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsmagicresicon.magicresist_fix.png"/>
      </div>

    </div>
  );
};

export default Runes3;
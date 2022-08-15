import React from 'react';
import { RiSwordFill } from 'react-icons/ri';

const InfoBar = () => {
  return (
    <div className="TeamInfoTextDD">

      <div className="TeamInfoTextDD1">
        <div className="invisDiv" id="invis1"> <p> VICTORY </p> </div>
        <p id="damageDD"><RiSwordFill id="damageDDIcon" /></p>
        <p id="csDD"><img id="csDDIcon" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/mask-icon-cs.png'/></p>
        <p id="visionDD"><img id="visionDDIcon" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png'/></p>
      </div>

      <div className="TeamInfoTextDD2">
        <div className="invisDiv" id="invis3"> <p> DEFEAT </p> </div>
        <p id="damageDD"><RiSwordFill id="damageDDIcon" /></p>
        <p id="csDD"><img id="csDDIcon" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/mask-icon-cs.png'/></p>
        <p id="visionDD"><img id="visionDDIcon" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png'/></p>
        <div className="invisDiv" id="invis4"></div>
      </div>

    </div>
  );
};

export default InfoBar;
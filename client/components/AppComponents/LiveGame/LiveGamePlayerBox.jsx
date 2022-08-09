import React from 'react';

const LiveGamePlayerBox = props => {

  const { championId, profileIconId, runes, summonerName, summonerSpells } = props;

  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;

  return (
    <div className="live-game-player">
      
      <div className="lg-div1">
        <img id="lg-champicon" src={championIcon}/>
        {/* <div className="lg-summoner-spells"> */}
          {/* <img id="lg-summoner-spell-1" src={}/> */}
        {/* </div> */}
      </div>

      <p id="lg-summoner-name">{summonerName}</p>

      <div className="lg-div2">
        <img id="lg-rank-icon" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/master.png'/>
      </div>

    </div>
  );
};

export default LiveGamePlayerBox;
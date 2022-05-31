import React from 'react';

const TFTSummonerBox = props => {

  const {  summonerName, summonerIcon } = props;

  return (
    <div>
      <h3>Summoner Information</h3>
      <div className="SummonerInfoBox">
        <div id="SummonerInfo">
          {summonerName ? <img id="summonerIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${summonerIcon}.jpg`}/> : ''}
          <p>{`Name: ${summonerName}`}</p>
        </div>
      </div>
    </div>
  );
};

export default TFTSummonerBox;

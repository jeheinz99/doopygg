import React from 'react';
import { useSelector } from 'react-redux';

const TFTSummonerBox = () => {

  const summonerName = useSelector(state => state.tft.summonerName);
  const summonerIcon = useSelector(state => state.tft.summonerIcon);

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

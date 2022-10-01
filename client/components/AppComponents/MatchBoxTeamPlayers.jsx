import React from 'react';

const MatchBoxTeamPlayers = props => {

  const { summonerName, championId } = props;
  
  return (
    <div className="leftSideGroup">
      <img className="playerChampionIcon" id="player0Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`}/>
      <p>{summonerName}</p>
    </div>
  );
};

export default MatchBoxTeamPlayers;
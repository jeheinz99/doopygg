import React from 'react';
import {searchUser} from '../../../searchUser';

const MatchBoxTeamPlayers = props => {

  const { summonerName, championId } = props;
  
  return (
    <div className="playerGroup">
      <img className="playerChampionIcon" id="player0Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`}/>
      <p onClick={() => searchUser(summonerName)}>{summonerName}</p>
    </div>
  );
};

export default MatchBoxTeamPlayers;
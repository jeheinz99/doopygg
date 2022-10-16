import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const MatchBoxTeamPlayers = props => {

  const { summonerName, championId } = props;
  const regionId = useSelector(state => state.summoners.region);
  const userSummonerName = useSelector(state => state.summoners.summonerName);
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  return (
    <div className="playerGroup">
      <img className="playerChampionIcon" id="player0Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`}/>
      {summonerName === userSummonerName ? 
      <p style={{color: "#ffffffcc"}} onClick={() => setSearchParams({ region: regionId, summonerName: summonerName })}>{summonerName}</p> :
      <p style={{color: "#b8b8b88e"}} onClick={() => setSearchParams({ region: regionId, summonerName: summonerName })}>{summonerName}</p>}
    </div>
  );
};

export default MatchBoxTeamPlayers;
import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const MatchBoxTeamPlayers = props => {

  const { summonerName, championId } = props;
  const regionId = useSelector(state => state.summoners.region);
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  return (
    <div className="playerGroup">
      <img className="playerChampionIcon" id="player0Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`}/>
      <p onClick={() => setSearchParams({ region: regionId, summonerName: summonerName })}>{summonerName}</p>
    </div>
  );
};

export default MatchBoxTeamPlayers;
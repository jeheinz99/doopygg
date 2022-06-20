import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSummonerData } from '../../actions/actions';

const SummonerBox = () => {
  const summonerLevel = useSelector(state => state.summoners.summonerLevel);
  const matchHistory = useSelector(state => state.summoners.matchHistory);
  const summonerRank = useSelector(state => state.summoners.summonerRank);
  const summonerName = useSelector(state => state.summoners.summonerName);
  const update = useDispatch();

  const rank = summonerRank[0];

  return (
  <div className="outerSummonerBox">
    <h3>Summoner Information</h3>
    <button id="summonerUpdateButton" onClick={() => update(updateSummonerData(summonerName))}> Update </button>
    <div className="SummonerInfoBox">
      <div id="SummonerInfo">
        {matchHistory[0] && <img id="summonerIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${matchHistory[0].summonerIcon}.jpg`}/>}
        <p>{`Name: ${summonerName}`}</p>
        <p>{`Level: ${summonerLevel}`}</p>
      </div>
      <div id="summonerRankInfo">
        {summonerRank[0] ? <img id="rankIcon" src={`https://opgg-static.akamaized.net/images/medals_new/${rank.toLowerCase()}.png`}/> : ''}
        {summonerRank[0] ? <p>{`Ranked Solo: ${summonerRank[0]} ${summonerRank[1]} LP`}</p> : ''}
      </div>
    </div>
  </div>
  );
};

export default SummonerBox;
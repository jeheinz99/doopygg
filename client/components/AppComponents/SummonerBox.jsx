import React from 'react';

const SummonerBox = props => {

  const { summonerName, summonerLevel, matchHistory, summonerRank } = props;
  console.log(summonerRank);
  const rank = summonerRank[0];
  
  // const temp = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${rank.toLowerCase()}.png`

  // const temp2 = `https://opgg-static.akamaized.net/images/medals_new/${rank.toLowerCase()}.png`

  return (
  <div>
    <h3>Summoner Information</h3>
    <div className="SummonerInfoBox">
      <div id="SummonerInfo">
        {matchHistory[0] ? <img id="summonerIcon" src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${matchHistory[0].summonerIcon}.jpg`}/> : ''}
        <p>{`Name: ${summonerName}`}</p>
        <p>{`Level: ${summonerLevel}`}</p>
      </div>
      <div id="summonerRankInfo">
        {summonerRank[0] ? <img id="rankIcon" src={`https://opgg-static.akamaized.net/images/medals_new/${rank.toLowerCase()}.png`}/> : ''}
        {summonerRank[0] ? <p>{`Ranked Solo: ${summonerRank[0]} ${summonerRank[1]} LP`}</p> : ''}
      </div>
    </div>
  </div>
  )
}

export default SummonerBox;
import React, { Component } from 'react';
import { connect } from 'react-redux';

const SummonerBox = props => {

  const { summonerName, summonerLevel, matchHistory, summonerRank } = props;
  console.log(summonerRank);
  
  
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
        {summonerRank[0] ? <img id="rankIcon" src={`https://opgg-static.akamaized.net/images/medals_new/grandmaster.png`}/> : ''}
        {summonerRank[0] ? <p>{`Ranked Solo: ${summonerRank[0]} ${summonerRank[1]} LP`}</p> : ''}
      </div>
    </div>
  </div>
  )
}

export default SummonerBox;
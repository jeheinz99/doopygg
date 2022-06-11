import React from 'react';

const Boxes = props => {

  const { id, wins, losses, summonerName, leaguePoints, rank, profileIcon } = props;

  const image = `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${profileIcon}.jpg`
  const winPercent = ((wins / (wins + losses))*100).toFixed(2);
  const ladderNumber = id + 1;
  
  return (
    <div className="OuterLBBox">
      <div className="Matches" id="leaderboardBox">
        <p> #{ladderNumber} </p>
        <img id="profileIcon" src={image}/>
        <p> {summonerName} </p>
        <p> Wins: {wins} </p>
        <p> Losses: {losses} </p>
        <p> {winPercent} % W/L </p>
        <p> {rank} </p>
        <p> {leaguePoints} LP </p>
      </div>
    </div>
  );
};

export default Boxes;
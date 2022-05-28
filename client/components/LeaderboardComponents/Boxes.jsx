import React from 'react';

const Boxes = props => {

  const { wins, losses, summonerName, leaguePoints, rank, profileIcon } = props;

  const image = `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${profileIcon}.jpg`
  const winPercent = ((wins / (wins + losses))*100).toFixed(2);

  return (
    <div className="Matches" id="leaderboardBox">
      <img id="profileIcon" src={image}/>
      <p> {summonerName} </p>
      <p> Wins: {wins} </p>
      <p> Losses: {losses} </p>
      <p> {winPercent} % W/R </p>
      <p> {rank} </p>
      <p> {leaguePoints} LP </p>
    </div>
  );
};

export default Boxes;
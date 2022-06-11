import React from 'react';
import { useSelector } from 'react-redux';
import Boxes from './Boxes.jsx';

const LeaderboardBoxes = () => {

  const leaderboardData = useSelector(state => state.leaderboard.leaderboardData)

  const boxes = [];
  for (let i = 1; i < leaderboardData.length; i++) {
    boxes.push(<Boxes key={i} id={i} profileIcon={leaderboardData[i].profileIcon} wins={leaderboardData[i].wins} losses={leaderboardData[i].losses} leaguePoints={leaderboardData[i].leaguePoints} summonerName={leaderboardData[i].summonerName} rank={leaderboardData[i].summonerRank}/>);
  };

  return (
    <div id="LBBoxes" className="OuterSearchBox">
      <div className="Rank1LBBox">
        <div className="Rank1LB1">
          <p>#1</p>
          <img id="Rank1LBIcon" src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${leaderboardData[0].profileIcon}.jpg`}/>
        </div>
        <div className="Rank1LB2">
          <p>{leaderboardData[0].summonerName}</p>
          <p>{leaderboardData[0].summonerRank}</p>
        </div>
        <div className="Rank1LB3">
          <p> Wins: {leaderboardData[0].wins} </p>
          <p> Losses: {leaderboardData[0].losses} </p>
          <p> {((leaderboardData[0].wins / (leaderboardData[0].wins + leaderboardData[0].losses))*100).toFixed(2)} % W/L </p>
        </div>
        <div className="Rank1LB4">
          <p>{leaderboardData[0].leaguePoints} LP </p>
        </div>
      </div>
      { boxes }
    </div>
  );
};

export default LeaderboardBoxes;
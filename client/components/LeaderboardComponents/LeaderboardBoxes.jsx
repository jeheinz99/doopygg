import React from 'react';
import { useSelector } from 'react-redux';
import Boxes from './Boxes.jsx';

const LeaderboardBoxes = () => {

  const leaderboardData = useSelector(state => state.leaderboard.leaderboardData)

  const boxes = [];
  for (let i = 0; i < leaderboardData.length; i++) {
    boxes.push(<Boxes key={i} id={i} profileIcon={leaderboardData[i].profileIcon} wins={leaderboardData[i].wins} losses={leaderboardData[i].losses} leaguePoints={leaderboardData[i].leaguePoints} summonerName={leaderboardData[i].summonerName} rank={leaderboardData[i].summonerRank}/>);
  };
  return (
    <div id="LBBoxes" className="OuterSearchBox">
      { boxes }
    </div>
  );
};

export default LeaderboardBoxes;
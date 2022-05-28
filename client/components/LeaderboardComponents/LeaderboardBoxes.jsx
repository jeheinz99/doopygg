import React from 'react';
import Boxes from './Boxes.jsx';

const LeaderboardBoxes = props => {

  const { leaderboardData } = props;

  const boxes = [];
  for (let i = 0; i < leaderboardData.length; i++) {
    boxes.push(<Boxes key={i} profileIcon={leaderboardData[i].profileIcon} wins={leaderboardData[i].wins} losses={leaderboardData[i].losses} leaguePoints={leaderboardData[i].losses} summonerName={leaderboardData[i].summonerName} rank={leaderboardData[i].summonerRank}/>);
  }
  return (
    <div id="MatchBoxes" className="OuterSearchBox">
      { boxes }
    </div>
  );
};

export default LeaderboardBoxes;
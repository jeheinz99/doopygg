import React from 'react';
import { useSelector } from 'react-redux';
import Boxes from './Boxes.jsx';

const LeaderboardBoxes = () => {

  const leaderboardData = useSelector(state => state.leaderboard.leaderboardData)

  const boxes = [];
  for (let i = 1; i < leaderboardData.length; i++) {
    boxes.push(<Boxes key={i} id={i} profileIcon={leaderboardData[i].profileIcon} wins={leaderboardData[i].wins} losses={leaderboardData[i].losses} leaguePoints={leaderboardData[i].leaguePoints} summonerName={leaderboardData[i].summonerName} rank={leaderboardData[i].summonerRank}/>);
  };

  const winPercent = ((leaderboardData[0].wins / (leaderboardData[0].wins + leaderboardData[0].losses))*100).toFixed(2);

  return (
    <div id="LBBoxes" className="OuterSearchBox">
      <div className="Rank1LBBox">
        <div className="Rank1LB1">
          <p>#1</p>
          <img id="Rank1LBIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${leaderboardData[0].profileIcon}.jpg`}/>
        </div>
        <div className="Rank1LB2">
          <p>{leaderboardData[0].summonerName}</p>
          <p>{leaderboardData[0].summonerRank}</p>
        </div>
        <div className="Rank1LB3">
          <p> Wins: {leaderboardData[0].wins} </p>
          <p> Losses: {leaderboardData[0].losses} </p>
          {isNaN(winPercent) && <p id="exact100wr"> 100% </p>}
          {!isNaN(winPercent) && winPercent >= 60 && <p id="above60wr"> {winPercent}% </p>}
          {!isNaN(winPercent) && winPercent < 60 && <p id="below60wr"> {winPercent}% </p>}
          <div className="WinLossBar">
            <div className="winBar" style={{width: `${winPercent}%`}}>{leaderboardData[0].wins}W</div>
            <div className="lossBar" style={{width: `${100 - winPercent}%`}}>{leaderboardData[0].losses}L</div>
          </div>
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
import React from 'react';

const Boxes = props => {

  const { id, wins, losses, summonerName, leaguePoints, rank, profileIcon } = props;

  const image = `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${profileIcon}.jpg`
  const winPercent = ((wins / (wins + losses))*100).toFixed(2);
  const ladderNumber = id + 1;
  
  return (
    <div className="OuterLBBox">
      <div className="leaderboardBox">
        <p id="LBRankNumberTag"> #{ladderNumber} </p>
        <img id="profileIcon" src={image}/>
        <p> {summonerName} </p>
        <p> Wins: {wins} </p>
        <p> Losses: {losses} </p>

        <div className="LBBoxDiv">
          {isNaN(winPercent) && <p id="exact100wr"> 100% </p>}
          {!isNaN(winPercent) && winPercent >= 60 && <p id="above60wr"> {winPercent}% </p>}
          {!isNaN(winPercent) && winPercent < 60 && <p id="below60wr"> {winPercent}% </p>}
          <div className="WinLossBar">
            <div className="winBar" style={{width: `${winPercent}%`}}>{wins}W</div>
            <div className="lossBar" style={{width: `${100 - winPercent}%`}}>{losses}L</div>
          </div>
        </div>

        <p> {rank} </p>
        <p> {leaguePoints} LP </p>
      </div>
    </div>
  );
};

export default Boxes;
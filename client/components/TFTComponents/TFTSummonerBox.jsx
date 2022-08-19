import React from 'react';
import { useSelector } from 'react-redux';
import TFTSummonerBoxes from './TFTSummonerBoxes';

const TFTSummonerBox = () => {

  const summonerName = useSelector(state => state.tft.summonerName);
  const summonerIcon = useSelector(state => state.tft.summonerIcon);
  const summonerRank = useSelector(state => state.tft.summonerRank);
  const allMatchesPlayedData = useSelector(state => state.tft.allMatchesPlayedData);

  const getMatchesData = () => {
    let played = 0;
    let avgPlacement = 0;
    let top4 = 0;
    let wins = 0;

    for (let i = 0; i < allMatchesPlayedData.length; i++) {
      for (let j = 0; j < allMatchesPlayedData[i].length; j++) {
        if (allMatchesPlayedData[i][j].placement === 1) {
          top4++;
          wins++;
          avgPlacement += allMatchesPlayedData[i][j].placement;
          played++;
        }
        else if (allMatchesPlayedData[i][j].placement <= 4) {
          top4++;
          avgPlacement += allMatchesPlayedData[i][j].placement;
          played++;
        }
        else {
          avgPlacement += allMatchesPlayedData[i][j].placement;
          played++;
        }
      }
    }

    avgPlacement = (avgPlacement / played).toFixed(1);

    return {
      played: played,
      top4: top4,
      wins: wins,
      avg: avgPlacement,
    };
  };

  const matchesData = getMatchesData();

  const winPercent = ((matchesData.wins / matchesData.played)*100).toFixed(1);
  const top4Percent = ((matchesData.top4 / matchesData.played)*100).toFixed(1);

  const boxNames = ['Played', 'Wins', 'Top4s', 'Avg.', 'Win%', 'Top4%'];
  const boxValues = [matchesData.played, matchesData.wins, matchesData.top4, matchesData.avg, `${winPercent}%`, `${top4Percent}%`];
  const boxPercents = [100, winPercent, top4Percent, 100, winPercent, top4Percent];
  const left3 = [];
  const right3 = [];
  for (let i = 0; i < boxNames.length; i++) {
    (left3.length < 3 ? left3.push(
      <TFTSummonerBoxes 
      key={`box-${boxNames[i]}-i`} 
      name={boxNames[i]}
      value={boxValues[i]}
      percent={boxPercents[i]}/>)
    : right3.push(
      <TFTSummonerBoxes 
      key={`box-${boxNames[i]}-i`} 
      name={boxNames[i]}
      value={boxValues[i]}
      percent={boxPercents[i]}/>)
    );

  }
  
  return (
    <div className="SummonerInfoBox" id="TFTSummonerInfoBox">

      <div className="SummonerInfo" id="TFT-SI">
        {summonerName ? <img id="summonerIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${summonerIcon}.jpg`}/> : ''}
        <p>{summonerName}</p>
      </div>

      <div className="SummonerRankInfo" id="TFTRankInfo">
        <div className="TFTRankedSolo">
          <h2> Ranked Solo </h2>
          <div className="rankBorderDiv"><img id="unrankedIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${summonerRank.rankedSolo[0].toLowerCase()}.png`}/></div>
          <p>{`${summonerRank.rankedSolo[0]} ${summonerRank.rankedSolo[2]} ${summonerRank.rankedSolo[1]} LP`}</p>
        </div>

        <div className="TFTDoubleUp">
          <h2> Double Up </h2>
          {summonerRank.doubleUp[1] === undefined && <div className="rankBorderDiv"><img id="unrankedIcon" src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/unranked.png"/></div>}
          {summonerRank.doubleUp[1] === undefined && <p> Unranked </p>}
          {summonerRank.doubleUp[1] && <div className="rankBorderDiv"><img id="unrankedIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${summonerRank.doubleUp[0].toLowerCase()}.png`}/></div>}
          {summonerRank.doubleUp[1] && <p>{`${summonerRank.doubleUp[0]} ${summonerRank.doubleUp[2]} ${summonerRank.doubleUp[1]} LP`}</p>}
        </div>
      </div>

      <div className="RankedMatchesInfo">
        <div className="tft-ranked-half">
          {left3}
        </div>
        <div className="tft-ranked-half">
          {right3}
        </div>
      </div>


    </div>
  );
};

export default TFTSummonerBox;

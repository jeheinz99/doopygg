import React, { useState } from "react";
import { useSelector } from "react-redux";
import SummonerChampDataBoxEntry from "./SummonerChampDataBoxEntry";

import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';

const SummonerChampDataBox = () => {

  const summonerRank = useSelector(state => state.summoners.summonerRank);
  const summonerLevel = useSelector(state => state.summoners.summonerLevel);
  const summonerName = useSelector(state => state.summoners.summonerName);
  const allMatchesPlayedData = useSelector(state => state.summoners.allMatchesPlayedData);
  const matchHistory = useSelector(state => state.summoners.matchHistory);
  
  const orderData = data => {

    const tempArr = [];

    for (let i in data) {
      tempArr.push(data[i]);
    }
    
    tempArr.sort((a, b) => {
      return ((b.played - a.played) === 0 ? (((b.kills + b.assists) / b.deaths) - ((a.kills + a.assists) / a.deaths)) : b.played - a.played);
    });

    return {
      top5Played: [tempArr[0], tempArr[1], tempArr[2], tempArr[3], tempArr[4]],
      allPlayed: tempArr,
    };
  };

  const champData = {};

  for (let i = 0; i < allMatchesPlayedData.length; i++) {
    for (let j = 0; j < allMatchesPlayedData[i].length; j++) {
      if (allMatchesPlayedData[i] !== undefined) {
        if (champData[allMatchesPlayedData[i][j].championName] && champData) {
          champData[allMatchesPlayedData[i][j].championName].kills += allMatchesPlayedData[i][j].kills;
          champData[allMatchesPlayedData[i][j].championName].deaths += allMatchesPlayedData[i][j].deaths;
          champData[allMatchesPlayedData[i][j].championName].assists += allMatchesPlayedData[i][j].assists;
          champData[allMatchesPlayedData[i][j].championName].champDamage += allMatchesPlayedData[i][j].champDamage;
          champData[allMatchesPlayedData[i][j].championName].cs += allMatchesPlayedData[i][j].cs;
          champData[allMatchesPlayedData[i][j].championName].positions[allMatchesPlayedData[i][j].position] += 1;
          champData[allMatchesPlayedData[i][j].championName].played += 1;
  
          (allMatchesPlayedData[i][j].win === true ? champData[allMatchesPlayedData[i][j].championName].win += 1 : champData[allMatchesPlayedData[i][j].championName].loss += 1);
  
        }
  
        else {
          const newObj = {};
  
          newObj.championName = allMatchesPlayedData[i][j].championName;
          newObj.championId = allMatchesPlayedData[i][j].championId;
          newObj.kills = allMatchesPlayedData[i][j].kills;
          newObj.deaths = allMatchesPlayedData[i][j].deaths;
          newObj.assists = allMatchesPlayedData[i][j].assists;
          newObj.champDamage = allMatchesPlayedData[i][j].champDamage;
          newObj.cs = allMatchesPlayedData[i][j].cs;
          newObj.played = 1;
  
          newObj.positions = {'TOP': 0, 'JUNGLE': 0, 'MIDDLE': 0, 'BOTTOM': 0, 'UTILITY': 0, '': 0, 'Invalid': 0};
          newObj.positions[allMatchesPlayedData[i][j].position] = 1;
  
          if (allMatchesPlayedData[i][j].win === true) {
            newObj.win = 1;
            newObj.loss = 0;
          }
  
          else {
            newObj.win = 0;
            newObj.loss = 1;
          }
          
          champData[allMatchesPlayedData[i][j].championName] = newObj;
        }
      }
    }
  }

  const orderedData = orderData(champData);

  const champEntries = [];
  for (let i = 0; i < orderedData.top5Played.length; i++) {
    if (orderedData.top5Played[i] !== undefined) {
      champEntries.push(<SummonerChampDataBoxEntry
      key={`top5-champ-entry-${i}`}
      championId={orderedData.top5Played[i].championId}
      id={orderedData.top5Played[i].championName}
      kills={orderedData.top5Played[i].kills}
      deaths={orderedData.top5Played[i].deaths}
      assists={orderedData.top5Played[i].assists}
      played={orderedData.top5Played[i].played}
      win={orderedData.top5Played[i].win}
      loss={orderedData.top5Played[i].loss}
      />);
    }
  }

  const allChampEntries = [];
  for (let i = 0; i < orderedData.allPlayed.length; i++) {
    if (orderedData.allPlayed[i] !== undefined) {
    allChampEntries.push(<SummonerChampDataBoxEntry
      key={`champ-entry-${i}`}
      championId={orderedData.allPlayed[i].championId}
      id={orderedData.allPlayed[i].championName}
      kills={orderedData.allPlayed[i].kills}
      deaths={orderedData.allPlayed[i].deaths}
      assists={orderedData.allPlayed[i].assists}
      played={orderedData.allPlayed[i].played}
      win={orderedData.allPlayed[i].win}
      loss={orderedData.allPlayed[i].loss}
      />);
    }
  }

  const [ open, setOpen ] = useState(false);

  return (
    <div className="outerSummonerDataBox">

      <div className="SummonerInfoBox">

        <div className="SummonerInfo">
          <img id="summonerIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${matchHistory[0].summonerIcon}.jpg`}/>
          <div className="summonerInfoPtags">
            <p>Name: {summonerName}</p>
            <p>Level {summonerLevel}</p>
          </div>
        </div>

        <div className="SummonerRankInfo">

          <div className="RankedSoloDuo">
            <h2> Ranked Solo/Duo </h2>
            {summonerRank.rankedSolo[0] === undefined && <div className="rankBorderDiv"><img id="rankIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/unranked.png`}/></div>}
            {summonerRank.rankedSolo[0] === undefined && <p> Unranked </p>}
            {summonerRank.rankedSolo[0] && <div className="rankBorderDiv"><img id="rankIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${summonerRank.rankedSolo[0].toLowerCase()}.png`}/></div>}
            {summonerRank.rankedSolo[0] && <p>{`${summonerRank.rankedSolo[0]} ${summonerRank.rankedSolo[2]} ${summonerRank.rankedSolo[1]} LP`}</p>}
          </div>

          <div className="RankedFlex">
            <h2> Ranked Flex </h2>
            {summonerRank.rankedFlex[0] === undefined && <div className="rankBorderDiv"><img id="rankIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/unranked.png`}/></div>}
            {summonerRank.rankedFlex[0] === undefined && <p> Unranked </p>}
            {summonerRank.rankedFlex[0] && <div className="rankBorderDiv"><img id="rankIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${summonerRank.rankedFlex[0].toLowerCase()}.png`}/></div>}
            {summonerRank.rankedFlex[0] && <p>{`${summonerRank.rankedFlex[0]} ${summonerRank.rankedFlex[2]} ${summonerRank.rankedFlex[1]} LP`}</p>}
          </div>

        </div>

      </div>
    
      <div className="DataBoxHeader">
        <h3> Most Played </h3>
        <p id="rankedsoloheader"> Ranked Solo </p>
      </div>
      
      {!open && <div className="SummonerDataBoxEntries" id="topEntries">
        {champEntries}
      </div>}
      {open && <div className="SummonerDataBoxEntries" id="allEntries">
        {allChampEntries}
      </div>}
    
      {!open && <button className="SummonerDataBoxButton" id="SDBexpand" onClick={ () => setOpen(!open) }><AiFillCaretDown /></button>}
      {open && <button className="SummonerDataBoxButton" id="SDBcontract" onClick={ () => setOpen(!open) }><AiFillCaretUp /></button>}

    </div>
  );
};

export default SummonerChampDataBox;
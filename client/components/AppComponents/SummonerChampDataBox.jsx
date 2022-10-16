import React, { useState } from "react";
import { useSelector } from "react-redux";
import SummonerChampDataBoxEntry from "./SummonerChampDataBoxEntry";
import Recent20PlayedWith from "./RecentMatches/Recent20PlayedWith.jsx";

import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';

const SummonerChampDataBox = () => {

  const summonerRank = useSelector(state => state.summoners.summonerRank);
  const summonerLevel = useSelector(state => state.summoners.summonerLevel);
  const summonerName = useSelector(state => state.summoners.summonerName);
  const summonerIcon = useSelector(state => state.summoners.profileIconId);
  const allMatchesPlayedData = useSelector(state => state.summoners.allMatchesPlayedData);
  const matchHistory = useSelector(state => state.summoners.matchHistory);

  const [ open, setOpen ] = useState(false);
  
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
    if (allMatchesPlayedData[i] !== undefined) {
      if (champData[allMatchesPlayedData[i].championName] && champData) {
        champData[allMatchesPlayedData[i].championName].kills += allMatchesPlayedData[i].kills;
        champData[allMatchesPlayedData[i].championName].deaths += allMatchesPlayedData[i].deaths;
        champData[allMatchesPlayedData[i].championName].assists += allMatchesPlayedData[i].assists;
        champData[allMatchesPlayedData[i].championName].champDamage += allMatchesPlayedData[i].champDamage;
        champData[allMatchesPlayedData[i].championName].cs += allMatchesPlayedData[i].cs;
        champData[allMatchesPlayedData[i].championName].positions[allMatchesPlayedData[i].position] += 1;
        champData[allMatchesPlayedData[i].championName].played += 1;

        (allMatchesPlayedData[i].win === true ? champData[allMatchesPlayedData[i].championName].win += 1 : champData[allMatchesPlayedData[i].championName].loss += 1);

      }

      else {
        const newObj = {};

        newObj.championName = allMatchesPlayedData[i].championName;
        newObj.championId = allMatchesPlayedData[i].championId;
        newObj.kills = allMatchesPlayedData[i].kills;
        newObj.deaths = allMatchesPlayedData[i].deaths;
        newObj.assists = allMatchesPlayedData[i].assists;
        newObj.champDamage = allMatchesPlayedData[i].champDamage;
        newObj.cs = allMatchesPlayedData[i].cs;
        newObj.played = 1;

        newObj.positions = {'TOP': 0, 'JUNGLE': 0, 'MIDDLE': 0, 'BOTTOM': 0, 'UTILITY': 0, '': 0, 'Invalid': 0};
        newObj.positions[allMatchesPlayedData[i].position] = 1;

        if (allMatchesPlayedData[i].win === true) {
          newObj.win = 1;
          newObj.loss = 0;
        }

        else {
          newObj.win = 0;
          newObj.loss = 1;
        }
        
        champData[allMatchesPlayedData[i].championName] = newObj;
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

  const rankedSoloWinPercent = ((summonerRank.rankedSolo[3] / (summonerRank.rankedSolo[3] + summonerRank.rankedSolo[4]))*100).toFixed(0);
  const rankedFlexWinPercent = ((summonerRank.rankedFlex[3] / (summonerRank.rankedFlex[3] + summonerRank.rankedFlex[4]))*100).toFixed(0);

  return (
    <div className="test-one">
      <div className="test-two">
        <div className="SummonerInfoBox">
          <div className="SummonerInfo">
            <div className="SummonerIcon-Level">
              <img id="summonerIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${summonerIcon}.jpg`}/>
              <div className="level-div" id="summoner-level-div">{summonerLevel}</div>
            </div>
            <div className="summonerInfoPtags">
              <p>{summonerName}</p>
            </div>
          </div>

          <div className="SummonerRankInfo">

            <div className="RankedSoloDuo">
              <div className="queue-and-rankicon">
                <h2> Ranked Solo </h2>
                {summonerRank.rankedSolo[0] === undefined && <img id="rankIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/unranked.png`}/>}
                {summonerRank.rankedSolo[0] && <img id="rankIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${summonerRank.rankedSolo[0].toLowerCase()}.png`}/>}
                {summonerRank.rankedSolo[0] && <p>{summonerRank.rankedSolo[0]} {summonerRank.rankedSolo[2]} {summonerRank.rankedSolo[1]} LP</p>}
                {summonerRank.rankedSolo[0] === undefined && <p> Unranked </p>}
              </div>
              {summonerRank.rankedSolo[0] &&
              <div className="ranked-win-bar-div">
                <p>{summonerRank.rankedSolo[3]}W - {summonerRank.rankedSolo[4]}L <span>{`(${rankedSoloWinPercent}%)`}</span></p>
                <div className="WinLossBar" id="ranked-winbar">
                  <div className="winBar" id="ranked-win-winbar" style={{width: `${rankedSoloWinPercent}%`}}/>
                  <div className="lossBar" id="ranked-loss-winbar" style={{width: `${100 - rankedSoloWinPercent}%`}}/>
                </div>
              </div>}
              
            </div>

            <div className="RankedFlex">
              <div className="queue-and-rankicon">
                <h2> Ranked Flex </h2>
                {summonerRank.rankedFlex[0] === undefined && <img id="rankIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/unranked.png`}/>}
                {summonerRank.rankedFlex[0] && <img id="rankIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${summonerRank.rankedFlex[0].toLowerCase()}.png`}/>}
                {summonerRank.rankedFlex[0] && <p>{summonerRank.rankedFlex[0]} {summonerRank.rankedFlex[2]} {summonerRank.rankedFlex[1]} LP</p>}
                {summonerRank.rankedFlex[0] === undefined && <p> Unranked </p>}
              </div>

              {summonerRank.rankedFlex[0] &&
              <div className="ranked-win-bar-div">
                <p>{summonerRank.rankedFlex[3]}W - {summonerRank.rankedFlex[4]}L <span>{`(${rankedFlexWinPercent}%)`}</span></p>
                <div className="WinLossBar" id="ranked-winbar">
                  <div className="winBar" id="ranked-win-winbar" style={{width: `${rankedFlexWinPercent}%`}}/>
                  <div className="lossBar" id="ranked-loss-winbar" style={{width: `${100 - rankedFlexWinPercent}%`}}/>
                </div>
              </div>}

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
    <Recent20PlayedWith />
  </div>
  );
};

export default SummonerChampDataBox;
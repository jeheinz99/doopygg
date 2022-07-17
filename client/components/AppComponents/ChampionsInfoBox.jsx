import React from 'react';
import { useSelector } from "react-redux";
import ChampionsInfoBoxEntry from './ChampionsInfoBoxEntry.jsx';

const ChampionsInfoBox = () => {
  const summonerName = useSelector(state => state.summoners.summonerName);
  const summonerLevel = useSelector(state => state.summoners.summonerLevel);
  const profileIconId = useSelector(state => state.summoners.profileIconId);
  const allMatchesPlayedData = useSelector(state => state.summoners.allMatchesPlayedData);
  
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
          champData[allMatchesPlayedData[i][j].championName].gold += allMatchesPlayedData[i][j].gold;
          champData[allMatchesPlayedData[i][j].championName].csPerMin += allMatchesPlayedData[i][j].csPerMin;
          champData[allMatchesPlayedData[i][j].championName].positions[allMatchesPlayedData[i][j].position] += 1;
          champData[allMatchesPlayedData[i][j].championName].played += 1;
  
          (allMatchesPlayedData[i][j].win === true ? champData[allMatchesPlayedData[i][j].championName].win += 1 : champData[allMatchesPlayedData[i][j].championName].loss += 1);
  
        }
  
        else {
          const newObj = {};
  
          newObj.championName = allMatchesPlayedData[i][j].championName;
          newObj.championId = allMatchesPlayedData[i][j].championId;
          newObj.kills = allMatchesPlayedData[i][j].kills;
          newObj.gold = allMatchesPlayedData[i][j].gold;
          newObj.deaths = allMatchesPlayedData[i][j].deaths;
          newObj.assists = allMatchesPlayedData[i][j].assists;
          newObj.champDamage = allMatchesPlayedData[i][j].champDamage;
          newObj.cs = allMatchesPlayedData[i][j].cs;
          newObj.csPerMin = allMatchesPlayedData[i][j].csPerMin;
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

  const allChampEntries = [];
  for (let i = 0; i < orderedData.allPlayed.length; i++) {
    if (orderedData.allPlayed[i] !== undefined) {
    allChampEntries.push(<ChampionsInfoBoxEntry
      key={`champions-champ-entry-${i}`}
      championId={orderedData.allPlayed[i].championId}
      id={orderedData.allPlayed[i].championName}
      kills={orderedData.allPlayed[i].kills}
      deaths={orderedData.allPlayed[i].deaths}
      assists={orderedData.allPlayed[i].assists}
      played={orderedData.allPlayed[i].played}
      win={orderedData.allPlayed[i].win}
      loss={orderedData.allPlayed[i].loss}
      cs={orderedData.allPlayed[i].cs}
      csPerMin={orderedData.allPlayed[i].csPerMin}
      champDamage={orderedData.allPlayed[i].champDamage}
      gold={orderedData.allPlayed[i].gold}
      />);
    }
  }

  const profileIcon = `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${profileIconId}.jpg`;

  return (
    <div className="ChampionsInfoBox">
      <div className="ci-header">
        <div className="ci-summoner-info">

          <img id="ci-profile-icon" src={profileIcon}/>

          <div className="ci-name-level">
            <p> {summonerName} </p>
            <p> Level: {summonerLevel} </p>
          </div>

          <h3> Ranked Solo S12 </h3>

        </div>
      </div>

      <ul>
        <li id="ci-champion"><p>Champion</p></li>
        <li id="ci-played"><p>Played</p></li>
        <li id="ci-kda"><p>KDA</p></li>
        <li id="ci-gold"><p>Gold</p></li>
        <li id="ci-cs"><p>CS</p></li>
        <li id="ci-damage"><p>Damage Dealt</p></li>
      </ul>
      {allChampEntries}
    </div>
  );
};

export default ChampionsInfoBox;
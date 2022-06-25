import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SummonerChampDataBoxEntry from "./SummonerChampDataBoxEntry";

const SummonerChampDataBox = () => {

  const summonerName = useSelector(state => state.summoners.summonerName);
  const allMatchesPlayedData = useSelector(state => state.summoners.allMatchesPlayedData);

  const champData = {};
  for (let i = 0; i < allMatchesPlayedData.length; i++) {
    for (let j = 0; j < allMatchesPlayedData[i].length; j++) {

      if (champData[allMatchesPlayedData[i][j].championName]) {
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

  const findTop5 = data => {

    const tempArr = [];

    for (let i in data) {
      tempArr.push(data[i]);
    }
    
    tempArr.sort((a, b) => {
      return ((b.played - a.played) === 0 ? (((b.kills + b.assists) / b.deaths) - ((a.kills + a.assists) / a.deaths)) : b.played - a.played);
    });

    return [tempArr[0], tempArr[1], tempArr[2], tempArr[3], tempArr[4]];
  };

  const top5Played = findTop5(champData);

  const champEntries = [];
  for (let i = 0; i < top5Played.length; i++) {
    champEntries.push(<SummonerChampDataBoxEntry
    key={`champ-entry-${i}`}
    championId={top5Played[i].championId}
    id={top5Played[i].championName}
    kills={top5Played[i].kills}
    deaths={top5Played[i].deaths}
    assists={top5Played[i].assists}
    played={top5Played[i].played}
    win={top5Played[i].win}
    loss={top5Played[i].loss}
    cs={top5Played[i].cs}
    champDamage={top5Played[i].champDamage}
    />);
  }


  return (
    <div className="outerSummonerDataBox">
      <div className="DataBoxHeader">
        <h3> Most Played </h3>
        <p id="rankedsoloheader"> Ranked Solo </p>
      </div>
      <div className="SummonerDataBoxEntries">
        {champEntries}
      </div>
      
    </div>
  );
};

export default SummonerChampDataBox;
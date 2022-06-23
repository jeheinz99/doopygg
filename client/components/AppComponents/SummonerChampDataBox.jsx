import React from "react";
import { useSelector } from "react-redux";

const SummonerChampDataBox = () => {

  const summonerName = useSelector(state => state.summoners.summonerName);
  const allMatchesPlayed = useSelector(state => state.summoners.allMatchesPlayed);

  const getMatchData = matchId => {

    for (let i = 0; i < matchId.participants.length; i++) {
      if (matchId.participants[i].summonerName === summonerName) {
        const player = matchId.participants[i];
        
        const outputObj = {
            name: player.championName,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            win: player.win,
            cs: player.totalMinionsKilled,
            damage: player.totalDamageDealtToChampions,
            gold: player.goldEarned,
        };
        return outputObj;
      }
    }
  };

  const dataArr = [];
  
  const result = allMatchesPlayed.map(matchId => getMatchData(matchId.matchData));
  console.log(result);
  dataArr.push(result);
  
  console.log(dataArr, 'dataArr after looping');

  return (
    <div className="testdiv">
      test
    </div>
  );
};

export default SummonerChampDataBox;
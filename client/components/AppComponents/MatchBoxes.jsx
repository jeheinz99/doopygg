import React from 'react';
import Matches from './Matches.jsx';
import Recent20StatsBox from './RecentMatches/Recent20StatsBox.jsx';
import { useSelector } from 'react-redux';

const MatchBoxes = () => {

  const matchHistory = useSelector(state => state.summoners.matchHistory);
  const otherPlayersMatches = useSelector(state => state.summoners.otherPlayersMatches);

  /* there are only 10 players per match, the 'otherPlayersMatches' players are in order by match played in,
  this function will split 10 players for each match based on the amount of matches that were queried
  (i.e. if 20 matches are queried, splits 10 players to each match box component) */
  const chunkArr = [];
  const chunkSize = (otherPlayersMatches.length / matchHistory.length);
  for (let i = 0; i < otherPlayersMatches.length; i+= chunkSize) {
    const chunk = otherPlayersMatches.slice(i, i + chunkSize);
    chunkArr.push(chunk);
  }
  
  const recent20Data = {};
  const matchList = [];
  for (let i = 0; i < matchHistory.length; i++) {
    if (matchHistory[i].win) {
      matchList.push(<Matches 
        id="winMatch" 
        outcome={'Victory'} 
        key={`match-${i}`}
        matchNum={`matchBox-${i}`}
        matchId={matchHistory[i].matchId}
        otherPlayers={chunkArr[i]}
        visionScore={matchHistory[i].visionScore} 
        summonerSpells={matchHistory[i].summonerSpells} 
        items={matchHistory[i].items} 
        cs={matchHistory[i].cs} 
        champDamage={matchHistory[i].champDamage} 
        champLevel={matchHistory[i].champLevel} 
        runes={matchHistory[i].runes} 
        kills={matchHistory[i].kills} 
        deaths={matchHistory[i].deaths} 
        assists={matchHistory[i].assists} 
        win={matchHistory[i].win} 
        matchLength={matchHistory[i].matchLength} 
        champion={matchHistory[i].champion} 
        gameMode={matchHistory[i].gameMode} 
        championId={matchHistory[i].championId}
        gameEnd={matchHistory[i].gameEnd}/>
        );
    }

    else {
      matchList.push(<Matches 
        id="loseMatch" 
        outcome={'Defeat'} 
        key={`match-${i}`}
        matchNum={`matchBox-${i}`}
        matchId={matchHistory[i].matchId}
        otherPlayers={chunkArr[i]} 
        visionScore={matchHistory[i].visionScore} 
        summonerSpells={matchHistory[i].summonerSpells} 
        items={matchHistory[i].items} 
        cs={matchHistory[i].cs} 
        champDamage={matchHistory[i].champDamage} 
        champLevel={matchHistory[i].champLevel} 
        runes={matchHistory[i].runes} 
        kills={matchHistory[i].kills} 
        deaths={matchHistory[i].deaths} 
        assists={matchHistory[i].assists} 
        win={matchHistory[i].win} 
        matchLength={matchHistory[i].matchLength} 
        champion={matchHistory[i].champion} 
        gameMode={matchHistory[i].gameMode} 
        championId={matchHistory[i].championId}
        gameEnd={matchHistory[i].gameEnd}/>);
    }
    
    if (recent20Data[matchHistory[i].champion]) {
      recent20Data[matchHistory[i].champion].kills += matchHistory[i].kills;
      recent20Data[matchHistory[i].champion].deaths += matchHistory[i].deaths;
      recent20Data[matchHistory[i].champion].assists += matchHistory[i].assists;
      recent20Data[matchHistory[i].champion].champDamage += matchHistory[i].champDamage;
      recent20Data[matchHistory[i].champion].cs += matchHistory[i].cs;
      recent20Data[matchHistory[i].champion].played += 1;
      recent20Data[matchHistory[i].champion].positions[matchHistory[i].position] += 1;
      
      (matchHistory[i].win === true ? recent20Data[matchHistory[i].champion].win +=1 : recent20Data[matchHistory[i].champion].loss +=1);

    }

    else {
      const newObj = {};
      
      newObj.championName = matchHistory[i].champion;
      newObj.championId = matchHistory[i].championId;
      newObj.kills = matchHistory[i].kills;
      newObj.deaths = matchHistory[i].deaths;
      newObj.assists = matchHistory[i].assists;
      newObj.champDamage = matchHistory[i].champDamage;
      newObj.cs = matchHistory[i].cs;
      newObj.played = 1;
      
      newObj.positions = {'TOP': 0, 'JUNGLE': 0, 'MIDDLE': 0, 'BOTTOM': 0, 'UTILITY': 0, '': 0, 'Invalid': 0};
      newObj.positions[matchHistory[i].position] = 1;

      if (matchHistory[i].win === true) {
        newObj.win = 1;
        newObj.loss = 0;
      }

      else {
        newObj.win = 0;
        newObj.loss = 1;
      }

      recent20Data[matchHistory[i].champion] = newObj;
    }
  }

  return (
    <div id="MatchBoxes" className="OuterSearchBox">
      <h4>Match History</h4>
      <Recent20StatsBox recent20Data={recent20Data}/>
      { matchList }
    </div>
  );
};

export default MatchBoxes;
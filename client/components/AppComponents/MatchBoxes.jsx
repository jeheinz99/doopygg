import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { BiChevronDown } from 'react-icons/bi';
import { expandSummMatchHistory } from '../../actions/actions.js';
import Recent20StatsBox from './RecentMatches/Recent20StatsBox.jsx';
import Matches from './Matches.jsx';
import CustomSelect from './CustomSelect.jsx';

const MatchBoxes = () => {

  const matchHistory = useSelector(state => state.summoners.matchHistory);
  const otherPlayersMatches = useSelector(state => state.summoners.otherPlayersMatches);
  const summonerName = useSelector(state => state.summoners.summonerName);
  const region = useSelector(state => state.summoners.region);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const expandHistory = async () => {
    setLoading(true);
    await dispatch(expandSummMatchHistory(summonerName, matchHistory.length, region));
    setLoading(false);
  };

  /* Function to group players based on Match Id */
  const groupByMatchId = players => {
    return players.reduce((acc, player) => {
      const existingGroup = acc.find((group) => group[0]?.matchId === player.matchId);
      if (existingGroup) {
        existingGroup.push(player);
      } else {
        acc.push([player]);
      }
      return acc;
    }, []);
  };
  const sortedPlayers = groupByMatchId(otherPlayersMatches);
  
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
        otherPlayers={sortedPlayers[i]}
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
        otherPlayers={sortedPlayers[i]} 
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
      <h3>Recent 20 Matches</h3>
      <CustomSelect id={'gametype-select-btn'} selectType={'gameTypes'} init={'All'}/>
      <Recent20StatsBox recent20Data={recent20Data}/>
      
      { matchList }

      {loading ? 
      <button id="match-history-expand-btn">
        <PulseLoader id="pulse-expand-load" color="#c9c9c9" size={10} speedMultiplier={0.6}/>
      </button>
      : 
      <button id="match-history-expand-btn" onClick={() => expandHistory()}><BiChevronDown size={25}/></button>}

    </div>
  );
};

export default MatchBoxes;
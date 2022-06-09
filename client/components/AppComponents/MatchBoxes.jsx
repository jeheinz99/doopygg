import React from 'react';
import Matches from './Boxes.jsx';
import { useSelector } from 'react-redux';

const MatchBoxes = () => {

  const matchHistory = useSelector(state => state.summoners.matchHistory);
  const otherPlayersMatches = useSelector(state => state.summoners.otherPlayersMatches);

  const chunkArr = [];
  console.log(otherPlayersMatches)
  const chunkSize = (otherPlayersMatches.length / 5);
  for (let i = 0; i < otherPlayersMatches.length; i+= chunkSize) {
    const chunk = otherPlayersMatches.slice(i, i + chunkSize);
    chunkArr.push(chunk);
  }

  const matchList = [];
  for (let i = 0; i < matchHistory.length; i++) {
    if (matchHistory[i].win){
    matchList.push(<Matches id="winMatch" outcome={'Victory'} key={i} otherPlayers={chunkArr[i]} visionScore={matchHistory[i].visionScore} summonerSpells={matchHistory[i].summonerSpells} items={matchHistory[i].items} cs={matchHistory[i].cs} champDamage={matchHistory[i].champDamage} champLevel={matchHistory[i].champLevel} runes={matchHistory[i].runes} kills={matchHistory[i].kills} deaths={matchHistory[i].deaths} assists={matchHistory[i].assists} win={matchHistory[i].win} matchLength={matchHistory[i].matchLength} champion={matchHistory[i].champion} gameMode={matchHistory[i].gameMode} championId={matchHistory[i].championId} />);
  }
    else matchList.push(<Matches id="loseMatch" outcome={'Defeat'} key={i} otherPlayers={chunkArr[i]} visionScore={matchHistory[i].visionScore} summonerSpells={matchHistory[i].summonerSpells} items={matchHistory[i].items} cs={matchHistory[i].cs} champDamage={matchHistory[i].champDamage} champLevel={matchHistory[i].champLevel} runes={matchHistory[i].runes} kills={matchHistory[i].kills} deaths={matchHistory[i].deaths} assists={matchHistory[i].assists} win={matchHistory[i].win} matchLength={matchHistory[i].matchLength} champion={matchHistory[i].champion} gameMode={matchHistory[i].gameMode} championId={matchHistory[i].championId} />);
  };

  return (
    <div id="MatchBoxes" className="OuterSearchBox">
      <h4>Match History</h4>
      { matchList }
    </div>
  );
};

export default MatchBoxes;
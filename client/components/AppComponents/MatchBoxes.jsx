import React from 'react';
import Matches from './Boxes';

const MatchBoxes = props => {

  const { matchHistory } = props;

  const matchList = [];
  for (let i = 0; i < matchHistory.length; i++) {
    if (matchHistory[i].win){
    matchList.push(<Matches id="winMatch" key={i} kills={matchHistory[i].kills} deaths={matchHistory[i].deaths} assists={matchHistory[i].assists} win={matchHistory[i].win} matchLength={matchHistory[i].matchLength} champion={matchHistory[i].champion} gameMode={matchHistory[i].gameMode} championId={matchHistory[i].championId}/>);
  }
    else matchList.push(<Matches id="loseMatch" key={i} kills={matchHistory[i].kills} deaths={matchHistory[i].deaths} assists={matchHistory[i].assists} win={matchHistory[i].win} matchLength={matchHistory[i].matchLength} champion={matchHistory[i].champion} gameMode={matchHistory[i].gameMode} championId={matchHistory[i].championId}/>);
  };

  return (
    <div id="MatchBoxes" className="OuterSearchBox">
      <h4>Match History</h4>
      { matchList }
    </div>
  );
};

export default MatchBoxes;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Matches from './Boxes';

const MatchBoxes = props => {

  const { matchHistory } = props;
  // console.log(matchHistory);

  const matchList = [];
  for (let i = 0; i < matchHistory.length; i++) {
    if (matchHistory[i].win){
    matchList.push(<Matches className="winMatch" key={i} kills={matchHistory[i].kills} deaths={matchHistory[i].deaths} assists={matchHistory[i].assists} win={matchHistory[i].win} matchLength={matchHistory[i].matchLength} champion={matchHistory[i].champion} gameMode={matchHistory[i].gameMode}/>);
  }
    else matchList.push(<Matches className="loseMatch" key={i} kills={matchHistory[i].kills} deaths={matchHistory[i].deaths} assists={matchHistory[i].assists} win={matchHistory[i].win} matchLength={matchHistory[i].matchLength} champion={matchHistory[i].champion} gameMode={matchHistory[i].gameMode}/>);
  };
  
  console.log(matchList);

  return (
    <div className="OuterSearchBox">
      <h4>Match History</h4>
      { matchList }
    </div>
  );
};

export default MatchBoxes;
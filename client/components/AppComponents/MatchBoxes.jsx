import React from 'react';
import Matches from './Boxes.jsx';
import { useSelector } from 'react-redux';

const MatchBoxes = () => {

  const matchHistory = useSelector(state => state.summoners.matchHistory);

  const matchList = [];
  for (let i = 0; i < matchHistory.length; i++) {
    if (matchHistory[i].win){
    matchList.push(<Matches id="winMatch" outcome={'Victory'} key={i} secondaryRuneTree={matchHistory[i].secondaryRuneTree} keystone={matchHistory[i].keystone} statShardOffense={matchHistory[i].statShardOffense} statShardFlex={matchHistory[i].statShardFlex} statShardDefense={matchHistory[i].statShardDefense} kills={matchHistory[i].kills} deaths={matchHistory[i].deaths} assists={matchHistory[i].assists} win={matchHistory[i].win} matchLength={matchHistory[i].matchLength} champion={matchHistory[i].champion} gameMode={matchHistory[i].gameMode} championId={matchHistory[i].championId} />);
  }
    else matchList.push(<Matches id="loseMatch" outcome={'Defeat'} key={i} secondaryRuneTree={matchHistory[i].secondaryRuneTree} keystone={matchHistory[i].keystone} statShardOffense={matchHistory[i].statShardOffense} statShardFlex={matchHistory[i].statShardFlex} statShardDefense={matchHistory[i].statShardDefense} kills={matchHistory[i].kills} deaths={matchHistory[i].deaths} assists={matchHistory[i].assists} win={matchHistory[i].win} matchLength={matchHistory[i].matchLength} champion={matchHistory[i].champion} gameMode={matchHistory[i].gameMode} championId={matchHistory[i].championId} />);
  };

  return (
    <div id="MatchBoxes" className="OuterSearchBox">
      <h4>Match History</h4>
      { matchList }
    </div>
  );
};

export default MatchBoxes;
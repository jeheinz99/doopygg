import React from 'react';
import { getLeaderboardData } from '../actions/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardBoxes from '../components/LeaderboardComponents/LeaderboardBoxes.jsx';

const LeaderboardPageContainer = () => {

  const leaderboardData = useSelector(state => state.leaderboard.leaderboardData);
  const loadLeaderboardData = useDispatch();

  let regionIdInput;
  function regionIdData (e) {
    regionIdInput = e.target.value;
    return regionIdInput;
  }

  return (
  <div className="LeaderboardPageBox">
    <div className ="OuterSearchBox" id="welcome"> 
      <p> doopy.gg Leaderboards <br></br>
                Input Your Region
      </p>
      <input id="ValBoxInput" placeholder="Ex. NA1" onChange={ regionIdData } required></input>
      <button className="OuterSearchBox" id="LeaderboardBoxButton" onClick={() => loadLeaderboardData(getLeaderboardData(regionIdInput))}> Search! </button>
    </div>
    {leaderboardData[0] && <LeaderboardBoxes />};
  </div>
  );
};

export default LeaderboardPageContainer;
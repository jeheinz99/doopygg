import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'
import LeaderboardBoxes from '../components/LeaderboardComponents/LeaderboardBoxes.jsx';

const mapStateToProps = state => ({
  leaderboardData: state.leaderboard.leaderboardData,
});

const mapDispatchToProps = dispatch => (
  {
  loadLeaderboardData: async (input) => {
    const leaderboardData = await actions.getLeaderboardData(input);
    dispatch(actions.addLeaderboardDataActionCreator(leaderboardData));
  }
});

const LeaderboardPageContainer = props => {

  const { leaderboardData } = props;
  // console.log(leaderboardData);

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
      <button className="OuterSearchBox" id="LeaderboardBoxButton" onClick={() => props.loadLeaderboardData(regionIdInput)}> Search! </button>
    </div>
    {leaderboardData[0] ? <LeaderboardBoxes leaderboardData={ leaderboardData } /> : '' };
  </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardPageContainer);
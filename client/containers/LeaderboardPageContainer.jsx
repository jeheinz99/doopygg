import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'
import LeaderboardBoxes from '../components/LeaderboardComponents/LeaderboardBoxes.jsx';

const mapStateToProps = state => ({
  leaderboardData: state.leaderboard.leaderboardData,
});

const mapDispatchToProps = dispatch => (
  {
  loadLeaderboardData: async () => {
    const leaderboardData = await actions.getLeaderboardData();
    dispatch(actions.addLeaderboardDataActionCreator(leaderboardData));
  }
});

const LeaderboardPageContainer = props => {

  const { leaderboardData } = props;
  // console.log(leaderboardData);

  return (
  <div className="LeaderboardPageBox">
    <div className ="OuterSearchBox" id="welcome"> 
      <p> doopy.gg Leaderboards </p>
      <button className="OuterSearchBox" id="LeaderboardBoxButton" onClick={() => props.loadLeaderboardData()}> Search! </button>
    </div>
    <LeaderboardBoxes leaderboardData={ leaderboardData } />
  </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardPageContainer);
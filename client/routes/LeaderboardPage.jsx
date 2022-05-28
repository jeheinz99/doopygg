import React from 'react';
import { Outlet } from "react-router-dom";
import LeaderboardPageContainer from '../containers/LeaderboardPageContainer';

const LeaderboardPage = props => {
  return (
    <div>
      <LeaderboardPageContainer />
      <h1> Leaderboards </h1>
      <Outlet />
    </div>
  );
};

export default LeaderboardPage;
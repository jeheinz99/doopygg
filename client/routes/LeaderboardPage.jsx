import React from 'react';
import { Outlet, Link } from "react-router-dom";
import LeaderboardPageContainer from '../containers/LeaderboardPageContainer';

const LeaderboardPage = props => {
  return (
    <div>
      <div className="Endpoints">
        <Link to="/champions"> Champions </Link>
        <Link to="/"> Home </Link>
        <Outlet />
      </div>
      <LeaderboardPageContainer />
      <Outlet />
    </div>
  );
};

export default LeaderboardPage;
import React from 'react';
import { Outlet, Link } from "react-router-dom";
import ChampPageContainer from '../containers/ChampPageContainer';

const ChampionsPage = props => {
  return (
    <div>
      <div className="Endpoints">
        <Link to="/"> Home </Link>
        <Link to="/leaderboards"> Leaderboards </Link>
        <Outlet />
      </div>
      <ChampPageContainer />
      <Outlet />
    </div>
  );
};

export default ChampionsPage;
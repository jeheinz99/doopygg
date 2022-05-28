import React from 'react';
import { Outlet } from "react-router-dom";
import ChampPageContainer from '../containers/ChampPageContainer';

const ChampionsPage = props => {
  return (
    <div className="ChampPageContainer">
      <ChampPageContainer />
      <h1> Champions </h1>
      <Outlet />
    </div>
  );
};

export default ChampionsPage;
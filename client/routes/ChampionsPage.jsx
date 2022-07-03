import React from 'react';
import ChampPageContainer from '../containers/ChampPageContainer';
import Navbar from '../containers/Navbar';

const ChampionsPage = () => {
  return (
    <div className="AppBox">
      <Navbar />
      <ChampPageContainer />
    </div>
  );
};

export default ChampionsPage;
import React from 'react';
import Navbar from '../containers/Navbar';
import LeaderboardPageContainer from '../containers/LeaderboardPageContainer';

import '../styles/Leaderboard_styles/leaderboard.css';

const LeaderboardPage = () => {
  return (
    <div className="AppBox">
      <Navbar />
      <LeaderboardPageContainer />
    </div>
  );
};

export default LeaderboardPage;
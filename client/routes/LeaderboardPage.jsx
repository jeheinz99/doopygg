import React from 'react';
import Navbar from '../containers/Navbar';
import LeaderboardPageContainer from '../containers/LeaderboardPageContainer';

import '../styles/Leaderboard_styles/leaderboard.css';

const LeaderboardPage = () => {
  return (
    <div className="AppBox">
      <Navbar />
      <LeaderboardPageContainer />
      <div id="disclaimerdiv">
        <p id="disclaimer">
          doopy.gg isn't endorsed by Riot Games and doesn't reflect the views or opinions 
          of Riot Games or anyone officially involved in producing or managing Riot Games
          properties. Riot Games, and all associated properties are trademarks or registered
          trademarks of Riot Games, Inc.
        </p>
      </div>
    </div>
  );
};

export default LeaderboardPage;
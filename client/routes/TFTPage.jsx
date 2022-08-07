import React from 'react';
import TFTPageContainer from '../containers/TFTPageContainer';
import Navbar from '../containers/Navbar';

import '../styles/TFT_styles/tft.css';

const TFTPage = () => {
  return (
    <div className="AppBox">
      <Navbar />
      <TFTPageContainer />
      <div id="disclaimerdiv">
        <p id="disclaimer">
          doopy.gg isn't endorsed by Riot Games and doesn't reflect the views or opinions 
          of Riot Games or anyone officially involved in producing or managing Riot Games
          properties. Riot Games, and all associated properties are trademarks or registered
          trademarks of Riot Games, Inc.
          <a id="privacy-policy" href="https://www.privacypolicies.com/live/e4ac5795-166a-4dfd-802f-448e1e990d1a">Privacy Policy</a>
          <a id="privacy-policy" href="https://www.termsfeed.com/live/bebc1f1a-a3a8-4538-bdcc-c8ba503c20b9">Terms of Service</a>
        </p>
      </div>
    </div>
  );
};

export default TFTPage;
import React from 'react';
import SearchBox from './containers/SearchBox.jsx';
import Navbar from './containers/Navbar.jsx';

import './styles.css';

const App = () => {
  return (
    <div className="AppBox">
      <Navbar />
      <SearchBox />
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

export default App;
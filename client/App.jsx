import React from 'react';
import SearchBox from './containers/SearchBox.jsx';
import { Outlet, Link } from 'react-router-dom';
import discordLogo from './assets/discordLogo.png'
import twitterLogo from './assets/twitterLogo.png'
import youtubeLogo from './assets/youtubeLogo.png'

import './styles.css'

const App = props => {
  return (
    <div className="AppBox">
      <div className="EndpointBar">
        <div className="EndpointLogos">
          <a id="DiscordLogoLink" href="https://discord.com/">
            <img id="discordLogo" src={discordLogo}/>
          </a>
          <a id="YoutubeLogoLink" href="https://www.youtube.com/channel/UCfXdp5JwO4QghC01p-_h5OA">
            <img id="youtubeLogo" src={youtubeLogo}/>
          </a>
          <a id="TwitterLogoLink" href="https://twitter.com/kindo_v9">
            <img id="twitterLogo" src={twitterLogo}/>
          </a>
        </div>
        <div className="Endpoints">
          <Link id="valorant" to="/valorant"> Valorant </Link> 
          <Link id="champions" to="/champions"> Champions </Link>
          <Link id="leaderboards" to="/leaderboards"> Leaderboards </Link>
          <Link id="tft" to="/tft"> TFT </Link>
        </div>
      </div>
      <SearchBox />
      <Outlet />
    </div>
  );
};

export default App;
import React from 'react';
import { Outlet, Link } from "react-router-dom";
import ChampPageContainer from '../containers/ChampPageContainer';
import discordLogo from '../assets/discordLogo.png';
import youtubeLogo from '../assets/youtubeLogo.png';
import twitterLogo from '../assets/twitterLogo.png';



const ChampionsPage = () => {
  return (
    <div className="AppBox">
      <div className="EndpointBar">
        <div className="EndpointLogos">
          <a id="DiscordLogoLink" target="_blank" href="https://discord.com/">
            <img id="discordLogo" src={discordLogo}/>
          </a>
          <a id="YoutubeLogoLink" target="_blank" href="https://www.youtube.com/channel/UCfXdp5JwO4QghC01p-_h5OA">
            <img id="youtubeLogo" src={youtubeLogo}/>
          </a>
          <a id="TwitterLogoLink" target="_blank" href="https://twitter.com/kindo_v9">
            <img id="twitterLogo" src={twitterLogo}/>
          </a>
        </div>
        <div className="Endpoints">
          <Link id="home" to="/"> Home </Link>
          <Link id="valorant" to="/valorant"> Valorant </Link>
          <Link id="leaderboards" to="/leaderboards"> Leaderboards </Link>
          <Link id="tft" to="/tft"> TFT </Link>
          <Link id="champions" to="/champions"> Champions </Link>
          <Outlet />
        </div>
      </div>
      <ChampPageContainer />
      <Outlet />
    </div>
  );
};

export default ChampionsPage;
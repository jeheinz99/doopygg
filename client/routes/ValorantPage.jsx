import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import ValorantPageContainer from '../containers/ValorantPageContainer';

import { SiRiotgames } from 'react-icons/si';
import { AiFillHome } from 'react-icons/ai';
import { MdLeaderboard } from 'react-icons/md';

import valorantLogo from '../assets/valorantLogo.png';
import tftLogo from '../assets/tftLogo.png';

import discordLogo from '../assets/discordLogo.png';
import twitterLogo from '../assets/twitterLogo.png';
import youtubeLogo from '../assets/youtubeLogo.png';
import linkedinLogo from '../assets/linkedInIcon.png';

const ValorantPage = () => {
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
          <a id="LinkedInLogoLink" target="_blank" href="https://www.linkedin.com/in/joseph-heinz-874676240">
            <img id="linkedinLogo" src={linkedinLogo}/>
          </a>
        </div>
        <div className="Endpoints">
          <NavLink style={({isActive}) => ({color: isActive ? '#ED4252' : ''})} id="home" to="/"> <AiFillHome id="HomeLogo"/> </NavLink>
          <NavLink style={({isActive}) => ({filter: isActive ? 'invert(45%) sepia(76%) saturate(6132%) hue-rotate(337deg) brightness(108%) contrast(86%)' : ''})} id="valorant" to="/valorant"> <img id="valorantLogo" src={valorantLogo}/> </NavLink>
          <NavLink style={({isActive}) => ({color: isActive ? '#ED4252' : ''})} id="leaderboards" to="/leaderboards"> <MdLeaderboard id="LeaderboardLogo"/> </NavLink>
          <NavLink style={({isActive}) => ({filter: isActive ? 'invert(45%) sepia(76%) saturate(6132%) hue-rotate(337deg) brightness(108%) contrast(86%)' : ''})} id="tft" to="/tft"> <img id="tftLogo" src={tftLogo}/> </NavLink>
          <NavLink style={({isActive}) => ({color: isActive ? '#ED4252' : ''})} id="champions" to="/champions"> <SiRiotgames id="RiotLogo"/> </NavLink>
          <Outlet />
        </div>
      </div>
      <ValorantPageContainer />
      <Outlet />
    </div>
  );
};

export default ValorantPage;
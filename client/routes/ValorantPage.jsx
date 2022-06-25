import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import ValorantPageContainer from '../containers/ValorantPageContainer';

import { SiRiotgames } from 'react-icons/si';
import { AiFillHome } from 'react-icons/ai';
import { MdLeaderboard } from 'react-icons/md';

import valorantLogo from '../assets/valorantLogo.png';
import tftLogo from '../assets/tftLogo.png';

import { FaDiscord } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { AiFillYoutube } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';

const ValorantPage = () => {
  return (
    <div className="AppBox">
      <div className="EndpointBar">
        <div className="EndpointLogos">
          <a id="DiscordLogoLink" target="_blank" href="https://discord.com/">
            <FaDiscord color="#7289d9" id="discordLogo"/>
          </a>
          <a id="YoutubeLogoLink" target="_blank" href="https://www.youtube.com/channel/UCfXdp5JwO4QghC01p-_h5OA">
            <AiFillYoutube color="#FF0000" id="youtubeLogo"/>
          </a>
          <a id="TwitterLogoLink" target="_blank" href="https://twitter.com/kindo_v9">
            <BsTwitter color="#00acee" id="twitterLogo"/>
          </a>
          <a id="LinkedInLogoLink" target="_blank" href="https://www.linkedin.com/in/joseph-heinz-874676240">
            <AiFillLinkedin color="#0072b1" id="LinkedInLogo"/>
          </a>
          <a id="GithubLogoLink" target="_blank" href="https://github.com/jeheinz99">
            <AiFillGithub color="white" id="githubLogo"/>
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
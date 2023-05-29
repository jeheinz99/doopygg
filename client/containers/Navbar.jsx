import tftLogo from '../assets/tftLogo.png';
import valorantLogo from '../assets/valorantLogo.png';
import { Outlet, NavLink } from 'react-router-dom';

import { SiRiotgames } from 'react-icons/si';
import { MdLeaderboard } from 'react-icons/md';
import { FaDiscord } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { AiFillYoutube, AiFillLinkedin, AiFillGithub, AiFillHome } from 'react-icons/ai';

import '../styles/Navbar_styles/Navbar.css';

const Navbar = () => {

  window.addEventListener('scroll', () => {
    const navBar = document.getElementById('NavbarBox');
    navBar.classList.toggle('sticky', window.scrollY > 50);

    const navBarHeader = document.getElementById('NavbarHeader');
    navBarHeader.classList.toggle('stickyHeader', window.scrollY > 50);
  });

  return (
    <div id="NavbarBox">

        <ul id="ul1">
          <li><a id="DiscordLogoLink" target="_blank" href="https://discord.com/"><FaDiscord color="#7289d9" className="LogoLinks" id="discordLogo"/></a></li>
          <li><a id="YoutubeLogoLink" target="_blank" href="https://www.youtube.com/"><AiFillYoutube color="#FF0000" className="LogoLinks" id="youtubeLogo"/></a></li>
          <li><a id="TwitterLogoLink" target="_blank" href="https://twitter.com/"><BsTwitter color="#00acee" className="LogoLinks" id="twitterLogo"/></a></li>
          <li><a id="LinkedInLogoLink" target="_blank" href="https://www.linkedin.com/"><AiFillLinkedin color="#0072b1" className="LogoLinks" id="LinkedInLogo"/></a></li>
          <li><a id="GithubLogoLink" target="_blank" href="https://github.com/"><AiFillGithub color="white" className="LogoLinks" id="githubLogo"/></a></li>
        </ul>

        <h3 id="NavbarHeader"> doopy.gg </h3>

      <div id="Endpoints">

        <ul id="ul2">
          <li><NavLink style={({isActive}) => ({color: isActive ? '#ED4252' : ''})} id="home" to="/"> <AiFillHome className="LogoLinks" id="HomeLogo"/> </NavLink></li>
          <li><NavLink style={({isActive}) => ({filter: isActive ? 'invert(45%) sepia(76%) saturate(6132%) hue-rotate(337deg) brightness(108%) contrast(86%)' : ''})} id="valorant" to="/valorant"> <img className="LogoLinks" id="valorantLogo" src={valorantLogo}/> </NavLink></li>
          <li><NavLink style={({isActive}) => ({color: isActive ? '#ED4252' : ''})} id="leaderboards" to="/leaderboards"> <MdLeaderboard className="LogoLinks" id="LeaderboardLogo"/> </NavLink></li>
          <li><NavLink style={({isActive}) => ({filter: isActive ? 'invert(45%) sepia(76%) saturate(6132%) hue-rotate(337deg) brightness(108%) contrast(86%)' : ''})} id="tft" to="/tft"> <img className="LogoLinks" id="tftLogo" src={tftLogo}/> </NavLink></li>
          <li><NavLink style={({isActive}) => ({color: isActive ? '#ED4252' : ''})} id="champions" to="/champions"> <SiRiotgames className="LogoLinks" id="RiotLogo"/> </NavLink></li>
        </ul>

      </div>

      <Outlet/>

    </div>
  );
};

export default Navbar;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SiRiotgames } from 'react-icons/si';
import { getValorantData } from '../actions/actions.js';
import axios from 'axios';
import { BiSearch } from 'react-icons/bi';
import cypher from '../assets/cypher.png';
import jett from '../assets/jett.png';

const link = 'https://auth.riotgames.com/authorize?redirect_uri=http://www.doopy.dev/riot/auth/callback&client_id=doopygg&response_type=code&scope=openid';

const ValorantPageContainer = () => {

  const loadValorantData = useDispatch();
  const [isLoggedIn, setLoggedIn] = useState(false);
  // console.log(document.cookie, 'document cookie');

  let riotIdInput;
  const riotIdData = e => {
    riotIdInput = e.target.value;
    return riotIdInput;
  };

  let taglineInput;
  const taglineData = e => {
    taglineInput = e.target.value;
    return taglineInput;
  };

  const getCookie = name => {
    const escape = s => { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    const match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
  };

  const signOutFunc = () => {
    console.log('hi');
    document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=,*/, `=;expires=${new Date(0).toUTCString()};path=/`));
    setLoggedIn(false);
  };

  useEffect(() => {
    const input1 = document.getElementById('val-input-1');
    const input2 = document.getElementById('val-input-2');
    input1.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault;
        document.getElementById('ValorantBoxButton').click();
      }
    });
    input2.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault;
        document.getElementById('ValorantBoxButton').click();
      }
    });
  }, []);

  if (document.cookie) {
    setLoggedIn(true);
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    // console.log(accessToken, 'access token');
    // console.log(refreshToken, 'refresh token');
  }

  return (
    <div className="ValorantPageBox">
      <div className="OuterSearchBox" id="welcomeValorant"> 
        <div id="welcome-valorant"> 
          <h3>doopy.gg <span>VALORANT</span></h3>
        </div>
        <div className="ValorantSearchBox">
          <img id="cypher" src={cypher}/>

          <div className="val-searchbox-div1">
            <p id="in-dev"> [in development] </p>

            <div className="val-searchbox-div2">
              <input className="ValBoxInput" id="val-input-1" placeholder="Riot ID" onChange={ riotIdData } required></input>
              <p id="hash"> # </p>
              <input className="ValBoxInput" id="val-input-2" placeholder="Tag-line" onChange={ taglineData } required></input>
              <button id="ValorantBoxButton" onClick={() => loadValorantData(getValorantData(riotIdInput, taglineInput))}> <BiSearch id="SearchIcon"/> </button>
            </div>
            {isLoggedIn ? 
            <a id="Riot-Sign-On" href={link}><SiRiotgames />Sign In</a>
            :
            <button id="Riot-Sign-Out" onClick={() => signOutFunc()}>Sign Out</button>
            }
            {/* <button id="Riot-Sign-On" onClick={() => authFunc()}><SiRiotgames />Sign In</button> */}
            <p id="RSO-warning"> Signing in with Riot allows doopy.gg access to your stats and makes your profile public. </p>

          </div>

          <img id="jett" src={jett}/>
        </div>
      </div>
    </div>
  );
};

export default ValorantPageContainer;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SiRiotgames } from 'react-icons/si';
import { getValorantData } from '../actions/actions.js';
import axios from 'axios';
import { BiSearch } from 'react-icons/bi';
import cypher from '../assets/cypher.png';
import jett from '../assets/jett.png';

const ValorantPageContainer = () => {

  // const playerId = useSelector(state => state.valorant.playerId);
  const loadValorantData = useDispatch();
  console.log(document.cookie, 'document cookie');

  let riotIdInput;
  function riotIdData (e) {
    riotIdInput = e.target.value;
    return riotIdInput;
  }

  let taglineInput;
  function taglineData (e) {
    taglineInput = e.target.value;
    return taglineInput;
  }

  const authFunc = async () => {
    const res = await axios.get('/riot/auth');
    console.log(res.data, 'data');
  };

  // useEffect(() => {
  //   const input1 = document.getElementById('val-input-1');
  //   const input2 = document.getElementById('val-input-2');
  //   input1.addEventListener('keypress', (e) => {
  //     if (e.key === 'Enter') {
  //       e.preventDefault;
  //       document.getElementById('ValorantBoxButton').click();
  //     }
  //   });
  //   input2.addEventListener('keypress', (e) => {
  //     if (e.key === 'Enter') {
  //       e.preventDefault;
  //       document.getElementById('ValorantBoxButton').click();
  //     }
  //   });
  // }, []);

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
              {/* <button id="ValorantBoxButton" onClick={() => loadValorantData(getValorantData(riotIdInput, taglineInput))}> <BiSearch id="SearchIcon"/> </button> */}
            </div>
            <button id="Riot-Sign-On" onClick={() => authFunc()}><SiRiotgames />Sign In</button>
            <p id="RSO-warning"> Signing in with Riot allows doopy.gg access to your stats and makes your profile public. </p>

          </div>

          <img id="jett" src={jett}/>
        </div>
      </div>
    </div>
  );
};

export default ValorantPageContainer;
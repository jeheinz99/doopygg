import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SiRiotgames } from 'react-icons/si';
import { getValorantData } from '../actions/actions.js';
import axios from 'axios';

const ValorantPageContainer = () => {

  const playerId = useSelector(state => state.valorant.playerId);
  const loadValorantData = useDispatch();

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

  return (
    <div className="ValorantPageBox">
      <div className="OuterSearchBox" id="welcomeValorant"> 
        <h3>doopy.gg VALORANT</h3>
        <div className="ValorantSearchBox">
          <input id="ValBoxInput" placeholder="Riot ID" onChange={ riotIdData } required></input>
          <p onClick={() => setHidden(!hidden)}> # </p>
          <input id="ValBoxInput" placeholder="Tag-line" onChange={ taglineData } required></input>
        </div>
        <button id="Riot-Sign-On" onClick={() => authFunc()}>Sign In <SiRiotgames /></button>
        {/* <a href="https://doopy.dev/riot/auth" id="Riot-Sign-On" onClick={() => authFunc()}>Sign In <SiRiotgames /></a> */}
        <p id="in-development"> in development </p>
        {/* <button id="ValorantBoxButton" onClick={() => loadValorantData(getValorantData(riotIdInput, taglineInput))}> Search! </button> */}
      </div>
    </div>
  );
};

export default ValorantPageContainer;
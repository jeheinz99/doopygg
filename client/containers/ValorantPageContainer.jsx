import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getValorantData } from '../actions/actions.js';

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

  return (
    <div className="ValorantPageBox">
      <div className="OuterSearchBox" id="welcomeValorant"> 
        <h3>doopy.gg VALORANT</h3>
        <div className="ValorantSearchBox">
          <input id="ValBoxInput" placeholder="Riot ID" onChange={ riotIdData } required></input>
          <p> # </p>
          <input id="ValBoxInput" placeholder="Tag-line" onChange={ taglineData } required></input>
        </div>
        <button id="ValorantBoxButton" onClick={() => loadValorantData(getValorantData(riotIdInput, taglineInput))}> Search! </button>
      </div>
    </div>
  );
};

export default ValorantPageContainer;
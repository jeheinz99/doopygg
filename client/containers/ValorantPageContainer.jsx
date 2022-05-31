import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'

const mapStateToProps = state => ({
  playerId: state.valorant.playerId,
});

const mapDispatchToProps = dispatch => (
  {
    loadValorantData: async (riotIdInput, taglineInput) => {
      const valorantData = await actions.getValorantData(riotIdInput, taglineInput);
      dispatch(actions.addValorantDataActionCreator(valorantData));
    }
  }
);

const ValorantPageContainer = props => {

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
        <p>doopy.gg VALORANT</p>
        <div className="ValorantSearchBox">
          <input id="ValBoxInput" placeholder="Riot ID" onChange={ riotIdData } required></input>
          <p> # </p>
          <input id="ValBoxInput" placeholder="Tag-line" onChange={ taglineData } required></input>
        </div>
        <button className="OuterSearchBox" id="ValorantBoxButton" onClick={() => props.loadValorantData(riotIdInput, taglineInput)}> Search! </button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ValorantPageContainer);
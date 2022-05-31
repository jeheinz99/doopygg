import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

import SummonerBox from '../components/TFTComponents/SummonerBox.jsx'

const mapStateToProps = state => ({
  TFTData: state.tft.TFTData,
});

const mapDispatchToProps = dispatch => (
  {
    loadTFTData: async (input) => {
      const TFTData = await actions.getTFTData(input);
      dispatch(actions.addTFTDataActionCreator(TFTData));
    }
  }
);

const TFTPageContainer = props => {

  let summonerNameInput;
    function summonerNameData (e) {
      summonerNameInput = e.target.value;
      return summonerNameInput;
    }

    const { summonerName } = props;

  return (
    <div className="OuterSearchBox">
      <div className="SearchBox" id="welcomeTFT">
        <div id="welcomeTFT"> doopy.gg TFT </div>
        <div id="inputSummonerNameTFT"> Input your Summoner Name Below </div>
        <br></br>
        <input id="SearchBoxInputTFT" placeholder="Summoner Name" onChange={ summonerNameData } required></input>
        <br></br>
        <button id="SearchBoxButton" onClick={() => props.loadTFTData(summonerNameInput)}> Search </button>
      </div>
      <SummonerBox summonerName={summonerName}/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TFTPageContainer);
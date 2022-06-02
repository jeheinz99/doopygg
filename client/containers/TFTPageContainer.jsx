import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import TFTMatchBoxes from '../components/TFTComponents/TFTMatchBoxes.jsx';

import TFTSummonerBox from '../components/TFTComponents/TFTSummonerBox.jsx'

const mapStateToProps = state => ({
  TFTData: state.tft.TFTData,
  summonerName: state.tft.summonerName,
  summonerIcon: state.tft.summonerIcon,
});

const mapDispatchToProps = dispatch => ({
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

    const { summonerName, TFTData, summonerIcon } = props;

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
      {TFTData[0] ? <TFTSummonerBox summonerName={summonerName} summonerIcon={summonerIcon}/> : ''};
      {TFTData[0] ? <TFTMatchBoxes TFTData={TFTData}/> : ''};
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TFTPageContainer);
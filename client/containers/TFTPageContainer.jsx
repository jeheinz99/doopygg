import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTFTData, updateTFTData } from '../actions/actions.js';
import TFTMatchBoxes from '../components/TFTComponents/TFTMatchBoxes.jsx';
import RecentMatchesBox from '../components/TFTComponents/TFTRecentMatchesBox.jsx';

import TFTSummonerBox from '../components/TFTComponents/TFTSummonerBox.jsx'

const TFTPageContainer = () => {

  const update = useDispatch();
  const loadTFTData = useDispatch();
  const summonerName = useSelector(state => state.tft.summonerName);
  const TFTData = useSelector(state => state.tft.TFTData);
  const summonerIcon = useSelector(state => state.tft.summonerIcon);

  let summonerNameInput;
    function summonerNameData (e) {
      summonerNameInput = e.target.value;
      return summonerNameInput;
    }

  return (
    <div className="OuterSearchBox">
      <div className="SearchBox" id="welcomeTFT">
        <div id="welcomeTFT"> doopy.gg TFT </div>
        <div id="inputSummonerNameTFT"> Input your Summoner Name Below </div>
        <br></br>
        <input id="SearchBoxInputTFT" placeholder="Summoner Name" onChange={ summonerNameData } required></input>
        <br></br>
        <button id="SearchBoxButton" onClick={() => loadTFTData(getTFTData(summonerNameInput))}> Search </button>
        <button id="tempButton" onClick={() => update(updateTFTData(summonerNameInput))}> Update </button>
      </div>
      <div className="TFTTopHalfBox">
        {TFTData[0] && <TFTSummonerBox />}
        {/* {TFTData[0] && <RecentMatchesBox />} */}
      </div>
      {TFTData[0] && <TFTMatchBoxes />}
    </div>
  );
};

export default TFTPageContainer;
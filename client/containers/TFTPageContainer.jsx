import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTFTData, updateTFTData } from '../actions/actions.js';
import TFTMatchBoxes from '../components/TFTComponents/TFTMatchBoxes.jsx';
import TFTSummonerBox from '../components/TFTComponents/TFTSummonerBox.jsx';

import { BiSearch } from 'react-icons/bi';

const TFTPageContainer = () => {

  const update = useDispatch();
  const loadTFTData = useDispatch();
  const summonerName = useSelector(state => state.tft.summonerName);
  const TFTData = useSelector(state => state.tft.TFTData);

  let summonerNameInput;
  const summonerNameData = e => {
    summonerNameInput = e.target.value;
    return summonerNameInput;
  };

  useEffect(() => {
    console.log('hi');
    const input = document.getElementById('SearchBoxInputTFT');
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault;
        document.getElementById('SearchBoxButton').click();
      }
    });
  }, []);

  return (
    <div className="OuterSearchBox">
      <div className="SearchBox" id="welcomeTFT">
        <div id="welcome"> doopy.gg TFT </div>
        <div id="inputSummonerName"> Input your Summoner Name Below </div>
        <br></br>
        <div className="SearchBoxInputandIcon">
          <input id="SearchBoxInputTFT" placeholder="Summoner Name" onChange={ summonerNameData } required></input>
          <button id="SearchBoxButton" onClick={() => loadTFTData(getTFTData(summonerNameInput))}> <BiSearch id="SearchIcon"/> </button>
        </div>
        <div className="test-button">
          <p>Don't have a summoner name?</p>
          <button id="SearchBoxDemoButton" onClick={() => loadTFTData(getTFTData('Doopliss2'))}> Demo </button>
        </div>
      </div>

        {TFTData[0] && <div className="headerinfo">
        <h3> Summoner Information </h3>
        <button id="summonerUpdateButton" onClick={() => update(updateTFTData(summonerName))}> Update </button>
      </div>}
        

      {TFTData[0] && <div className="TFTTopHalfBox">
        <TFTSummonerBox />
        <TFTMatchBoxes />
      </div>}

    </div>
  );
};

export default TFTPageContainer;
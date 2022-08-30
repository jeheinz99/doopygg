import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTFTData, updateTFTData } from '../actions/actions.js';
import { PulseLoader } from 'react-spinners';
import TFTMatchBoxes from '../components/TFTComponents/TFTMatchBoxes.jsx';
import TFTSummonerBox from '../components/TFTComponents/TFTSummonerBox.jsx';

import { BiSearch } from 'react-icons/bi';
import CustomSelect from '../components/AppComponents/CustomSelect.jsx';

const TFTPageContainer = () => {

  const dispatch = useDispatch();
  const summonerName = useSelector(state => state.tft.summonerName);
  const TFTData = useSelector(state => state.tft.TFTData);
  const lastUpdated = useSelector(state => state.tft.lastUpdated);

  const [loading, setLoading] = useState(false);

  const getTimeAgo = lastUpdated => {
    const todaysDateStamp = Date.now();

    const diff = todaysDateStamp - lastUpdated;
    if (diff >= 3600000 && diff < 86400000) {
      if (Math.round(diff/3600000) === 1) return ('1 hour ago');
      return (`${Math.round(diff/3600000)} hours ago`);
    }
    if (diff >= 60000 && diff < 3600000) {
      if (Math.round(diff/60000) === 1) return ('1 minute ago');
      return (`${Math.round(diff/60000)} minutes ago`);
    }
    if (diff >= 86400000 && diff < 2592000000) {
      if (Math.round(diff/86400000) === 1) return ('1 day ago');
      return (`${Math.round(diff/86400000)} days ago`);
    }
    if (diff < 60000) {
      return (`${Math.round(diff/1000)} seconds ago`);
    }
    if (diff >= 2592000000 && diff < 31540000000) {
      if (Math.round(diff/2592000000) === 1) return ('1 month ago');
      return (`${Math.round(diff/2592000000)} months ago`);
    }
    else {
      return ('over 1 year ago');
    }
  };

  const updateTFTSummData = async () => {
    setLoading(true);
    await dispatch(updateTFTData(summonerName));
    setLoading(false);
  };

  const timeAgo = getTimeAgo(lastUpdated);

  let summonerNameInput;
  const summonerNameData = e => {
    summonerNameInput = e.target.value;
    return summonerNameInput;
  };

  useEffect(() => {
    const input = document.getElementById('SearchBoxInputTFT');
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault;
        document.getElementById('SearchBoxButton').click();
      }
    });
  }, []);

  return (
    <div className="OuterSearchBox" id="TFTOSB">
      <div className="SearchBox" id="welcomeTFT">
        <div id="welcome"> doopy.gg TFT </div>
        <div id="inputSummonerName"> Input your Summoner Name Below </div>
        <br></br>
        <div className="SearchBoxInputandIcon">
          <CustomSelect id={'region-select-btn'} selectType={'regions'} init={'NA'}/>
          <input id="SearchBoxInputTFT" placeholder="Summoner Name" onChange={ summonerNameData } required></input>
          <button id="SearchBoxButton" onClick={() => dispatch(getTFTData(summonerNameInput))}> <BiSearch id="SearchIcon"/> </button>
        </div>
        <div className="test-button">
          <p>Don't have a summoner name?</p>
          <button id="SearchBoxDemoButton" onClick={() => dispatch(getTFTData('Doopliss2'))}> Demo </button>
        </div>
      </div>

      {TFTData[0] && !loading && 
      <div className="headerinfo">
        <h3> Summoner Information </h3>
        <button className="summonerUpdateButton" onClick={() => updateTFTSummData()}> Update </button>
        <p>Last Updated {timeAgo}</p>
      </div>}

      {TFTData[0] && loading && 
      <div className="headerinfo">
        <h3> Summoner Information </h3>
        <div className="loading-div">
          <p id="updating-p"> Updating </p>
          <PulseLoader color="#ffffff" size={10} speedMultiplier={0.6}/>
        </div>
        <p>Last Updated {timeAgo}</p>
      </div>}
        

      {TFTData[0] && <div className="TFTTopHalfBox">
        <TFTSummonerBox />
        <TFTMatchBoxes />
      </div>}

    </div>
  );
};

export default TFTPageContainer;
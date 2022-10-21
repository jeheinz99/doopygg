import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { BiSearch } from 'react-icons/bi';
import { getTFTData, updateTFTData } from '../actions/actions.js';
import TFTMatchBoxes from '../components/TFTComponents/TFTMatchBoxes.jsx';
import TFTSummonerBox from '../components/TFTComponents/TFTSummonerBox.jsx';
import CustomSelect from '../components/AppComponents/CustomSelect.jsx';
import chibiYasuo from '../assets/chibi_yasuo.png';

const TFTPageContainer = () => {

  const summonerName = useSelector(state => state.tft.summonerName);
  const TFTData = useSelector(state => state.tft.TFTData);
  const lastUpdated = useSelector(state => state.tft.lastUpdated);

  const [searchParams, setSearchParams] = useSearchParams();
  
  const dispatch = useDispatch();

  const [searching, setSearching] = useState(false);
  const [updating, setUpdating] = useState(false);

  const updateTFTSummData = async () => {
    setUpdating(true);
    await dispatch(updateTFTData(summonerName));
    setUpdating(false);
  };
  
  const getTimeAgo = lastUpdated => {
    const todaysDateStamp = Date.now();
    
    const diff = todaysDateStamp - lastUpdated;
    if (diff < 180000) return (3 - (Math.round(diff/60000)));
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
    if (diff >= 2592000000 && diff < 31540000000) {
      if (Math.round(diff/2592000000) === 1) return ('1 month ago');
      return (`${Math.round(diff/2592000000)} months ago`);
    }
    else {
      return ('over 1 year ago');
    }
  };

  const searchSummTFTData = () => {
    const regionId = document.getElementById('region-select-btn').value;
    setSearchParams({ region: regionId, summonerName: summonerNameInput });
  };

  const timeAgo = getTimeAgo(lastUpdated);

  let summonerNameInput;
  const summonerNameData = e => {
    summonerNameInput = e.target.value;
    return summonerNameInput;
  };

  useEffect(() => {
    const input = document.getElementById('SearchBoxInputTFT');
    const eventHandler = e => {
      if (e.key === 'Enter') {
        e.preventDefault;
        document.getElementById('SearchBoxButton').click();
      }
    };
    input.addEventListener('keypress', eventHandler);

    return () => {
      input.removeEventListener('keypress', eventHandler);
    };
  }, []);

  useEffect(() => {
    const summonerNameParam = searchParams.get('summonerName');
    const regionIdParam = searchParams.get('region');

    const tempFunc = () => {
      setSearching(true);
      dispatch(getTFTData(summonerNameParam, regionIdParam))
      .then(() =>  setSearching(false));
    }
    if (summonerNameParam && regionIdParam) {
      tempFunc();
    }
  }, [searchParams]);

  return (
    <div className="OuterSearchBox" id="TFTOSB">
      <div className="SearchBox" id="welcomeTFT">
        <div className="welcome-div" id="tft-welcome-div">
          <div id="welcome">
            <h3> doopy.gg TFT </h3>
          </div>
          <img id="chibi-yasuo" src={chibiYasuo}/>
        </div>
        <div className="inputSummonerName" id="inputSummonerNameTFT"> 
          <p>Input your Summoner Name</p>
          <div className="SearchBoxInputandIcon">
            <CustomSelect id={'region-select-btn'} selectType={'regions'} init={'NA'}/>
            <input id="SearchBoxInputTFT" placeholder="Summoner Name" onChange={ summonerNameData } required></input>
            {searching ? 
              <div className="LoadingDiv" id="searching-load-div">
                <PulseLoader color="#ffffff" size={10} speedMultiplier={0.5}/>
              </div> :
              <button id="SearchBoxButton" onClick={() => searchSummTFTData(summonerNameInput)}> <BiSearch id="SearchIcon"/> </button>}
          </div>
          <div className="test-button">
            <p id="tft-test-p">Don't have a summoner name?</p>
            {searching ? <button id="SearchBoxDemoButton"> Demo </button> : <button id="SearchBoxDemoButton" onClick={() => searchSummTFTData('Doopliss2')}> Demo </button>}
          </div>
        </div>
      </div>

      {TFTData[0] && !updating && typeof timeAgo === "string" && !searching && 
      <div className="headerinfo">
        <button className="summonerUpdateButton" onClick={() => updateTFTSummData()}> Update </button>
        <p>Last Updated {timeAgo}</p>
      </div>}

      {TFTData[0] && !updating && typeof timeAgo === "number" && !searching && 
      <div className="headerinfo">
        <button className="summonerUpdateButton" id="update-wait"> Updated </button>
        {timeAgo === 3 && <p>Please wait {timeAgo} minutes before updating again.</p>}
        {timeAgo === 2 && <p>Please wait {timeAgo} minutes before updating again.</p>}
        {timeAgo <= 1 && <p>Please wait 1 minute before updating again.</p>}
      </div>}

      {/* {matchHistory[0] && !updating && typeof timeAgo === "string" && !searching && */}
      {/* {matchHistory[0] && !updating && typeof timeAgo === "number" && !searching && */}

      {TFTData[0] && updating && !searching && 
      <div className="headerinfo">
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
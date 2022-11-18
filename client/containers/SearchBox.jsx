import { useState, useEffect } from 'react';
import { getSummonerData, updateSummonerData } from '../actions/actions.js';
import { useSearchParams } from 'react-router-dom';
import MatchBoxes from '../components/AppComponents/MatchBoxes.jsx';
import { useSelector, useDispatch } from 'react-redux';
import SummonerChampDataBox from '../components/AppComponents/SummonerChampDataBox.jsx';
import ChampionsInfoBox from '../components/AppComponents/ChampionsInfoBox.jsx';
import LiveGameBox from '../components/AppComponents/LiveGame/LiveGameBox.jsx';
import CustomSelect from '../components/AppComponents/CustomSelect.jsx'
import { PulseLoader } from 'react-spinners';
import { BiSearch } from 'react-icons/bi';
import doop from '../assets/Doopliss_Kindred.png';

const SearchBox = () => {
  const summName = useSelector(state => state.summoners.summonerName);
  const matchHistory = useSelector(state => state.summoners.matchHistory);
  const allMatchesPlayedData = useSelector(state => state.summoners.allMatchesPlayedData);
  const lastUpdated = useSelector(state => state.summoners.lastUpdated);

  const [currBox, setCurrBox] = useState('matchHistory');
  const [updating, setUpdating] = useState(false);
  const [searching, setSearching] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const updateSummData = async () => {
    setUpdating(true);
    await dispatch(updateSummonerData(summName));
    setUpdating(false);
  };

  const searchSummData = summonerName => {
    const regionId = document.getElementById('region-select-btn').value;
    setSearchParams({ region: regionId, summonerName: summonerName });
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

  const timeAgo = getTimeAgo(lastUpdated);

  let summonerNameInput;
  const summonerNameData = e => {
    summonerNameInput = e.target.value;
    return summonerNameInput;
  };

  useEffect(() => {
    const input = document.getElementById('SearchBoxInput');
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
      dispatch(getSummonerData(summonerNameParam, regionIdParam))
      .then(() =>  setSearching(false));
    }
    if (currBox !== 'matchHistory') {
      setCurrBox('matchHistory');
    }
    if (summonerNameParam && regionIdParam) {
      tempFunc();
    }
  }, [searchParams]);

  return (
    <div className="OuterSearchBox">
      <div className="SearchBox">
        <div className="welcome-div">
          <div id="welcome"> 
            <h3>doopy.gg</h3>
          </div>
          <img id="doop" src={doop}/>
        </div>
        <div className="inputSummonerName"> 
          <p>Input your Summoner Name</p>
          <div className="SearchBoxInputandIcon">
            <CustomSelect id={'region-select-btn'} selectType={'regions'} init={'NA'}/>
            <input id="SearchBoxInput" placeholder="Summoner Name" onChange={ summonerNameData } required></input>
            {searching ? 
              <div className="LoadingDiv" id="searching-load-div">
                <PulseLoader color="#ffffff" size={10} speedMultiplier={0.5}/>
              </div> :
              <button id="SearchBoxButton" onClick={() => searchSummData(summonerNameInput)}> <BiSearch id="SearchIcon"/> </button>}
          </div>
          <div className="test-button">
            <p>Don't have a summoner name?</p>
            {searching ? <button id="SearchBoxDemoButton"> Demo </button> : <button id="SearchBoxDemoButton" onClick={() => searchSummData('Doopliss2')}> Demo </button>}
          </div>
        </div>
      </div>

      {matchHistory[0] && !updating && typeof timeAgo === "string" && !searching &&
      <div className="headerinfo">
        <button className="summonerUpdateButton" onClick={() => updateSummData()}> Update </button>
        <p>Last Updated {timeAgo}</p>
        <div className="missing-info-disc">
          <p>
            Data is likely missing from accounts that have a large amount of ranked games played. 
            You can try updating and seeing if stats update slowly or come back later.
          </p>
        </div>
      </div>}

      {matchHistory[0] && !updating && typeof timeAgo === "number" && !searching &&
      <div className="headerinfo">
        <button className="summonerUpdateButton" id="update-wait"> Updated </button>
        {timeAgo === 3 && <p>Please wait {timeAgo} minutes before updating again.</p>}
        {timeAgo === 2 && <p>Please wait {timeAgo} minutes before updating again.</p>}
        {timeAgo <= 1 && <p>Please wait 1 minute before updating again.</p>}
        <div className="missing-info-disc">
          <p>
            Data is likely missing from accounts that have a large amount of ranked games played. 
            You can try updating and seeing if stats update slowly or come back later.
          </p>
        </div>
      </div>}

      {matchHistory[0] && updating && !searching &&
      <div className="headerinfo">
        <div className="loading-div">
          <p id="updating-p"> Updating </p>
          <PulseLoader id="pulse-test" color="#c9c9c9" size={8} speedMultiplier={0.6}/>
        </div>
        <p>Last Updated {timeAgo}</p>
        <div className="missing-info-disc">
          <p>
            Data is likely missing from accounts that have a large amount of ranked games played. 
            You can try updating and seeing if stats update slowly or come back later.
          </p>
        </div>
      </div>}
    
    {matchHistory[0] && allMatchesPlayedData[0] && currBox === 'matchHistory' && !searching &&
    <div className="SummonerDataBoxGroup">
      <SummonerChampDataBox />
      <div className="outer-box">
        <div className="searchbox-tabs">
          <button id="active-btn-tab" className="searchbox-tab">Matches</button>
          <button className="searchbox-tab" onClick={() => setCurrBox('champions')}>Champions</button>
          <button className="searchbox-tab" onClick={() => setCurrBox('live-game')}>Live Game</button>
        </div>
        {!searching && <MatchBoxes />}
      </div>
    </div>}

    {matchHistory[0] && allMatchesPlayedData[0] && currBox === 'champions' && !searching &&
    <div className="SummonerDataBoxGroup" id="SummonerDataBoxGroup-champions">
      <div className="outer-box">
        <div className="searchbox-tabs">
          <button className="searchbox-tab" onClick={() => setCurrBox('matchHistory')}>Matches</button>
          <button id="active-btn-tab" className="searchbox-tab">Champions</button>
          <button className="searchbox-tab" onClick={() => setCurrBox('live-game')}>Live Game</button>
        </div>
        <ChampionsInfoBox />
      </div>
    </div>}

    {matchHistory[0] && allMatchesPlayedData[0] && currBox === 'live-game' && !searching &&
    <div className="SummonerDataBoxGroup" id="SummonerDataBoxGroup-live-game">
      <div className="outer-box">
        <div className="searchbox-tabs">
          <button className="searchbox-tab" onClick={() => setCurrBox('matchHistory')}>Matches</button>
          <button className="searchbox-tab" onClick={() => setCurrBox('champions')}>Champions</button>
          <button id="active-btn-tab" className="searchbox-tab">Live Game</button>
        </div>
        <LiveGameBox />
      </div>
    </div>}

    {matchHistory[0] && allMatchesPlayedData[0] === undefined && currBox === 'matchHistory' && !searching &&
    <div className="SummonerDataBoxGroup">
      <SummonerChampDataBox />
      <div className="outer-box">
        <div className="searchbox-tabs">
          <button id="active-btn-tab" className="searchbox-tab">Matches</button>
          <button className="searchbox-tab" onClick={() => setCurrBox('champions')}>Champions</button>
          <button className="searchbox-tab" onClick={() => setCurrBox('live-game')}>Live Game</button>
        </div>
        {!searching && <MatchBoxes />}
      </div>
    </div>}

    {matchHistory[0] && allMatchesPlayedData[0] === undefined && currBox === 'champions' && !searching &&
    <div className="SummonerDataBoxGroup" id="SummonerDataBoxGroup-champions">
      <div className="outer-box">
        <div className="searchbox-tabs">
          <button className="searchbox-tab" onClick={() => setCurrBox('matchHistory')}>Matches</button>
          <button id="active-btn-tab" className="searchbox-tab">Champions</button>
          <button className="searchbox-tab" onClick={() => setCurrBox('live-game')}>Live Game</button>
        </div>
        <ChampionsInfoBox />
      </div>
    </div>}

    {matchHistory[0] && allMatchesPlayedData[0] === undefined && currBox === 'live-game' && 
    <div className="SummonerDataBoxGroup" id="SummonerDataBoxGroup-live-game">
      <div className="outer-box">
        <div className="searchbox-tabs">
          <button className="searchbox-tab" onClick={() => setCurrBox('matchHistory')}>Matches</button>
          <button className="searchbox-tab" onClick={() => setCurrBox('champions')}>Champions</button>
          <button id="active-btn-tab" className="searchbox-tab">Live Game</button>
        </div>
        <LiveGameBox />
      </div>
    </div>}

  </div>
  );
};

export default SearchBox;
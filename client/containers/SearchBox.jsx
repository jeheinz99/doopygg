import React, { useState } from 'react';
import { getSummonerData, updateSummonerData } from '../actions/actions.js';
import MatchBoxes from '../components/AppComponents/MatchBoxes.jsx';
import { useSelector, useDispatch } from 'react-redux';
import SummonerChampDataBox from '../components/AppComponents/SummonerChampDataBox.jsx';
import ChampionsInfoBox from '../components/AppComponents/ChampionsInfoBox.jsx';
import LiveGameBox from '../components/AppComponents/LiveGameBox.jsx';

import { BiSearch } from 'react-icons/bi';

const SearchBox = () => {
  const summName = useSelector(state => state.summoners.summonerName);
  const matchHistory = useSelector(state => state.summoners.matchHistory);
  const allMatchesPlayedData = useSelector(state => state.summoners.allMatchesPlayedData);

  const [currBox, setCurrBox] = useState('matchHistory');

  const loadSummonerData = useDispatch();

  const update = useDispatch();

  let summonerNameInput;
    function summonerNameData (e) {
      summonerNameInput = e.target.value;
      return summonerNameInput;
    }
  
  return (
    <div className="OuterSearchBox">
      <div className="SearchBox">
        <div id="welcome"> doopy.gg Summoners </div>
        <div id="inputSummonerName"> Input your Summoner Name Below </div>
        <br></br>
        <div className="SearchBoxInputandIcon">
          <input id="SearchBoxInput" placeholder="Summoner Name" onChange={ summonerNameData } required></input>
          <button id="SearchBoxButton" onClick={() => loadSummonerData(getSummonerData(summonerNameInput))}> <BiSearch id="SearchIcon"/> </button>
        </div>
        <div className="test-button">
          <p>Don't have a summoner name?</p>
          <button id="SearchBoxDemoButton" onClick={() => loadSummonerData(getSummonerData('Doopliss2'))}> Demo </button>
        </div>
      </div>

      {matchHistory[0] && <div className="headerinfo">
        <h3> Summoner Information </h3>
        <button id="summonerUpdateButton" onClick={() => update(updateSummonerData(summName))}> Update </button>
      </div>}
    
    {matchHistory[0] && allMatchesPlayedData[0] && currBox === 'matchHistory' && 
    <div className="SummonerDataBoxGroup">
      <SummonerChampDataBox />
      <div className="searchbox-tabs">
        <button className="searchbox-tab" onClick={() => setCurrBox('champions')}>Champions</button>
        <button className="searchbox-tab" onClick={() => setCurrBox('live-game')}>Live Game</button>
        <MatchBoxes />
      </div>
    </div>
    }

    {matchHistory[0] && allMatchesPlayedData[0] && currBox === 'champions' && 
    <div className="SummonerDataBoxGroup">
      {/* <SummonerChampDataBox /> */}
      <div className="searchbox-tabs">
        <button className="searchbox-tab" onClick={() => setCurrBox('matchHistory')}>Matches</button>
        <button className="searchbox-tab" onClick={() => setCurrBox('live-game')}>Live Game</button>
        <ChampionsInfoBox />
      </div>
    </div>
    }

    {matchHistory[0] && allMatchesPlayedData[0] && currBox === 'live-game' && 
    <div className="SummonerDataBoxGroup">
      {/* <SummonerChampDataBox /> */}
      <div className="searchbox-tabs">
        <button className="searchbox-tab" onClick={() => setCurrBox('matchHistory')}>Matches</button>
        <button className="searchbox-tab" onClick={() => setCurrBox('champions')}>Champions</button>
        <LiveGameBox />
      </div>
    </div>
    }

    {matchHistory[0] && allMatchesPlayedData[0] === undefined && <div className="SummonerDataBoxGroup">
      <SummonerChampDataBox />
      {/* <MatchBoxes /> */}
    </div>}


  </div>
  );
};

export default SearchBox;
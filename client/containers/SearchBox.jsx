import React, { useState } from 'react';
import { getSummonerData, updateSummonerData } from '../actions/actions.js';
import MatchBoxes from '../components/AppComponents/MatchBoxes.jsx';
import { useSelector, useDispatch } from 'react-redux';
import SummonerChampDataBox from '../components/AppComponents/SummonerChampDataBox.jsx';
import SummonerChampDataBoxTemp from '../components/AppComponents/SummonerChampDataBoxTemp.jsx';
import { PulseLoader } from 'react-spinners';

import { BiSearch } from 'react-icons/bi';

const SearchBox = () => {
  const summName = useSelector(state => state.summoners.summonerName);
  const matchHistory = useSelector(state => state.summoners.matchHistory);
  const allMatchesPlayedData = useSelector(state => state.summoners.allMatchesPlayedData);

  const [loading, setLoading] = useState(false);

  const loadSummonerData = useDispatch();

  const update = useDispatch();

  let summonerNameInput;
    function summonerNameData (e) {
      summonerNameInput = e.target.value;
      return summonerNameInput;
    }

  const updateLoading = async () => {
    
  };
  
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
      </div>

      {matchHistory[0] && !loading && <div className="headerinfo">
        <h3> Summoner Information </h3>
        <button id="summonerUpdateButton" onClick={() => update(updateSummonerData(summName))}> Update </button>
      </div>}

      {matchHistory[0] && loading && <div className="headerinfo">
        <h3> Summoner Information </h3>
          <div className="updatingDiv">
            <p id="updatingText"> Updating... </p>
            <PulseLoader color="#ffffff" size={15} speedMultiplier={0.6}/>
          </div>
      </div>}
      
    {matchHistory[0] && allMatchesPlayedData[0] && <div className="SummonerDataBoxGroup">
      <SummonerChampDataBox />
      <MatchBoxes />
    </div>}

    {matchHistory[0] && allMatchesPlayedData[0] === undefined && <div className="SummonerDataBoxGroup">
      <SummonerChampDataBoxTemp />
      <MatchBoxes />
    </div>}

  </div>
  );
};

export default SearchBox;
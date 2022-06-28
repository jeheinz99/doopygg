import React from 'react';
import { getSummonerData, updateSummonerData } from '../actions/actions.js';
import MatchBoxes from '../components/AppComponents/MatchBoxes.jsx';
import SummonerBox from '../components/AppComponents/SummonerBox.jsx';
import { useSelector, useDispatch } from 'react-redux';
import SummonerChampDataBox from '../components/AppComponents/SummonerChampDataBox.jsx';
import SummonerChampDataBoxTemp from '../components/AppComponents/SummonerChampDataBoxTemp.jsx';

import { BiSearch } from 'react-icons/bi';

const SearchBox = () => {
  const summName = useSelector(state => state.summoners.summonerName);
  const matchHistory = useSelector(state => state.summoners.matchHistory);
  const allMatchesPlayedData = useSelector(state => state.summoners.allMatchesPlayedData);
  const loadSummonerData = useDispatch();
  const update = useDispatch();

  let summonerNameInput;
    function summonerNameData (e) {
      summonerNameInput = e.target.value;
      return summonerNameInput;
    }

    console.log(allMatchesPlayedData[0]);
  
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

      {matchHistory[0] && <div className="headerinfo">
        <h3> Summoner Information </h3>
        <button id="summonerUpdateButton" onClick={() => update(updateSummonerData(summName))}> Update </button>
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
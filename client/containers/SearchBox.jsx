import React from 'react';
import { getSummonerData, updateSummonerData } from '../actions/actions.js';
import MatchBoxes from '../components/AppComponents/MatchBoxes.jsx';
import SummonerBox from '../components/AppComponents/SummonerBox.jsx';
import { useSelector, useDispatch } from 'react-redux';
import SummonerChampDataBox from '../components/AppComponents/SummonerChampDataBox.jsx';
import SummonerChampDataBoxTemp from '../components/AppComponents/SummonerChampDataBoxTemp.jsx';

const SearchBox = () => {
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
        <input id="SearchBoxInput" placeholder="Summoner Name" onChange={ summonerNameData } required></input>
        <br></br>
        <button id="SearchBoxButton" onClick={() => loadSummonerData(getSummonerData(summonerNameInput))}> Search </button>
      </div>
      {matchHistory[0] && <div className="headerinfo">
        <h3>Summoner Information</h3>
        <button id="summonerUpdateButton" onClick={() => update(updateSummonerData(summonerName))}> Update </button>
      </div>}
    {matchHistory[0] && allMatchesPlayedData[0] && <div className="SummonerDataBoxGroup">
      <SummonerChampDataBox />
      <SummonerBox />
    </div>}

    {matchHistory[0] && allMatchesPlayedData[0] === undefined && <div className="SummonerDataBoxGroup">
      <SummonerChampDataBoxTemp />
      <SummonerBox />
      </div>}

    {matchHistory[0] && <MatchBoxes />}
  </div>
  );
};

export default SearchBox;
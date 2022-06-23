import React from 'react';
import { getSummonerData } from '../actions/actions.js';
import MatchBoxes from '../components/AppComponents/MatchBoxes.jsx';
import SummonerBox from '../components/AppComponents/SummonerBox.jsx';
import { useSelector, useDispatch } from 'react-redux';
import SummonerChampDataBox from '../components/AppComponents/SummonerChampDataBox.jsx';

const SearchBox = () => {
  const matchHistory = useSelector(state => state.summoners.matchHistory);
  // const allMatchesPlayed = useSelector(state => state.summoners.allMatchesPlayed);
  const loadSummonerData = useDispatch();

  let summonerNameInput;
    function summonerNameData (e) {
      summonerNameInput = e.target.value;
      return summonerNameInput;
    }
  
  // const { matchHistory, summonerName, summonerLevel, summonerRank, loadSummonerData} = props;

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
    <div className="SummonerDataBoxGroup">
      {/* {allMatchesPlayed[0] && <SummonerChampDataBox />} */}
      {matchHistory[0] && <SummonerBox />}
    </div>
    {matchHistory[0] && <MatchBoxes />}
  </div>
  );
};

export default SearchBox;
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'
import MatchBoxes from '../components/AppComponents/MatchBoxes.jsx';
import SummonerBox from '../components/AppComponents/SummonerBox.jsx';
import { Outlet, Link } from 'react-router-dom'

const mapStateToProps = state => ({
  summonerName: state.summoners.summonerName,
  summonerLevel: state.summoners.summonerLevel,
  summonerRank: state.summoners.summonerRank,
  summonerNameInput: state.summoners.summonerNameInput,
  matchHistory: state.summoners.matchHistory,
});

const mapDispatchToProps = dispatch => (
  {
  loadSummonerData: async (input) => {
    const summonerData = await actions.getSummonerData(input);
    dispatch(actions.addSummonerDataActionCreator(summonerData));
  }
});

const SearchBox = props => {

  let summonerNameInput;
    function summonerNameData (e) {
      summonerNameInput = e.target.value;
      return summonerNameInput;
    }
  
  const { matchHistory, summonerName, summonerLevel, summonerRank } = props;

  return (
    <div className="OuterSearchBox">
      <div className="SearchBox">
        <Link to="/champions"> Champions </Link>
        <div id="welcome"> doopy.gg Summoners </div>
        <div id="inputSummonerName"> Input your Summoner Name Below </div>
        <Outlet />
        <br></br>
        <input type="text" id="SearchBoxInput" onChange={ summonerNameData } required></input>
        <br></br>
        <button id="SearchBoxButton" onClick={() => props.loadSummonerData(summonerNameInput)}> Search! </button>
      </div>
    <SummonerBox summonerName={summonerName} summonerLevel={summonerLevel} matchHistory={matchHistory} summonerRank={summonerRank}/>
    <MatchBoxes matchHistory={matchHistory}/>
  </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
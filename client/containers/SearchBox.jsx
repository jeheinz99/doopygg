import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { addSummonerNameActionCreator } from '../actions/actions.js';
import * as actions from '../actions/actions.js'
import MatchBoxes from '../components/MatchBoxes.jsx';
import SummonerBox from '../components/SummonerBox.jsx';

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
        <div id="welcome"> Welcome </div>
        <div id="inputSummonerName"> Input your Summoner Name Below </div>
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
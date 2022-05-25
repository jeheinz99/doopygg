import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { addSummonerNameActionCreator } from '../actions/actions.js';
import * as actions from '../actions/actions.js'

const mapStateToProps = state => ({
  summonerName: state.summonerName,
  summonerLevel: state.summonerLevel,
  summonerRank: state.summonerRank,
  summonerNameInput: state.summonerNameInput,
  matchHistory: state.matchHistory,
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

  return (
    <div className="SearchBox">
      <div id="welcome"> Welcome </div>
      <div id="inputSummonerName"> Input your Summoner Name Below </div>
      <input type="text" id="SearchBoxInput" onChange={ summonerNameData } required></input>
      <button id="SearchBoxButton" onClick={() => props.loadSummonerData(summonerNameInput)}> Submit </button>
    </div>
  );

};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
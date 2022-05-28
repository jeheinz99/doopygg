import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'

const mapStateToProps = state => ({
  championName: state.champions.championName,
});

const mapDispatchToProps = dispatch => (
  {
  loadChampionData: async (input) => {
    const championData = await actions.getChampionData(input);
    dispatch(actions.addSummonerDataActionCreator(championData));
  }
});

const ChampPageContainer = props => {
  return (
    <div className ="OuterSearchBox" id="welcome"> doopy.gg Champions </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChampPageContainer);
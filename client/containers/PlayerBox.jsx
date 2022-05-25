import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  summonerName: state.summonerName,
  summonerLevel: state.summonerLevel,
  summonerRank: state.summonerRank,
  matchHistory: state.matchHistory,
});

const SummonerBox = props => {
  return (
    <div className="SummonerBox">
    </div>
  );
};

export default connect(mapStateToProps, null)(SummonerBox);
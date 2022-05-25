import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  summonerName: state.summonerName,
  summonerLevel: state.summonerLevel,
  summonerRank: state.summonerRank,
  matchHistory: state.matchHistory,
});

const MatchesBox = props => {
  return (
    <div className="MatchesBox">

    </div>
  );
};

export default connect(mapStateToProps, null)(MatchesBox);
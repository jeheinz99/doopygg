import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  // add state here
});


const SearchBox = props => {

    return (
      <div className="SearchBox">
        <div id="welcome">Welcome</div>

        <div id="inputSummonerName">Input your Summoner Name Below</div>

        <input type="text" id="SearchBoxInput"></input>
      </div>
    );

};

export default connect(mapStateToProps, null)(SearchBox);
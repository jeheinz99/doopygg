import React, { Component } from 'react';
import { connect } from 'react-redux';

const Matches = props => {

  const { kills, deaths, assists, win, matchLength, champion, gameMode} = props;

  return (
    <div className="Matches">
      <p>Kills: {kills}</p>
      <p>Deaths: {deaths}</p>
      <p>Assists: {assists}</p>
      <p>matchLength: {matchLength}</p>
      <p>win: {win}</p>
      <p>champion: {champion}</p>
      <p>gameMode: {gameMode}</p>
    </div>
  );
};

export default Matches;
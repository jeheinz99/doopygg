import React, { Component } from 'react';
import { connect } from 'react-redux';

const Matches = props => {
  
  const { kills, deaths, assists, matchLength, champion, gameMode, id } = props;
  
  const image = `https://opgg-static.akamaized.net/images/lol/champion/${champion}.png`

  return (
    <div className="Matches" id={id}>
      <p>Kills: {kills}</p>
      <p>Deaths: {deaths}</p>
      <p>Assists: {assists}</p>
      <p>K/D/A: {`${((kills + assists) / deaths).toFixed(2)}`}</p>
      <p>Game Duration:
        <br></br>
        {`${Math.floor(Number(matchLength / 60))} minutes ${Number(matchLength) % 60} seconds`}
      </p>
      <img id="championIcon" src={image}/>
      <p>{champion}</p>
      <p>{gameMode}</p>
    </div>
  );
};

export default Matches;
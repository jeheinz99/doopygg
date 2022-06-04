import React from 'react';
import DropDownBox from './DropDownBox.jsx';

const Matches = props => {
  
  const { kills, deaths, assists, matchLength, champion, gameMode, id, championId } = props;

  const image = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;

  let boxState = false;
  return (
    <div className="Matches" id={id}>
      <p>{champion}</p>
      <img id="championIcon" src={image}/>
      <p>{gameMode}</p>
      <p>{`${Math.floor(Number(matchLength / 60))} minutes ${Number(matchLength) % 60} seconds`}</p>
      <p>Kills: {kills}</p>
      <p>Deaths: {deaths}</p>
      <p>Assists: {assists}</p>
      <p>K/D/A: {`${((kills + assists) / deaths).toFixed(2)}`}</p>
      <button onClick={(e) => console.log('hi')}> click </button>
        <div className="dropDownBox">
        {boxState === true && <DropDownBox/>}
        </div>
    </div>
  );
};

export default Matches;
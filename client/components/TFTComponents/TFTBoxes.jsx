import React from 'react';

const TFTBoxes = props => {

  const { augments, companion, damageDealt, level, matchLength, placement, setNumber, traits, units, id } = props
  // console.log(augments);
  // console.log(traits);
  // console.log(units);
  // console.log(companion);

  return (
    <div className="TFTMatches" id={id}>
      <p>Damage Dealt: {damageDealt} </p>
      <p>{`${Math.floor(Number(matchLength / 60)).toFixed(0)} minutes ${(Number(matchLength) % 60).toFixed(0)} seconds`}</p>
      <p>Level: {level} </p>
      <p>Placement: {placement}/8 </p>
      <p>Set {setNumber} </p>
    </div>
  );
};

export default TFTBoxes;
import React from 'react';

const TFTBoxes = props => {

  const { augments, companion, damageDealt, level, matchLength, placement, setNumber, traits, units, id } = props
  console.log('this is augments', augments);
  // console.log(traits);
  // console.log(units);
  // console.log(companion);
  // const augmentsArr = [];
  // for (let i = 0; i < augments.length; i++) {
  //   augmentsArr.push({img src=`https://raw.communitydragon.org/12.9/plugins/rcp-be-lol-game-data/global/default`})
  // }

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
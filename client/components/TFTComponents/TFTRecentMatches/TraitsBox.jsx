import React from 'react';

const TraitsBox = props => {

  const { id, name, count, styleCount, unitCount, tierFreq, traitIcon, placements } = props;

  const top4Percent = (((placements.top4 + placements.first)/ count)*100).toFixed();
  const nameCopy = name.replace('Set7_', '');

  return (
    // <div className="RecentTraitsBox">
      <ul>
        <li> <img id="r10trait" src={traitIcon}/> </li>
        <li> {nameCopy} </li>
        <li> {count} Games </li>
        <li> {top4Percent} % </li>
      </ul>

      
    // </div>
  );
};

export default TraitsBox;
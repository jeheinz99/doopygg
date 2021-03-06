import React from 'react';

const UnitsBox = props => {

  const { name, played, playedWithItems, unitIcon, items, rarity, placements } = props;

  const top4Percent = ((placements.top4 / played)*100).toFixed();
  const nameCopy = name.replace('TFT7_', '');

  return (
    <div className="RecentUnitsBox">
      <ul>
        <li> <img className="DDR10TFTunit" id={`Unit-${rarity}`} src={unitIcon}/> </li>
        <li> {nameCopy} </li>
        <li> {played} Games </li>
        <li> {top4Percent} % </li>
      </ul>
    </div>
  );
};

export default UnitsBox;
import React from 'react';

const UnitsBox = props => {

  const { name, played, playedWithItems, unitIcon, items } = props;

  return (
    <div className="RecentUnitsBox">
      <img className="DDTFTunit" id="unitIcon" src={unitIcon}/>
      <p>{name}</p>

      <div className="RecentUnitsBox1">
      </div>

    </div>
  );
};

export default UnitsBox;
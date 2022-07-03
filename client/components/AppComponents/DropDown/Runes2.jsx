import React from 'react';

const Runes2 = props => {

  const { runeInfo } = props;

  return (
    <div className="TreeDiv">

      <div className="Style">
        <img className="activeRune" src={runeInfo[5].icon}/>
      </div>

      <div className="Row1">
        <img className="activeRune" src={runeInfo[6].icon}/>
      </div>

      <div className="Row2">
        <img className="activeRune" src={runeInfo[7].icon}/>
      </div>

    </div>
  );
};

export default Runes2;
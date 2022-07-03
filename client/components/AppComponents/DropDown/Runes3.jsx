import React from 'react';

const Runes3 = props => {

  const { runeInfo } = props;

  return (
    <div className="TreeDiv">

      <div className="Row1">
        <img className="activeRune" src={runeInfo[8].icon}/>
      </div>

      <div className="Row2">
        <img className="activeRune" src={runeInfo[9].icon}/>
      </div>

      <div className="Row3">
        <img className="activeRune" src={runeInfo[10].icon}/>
      </div>

    </div>
  );
};

export default Runes3;
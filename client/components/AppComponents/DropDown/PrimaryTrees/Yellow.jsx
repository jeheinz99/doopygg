import React from 'react';

const Yellow = props => {

  const { runeInfo } = props;

  return (
    <div className="TreeBox">

      {/* <div className="Style">
        <img className="activeRune" src={runeInfo[4].icon}/>
      </div> */}

      <div className="Keystone">
        <img className="activeKeystone" src={runeInfo[0].icon}/>
      </div>

      <div className="Row1">
        <img className="activeRune" src={runeInfo[1].icon}/>
      </div>

      <div className="Row2">
        <img className="activeRune" src={runeInfo[2].icon}/>
      </div>

      <div className="Row3">
        <img className="activeRune" src={runeInfo[3].icon}/>
      </div>

    </div>
  );
};

export default Yellow;
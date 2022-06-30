import React from 'react';

const TraitsBox = props => {

  const { id, name, count, styleCount, unitCount, tierFreq, traitIcon } = props;
  
  return (
    <div className="RecentTraitsBox">

      <div className="RecentTraitsBox1">
        <img id="r10trait" src={traitIcon}/>
        <p>{name}</p>
      </div>

      {/* <p>{count}  Games</p> */}
      
    </div>
  );
};

export default TraitsBox;
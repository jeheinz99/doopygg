import React from 'react';
import TFTBoxes from './TFTBoxes.jsx'

const TFTMatchBoxes = props => {

  const { TFTData } = props;
  // console.log(TFTData);

  const matchList = [];
  for (let i = 0; i < TFTData.length; i++) {
    matchList.push(<TFTBoxes key={i} augments={TFTData[i].augments} companion={TFTData[i].companion} damageDealt={TFTData[i].damageDealt} level={TFTData[i].level} matchLength={TFTData[i].matchLength} placement={TFTData[i].placement} setNumber={TFTData[i].setNumber} traits={TFTData[i].traits} units={TFTData[i].units}/>)
  };

  return (
    <div id="TFTMatchBoxes" className="OuterSearchBox">
      <h4>Match History</h4>
      { matchList }
    </div>
  );
};

export default TFTMatchBoxes;
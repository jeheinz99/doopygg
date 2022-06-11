import React from 'react';
import TFTBoxes from './TFTBoxes.jsx'
import { useSelector } from 'react-redux';

const TFTMatchBoxes = () => {

  const TFTData = useSelector(state => state.tft.TFTData)

  const matchList = [];
  for (let i = 0; i < TFTData.length; i++) {
    matchList.push(<TFTBoxes key={i} id={`tftplacement-${TFTData[i].placement}`} augments={TFTData[i].augments} traitIcons={TFTData[i].traitIcons} unitIcons={TFTData[i].unitIcons} companion={TFTData[i].companion} damageDealt={TFTData[i].damageDealt} level={TFTData[i].level} matchLength={TFTData[i].matchLength} placement={TFTData[i].placement} setNumber={TFTData[i].setNumber} traits={TFTData[i].traits} units={TFTData[i].units}/>)
  };

  return (
    <div className="TFTMatchBoxes">
      <h4>Match History</h4>
      { matchList }
    </div>
  );
};

export default TFTMatchBoxes;
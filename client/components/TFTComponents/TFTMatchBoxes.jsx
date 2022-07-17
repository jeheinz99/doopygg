import React from 'react';
import TFTBoxes from './TFTBoxes.jsx'
import { useSelector } from 'react-redux';
import RecentMatchesBox from './TFTRecentMatches/TFTRecentMatchesBox.jsx';

const TFTMatchBoxes = () => {

  const TFTData = useSelector(state => state.tft.TFTData);
  const otherPlayers = useSelector(state => state.tft.otherPlayersMatches);

  const chunkArr = [];
  const chunkSize = (otherPlayers.length / TFTData.length);
  for (let i = 0; i < otherPlayers.length; i+= chunkSize) {
    const chunk = otherPlayers.slice(i, i + chunkSize);
    chunkArr.push(chunk);
  }

  const matchList = [];
  for (let i = 0; i < TFTData.length; i++) {
    matchList.push(
    <TFTBoxes 
      key={i} 
      id={`tftplacement-${TFTData[i].placement}`} 
      otherPlayers={chunkArr[i]} 
      augments={TFTData[i].augments} 
      traitIcons={TFTData[i].traitIcons} 
      unitIcons={TFTData[i].unitIcons} 
      companion={TFTData[i].companion} 
      damageDealt={TFTData[i].damageDealt} 
      level={TFTData[i].level} 
      matchLength={TFTData[i].matchLength}
      placement={TFTData[i].placement} 
      setNumber={TFTData[i].setNumber} 
      traits={TFTData[i].traits} 
      units={TFTData[i].units}
      gameEnd={TFTData[i].gameEnd}
      />);
  }

  return (
    <div className="TFTMatchBoxes">
      <h4>Match History</h4>
      <RecentMatchesBox/>
      { matchList }
    </div>
  );
};

export default TFTMatchBoxes;
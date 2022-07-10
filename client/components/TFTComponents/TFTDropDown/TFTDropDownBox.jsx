import React from "react";
import TFTPlayersDD from "./TFTPlayersDD";

const TFTDropDownBox = props => {

  const { otherPlayers } = props;

  const sortPlayers = data => {
    return otherPlayers.sort((a, b) => a.placement - b.placement);
  };
  
  const sortedPlayers = sortPlayers(otherPlayers);

  const playersArr = [];
  for (let i = 0; i < sortedPlayers.length; i++) {
    playersArr.push(<TFTPlayersDD key={`tftplayer-${i}`} name={otherPlayers[i].name} goldLeft={otherPlayers[i].goldLeft} lastRound={otherPlayers[i].lastRound} augments={otherPlayers[i].augments} companion={otherPlayers[i].companion} damageDealt={otherPlayers[i].damageDealt} level={otherPlayers[i].level} placement={otherPlayers[i].placement} traits={otherPlayers[i].traits} units={otherPlayers[i].units}/>);
  }

  return (
    <div className="TFTDDBoxWrap">
      { playersArr }
    </div>
  );

};

export default TFTDropDownBox;
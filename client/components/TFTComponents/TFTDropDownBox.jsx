import React from "react";
import TFTPlayersDD from "./TFTPlayersDD";

const TFTDropDownBox = props => {

  const { otherPlayers } = props;
  
  const playersArr = [];

  for (let i = 0; i < otherPlayers.length; i++) {
    playersArr.push(<TFTPlayersDD key={`tftplayer-${i}`} goldLeft={otherPlayers[i].goldLeft} lastRound={otherPlayers[i].lastRound} augments={otherPlayers[i].augments} companion={otherPlayers[i].companion} damageDealt={otherPlayers[i].damageDealt} level={otherPlayers[i].level} placement={otherPlayers[i].placement} traits={otherPlayers[i].traits} units={otherPlayers[i].units}/>);
  }

  return (
    <div className="TFTDDBoxWrap">
      { playersArr }
    </div>
  );

};

export default TFTDropDownBox;
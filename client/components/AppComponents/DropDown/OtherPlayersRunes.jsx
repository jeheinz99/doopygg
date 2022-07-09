import React from 'react';

const OtherPlayerRunes = props => {

  const { name, id, runes, championId } = props;
  console.log(runes, 'runes in otherplayersrunes');

  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;

  const runeIconsArr = [];
  for (let i = 0; i < runes.length; i++) {
    runeIconsArr.push(<img id={`runes`}/>)
  }

  return (
    <div className="otherPlayerRunesBox" id={`otherPlayers-${runes[4].id}`}>

      <div className="otherPlayersRunesDiv1">
        <img id="champIconRunesDD" src={championIcon}/>
        <p> {name} </p>
      </div>

      <div className="otherPlayersRunesDiv2">

        <img className="keystoneRunesDD" src={runes[0].icon}/>
        
        <div className="minorRunesDD">

          <div className="maintreeDD">
            <img className="minorRuneDD" src={runes[1].icon}/>
            <img className="minorRuneDD" src={runes[2].icon}/>
            <img className="minorRuneDD" src={runes[3].icon}/>
          </div>

          <div className="secondtreeDD">
            <img className="minorRuneDD" src={runes[6].icon}/>
            <img className="minorRuneDD" src={runes[7].icon}/>
          </div>

        </div>

        <div className="shardsDD">
          <img className="shardDD" src={runes[8].icon}/>
          <img className="shardDD" src={runes[9].icon}/>
          <img className="shardDD" src={runes[10].icon}/>
        </div>
      </div>

    </div>
  );
};

export default OtherPlayerRunes;
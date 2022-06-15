import React from 'react';

const TFTPlayersDD = props => {

  const { augments, level, companion, placement, damageDealt, traits, units, goldLeft, lastRound } = props;

  const unitsArr = [];
  const unitsArr2 =[];

  const traitsArr = [];
  const traitsArr2 = [];

  for (let i = 0; i < traits.length; i++) {
    (traitsArr.length < (traits.length / 2) ? traitsArr.push(<img key={`ddtrait-${i}`} className="TFTtrait" id={`DDTrait-${traits[i].style}`} src={traits[i].traitIcon}/>) : traitsArr2.push(<img key={`trait-${i}`} className="TFTtrait" id={`DDTrait-${traits[i].style}`} src={traits[i].traitIcon}/>));
  }

  for (let i = 0; i < units.length; i++) {
    (unitsArr.length < (units.length / 2) ? unitsArr.push(<img key={`ddunit-${i}`} className="DDTFTunit" id={`Unit-${units[i].rarity}`} src={units[i].unitIcon}/>) : unitsArr2.push(<img key={`unit-${i}`} className="DDTFTunit" id={`Unit-${units[i].rarity}`} src={units[i].unitIcon}/>));
  }

  return (
    <div className="TFTDDPlayerBox">

      <div className="TFTDDB1">
        <p>{placement}/8</p>
        <p>Level: {level}</p>
        <p>Damage Dealt: {damageDealt}</p>
      </div>

      <div className="TFTDDB2">
        <div className="LLIconDD">
          <p>summoner name</p>
          <img id="LittleLegendIconDD" src={companion}/>
        </div>
        <div className="AugListB2">
          <img id="DDAug1" src={augments[0]}/>
          <img id="DDAug2" src={augments[1]}/>
          <img id="DDAug3" src={augments[2]}/>
        </div>
        <div className="TraitListB2">
          <div className="TraitsList1">
            { traitsArr }
          </div>
          <div className="TraitsList2">
            { traitsArr2 }
          </div>
        </div>
      </div>

      <div className="TFTDDB3">
        <div className="UnitListB3">
          <div className="UnitsList1">
            { unitsArr }
          </div>
          <div className="UnitsList2">
            { unitsArr2 }
          </div>
        </div>
      </div>

      <div className="TFTDDB4">
        <div className="TFTGoldIconDiv">
          <img id="TFTGoldIconDDB4" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/mask-icon-gold.png'/>
          <p>{goldLeft}</p>
        </div>
        <div className="TFTStageIconDiv">
          <img id="TFTStageIconDDB4" src='https://raw.communitydragon.org/pbe/game/assets/ux/tft/stageicons/swordscurrent.png'/>
          <p>{lastRound}</p>
        </div>
      </div>
    </div>
  )

};

export default TFTPlayersDD;
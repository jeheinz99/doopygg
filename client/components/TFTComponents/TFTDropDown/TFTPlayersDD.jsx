import TFTDDUnitsBox from './TFTDDUnitsBox.jsx';

const TFTPlayersDD = props => {

  const { name, augments, level, companion, placement, damageDealt, traits, units, goldLeft, lastRound } = props;
  
  const getActiveTraits = data => {
    const outputArr = [];
    for (let i = 0; i < data.length; i++) {
      (data[i].tier_current > 0 ? outputArr.push(data[i]) : null);
    }
    outputArr.sort((a, b) => b.style - a.style);
    return outputArr;
  };

  const unitsArr = [];

  const traitsArr = [];
  const traitsArr2 = [];

  const activeTraits = getActiveTraits(traits);

  if (activeTraits.length <= 5) {
    for (let i = 0; i < activeTraits.length; i++) {
      traitsArr.push(<img key={`ddtrait-${i}`} className="TFTtrait" id={`DDTrait-${activeTraits[i].style}`} src={activeTraits[i].traitIcon}/>);
    }
  }
  else {
    for (let i = 0; i < activeTraits.length; i++) {
      (traitsArr.length < (activeTraits.length / 2) ? traitsArr.push(<img key={`ddtrait-${i}`} className="TFTtrait" id={`DDTrait-${activeTraits[i].style}`} src={activeTraits[i].traitIcon}/>) : traitsArr2.push(<img key={`trait-${i}`} className="TFTtrait" id={`DDTrait-${activeTraits[i].style}`} src={activeTraits[i].traitIcon}/>));
    }
  }

  for (let i = 0; i < units.length; i++) {
    unitsArr.push(<TFTDDUnitsBox unit={units[i]} key={`ddunit-${i}`} id={`Unit-${units[i].rarity}`} src={units[i].unitIcon}/>);
  }

  // converts last round to stage number
  let firstNum = 1 + Math.floor(lastRound / 6);
  let secondNum = (lastRound % 6);
  if (secondNum === 0) {
    secondNum = 6;
    firstNum -= 1;
  }
  const stage = `${firstNum} - ${secondNum}`;

  return (
    <div className="TFTDDPlayerBox">

      <div className="TFTDDB1">
        { placement === 1 && <p id={`placementnumber-${placement}`}>{placement}st</p> }
        { placement === 2 && <p id={`placementnumber-${placement}`}>{placement}nd</p> }
        { placement === 3 && <p id={`placementnumber-${placement}`}>{placement}rd</p> }
        { placement > 3 && <p id={`placementnumber-${placement}`}>{placement}th</p> }
        <p>Level: {level}</p>
        <p>Damage Dealt: {damageDealt}</p>
      </div>

      <div className="TFTDDB2">
        <div className="LLIconDD">
          <p> {name} </p>
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
            { unitsArr }
        </div>
      </div>

      <div className="TFTDDB4">
        <div className="TFTGoldIconDiv">
          <img id="TFTGoldIconDDB4" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/mask-icon-gold.png'/>
          <p>{goldLeft}</p>
        </div>
        <div className="TFTStageIconDiv">
          <img id="TFTStageIconDDB4" src='https://raw.communitydragon.org/pbe/game/assets/ux/tft/stageicons/swordscurrent.png'/>
          <p>{stage}</p>
        </div>
      </div>
    </div>
  )

};

export default TFTPlayersDD;
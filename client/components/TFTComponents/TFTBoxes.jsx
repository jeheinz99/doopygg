import React, { useState } from 'react';

const TFTBoxes = props => {

  const { augments, companion, damageDealt, level, matchLength, placement, setNumber, traits, units, id } = props
  
  console.log(id, 'id in tftboxes');

  const unitsArr = [];
  const unitsArr2 =[];

  const traitsArr = [];
  const traitsArr2 = [];

  for (let i = 0; i < traits.length; i++) {
    (traitsArr.length < (traits.length / 2) ? traitsArr.push(<img key={`trait-${i}`} className="TFTtrait" id={`Trait-${traits[i].style}`} src={traits[i].traitIcon}/>) : traitsArr2.push(<img key={`trait-${i}`} className="TFTtrait" id={`Trait-${traits[i].style}`} src={traits[i].traitIcon}/>));
  }

  for (let i = 0; i < units.length; i++) {
    (unitsArr.length < (units.length / 2) ? unitsArr.push(<img key={`unit-${i}`} className="TFTunit" id={`Unit-${units[i].rarity}`} src={units[i].unitIcon}/>) : unitsArr2.push(<img key={`unit-${i}`} className="TFTunit" id={`Unit-${units[i].rarity}`} src={units[i].unitIcon}/>));
  }

  const [open, setOpen] = useState(false);

  return (
    <div className="TFTMatches" id={id}>
      <div className="TFTMatchGroup1">
        <p>Ranked TFT</p>
        <p>{`${Math.floor(Number(matchLength / 60))}:${(Number(matchLength) % 60).toFixed()}`}</p>
        <p id={`placementnumber-${placement}`}>{placement}/8</p>
        <p>Set {setNumber} </p>
      </div>
      <div className="TFTMatchGroup2">
        <img id="LittleLegendIcon" src={companion}/>
        <p>Level: {level} </p>
        <p>Damage Dealt: { damageDealt} </p>
      </div>
      <div className="TFTMatchGroup3">
        <div className="TFTAugGroup">
          <img id="TFTAug1" src={augments[0]}/>
          <img id="TFTAug2" src={augments[1]}/>
          <img id="TFTAug3" src={augments[2]}/>
        </div>
        <div className="TFTTraitGroup">
          <div className="TFTTraitGroup1">
            { traitsArr }
          </div>
          <div className="TFTTraitGroup2">
            { traitsArr2 }
          </div>
        </div>
      </div>
      <div className="TFTMatchGroup4">
        <div className="TFTUnitGroup1">
          { unitsArr }
        </div>
        <div className="TFTUnitGroup2">
          { unitsArr2 }
        </div>
      </div>
      <div className="TFTMatchGroupButton">
      <button id="DropDownButton" onClick={(e) => setOpen(!open) }><img src={'https://upload.wikimedia.org/wikipedia/commons/d/db/Vector_down_arrow_link.svg'}/></button>
      </div>
    </div>
  );
};

export default TFTBoxes;
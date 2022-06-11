import React, { useState } from 'react';

const TFTBoxes = props => {

  const { augments, companion, damageDealt, level, matchLength, placement, setNumber, traits, traitIcons, unitIcons } = props
  
  const unitsArr = [];
  const unitsArr2 =[];

  const traitsArr = [];
  const traitsArr2 = [];

  for (let i = 0; i < traitIcons.length; i++) {
    (traitsArr.length < (traitIcons.length / 2) ? traitsArr.push(<img key={`trait-${i}`} id="TFTtrait" src={traitIcons[i]}/>) : traitsArr2.push(<img key={i} id="TFTtrait" src={traitIcons[i]}/>));
  }

  for (let i = 0; i < unitIcons.length; i++) {
    (unitsArr.length < (unitIcons.length / 2) ? unitsArr.push(<img key={`unit-${i}`} id="TFTunit" src={unitIcons[i]}/>) : unitsArr2.push(<img key={`unit-${i}`} id="TFTunit" src={unitIcons[i]}/>));
  }

  const [open, setOpen] = useState(false);

  return (
    <div className="TFTMatches">
      <div className="TFTMatchGroup1">
        <p>5v5 Ranked TFT</p>
        <p>{`${Math.floor(Number(matchLength / 60))}:${(Number(matchLength) % 60).toFixed()}`}</p>
        <p>Placement: {placement}/8 </p>
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
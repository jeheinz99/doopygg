import React, { useState } from 'react';
import TFTDropDownBox from './TFTDropDownBox.jsx';
import TFTUnitsBox from './TFTUnitsBox.jsx';

import { AiFillCaretUp } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';

const TFTBoxes = props => {

  const { augments, companion, damageDealt, level, matchLength, placement, setNumber, traits, units, id, otherPlayers } = props;

  const getActiveTraits = data => {
    const outputArr = [];
    for (let i = 0; i < data.length; i++) {
      (data[i].tier_current > 0 ? outputArr.push(data[i]) : null);
    }
    outputArr.sort((a, b) => b.style - a.style);
    return outputArr;
  };

  console.log(units, 'units');

  const unitsArr = [];

  const traitsArr = [];
  const traitsArr2 = [];

  let activeTraits = getActiveTraits(traits);

  if (activeTraits.length < 6) 
  for (let i = 0; i < activeTraits.length; i++) {
    traitsArr.push(<img key={`trait-${i}`} className="TFTtrait" id={`Trait-${activeTraits[i].style}`} src={activeTraits[i].traitIcon}/>);
  }
  else {
    for (let i = 0; i < activeTraits.length; i++) {
      (traitsArr.length < (traitsArr / 2).length ? traitsArr.push(<img key={`trait-${i}`} className="TFTtrait" id={`Trait-${activeTraits[i].style}`} src={activeTraits[i].traitIcon}/>) : traitsArr2.push(<img key={`trait-${i}`} className="TFTtrait" id={`Trait-${activeTraits[i].style}`} src={activeTraits[i].traitIcon}/>));
    }
  }

  for (let i = 0; i < units.length; i++) {
    unitsArr.push(
    <TFTUnitsBox
      unit={units[i]}
      key={`unit-${i}`}
      id={`Unit-${units[i].rarity}`}
      src={units[i].unitIcon}/>);
  }

  const [tftOpen, setOpen] = useState(false);

  return (
    <div className="TFTWrapper">
      <div className="TFTMatches" id={id}>

        <div className="TFTMatchGroup1">
          <p>Ranked TFT</p>
          <p>{`${Math.floor(Number(matchLength / 60))}:${(Number(matchLength) % 60).toFixed()}`}</p>
          <p id={`placementnumber-${placement}`}>{placement}/8</p>
          <p>Set {setNumber} </p>
        </div>

        <div className="TFTMatchGroup2">
          <img id="LittleLegendIcon" src={companion}/>
          <div className="TFTMatchGroup2Div2">
            <p>Level: {level} </p>
            <p>Damage Dealt: { damageDealt} </p>
          </div>
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

        </div>
        <div className="TFTMatchGroupButton">
          {!tftOpen && <button className="SummonerDataBoxButton" onClick={() => setOpen(!tftOpen) }><AiFillCaretDown /></button>}
          {tftOpen && <button className="SummonerDataBoxButton" onClick={() => setOpen(!tftOpen) }><AiFillCaretUp /></button>}
        </div>
      </div>
      <div className="TFTDropDownBoxes">
        { tftOpen && <TFTDropDownBox otherPlayers={otherPlayers}/> }
      </div>
    </div>
  );
};

export default TFTBoxes;
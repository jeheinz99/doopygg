import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import { getMatchTimeAgo } from '../../functions/functions.js';
import TFTDropDownBox from './TFTDropDown/TFTDropDownBox.jsx';
import TFTUnitsBox from './TFTUnitsBox.jsx';

const TFTBoxes = props => {

  const { gameMode, augments, companion, damageDealt, level, matchLength, placement, setNumber, traits, units, id, otherPlayers, gameEnd } = props;

  const summonerName = useSelector(state => state.tft.summonerName);

  const [tftOpen, setOpen] = useState(false);

  useEffect(() => {
    if (tftOpen) {
      setOpen(false);
    }
  }, [summonerName]);

  // function that omits all of the players' non-active traits
  const getActiveTraits = data => {
    const outputArr = [];
    for (let i = 0; i < data.length; i++) {
      (data[i].tier_current > 0 ? outputArr.push(data[i]) : null);
    }
    outputArr.sort((a, b) => b.style - a.style);
    return outputArr;
  };

  const timeAgo = getMatchTimeAgo(gameEnd);

  const unitsArr = [];
  
  const traitsArr = [];
  const traitsArr2 = [];

  const activeTraits = getActiveTraits(traits);

  if (activeTraits.length <= 5) {
    for (let i = 0; i < activeTraits.length; i++) {
      traitsArr.push(<img key={`trait-${i}`} className="TFTtrait" id={`Trait-${activeTraits[i].style}`} src={activeTraits[i].traitIcon}/>);
    }
  }
  else {
    for (let i = 0; i < activeTraits.length; i++) {
      (traitsArr.length < (activeTraits.length / 2) ? traitsArr.push(<img key={`trait-${i}`} className="TFTtrait" id={`Trait-${activeTraits[i].style}`} src={activeTraits[i].traitIcon}/>) : traitsArr2.push(<img key={`trait-${i}`} className="TFTtrait" id={`Trait-${activeTraits[i].style}`} src={activeTraits[i].traitIcon}/>));
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

  return (
    <div className="TFTWrapper">
      <div className="TFTMatches" id={id}>
        <div className="TFTMatchGroup1">
          <p id="tft-mg1-p1">{gameMode}</p>
          <p id="tft-mg1-p2">{timeAgo}</p>
          { placement === 1 && <p id={`placementnumber-${placement}`}>{placement}st</p> }
          { placement === 2 && <p id={`placementnumber-${placement}`}>{placement}nd</p> }
          { placement === 3 && <p id={`placementnumber-${placement}`}>{placement}rd</p> }
          <p id="tft-mg1-p3">{`${Math.floor(Number(matchLength / 60))}:${(Number(matchLength) % 60).toFixed()}`}</p>
          { placement > 3 && <p id={`placementnumber-${placement}`}>{placement}th</p> }
          <p id="tft-mg1-p4">Set {setNumber} </p>
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
          {!tftOpen && <button className="TFTDataBoxButton" onClick={() => setOpen(!tftOpen) }><AiFillCaretDown /></button>}
          {tftOpen && <button className="TFTDataBoxButton" onClick={() => setOpen(!tftOpen)}><AiFillCaretUp /></button>}
        </div>
      </div>
      <div className="TFTDropDownBoxes">
        { tftOpen && <TFTDropDownBox otherPlayers={otherPlayers}/> }
      </div>
    </div>
  );
};

export default TFTBoxes;
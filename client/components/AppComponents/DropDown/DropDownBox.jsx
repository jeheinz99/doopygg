import React, { useState, useEffect } from 'react';
import Runes1 from './Runes1.jsx';
import Runes2 from './Runes2.jsx';
import Runes3 from './Runes3.jsx';
import OtherPlayersRunes from './OtherPlayersRunes.jsx';
import ObjectivesDD from './ObjectivesDD.jsx';
import InfoBar from './InfoBar.jsx';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import DDBoxPlayers from './DDBoxPlayers.jsx';
import SkillBox from './SkillBox.jsx';
import ItemTimelineBox from './ItemTimelineBox.jsx';

const DropDownBox = props => {
  
  const { matchId, matchNum, matchLength, otherPlayers, id, championIcon, items } = props;

  const summonerName = useSelector(state => state.summoners.summonerName);
  const puuid = useSelector(state => state.summoners.puuid);

  const [currBox, toggleBox] = useState(false);
  const [lolDDboxData, lolSetDDboxData] = useState([]);
  const [timelineData, setTimelineData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await axios.post('/summoner/ddboxdata', 
      {otherPlayers, matchId, puuid}, 
      {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      lolSetDDboxData(res.data.otherPlayers);
      setTimelineData(res.data.timelineData);
    }
    getData();
  }, [summonerName]);

  // finds the current player's rune data for the current match
  const getRuneInfo = data => {
    const runeInfo = {};
    const otherPlayers = [];
    
    for (let i = 0; i < data.length; i++) {
      if (summonerName === data[i].summonerName) {
        const newObj = {};
        newObj.name = data[i].summonerName;
        newObj.runes = data[i].runes;
        newObj.championId = data[i].championId;

        otherPlayers.push(newObj);
        runeInfo.mainPlayer = data[i].runes;
      }

      else {
        const newObj = {};
        newObj.name = data[i].summonerName;
        newObj.runes = data[i].runes;
        newObj.championId = data[i].championId;

        otherPlayers.push(newObj);
      }
    }
    runeInfo.otherPlayers = otherPlayers;
    return runeInfo;
  };
  const runeInfo = getRuneInfo(lolDDboxData);

  const otherPlayersRunes = [];
  const otherPlayersRunes2 = [];
  for (let i = 0; i < runeInfo.otherPlayers.length; i++) {
    (otherPlayersRunes.length < 5 ?
    otherPlayersRunes.push(
    <OtherPlayersRunes
      key={`playerRunes-${i}`}
      id={`otherPlayerRunes-${i}`}
      championId={runeInfo.otherPlayers[i].championId}
      name={runeInfo.otherPlayers[i].name}
      runes={runeInfo.otherPlayers[i].runes} 
    />) : 
    otherPlayersRunes2.push(
    <OtherPlayersRunes
      key={`playerRunes-${i}`}
      id={`otherPlayerRunes-${i}`}
      championId={runeInfo.otherPlayers[i].championId}
      name={runeInfo.otherPlayers[i].name}
      runes={runeInfo.otherPlayers[i].runes} 
      />));
  }

  const skillLevels = [];
  const itemsArr = [];
  if (Object.keys(timelineData).length !== 0) {
    for (let i = 0; i < timelineData.skillLevels.length; i++) {
      const skills = {1: 'Q', 2: 'W', 3: 'E', 4: 'R'};
      skillLevels.push(<SkillBox key={`skill-${i}`} id={skills[timelineData.skillLevels[i].skillSlot]}/>);
    }
    for (let i = 0; i < timelineData.itemTimeline.length; i++) {
      if (timelineData.itemTimeline[i].length > 0) {
        itemsArr.push(<ItemTimelineBox key={`box-${i}`} events={timelineData.itemTimeline[i]} minute={i-1}/>);
      }
    }
  }

  return (
    <div className="DDBoxWrap">

      {currBox && otherPlayersRunes.length > 0 && 
        <div className="dd-box-routes">
          <button className="dd-box-nav-btn" onClick={() => toggleBox(!currBox)}> Overview </button>
          <button className="dd-box-nav-btn" onClick={() => toggleBox(!currBox)}> etc. </button>
        </div>}

      {currBox && otherPlayersRunes.length > 0 && 
        <div className="RunesInfoDD">
          <div className="RunesInfoMainWrap">

            <div className="RunesInfoMain">
              <div className="IconAndBuild">
                <div className="wrap-1">
                  <div className="runes-items-champicon">
                    <img id="temp" src={championIcon}/>

                    <div className="runes-itemsDiv">

                      <div className="upperHalfItems" id="upperDDbox">
                        <img id="item0" src={items[0]}/>
                        <img id="item1" src={items[1]}/>
                        <img id="item2" src={items[2]}/>
                      </div>

                      <div className="lowerHalfItems" id="lowerDDbox">
                        <img id="item3" src={items[3]}/>
                        <img id="item4" src={items[4]}/>
                        <img id="item5" src={items[5]}/>
                      </div>

                    </div>

                  </div>
                  <Runes1 matchNum={matchNum} runeInfo={runeInfo.mainPlayer}/>
                </div>
                <div className="R2andR3">
                  <Runes2 matchNum={matchNum} runeInfo={runeInfo.mainPlayer}/>
                  <Runes3 matchNum={matchNum} runeInfo={runeInfo.mainPlayer}/>
                </div>
              </div>
            </div>

            <div className="Match-timeline-main">
              <div className="match-timeline-skills-header">
                <p> Skill Order </p>
              </div>
              <div className="match-timeline-skills-div">
                { skillLevels }
              </div>

              <div className="match-timeline-items-header">
                <p> Item Build </p>
              </div>

              <div className="match-timeline-items-div">
                { itemsArr }
              </div>
            </div>

          </div>
          <div className="OtherPlayersRunes">
            <div id="otherPlayers1">
              { otherPlayersRunes }
            </div>
            <div id="otherPlayers2">
              { otherPlayersRunes2 }
            </div> 
          </div>

        </div>
        }

      {!currBox && lolDDboxData.length === 0 &&
      <div className="LoadingDiv">
        <PulseLoader color="#ffffff" size={15} speedMultiplier={0.6}/>
        <p> Loading... </p>
      </div>}

      {!currBox && lolDDboxData.length > 0 &&
      <div className="DDbox">

        <div className="dd-box-routes">
          <button className="dd-box-nav-btn" onClick={() => toggleBox(!currBox)}> Runes </button>
          <button className="dd-box-nav-btn" onClick={() => toggleBox(!currBox)}> etc. </button>
        </div>

        <div className="objectives-1">
          <ObjectivesDD otherPlayers={otherPlayers}/>
        </div>

        <InfoBar/>
        <DDBoxPlayers matchLength={matchLength} lolDDboxData={lolDDboxData}/>
      </div>}
      
    </div>
  );
}; 

export default DropDownBox;
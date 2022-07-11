import React, { useState, useEffect } from 'react';
import TeamsBoxes from './TeamsBoxes.jsx';
import Runes1 from './Runes1.jsx';
import Runes2 from './Runes2.jsx';
import Runes3 from './Runes3.jsx';
import OtherPlayersRunes from './OtherPlayersRunes.jsx';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';

import { RiSwordFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RiCameraSwitchFill } from 'react-icons/ri';
import { RiCameraSwitchLine } from 'react-icons/ri';

const DropDownBox = props => {
  
  const { matchNum, otherPlayers, id, championIcon, items } = props;

  const summonerName = useSelector(state => state.summoners.summonerName);

  const [currBox, toggleBox] = useState(false);
  const [lolDDboxData, lolSetDDboxData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.post('/summoner/ddboxdata', 
      otherPlayers, 
      {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      lolSetDDboxData(res.data);
      console.log(lolDDboxData, 'lolDDboxData');
      console.log(team1Box, 'team1Box');
      console.log(otherPlayersRunes, 'otherplayesrunes');
    }
    getData();
  }, [lolDDboxData]);

  const team1Box = [];
  const team2Box = [];

  const team1Objs = {
    barons: 0,
    dragons: 0,
    goldEarned: 0,
    turrets: 0,
  };
  const team2Objs = {
    barons: 0,
    dragons: 0,
    goldEarned: 0,
    turrets: 0,
  };

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
  
  for (let i = 0; i < lolDDboxData.length; i++) {
    (otherPlayers[i].win ? 
      team1Box.push(<TeamsBoxes 
        key={i} 
        id={`dd-winMatch`} 
        teamBarons={otherPlayers[i].barons} 
        goldEarned={otherPlayers[i].goldEarned} 
        turretKills={otherPlayers[i].turretKills} 
        dragons={otherPlayers[i].dragons} 
        summonerName={otherPlayers[i].summonerName} 
        otherPlayers={otherPlayers} 
        kills={otherPlayers[i].kills} 
        deaths={otherPlayers[i].deaths} 
        assists={otherPlayers[i].assists} 
        items={otherPlayers[i].items} 
        cs={otherPlayers[i].cs} 
        summonerSpells={otherPlayers[i].summonerSpells} 
        visionScore={otherPlayers[i].visionScore} 
        champDamage={otherPlayers[i].champDamage} 
        champLevel={otherPlayers[i].champLevel} 
        runes={otherPlayers[i].runes} 
        championId={otherPlayers[i].championId}/>) : 
      team2Box.push(<TeamsBoxes 
        key={i} 
        id={`dd-loseMatch`} 
        teamBarons={otherPlayers[i].barons} 
        goldEarned={otherPlayers[i].goldEarned} 
        turretKills={otherPlayers[i].turretKills} 
        dragons={otherPlayers[i].dragons} 
        summonerName={otherPlayers[i].summonerName} 
        otherPlayers={otherPlayers} 
        kills={otherPlayers[i].kills} 
        deaths={otherPlayers[i].deaths} 
        assists={otherPlayers[i].assists} 
        items={otherPlayers[i].items} 
        cs={otherPlayers[i].cs} 
        summonerSpells={otherPlayers[i].summonerSpells} 
        visionScore={otherPlayers[i].visionScore} 
        champDamage={otherPlayers[i].champDamage} 
        champLevel={otherPlayers[i].champLevel} 
        runes={otherPlayers[i].runes} 
        championId={otherPlayers[i].championId}/>));

    if (otherPlayers[i].win) {
      team1Objs.barons += otherPlayers[i].barons;
      team1Objs.dragons += otherPlayers[i].dragons;
      team1Objs.goldEarned += otherPlayers[i].goldEarned;
      team1Objs.turrets += otherPlayers[i].turretKills;
    }
    else {
      team2Objs.barons += otherPlayers[i].barons;
      team2Objs.dragons += otherPlayers[i].dragons;
      team2Objs.goldEarned += otherPlayers[i].goldEarned;
      team2Objs.turrets += otherPlayers[i].turretKills;
    }
  }

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

  const goldPercent = ((team1Objs.goldEarned / (team1Objs.goldEarned + team2Objs.goldEarned))*100).toFixed(0);

  console.log(lolDDboxData, 'lolDDboxData out of effect');
  console.log(team1Box, 'team1Box out of effect');
  console.log(otherPlayersRunes, 'otherplayesrunes out of effect');
  return (
    <div className="DDBoxWrap">

      {currBox && otherPlayersRunes.length > 0 && <div id="test"><button id="swapDDbox2" onClick={() => toggleBox(!currBox)}> <RiCameraSwitchLine id="historyButton"/> </button></div>}

      {currBox && otherPlayersRunes.length > 0 && 
        <div className="RunesInfoDD">

          <div className="RunesInfoMain">

            <div className="IconAndBuild">
              <img id="temp" src={championIcon}/>

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
            <Runes1 matchNum={matchNum} runeInfo={runeInfo.mainPlayer}/>
            <Runes2 matchNum={matchNum} runeInfo={runeInfo.mainPlayer}/>
            <Runes3 matchNum={matchNum} runeInfo={runeInfo.mainPlayer}/>
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

      {!currBox && team1Box.length > 0 && 
      <div className="ObjectivesDD">

        <div className="Team1ObjectivesDD">

          <div className="T1Obj1">
            <img id="BaronIconDD" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/baron-100.png'/>
            {team1Objs.barons !== NaN && <p> {team1Objs.barons} </p>}
            {team1Objs.barons === NaN && <p> 0 </p>}
          </div>

          <div className="T1Obj2">
            <img id="DragonIconDD" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/dragon-100.png'/>
            {team1Objs.dragons !== NaN && <p> {team1Objs.dragons} </p>}
            {team1Objs.dragons === NaN && <p> 0 </p>}
          </div>

          <div className="T1Obj3">
            <img id="TurretIconDD" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/tower-100.png'/>
            {team1Objs.turrets !== NaN && <p> {team1Objs.turrets} </p>}
            {team1Objs.turrets === NaN && <p> 0 </p>}
          </div>

          <div className="T1Obj4">
            <img id="GoldIconDD" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/mask-icon-gold.png'/>
            <p> {team1Objs.goldEarned} </p>
          </div>

        </div>

        <div className="goldBarDD">
          <div className="WinLossBar">
            <div className="winBar" id="goldBarDDWin" style={{width: `${goldPercent}%`}}></div>
            <div className="lossBar" id="goldBarDDLose" style={{width: `${100 - goldPercent}%`}}></div>
          </div>
        </div>

        <div className="Team2ObjectivesDD">

          <button id="swapDDbox" onClick={() => toggleBox(!currBox)}> <RiCameraSwitchFill id="runeButton"/> </button>

          <div className="T2Obj1">
            <img id="BaronIconDD" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/baron-100.png'/>
            <p> {team2Objs.barons} </p>
          </div>

          <div className="T2Obj2">
            <img id="DragonIconDD" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/dragon-100.png'/>
            <p> {team2Objs.dragons} </p>
          </div>

          <div className="T2Obj3">
            <img id="TurretIconDD" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/tower-100.png'/>
            <p> {team2Objs.turrets} </p>
          </div>

          <div className="T2Obj4">
            <img id="GoldIconDD" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/mask-icon-gold.png'/>
            <p> {team2Objs.goldEarned} </p>
          </div>
          
        </div>
        
      </div>
      }

      {!currBox && team1Box.length > 0 && 
      <div className="TeamInfoTextDD">

        <div className="TeamInfoTextDD1">
          <div className="invisDiv" id="invis1"> <p> VICTORY </p> </div>
          <p id="damageDD"><RiSwordFill id="damageDDIcon" /></p>
          <p id="csDD"><img id="csDDIcon" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/mask-icon-cs.png'/></p>
          <p id="visionDD"><img id="visionDDIcon" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png'/></p>
          <div className="invisDiv" id="invis2"></div>
        </div>

        <div className="TeamInfoTextDD2">
          <div className="invisDiv" id="invis3"> <p> DEFEAT </p> </div>
          <p id="damageDD2"><RiSwordFill id="damageDDIcon2" /></p>
          <p id="csDD2"><img id="csDDIcon2" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/mask-icon-cs.png'/></p>
          <p id="visionDD2"><img id="visionDDIcon2" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png'/></p>
          <div className="invisDiv" id="invis4"></div>
        </div>

      </div>
      }
      
      {!currBox && team1Box.length > 0 && 
      <div className="DropDownBoxMatch">
        <div className="team1BoxDD">
          { team1Box }
        </div>

        <div className="team2BoxDD">
          { team2Box }
        </div>
        {/* <div className="DDButtonDiv">
          <button id="RuneDDButton"><img id="RuneDDImage" src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/runesicon.png'/></button>
          <button id="StatDDButton"><img id="StatDDImage" src='https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodscdrscalingicon.png'/></button>
        </div> */}
      </div>
      }

      {team1Box.length === 0 && 
      <div className="LoadingDiv">
        <PulseLoader color="#ffffff" size={15} speedMultiplier={0.6}/>
        <p> Loading... </p>
      </div>
      }

    </div>
  );
}; 

export default DropDownBox;
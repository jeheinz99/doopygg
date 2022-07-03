import React, { useState } from 'react';
import TeamsBoxes from './DropDown/TeamsBoxes.jsx';
import Runes1 from './DropDown/Runes1.jsx';
import Runes2 from './DropDown/Runes2.jsx';
import Runes3 from './DropDown/Runes3.jsx';


import { RiSwordFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RiCameraSwitchFill } from 'react-icons/ri';
import { RiCameraSwitchLine } from 'react-icons/ri';

const DropDownBox = props => {
  
  const { otherPlayers, id } = props;
  const summonerName = useSelector(state => state.summoners.summonerName);

  const team1Box = [];
  const team2Box = [];

  const [currBox, toggleBox] = useState(false);

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
    for (let i = 0; i < data.length; i++) {
      if (summonerName === data[i].summonerName) {
        return data[i].runes;
      }
    }
  };
  
  for (let i = 0; i < otherPlayers.length; i++) {
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

  const runeInfo = getRuneInfo(otherPlayers);

  const goldPercent = ((team1Objs.goldEarned / (team1Objs.goldEarned + team2Objs.goldEarned))*100).toFixed(0);

  return (
    <div className="DDBoxWrap">

      {currBox && <button id="swapDDbox" onClick={() => toggleBox(!currBox)}> <RiCameraSwitchLine id="historyButton"/> </button>}

      {currBox && 
        <div className="RunesInfoDD">
        <Runes1 runeInfo={runeInfo}/>
        <Runes2 runeInfo={runeInfo}/>
        <Runes3 runeInfo={runeInfo}/>
        </div>}

      {!currBox && 
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

      {!currBox &&
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
      
      {!currBox &&
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

    </div>
  );
}; 

export default DropDownBox;
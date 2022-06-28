import React from 'react';
import TeamsBoxes from './TeamsBoxes';

import { RiSwordFill } from 'react-icons/ri';

const DropDownBox = props => {
  
  const { otherPlayers, id } = props;

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


  console.log(otherPlayers, 'otherPlayers DDBox');
  
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

  const goldPercent = ((team1Objs.goldEarned / (team1Objs.goldEarned + team2Objs.goldEarned))*100).toFixed(0);

  return (
    <div className="DDBoxWrap">

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

        {/* <div className="ObjectivesDD">
          <div className="Team1ObjectivesDD">
              <p>{team1Barons}</p>
              <p>{team1Dragons}</p>
              <p>{team1Gold}</p>
              <p>{team1Turrets}</p>
          </div>
          <div className="MiddleIconsDD">
            <img id="BaronIconDD" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/baron-100.png'/>
            <img id="DragonIconDD" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/dragon-100.png'/>
            <img id="GoldIconDD" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/mask-icon-gold.png'/>
            <img id="TurretIconDD" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/tower-100.png'/>
          </div>
          <div className="Team2ObjectivesDD">
              <p>{team2Barons}</p>
              <p>{team2Dragons}</p>
              <p>{team1Gold}</p>
              <p>{team2Turrets}</p>
          </div>
        </div> */}
        
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
    </div>
  );
}; 

export default DropDownBox;
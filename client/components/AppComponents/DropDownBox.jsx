import React from 'react';
import TeamsBoxes from './TeamsBoxes';

const DropDownBox = props => {

  const team1Box = [];
  const team2Box = [];

  let team1Barons = 0;
  let team1Turrets = 0;
  let team1Dragons = 0;
  let team1Gold = 0;

  let team2Barons = 0;
  let team2Turrets = 0;
  let team2Dragons = 0;
  let team2Gold = 0;

  const { otherPlayers, id } = props;
  
  for (let i = 0; i < otherPlayers.length; i++) {
    (otherPlayers[i].win ? team1Box.push(<TeamsBoxes key={i} teamBarons={otherPlayers[i].teamBarons} goldEarned={otherPlayers[i].goldEarned} turretKills={otherPlayers[i].turretKills} dragons={otherPlayers[i].dragons} summonerName={otherPlayers[i].summonerName} otherPlayers={otherPlayers} id={id} kills={otherPlayers[i].kills} deaths={otherPlayers[i].deaths} assists={otherPlayers[i].assists} items={otherPlayers[i].items} cs={otherPlayers[i].cs} summonerSpells={otherPlayers[i].summonerSpells} visionScore={otherPlayers[i].visionScore} champDamage={otherPlayers[i].champDamage} champLevel={otherPlayers[i].champLevel} runes={otherPlayers[i].runes} championId={otherPlayers[i].championId}/>) : 
    team2Box.push((<TeamsBoxes key={i} teamBarons={otherPlayers[i].teamBarons} goldEarned={otherPlayers[i].goldEarned} turretKills={otherPlayers[i].turretKills} dragons={otherPlayers[i].dragons} summonerName={otherPlayers[i].summonerName} otherPlayers={otherPlayers} id={id} kills={otherPlayers[i].kills} deaths={otherPlayers[i].deaths} assists={otherPlayers[i].assists} items={otherPlayers[i].items} cs={otherPlayers[i].cs} summonerSpells={otherPlayers[i].summonerSpells} visionScore={otherPlayers[i].visionScore} champDamage={otherPlayers[i].champDamage} champLevel={otherPlayers[i].champLevel} runes={otherPlayers[i].runes} championId={otherPlayers[i].championId}/>)));
  }

  return (
    <div>
      <div className="TeamInfoTextDD" id={id}>
        <div className="TeamInfoTextDD1">
          <p id="kdaDD">KDA</p>
          <p id="damageDD">Damage</p>
          <p id="csDD">CS</p>
          <p id="visionDD">Vision</p>
        </div>
        <div className="TeamInfoTextDD2">
          <p id="kdaDD2">KDA</p>
          <p id="damageDD2">Damage</p>
          <p id="csDD2">CS</p>
          <p id="visionDD2">Vision</p>
        </div>
      </div>
      <div className="DropDownBoxMatch" id={id}>
        <div className="team1BoxDD">
          { team1Box }
        </div>
        <div className="ObjectivesDD">
          <div className="Team1ObjectivesDD">
            <img id="BaronIconDD" src='https://raw.communitydragon.org/latest/game/data/images/ui/momentstimelineportraits/baron_square.png'/>
              <p>{team1Barons}</p>
            <img id="DragonIconDD" src='https://raw.communitydragon.org/latest/game/data/images/ui/momentstimelineportraits/dragon_square.png'/>
              <p>{team1Dragons}</p>
            <p>Gold: {team1Gold}</p>
            <img id="TurretIconDD" src='https://raw.communitydragon.org/latest/game/data/images/ui/momentstimelineportraits/turret_blue_square.png'/>
              <p>{team1Turrets}</p>
          </div>
          <div className="Team2ObjectivesDD">
            <img id="BaronIconDD" src='https://raw.communitydragon.org/latest/game/data/images/ui/momentstimelineportraits/baron_square.png'/>
              <p>{team2Barons}</p>
            <img id="DragonIconDD" src='https://raw.communitydragon.org/latest/game/data/images/ui/momentstimelineportraits/dragon_square.png'/>
              <p>{team2Dragons}</p>
              <p>Gold: {team1Gold}</p>
            <img id="TurretIconDD" src='https://raw.communitydragon.org/latest/game/data/images/ui/momentstimelineportraits/turret_red_square.png'/>
              <p>{team2Turrets}</p>
          </div>
        </div>
        <div className="team2BoxDD">
          { team2Box }
        </div>
        <div className="DDButtonDiv">
          <button id="RuneDDButton"><img id="RuneDDImage" src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/runesicon.png'/></button>
          <button id="StatDDButton"><img id="StatDDImage" src='https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodscdrscalingicon.png'/></button>
        </div>
      </div>
    </div>
  );
}; 

export default DropDownBox;
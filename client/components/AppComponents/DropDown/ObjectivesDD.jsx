import React from 'react';

const ObjectivesDD = props => {

  const { otherPlayers } = props;

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

  for (let i = 0; i < otherPlayers.length; i++) {
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
  );
};

export default ObjectivesDD;
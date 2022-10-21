import TeamsBoxes from './TeamsBoxes.jsx';

const DDBoxPlayers = props => {

  const { lolDDboxData, matchLength } = props;
  
  const team1Box = [];
  const team2Box = [];

  // gets top damage to get all other relative damage percents from
  const getTopDamage = () => {
    let topDamage = 0;
    for (let i = 0; i < lolDDboxData.length; i++) {
      if (lolDDboxData[i].champDamage > topDamage) topDamage = lolDDboxData[i].champDamage;
    }
    return topDamage;
  }
  const topDamage = getTopDamage();

  for (let i = 0; i < lolDDboxData.length; i++) {
    (lolDDboxData[i].win ? 
      team1Box.push(<TeamsBoxes 
      key={i} 
      id={`dd-winMatch`} 
      teamBarons={lolDDboxData[i].barons} 
      goldEarned={lolDDboxData[i].goldEarned} 
      turretKills={lolDDboxData[i].turretKills} 
      dragons={lolDDboxData[i].dragons} 
      summonerName={lolDDboxData[i].summonerName} 
      lolDDboxData={lolDDboxData} 
      kills={lolDDboxData[i].kills} 
      deaths={lolDDboxData[i].deaths} 
      assists={lolDDboxData[i].assists} 
      items={lolDDboxData[i].items} 
      cs={lolDDboxData[i].cs} 
      summonerSpells={lolDDboxData[i].summonerSpells} 
      visionScore={lolDDboxData[i].visionScore} 
      champDamage={lolDDboxData[i].champDamage}
      damagePercent={(lolDDboxData[i].champDamage / topDamage)*100}
      champLevel={lolDDboxData[i].champLevel} 
      runes={lolDDboxData[i].runes} 
      championId={lolDDboxData[i].championId}
      matchLength={matchLength}/>) 
    : 
      team2Box.push(<TeamsBoxes 
      key={i} 
      id={`dd-loseMatch`} 
      teamBarons={lolDDboxData[i].barons} 
      goldEarned={lolDDboxData[i].goldEarned} 
      turretKills={lolDDboxData[i].turretKills} 
      dragons={lolDDboxData[i].dragons} 
      summonerName={lolDDboxData[i].summonerName} 
      lolDDboxData={lolDDboxData} 
      kills={lolDDboxData[i].kills} 
      deaths={lolDDboxData[i].deaths} 
      assists={lolDDboxData[i].assists} 
      items={lolDDboxData[i].items} 
      cs={lolDDboxData[i].cs} 
      summonerSpells={lolDDboxData[i].summonerSpells} 
      visionScore={lolDDboxData[i].visionScore} 
      champDamage={lolDDboxData[i].champDamage}
      damagePercent={(lolDDboxData[i].champDamage / topDamage)*100}
      champLevel={lolDDboxData[i].champLevel} 
      runes={lolDDboxData[i].runes} 
      championId={lolDDboxData[i].championId}
      matchLength={matchLength}/>)
    );
  }
  
  return (
    <div className="DropDownBoxMatch">
      <div className="team1BoxDD">
        { team1Box }
      </div>

      <div className="team2BoxDD">
        { team2Box }
      </div>
    </div>
  );
};

export default DDBoxPlayers;
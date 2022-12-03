import { useSelector } from "react-redux";
import Tooltip from "../../SharedComponents/Tooltip";

import valorantAgents from "../../../../game-asset-data/valorant-assets/valorant-agents.json";
import valorantRankData from "../../../../game-asset-data/valorant-assets/valorant-rankdata.json";

const PlayerBox = props => {
  
  const { 
    characterId, 
    competitiveTier, 
    gameName, 
    tagLine, 
    partyId,
    playerCard,
    playerTitle,
    puuid,
    stats,
    teamId,
    totalRounds,
    roundStats
  } = props;
  
  const searchedPuuid = useSelector(state => state.valorant.searchedUser.puuid);

  const findPlayerIcons = (valorantAgents, characterId, competitiveTier) => {
    const findAgentIcon = valorantAgents.filter(({uuid}) => uuid === characterId);
    const agentIcon = findAgentIcon[0].displayIcon;
    const agentName = findAgentIcon[0].displayName;

    const findRankIcon = valorantRankData[4].tiers.filter(({tier}) => tier === competitiveTier);
    const playerRankIcon = findRankIcon[0].largeIcon;
    const playerRankTier = findRankIcon[0].tierName;

    return {
      agentData: {
        agentIcon: agentIcon,
        agentName: agentName
      },
      playerRankData: {
        playerRankIcon: playerRankIcon,
        playerRankTier: playerRankTier
      }
    };
  };
  const playerIcons = findPlayerIcons(valorantAgents, characterId, competitiveTier);

  const getPlayerRoundsData = (roundStats) => {
    let headshots = 0;
    let legshots = 0;
    let bodyshots = 0;
    let totalDamage = 0;
    let totalCombatScore = 0;
    for (let i = 0; i < roundStats.length; i++) {
      for (let j = 0; j < roundStats[i].damage.length; j++) {
        headshots += roundStats[i].damage[j].headshots;
        bodyshots += roundStats[i].damage[j].bodyshots;
        legshots += roundStats[i].damage[j].legshots;
        totalDamage += roundStats[i].damage[j].damage;
      }
      totalCombatScore += roundStats[i].combatScore;
    }
    return {
      headshots,
      legshots,
      bodyshots,
      totalDamage,
      totalCombatScore,
    }
  };
  const playerRoundsData = getPlayerRoundsData(roundStats);

  const KDA = ((stats.kills + stats.assists) / stats.deaths).toFixed(2);
  const headshotPercent = (((playerRoundsData.headshots) / (playerRoundsData.bodyshots + playerRoundsData.legshots + playerRoundsData.headshots))*100).toFixed(0);
  const averageDamage = (playerRoundsData.totalDamage / totalRounds).toFixed(1);
  const averageCombatScore = (playerRoundsData.totalCombatScore / totalRounds).toFixed(1);

  return (
    <div className="PlayerBox" id={`DD-PlayerBox-${teamId}`}>
      <Tooltip tooltipType={'image'}
        tooltipContent={playerIcons.agentData.agentName}
        width={'120px'}
        contentClassName={'dd-agent-icon'}
        content={playerIcons.agentData.agentIcon}
        leftPercent={30}/>
      {searchedPuuid === puuid ? <p className="playerbox-p-name"> {gameName}#{tagLine} </p> : <p style={{color: "#ffffff99"}} className="playerbox-p-name"> {gameName}#{tagLine} </p>}

      <div className="dd-player-rank-div">
        <img className="dd-player-rank-icon" src={playerIcons.playerRankData.playerRankIcon}/>
        <p style={{margin: 0, fontSize: "12px", color: "#ffffff99"}}> {playerIcons.playerRankData.playerRankTier} </p>
      </div>

      <div className="dd-kda-div">
        <p> {stats.kills}/{stats.deaths}/{stats.assists} </p>
        {KDA >= 1.5 && <p style={{fontSize: "12px", color: "#ffffff99"}}> K/D/A: <span className="kda-high">{KDA}</span> </p>}
        {KDA >= 1 && KDA < 1.5 && <p style={{fontSize: "12px", color: "#ffffff99"}}> K/D/A: <span className="kda-normal">{KDA}</span> </p>}
        {KDA < 1 && <p style={{fontSize: "12px", color: "#ffffff99"}}> K/D/A: <span className="kda-low">{KDA}</span> </p>}
      </div>

      <div className="avg-stats-div">
        <p className="playerbox-ptag"> {headshotPercent} <span style={{color: "#ffffff99"}}>%</span> </p>
      </div>

      <div className="avg-stats-div">
        <p className="playerbox-ptag"> {averageDamage} </p>
      </div>

      <div className="avg-stats-div">
        <p className="playerbox-ptag"> {averageCombatScore} </p>
      </div>


    </div>
  );
};

export default PlayerBox;
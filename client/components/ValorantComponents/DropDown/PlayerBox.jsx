import { useSelector } from "react-redux";
import valorantAgents from "../../../../valorant-assets/valorant-agents.json";
import valorantRankData from "../../../../valorant-assets/valorant-rankdata.json";
import Tooltip from "../../SharedComponents/Tooltip";

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
    roundStats
  } = props;
  
  const searchedPuuid = useSelector(state => state.valorant.searchedUser.puuid);

  // finds the user's data from the agent they played and checks if player won game
  // console.log({
  //   characterId,
  //   competitiveTier,
  //   partyId,
  //   playerCard,
  //   playerTitle,
  //   puuid,
  //   stats,
  //   teamId,
  //   roundStats
  // });

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

  const getPlayerRoundsData = (roundStats) => {
    let headshots = 0;
    let legshots = 0;
    let bodyshots = 0;
    let totalDamage = 0;
    for (let i = 0; i < roundStats.length; i++) {
      for (let j = 0; j < roundStats[i].damage.length; j++) {
        headshots += roundStats[i].damage[j].headshots;
        bodyshots += roundStats[i].damage[j].bodyshots;
        legshots += roundStats[i].damage[j].legshots;
        totalDamage += roundStats[i].damage[j].damage;
      }
    }
    return {
      headshots: headshots,
      legshots: legshots,
      bodyshots: bodyshots,
      totalDamage: totalDamage
    }
  };

  const playerRoundsData = getPlayerRoundsData(roundStats);
  const playerIcons = findPlayerIcons(valorantAgents, characterId, competitiveTier);
  const KDA = ((stats.kills + stats.assists) / stats.deaths).toFixed(2);
  const headshotPercent = (((playerRoundsData.headshots) / (playerRoundsData.bodyshots + playerRoundsData.legshots + playerRoundsData.headshots))*100).toFixed(0);
  const averageDamage = (playerRoundsData.totalDamage / roundStats.length).toFixed(1);

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

      <div className="accuracy-percent-div">
        <p> <span style={{fontSize: "14px", color: "#ffffff99"}}>HS: </span>{headshotPercent}% </p>
      </div>

      <div className="avg-damage-div">
        <p> <span style={{fontSize: "14px", color: "#ffffff99"}}>ADR: </span>{averageDamage} </p>
      </div>


    </div>
  );
};

export default PlayerBox;
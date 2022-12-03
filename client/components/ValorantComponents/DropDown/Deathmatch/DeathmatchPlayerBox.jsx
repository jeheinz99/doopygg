import { useSelector } from "react-redux";
import valorantAgents from "../../../../../valorant-assets/valorant-agents.json";
import Tooltip from "../../../SharedComponents/Tooltip";
import { numFormat } from "../../../../functions/functions";

const DeathmatchPlayerBox = props => {

  const { 
    kills, 
    deaths, 
    assists, 
    puuid,
    combatScore,
    gameName,
    tagLine,
    characterId,
  } = props;

  const searchedPuuid = useSelector(state => state.valorant.searchedUser.puuid);

  const findPlayerIcons = (valorantAgents, characterId) => {
    const findAgentIcon = valorantAgents.filter(({uuid}) => uuid === characterId);
    const agentIcon = findAgentIcon[0].displayIcon;
    const agentName = findAgentIcon[0].displayName;

    return {
      agentData: {
        agentIcon: agentIcon,
        agentName: agentName
      }
    };
  };
  const playerIcons = findPlayerIcons(valorantAgents, characterId)

  const KDA = ((kills + assists) / deaths).toFixed(2);

  return (
    <div className="PlayerBox" id="deathmatch-player-box">
      <Tooltip tooltipType={'image'}
        tooltipContent={playerIcons.agentData.agentName}
        width={'120px'}
        contentClassName={'dd-agent-icon'}
        content={playerIcons.agentData.agentIcon}
        leftPercent={30}/>
      {searchedPuuid === puuid ? <p className="playerbox-p-name"> {gameName}#{tagLine} </p> : <p style={{color: "#ffffff99"}} className="playerbox-p-name"> {gameName}#{tagLine} </p>}

      <p> {kills} </p>
      <p> {deaths} </p>
      <p> {assists} </p>

      {KDA >= 1.5 && <p style={{fontSize: "12px", color: "#ffffff99"}}> K/D/A: <span className="kda-high">{KDA}</span> </p>}
      {KDA >= 1 && KDA < 1.5 && <p style={{fontSize: "12px", color: "#ffffff99"}}> K/D/A: <span className="kda-normal">{KDA}</span> </p>}
      {KDA < 1 && <p style={{fontSize: "12px", color: "#ffffff99"}}> K/D/A: <span className="kda-low">{KDA}</span> </p>}

      <div className="avg-stats-div">
        <p className="playerbox-ptag"> {numFormat.format(combatScore)} </p>
      </div>

    </div>
  );
};

export default DeathmatchPlayerBox;
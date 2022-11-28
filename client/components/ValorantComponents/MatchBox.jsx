import PlayerBox from "./PlayerBox";
import valorantMaps from "../../../valorant-maps.json";
import valorantAgents from "../../../valorant-agents.json";
import { useSelector } from "react-redux";

const MatchBox = props => {

  const { players, matchInfo, roundResults, teams } = props;

  const puuid = useSelector(state => state.valorant.puuid);

  let gameType;
  if (matchInfo.isRanked) gameType = "Competitive";
  else gameType = "Standard";

  let blueWins = 0;
  let redWins = 0;

  for (let i = 0; i < roundResults.length; i++) {
    const round = roundResults[i];
    if (round.winningTeam === "Blue") {
      blueWins++;
    }
    else if (round.winningTeam === "Red") {
      redWins++;
    }
  }

  const getTimeAgo = gameEndTime => {
    const gameDateStamp = new Date(gameEndTime);
    const todaysDateStamp = Date.now();

    const diff = todaysDateStamp - gameDateStamp;
    if (diff >= 3600000 && diff < 86400000) {
      if (Math.round(diff/3600000) === 1) return ('1 hour ago');
      return (`${Math.round(diff/3600000)} hours ago`);
    }
    if (diff >= 60000 && diff < 3600000) {
      if (Math.round(diff/60000) === 1) return ('1 minute ago');
      return (`${Math.round(diff/60000)} minutes ago`);
    }
    if (diff >= 86400000 && diff < 2592000000) {
      if (Math.round(diff/86400000) === 1) return ('1 day ago');
      return (`${Math.round(diff/86400000)} days ago`);
    }
    if (diff < 60000) {
      return (`${Math.round(diff/1000)} seconds ago`);
    }
    if (diff >= 2592000000 && diff < 31540000000) {
      if (Math.round(diff/2592000000) === 1) return ('1 month ago');
      return (`${Math.round(diff/2592000000)} months ago`);
    }
    else {
      return ('over 1 year ago');
    }
  };
  const timeAgo = getTimeAgo(matchInfo.gameStartMillis);

  const getValMap = (mapId, maps) => {
    for (let i = 0; i < maps.length; i++) {
      if (maps[i].mapUrl === mapId) {
        return {
          mapImage: maps[i].listViewIcon,
          mapName: maps[i].displayName
        }
      }
    }
    return {
      mapImage: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png',
      mapName: 'N/A'
    }
  };
  const mapData = getValMap(matchInfo.mapId, valorantMaps);

  const getUserAgentData = (puuid, players, agents) => {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.puuid === puuid) {
        for (let j = 0; j < agents.length; j++) {
          const agent = agents[j];
          if (player.characterId === agent.uuid) {
            return {
              agentData: {
                agentName: agent.displayName,
                agentIcon: agent.displayIcon,
              },
              playerData: {
                kills: player.stats.kills,
                deaths: player.stats.deaths,
                assists: player.stats.assists, 
              }
            }
          }
        }
      }
    }
    return {
      agentData: {
        agentName: 'N/A',
        agentIcon: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png' 
      },
      playerData: {
        kills: 0,
        deaths: 0,
        assists: 0,
      }
    }
  };
  const userAgentData = getUserAgentData(puuid, players, valorantAgents);

  const team1Arr = [];
  const team2Arr = [];
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (player.teamId === "Blue") {
      team1Arr.push(
      <PlayerBox 
        key={`player-${i}-${player.puuid}`}
        characterId={player.characterId}
        competitiveTier={player.competitiveTier}
        gameName={player.gameName}
        tagLine={player.tagLine}
        partyId={player.partyId}
        playerCard={player.playerCard}
        playerTitle={player.playerTitle}
        puuid={player.puuid}
        state={player.stats}
        teamId={player.teamId}
      />);
    }
    else {
      team2Arr.push(
      <PlayerBox 
        key={`player-${i}-${player.puuid}`}
        characterId={player.characterId}
        competitiveTier={player.competitiveTier}
        gameName={player.gameName}
        tagLine={player.tagLine}
        partyId={player.partyId}
        playerCard={player.playerCard}
        playerTitle={player.playerTitle}
        puuid={player.puuid}
        state={player.stats}
        teamId={player.teamId}
      />);
    }
  }

  return (
    // <div className="MatchBox" style={{backgroundImage: `url(${mapData.mapImage})`, backgroundRepeat: 'no-repeat', objectFit: 'fill'}}>
    <div className="MatchBox">
      <div className="AgentInfo">
        <img className="userAgent" src={userAgentData.agentData.agentIcon} />
        <p> {userAgentData.agentData.agentName} </p>
      </div>
      <div className="MatchInfo">
        <p> {gameType} </p>
        <p> {mapData.mapName} </p>
        <p className="time-ago-p"> {timeAgo} </p>
      </div>
      <div className="TeamsBoxes">
        <div className="Team1Box">
          {team1Arr}
        </div>
        <div className="Team2Box">
          {team2Arr}
        </div>
      </div>
    </div>
  );
};

export default MatchBox;
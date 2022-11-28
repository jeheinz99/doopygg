import { useState } from "react";
import { useSelector } from "react-redux";
import PlayerBox from "./PlayerBox";
import valorantMaps from "../../../valorant-maps.json";
import valorantAgents from "../../../valorant-agents.json";
import valorantRankData from "../../../valorant-rankdata.json";

const gameModeIcons = {
  standard: "https://media.valorant-api.com/gamemodes/96bd3920-4f36-d026-2b28-c683eb0bcac5/displayicon.png",
  competitive: "https://media.valorant-api.com/gamemodes/96bd3920-4f36-d026-2b28-c683eb0bcac5/displayicon.png",
  deathmatch: "https://media.valorant-api.com/gamemodes/a8790ec5-4237-f2f0-e93b-08a8e89865b2/displayicon.png",
  escalation: "https://media.valorant-api.com/gamemodes/a4ed6518-4741-6dcb-35bd-f884aecdc859/displayicon.png",
  onboarding: "https://media.valorant-api.com/gamemodes/4744698a-4513-dc96-9c22-a9aa437e4a58/displayicon.png",
  spikerush: "https://media.valorant-api.com/gamemodes/e921d1e6-416b-c31f-1291-74930c330b7b/displayicon.png",
  practice: "https://media.valorant-api.com/gamemodes/57038d6d-49b1-3a74-c5ef-3395d9f23a97/displayicon.png",
};

const MatchBox = props => {

  const [open, setOpen] = useState(false);
  const { players, matchInfo, roundResults, teams } = props;

  const puuid = useSelector(state => state.valorant.puuid);

  let gameType;
  if (matchInfo.isRanked) gameType = "Competitive";
  else gameType = "Standard";

  let gamemodeIcon;
  (gameModeIcons[matchInfo.queueId] ? gamemodeIcon = gameModeIcons[matchInfo.queueId] : gamemodeIcon = gameModeIcons[standard]);

  let blueWins;
  let redWins;
  let winningTeam;
  let playerWin = false;

  // gets team round wins outcome
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].teamId === "Blue") {
      blueWins = teams[i].roundsWon;
      if (teams[i].won === true) winningTeam = "Blue";
    }
    else if (teams[i].teamId === "Red") {
      redWins = teams[i].roundsWon;
      if (teams[i].won === true) winningTeam = "Red";
    }
  }

  // gets how long ago game was
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

  // finds the map of the current match
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

  // finds the user's data from the agent they played and checks if player won game
  const getUserAgentData = (puuid, players, agents) => {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.puuid === puuid) {
        if (player.teamId === winningTeam) {
          playerWin = true;
        }
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

  // finds the user's rank for each match played
  const getUserRankData = (puuid, players, valorantRankData) => {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (puuid === player.puuid) {
        for (let j = 0; j < valorantRankData.length; j++) {
          const rank = valorantRankData[j];
          if (player.competitiveTier === rank.tier) {
            return {
              rankIcon: rank.largeIcon,
              rankTier: rank.tierName,
              rankDivision: rank.divisionName,
            }
          }
        }
      }
    }
  };
  const userRankData = getUserRankData(puuid, players, valorantRankData[4].tiers);

  // determines who was on blue/red teams
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
    <div className="MatchBox" id={`win-${playerWin}`}>

      <div className="AgentInfo tooltip">
        <span className="tooltiptext"> {userAgentData.agentData.agentName} </span>
        <img className="userAgent" src={userAgentData.agentData.agentIcon} />
      </div>

      <div className="MatchInfo">
        <p className="MatchInfo-p-1"> {mapData.mapName} </p>

        <div className="MatchInfo-1">
          <img className="gamemode-icon" src={gamemodeIcon} />
          <p> {gameType} </p>
        </div>

        <p className="time-ago-p"> {timeAgo} </p>
      </div>

      <div className="RankInfo">
        <div className="RankInfo-1">
          <img className="userRank" src={userRankData.rankIcon} />
          <p> {userRankData.rankTier} </p>
        </div>

        <div className="RankInfo-2">
          <p style={{color: '#2f62bb', fontSize: '32px'}}> {blueWins} </p> 
          <p style={{fontSize: '32px'}}> : </p> 
          <p style={{color: '#ad2230', fontSize: '32px'}}> {redWins} </p>
        </div>
      </div>

      <div className="StatsInfo">
        <p style={{fontSize: '24px', fontWeight: 'bold'}}>{userAgentData.playerData.kills}/{userAgentData.playerData.deaths}/{userAgentData.playerData.assists}</p>
        <p style={{margin: 0}}> K/D/A: <span style={{fontSize: '20px', margin: 0}}> {((userAgentData.playerData.kills + userAgentData.playerData.assists) / userAgentData.playerData.deaths).toFixed(2)} </span> </p>
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
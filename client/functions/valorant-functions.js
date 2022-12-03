// finds the user's data from the agent they played and checks if player won game
export const getUserAgentData = (searchedPuuid, players, agents, winningTeam) => {
  let playerWin = false;
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (player.puuid === searchedPuuid) {

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
              playerWin,
            }
          }
        }
      }
    }
  }
  // if nothing happens default return obj
  return {
    agentData: {
      agentName: 'N/A',
      agentIcon: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png' 
    },
    playerData: {
      kills: 0,
      deaths: 0,
      assists: 0,
      playerWin,
    }
  }
};

// finds the map of the current match
export const getValMap = (mapId, maps) => {
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

// finds the user's rank for each match played
export const getUserRankData = (searchedPuuid, players, valorantRankData) => {
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (searchedPuuid === player.puuid) {
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
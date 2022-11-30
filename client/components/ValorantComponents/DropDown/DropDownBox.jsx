import DDTeamHeader from "./DDTeamHeader";
import PlayerBox from "./PlayerBox";

const DropDownBox = props => {

  const { players, roundResults, playerWin } = props;

  // finds player's per-round stats (headshot%, econ, etc.)
  const findPlayerRoundStats = (players, roundResults) => {
    const playerStats = {};
    // add a key value for each player by their puuid
    for (let i = 0; i < players.length; i++) {
      playerStats[players[i].puuid] = {
        rounds: []
      };
    }

    // iterate through each round
    for (let i = 0; i < roundResults.length; i++) {
      const round = roundResults[i];
      // for each round, iterate through the player's array
      for (let j = 0; j < round.playerStats.length; j++) {
        const roundStats = round.playerStats[j];
        playerStats[roundStats.puuid].rounds.push({
          damage: roundStats.damage,
          kills: roundStats.kills,
          economy: roundStats.economy,
        });
      }
    }
    return playerStats;
  };
  const playersRoundStats = findPlayerRoundStats(players, roundResults);
  // console.log(playersRoundStats, 'players round stats');
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
        stats={player.stats}
        teamId={player.teamId}
        roundStats={playersRoundStats[player.puuid].rounds}
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
        stats={player.stats}
        teamId={player.teamId}
        roundStats={playersRoundStats[player.puuid].rounds}
      />);
    }
  }

  return (
    <div className="MatchBoxDD">
      <div className="TeamDD" id="Team1DD">
        <DDTeamHeader teamName={"Team 1"}/>
        {playerWin ? <>{team1Arr}</> : <>{team2Arr}</> }
      </div>
      <div className="TeamDD" id="Team2DD">
        <DDTeamHeader teamName={"Team 2"}/>
        {playerWin ? <>{team2Arr}</> : <>{team1Arr}</> }
      </div>
    </div>
  )
};

export default DropDownBox;
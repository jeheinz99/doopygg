import PlayerBox from "./PlayerBox";

const DropDownBox = props => {

  const { players, roundResults } = props;

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
  console.log(playersRoundStats, 'players round stats');
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
        <div className="team-header-dd" id="team1header">
          <h3> Team 1 </h3>
          <p> Riot ID </p>
          <p> Rank </p>
          <p> K/D/A </p>
          <p> HS% </p>
          <p> ADR </p>
        </div>
        {team1Arr}
      </div>
      <div className="TeamDD" id="Team2DD">
        <div className="team-header-dd" id="team2header">
          <h3> Team 2 </h3>
          <p> Riot ID </p>
          <p> Rank </p>
          <p> K/D/A </p>
          <p> HS% </p>
          <p> ADR </p>
        </div>
        {team2Arr}
      </div>
    </div>
  )
};

export default DropDownBox;
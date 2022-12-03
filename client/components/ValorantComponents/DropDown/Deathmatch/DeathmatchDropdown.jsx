import DDHeaderDeathmatch from "./DDHeaderDeathmatch";
import DeathmatchPlayerBox from "./DeathmatchPlayerBox";

const DeathmatchDropdown = props => {

  const { players } = props;

  const sortedPlayers = players.sort((a, b) => b.stats.kills - a.stats.kills);

  const playersArr = [];
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    playersArr.push(
    <DeathmatchPlayerBox
      key={`deathmatch-player-${player.puuid}-${i}`}
      kills={player.stats.kills}
      deaths={player.stats.deaths}
      assists={player.stats.assists}
      combatScore={player.stats.score}
      characterId={player.characterId}
      gameName={player.gameName}
      tagLine={player.tagLine}
      partyId={player.partyId}
      puuid={player.puuid}
    />);
  }

  return (
    <div className="MatchBoxDD">
      <DDHeaderDeathmatch />
      <div className="TeamDD">
        {playersArr}
      </div>
    </div>
  )
};

export default DeathmatchDropdown;
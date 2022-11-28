import { useSelector } from "react-redux";
import MatchBox from "./MatchBox";

const PlayerStatsContainer = props => {

  const { matchHistory } = props;

  const gameName = useSelector(state => state.valorant.gameName);
  const tagLine = useSelector(state => state.valorant.tagLine);

  const matchesArr = [];
  for (let i = 0; i < matchHistory.length; i++) {
    matchesArr.push(
    <MatchBox 
      key={`val-match-${matchHistory[i].matchInfo.matchId}`}
      players={matchHistory[i].players}
      matchInfo={matchHistory[i].matchInfo}
      roundResults={matchHistory[i].roundResults}
      teams={matchHistory[i].teams}
    />);
  }

  return (
    <div className="PlayerStatsContainer">
      <h3> {gameName}#{tagLine} </h3>
      {matchesArr}
    </div>
  );
};

export default PlayerStatsContainer;
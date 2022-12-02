import { useSelector } from "react-redux";

const PlayerInfo = props => {

  const { playerData } = props;

  const gameName = useSelector(state => state.valorant.searchedUser.gameName);
  const tagLine = useSelector(state => state.valorant.searchedUser.tagLine);

  return (
    <div className="PlayerAccountInfo">
      <img className="UserPlayercard" src={playerData.playerCardData.playerCardDisplay}/>

      <div className="acc-info-div2">
        <h3> {gameName}#{tagLine} </h3>
        <p style={{margin: 0}}> {playerData.titleData.titleDisplay} </p>
      </div>

      <div className="acc-info-div3">
        <p style={{margin: 0}}> Current Rank </p>
        <img className="userRank" src={playerData.rankData.playerRankIcon} />
        <p style={{margin: 0}}> {playerData.rankData.playerRankTier} </p>
      </div> 
    </div>
  );
};

export default PlayerInfo;
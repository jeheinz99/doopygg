import { useSelector } from "react-redux";
import MatchBox from "./MatchBox";
import valorantPlayerCards from "../../../valorant-assets/valorant-playercards.json";
import valorantTitles from "../../../valorant-assets/valorant-titles.json";
import valorantRankData from "../../../valorant-assets/valorant-rankdata.json";

const PlayerStatsContainer = props => {

  const { matchHistory } = props;
  const searchedPuuid = useSelector(state => state.valorant.searchedUser.puuid);
  const gameName = useSelector(state => state.valorant.searchedUser.gameName);
  const tagLine = useSelector(state => state.valorant.searchedUser.tagLine);

  let playerData = {};

  const findPlayerData = (players, valorantPlayerCards, valorantTitles, searchedPuuid) => {
    const findPlayerData = players.filter(({puuid}) => puuid === searchedPuuid);
    const searchedPlayerCardId = findPlayerData[0].playerCard;
    const searchedPlayerTitleId = findPlayerData[0].playerTitle;
    const searchedPlayerRankId = findPlayerData[0].competitiveTier;

    const findPlayerCard = valorantPlayerCards.filter(({uuid}) => uuid === searchedPlayerCardId);
    const findPlayerTitle = valorantTitles.filter(({uuid}) => uuid === searchedPlayerTitleId);
    const findPlayerRank = valorantRankData[4].tiers.filter(({tier}) => tier === searchedPlayerRankId);

    return {
      titleData: {
        titleDisplay: findPlayerTitle[0].titleText,
        titleId: findPlayerTitle[0].uuid,
      },
      playerCardData: {
        playerCardDisplay: findPlayerCard[0].displayIcon,
        playerCardId: findPlayerCard[0].uuid,
      },
      rankData: {
        playerRankTier: findPlayerRank[0].tierName,
        playerRankIcon: findPlayerRank[0].largeIcon,
        playerRankTierNumber: findPlayerRank[0].tier,
      }
    }
  };
  
  if (matchHistory.length > 0) {
    playerData = findPlayerData(matchHistory[0].players, valorantPlayerCards, valorantTitles, searchedPuuid);
  }


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
      {gameName !== "" && tagLine !== "" && 
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
      }
      <div className="PlayerMatchInfo">
        {matchesArr}
      </div>
    </div>
  );
};

export default PlayerStatsContainer;
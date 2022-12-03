import { useSelector } from "react-redux";
import MatchBox from "./MatchBox";
import RecentMatchesBox from "./PlayerInfo/RecentMatchesBox";
import PlayerInfo from "./PlayerInfo/PlayerInfo";
import PlayerWeaponInfo from "./PlayerInfo/PlayerWeaponInfo";
import PlayerAccuracyInfo from "./PlayerInfo/PlayerAccuracyInfo";

import valorantPlayerCards from "../../../valorant-assets/valorant-playercards.json";
import valorantTitles from "../../../valorant-assets/valorant-titles.json";
import valorantRankData from "../../../valorant-assets/valorant-rankdata.json";
import valorantWeapons from "../../../valorant-assets/valorant-weapons.json";
import DeathmatchBox from "./DeathmatchBox";

const PlayerStatsContainer = props => {

  const { matchHistory } = props;
  const searchedPuuid = useSelector(state => state.valorant.searchedUser.puuid);
  const gameName = useSelector(state => state.valorant.searchedUser.gameName);
  const tagLine = useSelector(state => state.valorant.searchedUser.tagLine);

  let playerData;
  let recent20Data;

  const findPlayerData = (players, valorantPlayerCards, valorantTitles, searchedPuuid) => {
    const getPlayerData = players.filter(({puuid}) => puuid === searchedPuuid);
    const searchedPlayerCardId = getPlayerData[0].playerCard;
    const searchedPlayerTitleId = getPlayerData[0].playerTitle;
    const searchedPlayerRankId = getPlayerData[0].competitiveTier;

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

  const findRecent20Data = (matchHistory, valorantWeapons, searchedPuuid) => {
    let totalWins = 0;
    let totalLosses = 0;

    let totalRounds = 0;
    let totalKills = 0;
    let totalDeaths = 0;
    let totalAssists = 0;

    let totalHeadShots = 0;
    let totalBodyShots = 0;
    let totalLegShots = 0;
    let totalDamage = 0;
    let totalCombatScore = 0;

    const weaponData = {};

    // iterate through each match
    for (let i = 0; i < matchHistory.length; i++) {
      const match = matchHistory[i];
      let winningTeam;

      for (let h = 0; h < match.teams.length; h++) {
        if (match.teams[h].won === true) winningTeam = match.teams[h].teamId;
      }

      // for each match, find the correct player by puuid
      const findPlayer = match.players.filter(({puuid}) => puuid === searchedPuuid);
      // iterate through their stats to get stats per game and add to total
      const playerTeam = findPlayer[0].teamId;
      if (playerTeam === winningTeam) totalWins++;
      else totalLosses++;

      const stats = findPlayer[0].stats;
      totalKills += stats.kills;
      totalDeaths += stats.deaths;
      totalAssists += stats.assists;
      totalRounds += stats.roundsPlayed;

      // for each match, iterate through each round results
      for (let j = 0; j < match.roundResults.length; j++) {
        const round = match.roundResults[j];
        // for each round, find the correct player by puuid
        const findPlayer = round.playerStats.filter(({puuid}) => puuid === searchedPuuid);

        // add the players' score to the total score
        totalCombatScore += findPlayer[0].score;

        // for the correct player, iterate through their damage data every round
        const damage = findPlayer[0].damage;
        for (let k = 0; k < damage.length; k++) {
          totalDamage += damage[k].damage;
          totalHeadShots += damage[k].headshots;
          totalBodyShots += damage[k].bodyshots;
          totalLegShots += damage[k].legshots;
        }

        // for each round, iterate through their kill data every round
        const kills = findPlayer[0].kills;
        for (let k = 0; k < kills.length; k++) {
          const findWeapon = valorantWeapons.filter(({uuid}) => uuid === (kills[k].finishingDamage.damageItem).toLowerCase());

          const weaponId = findWeapon[0].uuid.toLowerCase();
          const weaponName = findWeapon[0].displayName;
          const weaponIcon1 = findWeapon[0].displayIcon;
          const weaponIcon2 = findWeapon[0].killStreamIcon;
          if (weaponData[weaponId]) {
            weaponData[weaponId].kills++;
          }
          else {
            const newObj = {
              kills: 0,
              weaponName: '',
              icon1: '',
              icon2: '',
            };
            newObj.kills = 1;
            newObj.weaponName = weaponName;
            newObj.icon1 = weaponIcon1;
            newObj.icon2 = weaponIcon2;
            weaponData[weaponId] = newObj;
          }
        }

      }
    }
    return {
      totalWins,
      totalLosses,
      totalRounds,
      totalKills,
      totalDeaths,
      totalAssists,
      totalHeadShots,
      totalBodyShots,
      totalLegShots,
      totalDamage,
      totalCombatScore,
      weaponData,
    }
  };
  
  if (matchHistory.length > 0) {
    playerData = findPlayerData(matchHistory[0].players, valorantPlayerCards, valorantTitles, searchedPuuid);
    recent20Data = findRecent20Data(matchHistory, valorantWeapons, searchedPuuid);
  }

  const matchesArr = [];
  for (let i = 0; i < matchHistory.length; i++) {
    const match = matchHistory[i];
    if (match.matchInfo.queueId === "deathmatch") {
      matchesArr.push(
      <DeathmatchBox
        key={`val-match-${match.matchInfo.matchId}`}
        players={match.players}
        matchInfo={match.matchInfo}
        roundResults={match.roundResults}
      />);
    }
    else {
      matchesArr.push(
      <MatchBox 
        key={`val-match-${match.matchInfo.matchId}`}
        players={match.players}
        matchInfo={match.matchInfo}
        roundResults={match.roundResults}
        teams={match.teams}
      />);
    }
  }

  return (
    <div className="PlayerStatsContainer">
      {gameName !== "" && tagLine !== "" &&
        <div className="PlayerStatsColumn">
          <PlayerInfo playerData={playerData} />
          <PlayerWeaponInfo weaponData={recent20Data.weaponData} />
          <PlayerAccuracyInfo 
            headShots={recent20Data.totalHeadShots}
            bodyShots={recent20Data.totalBodyShots}
            legShots={recent20Data.totalLegShots}
          />
        </div>
      }
      <div className="PlayerMatchHistory">
        { gameName!== "" && tagLine !== "" && <RecentMatchesBox recent20Data={recent20Data} />}
        <div className="PlayerMatchInfo">
          {matchesArr}
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsContainer;
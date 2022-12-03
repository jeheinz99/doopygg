import { useState } from "react";
import { useSelector } from "react-redux";
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { getMatchTimeAgo } from "../../functions/functions";
import { getUserAgentData, getValMap, getUserRankData } from "../../functions/valorant-functions";
import DropDownBox from "./DropDown/DropDownBox";
import Tooltip from "../SharedComponents/Tooltip";

import valorantMaps from "../../../game-asset-data/valorant-assets/valorant-maps.json";
import valorantAgents from "../../../game-asset-data/valorant-assets/valorant-agents.json";
import valorantRankData from "../../../game-asset-data/valorant-assets/valorant-rankdata.json";

const gameModeIcons = {
  standard: "https://media.valorant-api.com/gamemodes/96bd3920-4f36-d026-2b28-c683eb0bcac5/displayicon.png",
  competitive: "https://media.valorant-api.com/gamemodes/96bd3920-4f36-d026-2b28-c683eb0bcac5/displayicon.png",
  escalation: "https://media.valorant-api.com/gamemodes/a4ed6518-4741-6dcb-35bd-f884aecdc859/displayicon.png",
  onboarding: "https://media.valorant-api.com/gamemodes/4744698a-4513-dc96-9c22-a9aa437e4a58/displayicon.png",
  spikerush: "https://media.valorant-api.com/gamemodes/e921d1e6-416b-c31f-1291-74930c330b7b/displayicon.png",
  practice: "https://media.valorant-api.com/gamemodes/57038d6d-49b1-3a74-c5ef-3395d9f23a97/displayicon.png",
};

const MatchBox = props => {

  const [open, setOpen] = useState(false);

  const { players, matchInfo, roundResults, teams } = props;
  
  const searchedPuuid = useSelector(state => state.valorant.searchedUser.puuid);

  const getPlayerTeam = players.filter((player) => player.puuid === searchedPuuid);
  const playerTeam = getPlayerTeam[0].teamId;

  let gameType = matchInfo.queueId;
  gameType = gameType.charAt(0).toUpperCase() + gameType.slice(1);
 
  let gamemodeIcon;
  (gameModeIcons[matchInfo.queueId] ? gamemodeIcon = gameModeIcons[matchInfo.queueId] : gamemodeIcon = gameModeIcons[standard]);

  let blueWins;
  let redWins;
  let winningTeam;
  let playerWin;
  let totalRoundsPlayed = 0;

  // gets team round wins outcome
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].teamId === "Blue") {
      blueWins = teams[i].numPoints;
      if (teams[i].won === true) winningTeam = "Blue";
    }
    else if (teams[i].teamId === "Red") {
      redWins = teams[i].numPoints;
      if (teams[i].won === true) winningTeam = "Red";
    }
    totalRoundsPlayed += teams[i].numPoints;
  }

  const timeAgo = getMatchTimeAgo(matchInfo.gameStartMillis);
  const userAgentData = getUserAgentData(searchedPuuid, players, valorantAgents, winningTeam);
  (userAgentData.playerData.playerWin === true ? playerWin = true : playerWin = false);
  const mapData = getValMap(matchInfo.mapId, valorantMaps);
  const userRankData = getUserRankData(searchedPuuid, players, valorantRankData[4].tiers);

  const getUserRoundsData = (roundResults, userPuuid) => {
    let headshots = 0;
    let legshots = 0;
    let bodyshots = 0;
    let totalDamage = 0;
    let totalCombatScore = 0;

    const playerStats = [];
    for (let i = 0; i < roundResults.length; i++) {
      const round = roundResults[i];
      // for each round, iterate through the player's array
      for (let j = 0; j < round.playerStats.length; j++) {
        const roundStats = round.playerStats[j];
        if (roundStats.puuid === userPuuid) {
          playerStats.push({
            damage: roundStats.damage,
            kills: roundStats.kills,
            economy: roundStats.economy,
            combatScore: roundStats.score,
          });
        }
      }
    }

    for (let i = 0; i < playerStats.length; i++) {
      for (let j = 0; j < playerStats[i].damage.length; j++) {
        headshots += playerStats[i].damage[j].headshots;
        bodyshots += playerStats[i].damage[j].bodyshots;
        legshots += playerStats[i].damage[j].legshots;
        totalDamage += playerStats[i].damage[j].damage;
      }
      totalCombatScore += playerStats[i].combatScore;

    }
    return {
      headshots: headshots,
      legshots: legshots,
      bodyshots: bodyshots,
      totalDamage: totalDamage,
      totalCombatScore: totalCombatScore,
    }
  };
  const userRoundsData = getUserRoundsData(roundResults, searchedPuuid);

  const headshotPercent = (((userRoundsData.headshots) / (userRoundsData.bodyshots + userRoundsData.legshots + userRoundsData.headshots))*100).toFixed(1);
  const KDA = ((userAgentData.playerData.kills + userAgentData.playerData.assists) / userAgentData.playerData.deaths).toFixed(2);
  const averageDamage = (userRoundsData.totalDamage / totalRoundsPlayed).toFixed(1);
  const averageCombatScore = (userRoundsData.totalCombatScore / totalRoundsPlayed).toFixed(1);

  return (
    <div className="OuterMatchBox">
      <div className="MatchBox" id={`win-${playerWin}`}>

        <Tooltip tooltipType={'image'}
          tooltipContent={userAgentData.agentData.agentName}
          width={'120px'}
          contentClassName={'userAgent'}
          content={userAgentData.agentData.agentIcon}
          leftPercent={25}/>

        <div className="MatchInfo">
          <p className="MatchInfo-p-1"> {mapData.mapName} </p>

          <div className="MatchInfo-1">
            <img className="gamemode-icon" src={gamemodeIcon} />
            <p> {gameType} </p>
          </div>

          <p> {timeAgo} </p>
        </div>
        
        <div className="RankInfo">
          <div className="RankInfo-1">
            <img className="userRank" src={userRankData.rankIcon} />
            <p> {userRankData.rankTier} </p>
          </div>

          <div className="RankInfo-2">
            {playerTeam === "Blue" && 
            <div className="rankinfo-2-1">
              <p style={{color: '#16e5b4'}}> {blueWins} </p> 
              <p> : </p> 
              <p style={{color: '#ff4655'}}> {redWins} </p>
            </div>
            }
            {playerTeam === "Red" && 
            <div className="rankinfo-2-1">
              <p style={{color: '#16e5b4'}}> {redWins} </p>
              <p> : </p> 
              <p style={{color: '#ff4655'}}> {blueWins} </p> 
            </div>  
            }
          </div>
        </div>
        
        <div className="statdiv-matchbox">
          <p style={{fontSize: '20px', fontWeight: 'bold', textAlign: 'center'}}>{userAgentData.playerData.kills}/{userAgentData.playerData.deaths}/{userAgentData.playerData.assists}</p>
        </div>

        {KDA >= 1.5 && 
        <div className="statdiv-matchbox">
          <p style={{fontSize: "18px", color: "#ffffff99"}}> K/D/A </p>
          <p className="kda-high"> {KDA} </p>
        </div>}

        {KDA >= 1 && KDA < 1.5 && 
        <div className="statdiv-matchbox">
          <p style={{fontSize: "18px", color: "#ffffff99"}}> K/D/A </p>
          <p className="kda-normal"> {KDA} </p>
        </div>}

        {KDA < 1 && 
        <div className="statdiv-matchbox">
          <p style={{fontSize: "18px", color: "#ffffff99"}}> K/D/A </p>
          <p className="kda-low"> {KDA} </p>
        </div>}

        <div className="statdiv-matchbox">
          <p style={{fontSize: "18px", color: "#ffffff99"}}> HS% </p>
          <p> {headshotPercent}% </p>
        </div>

        <div className="statdiv-matchbox">
          <p style={{fontSize: "18px", color: "#ffffff99"}}> ADR </p>
          <p> {averageDamage} </p>
        </div>

        <div className="statdiv-matchbox">
          <p style={{fontSize: "18px", color: "#ffffff99"}}> ACS </p>
          <p> {averageCombatScore} </p>
        </div>

        {!open && 
        <div className="dd-button-div">
          <button className="val-dd-button" onClick={() => setOpen(!open)}> 
            <AiFillCaretDown color={'white'}/> 
          </button>
        </div>}

        {open && 
        <div className="dd-button-div">
          <button className="val-dd-button" onClick={() => setOpen(!open)}> 
            <AiFillCaretUp color={'white'}/> 
          </button>
        </div>}

      </div>
      {open && 
      <DropDownBox totalRounds={totalRoundsPlayed} players={players} playerWin={playerWin} roundResults={roundResults}/>}
    </div>
  );
};

export default MatchBox;
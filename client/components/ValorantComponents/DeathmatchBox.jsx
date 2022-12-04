import { useState } from "react";
import { useSelector } from "react-redux";
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { getMatchTimeAgo, numFormat } from "../../functions/functions";
import { getUserAgentData, getValMap } from "../../functions/valorant-functions";
import Tooltip from "../SharedComponents/Tooltip";
import DeathmatchDropdown from "./DropDown/Deathmatch/DeathmatchDropdown";
import valorantMaps from "../../../game-asset-data/valorant-assets/valorant-maps.json";
import valorantAgents from "../../../game-asset-data/valorant-assets/valorant-agents.json";

const gameModeIcon = "https://media.valorant-api.com/gamemodes/a8790ec5-4237-f2f0-e93b-08a8e89865b2/displayicon.png";

const DeathmatchBox = props => {

  const [open, setOpen] = useState(false);

  const { players, matchInfo, roundResults } = props;
  
  const searchedPuuid = useSelector(state => state.valorant.searchedUser.puuid);

  let playerWin;
  let winningTeam = roundResults[0].winningTeam;

  let gameType = matchInfo.queueId;
  gameType = gameType.charAt(0).toUpperCase() + gameType.slice(1);
  
  const timeAgo = getMatchTimeAgo(matchInfo.gameStartMillis);
  const userAgentData = getUserAgentData(searchedPuuid, players, valorantAgents, winningTeam);
  (userAgentData.playerData.playerWin === true ? playerWin = true : playerWin = false);
  const mapData = getValMap(matchInfo.mapId, valorantMaps);

  const getUserRoundsData = (userPuuid, players) => {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.puuid === userPuuid) {
        return player.stats;
      }
    }
    return {
      abilityCasts: null,
      assists: 0,
      deaths: 0,
      kills: 0,
      playtimeMillis: 0,
      roundsPlayed: 0,
      score: 0,
    }
  };
  const userRoundsData = getUserRoundsData(searchedPuuid, players);

  const KDA = ((userAgentData.playerData.kills + userAgentData.playerData.assists) / userAgentData.playerData.deaths).toFixed(2);

  return (
    <div className="OuterMatchBox">

      <div className="DeathMatchBox" id={`win-${playerWin}`}>
        <Tooltip tooltipType={'image'}
          tooltipContent={userAgentData.agentData.agentName}
          width={'120px'}
          contentClassName={'userAgent'}
          content={userAgentData.agentData.agentIcon}
          leftPercent={25}/>

        <div className="MatchInfo">
          <p className="MatchInfo-p-1"> {mapData.mapName} </p>

          <div className="MatchInfo-1">
            <img className="gamemode-icon" src={gameModeIcon} />
            <p> {gameType} </p>
          </div>

          <p> {timeAgo} </p>
        </div>

        <div className="statdiv-matchbox">
          {playerWin ? <p style={{color: "#16e5b4"}}> Victory </p> : <p style={{color: "#ff4655"}}> Defeat </p>}
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
          <p style={{fontSize: "18px", color: "#ffffff99"}}> CS </p>
          <p> {numFormat.format(userRoundsData.score)} </p>
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
      <DeathmatchDropdown players={players} />}
    </div>
  );
};

export default DeathmatchBox;
import React, { useState } from 'react';
import DropDownBox from './DropDown/DropDownBox.jsx';

import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';


const Matches = props => {

  const { matchId, gameEnd, matchNum, otherPlayers, visionScore, summonerSpells, items, cs, champLevel, champDamage, kills, deaths, assists, matchLength, champion, gameMode, id, championId, runes, outcome } = props;
  
  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;

  // function that compares todays unix timestamp to the match timestamp
  const getTimeAgo = gameEndTime => {
    const gameDateStamp = new Date(gameEndTime);
    const todaysDateStamp = Date.now();

    const diff = todaysDateStamp - gameDateStamp;
    if (diff >= 3600000 && diff < 86400000) {
      if (Math.round(diff/3600000) === 1) return ('1 hour ago');
      return (`${Math.round(diff/3600000)} hours ago`);
    }
    if (diff >= 60000 && diff < 3600000) {
      if (Math.round(diff/60000) === 1) return ('1 minute ago');
      return (`${Math.round(diff/60000)} minutes ago`);
    }
    if (diff >= 86400000 && diff < 2592000000) {
      if (Math.round(diff/86400000) === 1) return ('1 day ago');
      return (`${Math.round(diff/86400000)} days ago`);
    }
    if (diff < 60000) {
      return (`${Math.round(diff/1000)} seconds ago`);
    }
    if (diff >= 2592000000 && diff < 31540000000) {
      if (Math.round(diff/2592000000) === 1) return ('1 month ago');
      return (`${Math.round(diff/2592000000)} months ago`);
    }
    else {
      return ('over 1 year ago');
    }
  };

  const timeAgo = getTimeAgo(gameEnd);

  const KDA = ((kills + assists) / deaths).toFixed(2);
  
  const [summonerOpen, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  return (
    <div className="MatchesWrapper">
      <div className="Matches" id={id}>
        <div className="MatchGroup1">
          <p>{gameMode}</p>
          <p id="p2-mg1">{timeAgo}</p>
          <p id="p3-mg1">{`${Math.floor(Number(matchLength / 60))}:${Number(matchLength) % 60}`}</p>
          {id === "winMatch" ? <p style={{color: 'blue'}}>{outcome}</p> : <p style={{color: 'red'}}>{outcome}</p>}
        </div>
        <div className="MatchGroup2">
          <img id="championIcon" src={championIcon}/>
        <div className="MatchGroup2div3">
            <img id="summonerSpellIcon1" src={summonerSpells[0]}/>
            <img id="summonerSpellIcon2" src={summonerSpells[1]}/>
        </div>
        <div className="MatchGroup2div">
          <img id="keystoneIcon" src={runes[0].icon}/>
          <img id="secondaryRuneIcon" src={runes[5].icon}/>
        </div>
        <div className="MatchGroup2div2">
          <p>{kills} / {deaths} / {assists}</p>
          {KDA === 'Infinity' && <p id="over5kda"> K/D/A: Perfect </p>}
          {KDA >= 5 && KDA !== 'Infinity' && <p id="over5kda"> K/D/A: {KDA} </p>}
          {KDA < 5 && KDA >= 3 && <p id="between3and5kda"> K/D/A: {KDA} </p>}
          {KDA < 3 && <p id="lessthan3kda"> K/D/A: {KDA} </p>}
          <p>CS: {cs} <span id="cs-m-span">({`${(cs/(matchLength/60)).toFixed(1)}`}/m)</span></p>
          <p>vision: {visionScore}</p>
        </div>
        </div>
        <div className="MatchGroup4">
          <div className="MatchGroup4div">
            <div className="upperHalfItems">
              <img title="test" id="item0" src={items[0]}/>
              <img id="item1" src={items[1]}/>
              <img id="item2" src={items[2]}/>
            </div>
            <div className="lowerHalfItems">
              <img id="item3" src={items[3]}/>
              <img id="item4" src={items[4]}/>
              <img id="item5" src={items[5]}/>
            </div>
          </div>
          <img id="item6" src={items[6]}/>
        </div>
        <div className="MatchGroup5">
          <div className="leftSidePlayers">
            <div className="leftSideGroup">
              <img className="playerChampionIcon" id="player0Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[0].championId}.png`}/>
              <p>{otherPlayers[0].summonerName}</p>
            </div>
            <div className="leftSideGroup">
              <img className="playerChampionIcon" id="player1Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[1].championId}.png`}/>
              <p>{otherPlayers[1].summonerName}</p>
            </div>
            <div className="leftSideGroup">
              <img className="playerChampionIcon" id="player2Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[2].championId}.png`}/>
              <p>{otherPlayers[2].summonerName}</p>
            </div>
            <div className="leftSideGroup">
              <img className="playerChampionIcon" id="player3Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[3].championId}.png`}/>
              <p>{otherPlayers[3].summonerName}</p>
            </div>
            <div className="leftSideGroup">
              <img className="playerChampionIcon" id="player4Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[4].championId}.png`}/>
              <p>{otherPlayers[4].summonerName}</p>
            </div>
          </div>
            <div className="rightSidePlayers">
              <div className="rightSideGroup">
                <img className="playerChampionIcon" id="player5Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[5].championId}.png`}/>
                <p>{otherPlayers[5].summonerName}</p>
              </div>
              <div className="rightSideGroup">
                <img className="playerChampionIcon" id="player6Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[6].championId}.png`}/>
                <p>{otherPlayers[6].summonerName}</p>
              </div>
              <div className="rightSideGroup">
                <img className="playerChampionIcon" id="player7Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[7].championId}.png`}/>
                <p>{otherPlayers[7].summonerName}</p>
              </div>
              <div className="rightSideGroup">
                <img className="playerChampionIcon" id="player8Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[8].championId}.png`}/>
                <p>{otherPlayers[8].summonerName}</p>
              </div>
              <div className="rightSideGroup">
                <img className="playerChampionIcon" id="player9Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[9].championId}.png`}/>
                <p>{otherPlayers[9].summonerName}</p>
              </div>
          </div>
        </div>
        <div className="MatchGroupButton">
          {!summonerOpen && <button className="SummonerDataBoxButton" onClick={ () => setOpen(!summonerOpen) }><AiFillCaretDown /></button>}
          {summonerOpen && <button className="SummonerDataBoxButton" onClick={ () => setOpen(!summonerOpen) }><AiFillCaretUp /></button>}
          {/* {summonerOpen && hidden && <button className="SummonerDataBoxButton" onClick={ () => setHidden(!hidden) }><AiFillCaretDown /></button>}
          {summonerOpen && !hidden && <button className="SummonerDataBoxButton" onClick={ () => setHidden(!hidden) }><AiFillCaretUp /></button>} */}
        </div>
      </div>
      <div className="DropDownBoxes">
        {summonerOpen && <div className={`hidden-${hidden}`}><DropDownBox matchId={ matchId } matchLength={ matchLength } championIcon={championIcon} items={items} matchNum={matchNum} otherPlayers={otherPlayers} id={id}/></div>}
      </div>
    </div>
  );
};

export default Matches;
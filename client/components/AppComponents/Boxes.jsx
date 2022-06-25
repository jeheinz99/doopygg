import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DropDownBox from './DropDownBox.jsx';


const Matches = props => {

  const { otherPlayers, visionScore, summonerSpells, items, cs, champLevel, champDamage, kills, deaths, assists, matchLength, champion, gameMode, id, championId, runes, outcome } = props;
  
  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;

  const [summonerOpen, setOpen] = useState(false);

  return (
    <div className="MatchesWrapper">
      <div className="Matches" id={id}>
        <div className="MatchGroup1">
          <p>{gameMode}</p>
          <p>{`${Math.floor(Number(matchLength / 60))}:${Number(matchLength) % 60}`}</p>
          {id === "winMatch" ? <p style={{color: 'blue'}}>{outcome}</p> : <p style={{color: 'red'}}>{outcome}</p>}
        </div>
        <div className="MatchGroup2">
          <img id="championIcon" src={championIcon}/>
        <div className="MatchGroup2div3">
            <img id="summonerSpellIcon1" src={summonerSpells[0]}/>
            <img id="summonerSpellIcon2" src={summonerSpells[1]}/>
        </div>
        <div className="MatchGroup2div">
          <img id="keystoneIcon" src={runes[0]}/>
          <img id="secondaryRuneIcon" src={runes[5]}/>
        </div>
        <div className="MatchGroup2div2">
        <p>{kills} / {deaths} / {assists}</p>
        <p>K/D/A: {`${((kills + assists) / deaths).toFixed(2)}`}</p>
        <p>CS: {cs}</p>
        <p>vision: {visionScore}</p>
        </div>
        </div>
        <div className="MatchGroup4">
          <div className="MatchGroup4div">
            <div className="upperHalfItems">
              <img id="item0" src={items[0]}/>
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
              <img id="player0Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[0].championId}.png`}/>
              <p>{otherPlayers[0].summonerName}</p>
            </div>
            <div className="leftSideGroup">
              <img id="player1Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[1].championId}.png`}/>
              <p>{otherPlayers[1].summonerName}</p>
            </div>
            <div className="leftSideGroup">
              <img id="player2Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[2].championId}.png`}/>
              <p>{otherPlayers[2].summonerName}</p>
            </div>
            <div className="leftSideGroup">
              <img id="player3Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[3].championId}.png`}/>
              <p>{otherPlayers[3].summonerName}</p>
            </div>
            <div className="leftSideGroup">
              <img id="player4Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[4].championId}.png`}/>
              <p>{otherPlayers[4].summonerName}</p>
            </div>
          </div>
            <div className="rightSidePlayers">
              <div className="rightSideGroup">
                <img id="player5Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[5].championId}.png`}/>
                <p>{otherPlayers[5].summonerName}</p>
              </div>
              <div className="rightSideGroup">
                <img id="player6Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[6].championId}.png`}/>
                <p>{otherPlayers[6].summonerName}</p>
              </div>
              <div className="rightSideGroup">
                <img id="player7Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[7].championId}.png`}/>
                <p>{otherPlayers[7].summonerName}</p>
              </div>
              <div className="rightSideGroup">
                <img id="player8Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[8].championId}.png`}/>
                <p>{otherPlayers[8].summonerName}</p>
              </div>
              <div className="rightSideGroup">
                <img id="player9Champion" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${otherPlayers[9].championId}.png`}/>
                <p>{otherPlayers[9].summonerName}</p>
              </div>
          </div>
        </div>
        <div className="MatchGroupButton">
          <button id="DropDownButton" onClick={() => setOpen(!summonerOpen) }><img src={'https://upload.wikimedia.org/wikipedia/commons/d/db/Vector_down_arrow_link.svg'}/></button>
        </div>
        </div>
      <div className="DropDownBoxes">
        {summonerOpen && <DropDownBox otherPlayers={otherPlayers} id={id} kills={kills} deaths={deaths} assists={assists} items={items} cs={cs} summonerSpells={summonerSpells} visionScore={visionScore} champDamage={champDamage} champLevel={champLevel} runes={runes} championId={championId}/>}
      </div>
    </div>
  );
};

export default Matches;
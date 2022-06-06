import React, { useState } from 'react';
import DropDownBox from './DropDownBox.jsx';


const Matches = props => {
  const { kills, deaths, assists, matchLength, champion, gameMode, id, championId, secondaryRuneTree, keystone, starShardOffense, starShardDefense, starShardFlex, outcome } = props;
  
  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;
  
  const [open, setOpen] = useState(false);
  // const summonerName = useSelector(state => state.summoner.summonerName)

  return (
    <div className="MatchesWrapper">
      <div className="Matches" id={id}>
        <div className="MatchGroup1">
          <p>{gameMode}</p>
          <p>{`${Math.floor(Number(matchLength / 60))} minutes ${Number(matchLength) % 60} seconds`}</p>
          <p>{outcome}</p>
        </div>
        <div className="MatchGroup2">
          <img id="championIcon" src={championIcon}/>
        <div className="MatchGroup2div">
          <img id="keystoneIcon" src={keystone}/>
          <img id="secondaryRuneIcon" src={secondaryRuneTree}/>
        </div>
        <div className="MatchGroup2div2">
        <p>{kills} / {deaths} / {assists}</p>
        <p>K/D/A: {`${((kills + assists) / deaths).toFixed(2)}`}</p>
        </div>
        {/* <img id="summonerSpellIcon1" src={summonerSpellIcon1}/> */}
        {/* <img id="summonerSpellIcon2" src={summonerSpellIcon2}/> */}
        </div>
        <div className="MatchGroupButton">
          <button id="DropDownButton" onClick={(e) => setOpen(!open) }><img src={'https://upload.wikimedia.org/wikipedia/commons/d/db/Vector_down_arrow_link.svg'}/></button>
        </div>
        </div>
      <div className="DropDownBoxes">
        {open && <DropDownBox />}
      </div>
    </div>
  );
};

export default Matches;
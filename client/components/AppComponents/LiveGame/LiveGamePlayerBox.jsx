import React, { useState } from 'react';
import Runes1 from '../DropDown/Runes1.jsx';
import Runes2 from '../DropDown/Runes2.jsx';
import Runes3 from '../DropDown/Runes3.jsx';

const LiveGamePlayerBox = props => {

  const { id, championId, division, losses, wins, lp, tier, profileIconId, runes, summonerName, summonerSpells, team } = props;

  const [open, setOpen] = useState(false);

  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;

  const played = wins + losses;
  const winPercent = ((wins / (played))*100).toFixed(0);

  return (
    <div className="live-game-wrapper">
      <div className="live-game-player" id={`lg-team-${team}`}>
        
        <div className="lg-icons-div">
          <img id={`lg-champicon-${team}`} src={championIcon}/>
          <div className="lg-summspells">
            <img className="lg-summ-spell" src={summonerSpells[0]}/>
            <img className="lg-summ-spell" src={summonerSpells[1]}/>
          </div>
          <div className="lg-runes">
            <img id="lg-keystone-icon" src={runes[0].icon}/>
            <img id="lg-rune-style-icon" src={runes[5].icon}/>
          </div>
        </div>

        <p id="lg-summoner-name">{summonerName}</p>

        {tier === undefined ? 
        <div className="lg-rank-div">
          <img id="lg-rank-icon" src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/unranked.png"/>
          <p> Unranked </p>
        </div> :
        <div className="lg-rank-div">
          <img id="lg-rank-icon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${tier.toLowerCase()}.png`}/>
          <p> {tier} {division} {lp}LP </p>
        </div>}
        
        {tier === undefined ?
        <p> - </p> :
        <div className="lg-winrate-div">
          {winPercent < 60 && !isNaN(winPercent) && <p>{winPercent}% <span> {`(${played} Played)`}</span></p>}
          {winPercent >= 60 && winPercent < 70 && !isNaN(winPercent) && <p id="above60wr">{winPercent}% <span> {`(${played} Played)`} </span></p>}
          {winPercent >= 70 && !isNaN(winPercent) && <p id="above70wr">{winPercent}% <span> {`(${played} Played)`} </span></p>}
          {isNaN(winPercent) && <p id="exact100wr">{winPercent}% <span> {`(${played} Played)`} </span></p>}
          <div className="WinLossBar" id="lg-win-loss-bar">
            {winPercent < 60 && !isNaN(winPercent) && <div className="winBar" id="lg-winbar" style={{width: `${winPercent}%`}}/>}
            {winPercent >= 60 && winPercent < 70 && <div className="winBar" id="lg-winbar-above60wr" style={{width: `${winPercent}%`}}/>}
            {winPercent >= 70 && !isNaN(winPercent) && <div className="winBar" id="lg-winbar-above70wr" style={{width: `${winPercent}%`}}/>}
            {isNaN(winPercent) && <div className="winBar" id="lg-winbar-exact100wr" style={{width: `${winPercent}%`}}/>}
            <div className="lossBar" id="lg-lossbar" style={{width: `${100 - winPercent}%`}}></div>
          </div>
        </div>}

        <button id="lg-runes-button" onClick={() => setOpen(!open)}> Runes </button>
      </div>
      {open && 
      <div className="lg-runes-dropdown-box">
        <div>
          <Runes1 matchNum={id} runeInfo={runes}/>
        </div>
        <div>
          <Runes2 matchNum={id} runeInfo={runes}/>
        </div>
        <div>
          <Runes3 matchNum={id} runeInfo={runes}/>
        </div>
      </div>}
    </div>
  );
};

export default LiveGamePlayerBox;
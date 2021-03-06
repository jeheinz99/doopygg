import React from 'react';

const SummonerChampDataBoxEntry = props => {

  const { kills, deaths, assists, win, loss, championId, id, played } = props;

  const KDA = ((kills + assists) / deaths).toFixed(2);
  const winPercent = ((win / (win + loss))*100).toFixed(0);

  const avgKills = (kills / (win + loss)).toFixed(1);
  const avgAssists = (assists / (win + loss)).toFixed(1);
  const avgDeaths = (deaths / (win + loss)).toFixed(1);

  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;

  return (
    <div className="champEntryWrapper">
      <div className="champEntry">
      
        <div className="champEntryDiv1">
          <img id="champEntryChampIcon" src={championIcon}/>
          <p>{id}</p>
        </div>
        
        <div className="champEntryDiv2">
          {KDA === 'Infinity' && <p id="over5kda"> K/D/A: Perfect </p>}
          {KDA >= 5 && KDA !== 'Infinity' && <p id="over5kda"> K/D/A: {((kills + assists) / deaths).toFixed(2)} </p>}
          {KDA < 5 && KDA >= 3 && <p id="between3and5kda"> K/D/A: {((kills + assists) / deaths).toFixed(2)} </p>}
          {KDA < 3 && <p id="lessthan3kda"> K/D/A: {((kills + assists) / deaths).toFixed(2)} </p>}
          <p>{avgKills} / <span id="avgDeathsSpanTag">{avgDeaths}</span> / {avgAssists}</p> 
        </div>

        <div className="champEntryDiv3">
          {isNaN(winPercent) && <p id="exact100wr"> 100% </p>}
          {!isNaN(winPercent) && winPercent >= 60 && <p id="above60wr"> {winPercent}% </p>}
          {!isNaN(winPercent) && winPercent < 60 && <p id="below60wr"> {winPercent}% </p>}
          {played === 1 ? <p id="gamesPlayedLast20ptag1"> {played} Game</p> : <p id="gamesPlayedLast20ptag1"> {played} Games</p>}
        </div>

        <div className="champEntryDiv4">
          <div className="WinLossBar">
            <div className="winBar" id="RPWinBar" style={{width: `${winPercent}%`}}>
              {win !== 0 && <p>{win}W</p>}
            </div>
            <div className="lossBar" id="RPWinBar" style={{width: `${100 - winPercent}%`}}>
              {loss !== 0 && <p>{loss}L</p>}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SummonerChampDataBoxEntry;
import React from 'react';

const Recent20Champion = props => {

  const { kills, deaths, assists, win, loss, played, cs, champDamage, id, championId, championName } = props;

  const avgKills = (kills / (win + loss)).toFixed(1);
  const avgDeaths = (deaths / (win + loss)).toFixed(1);
  const avgAssists = (assists / (win + loss)).toFixed(1);

  const winPercent = ((win / (win + loss))*100).toFixed(0);
  const KDA = ((kills + assists) / deaths).toFixed(2);

  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;

  return (
    <div className="Recent20ChampCard">

      <div className="Recent20ChampCardDiv1">
        <img id="championIconRecent20" src={championIcon}/>
      </div>
      
      <div className="Recent20ChampCardDiv2">
        <div className="Recent20ChampCardDiv2box1">
          <div className="kdaAvgsR20">
            {KDA === 'Infinity' && <p id="over5kda"> K/D/A: Perfect </p>}
            {KDA >= 5 && KDA !== 'Infinity' && <p id="over5kda"> K/D/A: {((kills + assists) / deaths).toFixed(2)} </p>}
            {KDA < 5 && KDA >= 3 && <p id="between3and5kda"> K/D/A: {((kills + assists) / deaths).toFixed(2)} </p>}
            {KDA < 3 && <p id="lessthan3kda"> K/D/A: {((kills + assists) / deaths).toFixed(2)} </p>}
            <p>{avgKills} / <span id="avgDeathsSpanTag">{avgDeaths}</span> / {avgAssists}</p>            
          </div>

          {isNaN(winPercent) && <p id="exact100wr"> 100% </p>}
          {!isNaN(winPercent) && winPercent >= 60 && <p id="above60wr"> {winPercent}% </p>}
          {!isNaN(winPercent) && winPercent < 60 && <p id="below60wr"> {winPercent}% </p>}
          <div className="gamesPlayedLast20">
            {played === 1 ? <p id="gamesPlayedLast20ptag1"> {played} Game</p> : <p id="gamesPlayedLast20ptag1"> {played} Games</p>}
            <p id="gamesPlayedLast20ptag2"> {`(${win}W`} - {`${loss}L)`} </p>
          </div>
        </div>

      </div>
      <div className="Recent20ChampCardDiv3">
        
      </div>

    </div>
  );
};

export default Recent20Champion;
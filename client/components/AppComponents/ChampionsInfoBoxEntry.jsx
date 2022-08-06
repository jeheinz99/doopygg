import React from 'react';

const ChampionsInfoBoxEntry = props => {

  const { championId, id, kills, deaths, assists, played, win, loss, cs, champDamage, gold, csPerMin, doubleKills, tripleKills, quadraKills, pentaKills, damageTaken } = props;

  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;
  
  // number format to get commas in large numbers
  const numFormat = new Intl.NumberFormat('en-US');

  // getting avg of all stats
  const KDA = ((kills + assists) / deaths).toFixed(2);
  const winPercent = ((win / played)*100).toFixed(0);

  const avgKills = (kills / played).toFixed(1);
  const avgAssists = (assists / played).toFixed(1);
  const avgDeaths = (deaths / played).toFixed(1);

  const avgGold = (gold / played).toFixed(0);
  const avgDamage = (champDamage / played).toFixed(0);
  const avgDamageTaken = (damageTaken / played).toFixed(0);
  const avgCS = (cs / played).toFixed(1);
  const avgCSperMin = (csPerMin / played).toFixed(1);

  return (
    <div className="championsInfoEntryBox">

      <div className="championsInfoEntry1">
        <img id="champions-entry-icon" src={championIcon}/>
        <p>{id}</p>
      </div>

      <div className="championsInfoEntry2">
        <div className="WinLossBar">
          <div className="winBar" id="ci-winbar" style={{width: `${winPercent}%`}}>
            {win !== 0 && <p>{win}W</p>}
          </div>
          <div className="lossBar" id="ci-winbar" style={{width: `${100 - winPercent}%`}}>
            {loss !== 0 && <p>{loss}L</p>}
          </div>
        </div>
        <p id="ci-wl-percent">{winPercent}% W/L</p>
      </div>

      <div className="championsInfoEntry3">
        {KDA === 'Infinity' && <p className="ci-kda-tag" id="over5kda"> Perfect </p>}
        {KDA >= 5 && KDA !== 'Infinity' && <p className="ci-kda-tag" id="over5kda"> {((kills + assists) / deaths).toFixed(2)} </p>}
        {KDA < 5 && KDA >= 3 && <p className="ci-kda-tag" id="between3and5kda"> {((kills + assists) / deaths).toFixed(2)} </p>}
        {KDA < 3 && <p className="ci-kda-tag" id="lessthan3kda"> {((kills + assists) / deaths).toFixed(2)} </p>}
        <p className="ci-kda-subtag">{avgKills} / <span id="avgDeathsSpanTag">{avgDeaths}</span> / {avgAssists}</p>
      </div>

      <div className="championsInfoEntry4">
        <p>{numFormat.format(avgGold)}</p>
      </div>

      <div className="championsInfoEntry5">
        <p>{avgCS} <span id="ci-csmin">({avgCSperMin})</span></p>
      </div>

      <div className="championsInfoEntry6">
        <p>{numFormat.format(avgDamage)}</p>
      </div>

      <div className="championsInfoEntry7">
        <p>{numFormat.format(avgDamageTaken)}</p>
      </div>

      <div className="championsInfoEntry8">
        <p>{doubleKills}</p>
      </div>

      <div className="championsInfoEntry9">
        <p>{tripleKills}</p>
      </div>

      <div className="championsInfoEntry10">
        <p>{quadraKills}</p>
      </div>

      <div className="championsInfoEntry11">
        <p>{pentaKills}</p>
      </div>
    </div>
  );
};

export default ChampionsInfoBoxEntry;
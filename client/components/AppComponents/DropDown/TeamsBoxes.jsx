import React from "react";

const TeamsBoxes = props => {

  const { id, damagePercent, matchLength, kills, deaths, assists, items, cs, summonerSpells, visionScore, champDamage, champLevel, runes, championId, summonerName } = props;
  // allows to get commas in large numbers
  const numFormat = new Intl.NumberFormat('en-US');
  
  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;
  const KDA = ((kills + assists) / deaths).toFixed(2);

  return (
      <div className="Team1DropDownBox" id={id}>
        <div className="Player0Team1ChampIcon">
          <img id="Player0Champion" src={championIcon}/>
          <div className="level-div" id="level-matchbox">{champLevel}</div>
        </div>
        <div className="Player0Team1SummonerSpells">
          <img id="summonerSpellIcon1DropDown" src={summonerSpells[0]}/>
          <img id="summonerSpellIcon2DropDown" src={summonerSpells[1]}/>
        </div>
        <div className="Player0Team1Runes">
          <img id="Player0Team1Keystone" src={runes[0].icon}/>
          <img id="Player0Team1SecondaryTree" src={runes[5].icon}/>
        </div>
        <div className="Player0Team1Info">
          <p>{summonerName}</p>
        </div>
        <div className="Player0Team1KDA">
          <p>{kills} / {deaths} / {assists}</p>
          {KDA === 'Infinity' && <p id="over5kda"> K/D/A: Perfect </p>}
          {KDA >= 5 && KDA !== 'Infinity' && <p id="over5kda"> K/D/A: {((kills + assists) / deaths).toFixed(2)} </p>}
          {KDA < 5 && KDA >= 3 && <p id="between3and5kda"> K/D/A: {((kills + assists) / deaths).toFixed(2)} </p>}
          {KDA < 3 && <p id="lessthan3kda"> K/D/A: {((kills + assists) / deaths).toFixed(2)} </p>}
        </div>
        <div className="Player0Team1Damage">
          <p>{numFormat.format(champDamage)}</p>
          <div className="WinLossBar" id="dd-damage-bar">
            {damagePercent === 100 ? <div className="winBar" id={`${id}-damagebar-100`} style={{width: `${damagePercent}%`}}/> : <div className="winBar" id={`${id}-damagebar`} style={{width: `${damagePercent}%`}}/>}
            {damagePercent !== 100 && <div className="lossBar" id="dd-damagebar-grey" style={{width: `${100 - damagePercent}%`}}></div>}
          </div>
        </div>
        <div className="Player0Team1CS">
          <p>{cs}</p>
          <p id="dd-cs-m">{`(${(cs / (matchLength/60)).toFixed(1)})`}</p>
        </div>
        <div className="Player0Team1VisionScore">
          <p>{visionScore}</p>
        </div>
        <div className="Player0Team1Items">
          <div className="upperHalfItemsDD">
            <img id="item0DD" src={items[0]}/>
            <img id="item1DD" src={items[1]}/>
            <img id="item2DD" src={items[2]}/>
          </div>
          <div className="lowerHalfItemsDD">
            <img id="item3DD" src={items[3]}/>
            <img id="item4DD" src={items[4]}/>
            <img id="item5DD" src={items[5]}/>
          </div>
        </div>            
      </div>
  )
};

export default TeamsBoxes;
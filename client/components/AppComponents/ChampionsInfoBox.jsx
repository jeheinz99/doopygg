import { useSelector } from 'react-redux';
import ChampionsInfoBoxEntry from './ChampionsInfoBoxEntry.jsx';
import CustomSelect from './CustomSelect.jsx';

const ChampionsInfoBox = () => {
  const allMatchesPlayedData = useSelector(state => state.summoners.allMatchesPlayedData);
  
  const orderData = data => {

    const tempArr = [];

    for (let i in data) {
      tempArr.push(data[i]);
    }
    
    tempArr.sort((a, b) => {
      return ((b.played - a.played) === 0 ? (((b.kills + b.assists) / b.deaths) - ((a.kills + a.assists) / a.deaths)) : b.played - a.played);
    });

    return {
      top5Played: [tempArr[0], tempArr[1], tempArr[2], tempArr[3], tempArr[4]],
      allPlayed: tempArr,
    };
  };

  const champData = {};
  // console.log(allMatchesPlayedData, 'all matches played data');
  for (let i = 0; i < allMatchesPlayedData.length; i++) {
    if (allMatchesPlayedData[i] !== undefined) {
      if (champData[allMatchesPlayedData[i].championName] && champData) {
        champData[allMatchesPlayedData[i].championName].kills += allMatchesPlayedData[i].kills;
        champData[allMatchesPlayedData[i].championName].deaths += allMatchesPlayedData[i].deaths;
        champData[allMatchesPlayedData[i].championName].assists += allMatchesPlayedData[i].assists;
        champData[allMatchesPlayedData[i].championName].champDamage += allMatchesPlayedData[i].champDamage;
        champData[allMatchesPlayedData[i].championName].damageTaken += allMatchesPlayedData[i].damageTaken;
        champData[allMatchesPlayedData[i].championName].cs += allMatchesPlayedData[i].cs;
        champData[allMatchesPlayedData[i].championName].gold += allMatchesPlayedData[i].gold;
        champData[allMatchesPlayedData[i].championName].csPerMin += allMatchesPlayedData[i].csPerMin;
        champData[allMatchesPlayedData[i].championName].positions[allMatchesPlayedData[i].position] += 1;
        champData[allMatchesPlayedData[i].championName].doubleKills += allMatchesPlayedData[i].doubleKills;
        champData[allMatchesPlayedData[i].championName].tripleKills += allMatchesPlayedData[i].tripleKills;
        champData[allMatchesPlayedData[i].championName].quadraKills += allMatchesPlayedData[i].quadraKills;
        champData[allMatchesPlayedData[i].championName].pentaKills += allMatchesPlayedData[i].pentaKills;
        champData[allMatchesPlayedData[i].championName].played += 1;

  
        (allMatchesPlayedData[i].win === true ? champData[allMatchesPlayedData[i].championName].win += 1 : champData[allMatchesPlayedData[i].championName].loss += 1);
  
      }
  
      else {
        const newObj = {};
  
        newObj.championName = allMatchesPlayedData[i].championName;
        newObj.championId = allMatchesPlayedData[i].championId;
        newObj.kills = allMatchesPlayedData[i].kills;
        newObj.gold = allMatchesPlayedData[i].gold;
        newObj.deaths = allMatchesPlayedData[i].deaths;
        newObj.assists = allMatchesPlayedData[i].assists;
        newObj.champDamage = allMatchesPlayedData[i].champDamage;
        newObj.damageTaken = allMatchesPlayedData[i].damageTaken;
        newObj.cs = allMatchesPlayedData[i].cs;
        newObj.csPerMin = allMatchesPlayedData[i].csPerMin;
        newObj.doubleKills = allMatchesPlayedData[i].doubleKills;
        newObj.tripleKills = allMatchesPlayedData[i].tripleKills;
        newObj.quadraKills = allMatchesPlayedData[i].quadraKills;
        newObj.pentaKills = allMatchesPlayedData[i].pentaKills;
        newObj.played = 1;

        newObj.positions = {'TOP': 0, 'JUNGLE': 0, 'MIDDLE': 0, 'BOTTOM': 0, 'UTILITY': 0, '': 0, 'Invalid': 0};
        newObj.positions[allMatchesPlayedData[i].position] = 1;

        if (allMatchesPlayedData[i].win === true) {
          newObj.win = 1;
          newObj.loss = 0;
        }
        else {
          newObj.win = 0;
          newObj.loss = 1;
        }
        champData[allMatchesPlayedData[i].championName] = newObj;
      }
    }
  }
  const orderedData = orderData(champData);

  const allChampEntries = [];
  for (let i = 0; i < orderedData.allPlayed.length; i++) {
    if (orderedData.allPlayed[i] !== undefined) {
    allChampEntries.push(<ChampionsInfoBoxEntry
      key={`champions-champ-entry-${i}`}
      championId={orderedData.allPlayed[i].championId}
      id={orderedData.allPlayed[i].championName}
      kills={orderedData.allPlayed[i].kills}
      deaths={orderedData.allPlayed[i].deaths}
      assists={orderedData.allPlayed[i].assists}
      played={orderedData.allPlayed[i].played}
      win={orderedData.allPlayed[i].win}
      loss={orderedData.allPlayed[i].loss}
      cs={orderedData.allPlayed[i].cs}
      csPerMin={orderedData.allPlayed[i].csPerMin}
      champDamage={orderedData.allPlayed[i].champDamage}
      gold={orderedData.allPlayed[i].gold}
      damageTaken={orderedData.allPlayed[i].damageTaken}
      doubleKills={orderedData.allPlayed[i].doubleKills}
      tripleKills={orderedData.allPlayed[i].tripleKills}
      quadraKills={orderedData.allPlayed[i].quadraKills}
      pentaKills={orderedData.allPlayed[i].pentaKills}
      />);
    }
  }

  return (
    <div className="ChampionsInfoBox">
      <div className="season-select">
        <CustomSelect id={'season-select-btn'} selectType={'seasons'} init={'Season 13'}/>
      </div>
      <ul>
        <li id="ci-champion"><p>Champion</p></li>
        <li id="ci-played"><p>Played</p></li>
        <li id="ci-kda"><p>KDA</p></li>
        <li id="ci-gold"><p>Gold</p></li>
        <li id="ci-cs"><p>CS</p></li>
        <li id="ci-damage"><p>Damage Dealt</p></li>
        <li id="ci-damage-taken"><p>Damage Taken</p></li>
        <li id="ci-double-kills"><p>Doubles</p></li>
        <li id="ci-triple-kills"><p>Triples</p></li>
        <li id="ci-quadra-kills"><p>Quadras</p></li>
        <li id="ci-penta-kills"><p>Pentas</p></li>
      </ul>
      {allChampEntries}
    </div>
  );
};

export default ChampionsInfoBox;
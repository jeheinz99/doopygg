import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import DropDownBox from './DropDown/DropDownBox.jsx';
import MatchBoxTeamPlayers from './MatchBoxTeamPlayers.jsx';

const numsObj = {
  1: '01',
  2: '02',
  3: '03',
  4: '04',
  5: '05',
  6: '06',
  7: '07',
  8: '08',
  9: '09'
};

const Matches = props => {

  const { matchId, gameEnd, matchNum, otherPlayers, visionScore, summonerSpells, items, cs, champLevel, champDamage, kills, deaths, assists, matchLength, champion, gameMode, id, championId, runes, outcome } = props;
  
  const [summonerOpen, setOpen] = useState(false);

  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;
  const summonerName = useSelector(state => state.summoners.summonerName);
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
  
  // whenever component is re-rendered, close the dropdown box
  useEffect(() => {
    if (summonerOpen) {
      setOpen(false);
    }
  }, [summonerName]);

  const matchBoxTeamsArr1 = [];
  const matchBoxTeamsArr2 = [];
  for (let i = 0; i < otherPlayers.length; i++) {
    matchBoxTeamsArr1.length < 5 ? 
    matchBoxTeamsArr1.push(<MatchBoxTeamPlayers
      key={`${matchId}-player-${i}`}
      summonerName={otherPlayers[i].summonerName}
      championId={otherPlayers[i].championId}/>) 
    :
    matchBoxTeamsArr2.push(<MatchBoxTeamPlayers
      key={`${matchId}-player-${i}`}
      summonerName={otherPlayers[i].summonerName}
      championId={otherPlayers[i].championId}/>);
  }
  const matchLength1 = Math.floor(Number(Math.round(matchLength) / 60));
  let matchLength2 = Number(Math.round(matchLength)) % 60;
  // just a check from cache for numbers 1-9 to turn into 01-09
  if (numsObj[matchLength2]) matchLength2 = numsObj[matchLength2];

  return (
    <div className="MatchesWrapper">
      <div className="Matches" id={id}>
        <div className="MatchGroup1">
          <p>{gameMode}</p>
          <p id="p2-mg1">{timeAgo}</p>
          <p id="p3-mg1">{`${matchLength1}:${matchLength2}`}</p>
          {id === "winMatch" ? <p style={{color: 'blue'}}>{outcome}</p> : <p style={{color: 'red'}}>{outcome}</p>}
        </div>
        <div className="MatchGroup2">
          <div className="championIcon-and-Level">
            <img id="championIcon" src={championIcon}/>
            <div className="level-div">{champLevel}</div>
          </div>
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
            {KDA === 'Infinity' && <p id="over5kda"> K/D/A: <span>Perfect</span> </p>}
            {KDA >= 5 && KDA !== 'Infinity' && <p id="over5kda"> K/D/A: <span>{KDA}</span></p>}
            {KDA < 5 && KDA >= 3 && <p id="between3and5kda"> K/D/A: <span>{KDA}</span> </p>}
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
            {matchBoxTeamsArr1}
          </div>
          <div className="rightSidePlayers">
            {matchBoxTeamsArr2}
          </div>
        </div>
        <div className="MatchGroupButton">
          {!summonerOpen && <button className="SummonerDataBoxButton" onClick={ () => setOpen(!summonerOpen) }><AiFillCaretDown /></button>}
          {summonerOpen && <button className="SummonerDataBoxButton" onClick={ () => setOpen(!summonerOpen) }><AiFillCaretUp /></button>}
        </div>
      </div>
      <div className="DropDownBoxes">
        {summonerOpen && 
        <DropDownBox 
        runes={runes} 
        summonerSpells={summonerSpells} 
        champLevel={champLevel} 
        kills={kills} deaths={deaths} 
        assists={assists} 
        championId={championId} 
        matchId={matchId} 
        matchLength={matchLength} 
        championIcon={championIcon} 
        items={items} 
        matchNum={matchNum} 
        otherPlayers={otherPlayers} 
        id={id}/>}
      </div>
    </div>
  );
};

export default Matches;
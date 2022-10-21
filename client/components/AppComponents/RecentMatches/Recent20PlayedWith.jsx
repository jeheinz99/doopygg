import { useSelector } from 'react-redux';
import R20PlayedEntry from './Recent20PlayedEntry.jsx';

const Recent20PlayedWith = () => {

  const matchHistory = useSelector(state => state.summoners.matchHistory);
  const otherPlayersMatches = useSelector(state => state.summoners.otherPlayersMatches);

  const orderPlayedWith = data => {
    const tempArr = [];
    for (let i in data) {
      if (data[i].played > 1 && tempArr.length < 11) tempArr.push(data[i]);
    }
    tempArr.sort((a, b) => {
      return ((b.played - a.played) === 0 ? (b.win - a.win) : (b.played - a.played));
    });
    return tempArr;
  };

  const chunkArr = [];
  const chunkSize = (otherPlayersMatches.length / matchHistory.length);
  for (let i = 0; i < otherPlayersMatches.length; i+= chunkSize) {
    const chunk = otherPlayersMatches.slice(i, i + chunkSize);
    chunkArr.push(chunk);
  }

  // cache to store who the summoner played with
  const playedWith = {};

  // iterate through chunk arr, each index being the 10 players in 1 match
  // store each player and their appearences in the cache
  for (let i = 0; i < chunkArr.length; i++) {
    for (let j = 0; j < chunkArr[i].length; j++) {
      const player = chunkArr[i][j].summonerName;
      if (playedWith[player]) {
        playedWith[player].played += 1;
        (chunkArr[i][j].win === true ? playedWith[player].win += 1 : playedWith[player].loss += 1);
      }
      else {
        const newObj = {};
        newObj.summonerName = player;
        newObj.played = 1;
        newObj.profileIcon = chunkArr[i][j].profileIcon;
        if (chunkArr[i][j].win === true) {
          newObj.win = 1;
          newObj.loss = 0;
        }
        else {
          newObj.win = 0;
          newObj.loss = 1;
        }
        playedWith[player] = newObj;
      }
    }
  }

  const mostPlayedWith = orderPlayedWith(playedWith);
  const recentPlayedArr = [];
  for (let i = 1; i < mostPlayedWith.length; i++) {
    recentPlayedArr.push(
    <R20PlayedEntry 
    key={`r20-player-${i}`} 
    summonerName={mostPlayedWith[i].summonerName} 
    played={mostPlayedWith[i].played}
    win={mostPlayedWith[i].win}
    loss={mostPlayedWith[i].loss}
    profileIconId={mostPlayedWith[i].profileIcon}/>);
  }

  return (
    <div className="recent-20-played-box">
      <div className="recent-20-played-header">
        <p> Recently Played With </p>
      </div>

      <ul>
        <li><p id="id1"> Summoner </p></li>
        <li><p> Played </p></li>
        <li><p> W - L </p></li>
        <li><p> % W - L </p></li>
      </ul>

      {recentPlayedArr}
    </div>
  );
};

export default Recent20PlayedWith;


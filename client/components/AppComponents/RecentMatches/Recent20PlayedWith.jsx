import React from 'react';
import { useSelector } from 'react-redux';
import R20PlayedEntry from './Recent20PlayedEntry.jsx';

const Recent20PlayedWith = () => {

  const matchHistory = useSelector(state => state.summoners.matchHistory);
  const otherPlayersMatches = useSelector(state => state.summoners.otherPlayersMatches);
  const summonerName = useSelector(state => state.summoners.summonerName);
  const puuid = useSelector(state => state.summoners.puuid);

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

  // function to get who the summoner played with frequently in recent matches
  const getRecentPlayedWith = data => {
    // cache to store who the summoner played with
    const playedWith = {};

    // findPlayerTeam will just iterate to find the current player in an array of data to find which team they were on
    const findPlayerTeam = players => {
      for (let i = 0; i < players.length; i++) {
        if (players[i].summonerName === summonerName || players[i].puuid === puuid) {
          // return whether the player won or lost to know which team they were on
          return players[i].win;
        }
      }
    };

    // data is an array of arrays, each subarray being 1 game with 10 players
    for (let i = 0; i < data.length; i++) {
      // for each subarray, determine who was on the summoner's team first
      const playerTeam = findPlayerTeam(data[i]);
      // once we find what team the player was on, iterate through the rest of the players
      for (let j = 0; j < data[i].length; j++) {
        // if the player was on the same team, then add to playedWith cache
        if (data[i][j].win === playerTeam) {
          const player = data[i][j].summonerName;
          // now check if they already exist in the cache and add to existing or create new entry accordingly
          if (playedWith[player]) {
            playedWith[player].played += 1;
            (data[i][j].win === true ? playedWith[player].win += 1 : playedWith[player].loss += 1);
          }
          else {
            const newObj = {};
            newObj.summonerName = player;
            newObj.played = 1;
            newObj.profileIcon = data[i][j].profileIcon;
            if (data[i][j].win === true) {
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
    }
    return playedWith;
  };
  
  const chunkArr = [];
  const chunkSize = (otherPlayersMatches.length / matchHistory.length);
  for (let i = 0; i < otherPlayersMatches.length; i+= chunkSize) {
    const chunk = otherPlayersMatches.slice(i, i + chunkSize);
    chunkArr.push(chunk);
  }

  const recentPlayedWith = getRecentPlayedWith(chunkArr);
  const mostPlayedWith = orderPlayedWith(recentPlayedWith);

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


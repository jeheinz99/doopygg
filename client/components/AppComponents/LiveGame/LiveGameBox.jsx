import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import LiveGamePlayerBox from './LiveGamePlayerBox.jsx';
import { PulseLoader } from 'react-spinners';

const LiveGameBox = () => {

  const summonerName = useSelector(state => state.summoners.summonerName);
  const [liveGameData, setLiveGameData] = useState('loading');

  useEffect(() => {
    const getLiveGameData = async () => {
      try {
        const res = await axios.get(`/summoner/livegamedata/${summonerName}`);
        // console.log(res.data, 'res.data');
        setLiveGameData(res.data);
      }
      catch(err) {
        setLiveGameData(null);
      }
    };
    getLiveGameData();
  }, []);

  const team1 = [];
  const team2 = [];
  if (liveGameData !== null && liveGameData !== 'loading') {
    for (let i = 0; i < liveGameData.playerInfo.length; i++) {
      (
        liveGameData.playerInfo[i].team === 100 ? 
        team1.push(<LiveGamePlayerBox
          key={`live-player-${liveGameData.playerInfo[i].summonerName}`}
          championId={liveGameData.playerInfo[i].championId}
          runes={liveGameData.playerInfo[i].runes}
          summonerName={liveGameData.playerInfo[i].summonerName}
          summonerSpells={liveGameData.playerInfo[i].summonerSpells}
          team={liveGameData.playerInfo[i].team}/>) : 
        team2.push(<LiveGamePlayerBox
          key={`live-player-${liveGameData.playerInfo[i].summonerName}`}
          championId={liveGameData.playerInfo[i].championId}
          runes={liveGameData.playerInfo[i].runes}
          summonerName={liveGameData.playerInfo[i].summonerName}
          summonerSpells={liveGameData.playerInfo[i].summonerSpells}
          team={liveGameData.playerInfo[i].team}/>)
      )
    }
  }

  return (
    <div>

      {liveGameData === 'loading' &&
        <div className="not-in-live-game">
          <div className="LoadingDiv">
            <PulseLoader color="#ffffff" size={15} speedMultiplier={0.6}/>
            <p> Loading... </p>
          </div>
        </div>}

      {liveGameData === null && 
      <div className="not-in-live-game">
        <p>{`${summonerName}`} is not currently in game</p>
        <p>If you are currently in game, please refresh the page or try again later.</p>  
      </div>}

      {liveGameData !== null && liveGameData !== 'loading' &&
      <div className="in-live-game-box">
        <p className="one-temp"> {`${summonerName}`} is currently in-game!</p>
        <p className="one-temp"> But this tab is still currently under development.</p>  
        <div className="lg-queue-bg-div">
          <p id="lg-queue-header">{liveGameData.queueType}</p>
        </div>
          

        <div className="lg-teams">
          <div className="lg-team" id="lg-team1">
            {team1}
          </div>

          <div className="lg-team" id="lg-team2">
            {team2}
          </div>
        </div>

      </div>
      }

    </div>
  )
};

export default LiveGameBox;
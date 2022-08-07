import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';

const LiveGameBox = () => {

  const summonerName = useSelector(state => state.summoners.summonerName);
  const [liveGameData, setLiveGameData] = useState(null);

  useEffect(() => {
    const getLiveGameData = async () => {
      try {
        const res = await axios.get(`/summoner/livegamedata/${summonerName}`);
        setLiveGameData(res.data);
      }
      catch(err) {
        setLiveGameData(null);
      }
    };
    getLiveGameData();
  }, []);

  return (
    <div>
      {liveGameData === null && 
      <div className="not-in-live-game">
        <p>{`${summonerName}`} is not currently in game</p>
        <p>If you are currently in game, please refresh the page or try again later.</p>  
      </div>}

      {liveGameData !== null && 
      <div className="not-in-live-game">
        <p> {`${summonerName}`} is currently in-game!</p>
        <p> But this tab is still currently under development.</p>
      </div>}
    </div>
  )
};

export default LiveGameBox;
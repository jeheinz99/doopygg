import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';

const LiveGameBox = () => {

  const summonerName = useSelector(state => state.summoners.summonerName);
  const [liveGameData, setLiveGameData] = useState(null);

  useEffect(() => {
    const getLiveGameData = async () => {
      const res = await axios.get(`/summoner/livegamedata/${summonerName}`);
      setLiveGameData(res.data);
    };
    if (liveGameData === null) {
      getLiveGameData();
    }
  }, []);

  return (
    <div>
      {liveGameData === null && 
      <div>
        <p>Summoner is not currently in a live game</p>  
      </div>
      }
      hello
    </div>
  )
};

export default LiveGameBox;
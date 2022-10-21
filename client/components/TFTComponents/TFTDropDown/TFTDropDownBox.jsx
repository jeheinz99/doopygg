import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';
import TFTPlayersDD from './TFTPlayersDD';

const TFTDropDownBox = props => {

  const { otherPlayers } = props;
  const summonerName = useSelector(state => state.tft.summonerName);
  const regionId = useSelector(state => state.tft.region);

  const [DDboxData, setDDboxData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.post('/tft/ddboxdata', 
      {otherPlayers, regionId}, 
      {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const sortedData = res.data.sort((a, b) => a.placement - b.placement);
      setDDboxData(sortedData);
    }
    if (DDboxData) {
      setDDboxData([]);
    }
    getData();
  }, [summonerName]);

  const playersArr = [];
  for (let i = 0; i < DDboxData.length; i++) {
    playersArr.push(
    <TFTPlayersDD
      key={`tftplayer-${i}`} 
      name={DDboxData[i].name} 
      goldLeft={DDboxData[i].goldLeft} 
      lastRound={DDboxData[i].lastRound} 
      augments={DDboxData[i].augments} 
      companion={DDboxData[i].companion} 
      damageDealt={DDboxData[i].damageDealt} 
      level={DDboxData[i].level} 
      placement={DDboxData[i].placement} 
      traits={DDboxData[i].traits} 
      units={DDboxData[i].units}/>
    );
  }

  return (
    <div className="TFTDDBoxWrap">

      { playersArr.length === 0 ? 
      <div className="LoadingDiv">
        <PulseLoader color="#ffffff" size={15} speedMultiplier={0.6}/>
        <p> Loading... </p>
      </div> 
        : 
      <div>{playersArr}</div>}

    </div>
  );
};

export default TFTDropDownBox;
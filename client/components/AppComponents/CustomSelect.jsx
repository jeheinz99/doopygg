import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiChevronDown } from 'react-icons/bi';
import axios from 'axios';

const CustomSelect = props => {

  const { id, selectType, init } = props;
  if (selectType === 'gameTypes') {
    const matchHistory = useSelector(state => state.summoners.matchHistory);
    const aramMatchesPlayedData = useSelector(state => state.summoners.aramMatchesPlayedData);
    const rankedMatchesPlayedData = useSelector(state => state.summoners.rankedMatchesPlayedData);
    const flexMatchesPlayedData = useSelector(state => state.summoners.flexMatchesPlayedData);
    const clashMatchesPlayedData = useSelector(state => state.summoners.clashMatchesPlayedData);
    const botMatchesPlayedData = useSelector(state => state.summoners.botMatchesPlayedData);
  } 

  const dispatch = useDispatch();
  
  const [selected, setSelected] = useState(init);
  const [hidden, toggleHidden] = useState(true);
  // if (selectType === 'gameTypes') {
  //   console.log(selected, 'selected');
  // }

  // useEffect(() => {
  //   if (selectType === 'gameTypes') {
  //     const queueIds = {
  //       'RankedSolo': [420],
  //       'RankedFlex': [440],
  //       'Normals': [400, 430],
  //       'ARAM': [450],
  //       'Clash': [700],
  //       'Bot': [31, 32, 33, 800, 810, 820, 830, 840, 850],
  //     };
  //     const ids = queueIds[selected];
  //   }
  //   if (selected === 'ARAM') {
  //     dispatch()
  //   }
  // }, [selected, selectType]);

  const regions = {
    'NA': 'na1',
    'EUW': 'euw1',
    'EUN': 'eun1',
    'OCE': 'oc1',
    'KR': 'kr',
    'JP': 'jp1',
    'LAS': 'la1',
    'LAN': 'la2',
    'TR': 'tr1',
    'RU': 'ru'
  };
  const queues = {
    'Ranked Solo': 'RANKED_SOLO_5X5',
    'Ranked Flex': 'RANKED_FLEX_SR'
  };
  const tiers = {
    'Challenger': 'CHALLENGER',
    'Grandmaster': 'GRANDMASTER',
    'Master': 'MASTER',
    'Diamond': 'DIAMOND',
    'Platinum': 'PLATINUM',
    'Gold': 'GOLD',
    'Silver': 'SILVER',
    'Bronze': 'BRONZE',
    'Iron': 'Iron'
  };
  const divisions = {
    'I': 'I',
    'II': 'II',
    'III': 'III',
    'IV': 'IV'
  };
  const gameTypes = {
    'All': 'All',
    'RankedSolo': 'Ranked Solo',
    'RankedFlex': 'Ranked Flex',
    'Normals': 'Normals',
    'ARAM': 'ARAM',
    'Clash': 'Clash',
    'Bot': 'Bot',
    'Other': 'Other'
  };
  const seasons = {
    'Season 13': 'S13'
  };

  const selectBoxes = [];
  if (selectType === 'regions') {
    const setRegion = id => {
      setSelected(id);
      toggleHidden(!hidden);
    };
    for (let regionName in regions) {
      selectBoxes.push(<button key={`region-${regionName}`} className="region-btn" onClick={() => setRegion(regionName)}>{regionName}</button>);
    }
  }
  else if (selectType === 'queues') {
    const setQueue = id => {
      setSelected(id);
      toggleHidden(!hidden);
    };
    for (let queueName in queues) {
      selectBoxes.push(<button key={`queue-${queueName}`} className="queue-btn" onClick={() => setQueue(queueName)}>{queueName}</button>);
    }
  }
  else if (selectType === 'tiers') {
    const setTier = id => {
      setSelected(id);
      toggleHidden(!hidden);
    };
    for (let tierName in tiers) {
      selectBoxes.push(<button key={`tier-${tierName}`} className="tier-btn" onClick={() => setTier(tierName)}>{tierName}</button>);
    }
  }
  else if (selectType === 'divisions') {
    const setDivision = id => {
      setSelected(id);
      toggleHidden(!hidden);
    };
    for (let divisionName in divisions) {
      selectBoxes.push(<button key={`division-${divisionName}`} className="division-btn" onClick={() => setDivision(divisionName)}>{divisionName}</button>);
    }
  }
  else if (selectType === 'gameTypes') {
    const setGameType = id => {
      setSelected(id);
      toggleHidden(!hidden);
    };
    for (let gameType in gameTypes) {
      selectBoxes.push(<button key={`gameType-${gameType}`} id="gameType-btn" className="select-btn" onClick={() => setGameType(gameType)}>{gameType}</button>);
    }
  }
  else if (selectType === 'seasons') {
    const setSeason = id => {
      setSelected(id);
      toggleHidden(!hidden);
    };
    for (let season in seasons) {
      selectBoxes.push(<button key={`season-${season}`} className="select-btn" id="season-btn" onClick={() => setSeason(season)}>{season}</button>);
    }
  }

  return (
    <div className="custom-select" id={`custom-select-${selectType}`}>
      <button className="select-btn" id={`${id}`} value={regions[selected]} onClick={() => toggleHidden(!hidden)}> {selected} <BiChevronDown size={22}/></button>
      {!hidden && <div className="custom-select-content" id={`content-${selectType}`}>{selectBoxes}</div>}
    </div>
  );
};

export default CustomSelect;
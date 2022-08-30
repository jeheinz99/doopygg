import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

const CustomSelect = props => {

  const { id, selectType, init } = props;
  
  const [selected, setSelected] = useState(init);
  const [hidden, toggleHidden] = useState(true);

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

  return (
    <div className="custom-select" id={`custom-select-${selectType}`}>
      <button className="select-btn" id={`${id}`} value={regions[selected]} onClick={() => toggleHidden(!hidden)}> {selected} <BiChevronDown size={22}/></button>
      {!hidden && <div className="custom-select-content" id={`content-${selectType}`}>{selectBoxes}</div>}
    </div>
  );
};

export default CustomSelect;
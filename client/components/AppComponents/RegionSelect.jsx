import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

const RegionSelect = () => {

  const [selected, setSelected] = useState('NA');
  const [hidden, toggleHidden] = useState(true);

  const setRegion = id => {
    setSelected(id);
    toggleHidden(!hidden);
  };

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

  const selectBoxes = [];
  for (let regionName in regions) {
    selectBoxes.push(<button key={`region-${regionName}`} className="region-btn" onClick={() => setRegion(regionName)}>{regionName}</button>);
  }

  return (
    <div className="region-select">
      <button id="region-select-btn" value={regions[selected]} onClick={() => toggleHidden(!hidden)}> {selected} <BiChevronDown size={22}/></button>
      {!hidden && <div className="region-select-content">{selectBoxes}</div>}
    </div>
  );
};

export default RegionSelect;
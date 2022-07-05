import React from 'react';

import Yellow from './PrimaryTrees/Yellow.jsx';
import Red from './PrimaryTrees/Red.jsx';
import Blue from './PrimaryTrees/Blue.jsx';
import White from './PrimaryTrees/White.jsx';
import Green from './PrimaryTrees/Green.jsx';

const Runes1 = props => {

  const { runeInfo } = props;

  return (
    <div className="TreeDiv" id={`div-${runeInfo[4].id}`}>
      {runeInfo[4].id === 8000 && <Yellow runeInfo={runeInfo}/>}
      {runeInfo[4].id === 8100 && <Red runeInfo={runeInfo}/>}
      {runeInfo[4].id === 8200 && <Blue runeInfo={runeInfo}/>}
      {runeInfo[4].id === 8300 && <White runeInfo={runeInfo}/>}
      {runeInfo[4].id === 8400 && <Green runeInfo={runeInfo}/>}
    </div>
  );
};

export default Runes1;
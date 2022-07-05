import React from 'react';

import Red2 from './SecondaryTrees/Red2.jsx';
import Blue2 from './SecondaryTrees/Blue2.jsx';
import Green2 from './SecondaryTrees/Green2.jsx';
import Yellow2 from './SecondaryTrees/Yellow2.jsx';
import White2 from './SecondaryTrees/White2.jsx';

const Runes2 = props => {

  const { runeInfo } = props;

  return (
    <div className="TreeDiv" id={`div-${runeInfo[5].id}`}>
      {runeInfo[5].id === 8000 && <Yellow2 runeInfo={runeInfo}/>}
      {runeInfo[5].id === 8100 && <Red2 runeInfo={runeInfo}/>}
      {runeInfo[5].id === 8200 && <Blue2 runeInfo={runeInfo}/>}
      {runeInfo[5].id === 8300 && <White2 runeInfo={runeInfo}/>}
      {runeInfo[5].id === 8400 && <Green2 runeInfo={runeInfo}/>}
    </div>
  );
};

export default Runes2;
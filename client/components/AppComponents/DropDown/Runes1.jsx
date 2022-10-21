import Yellow from './PrimaryTrees/Yellow.jsx';
import Red from './PrimaryTrees/Red.jsx';
import Blue from './PrimaryTrees/Blue.jsx';
import White from './PrimaryTrees/White.jsx';
import Green from './PrimaryTrees/Green.jsx';

const Runes1 = props => {

  const { matchNum, runeInfo } = props;

  return (
    <div className="TreeDiv" id={`div-${runeInfo[4].id}`}>
      {runeInfo[4].id === 8000 && <Yellow matchNum={matchNum} runeInfo={runeInfo}/>}
      {runeInfo[4].id === 8100 && <Red matchNum={matchNum} runeInfo={runeInfo}/>}
      {runeInfo[4].id === 8200 && <Blue matchNum={matchNum} runeInfo={runeInfo}/>}
      {runeInfo[4].id === 8300 && <White matchNum={matchNum} runeInfo={runeInfo}/>}
      {runeInfo[4].id === 8400 && <Green matchNum={matchNum} runeInfo={runeInfo}/>}
    </div>
  );
};

export default Runes1;
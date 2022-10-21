const TraitsBox = props => {

  const { name, count, traitIcon, placements } = props;

  const top4Percent = (((placements.top4 + placements.first)/ count)*100).toFixed();
  const nameCopy = name.replace('Set7_', '');

  return (
    <ul>
      <li> <img id="r10trait" src={traitIcon}/> </li>
      <li> {nameCopy} </li>
      <li> {count} Games </li>
      <li> {top4Percent} % </li>
    </ul>      
  );
};

export default TraitsBox;
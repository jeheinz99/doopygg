const dragonData = {
  DragonGuild: "Zippy",
  DragonGreen: "Shi Oh Yu",
  DragonPurple: "Sy'fen",
  DragonEarth: "Terra",
  AquaticDragon: "Sohm",
};

const UnitsBox = props => {

  const { name, played, unitIcon, rarity, placements } = props;

  const top4Percent = (((placements.top4 + placements.first)/ played)*100).toFixed();
  let nameCopy = name.replace('TFT7_', '');
  if (dragonData[nameCopy]) nameCopy = dragonData[nameCopy];

  return (
    <ul>
      <li> <img className="DDR10TFTunit" id={`Unit-${rarity}`} src={unitIcon}/> </li>
      <li> {nameCopy} </li>
      <li> {played} Games </li>
      <li> {top4Percent} % </li>
    </ul>
  );
};

export default UnitsBox;
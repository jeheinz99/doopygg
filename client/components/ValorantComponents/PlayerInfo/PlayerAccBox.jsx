const PlayerAccBox = props => {

  const { shotType, shotCount, totalShots, highestCount } = props;

  const shotPercent = (((shotCount) / (totalShots))*100).toFixed(1);


  return (
    <div className="PlayerAccBox">
      {shotType === "headShots" && <p> Head </p>}
      {shotType === "bodyShots" && <p> Body </p>}
      {shotType === "legShots" && <p> Leg </p>}
      {highestCount ? <p style={{color: "#16e5b4"}}> {shotPercent}% </p> : <p> {shotPercent} </p>}
      <p> {shotCount} <span style={{color: "#ffffff99", fontSize: "15px"}}> Hits </span> </p>
    </div>
  );
};

export default PlayerAccBox;
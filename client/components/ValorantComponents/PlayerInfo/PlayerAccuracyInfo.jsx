import PlayerAccBox from "./PlayerAccBox";

const PlayerAccuracyInfo = props => {

  const { headShots, bodyShots, legShots } = props;

  const totalShots = headShots + bodyShots + legShots;
  const highestCount = Math.max(headShots, bodyShots, legShots);
  const shotsData = {
    headShots: headShots,
    bodyShots: bodyShots,
    legShots: legShots
  }

  const playerAccBoxArr = [];
  for (let shot in shotsData) {
    let temp = shotsData[shot];
    if (shotsData[shot] === highestCount) {
      playerAccBoxArr.push(<PlayerAccBox key={`shot-${shot}`} shotType={shot} shotCount={shotsData[shot]} totalShots={totalShots} highestCount={true} />);
    }
    else playerAccBoxArr.push(<PlayerAccBox key={`shot-${shot}`} shotType={shot} shotCount={shotsData[shot]} totalShots={totalShots} highestCount={false} />);
  }

  return (
    <div className="PlayerAccuracyInfo">

      <div className="accuracy-header">
        <h3> Accuracy </h3>
      </div>

      <div className="accuracy-info">

        <img className="PlayerBodyImg" src="" />

        <div className="acc-boxes">
          {playerAccBoxArr}
        </div>
      </div>

    </div>
  );
};

export default PlayerAccuracyInfo;
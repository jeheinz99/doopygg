import React from 'react';
import Recent20Champion from './Recent20Champion.jsx';

const Recent20StatsBox = props => {

  const { recent20Data } = props;

  const tempFunc = data => {
    const mostPlayed = 0;
    const secondMost = 0;
    const thirdMost = 0;
  };

  const orderedData = tempFunc(recent20Data);

  const champsArr = [];
  for (let i in recent20Data) {
    (champsArr.length < 3 ? champsArr.push(
    <Recent20Champion 
    key={`champion-${i}`}
    championId={recent20Data[i].championId}
    id={i}
    kills={recent20Data[i].kills}
    deaths={recent20Data[i].deaths}
    assists={recent20Data[i].assists}
    played={recent20Data[i].played}
    win={recent20Data[i].win}
    loss={recent20Data[i].loss}
    cs={recent20Data[i].cs}
    champDamage={recent20Data[i].champDamage}
    />) : null);
  }

  const temp = champsArr.sort(({played: a}, {played: b}) => b - a);
  console.log(temp);

  return (
    <div className="recent20StatsBox">
      Recent Matches
      {champsArr}
    </div>
  );
};

export default Recent20StatsBox;
import Recent20Champion from './Recent20Champion.jsx';

const Recent20StatsBox = props => {

  const { recent20Data } = props;

  let totalWins = 0;
  let totalLosses = 0;
  let totalKills = 0;
  let totalDeaths = 0;
  let totalAssists = 0;

  let totalTop = 0;
  let totalJungle = 0;
  let totalMid = 0;
  let totalBottom = 0;
  let totalSupport = 0;
  
  for (let i in recent20Data) {

    totalWins += recent20Data[i].win;
    totalLosses += recent20Data[i].loss;
    totalKills += recent20Data[i].kills;
    totalDeaths += recent20Data[i].deaths;
    totalAssists += recent20Data[i].assists;

    totalTop += recent20Data[i].positions.TOP;
    totalJungle += recent20Data[i].positions.JUNGLE;
    totalMid += recent20Data[i].positions.MIDDLE;
    totalBottom += recent20Data[i].positions.BOTTOM;
    totalSupport += recent20Data[i].positions.UTILITY;

  }

  const getKDAId = KDA => {

    if (KDA < 3) {
      return 'lessthan3kda';
    }

    if (KDA < 5 && KDA >= 3) {
      return 'between3and5kda';
    }

    if (KDA >= 5 && KDA !== 'Infinity') {
      return 'over5kda';
    }

    if (KDA === 'Infinity') {
      return 'over5kda';
    }
  };

  const findTop3 = data => {

    const tempArr = [];

    for (let i in data) {
      tempArr.push(data[i]);
    }

    tempArr.sort((a, b) => {
      return ((b.played - a.played) === 0 ? (((b.kills + b.assists) / b.deaths) - ((a.kills + a.assists) / a.deaths)) : b.played - a.played);
    });

    if (tempArr.length === 1) {
      return [tempArr[0]];
    }
    if (tempArr.length === 2) {
      return [tempArr[0], tempArr[1]];
    }
    
    return [tempArr[0], tempArr[1], tempArr[2]];
  };

  const top3Played = findTop3(recent20Data);

  const champsArr = [];
  for (let i = 0; i < top3Played.length; i++) {
    champsArr.push(<Recent20Champion 
      key={`champion-${i}`}
      championId={top3Played[i].championId}
      kills={top3Played[i].kills}
      deaths={top3Played[i].deaths}
      assists={top3Played[i].assists}
      played={top3Played[i].played}
      win={top3Played[i].win}
      loss={top3Played[i].loss}
      />);
  }

  const avgKills = (totalKills / (totalWins + totalLosses)).toFixed(1);
  const avgDeaths = (totalDeaths / (totalWins + totalLosses)).toFixed(1);
  const avgAssists = (totalAssists / (totalWins + totalLosses)).toFixed(1);

  const totalKDA = ((totalKills + totalAssists) / totalDeaths).toFixed(2);
  
  const kdaID = getKDAId(totalKDA);

  const totalWinPercent = (totalWins / (totalWins + totalLosses))*100;

  // get total position games played, check if each position is NaN, if they are then set to 0
  const totalPositionGames = (totalTop + totalJungle + totalMid + totalBottom + totalSupport);
  let totalTopPercent = (totalTop / totalPositionGames)*100;
  if (isNaN(totalTopPercent)) {
    totalTopPercent = 0;
  }
  let totalJunglePercent = (totalJungle / totalPositionGames)*100;
  if (isNaN(totalJunglePercent)) {
    totalJunglePercent = 0;
  }
  let totalMidPercent = (totalMid / totalPositionGames)*100;
  if (isNaN(totalMidPercent)) {
    totalMidPercent = 0;
  }
  let totalBottomPercent = (totalBottom / totalPositionGames)*100;
  if (isNaN(totalBottomPercent)) {
    totalBottomPercent = 0;
  }
  let totalSupportPercent = (totalSupport / totalPositionGames)*100;
  if (isNaN(totalSupportPercent)) {
    totalSupportPercent = 0;
  }

  return (
    <div className="recent20Wrapper">
      <h3>Recent 20 Matches</h3>
      <div className="recent20StatsBox">
        
        <div className="recent20TotalStats">
          <p> {totalWins + totalLosses}G </p>
          <p> {Math.round(totalWinPercent)}% W/L </p>

          <div className="WinLossBar">
            <div className="winBar" id="R20WinBar" style={{width: `${totalWinPercent}%`}}>{totalWins}W</div>
            <div className="lossBar" id="R20WinBar" style={{width: `${100 - totalWinPercent}%`}}>{totalLosses}L</div>
          </div>

          <p>{avgKills} / <span id="avgDeathsSpanTag">{avgDeaths}</span> / {avgAssists}</p>
          <p id={`${kdaID}`}>K/D/A: {totalKDA}</p>
        </div>

        <div className="recent20Champs">
          {champsArr}
        </div>

        <div className="positionStats">
          <h2> Positions </h2>
          <div className="pos-div-wrap">

            <div className="pos-div">
              <div className="PositionBar">
                <div id="non-filled-pos" style={{height: `${100 - totalTopPercent}%`}}></div>
                <div id="filled-pos" style={{height: `${totalTopPercent}%`}}></div>
              </div>
              <img id="topLogo" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png'/>
            </div>

            <div className="pos-div">
              <div className="PositionBar">
                <div id="non-filled-pos" style={{height: `${100 - totalJunglePercent}%`}}></div>
                <div id="filled-pos" style={{height: `${totalJunglePercent}%`}}></div>
              </div>
              <img id="jungleLogo" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png'/>
            </div>

            <div className="pos-div">
              <div className="PositionBar">
                <div id="non-filled-pos" style={{height: `${100 - totalMidPercent}%`}}></div>
                <div id="filled-pos" style={{height: `${totalMidPercent}%`}}></div>
              </div>
              <img id="midLogo" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png'/>
            </div>

            <div className="pos-div">
              <div className="PositionBar">
                <div id="non-filled-pos" style={{height: `${100 - totalBottomPercent}%`}}></div>
                <div id="filled-pos" style={{height: `${totalBottomPercent}%`}}></div>
              </div>
              <img id="bottomLogo" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png'/>
            </div>

            <div className="pos-div">
              <div className="PositionBar">
                <div id="non-filled-pos" style={{height: `${100 - totalSupportPercent}%`}}></div>
                <div id="filled-pos" style={{height: `${totalSupportPercent}%`}}></div>
              </div>
              <img id="supportLogo" src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png'/>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Recent20StatsBox;
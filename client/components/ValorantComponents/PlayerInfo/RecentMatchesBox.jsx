const RecentMatchesBox = props => {

  const { recent20Data } = props;

  console.log(recent20Data, 'recent 20 data');

  const totalWinPercent = ((recent20Data.totalWins / (recent20Data.totalWins + recent20Data.totalLosses))*100).toFixed(1);
  const averageDamage = (recent20Data.totalDamage / recent20Data.totalRounds).toFixed(1);
  const KDA = ((recent20Data.totalKills + recent20Data.totalAssists) / recent20Data.totalDeaths).toFixed(2);
  const headshotPercent = (((recent20Data.totalHeadShots) / (recent20Data.totalBodyShots + recent20Data.totalLegShots))*100).toFixed(1);
  const averageCombatScore = (recent20Data.totalCombatScore / recent20Data.totalRounds).toFixed(1);

  return (
    <div className="RecentMatchesBox">
      <div className="overview-div">
        <h3> Overview </h3>
      </div>
      <div className="RecentMatchesDivs">

      <div className="val-recent-matches-div" id="div1">

        <div className="val-recent-div1">
          <p style={{fontSize: '13px', color: '#ffffff99'}}> Win% </p>
          <p> {totalWinPercent}% </p>
        </div>

        <div>
          <p> 
            <span style={{color: "#2c5e74"}}> {recent20Data.totalWins}W </span> 
            -
            <span style={{color: "#773424"}}> {recent20Data.totalLosses}L </span> 
          </p>
        </div>

      </div>
      
      <div className="val-recent-matches-div" id="div2">
        {KDA >= 1.5 && 
        <>
          <p className="recent-top-ptag"> K/D/A </p>
          <p className="recent-bottom-ptag kda-high"> {KDA} </p>
        </>
        }
        {KDA >= 1 && KDA < 1.5 && 
        <>
          <p className="recent-top-ptag"> K/D/A </p>
          <p className="recent-bottom-ptag kda-normal"> {KDA} </p>
        </>
        }
        {KDA < 1 && 
        <>
          <p className="recent-top-ptag"> K/D/A </p>
          <p className="recent-bottom-ptag kda-low"> {KDA} </p>
        </>
        }
      </div>

      <div className="val-recent-matches-div" id="div3">
        <p className="recent-top-ptag"> ADR </p>
        <p className="recent-bottom-ptag"> {averageDamage} </p>
      </div>
      
      <div className="val-recent-matches-div" id="div4">  
        <p className="recent-top-ptag"> HS% </p>
        <p className="recent-bottom-ptag"> {headshotPercent} </p>
      </div>

      <div className="val-recent-matches-div" id="div5">
        <p className="recent-top-ptag"> ACS </p>
        <p className="recent-bottom-ptag"> {averageCombatScore} </p>
      </div>

      </div>
    </div>
  );
};

export default RecentMatchesBox;
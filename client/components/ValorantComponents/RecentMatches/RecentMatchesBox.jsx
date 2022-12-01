import { useSelector } from "react-redux";


const RecentMatchesBox = props => {

  const { matchHistory } = props;

  const searchedPuuid = useSelector(state => state.valorant.searchedUser.puuid);

  const findRecent20Data = (matchHistory, searchedPuuid) => {
    let totalWins = 0;
    let totalLosses = 0;

    let totalRounds = 0;
    let totalKills = 0;
    let totalDeaths = 0;
    let totalAssists = 0;

    let totalHeadShots = 0;
    let totalBodyShots = 0;
    let totalLegShots = 0;
    let totalDamage = 0;

    // iterate through each match
    for (let i = 0; i < matchHistory.length; i++) {
      const match = matchHistory[i];
      let winningTeam;

      for (let h = 0; h < match.teams.length; h++) {
        if (match.teams[h].won === true) winningTeam = match.teams[h].teamId;
      }

      // for each match, find the correct player by puuid
      const findPlayer = match.players.filter(({puuid}) => puuid === searchedPuuid);
      // iterate through their stats to get stats per game and add to total
      const playerTeam = findPlayer[0].teamId;
      if (playerTeam === winningTeam) totalWins++;
      else totalLosses++;

      const stats = findPlayer[0].stats;
      totalKills += stats.kills;
      totalDeaths += stats.deaths;
      totalAssists += stats.assists;
      totalRounds += stats.roundsPlayed;

      // for each match, iterate through each round results
      for (let j = 0; j < match.roundResults.length; j++) {
        const round = match.roundResults[j];
        // for each round, find the correct player by puuid
        const findPlayer = round.playerStats.filter(({puuid}) => puuid === searchedPuuid);
        const damage = findPlayer[0].damage;
        for (let k = 0; k < damage.length; k++) {
          totalDamage += damage[k].damage;
          totalHeadShots += damage[k].headshots;
          totalBodyShots += damage[k].bodyshots;
          totalLegShots += damage[k].legshots;
        }
      }
    }
    return {
      totalWins,
      totalLosses,
      totalRounds,
      totalKills,
      totalDeaths,
      totalAssists,
      totalHeadShots,
      totalBodyShots,
      totalLegShots,
      totalDamage
    }
  };
  const recent20Data = findRecent20Data(matchHistory, searchedPuuid);
  console.log(recent20Data, 'recent 20 data');

  const totalWinPercent = ((recent20Data.totalWins / (recent20Data.totalWins + recent20Data.totalLosses))*100).toFixed(1);
  const averageDamage = (recent20Data.totalDamage / recent20Data.totalRounds).toFixed(1);
  const KDA = ((recent20Data.totalKills + recent20Data.totalAssists) / recent20Data.totalDeaths).toFixed(2);
  const headshotPercent = (((recent20Data.totalHeadShots) / (recent20Data.totalBodyShots + recent20Data.totalLegShots))*100).toFixed(1);



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

      </div>
    </div>
  );
};

export default RecentMatchesBox;
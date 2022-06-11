import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardBoxes from '../components/LeaderboardComponents/LeaderboardBoxes.jsx';
import LBButtons from '../components/LeaderboardComponents/LeaderboardButtons.jsx'; 

const LeaderboardPageContainer = () => {

  const leaderboardData = useSelector(state => state.leaderboard.leaderboardData);

  const regions = {'BR1': 'Brazil', 
  'EUN1': 'EUNE', 
  'EUW1': 'Europe West', 
  'JP1': 'Japan', 
  'KR': 'Korea',
  'LA1': 'LAS', 
  'LA2': 'LAN',
  'NA1': 'North America',
  'OC1': 'Oceania',
  'RU': 'Russia',
  'TR1': 'Turkey'};

  const regionsArr = [];
  const regionsArr2 = [];
  for (let i in regions) {
    (regionsArr.length <= 5 ? regionsArr.push(<LBButtons key={i} id={i} name={regions[i]}/>) : regionsArr2.push(<LBButtons key={i} id={i} name={regions[i]}/>));
  }

  return (
  <div className="LeaderboardPageBox">
    <div className ="OuterSearchBox" id="welcome"> 
      <p> doopy.gg Leaderboards <br></br>
                Select Your Region
      </p>
      <div className="LBButtonsBox">
        <div className="LBButtonsBox1">
          { regionsArr }
        </div>
        <div className="LBButtonsBox2">
          { regionsArr2 }
        </div>
      </div>
    </div>
    {leaderboardData[0] && <LeaderboardBoxes />};
  </div>
  );
};

export default LeaderboardPageContainer;
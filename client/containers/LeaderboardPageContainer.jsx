import { useSelector } from 'react-redux';
import LeaderboardBoxes from '../components/LeaderboardComponents/LeaderboardBoxes.jsx';
import LBButtons from '../components/LeaderboardComponents/LeaderboardButtons.jsx'; 

const regions = {
  'BR1': 'BR',
  'RU': 'RU', 
  'TR1': 'TR', 
  'JP1': 'JP', 
  'LA1': 'LAS', 
  'LA2': 'LAN',
  'NA1': 'NA',
  'KR': 'KR',
  'OC1': 'OCE',
  'EUN1': 'EUNE', 
  'EUW1': 'EUW'
};

const LeaderboardPageContainer = () => {

  const leaderboardData = useSelector(state => state.leaderboard.leaderboardData);

  const regionsArr = [];
  const regionsArr2 = [];
  for (let i in regions) {
    (regionsArr.length <= 5 ? regionsArr.push(<LBButtons key={i} id={i} name={regions[i]}/>) : regionsArr2.push(<LBButtons key={i} id={i} name={regions[i]}/>));
  }

  return (
  <div className="LeaderboardPageBox">
    <div className ="OuterSearchBox" id="welcomeLeaderboard"> 
      <h3> doopy.gg Leaderboards</h3>
      <p> Select Your Region </p>

      <div className="LBButtonsBox">
        { regionsArr }
      </div>
      <div className="LBButtonsBox">
        { regionsArr2 }
      </div>
      
    </div>
    {leaderboardData[0] && <LeaderboardBoxes />}
  </div>
  );
};

export default LeaderboardPageContainer;
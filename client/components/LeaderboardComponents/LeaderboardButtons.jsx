import { useDispatch } from 'react-redux';
import { getLeaderboardData } from '../../actions/actions';

const LBButtons = props => {

  const loadLeaderboardData = useDispatch();

  const { name, id } = props;

  return (
    <div className="LBButtons">
      <button className="OuterSearchBox" id="LeaderboardBoxButton" onClick={() => loadLeaderboardData(getLeaderboardData(id))}> {name} </button>
    </div>
    )
};

export default LBButtons;
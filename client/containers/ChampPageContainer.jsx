import { useDispatch } from 'react-redux';
import { getChampionData, testAsyncFunc } from '../actions/actions';
import ChampionsHeader from '../components/ChampionsComponents/ChampionsHeader';

const ChampPageContainer = () => {

  const dispatch = useDispatch();

  const testFunc = async () => {
    dispatch(getChampionData());
  };

  const testFuncTwo = async () => {
    dispatch(testAsyncFunc());
  };

  return (
    <div className ="OuterSearchBox">

      <div id="welcome"> doopy.gg Champions </div>
      <p id="in-development2"> in development </p>

      <div className="champ-stats-mainpage">
         <ChampionsHeader />
         {/* {<button className="testButton" onClick={() => testFuncTwo()}></button>} */}
         {/* <button id="testButton-champions-page" onClick={() => testFunc()}></button> */}
      </div>

    </div>
  );
};

export default ChampPageContainer;
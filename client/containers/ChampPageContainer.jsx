import React from 'react';
import { testAsyncFunc } from '../actions/actions';
import { useDispatch } from 'react-redux';
import ChampionsHeader from '../components/ChampionsComponents/ChampionsHeader';

const ChampPageContainer = () => {

  return (
    <div className ="OuterSearchBox">

      <div id="welcome"> doopy.gg Champions </div>
      <p id="in-development2"> in development </p>

      <div className="champ-stats-mainpage">
         <ChampionsHeader />
      </div>

    </div>
  );
};

export default ChampPageContainer;

  // {<button className="testButton" onClick={() => testFunc()}></button>}

  // const dispatch = useDispatch();

  // const testFunc = async () => {
  //   dispatch(testAsyncFunc());
  // };

import React from 'react';
import { testAsyncFunc } from '../actions/actions';
import { useDispatch } from 'react-redux';

const ChampPageContainer = () => {

  const dispatch = useDispatch();

  const testFunc = async () => {
    dispatch(testAsyncFunc());
  };

  return (
    <div className ="OuterSearchBox" id="welcome"> doopy.gg Champions 
      <button className="testButton" onClick={() => testFunc()}></button>
    </div>
  );
};

export default ChampPageContainer;
// import actionType constants
import * as types from '../constants/actionTypes';
import store from '../store';
import container from '../containers/SearchBox.jsx';


// export actions and payloads
export const tempAction = passedInArg => ({
  type: types.TEMP_THING,
  payload: WHATtoCHANGE
});
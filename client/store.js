import { applyMiddleware, legacy_createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/combineReducers';
import reduxThunk from 'redux-thunk';

const store = legacy_createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxThunk))
);

export default store;
// import app/provider/redux
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import App from './App.jsx';

// import containers
import SearchBox from './containers/SearchBox.jsx';

// import components
import MatchBoxes from './components/MatchBoxes.jsx'

// store
import store from './store';

render (
  // wrapping app in provider
  <Provider store={store}>
      <App/>
  </Provider>,
  document.getElementById('contents')
);
import React, { Component } from 'react';
import MatchesBox from './containers/MatchesBox.jsx';
import SearchBox from './containers/SearchBox.jsx';

import store from './store';

import './styles.css'

const App = props => {

    return (
      <div>
        <SearchBox />
        {/* <PlayerBox />
        <MatchesBox /> */}
      </div>
    );
}

export default App;
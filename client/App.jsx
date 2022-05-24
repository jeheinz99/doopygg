import React, { Component } from 'react';
import SearchBox from './containers/SearchBox.jsx';

import store from './store';

import './styles.css'

const App = props => {

    return (
      <div>
        <SearchBox />
      </div>
    );
}

export default App;
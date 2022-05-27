import React from 'react';
import SearchBox from './containers/SearchBox.jsx';
import { Outlet, Link } from 'react-router-dom';

import './styles.css'

const App = props => {
    return (
      <div>
        <SearchBox />
      </div>
    );
}

export default App;
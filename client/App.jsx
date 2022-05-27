import React from 'react';
import SearchBox from './containers/SearchBox.jsx';
import { Outlet, Link } from 'react-router-dom';

import './styles.css'

const App = props => {
    return (
    <div>
      <div className="Endpoints">
        <Link to="/champions"> Champions </Link>
        <Link to="/leaderboards"> Leaderboards </Link>
        <Outlet />
      </div>
        <SearchBox />
    </div>
    );
}

export default App;
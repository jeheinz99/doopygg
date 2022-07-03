import React from 'react';
import SearchBox from './containers/SearchBox.jsx';
import Navbar from './containers/Navbar.jsx';

import './styles.css';

const App = () => {
  return (
    <div className="AppBox">
      <Navbar />
      <SearchBox />
    </div>
  );
};

export default App;
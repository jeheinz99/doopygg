import React from 'react';
import TFTPageContainer from '../containers/TFTPageContainer';
import Navbar from '../containers/Navbar';

import '../styles/TFT_styles/tft.css';

const TFTPage = () => {
  return (
    <div className="AppBox">
      <Navbar />
      <TFTPageContainer />
    </div>
  );
};

export default TFTPage;
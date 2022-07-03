import React from 'react';
import ValorantPageContainer from '../containers/ValorantPageContainer';
import Navbar from '../containers/Navbar';

import '../styles/Valorant_styles/valorant.css';

const ValorantPage = () => {
  return (
    <div className="AppBox">
      <Navbar />
      <ValorantPageContainer />
    </div>
  );
};

export default ValorantPage;
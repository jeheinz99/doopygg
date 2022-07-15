import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import App from './App.jsx';

// temp import for routing to different pages
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import pages
import ChampionsPage from './routes/ChampionsPage'
import NothingHerePage from './routes/NothingHerePage.jsx';
import LeaderboardPage from './routes/LeaderboardPage.jsx';
import ValorantPage from './routes/ValorantPage.jsx';
import TFTPage from './routes/TFTPage.jsx'

// store
import store from './store';

const root = createRoot(document.getElementById('contents'));

root.render (
  // wrapping app in provider and BrowserRouter for page navigation
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
            <Route path="champions" element={<ChampionsPage />} />
            <Route path="leaderboards" element={<LeaderboardPage />} />
            <Route path="valorant" element={<ValorantPage />} />
            <Route path="tft" element={<TFTPage />} />
            <Route path="*" element={<NothingHerePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
);
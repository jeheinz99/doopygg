import { lazy, Suspense, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import store from './store';

// dynamic import pages
const ChampionsPage = lazy(() => import('./routes/ChampionsPage'));
const NothingHerePage = lazy(() => import('./routes/NothingHerePage'));
const LeaderboardPage = lazy(() => import('./routes/LeaderboardPage'));
const ValorantPage = lazy(() => import('./routes/ValorantPage'));
const TFTPage = lazy(() => import('./routes/TFTPage'));


const root = createRoot(document.getElementById('contents'));

root.render (
  // wrapping app in provider and BrowserRouter for page navigation
  <StrictMode>
    <Suspense fallback={<h2>Loading...</h2>}>
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
    </Suspense>
  </StrictMode>
);
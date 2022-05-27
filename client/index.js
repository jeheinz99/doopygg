// import app/provider/redux
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import App from './routes/App.jsx';

// temp import for routing to different pages
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import pages
import ChampionsPage from './routes/ChampionsPage'

// store
import store from './store';

render (
  // wrapping app in provider and BrowserRouter for page navigation
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
          <Route path="champions" element={<ChampionsPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('contents')
);
import './App.css';
import { Route, Routes, HashRouter } from 'react-router-dom';
import BetPage from './pages/BetPage';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import React from 'react';

function App() {
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/bet" element={<BetPage />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}

export default App
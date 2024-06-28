import './App.css';
import { Route, Routes, HashRouter } from 'react-router-dom';
import BetPage from './pages/BetPage';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/bet" element={<BetPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App
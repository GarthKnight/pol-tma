import './App.css';
import { Route, Routes, HashRouter } from 'react-router-dom';
import BetPage from './pages/BetPage';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <h1>TOP</h1>
      <Routes>
        < Route path="" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/bet" element={<BetPage />} />
      </Routes>
    </div>

  );
}

export default App
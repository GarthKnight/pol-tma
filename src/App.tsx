import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BetPage from './pages/BetPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bet" element={<BetPage />} />
      </Routes>
    </Router>
  );
}

export default App
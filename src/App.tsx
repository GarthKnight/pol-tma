import './App.css';
import { Route, Routes, HashRouter } from 'react-router-dom';
import BetPage from './pages/BetPage';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';

function App() {
  try {
    if (window.Telegram.WebApp.initData != null) {
      console.log("ABOBA: ", window.Telegram.WebApp.initData)
    } else {
      console.log("ABOBA: NULL")
    }
  } catch (error) {
    console.log("aboba error: ", error)
  }


  return (
    <div className='app'>
      <Routes>
        < Route path="" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/bet/:address" element={<BetPage />} />
      </Routes>
    </div>

  );
}

export default App
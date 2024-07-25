import './App.css';
import { Route, Routes, HashRouter } from 'react-router-dom';
import BetPage from './pages/BetPage';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';

function App() {
  try {
    console.log("ABOBA 1:", window.Telegram.WebApp)
    if (window.Telegram.WebApp.initData != null) {
      console.log("ABOBA 2: ", window.Telegram.WebApp.initData)
    } else {
      console.log("ABOBA 3: NULL")
    }
  } catch (error) {
    console.log("aboba error 4: ", error)
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
// HomePage.tsx
import React, {  } from 'react';
import { useNavigate } from 'react-router-dom';
import { TonConnectButton } from '@tonconnect/ui-react';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='app'>
            <h1>Home Page</h1>
            <TonConnectButton />
            <button onClick={() => navigate('/create')}>
                Create new bet
            </button>
            <button onClick={() => navigate('/list')}>
                All bets
            </button>
        </div >
    );
}

export default HomePage;
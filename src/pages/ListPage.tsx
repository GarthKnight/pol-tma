// HomePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Address } from 'ton-core';
import { fetchContracts } from '../contracts/Getters';
import { BetPageInfo } from './BetPage';
import { TonConnectButton } from '@tonconnect/ui-react';

const ListPage: React.FC = () => {

  //fetching data start 
  //load list of contracts
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Address[]>([]);

  useEffect(() => {
    const loadContractsData = async () => {
      setLoading(true);
      try {
        const result = await fetchContracts();
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadContractsData();
  }, []);
  //fetching data end 

  //navigation start 
  const navigate = useNavigate();
  const handleClick = (item: Address) => {
    const info: BetPageInfo = { address: item.toString() };

    navigate('/bet', { state: info });
  };
  //navigation end 


  return (
    <div className='app'>
      <h1>All bets list</h1>
      <TonConnectButton />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.map(item => (
            <li>
              <button onClick={() =>
                handleClick(item)
              }>
                {item.toString()}
              </button>
            </li>
          ))}
        </ul>
      )
      }

    </div >
  );
}

export default ListPage;
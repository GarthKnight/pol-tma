import './App.css';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';
import DialogComponent from './components/DialogComponent';
import BetInput from './components/BetInput';
import React from 'react';
import { Constants } from './contracts/Constants';
import { finishBet } from './contracts/Senders';
import { Address } from 'ton-core';
import { fetchContracts } from './contracts/Getters';

function App() {

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


  const [openBetDialog, setOpenDialog] = useState(false);
  const [betType, setBetString] = useState('');

  const handleOpenDialog = (data: string) => {
    setOpenDialog(true);
    setBetString(data)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (

    <TonConnectUIProvider
      manifestUrl="https://garthknight.github.io/jsonstorage/tonconnect-manifest.json"
    >
      {
        <div className='app'>
          <TonConnectButton />

          <div className="button-container">
            <button onClick={() => handleOpenDialog('1')}>Send to 1</button>
            <button onClick={() => handleOpenDialog('2')}>Send to 2</button>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {data.map(item => (
                <li>
                  <button onClick={() =>
                    console.log("button in the list", item.toString())
                  }>
                    {item.toString()}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <DialogComponent
            open={openBetDialog}
            onClose={handleCloseDialog}
            title={"We are betting on: " + betType}
            content={
              <BetInput
                onConfirm={handleCloseDialog}
                bet={betType}
              />
            }
            bet={betType}
          />
        </div >
      }
    </TonConnectUIProvider>

  );
}

export default App
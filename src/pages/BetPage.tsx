import { TonConnectButton } from '@tonconnect/ui-react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Address } from 'ton-core';

interface LocationState {
    state: BetPageInfo;
}

const BetPage: React.FC = () => {
    const location = useLocation();
    const { state } = location as LocationState;


    // const [openBetDialog, setOpenDialog] = useState(false);
    // const [betType, setBetString] = useState('');

    // const handleOpenDialog = (data: string) => {
    //     setOpenDialog(true);
    //     setBetString(data)
    // };

    // const handleCloseDialog = () => {
    //     setOpenDialog(false);
    // };

    return (
        <div>
            <h1>About Page</h1>
            <TonConnectButton />
            {state && <p>{state.address.toString()}</p>}


            {/* <div className='app'>
                <TonConnectButton />

                <div className="button-container">
                    <button onClick={() => handleOpenDialog('1')}>Send to 1</button>
                    <button onClick={() => handleOpenDialog('2')}>Send to 2</button>
                </div>

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
            </div > */}
        </div>
    );
}

export default BetPage;

export interface BetPageInfo {
    address: string;
}

import { TonConnectButton } from '@tonconnect/ui-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Address } from 'ton-core';
import DialogComponent from '../components/DialogComponent';
import BetInput from '../components/BetInput';
import { getBetInfo } from '../contracts/Getters';
import { BetInfo } from '../contracts/ChildContract';

interface LocationState {
    state: BetPageInfo;
}

const BetPage: React.FC = () => {
    const location = useLocation();
    const { state } = location as LocationState;
    const navigate = useNavigate();

    //fetching data start 
    const [loading, setLoading] = useState<boolean>(true);
    const [betInfo, setBetInfo] = useState<BetInfo>();

    useEffect(() => {
        const loadContractsData = async () => {
            setLoading(true);
            try {
                const result = await getBetInfo(state.address.toString());
                setBetInfo(result);
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
        <div className='app'>
            <h1>About Page</h1>
            <TonConnectButton />
            {state && <p>{state.address.toString()}</p>}

            <button onClick={() => navigate('/')}>GO BACK</button>


            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='app'>
                    <img src={betInfo?.image} alt={"Netuti"} style={{ maxWidth: '100%', height: 'auto' }} />
                    <p>{betInfo?.title}</p>
                    <p>{betInfo?.source}</p>
                    <div className="button-container">
                        <button onClick={() => handleOpenDialog('1')}>{betInfo?.bet_a_name.concat(": ").concat(betInfo?.odds_a?.toString())}</button>
                        <button onClick={() => handleOpenDialog('2')}>{betInfo?.bet_b_name.concat(": ").concat(betInfo?.odds_b?.toString())}</button>
                    </div>

                </div>
            )
            }

            <DialogComponent
                open={openBetDialog}
                onClose={handleCloseDialog}
                title={"We are betting on: " + betType}
                content={
                    <BetInput
                        onConfirm={handleCloseDialog}
                        bet={betType}
                        address={state.address.toString()}
                    />
                }
                bet={betType}
            />
        </div>
    );
}

export default BetPage;

export interface BetPageInfo {
    address: string;
}

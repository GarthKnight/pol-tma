import { TonConnectButton } from '@tonconnect/ui-react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DialogComponent from '../components/DialogComponent';
import BetInput from '../components/BetInput';
import { Bet } from '../contracts/ChildContract';
import { Box, IconButton as MuiIconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


interface LocationState {
    state: string;
}

const BetPage: React.FC = () => {
    const location = useLocation();
    const { state } = location as LocationState;
    const bet = deserializeBet(state)
    const navigate = useNavigate();

    console.log("Bet address: ", bet.address.toString())

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
        <div>
            <div className='bet-header '>
                <MuiIconButton onClick={() => navigate('/')} aria-label="go back">
                    <ArrowBackIcon />
                </MuiIconButton>

                <TonConnectButton style={{ marginRight: 20 }} />
            </div>

            <Typography variant="h4" sx={{
                color: 'black', display: 'flex',
                justifyContent: 'center',
            }}>
                {bet.betInfo.title}
            </Typography>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CenterCropImage imageUrl={bet.betInfo.image} />
            </div>

            <Typography variant="body1" sx={{
                color: 'black',
                display: 'flex',
                justifyContent: 'center'
            }}>
                {bet.betInfo.source}
            </Typography>

            <div className="button-container">
                <button onClick={() => handleOpenDialog('1')}>{bet.betInfo.bet_a_name.concat(": ").concat(getCoefficent(bet.betInfo.odds_a))}</button>
                <button onClick={() => handleOpenDialog('2')}>{bet.betInfo.bet_b_name.concat(": ").concat(getCoefficent(bet.betInfo.odds_b))}</button>
            </div>



            <DialogComponent
                open={openBetDialog}
                onClose={handleCloseDialog}
                title={"We are betting on: " + betType}
                content={
                    <BetInput
                        onConfirm={handleCloseDialog}
                        bet={betType}
                        address={bet.address.toString()}
                    />
                }
                bet={betType}
            />
        </div>
    );
}

function getCoefficent(coef: bigint): string {
    return (1 + Number(coef) / 1000).toFixed(3).toString()
}

function deserializeBet(json: string): Bet {
    return JSON.parse(json, (key, value) =>
        typeof value === 'string' && /^\d+n$/.test(value) ? BigInt(value.slice(0, -1)) : value
    );
}

const CenterCropImage: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
    return (
        <Box
            sx={{
                width: '25%', // 25% of the container width
                height: '25%', // 25% of the container height
                position: 'relative',
                borderRadius: '16px', // Rounded corners
                overflow: 'hidden', // Ensure image is cropped
            }}
        >
            <img
                src={imageUrl}
                alt="Center cropped image"
                style={{
                    width: '100%', // Ensures the image fills the container
                    height: '100%', // Ensures the image fills the container
                    objectFit: 'cover', // Cover the box with the image
                    objectPosition: 'center', // Center the image
                }}
            />
        </Box>
    );
};


export default BetPage;

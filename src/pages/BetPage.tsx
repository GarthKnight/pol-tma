import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BetInput from '../components/BetInput';
import { Bet } from '../contracts/ChildContract';
import { Box, FormControl, FormControlLabel, IconButton as MuiIconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterCropImage from '../components/CenterCropImage';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import JoyBox from '@mui/joy/Box';
import { BetInfo } from '../contracts/wrappers';
import { createTransactionForStringMessage } from '../contracts/Senders';



interface LocationState {
    state: string;
}

const BetPage: React.FC = () => {
    const location = useLocation();
    const { state } = location as LocationState;
    const bet = deserializeBet(state)
    const navigate = useNavigate();
    const [tonConnectUI] = useTonConnectUI();

    const [betType, setBetType] = useState<string>('');
    const handleBetTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value == bet.betInfo.bet_a_name) {
            setBetType("1");
        } else if (value == bet.betInfo.bet_b_name) {
            setBetType("2");
        }
    };

    const onSubmitPressed = (amount: string) => {
        tonConnectUI.sendTransaction(createTransactionForStringMessage(betType, amount, bet.address))
    }

    return (
        <div>
            <div className='bet-header '>
                <MuiIconButton onClick={() => navigate('/list')} aria-label="go back">
                    <ArrowBackIcon sx={{ color: 'white' }} />
                </MuiIconButton>

                <TonConnectButton style={{ marginRight: 20 }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CenterCropImage imageUrl={bet.betInfo.image} width='200px' height='200px' />
            </div>


            <Typography variant="h5" sx={{
                color: 'white', display: 'flex',
                justifyContent: 'start', ml: 3, mr: 3, mt: 4
            }}>
                {bet.betInfo.title}
            </Typography>

            <Typography variant="body1" sx={{
                color: 'white',
                display: 'flex',
                justifyContent: 'start', ml: 3, mr: 3
            }}>
                {bet.betInfo.source}
            </Typography>


            <Box sx={{ display: 'flex', mt: 1 }}>
                {IconlessRadio(bet.betInfo, handleBetTypeChange)}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'start', mt: 2, ml: 3, mr: 3 }}>
                <BetInput
                    onConfirm={onSubmitPressed}
                />
            </Box>


        </div >
    );
}


function IconlessRadio(betInfo: BetInfo, handleBetTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void) {
    return (
        <JoyBox sx={{ width: '100%', ml: 3, mr: 3 }}>
            <FormLabel
                id="bets"
                sx={{
                    mb: 1,
                    fontWeight: 'xl',
                    fontSize: 'md',
                    color: 'white'
                }}
            >
                Choose your option
            </FormLabel>
            <RadioGroup
                aria-labelledby="bets"
                defaultValue={betInfo.bet_a_name}
                size="lg"
                sx={{ gap: 1.5 }}
                onChange={handleBetTypeChange}
            >
                {[betInfo.bet_a_name, betInfo.bet_b_name].map((value) => (
                    <Sheet
                        key={value}
                        sx={{
                            p: 1,
                            borderRadius: 'md',
                            backgroundColor: 'transparent',
                            border: '1px solid transparent',
                            boxShadow: 'none',
                            outlineColor: 'transparent'
                        }}
                    >
                        <Radio
                            label={value}
                            overlay
                            disableIcon
                            value={value}
                            slotProps={{
                                label: ({ checked }) => ({
                                    sx: {
                                        fontWeight: checked ? 'bold' : 'normal', // Bolder font when selected
                                        fontSize: 'md',
                                        color: 'white',
                                    },
                                }),
                                action: ({ checked }) => ({
                                    sx: {
                                        border: checked ? '2px solid #15E5C6' : '1px solid white',
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                        },
                                    },
                                }),
                            }}
                        />
                    </Sheet>
                ))}
            </RadioGroup>
        </JoyBox>
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

export default BetPage;

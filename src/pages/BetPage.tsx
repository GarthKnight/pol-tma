import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BetInput from '../components/BetInput';
import { Bet } from '../contracts/ChildContract';
import { Box, Button, FormControl, FormControlLabel, IconButton as MuiIconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterCropImage from '../components/CenterCropImage';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import JoyBox from '@mui/joy/Box';
import { BetInfo } from '../contracts/wrappers';
import { createTransactionForStringMessage } from '../contracts/Senders';
import AspectRatio from '@mui/joy/AspectRatio';
import { fetchContractByAddress } from '../contracts/Getters';



interface LocationState {
    state: string;
}

const BetPage: React.FC = () => {
    const { address } = useParams();
    const location = useLocation();
    const { state } = location as LocationState;
    const navigate = useNavigate();
    const [tonConnectUI] = useTonConnectUI();
    const [bet, setBet] = useState<Bet | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [betType, setBetType] = useState<string>('');

    const loadContractData = async () => {
        setLoading(true);
        try {
            if (address != null) {
                const result = await fetchContractByAddress(address);
                setBet(result);
            }

        } catch (error) {
            console.error("fetch contract data error:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (state !== null && state !== "") {
            setBet(deserializeBet(state))
        } else {
            loadContractData();
        }

    }, []);

    const handleBetTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value == bet?.betInfo.bet_a_name) {
            setBetType("1");
        } else if (value == bet?.betInfo.bet_b_name) {
            setBetType("2");
        }
    };

    const onSubmitPressed = (amount: string) => {
        if (bet != null) {
            tonConnectUI.sendTransaction(createTransactionForStringMessage(betType, amount, bet.address))
        }
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
                <AspectRatio
                    ratio="16/9"
                    sx={{
                        width: '100%',
                        bgcolor: 'transparent',
                        outline: 'transparent',
                    }}
                >
                    <img
                        src={bet?.betInfo.image}
                        alt="img"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                </AspectRatio>
            </div>


            <Typography variant="h5" sx={{
                color: 'white', display: 'flex',
                justifyContent: 'start', ml: 3, mr: 3, mt: 2
            }}>
                {bet?.betInfo.title}
            </Typography>

            <Typography variant="body1" sx={{
                color: 'white',
                display: 'flex',
                justifyContent: 'start', ml: 3, mr: 3
            }}>
                {bet?.betInfo.source}
            </Typography>


            <Box sx={{ display: 'flex', mt: 1 }}>
                {IconlessRadio(bet?.betInfo, handleBetTypeChange)}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'start', mt: 2, ml: 3, mr: 3 }}>
                <BetInput
                    onConfirm={onSubmitPressed}
                />
            </Box>

            <Box sx={{ display: 'flex', mt: 1, mr: 3, ml: 3, mb: 5, gap: 2 }}>
                {BetButtons("Share", () => {
                    if (bet != null) {
                        copyTextToClipboard("https://t.me/Polygame_bot/polpol/?startapp=".concat(bet.address))
                    }
                })}
                {BetButtons("To Channel", () => {

                })}
            </Box>


        </div >
    );
}

function BetButtons(text: string, onChange: () => void) {
    return (
        <Button
            variant="outlined"
            color="primary"
            onClick={onChange}
            sx={{
                flexGrow: 1, // Make the button take up available space
                color: '#15E5C6',
                borderColor: '#15E5C6', // Set the default border color
                borderRadius: 20, // Adjust the value to control the roundness
                padding: '8px 16px', // Adjust padding as needed
                marginTop: '8px',
                alignSelf: 'flex-start', // Align the Button to the top

                '&:hover': {
                    borderColor: '#15E5C6', // Ensure the border color is consistent on hover
                    backgroundColor: 'rgba(21, 229, 198, 0.1)' // Optional: Light background color on hover
                },
                '&.Mui-focused': {
                    borderColor: '#15E5C6', // Ensure the border color is consistent when focused
                    boxShadow: `0 0 0 2px rgba(21, 229, 198, 0.5)` // Optional: Shadow for focus state
                },
                '&:focus': {
                    outline: 'none', // Remove focus outline
                },
            }}
            fullWidth // Ensures the button takes up full width of the container
        >
            {text}
        </Button>
    )
}



function IconlessRadio(betInfo: BetInfo | undefined, handleBetTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void) {
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
                defaultValue={betInfo?.bet_a_name}
                size="lg"
                sx={{ gap: 1.5 }}
                onChange={handleBetTypeChange}
            >
                {[betInfo?.bet_a_name, betInfo?.bet_b_name].map((value) => (
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

async function copyTextToClipboard(text: string): Promise<void> {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

export default BetPage;

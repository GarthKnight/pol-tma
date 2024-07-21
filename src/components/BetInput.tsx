import React, { useState, ChangeEvent } from 'react';
import { createTransactionForStringMessage } from '../contracts/Senders';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Button, TextField, styled } from '@mui/material';

interface InputProps {
  onConfirm: () => void;
  bet: string;
  address: string;
}

const BetInput: React.FC<InputProps> = ({ onConfirm, bet, address }) => {
  const [tonConnectUI] = useTonConnectUI();
  const [amount, setInputValue] = useState<string>('1');
  const [isValid, setIsValid] = useState<boolean>(true);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    if (value == "") {
      setIsValid(true)
    } else {
      setIsValid(validateInput(value));
    }
  };

  const validateInput = (value: string): boolean => {
    return /^\d+(\.\d{1,9})?$/.test(value);
  };

  const handleSubmit = () => {
    if (!tonConnectUI.connected) {
      tonConnectUI.openModal()
      return;
    }
    console.log("amount? - ", amount)
    if (isValid && amount !== "") {
      try {
        tonConnectUI.sendTransaction(createTransactionForStringMessage(bet, amount, address))
        onConfirm()
      } catch (error) {
        console.log("Sending betting transaction error: ", error)
      }

    }
  }

  return (
    <div>
      <BetTextField
        error={!isValid}
        id="betinput"
        label="Enter amount"
        defaultValue={1}
        inputProps={{ inputMode: 'decimal' }}
        helperText={!isValid ? "Incorrect entry." : ""}
        variant="standard"
        onChange={handleChange}
      />

      <Button
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
        sx={{
          ml: 2,
          color: '#15E5C6',
          borderColor: '#15E5C6', // Set the default border color
          borderRadius: 20, // Adjust the value to control the roundness
          padding: '8px 16px', // Adjust padding as needed
          marginTop: '8px',
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
      >
        Submit
      </Button>
    </div>
  );
};

const BetTextField = styled(TextField)(({ theme }) => ({
  // Default styles
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.error.main, // Error color for helper text
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white', // Default underline color
  },
  '& .MuiInput-underline:hover': {
    borderBottomColor: 'white', // Underline color when hovered
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: '#15E5C6', // Underline color when hovered
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#15E5C6', // Underline color when active
  },
  '& .MuiInput-underline.Mui-error:after': {
    borderBottomColor: theme.palette.error.main, // Underline color in error state
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#15E5C6', // Title color when focused
  },
  '& .MuiInputLabel-root.Mui-error': {
    color: theme.palette.error.main, // Label color in error state
  },
}));

export default BetInput;
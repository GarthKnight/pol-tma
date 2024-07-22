import React, { useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Box, Button } from '@mui/material';
import NumericTextField from './NumericTextField';

interface InputProps {
  onConfirm: (amount: string) => void;
}

const BetInput: React.FC<InputProps> = ({ onConfirm }) => {
  const [tonConnectUI] = useTonConnectUI();
  const [amount, setInputValue] = useState<string>('1.00');

  const handleSubmit = () => {
    if (!tonConnectUI.connected) {
      tonConnectUI.openModal()
      return;
    }
    console.log("amount? - ", amount)
    if (amount !== "") {
      try {
        onConfirm(amount)
      } catch (error) {
        console.log("Sending betting transaction error: ", error)
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex', // Use flexbox layout
        alignItems: 'center', // Align items vertically centered
        width: '100%', // Ensure the Box takes full width of its container
      }}>
      <NumericTextField
        value={amount}
        id="betinput"
        label="Enter amount"
        inputProps={{ inputMode: 'decimal' }}
        variant="standard"
        onChange={(val) => setInputValue(val)}
        sx={{
          flexGrow: 1, // Allow the NumericTextField to take up the remaining space
          marginRight: 2, // Add space between the input field and the button
        }}
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
      >
        Submit
      </Button>
    </Box>
  );
};

export default BetInput;
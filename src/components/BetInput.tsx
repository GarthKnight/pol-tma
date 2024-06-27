import React, { useState, ChangeEvent } from 'react';
import { createTransactionForStringMessage } from '../contracts/Senders';
import { useTonConnectUI } from '@tonconnect/ui-react';

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
    setIsValid(validateInput(value));
  };

  const validateInput = (value: string): boolean => {
    return /^\d+(\.\d{1,9})?$/.test(value);
  };

  const handleSubmit = () => {
    if (isValid && amount !== "") {
      tonConnectUI.sendTransaction(createTransactionForStringMessage(bet, amount, address))
      onConfirm()
    }
  }

  return (
    <div>
      <input
        type="text"
        id="numberInput"
        name="numberInput"
        value={amount}
        onChange={handleChange}
        style={{ borderColor: isValid ? '' : 'red' }}
        required
        pattern="^\d+(\.\d{1,9})?$"
        title="Please enter a valid number format"
      />
      {!isValid && <p style={{ color: 'red' }}>Please enter a valid number format</p>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default BetInput;
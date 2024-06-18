import './App.css';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import React from 'react';
import { sendMessage } from './contracts/sendMessage';
import { finish } from './contracts/sendIsFinished';
import { getIsFinished, getTotalBetA, getGetTrumpBidenData } from './contracts/Getters';
import { Address, address, beginCell, toNano } from '@ton/ton'
import { Constants } from './contracts/Constants';

function App() {
  const [tonConnectUI, setOptions] = useTonConnectUI();

  return (
    <div>
      <TonConnectButton />

      <GetBetAButton />

      <SendBetOnAButton />

      <IsFinButton />

      <FinishButton />

      <button onClick={() =>
        tonConnectUI.sendTransaction(myTransaction)
      }>
        Send transaction
      </button>

      <button onClick={() =>
        getGetTrumpBidenData()
      }>
        Get trump
      </button>
    </div >
  );
}

const contractAddress = Address.parse(Constants.addressString);
const body = beginCell()
  .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
  .storeStringTail("1") // write our text comment
  .endCell();
const myTransaction = {
  validUntil: Math.floor(Date.now() / 1000) + 360,
  messages: [
    {
      address: contractAddress.toRawString(),
      amount: toNano(0.05).toString(),
      payload: body.toBoc().toString("base64") // payload with comment in body
    }
  ]
}

export default App

class GetBetAButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is GetBetAButton');
    getTotalBetA()
  };
  render() {
    return (
      <button onClick={this.handleClick}>
        GetBetAButton
      </button>
    );
  }
}

class SendBetOnAButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is SendBetOnAButton');
    sendMessage()
  };
  render() {
    return (
      <button onClick={this.handleClick}>
        SendBetOnAButton
      </button>
    );
  }
}

class IsFinButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is IsFinButton');
    getIsFinished()
  };
  render() {
    return (
      <button onClick={this.handleClick}>
        IsFinButton
      </button>
    );
  }
}

class FinishButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is FinishButton');
    finish()
  };
  render() {
    return (
      <button onClick={this.handleClick}>
        FinishButton
      </button>
    );
  }
}
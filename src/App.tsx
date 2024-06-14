import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import React from 'react';
import { getTotalBetA } from './contracts/getBetA';
import { sendMessage } from './contracts/sendMessage';

function App() {
  return (
    <div>
      <TonConnectButton />

      <GetBetAButton/>

      <SendBetOnAButton/>

    </div >
  );
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

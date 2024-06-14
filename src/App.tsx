import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import React from 'react';
import { getTotalBetA } from './contracts/getBetA';
import { sendMessage } from './contracts/sendMessage';
import { finish } from './contracts/sendIsFinished';
import { getIsFinished } from './contracts/getIsFinished';

function App() {
  return (
    <div>
      <TonConnectButton />

      <GetBetAButton />

      <SendBetOnAButton />

      <IsFinButton />

      <FinishButton />

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
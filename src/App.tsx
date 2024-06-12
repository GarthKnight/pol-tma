import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import React from 'react';
import { fetchData } from './contracts/getCounter';

function App() {
  return (
    <div>
      <TonConnectButton />

      <MyButton/>

    </div >
  );
}

export default App

class MyButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is:', this);
    fetchData()
  };
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

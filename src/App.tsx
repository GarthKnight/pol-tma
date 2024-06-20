import './App.css';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { useState } from 'react';
import DialogComponent from './components/DialogComponent';
import BetInput from './components/BetInput';

function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const [betType, setBetString] = useState('');

  const handleOpenDialog = (data: string) => {
    setOpenDialog(true);
    setBetString(data)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (

    <TonConnectUIProvider
      manifestUrl="https://garthknight.github.io/pol-tma/tonconnect-manifest.json"
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/Polygame_bot'
      }}
    >
      {
        <div className='app'>
          <TonConnectButton />

          <div className="button-container">
            <button onClick={() => handleOpenDialog('1')}>Send to 1</button>
            <button onClick={() => handleOpenDialog('2')}>Send to 2</button>
          </div>

          <DialogComponent
            open={openDialog}
            onClose={handleCloseDialog}
            title={"We are betting on: " + betType}
            content={
              <BetInput
                onConfirm={handleCloseDialog}
                bet={betType}
              />
            }
            bet={betType}
          />

          {/* <GetBetAButton />
     
           <SendBetOnAButton />
     
           <IsFinButton />
     
           <FinishButton />
     
           <button onClick={() =>
             sendStringMessage("1")
           }>
             First option
           </button>
     
           <button onClick={() =>
             tonConnectUI.sendTransaction(createTransactionForStringMessage("1", "0.5"))
           }>
             First option
           </button>
     
     
           <button onClick={() =>
             getGetTrumpBidenData()
           }>
             Get trump
           </button> */}
        </div >
      }
    </TonConnectUIProvider>

  );
}

export default App

// class GetBetAButton extends React.Component {
//   // This syntax ensures `this` is bound within handleClick.
//   handleClick = () => {
//     console.log('this is GetBetAButton');
//     getTotalBetA()
//   };
//   render() {
//     return (
//       <button onClick={this.handleClick}>
//         GetBetAButton
//       </button>
//     );
//   }
// }

// class SendBetOnAButton extends React.Component {
//   // This syntax ensures `this` is bound within handleClick.
//   handleClick = () => {
//     console.log('this is SendBetOnAButton');
//     sendStringMessageAsOwner("1")
//   };
//   render() {
//     return (
//       <button onClick={this.handleClick}>
//         SendBetOnAButton
//       </button>
//     );
//   }
// }

// class IsFinButton extends React.Component {
//   // This syntax ensures `this` is bound within handleClick.
//   handleClick = () => {
//     console.log('this is IsFinButton');
//     getIsFinished()
//   };
//   render() {
//     return (
//       <button onClick={this.handleClick}>
//         IsFinButton
//       </button>
//     );
//   }
// }

// class FinishButton extends React.Component {
//   // This syntax ensures `this` is bound within handleClick.
//   handleClick = () => {
//     console.log('this is FinishButton');
//     finish()
//   };
//   render() {
//     return (
//       <button onClick={this.handleClick}>
//         FinishButton
//       </button>
//     );
//   }
// }
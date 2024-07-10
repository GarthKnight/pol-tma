// HomePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchContractsWithData } from '../contracts/Getters';
import TabsComponent from '../components/TabsComponent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Bet } from '../contracts/ChildContract';
import { BetInfo } from '../contracts/wrappers';
import CenterCropImage from '../components/CenterCropImage';

const ListPage: React.FC = () => {

  //fetching data start 
  //load list of contracts
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Bet[]>([]);

  useEffect(() => {
    const loadContractsData = async () => {
      setLoading(true);
      try {
        const result = await fetchContractsWithData(true);
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadContractsData();
  }, []);
  //fetching data end 

  //navigation start 
  const navigate = useNavigate();
  const handleClick = (item: Bet) => {
    navigate('/bet', { state: serializeBet(item) });
  };
  //navigation end 

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("tab: ", newValue)
    setActiveTab(newValue);
  };


  return (
    <div className='listpage'>

      <TabsComponent activeTab={activeTab} handleTabChange={handleTabChange} />

      <div className="list">
        {loading ? (
          <Typography variant="h4" sx={{
            color: 'White', display: 'flex',
            justifyContent: 'center',
            marginTop: '28px'
          }}>
            Loading...
          </Typography>
        ) : (
          <List sx={{ width: '100%' }}>
            {data.map((item, i) => (
              <div>
                <ListItem key={i} alignItems="center" onClick={() => handleClick(item)}>
                  <BetItem betInfo={item.betInfo} />
                </ListItem>
              </div>
            ))}
          </List>
        )
        }
      </div>
    </div >
  );
}

const BetItem: React.FC<{ betInfo: BetInfo }> = ({ betInfo }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#252525',
        color: 'white',
        width: '100%',
        textAlign: 'center',
        borderRadius: '10px',
        padding: '16px',
        boxShadow: 3
      }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>

        <CenterCropImage imageUrl={betInfo.image} width='48px' height='48px' />
        <Typography variant="body1" sx={{ color: 'white' }}>
          {betInfo.title}
        </Typography>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          $14.0m Bet
        </Typography>
        <CoefficientContainer greenValue={betInfo.odds_a} redValue={betInfo.odds_b} />
      </div>
    </Box>
  );
}



const CoefficientContainer: React.FC<{ greenValue: bigint; redValue: bigint }> = ({ greenValue, redValue }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          backgroundColor: 'rgba(0, 190, 162, 0.1)',
          color: '#15E5C6',
          width: '50px',
          textAlign: 'center',
          borderRadius: '8px',
          padding: '2px',
          marginRight: '4px'
        }}
      >
        {getCoefficent(greenValue)}
      </Box>
      <Box
        sx={{
          backgroundColor: 'rgba(252, 48, 48, 0.1)',
          color: '#FC3030',
          width: '50px',
          textAlign: 'center',
          borderRadius: '8px',
          padding: '2px',
        }}
      >
        {getCoefficent(redValue)}
      </Box>
    </Box>
  );
};

function getCoefficent(coef: bigint): string {
  return (1 + Number(coef) / 1000).toFixed(2)
}

function serializeBet(bet: Bet): string {
  return JSON.stringify(bet, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
}

export default ListPage;
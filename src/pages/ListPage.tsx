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

const ListPage: React.FC = () => {

  //fetching data start 
  //load list of contracts
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Bet[]>([]);

  useEffect(() => {
    const loadContractsData = async () => {
      setLoading(true);
      try {
        const result = await fetchContractsWithData();
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
    setActiveTab(newValue);
  };


  return (
    <div className='listpage'>
      <div className="tabs">
        <div className="tabs">
          <TabsComponent activeTab={activeTab} handleTabChange={handleTabChange} />
        </div>
      </div>
      <div className="list">
        {loading ? (
          <Typography variant="h4" sx={{
            color: 'black', display: 'flex',
            justifyContent: 'center',
            marginTop: '28px'
          }}>
            Loading...
          </Typography>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {/* result.filter((item) => item.finishDate > 0) */}
            {data.map(item => (
              <div>
                <ListItem key={item.betInfo.title} alignItems="center" onClick={() => handleClick(item)}>
                  <ListItemText
                    primary={<Typography variant="body1" sx={{ color: 'black' }}>
                      {item.betInfo.title}
                    </Typography>
                    }
                  />
                  <CoefficientContainer greenValue={item.betInfo.odds_a} redValue={item.betInfo.odds_b} />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
              </div>
            ))}

          </List>
        )
        }
      </div>
    </div >
  );
}

const CoefficientContainer: React.FC<{ greenValue: bigint; redValue: bigint }> = ({ greenValue, redValue }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
      <Box
        sx={{
          backgroundColor: '#388E3C',
          color: 'white',
          width: '50px',
          textAlign: 'center',
          borderTopLeftRadius: '10px',
          borderBottomLeftRadius: '10px',
          padding: '2px'
        }}
      >
        {getCoefficent(greenValue)}
      </Box>
      <Box
        sx={{
          backgroundColor: '#F44336',
          color: 'white',
          width: '50px',
          textAlign: 'center',
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
          padding: '2px'
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
// HomePage.tsx
import React, { } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Adjust the path to match your CSS file location
import { Button, ButtonProps, Typography } from '@mui/material';


const HomePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='container'>
            <div className='content'>
                <Typography variant="h2" sx={{
                    color: 'white', display: 'flex',
                    justifyContent: 'center',
                }}>
                    (((Polymarket)))
                </Typography>

                <HomePageButton onClick={() => navigate('/create')}>
                    Create
                </HomePageButton>

                <HomePageButton onClick={() => navigate('/list')}>
                    Browse
                </HomePageButton>
            </div >
        </div >
    );
}

const HomePageButton: React.FC<ButtonProps> = ({ children, onClick}) => {
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={onClick} 
            style={{
                backgroundColor: 'white',
                color: 'black',
                borderRadius: 20, // Adjust the value to control the roundness
                padding: '10px 20px', // Adjust padding as needed
                marginTop: '8px'
            }}
        >
            {children}
        </Button>
    );
};


export default HomePage;
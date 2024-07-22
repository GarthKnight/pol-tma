// HomePage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import CenterCropImage from '../components/CenterCropImage';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/list')
        }, 3000);
        return () => clearTimeout(timer);
    });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh', // Full height of the viewport
                textAlign: 'center'
            }}
        >
            <CenterCropImage imageUrl="/friren.jpg" width='200px' height='200px' />
            <CircularProgress sx={{ color: '#15E5C6', mt: 3 }} />
        </Box >
    );
}

export default HomePage;
import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';

interface TabsComponentProps {
    activeTab: number;
    handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const CustomTab = styled(Tab)(({ theme }) => ({
    '&.Mui-selected': {
        backgroundColor: 'white',
    },
    '&.Mui-selected span': {
        color: 'inherit',
    },
    flexGrow: 1,
}));

const TabsComponent: React.FC<TabsComponentProps> = ({ activeTab, handleTabChange }) => {
    return (
        <Tabs value={activeTab} onChange={handleTabChange} centered>
            <CustomTab label="Active bets" />
            <CustomTab label="Completed bets" />
        </Tabs>
    );
};

export default TabsComponent;

import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';

interface TabsComponentProps {
    activeTab: number;
    handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const CustomTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: 'transparent', // Remove the default blue indicator
    },
});

const CustomTab = styled(Tab)(({ theme }) => ({
    '&.Mui-selected': {
        backgroundColor: 'transparent',
        color: '#15E5C6', // Selected text color
        borderBottom: '2px solid #15E5C6', // Custom underline color and thickness
    },
    '&.Mui-selected span': {
        color: '#15E5C6', // Ensures that the text inside span also gets the color
    },
    '&:not(.Mui-selected)': {
        color: 'white', // Unselected text color
    },
    '&:not(.Mui-selected) span': {
        color: 'white', // Ensures that the text inside span also gets the color
    },
    '&:focus': {
        outline: 'none', // Remove focus outline
    },
    flexGrow: 1,
}));

const TabsComponent: React.FC<TabsComponentProps> = ({ activeTab, handleTabChange }) => {
    return (
        <CustomTabs value={activeTab} onChange={handleTabChange} centered>
            <CustomTab label="Active bets" />
            <CustomTab label="Completed bets" />
        </CustomTabs>
    );
};

export default TabsComponent;

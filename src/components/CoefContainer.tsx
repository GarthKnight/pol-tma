import { Box } from "@mui/material";

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

export default CoefficientContainer;

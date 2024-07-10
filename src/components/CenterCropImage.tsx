import { Box } from "@mui/material";

const CenterCropImage: React.FC<{
    imageUrl: string;
    width?: string | number;
    height?: string | number;
}> = ({ imageUrl, width, height }) => {
    return (
        <Box
            sx={{
                width: width, // 25% of the container width
                height: height, // 25% of the container height
                position: 'relative',
                borderRadius: '8px', // Rounded corners
                overflow: 'hidden', // Ensure image is cropped
            }}
        >
            <img
                src={imageUrl}
                alt="Center cropped image"
                style={{
                    width: '100%', // Ensures the image fills the container
                    height: '100%', // Ensures the image fills the container
                    objectFit: 'cover', // Cover the box with the image
                    objectPosition: 'center', // Center the image
                }}
            />
        </Box>
    );
};

export default CenterCropImage;
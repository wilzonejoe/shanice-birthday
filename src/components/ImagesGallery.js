import React, { useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import Masonry from '@mui/lab/Masonry';  // Import Masonry from MUI (v5+)
import Slider from "react-slick"; // If you're using React Slick
import { ArrowForward, ArrowBack } from '@mui/icons-material';

const ImagesGallery = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // For small devices (1 column)
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // For tablets (2 columns)
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // For desktops (3 columns)


  // Handle opening the image modal
  const handleClickOpen = (index) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  // Handle closing the image modal
  const handleClose = () => {
    setOpen(false);
  };

  // Settings for React Slick (or another carousel library)
  const settings = {
    initialSlide: currentImageIndex,
    infinite: true,
    dots: false,  // Remove dots
    arrows: false, // Hide default arrows, we add custom ones below
    swipeToSlide: true,  // Allow sliding
    centerMode: true, // Keep the centered image in view
    focusOnSelect: true, // Enable clicking image for selecting
    speed: 500, // Speed of transition
    centerPadding: '0', // Ensure no padding on the sides
    adaptiveHeight: true, // Adjust height based on image height
  };

  const columns = isSmallScreen ? 1 : isTablet ? 2 : isDesktop ? 3 : 1;

  return (
    <Box sx={{ padding: 2 }}>
      {/* Masonry layout for images */}
      <Masonry columns={columns} spacing={2}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              cursor: 'pointer',
              borderRadius: 2,
              backgroundColor: 'white',
              boxShadow: 2
            }}
            onClick={() => handleClickOpen(index)} // Open the modal when image is clicked
          >
            <img
              src={image}
              alt={`Imag ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Box>
        ))}
      </Masonry>

      {/* Dialog to display the carousel */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <Slider {...settings}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imag ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain', // Fit the image within the carousel box
                  borderRadius: '8px',
                }}
              />
            ))}
          </Slider>
        </DialogContent>

        {/* Optional navigation buttons */}
        <DialogActions sx={{ justifyContent: 'center' }}>
          <IconButton
            onClick={() => setCurrentImageIndex((index) => Math.max(index - 1, 0))}
            color="primary"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">
            {currentImageIndex + 1} of {images.length}
          </Typography>
          <IconButton
            onClick={() => setCurrentImageIndex((index) => Math.min(index + 1, images.length - 1))}
            color="primary"
          >
            <ArrowForward />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImagesGallery;

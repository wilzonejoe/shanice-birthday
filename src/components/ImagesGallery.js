import React from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 16px;
`;

const WishCard = styled.div`
  flex: 1 1 400px; /* Flex-grow and shrink with a base of 200px */
  max-width: 600px; /* Set the maximum width */
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%; /* Ensures the image scales properly */
  height: auto; /* Maintain aspect ratio */
`;

const ImagesGallery = ({ images }) => {
  return (
    <GalleryContainer>
      {images.map((image, index) => (
        <WishCard key={index}>
          <Image key={index} src={image} alt="Wish" />
        </WishCard>
      ))}
    </GalleryContainer>
  );
};

export default ImagesGallery;

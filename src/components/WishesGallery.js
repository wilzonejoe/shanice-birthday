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
  background-color: white;
`;

const Text = styled.p`
  padding: 8px;
  font-size: 1rem;
  line-height: 1.6; /* Increased for better readability */
  white-space: pre-wrap; /* Preserves line breaks and wraps text */
  flex-grow: 1; /* Ensures text takes up available space */
`;

const Name = styled.p`
  font-size: 0.8rem;
  margin: 8px;
  color: #888;
  text-align: right;
  margin-top: auto; /* Pushes the name to the bottom of the card */
`;

const WishesGallery = ({ wishes }) => {
  return (
    <GalleryContainer>
      {wishes.map((wish, index) => (
        <WishCard key={index}>
          <Text>{wish.text}</Text>
          {wish.name && <Name>— {wish.name}</Name>}
        </WishCard>
      ))}
    </GalleryContainer>
  );
};

export default WishesGallery;

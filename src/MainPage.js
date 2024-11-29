import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';
import styled from 'styled-components';
import WishesGallery from './components/WishesGallery';
import ImagesGallery from './components/ImagesGallery';

// Styled-components for header, app bar, and section titles
const Container = styled.header`
  background-color: #F5F5DC;
`;

const HeaderContainer = styled.header`
  position: relative;
  height: 100vh;
  background-image: url('/background.PNG');
  background-position: center;
  background-size: cover;
  color: #c8ae7e;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 20px; /* Align the buttons 20px above the bottom */
  display: flex;
  gap: 20px; /* Space between the buttons */
`;

const Button = styled.button`
  background-color: ${props => (props.active ? '#4B392F' : '#604C3E')}; /* Highlight when active */
  color: #FFFFFF; /* White text */
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #4B392F; /* Darken on hover */
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin: 20px 0;
  color: #333;
`;

const Section = styled.section`
  padding: 60px 20px;
`;

function MainPage() {
  const [wishes, setWishes] = useState([]);
  const [images, setImages] = useState([]);
  const [activeButton, setActiveButton] = useState(null); // Track active button state
  const audioRef = useRef(new Audio('/music.mp3'));

  useEffect(() => {
    fetch('/images-collection.json')
      .then((response) => response.json())
      .then((data) => {
        const imageUrls = data.images.map((image) => `/${image}`);
        setImages(imageUrls);
      })
      .catch((err) => console.error('Error fetching image names:', err));
  }, []);

  useEffect(() => {
    Papa.parse('/Wishes.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const mappedWishes = result.data.map((item) => ({
          name: item["Name"],
          text: item["Wish"],
        }));
        setWishes(mappedWishes);
      },
    });
  }, []);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType); // Set active button

    // Scroll to the appropriate section based on the button clicked
    if (buttonType === 'wishes') {
      document.getElementById('wishes').scrollIntoView({ behavior: 'smooth' });
    } else if (buttonType === 'gallery') {
      document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    }

    // Play the audio
    audioRef.current.play();
  };

  return (
    <Container>
      {/* Parallax Header */}
      <HeaderContainer>
        {/* Buttons aligned side by side */}
        <ButtonsContainer>
          <Button
            onClick={() => handleButtonClick('wishes')}
            active={activeButton === 'wishes'} // Highlight if active
          >
            See Our Wishes
          </Button>
          <Button
            onClick={() => handleButtonClick('gallery')}
            active={activeButton === 'gallery'} // Highlight if active
          >
            See Our Pictures
          </Button>
        </ButtonsContainer>
      </HeaderContainer>
      
      {/* Wishes Section */}
      <Section id="wishes">
        <SectionTitle>Wishes</SectionTitle>
        <WishesGallery wishes={wishes} />
      </Section>

      {/* Gallery Section */}
      <Section id="gallery">
        <SectionTitle>Gallery</SectionTitle>
        <ImagesGallery images={images} />
      </Section>
    </Container>
  );
}

export default MainPage;

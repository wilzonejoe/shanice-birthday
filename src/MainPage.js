import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';
import styled from 'styled-components';
import WishesGallery from './components/WishesGallery';
import ImagesGallery from './components/ImagesGallery';

// Styled-components for header, app bar, and section titles
const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  margin: 0 20px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const HeaderContainer = styled.header`
  position: relative;
  height: 100vh;
  background-color: #F5F5DC;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  color: #c8ae7e;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeaderText = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #c8ae7e;
  color: white;
  font-size: 1.2rem;
  padding: 15px 30px;
  margin-top: 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  
  &:hover {
    background-color: #a89e64;
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
    Papa.parse('/Wish Birthday Shan” (Responses) - Form responses 1.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const mappedWishes = result.data.map((item) => ({
          name: item["Nama panggilan (yang bisa dikenali Shanice yaa)"],
          text: item["Wish buat Shan”"],
        }));
        setWishes(mappedWishes);
      },
    });
  }, []);

  const handleButtonClick = () => {
    // Scroll to wishes section
    document.getElementById('wishes').scrollIntoView({ behavior: 'smooth' });

    // Play the audio
    audioRef.current.play();
  };

  return (
    <div>
      {/* Parallax Header */}
      <HeaderContainer>
        <HeaderText>Happy Birthday Shanice!</HeaderText>
        {/* Button to scroll to wishes and play music */}
        <Button onClick={handleButtonClick}>See Wishes</Button>
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
    </div>
  );
}

export default MainPage;

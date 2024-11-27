import React, { useEffect, useState } from 'react';
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
  background-image: url('/background.jpg');
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: -1;
`;

const HeaderText = styled.h1`
  font-size: 3rem;
  font-weight: bold;
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
    // Load the CSV and map the values
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

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar>
        <NavLink href="#wishes">Wishes</NavLink>
        <NavLink href="#gallery">Gallery</NavLink>
      </Navbar>

      {/* Parallax Header */}
      <HeaderContainer>
        <HeaderText>Happy Birthday Shanice!</HeaderText>
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

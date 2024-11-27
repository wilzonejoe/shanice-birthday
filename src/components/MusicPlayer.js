
import React from 'react';

const MusicPlayer = () => {
  return (
    <audio autoPlay loop>
      <source src="Taylor Swift - I'm Only Me When I'm With You.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default MusicPlayer;

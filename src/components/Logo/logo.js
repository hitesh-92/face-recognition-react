import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3">
          <img
            src='https://img.icons8.com/color/96/000000/bot.png'
            alt='Logo'
            style={{ paddingTop: '5px' }}
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;

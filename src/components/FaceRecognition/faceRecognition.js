import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({
  imageUrl, box
  // {
  //   top,
  //   right,
  //   bottom,
  //   left
  // }
}) => {
  const {top, right, bottom, left} = box
  return (
    <div className='center ma'>
      <div className='absolute mt4'>
        <img
          alt=''
          src={imageUrl}
          width='500px'
          height='auto'
          id='inputimage'
        />
        <div
          className='bounding-box'
          style={{ top, right, bottom, left }}
        >
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;

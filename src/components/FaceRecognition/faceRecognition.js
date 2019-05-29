import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({
  imageUrl, boxes
  // {
  //   top,
  //   right,
  //   bottom,
  //   left
  // }
}) => {
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

        {
          boxes.map( (box, i) => {
            const {top, right, bottom, left} = box
            return(
              <div
                className='bounding-box'
                style={{ top, right, bottom, left }}
                key={i}
              ></div>
            )

          })
        }

      </div>
    </div>
  );
};

export default FaceRecognition;

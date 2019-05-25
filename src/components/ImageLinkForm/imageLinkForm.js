import React from 'react';
import './imageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {'Faces in pictures may or may not be detected!'}
      </p>

      <div className='center'>
        <div className='pa4 center br3 shadow-5 form'>
          <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
          <br />
          <button
            className='grow pointer w-30 f4 ma1 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>

    </div>
  );
};

export default ImageLinkForm;

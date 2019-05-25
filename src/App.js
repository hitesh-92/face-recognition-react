import React from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm';
import Rank from './components/Rank/rank';
import Particles from 'react-particles-js';
import './App.css';

const particleOps = {
  particles: {
    number: {value: 100}
  }
}

function App() {
  return (
    <div className="App">
      <Particles params={particleOps} className='particles' />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*
        <ImageLinkForm />
        <FaceRecognition />
      */}

    </div>
  );
}

export default App;

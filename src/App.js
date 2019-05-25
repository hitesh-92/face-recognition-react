import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const clarifai = new Clarifai.App({
 apiKey: 'f22f7817782c4db1b5c24c1cc1b71e6f'
});

const particleOps = {
  particles: {
    number: {value: 150}
  }
}

class App extends Component{

  constructor(){
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onButtonSubmit = () => {
    console.log('submitteddd')
    clarifai.models.predict(
      // "a403429f2ddf4b49b307e318f00e528b",
      Clarifai.COLOR_MODEL,
      "https://samples.clarifai.com/face-det.jpg"
    )
    .then(
    function(response) {
      console.log(response)
    },
    function(err) {
      // there was an error
    }
  );
  }

  render(){
    return (
      <div className="App">
        <Particles params={particleOps} className='particles' />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition />

      </div>
    );
  };

}

export default App;

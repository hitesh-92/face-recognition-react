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
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = ( {target: {value}} ) => {
    this.setState({input: value})
  }

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input})

    clarifai.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    )
    .then(
    function(response) {
      console.log( response.outputs[0].data.regions[0].region_info.bounding_box )
    },
    function(err) {
      console.log('clarifai api Err')
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
        <FaceRecognition
          imageUrl={this.state.imageUrl}
        />

      </div>
    );
  };

}

export default App;

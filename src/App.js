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
      imageUrl: '',
      box: {}
    }
  }

  onInputChange = ( {target: {value}} ) => {
    this.setState({input: value})
  }

  calculateFaceLocation = (data) => {
    const clariFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height)
    return {
      top: clariFace.top_row * height,
      right: width - (clariFace.right_col * width),
      bottom: height - (clariFace.bottom_row * height),
      left: clariFace.left_col * width
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box })
    console.log('workkkking')
    console.log(box)
  }

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input})

    clarifai.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    )
    .then(this.calculateFaceLocation)
    .then(this.displayFaceBox)
    .catch(err => console.log('clarifai api Err', err) );
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
          box={this.state.box}
        />

      </div>
    );
  };

}

export default App;

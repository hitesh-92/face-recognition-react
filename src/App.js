import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import SignIn from './components/SignIn/signIn';
import Register from './components/Register/register';
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
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }

    }
  }

  loadUser = (userData) => {
    this.setState({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        entries: userData.entries,
        joined: userData.joined
      }
    });
  }

  onInputChange = ( {target: {value}} ) => {
    this.setState({input: value})
  }

  calculateFaceLocation = (data) => {
    const clariFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      top: clariFace.top_row * height,
      right: width - (clariFace.right_col * width),
      bottom: height - (clariFace.bottom_row * height),
      left: clariFace.left_col * width
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box })
  }

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input})

    clarifai.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    )
    .then(this.calculateFaceLocation)
    .then(this.displayFaceBox)
    .then(() => {

      console.log('AFTER displayFaceBox')
      console.log('STATE::', this.state)

      const data = { id: this.state.user.id }
      const url = 'http://localhost:5000/image';
      const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }

      return fetch(url, options).then(res => res.json())

    })
    .then(entries => {
      console.log(`the response::::\n${entries}`)

      if (entries){
        this.setState( Object.assign(this.state.user, {entries}) );
      }

    })
    .catch(err => console.log('clarifai api Err', err) );
  }

  onRouteChange = (route) => {
    if(route === 'signout') this.setState({ isSignedIn: false })
    else if (route === 'home') this.setState({ isSignedIn: true })

    this.setState({ route })
  }

  render(){
    const {
      isSignedIn,
      imageUrl,
      route,
      box
    } = this.state;

    return (
      <div className="App">
        <Particles params={particleOps} className='particles' />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />

        { route === 'home' ?
            <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition
                imageUrl={imageUrl}
                box={box}
            />
          </div>
          :
          ( route === 'signin' ?
            <SignIn
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
             />
            :
            <Register
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          )

        }

      </div>
    );
  };

}

export default App;

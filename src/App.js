import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import SignIn from './components/SignIn/signIn';
import Register from './components/Register/register';
import Particles from 'react-particles-js';
import './App.css';

const particleOps = {
  particles: {
    number: {value: 150}
  }
}

const initialState = {
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

class App extends Component{

  constructor(){
    super();
    this.state = initialState;
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
    const clariFace = data
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      top: clariFace.top * height,
      right: width - (clariFace.right * width),
      bottom: height - (clariFace.bottom * height),
      left: clariFace.left * width
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box })
    console.log('displayFaceBox set')
  }

  onButtonSubmit = () => {

    const inputUrl = this.state.input

    this.setState({imageUrl: inputUrl})

    // console.log('inputUrl set::', inputUrl || 'error setting imageUrl')

    const inputData = JSON.stringify({input: inputUrl})
    // console.log('inputData:', inputData)
    fetch(
      'http://localhost:5000/imageurl',
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: inputData
      }
    )
    .then(res => {
      return res.json()
    })
    .then(data => this.calculateFaceLocation(data) )
    .then(data => this.displayFaceBox(data) )
    .then(() => {
      const data = { id: this.state.user.id }
      const url = 'http://localhost:5000/image';
      const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }

      return fetch(url, options).then(res => res.json())

    })
    .then((entries) => {
      if (entries){
        this.setState( Object.assign(this.state.user, {entries}) );
      }
    })
    .catch(err => console.log('from API:', err) );

  }

  onRouteChange = (route) => {
    if(route === 'signout') this.setState(initialState)
    else if (route === 'home') this.setState({isSignedIn: true});

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

import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import SignIn from './components/SignIn/signIn';
import Register from './components/Register/register';
import Profile from './components/Profile/profile';
import Modal from './components/Modal/modal';
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
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: ''
  }
}

class App extends Component{

  constructor(){
    super();
    this.state = initialState;
  }

  componentDidMount(){
    const token = window.sessionStorage.getItem('token');
    if( !token ) return

    let url = 'http://35.238.214.49/signin';
    let options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorisation': token,
        mode: 'cors'
      }
    }

    fetch(url, options)
    .then(res => res.json())
    .then(data => {
      if(data && data.id) {
        // console.log('componentDidMount success => ', data)

        let url = `http://35.238.214.49/profile/${data.id}`;
        let options = {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorisation': token,
            mode: 'cors'
          }
        }

        fetch(url,options)
        .then(res => res.json())
        .then(user => {
          if(user.id && user.email){
            this.loadUser(user)
            this.onRouteChange('home')
          }

        })


      }
      else console.log('componentDidMount error => ', data)
    })

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

  calculateFaceLocations = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return data.map( ({region_info :{bounding_box}}) => {

      const {
        bottom_row,
        left_col,
        right_col,
        top_row
      } = bounding_box;

      return {
        top: top_row * height,
        right: width - (right_col * width),
        bottom: height - (bottom_row * height),
        left: left_col * width
      }

    });

  }

  displayFaceBoxes = (boxes) => {
    this.setState({ boxes })
  }

  onButtonSubmit = () => {

    const token = window.sessionStorage.getItem('token');
    if(!token) return this.onRouteChange('signout');

    const inputUrl = this.state.input

    this.setState({imageUrl: inputUrl})

    const inputData = JSON.stringify({input: inputUrl})
    fetch(
      'http://35.238.214.49/imageurl',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': token
        },
        body: inputData
      }
    )
    .then(res => {
      return res.json()
    })
    .then(data => this.calculateFaceLocations(data) )
    .then(data => this.displayFaceBoxes(data) )
    .then(() => {
      const data = { id: this.state.user.id }
      const url = 'http://35.238.214.49/image';
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': token
        },
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
    if(route === 'signout') {
      return this.setState(initialState)
    }
    else if (route === 'home') this.setState({isSignedIn: true});

    this.setState({ route })
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }) );
  }

  render(){
    const {
      isSignedIn,
      imageUrl,
      route,
      boxes,
      isProfileOpen
    } = this.state;

    return (
      <div className="App">
        <Particles params={particleOps} className='particles' />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
          toggleModal={this.toggleModal}
        />
        {
          isProfileOpen &&
          <Modal>
            <Profile
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
              user={this.state.user}
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </Modal>
        }

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
                boxes={boxes}
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

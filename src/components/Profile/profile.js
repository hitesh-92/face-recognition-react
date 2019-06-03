import React, { Component } from 'react';
import './profile.css';

class Profile extends Component{

  constructor(props){
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age
    }
  }

  onFormChange = (event) => {

    switch(event.target.name){
      case 'user-name':
        this.setState({name: event.target.value})
        break;

      case 'user-age':
        this.setState({age: event.target.value})
        break;

      default:
        break;
    }

  }

  render(){
    const {user} = this.props;
    return(
      <div className=' profile-modal'>

      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center br2 bg-white">
        <main className="pa4 black-80 w-80">
          <img src='http://tachyons.io/img/logo.jpg' className='br-100 ba h3 w3 dib' alt='dropDown' />
          <h2>{user.name}</h2>
          <h4>{`Images submitted: ${user.entries}`}</h4>
          <p>{`Joined: ${new Date(user.joined).toLocaleDateString()}`}</p>

          <label className='mt2 fw6' htmlFor='user-name'>Name:</label>
          <input
            className='pa2 ba w-100'
            placeholder="Name"
            name='user-name'
            id='name'
          />

          <label className='mt2 fw6' htmlFor='user-name'>Age:</label>
          <input
            className='pa2 ba w-100'
            placeholder="20"
            name='user-age'
            id='age'
          />
          <div
            className='mt3'
            style={{display:'flex', justifyContent:'space-evenly'}}
          >
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-green b--black-20"
            >
              Save
            </button>
            <button
              onClick={this.props.toggleModal}
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
            >
              Close
            </button>
          </div>
        </main>
        <div className='modal-close pointer' onClick={this.props.toggleModal}>&times;</div>
      </article>

      </div>
    )
  }


}

export default Profile;

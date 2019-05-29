import React, { Component } from 'react';

// const Register = ({onRouteChange}) => {
class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      registerEmail: '',
      registerPassword: '',
      registerName: ''
    };
  }

  onEmailChange = (event) => {
    this.setState({registerEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({registerPassword: event.target.value})
  }

  onNameChange = (event) => {
    this.setState({registerName: event.target.value})
  }

  onSubmitSignIn = () => {
    const data = {
      email: this.state.registerEmail,
      password: this.state.registerPassword,
      name: this.state.registerName
    }

    const url = 'http://localhost:5000/register';
    const signInOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(data)
    }

    fetch(url, signInOptions)
    .then(res => res.json())
    .then( user => {
      if(user.id){
        this.props.loadUser(user)
        this.props.onRouteChange('home');
      }
    })
    .catch(console.log);

  };

  render(){

    return (
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center br2">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={this.onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={this.onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
        </div>
      </main>
    </article>
  );
  }

};

export default Register;

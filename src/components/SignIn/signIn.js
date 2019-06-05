import React, { Component } from 'react';
import './signIn.css';

class SignIn extends Component {

  constructor(props){
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    };
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  onSubmitSignIn = () => {
    const data = {
      email: this.state.signInEmail,
      password: this.state.signInPassword
    }

    const url = 'http://localhost:5000/signin';
    const signInOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(data)
    }

    fetch(url, signInOptions)
    .then(res => res.json())
    .then( data => {
      console.log('onSubmitSignIn .then.then => ', data)
      if(data.id && data.success) {
        this.saveAuthTokenInSession(data.token)
        this.props.loadUser(data)
        this.props.onRouteChange('home')
      } else {
        console.log('onSubmitSignIn .catch => ', data)
      }

    })
    .catch(err => console.log('onSubmitSignIn fetch..catch => ', err));

  };

  render(){

    const { onRouteChange } = this.props;

    return (
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center br2">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email <br /> alice@mail.com</label>
              <input
                onChange={this.onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password <br /> ALICE</label>
              <input
                onChange={this.onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={() => this.onSubmitSignIn()}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange('register')}
              href="#0"
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );

  };

};

export default SignIn;

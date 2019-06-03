import React from 'react';
import ProfileIcon from '../Profile/profileIcon';

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
    if (isSignedIn){

    return (
      <nav style={{ display:'flex', justifyContent: 'flex-end' }}>
        <ProfileIcon onRouteChange={ onRouteChange } toggleModal={toggleModal} />
      </nav>
    )} else {

    return (
      <nav style={{ display:'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('register')} className='f3 link dim blue pa3 pointer'>
          Register
        </p>
        <p onClick={() => onRouteChange('signin')} className='f3 link dim green pa3 pointer'>
          Sign In
        </p>
      </nav>
    )}
};

export default Navigation

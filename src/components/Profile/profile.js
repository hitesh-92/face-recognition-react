import React from 'react';
import './profile.css';

const Profile = ({ isProfileOpen, toggleModal }) => {
  return(
    <div className=' profile-modal'>
     <button
      onClick={toggleModal}
     >
      Click
     </button>

    </div>
  )
}

export default Profile;

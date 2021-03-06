import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class ProfileIcon extends Component{

  constructor(props){
    super();

    this.state = {
      dropdownOpen: false
    }

  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }


  render(){
    return(

      <div className='pa4 tc mr-1'>

        <div className='pa4 tc'>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={this.state.dropdownOpen}
            >
              <img
                src='http://tachyons.io/img/logo.jpg'
                className='br-100 ba h3 w3 dib'
                alt='dropDown'
              />
            </DropdownToggle>


            <DropdownMenu className="b--transparent shadow-5 mt-4 bg-washed-red" right>
              <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
              <DropdownItem onClick={() => this.props.onRouteChange('signout')} >Sign Out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

      </div>

    )
  }


};

export default ProfileIcon;

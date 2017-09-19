// eslint-disable-next-line
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import DropdownSelect from '../DropdownSelect/DropdownSelect.js'
import { DropdownMenu, DropdownItem } from 'reactstrap'
import PropTypes from 'prop-types'

function UserDropdown(props) {
  const { user, username, logOutUser } = props
  return (  
    <DropdownSelect 
      icon={ <i className="fa fa-user"></i> }
    >
      <DropdownMenu 
        className="dropdown-menu-right"
      >
        { user &&
          <DropdownItem 
            header={ true }
          >
            Signed in as { username }
          </DropdownItem>
        }
        { user ?
          <a className="dropdown-item" onClick={ logOutUser } href="/">
            Log out
          </a>
          :
          <Link 
            className="dropdown-item" 
            to="/login"
          >
            Log In
          </Link>
        }  
      </DropdownMenu>  
    </DropdownSelect>  
  )  
}

UserDropdown.propTypes = {
  user: PropTypes.object,
  username: PropTypes.string,
  logOutUser: PropTypes.func
}

export default UserDropdown;
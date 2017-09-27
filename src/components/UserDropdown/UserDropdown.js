// eslint-disable-next-line
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import DropdownSelect from '../DropdownSelect/DropdownSelect.js'
import { DropdownMenu, DropdownItem } from 'reactstrap'
import PropTypes from 'prop-types'
import UserDropdownMenu from '../UserDropdownMenu/UserDropdownMenu.js'

function UserDropdown(props) {
  const { user, username, logOutUser, classes } = props
  return (  
    user ?
      <DropdownSelect 
        icon={ <i className="fa fa-user-o font-size-xl"></i> }
        classes={ classes }
      >
        <UserDropdownMenu
          username={ username }
          logOutUser={ logOutUser }
        />
      </DropdownSelect>  
      :
      <Link 
        className="text-white nav-link login-link ml-auto" 
        to="/login"
      >
        Log In
      </Link>  
  )  
}

UserDropdown.propTypes = {
  classes: PropTypes.string,
  user: PropTypes.object,
  username: PropTypes.string,
  logOutUser: PropTypes.func
}

export default UserDropdown;
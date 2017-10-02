// eslint-disable-next-line
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { DropdownMenu, DropdownItem } from 'reactstrap'

function UserDropdownMenu(props) {
  const { logOutUser, onClick, username } = props

  return (
    <DropdownMenu 
      className="dropdown-menu-right"
    >
      <DropdownItem 
        header={ true }
      >
        Signed in as { username }
      </DropdownItem>

      <Link 
        to="/my-list" 
        className="dropdown-item" 
        onClick={ onClick }
      >
        My List
      </Link>               
      
      <Link className="dropdown-item" onClick={ logOutUser } to="/">
        Log out
      </Link>
    </DropdownMenu> 
  )
}

UserDropdownMenu.propTypes = {
  logOutUser: PropTypes.func,
  onClick: PropTypes.func,
  username: PropTypes.string
}

export default UserDropdownMenu;        
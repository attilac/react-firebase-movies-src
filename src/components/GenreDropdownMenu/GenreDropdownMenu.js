// eslint-disable-next-line
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { DropdownMenu } from 'reactstrap'

function GenreDropdownMenu(props) {
  const { items, onClick } = props,
    list = items
      .map((item, index) => 
        <NavLink 
          key={ index } 
          to={ `/genre/${ item }` } 
          className="dropdown-item" 
          activeClassName="active" 
          onClick={ onClick }
        >
          { item }
        </NavLink>        
      )
  return <DropdownMenu>
    { list }  
  </DropdownMenu>
}

GenreDropdownMenu.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func
}

export default GenreDropdownMenu;
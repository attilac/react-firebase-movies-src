// eslint-disable-next-line
import React, { Component } from 'react';
import GenreDropdownMenu from '../GenreDropdownMenu/GenreDropdownMenu.js'
import InputField from '../InputField/InputField.js'
import DropdownSelect from '../DropdownSelect/DropdownSelect.js'
import UserDropdown from '../UserDropdown/UserDropdown.js'
import Navbar from '../Navbar/Navbar.js'
import PropTypes from 'prop-types'

function SiteHeader(props) {

  const { 
    navbarTitle,
    user, 
    genres, 
    logOutUser, 
    username,
    searchTerm,
    searchOnSubmit,
    searchOnChange,
    location
  } = props

  return (
    <Navbar title={ navbarTitle }>
      { user &&
        <DropdownSelect 
          title={ 
            location.pathname !== '/' ? 
              location.pathname.substring(location.pathname.lastIndexOf('/') + 1) 
              : 'Genres' 
          } 
          classes="mr-3"
          caret={ true }
        >
          <GenreDropdownMenu
            items={ genres }
          />  
        </DropdownSelect> 
      }
      { user &&
        <InputField 
          onSubmit={ searchOnSubmit } 
          onChange={ searchOnChange } 
          value={ searchTerm } 
          placeHolder="Find Movies" 
          classes="form-control font-weight-100 mr-3" 
          name="movieSearch"
        />
      }
      <UserDropdown
        user={ user }
        username={ username }
        logOutUser={ logOutUser }
      />   
    </Navbar>  
  )    
}

SiteHeader.propTypes = {
  navbarTitle: PropTypes.string,
  user: PropTypes.object, 
  genres: PropTypes.array, 
  logOutUser: PropTypes.func, 
  username: PropTypes.string,
  searchTerm: PropTypes.string,
  searchOnSubmit: PropTypes.func,
  searchOnChange: PropTypes.func,
  location: PropTypes.object
}

SiteHeader.defaultProps = {
}

export default SiteHeader;
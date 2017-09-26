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
      genre,
      genres, 
      logOutUser, 
      username,
      searchTerm,
      searchOnSubmit,
      searchOnChange,
      location,
      genreOnClick
    } = props,
    userDropdown = () => {
      return (
        <UserDropdown
          user={ user }
          username={ username }
          logOutUser={ logOutUser }
          classes={ 'user-dropdown'}
        />
      )
    },
    genreNameFromLocation = () => {
      return genres       
        .filter((genre) => {
          return genre.key === location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
        })
        .map((item, index) => {  
          return item.title
        }).join('')       
    },
    isGenrePath = () => {
      return location.pathname.substring(1, location.pathname.lastIndexOf('/') )  === 'genre'   
    }    

  return (
    <Navbar 
      title={ navbarTitle }
      menuItem={ userDropdown() }
      classes={ !user ? 'flex-row' : ''}
      user={ user }
    >
      { // user &&
        <ul className="navbar-nav">
          <li className="navbar-item my-3 my-md-0">
            <DropdownSelect 
              title={ isGenrePath() ? 
                genreNameFromLocation() 
                : 'Genres'
              } 
              classes="mr-md-3 genre-dropdown"
              caret={ true }
            >
              <GenreDropdownMenu
                items={ genres }
                onClick={ genreOnClick }
              />  
            </DropdownSelect> 
          </li>
        </ul>  
      }
      { // user &&
        <InputField 
          onSubmit={ searchOnSubmit } 
          onChange={ searchOnChange } 
          value={ searchTerm } 
          placeHolder="Find Movies" 
          classes="form-control font-weight-100 mr-3" 
          name="movieSearch"
        />
      }
    </Navbar>  
  )    
}

SiteHeader.propTypes = {
  navbarTitle: PropTypes.string,
  user: PropTypes.object, 
  genre: PropTypes.string,
  genres: PropTypes.array, 
  logOutUser: PropTypes.func, 
  username: PropTypes.string,
  searchTerm: PropTypes.string,
  searchOnSubmit: PropTypes.func,
  searchOnChange: PropTypes.func,
  location: PropTypes.object,
  genreOnClick: PropTypes.func
}

SiteHeader.defaultProps = {
}

export default SiteHeader;
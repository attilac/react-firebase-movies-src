// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'

function SortingDropdown(props) {
  const { 
    user, 
    username, 
    logOutUser, 
    classes,
    value,
    handleSortChange 
  } = props

  return (  
    <select 
      className={`custom-select sort-select ${classes}`}
      value={ value } 
      onChange={ handleSortChange }
    >
      <option value="title">Title</option>
      <option value="year">Year</option>
    </select>
  )  
}

SortingDropdown.propTypes = {
  classes: PropTypes.string,
  handleSortChange: PropTypes.func,
  logOutUser: PropTypes.func,
  user: PropTypes.object,
  username: PropTypes.string,
  value: PropTypes.string
}

export default SortingDropdown;
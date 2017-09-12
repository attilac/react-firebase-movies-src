// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Navbar(props) {
  const { title, children } = props
  return <nav className="navbar navbar-toggleable-sm navbar-inverse bg-inverse mb-3">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>        
    <Link className="navbar-brand" to="/">{ title }</Link>
    <div className="collapse navbar-collapse" id="navbarContent">
      <div className="mr-auto"></div>
      { children }
    </div>                        
  </nav>;        
}

Navbar.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array  
}

Navbar.defaultProps = {
  currentItem: 'Genres'
}

export default Navbar;
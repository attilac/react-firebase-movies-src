// eslint-disable-next-line
import React, { Component } from 'react';

function Navbar(props) {
  const { title, children } = props
  return <nav className="navbar navbar-toggleable-sm navbar-inverse bg-inverse mb-3">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>        
    <a className="navbar-brand" href="/">{ title }</a>
    <div className="collapse navbar-collapse" id="navbarContent">
      <div className="mr-auto"></div>
      { children }
    </div>                        
  </nav>;        
}

export default Navbar;
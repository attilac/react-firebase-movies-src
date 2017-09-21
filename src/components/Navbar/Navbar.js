// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Collapse } from 'reactstrap'

class Navbar extends Component {
  state = {
    collapsed: true
  }

  toggleNavbar = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    const { title, children, isOpen } = this.props,
      { collapsed } = this.state

    return (
      <nav className="navbar navbar-toggleable-sm navbar-inverse bg-inverse mb-3">
        <button 
          className="navbar-toggler navbar-toggler-right" 
          type="button" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          onClick={ this.toggleNavbar }
        >
          <span className="navbar-toggler-icon"></span>
        </button>    
        <Link className="navbar-brand" to="/">{ title }</Link>
        <Collapse className="navbar-collapse" isOpen={ !collapsed }>
          <div className="mr-auto"></div>
          { children }
        </Collapse>                       
      </nav>   
    ) 
  }       
}

Navbar.propTypes = {
  collapsed: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.array,
  isOpen: PropTypes.bool,
  toggleNavbar: PropTypes.func  
}

Navbar.defaultProps = {
  currentItem: 'Genres'
}

export default Navbar;
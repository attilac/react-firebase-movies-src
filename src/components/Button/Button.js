// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'  

function Button(props) {
  const { 
      active, 
      classes, 
      color, 
      htmlType, 
      icon, 
      onClick, 
      title, 
      titleText 
    } = props,
    isActive = active ? 'active' : '',
    variant = color ? `btn-${color}` : ''

  return(
    <button onClick={ onClick } type={ htmlType } className={ `btn ${variant} ${isActive} ${ classes }`} title={ titleText }>
      { icon }
      { title }
    </button>
  )
}

Button.propTypes = {
  active: PropTypes.bool,
  classes: PropTypes.string,
  color: PropTypes.string,
  htmlType: PropTypes.string,
  title: PropTypes.string,
  titleText: PropTypes.string,
  icon: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
  title: 'Default Title',
  htmlType: 'button'
}

export default Button;
// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'  

function Button(props) {
  const { active, color, classes, htmlType, title, onClick } = props,
    isActive = active ? 'active' : '',
    variant = color ? `btn-${color}` : ''

  return(
    <button onClick={ onClick } type={ htmlType } className={ `btn ${variant} ${isActive} ${ classes }` } >
      { title }
    </button>
  )
}

Button.propTypes = {
  active: PropTypes.bool,
  classes: PropTypes.string,
  color: PropTypes.string,
  htmlType: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
  title: 'Default Title',
  htmlType: 'button'
}

export default Button;
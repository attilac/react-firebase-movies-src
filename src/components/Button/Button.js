// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'  

function Button(props) {
  const { active, color, htmlType, title, onClick } = props,
    isActive = active ? 'active' : '',
    variant = color ? `btn-${color}` : ''

  return(
    <button onClick={ onClick } type={ htmlType } className={ `btn ${variant} ${isActive}` } >
      { title }
    </button>
  )
}

Button.propTypes = {
  active: PropTypes.bool,
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
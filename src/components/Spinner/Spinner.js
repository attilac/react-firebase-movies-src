// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'  

function Spinner(props) {

  return(
    <section className="ajax-load-indicator-container text-center">
      <div className="ajax-load-indicator-inner">
        <i className="fa fa-spinner fa-spin"></i>
      </div>
    </section>
  )
}

export default Spinner;
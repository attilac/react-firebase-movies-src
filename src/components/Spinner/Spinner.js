// eslint-disable-next-line
import React, { Component } from 'react';

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
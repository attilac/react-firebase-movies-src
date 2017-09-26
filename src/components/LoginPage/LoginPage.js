// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'

function LoginPage(props) {
    
  return <div className="row">
    <div className="col-sm-8 col-md-6 push-sm-2 push-md-3">
      <div className="card mb-3">
        <div className="card-block">   
          <h2 className="card-title">Log in</h2>
          { props.children }
        </div>  
      </div>  
    </div>  
  </div>                   
}

LoginPage.propTypes = {
  children: PropTypes.object,
}

export default LoginPage;
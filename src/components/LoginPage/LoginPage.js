// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'

import LoginForm from '../LoginForm/LoginForm.js'

function LoginPage(props) {
  const { errorMessage, onFormSubmit, submitBtnLabel, handleGoogleLogin }  = props

  return <div className="row">
    <div className="col-sm-8 col-md-6 push-sm-2 push-md-3">
      <div className="card mb-3">
        <div className="card-block">   
          <h2 className="card-title">Log in</h2>
          <LoginForm 
            submitBtnLabel={ submitBtnLabel }
            errorMessage={ errorMessage }
            onFormSubmit={ onFormSubmit } 
            handleGoogleLogin={ handleGoogleLogin }
          />          
          { props.children }
        </div>  
      </div>  
    </div>  
  </div>                   
}

LoginPage.propTypes = {
  errorMessage: PropTypes.string,
  children: PropTypes.object,
  handleGoogleLogin: PropTypes.func,
  onFormSubmit: PropTypes.func,
  submitBtnLabel: PropTypes.string
}

export default LoginPage;
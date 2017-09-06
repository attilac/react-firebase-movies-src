import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm.js'

function LoginPage(props) {
  const { fieldOnChange, formOnSubmit, submitText, formErrors, password, isPasswordValid, username, isUsernameValid, isLoggedIn } = props

  return <div className="container-fluid">
    <div className="row">
      <div className="col-sm-6 push-sm-3">
        <div className="card mb-3">
          <div className="card-block">   
            <LoginForm submitText="Login" fieldOnChange={ fieldOnChange } formOnSubmit={ formOnSubmit } formErrors={ formErrors } password={ password } isPasswordValid={ isPasswordValid } isUsernameValid={ isUsernameValid } isLoggedIn={ isLoggedIn }/>
          </div>  
        </div>  
      </div>  
    </div>  
  </div>                  
}

export default LoginPage;
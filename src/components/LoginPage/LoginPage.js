import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm.js'

function LoginPage(props) {
    
  return <div className="container-fluid">
    <div className="row">
      <div className="col-sm-6 push-sm-3">
        <div className="card mb-3">
          <div className="card-block">   
            <LoginForm submitText="Login" { ...props }/>
          </div>  
        </div>  
      </div>  
    </div>  
  </div>                  
}

export default LoginPage;
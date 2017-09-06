// eslint-disable-next-line
import React, { Component } from 'react';

class LoginForm extends Component {   

  errorClass(isFieldValid) {
    return isFieldValid ? '' : 'has-danger';     
  } 

  warningClass(isFieldValid) {
    return isFieldValid ? '' : 'has-warning';     
  } 

  successClass(isFieldValid) {
    return isFieldValid ? 'has-success' : '';     
  }    

  render() {
    const { fieldOnChange, formOnSubmit, submitText, formErrors, password, isPasswordValid, username, isUsernameValid, isLoggedIn } = this.props

    return (   
      <form onSubmit={ formOnSubmit } className="form">
        <div className={ `form-group ${this.errorClass(isUsernameValid)}` }>
          <label htmlFor="username">Name</label>
          <input 
            type="text" 
            className="form-control" 
            name="username" 
            aria-describedby="userHelp" 
            onChange={ fieldOnChange }
            value={ username }
          />
          { 
            !isUsernameValid && <div className="form-control-feedback">{ formErrors.username }</div> 
          }
        </div>
        <div className={ `form-group ${this.errorClass(isPasswordValid)}` } >
          <label htmlFor="inputPassword">Password</label>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            onChange={ fieldOnChange }
            value={ password }
          />
          { 
            !isPasswordValid && <div className="form-control-feedback">{ formErrors.password }</div> 
          }
        </div>
        <button className="btn btn-success my-2 my-sm-0" type="submit">{ submitText }</button>
      </form>              
    );
  }
}

export default LoginForm;    
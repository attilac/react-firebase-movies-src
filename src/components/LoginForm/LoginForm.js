// eslint-disable-next-line
import React, { Component } from 'react';

class LoginForm extends Component {  

  state = {    
    formErrors: {
      password: '',     
      username: ''
    },
    formIsValid: false,   
    loggedIn: false, 
    password: '',
    passwordIsValid: true,
    username: '',
    usernameIsValid: true
  }   

  fieldOnChange = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value}, 
      () => { 
        this.validateField(name, value) 
      })       
  }     

  formOnSubmit = (event) => {
    event.preventDefault()
    const { username, password, formIsValid } = this.state
    if (formIsValid) {
      this.setState({ loggedIn: true},
        () => { 
          console.log(this.state.loggedIn) 
          console.log(username)
          console.log(password)       
        })
    }
  } 

  validateField(fieldName, value) {
    let { formErrors, usernameIsValid, passwordIsValid } = this.state;

    switch (fieldName) {
    case 'username': {
      usernameIsValid = value.length > 0;
      formErrors.username = usernameIsValid ? '' : 'Username is required';
      break;
    } 
    case 'password': {
      if (value.length === 0) {
        formErrors.password = 'Password is required';
      } else {
        passwordIsValid = value.length > 1 && value.length >= 8;
        formErrors.password = passwordIsValid ? '' : 'Password is too short. Please use at least 8 chars.';
      } 
      break;
    } 
    default: {
      break;
    }
    }

    this.setState({ 
      usernameIsValid: usernameIsValid, 
      formErrors: formErrors, 
      passwordIsValid: passwordIsValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({formIsValid: this.state.usernameIsValid && this.state.passwordIsValid});
  }  

  errorClass(fieldIsValid) {
    return fieldIsValid ? '' : 'has-danger';     
  } 

  warningClass(fieldIsValid) {
    return fieldIsValid ? '' : 'has-warning';     
  } 

  successClass(fieldIsValid) {
    return fieldIsValid ? 'has-success' : '';     
  }    

  render() {
    const { submitText } = this.props,
      { formErrors, password, passwordIsValid, username, usernameIsValid } = this.state

    return (
      <form onSubmit={ this.formOnSubmit } className="form">
        <div className={ `form-group ${this.errorClass(usernameIsValid)}` }>
          <label htmlFor="username">Name</label>
          <input 
            type="text" 
            className="form-control" 
            name="username" 
            aria-describedby="userHelp" 
            onChange={ this.fieldOnChange }
            value={ username }
          />
          { 
            !usernameIsValid && <div className="form-control-feedback">{ formErrors.username }</div> 
          }
        </div>
        <div className={ `form-group ${this.errorClass(passwordIsValid)}` } >
          <label htmlFor="inputPassword">Password</label>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            onChange={ this.fieldOnChange }
            value={ password }
          />
          { 
            !passwordIsValid && <div className="form-control-feedback">{ formErrors.password }</div> 
          }
        </div>
        <button className="btn btn-success my-2 my-sm-0" type="submit">{ submitText }</button>
      </form>
    );
  }
}

export default LoginForm;    
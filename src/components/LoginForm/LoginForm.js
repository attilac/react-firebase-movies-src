// eslint-disable-next-line
import React, { Component } from 'react';

class LoginForm extends Component {  

  state = {
    formErrors: {
      password: '',     
      username: ''
    },    
    isFormValid: false,   
    isLoggedIn: false, 
    isPasswordValid: true,
    isUsernameValid: true ,
    password: '',
    searchTerm: '',
    username: ''
  }

  fieldOnChange = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value}, 
      () => { 
        this.validateField(name, value) 
      })       
  }     

  onFormSubmit = (event) => {
    event.preventDefault()
    const { username, password, isFormValid } = this.state
    if (isFormValid) {
      /*
      this.setState({ isLoggedIn: true},
        () => { 
          console.log(this.state.isLoggedIn) 
          console.log(username)
          console.log(password)       
        }) */
      this.props.onFormSubmit( username, password )
      //console.log(this.props)
    }
  } 

  validateField(fieldName, value) {
    let { formErrors, isUsernameValid, isPasswordValid } = this.state;

    switch (fieldName) {
    case 'username': {
      isUsernameValid = value.length > 0;
      formErrors.username = isUsernameValid ? '' : 'Username is required';
      break;
    } 
    case 'password': {
      if (value.length === 0) {
        formErrors.password = 'Password is required';
      } else {
        isPasswordValid = value.length > 1 && value.length >= 8;
        formErrors.password = isPasswordValid ? '' : 'Password is too short. Please use at least 8 chars.';
      } 
      break;
    } 
    default: {
      break;
    }
    }

    this.setState({ 
      isUsernameValid: isUsernameValid, 
      formErrors: formErrors, 
      isPasswordValid: isPasswordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({isFormValid: this.state.isUsernameValid && this.state.isPasswordValid});
  }   

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
    const { submitText, onFormSubmit } = this.props,
      { formErrors, password, isPasswordValid, username, isUsernameValid, isLoggedIn } = this.state
    //console.log(this.props)  
    return (   
      <form onSubmit={ this.onFormSubmit } className="form">
        <div className={ `form-group ${this.errorClass(isUsernameValid)}` }>
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
            !isUsernameValid && <div className="form-control-feedback">{ formErrors.username }</div> 
          }
        </div>
        <div className={ `form-group ${this.errorClass(isPasswordValid)}` } >
          <label htmlFor="inputPassword">Password</label>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            onChange={ this.fieldOnChange }
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
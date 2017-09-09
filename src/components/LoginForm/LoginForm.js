// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'  
import Button from '../Button/Button.js';
import InputField from '../InputField/InputField.js';

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

  onSubmit = (event) => {
    event.preventDefault()
    const { username, password, isFormValid } = this.state
    if (isFormValid) {
      this.props.onFormSubmit( username, password )
    } else {
      this.validateField('username', username)
      this.validateField('password', password)
    }
  } 

  onButtonClick = (event) => {
    //console.log(event.target)
  }

  validateField(fieldName, value) {
    let { formErrors, isUsernameValid, isPasswordValid } = this.state

    if (fieldName === 'username') {
      isUsernameValid = value ? true : false
      formErrors.username = isUsernameValid ? '' : 'Username is required'
      this.setState({ isUsernameValid: isUsernameValid, formErrors: formErrors }, this.validateForm)
    } else if (fieldName === 'password') {
      if (value) {
        isPasswordValid = value.length >= 8;
        formErrors.password = isPasswordValid ? '' : 'Password is too short. Please use at least 8 chars.';       
      } else {
        isPasswordValid = false      
        formErrors.password = isPasswordValid ? '' : 'Password is required'
      } 
      this.setState({ isPasswordValid: isPasswordValid, formErrors: formErrors }, this.validateForm)
    }
  }

  validateForm() {
    //console.log(this.state.username)
    //console.log(this.state.password)
    //console.log(this.state.isFormValid)
    //console.log(this.state.formErrors)
    this.setState({ isFormValid: this.state.isUsernameValid && this.state.isPasswordValid });
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

    return (   
      <form onSubmit={ this.onSubmit } className="form">
        <div className={ `form-group ${ this.errorClass(isUsernameValid)}` }>
          <label htmlFor="username">Name</label>
          <InputField 
            htmlType="text" 
            classes="form-control"
            name="username" 
            onChange={ this.fieldOnChange }
            value={ username }
          />
          { 
            !isUsernameValid && <div className="form-control-feedback">{ formErrors.username }</div> 
          }
        </div>
        <div className={ `form-group ${ this.errorClass(isPasswordValid) }` } >
          <label htmlFor="inputPassword">Password</label>
          <InputField 
            htmlType="password" 
            classes="form-control" 
            name="password" 
            onChange={ this.fieldOnChange }
            value={ password }
          />
          { 
            !isPasswordValid && 
            <div className="form-control-feedback">{ formErrors.password }</div> 
          }
        </div>
        <Button 
          onClick={ this.onButtonClick } 
          htmlType="submit" 
          className="my-2 my-sm-0" 
          title={ submitText } 
          color="success" 
        />
      </form>              
    );
  }
}

LoginForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired, 
  submitText: PropTypes.string.isRequired   
}

export default LoginForm;    
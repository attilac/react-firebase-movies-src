// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'  
import Button from '../Button/Button.js';
import InputField from '../InputField/InputField.js';

class LoginForm extends Component {  

  state = {
    formErrors: {
      password: '',     
      email: ''
    },    
    isFormValid: false,   
    isPasswordValid: true,
    isEmailValid: true ,
    password: '',
    searchTerm: '',
    email: ''
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
    const { email, password, isFormValid } = this.state
    if (isFormValid) {
      this.props.onFormSubmit( email, password )
    } else {
      this.validateField('email', email)
      this.validateField('password', password)
    }
  } 

  onButtonClick = (event) => {
    //console.log(event.target)
  }

  validateField(fieldName, value) {
    let { formErrors, isEmailValid, isPasswordValid } = this.state

    if (fieldName === 'email') {
      //console.log('email validate')
      isEmailValid = value ? true : false
      formErrors.email = isEmailValid ? '' : 'Email is required'
      this.setState({ isEmailValid: isEmailValid, formErrors: formErrors }, this.validateForm)
    } else if (fieldName === 'password') {
      isPasswordValid = value ? true : false 
      formErrors.password = isPasswordValid ? '' : 'Password is required'
      this.setState({ isPasswordValid: isPasswordValid, formErrors: formErrors }, this.validateForm)
    }
  }

  validateForm() {
    this.setState({ isFormValid: this.state.isEmailValid && this.state.isPasswordValid });
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
    const 
      { 
        errorMessage, 
        submitBtnLabel, 
        handleGoogleLogin 
      } = this.props,
      { 
        formErrors, 
        password, 
        isPasswordValid, 
        email, 
        isEmailValid 
      } = this.state

    return (   
      <form onSubmit={ this.onSubmit } className="form">
        {
          errorMessage &&
            <div className="alert alert-info mb-3">
              <p>{ errorMessage }</p>
            </div>
        }       
        <div className={ `form-group ${ this.errorClass(isEmailValid)}` }>
          <label htmlFor="email">Email</label>
          <InputField 
            htmlType="email" 
            classes="form-control"
            name="email" 
            onChange={ this.fieldOnChange }
            onBlur={ this.fieldOnChange }
            value={ email }
          />
          { 
            !isEmailValid && 
              <div className="form-control-feedback">
                { formErrors.email }
              </div> 
          }
        </div>
        <div className={ `form-group ${ this.errorClass(isPasswordValid) }` } >
          <label htmlFor="inputPassword">Password</label>
          <InputField 
            htmlType="password" 
            classes="form-control" 
            name="password" 
            onChange={ this.fieldOnChange }
            onBlur={ this.fieldOnChange }
            value={ password }
          />
          { 
            !isPasswordValid && 
              <div className="form-control-feedback">
                { formErrors.password }
              </div> 
          }
        </div>
        <Button 
          onClick={ this.onButtonClick } 
          htmlType="submit" 
          classes="btn-block mt-5 mb-5 btn-flat-shadow" 
          title={ submitBtnLabel } 
          color="danger" 
        /> 
        <hr />
        <Button 
          onClick={ handleGoogleLogin } 
          htmlType="button" 
          classes="btn-sm mb-3" 
          title="Login with Google" 
          color="secondary" 
          icon={ <i className="fa fa-google mr-1"></i> }
        />                
      </form>              
    );
  }
}

LoginForm.propTypes = {
  errorMessage: PropTypes.string,
  handleGoogleLogin: PropTypes.func,
  onFormSubmit: PropTypes.func.isRequired, 
  submitBtnLabel: PropTypes.string.isRequired   
}

export default LoginForm;    
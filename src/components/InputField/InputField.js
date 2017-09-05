// eslint-disable-next-line
import React, { Component } from 'react';

function InputField(props) {
	const { onSubmit, onChange, inputValue, placeHolder , classes } = props
  return <input 
			type="text" 
			onKeyPress={ onSubmit }
			onChange={ onChange }
			value={ inputValue }
			className={ `form-control ${ classes }` }
			placeholder={ placeHolder }
			name="searchTerm"
		/>;
}

export default InputField;
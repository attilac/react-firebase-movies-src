// eslint-disable-next-line
import React, { Component } from 'react';

function SearchForm( props ) {
	const { onSubmit, children, submitText } = props
	  return <form onSubmit={ onSubmit } className="form-inline my-2 my-lg-0">
	      { children }
	      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">{ submitText }</button>
	    </form>;
}

export default SearchForm;    
import React, { Component } from 'react';

function LoginPage(props) {
    
  return <div className="row">
    <div className="col-sm-6 push-sm-3">
      <div className="card mb-3">
        <div className="card-block">   
          { props.children }
        </div>  
      </div>  
    </div>  
  </div>                   
}

export default LoginPage;
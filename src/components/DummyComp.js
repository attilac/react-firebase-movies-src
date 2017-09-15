import React, { Component } from 'react';

const DummyComp = ({ match, props }) => {
  console.log(match)
  console.log(props)
  return <div>
    <h1>Hello {match.params.propname}!</h1>
  </div>  
}

export default DummyComp

// eslint-disable-next-line
import React, { Component } from 'react';
import Movie from '../Movie/Movie.js';

function MovieList(props) {
  // console.log(props.movies)
  const { movies, colWidth } = props,
    list = movies
      .map((item, index) =>
        <div key={ index } className={ colWidth }>
          <Movie title={ item.title } poster={ `img/${item.poster}` } />
        </div>  
      );

  return <section className="MovieList">
    <div className="row">
      { list }
    </div>  
  </section>    
}

export default MovieList;


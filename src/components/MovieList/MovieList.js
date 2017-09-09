// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Movie from '../Movie/Movie.js';

function MovieList(props) {
  // console.log(props.movies)
  const { movies, colWidth } = props,
    list = movies
      .map((item, index) =>
        <div key={ index } className={ colWidth }>
          <Movie title={ item.title } poster={ `img/${item.poster}` } year={ item.year }/>
        </div>  
      );

  return <section className="MovieList">
    <div className="row">
      { list }
    </div>  
  </section>    
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  colWidth: PropTypes.string
}

export default MovieList;
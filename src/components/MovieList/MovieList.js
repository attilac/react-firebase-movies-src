// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Movie from '../Movie/Movie.js';

function MovieList(props) {
  const { movies, colWidth } = props,

    getGenreLinkList = function(genres){
      const genreLinks = genres
        .map((genre, index) =>
          <li key={ index } className="list-inline-item movie-genre-item">
            <a className="genre-link" href={ `/genre/${genre.toLowerCase()}`}>
              <small>{ genre }</small>
            </a>
          </li>
        )
      return <ul className="list-inline movie-genre-list">
        { genreLinks }
      </ul>
    }, 

    list = movies
      .map((item, index) =>
        <div key={ index } className={ colWidth }>
          <Movie title={ item.title } poster={ `img/${item.poster}` } year={ item.year }>
            { getGenreLinkList(item.genres) }
          </Movie>
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
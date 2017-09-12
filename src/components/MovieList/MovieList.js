// eslint-disable-next-line
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Movie from '../Movie/Movie.js';

function MovieList(props) {
  const { movies, colWidth, genreOnClick } = props,

    getGenreLinkList = function(genres){
      const genreLinks = genres
        .map((genre, index) =>
          <li key={ index } className="list-inline-item movie-genre-item">
            <Link className="genre-link" to={ `/genre/${genre}`} onClick={ genreOnClick }>
              { genre }
            </Link>
          </li>
        )
      return <ul className="list-inline movie-genre-list">
        { genreLinks }
      </ul>
    },   

    list = movies
      .map((item, index) =>
        <div key={ index } className={ colWidth }>
          <Movie title={ item.title } poster={ `/img/${item.poster}` } year={ item.year }>
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
  colWidth: PropTypes.string,
  genreOnClick: PropTypes.func
}

export default MovieList;
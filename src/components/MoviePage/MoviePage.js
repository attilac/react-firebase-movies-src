import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from '../../firebase.js'

import MovieList from '../MovieList/MovieList.js'
import Spinner from '../Spinner/Spinner'

class MoviePage extends Component {

  state = {
    movies: [],
    moviesByGenre: []
  }

  componentDidMount() {   
    //this.getMoviesByGenre(this.props.match.params.genreName)
  } 

  componentWillMount() { 
    //console.log(this.props.match.params.genreName)
    this.props.match.params.genreName === undefined ?
      this.getMoviesFromFirebase()
      :
      this.getMoviesByGenre(this.props.match.params.genreName)
  }

  componentWillReceiveProps(nextProps) { 
    //console.log('componentWillReceiveProps')
    if(nextProps.match.params.genreName === undefined){
      this.getMoviesFromFirebase()
    } else if (nextProps.match.params.genreName !== this.props.match.params.genreName) { 
      this.setState({ movies: [] })
      this.getMoviesByGenre(nextProps.match.params.genreName)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log('componentWillUpdate')
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdate')  
    //console.log(prevProps.match.params.genreName) 
  } 

  componentWillUnmount() {
    //console.log('componentWillUnmount')      
  } 

  getMoviesByGenre = (genreId) => {
    let movies = []
    firebase.database()
      .ref('movies')
      .orderByChild(`genres/${genreId}`)
      .equalTo(true)
      .limitToLast(50)
      .on('child_added', (snapshot) => {
        //let movies = [...this.state.movies]
        const movie = snapshot.val()
        movie['key'] = snapshot.key   
        movies.push(movie)
        //console.log(movies)
        //console.log('Added movie!')
        this.setState({ movies: movies })  
      })  
  }         

  getMoviesFromFirebase = () => {
    let movies = []
    firebase.database()
      .ref('movies')
      //.orderByChild('year')
      .limitToLast(50)      
      .on('child_added', (snapshot) => {
        //console.log(snapshot.key)
        //let movies = [...this.state.movies]
        const movie = snapshot.val()
        movie['key'] = snapshot.key   
        movies.push(movie)
        //console.log(movies)
        //console.log('Added movie!')
        this.setState({ movies: movies })  
      }) 
  }        

  getMoviesBySearchTerm(movies) {
    const { searchTerm } = this.props
    return movies
      .filter(movie => movie.title
        .includes(searchTerm)) 
  }        
 
  render() {
    const { movies } = this.state,
      { searchTerm, genres } = this.props

    return ( 
      movies.length ?   
        <MovieList 
          movies={
            searchTerm ? 
              this.getMoviesBySearchTerm(movies) 
              : movies
          } 
          colWidth="col-6 col-sm-3 col-md-3 col-lg-2 mb-4"
          genres={genres}
        />   
        : 
        <Spinner />      
    )
  } 
}

MoviePage.propTypes = {
  genres: PropTypes.array,
  genre: PropTypes.string,
  searchTerm: PropTypes.string
}

export default MoviePage  
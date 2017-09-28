import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from '../../firebase.js'

import MovieList from '../MovieList/MovieList.js'
import SortingDropdown from '../SortingDropdown/SortingDropdown.js'
import Spinner from '../Spinner/Spinner'

import utils from '../../scripts/utils.js'

class MoviePage extends Component {

  handleSortChange = this.handleSortChange.bind(this);

  state = {
    genre: undefined,
    movies: [],
    moviesByGenre: [],
    sortBy: 'year',
    sortOrder: 'DESC'
  }

  componentDidMount() {   
  } 

  componentWillMount() { 
    //console.log(this.props.match.params.genreName)
    const { match, user, myList } = this.props
    if(match.params.genreName === undefined) {
      user && myList ?
        this.getFavoriteList()
        :
        this.getMoviesFromFirebase()
      this.setState({ genre: undefined })  
    } else {
      this.getMoviesByGenre(match.params.genreName)  
      const genreName = this.props.getGenreNameFromKey(match.params.genreName)
      this.setState({ genre: genreName })         
    }  
  }

  componentWillReceiveProps(nextProps) { 
    console.log('componentWillReceiveProps')
    const { match, user, myList, getGenreNameFromKey } = this.props
    if(nextProps.match.params.genreName === undefined){
      user && myList ?
        this.getFavoriteList()
        :
        this.getMoviesFromFirebase()
      this.setState({ genre: undefined })
    } else if (nextProps.match.params.genreName !== match.params.genreName) { 
      this.setState({ movies: [] })
      const genreName = getGenreNameFromKey(nextProps.match.params.genreName)
      this.setState({ genre: genreName })
      this.getMoviesByGenre(nextProps.match.params.genreName)
    } else {
      //console.log(this.props.genres)
      const genreName = getGenreNameFromKey(nextProps.match.params.genreName)
      this.setState({ genre: genreName })     
    }
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log('componentWillUpdate')
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdate')  
  } 

  componentWillUnmount() {
    firebase.database()
      .ref('movies')
      .off()   
    console.log('componentWillUnmount')      
  }   

  getMoviesByGenre = (genreId) => {

    firebase.database()
      .ref('movies')
      .orderByChild(`genres/${genreId}`)
      .equalTo(true)
      .limitToLast(36)
      /*
      .on('child_added', (snapshot) => {
        //let movies = [...this.state.movies]
        const movie = snapshot.val()
        movie['key'] = snapshot.key   
        movies.push(movie)
        //console.log(movies)
        //console.log('Added movie!')
        this.setState({ movies: movies })  
      }) 
      */
      .on('value', (snapshot) => {
        //console.log(snapshot.val())      
        let movies = []
        for (var prop in snapshot.val()) {
          let movie = snapshot.val()[prop]
          movie['key'] = prop
          movies.push(movie)
        } 
        this.setState({ movies: movies })
        console.log('Fetched Movies!')
      })  
        
  }         

  getMoviesFromFirebase = () => {
    firebase.database()
      .ref('movies')
      //.orderByChild('year')
      .limitToLast(36)  
      .on('value', (snapshot) => {
        //console.log(snapshot.val())      
        let movies = []
        for (var prop in snapshot.val()) {
          let movie = snapshot.val()[prop]
          movie['key'] = prop
          movies.push(movie)
        } 
        this.setState({ movies: movies })
        console.log('Fetched Movies!')
      })        
  }  

  getFavoriteList = () => {
    //console.log('hej')
    const { uid } = this.props.user
    //console.log(uid)
    firebase.database()
      .ref('movies')
      .orderByChild(`users/${uid}`)
      .startAt(true)
      .on('value', (snapshot) => {
        //console.log(snapshot.val())      
        let movies = []
        for (var prop in snapshot.val()) {
          let movie = snapshot.val()[prop]
          movie['key'] = prop
          //console.log(movie)
          movies.push(movie)
        } 
        this.setState({ movies: movies })
        console.log('Fetched Movies!')
      })     
  }

  getMoviesFromHeroku() {
    fetch('https://fend-api.herokuapp.com/movies')
      .then(response => response.json())
      .then(json => { 
        // console.log(json)
        const moviesSorted = utils.sortObjectsByKey(json, 'year', 'DESC')
        this.setState({ movies: moviesSorted })
        this.setState({ genres: this.getGenresFromDatabase() })
        // console.log(this.state.movies)
      })
  }        

  getMoviesBySearchTerm(movies) {
    const { searchTerm } = this.props
    return movies
      .filter(movie => movie.title
        .includes(searchTerm)) 
  }  

  getMoviesPropertyList(key) {
    return this.state.movies
      .map((movie) =>
        movie[key]
      )
  }  
  
  getGenresFromDatabase() {
    return utils.sortArray(utils.getUniqueArray(utils.getConcatArray(this.getMoviesPropertyList('genres'))))
  }  

  handleSortChange(event) {
    const { value } = event.target
    //console.log(value)
    const order = value === 'title' ? 'ASC' : 'DESC'
    if(value) {
      this.setState({ sortBy: value })
      this.setState({ sortOrder: order })
    }
  }
 
  render() {
    const { 
        movies, 
        genre,
        sortBy,
        sortOrder 
      } = this.state,
      { 
        addFavoriteButton,
        addMovieToFavorites,
        genreOnClick, 
        genres, 
        getActorList, 
        getGenreLinkList, 
        getGenreNameFromKey, 
        heading,
        searchTerm, 
        user 
      } = this.props

    utils.sortObjectsByKey(movies, sortBy, sortOrder )

    return ( 
      <div className="p-relative">
        <div className="movie-page-header d-flex flex-row">
          <h1 className="page-title mb-3 font-weight-100 text-uppercase">
            { genre ? genre : heading }
          </h1>
          <div className="ml-auto"></div>
          <span className="mr-2 pt-1">Sort By</span>
          <SortingDropdown 
            classes=""
            value={ sortBy }
            handleSortChange={ this.handleSortChange }
          />
        </div>  
        {  
          movies.length ?   
            <MovieList 
              movies={
                searchTerm ? 
                  this.getMoviesBySearchTerm(movies) 
                  : movies
              } 
              colWidth="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4"
              genres={ genres }
              genreOnClick={ genreOnClick }
              getGenreNameFromKey={ getGenreNameFromKey }
              getGenreLinkList={ getGenreLinkList }
              getActorList={ getActorList }
              user={ user }  
              addMovieToFavorites={ addMovieToFavorites }   
              addFavoriteButton={ addFavoriteButton }     
            />   
            : 
            <Spinner />   
        }  
      </div>     
    )
  } 
}

MoviePage.propTypes = {
  addFavoriteButton: PropTypes.func,
  addMovieToFavorites: PropTypes.func,
  genres: PropTypes.array,
  genreOnClick: PropTypes.func,
  getGenreNameFromKey: PropTypes.func,
  getGenreLinkList: PropTypes.func,
  getActorList: PropTypes.func, 
  heading: PropTypes.string, 
  match: PropTypes.object,
  myList: PropTypes.bool,
  searchTerm: PropTypes.string,
  user: PropTypes.object
}

export default MoviePage  
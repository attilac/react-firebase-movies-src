import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Navbar from './components/Navbar/Navbar.js'
import InputField from './components/InputField/InputField.js'
import LoginForm from './components/LoginForm/LoginForm.js'
import MovieList from './components/MovieList/MovieList.js'
import DropdownSelect from './components/DropdownSelect/DropdownSelect.js'
import './App.css'
import utils from './scripts/utils.js'

class App extends Component {

  toggle = this.dropdownToggle.bind(this);

  state = {
    dropdownOpen: false,
    genre: '',
    genres: [],
    movies: [],
    moviesByGenre: [],
    searchTerm: ''
  }

  componentDidMount() {
    this.getDataFromApi()
    // console.log(this.state.movies)
  }  

  getDataFromApi() {
    fetch('https://fend-api.herokuapp.com/movies')
      .then(response => response.json())
      .then(json => { 
        // console.log(json)
        const moviesSorted = utils.sortObjectsByKey(json, 'title')
        this.setState({ movies: moviesSorted })
        this.setState({ genres: this.getGenresFromDatabase() })
        // console.log(this.state.movies)
      })
  }

  searchOnSubmit = (event) => {
    if (event.key === 'Enter') {
      this.setState({ searchTerm: event.target.value })
    }      
  } 

  searchOnChange = (event) => {
    this.setState({ searchTerm: event.target.value })
  }  

  dropdownToggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  } 

  genreOnClick = (event) => {
    // console.log( e.target.innerHTML ) 
    const moviesFilteredByGenre = this.state.movies.filter(movie => 
      movie.genres.includes(event.target.innerHTML)
    )
    this.setState({   
      genre: event.target.innerHTML,
      moviesByGenre: moviesFilteredByGenre
    })     
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

  render() {
    const { searchTerm, movies, genre, genres, moviesByGenre, dropdownOpen } = this.state,
      heading = genre ? <p> Movies in { genre } </p> : ''

    let moviesToRender = genre ? moviesByGenre : movies
    moviesToRender = searchTerm ? moviesToRender
      .filter(movie => movie.title
        .includes(searchTerm)) : moviesToRender
    // console.log(moviesToRender)

    return (
      <div className="App">

        <Navbar title="React Movies">
          <DropdownSelect dropdownOpen={ dropdownOpen } toggle={ this.dropdownToggle } items={ genres } onClick={ this.genreOnClick } genre={ genre }/>
          <InputField onSubmit={ this.searchOnSubmit } onChange={ this.searchOnChange } value={ searchTerm } placeHolder="Find Movies" classes="font-weight-100"/>
        </Navbar>  
      
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 push-sm-3">
              <div className="card mb-3">
                <div className="card-block">
                  <LoginForm submitText="Login"/>
                </div>  
              </div>  
            </div>  
          </div>  
        </div>  

        <div className="container-fluid">
          { heading }
          <MovieList movies={ moviesToRender } colWidth="col-6 col-sm-3 col-md-3 col-lg-2 mb-4"/>  
        </div>

      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Navbar from './components/Navbar/Navbar.js'
import InputField from './components/InputField/InputField.js'
import LoginPage from './components/LoginPage/LoginPage.js'
import MovieList from './components/MovieList/MovieList.js'
import DropdownSelect from './components/DropdownSelect/DropdownSelect.js'
import './App.css'
import utils from './scripts/utils.js'

class App extends Component {

  dropdownToggle = this.dropdownToggle.bind(this);

  state = {
    dropdownOpen: false,
    formErrors: {
      password: '',     
      username: ''
    },    
    genre: '',
    genres: [],
    isFormValid: false,   
    isLoggedIn: false, 
    isPasswordValid: true,
    isUsernameValid: true ,
    movies: [],
    moviesByGenre: [],
    password: '',
    searchTerm: '',
    username: ''
  }

  componentDidMount() {
    this.getDataFromApi()
    // console.log(this.state.movies)
  }

  fieldOnChange = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value}, 
      () => { 
        this.validateField(name, value) 
      })       
  }     

  formOnSubmit = (event) => {
    event.preventDefault()
    const { username, password, isFormValid } = this.state
    if (isFormValid) {
      this.setState({ isLoggedIn: true},
        () => { 
          console.log(this.state.isLoggedIn) 
          console.log(username)
          console.log(password)       
        })
    }
  } 

  validateField(fieldName, value) {
    let { formErrors, isUsernameValid, isPasswordValid } = this.state;

    switch (fieldName) {
    case 'username': {
      isUsernameValid = value.length > 0;
      formErrors.username = isUsernameValid ? '' : 'Username is required';
      break;
    } 
    case 'password': {
      if (value.length === 0) {
        formErrors.password = 'Password is required';
      } else {
        isPasswordValid = value.length > 1 && value.length >= 8;
        formErrors.password = isPasswordValid ? '' : 'Password is too short. Please use at least 8 chars.';
      } 
      break;
    } 
    default: {
      break;
    }
    }

    this.setState({ 
      isUsernameValid: isUsernameValid, 
      formErrors: formErrors, 
      isPasswordValid: isPasswordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({isFormValid: this.state.isUsernameValid && this.state.isPasswordValid});
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
      { formErrors, password, isPasswordValid, username, isUsernameValid, isLoggedIn } = this.state,
      heading = genre ? <p> Movies in { genre } </p> : '',
      greeting = isLoggedIn ? <p> Hello { username } </p> : ''

    let moviesToRender = genre ? moviesByGenre : movies
    moviesToRender = searchTerm ? moviesToRender
      .filter(movie => movie.title
        .includes(searchTerm)) : moviesToRender
    // console.log(moviesToRender)

    return (
      <div className="App">

        <Navbar title="React Movies">
          { isLoggedIn &&
            <DropdownSelect dropdownOpen={ dropdownOpen } toggle={ this.dropdownToggle } items={ genres } onClick={ this.genreOnClick } genre={ genre }/> 
          }
          { isLoggedIn &&
            <InputField onSubmit={ this.searchOnSubmit } onChange={ this.searchOnChange } value={ searchTerm } placeHolder="Find Movies" classes="font-weight-100"/>
          }
        </Navbar>  

        { !isLoggedIn &&
            <LoginPage submitText="Login" fieldOnChange={ this.fieldOnChange } formOnSubmit={ this.formOnSubmit } formErrors={ formErrors } password={ password } isPasswordValid={ isPasswordValid } isUsernameValid={ isUsernameValid } isLoggedIn={ isLoggedIn }/>
        }

        { isLoggedIn &&
          <div className="container-fluid">
            { /* heading */ }
            { /* greeting */ }
            <MovieList movies={ moviesToRender } colWidth="col-6 col-sm-3 col-md-3 col-lg-2 mb-4"/>  
          </div>
        }  
      </div>
    )
  }
}

export default App

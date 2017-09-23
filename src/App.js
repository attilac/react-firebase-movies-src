import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import firebase from './firebase.js'
//import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
//import Navbar from './components/Navbar/Navbar.js'
import SiteHeader from './components/SiteHeader/SiteHeader.js'
//import InputField from './components/InputField/InputField.js'
//import UserDropdown from './components/UserDropdown/UserDropdown.js'
import LoginForm from './components/LoginForm/LoginForm.js'
import LoginPage from './components/LoginPage/LoginPage.js'
import MovieList from './components/MovieList/MovieList.js'
import MoviePage from './components/MoviePage/MoviePage.js'
//import DropdownSelect from './components/DropdownSelect/DropdownSelect.js'
//import GenreDropdownMenu from './components/GenreDropdownMenu/GenreDropdownMenu.js'
import PropsRoute from './components/PropsRoute/PropsRoute.js'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js'
import ScrollToTop from './components/ScrollToTop.js'
import Spinner from './components/Spinner/Spinner'
import utils from './scripts/utils.js'
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './App.css'
import Movies from './movies.js'

class App extends Component {

  state = {
    errorMessage: '',
    genres: [],
    genreObjectList: [],
    movies: [],
    moviesByGenre: [],
    password: '',
    searchTerm: '',
    user: undefined,
    username: ''
  }

  componentDidMount() {
    //this.getDataFromApi()
    //this.childAdded()
    //this.postMovies()

    firebase
      .auth()
      .onAuthStateChanged(user => {
        if(user) {
          //const displayName = user.displayName;
          const email = user.email;
          //const emailVerified = user.emailVerified;
          //const photoURL = user.photoURL;
          //const uid = user.uid; //KEY! UID!         
          this.setState({ 
            user: user,
            username: email
          })
          console.log(user)

          this.getGenresFromFirebase()
          //this.getMoviesFromFirebase()  

        } else {
          this.setState({ 
            user: user,
            username: ''
          })          
        }
      })
  } 

  componentWillUnmount() {
    firebase
      .auth()
      .unsubscribeAuthStateChanged()
  } 

  childAdded = () => {
    firebase.database()
      .ref('movies')
      .orderByChild('date')
      .limitToLast()      
      .on('child_added', (snapshot) => {
        //console.log(snapshot.key)
        let movies = [...this.state.movies]
        const movie = snapshot.val()
        movie['key'] = snapshot.key   
        movies.push(movie)
        console.log(movies)
        //console.log('Added movie!')
        this.setState({ movies: movies })  
        //this.setState({ genres: this.getGenresFromDatabase() })
      })
  }  

  getMoviesFromFirebase = () => {
    firebase.database()
      .ref('movies')
      .limitToLast(50)      
      .on('child_added', (snapshot) => {
        //console.log(snapshot.key)
        let movies = [...this.state.movies]
        const movie = snapshot.val()
        movie['key'] = snapshot.key   
        movies.push(movie)
        //console.log(movies)
        //console.log('Added movie!')
        this.setState({ movies: movies })  
      }) 
  }

  getMoviesByGenre = (genreId) => {
    console.log(genreId)
    firebase.database()
      .ref('movies')
      .orderByChild(`genres/${genreId}`)
      .equalTo(true)
      .limitToLast(50)
      .on('child_added', (snapshot) => {
        let movies = [...this.state.movies]
        const movie = snapshot.val()
        movie['key'] = snapshot.key   
        movies.push(movie)
        //console.log(movies)
        //console.log('Added movie!')
        this.setState({ movies: movies })            
      }) 
  }   

  getGenresFromFirebase = () => {
    firebase.database()
      .ref('genres')   
      /*
      .on('child_added', (snapshot) => {
        let genres = [...this.state.genres]
        let genre = {
          key: snapshot.key,
          title:  snapshot.val().title
        }
        genres.push(genre)
        //console.log('Added genre!')
        this.setState({ genres: genres }) 
        //console.log(this.state.genres) 
      })   
      */    
      
      .once('value', (snapshot) => {
        //console.log(snapshot.val())  
        
        let genres = []
        for (var prop in snapshot.val()) {
          let genre = {
            key: prop,
            title: snapshot.val()[prop].title
          }
          genres.push(genre)
        } 
        //console.log(genres)  
        this.setState({ genres: genres })
        console.log('Fetched genres!')
      })     
  }

  createUser = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error)) 
  }

  loginUser = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => console.log(error)) 
  }  

  logOutUser = () => {
    firebase
      .auth()
      .signOut()
      .catch(error => {
        console.log(error)
      }) 
  }   

  onFormSubmit = (username, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .catch(error => {
        const errorMessage = error.message
        //const errorCode = error.code
        this.setState({ errorMessage: errorMessage})
        console.log(errorMessage)
      }) 
  } 

  getDataFromApi() {
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

  searchOnSubmit = (event) => {
    if (event.key === 'Enter') {
      this.setState({ searchTerm: event.target.value })
    }      
  } 

  searchOnChange = (event) => {
    this.setState({ searchTerm: event.target.value })
  }  

  onGenreClick = (event) => {
    //console.log(event.target)
    //this.setState({ genre: event.target.innerHTML })   
  }
  /*
  getMoviesByGenre = (genre) => {
    const { movies } = this.state
    return movies
      .filter(movie => 
        movie.genres.includes(genre)
      )
  }*/

  getMoviesBySearchTerm(movies) {
    const { searchTerm } = this.state
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

  render() {
    const { searchTerm, movies, genres } = this.state,
      { username, user, errorMessage } = this.state
    return (
      <Router> 
        <ScrollToTop>
          <div className="App">        
            {                        
              user === undefined ?
                null       
                :     
                <PropsRoute
                  path="/"
                  component={ SiteHeader }
                  user={ user }
                  username={ username }
                  navbarTitle={ 'React Movies' }
                  genres={ genres }
                  searchOnSubmit={ this.searchOnSubmit }
                  searchOnChange={ this.searchOnChange }
                  logOutUser={ this.logOutUser }
                  onGenreClick={ this.onGenreClick }
                />                                                 
            } 

            <main>                 
              <div className="container-fluid">
                {
                  user === undefined ?
                    <Spinner />
                    :           
                    <Switch>
                      <Route path='/login' render={({ match }) => (
                        user ? (
                          <Redirect to="/"/>
                        ) : (
                          <LoginPage >
                            <LoginForm 
                              submitBtnLabel="Log in" 
                              errorMessage={ errorMessage }
                              onFormSubmit={ this.onFormSubmit } 
                            />
                          </LoginPage> 
                        )
                      )}/>   
                      
                      <PrivateRoute
                        exact
                        path="/"
                        component={ MoviePage }
                        user={ user }
                        genres={ genres }
                        searchTerm={ searchTerm }
                      /> 

                      <PrivateRoute
                        exact
                        path="/genre/:genreName"
                        component={ MoviePage }
                        user={ user }
                        genres={ genres }
                        searchTerm={ searchTerm }
                      />                       

                      { /*
                      <Route                 
                        exact 
                        path='/' 
                        render={({ match }) => (
                          user ? (
                            <MovieList 
                              movies={
                                searchTerm ? 
                                  this.getMoviesBySearchTerm(movies) 
                                  : 
                                  movies
                              } 
                              colWidth="col-6 col-sm-3 col-md-3 col-lg-2 mb-4"
                              genres={genres}
                            />                          
                          ) : (
                            <Redirect to="/login"/>
                          )                  
                        )}
                      />

                      <Route path='/genre/:genreName' render={({ match }) => (
                        user ? (
                          <MovieList 
                            movies={ 
                              searchTerm ? 
                                this.getMoviesBySearchTerm(movies)
                                : 
                                movies
                            } 
                            colWidth="col-6 col-sm-3 col-md-3 col-lg-2 mb-4"
                            genres={genres}
                          />                          
                        ) : (
                          <Redirect to="/login"/>                        
                        )                    
                      )}/>
                      */
                      }
                                        
                    </Switch>   
                }
              </div>  
            </main>          
          </div>
        </ScrollToTop>
      </Router>          
    )
  }
}

export default App
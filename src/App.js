import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom'
import firebase from './firebase.js'

import SiteHeader from './components/SiteHeader/SiteHeader.js'
import LoginForm from './components/LoginForm/LoginForm.js'
import LoginPage from './components/LoginPage/LoginPage.js'
import MovieDetailPage from './components/MovieDetailPage/MovieDetailPage.js'
import MoviePage from './components/MoviePage/MoviePage.js'
import PropsRoute from './components/PropsRoute/PropsRoute.js'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js'
import ScrollToTop from './components/ScrollToTop.js'
import Spinner from './components/Spinner/Spinner'

//import utils from './scripts/utils.js'
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './App.css'

class App extends Component {

  state = {
    errorMessage: '',
    genre: '',
    genres: [],
    password: '',
    user: undefined,
    username: ''
  }

  componentDidMount() {

    firebase
      .auth()
      .onAuthStateChanged(user => {
        if(user) {
          //const displayName = user.displayName;
          const email = user.email;
          //const uid = user.uid; //KEY! UID!         
          this.setState({ 
            user: user,
            username: email
          })
          console.log(user)

          this.getGenresFromFirebase()

        } else {
          this.setState({ 
            user: user,
            username: ''
          })          
        }
      })
  } 

  componentWillMount() { 
  }

  componentWillReceiveProps(nextProps) { 
  }

  componentWillUnmount() {
    firebase
      .auth()
      .unsubscribeAuthStateChanged()
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

  searchOnSubmit = (event) => {
    if (event.key === 'Enter') {
      this.setState({ searchTerm: event.target.value })
    }      
  } 

  searchOnChange = (event) => {
    this.setState({ searchTerm: event.target.value })
  }  

  genreOnClick = (event) => {
    console.log(event.target.innerHTML )
    this.setState({ genre: event.target.innerHTML })   
  } 

  getGenreNameFromKey = (key) => { 
    //console.log(this.state.genres)
    return this.state.genres
      /*  
      .map((item, index) => { 
        if(item.key === key ){     
          return item.title
        }   
      }).filter(x => x !== undefined).join('') 
      */
     
      .filter((genre) => {
        return genre.key === key
      })
      .map((item, index) => {  
        return item.title
      }).join('')
  }

  getGenreLinkList = (mGenres, genreOnClick, classes) => {
    //console.log(classes)     
    const genreLinks = Object.keys(mGenres)
      .map((key, index) => {
        return (
          <li key={ index } className="list-inline-item movie-genre-item">
            <Link 
              className="genre-link" 
              to={ `/genre/${key}`} 
              onClick={ genreOnClick }
            >
              { this.getGenreNameFromKey(key)}
            </Link>
          </li>
        )
      })
    return <ul className={ `list-inline movie-genre-list ${classes}`}>
      { genreLinks }
    </ul>
  }

  getActorList = (actors) => {
    const listItems = actors
      .map((actor, index) => {
        return (
          <li key={ index } className="list-inline-item">
            { actor }
          </li>
        )
      }) 

    return (
      <ul className="list-inline font-size-sm">
        { listItems }
      </ul> 
    )
  }    

  render() {
    const { searchTerm, genres, genre } = this.state,
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
                  genreOnClick={ this.genreOnClick }
                  genre={ genre }
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
                        getGenreNameFromKey={ this.getGenreNameFromKey }
                        getGenreLinkList={ this.getGenreLinkList }
                        getActorList={ this.getActorList }
                        genreOnClick={ this.genreOnClick }
                      /> 

                      <PrivateRoute
                        exact
                        path="/genre/:genreName"
                        component={ MoviePage }
                        user={ user }
                        genres={ genres }
                        searchTerm={ searchTerm }
                        getGenreNameFromKey={ this.getGenreNameFromKey }    
                        getGenreLinkList={ this.getGenreLinkList }
                        getActorList={ this.getActorList }  
                        genreOnClick={ this.genreOnClick }               
                      /> 

                      <PrivateRoute
                        exact
                        path="/movie/:movieId"
                        component={ MovieDetailPage }
                        user={ user }
                        genres={ genres }
                        getGenreNameFromKey={ this.getGenreNameFromKey }  
                        getGenreLinkList={ this.getGenreLinkList }
                        getActorList={ this.getActorList }   
                        genreOnClick={ this.genreOnClick }                 
                      />                                                                                      
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
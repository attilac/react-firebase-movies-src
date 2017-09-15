import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDRylymqGElutANKusbIw3Hp2VH7a8DWwk',
  authDomain: 'just-another-todo-list.firebaseapp.com',
  databaseURL: 'https://just-another-todo-list.firebaseio.com',
  projectId: 'just-another-todo-list',
  storageBucket: 'just-another-todo-list.appspot.com',
  messagingSenderId: '51649607138'
};
firebase.initializeApp(config);

export default firebase
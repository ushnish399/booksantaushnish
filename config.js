import firebase from 'firebase';
require('@firebase/firestore');
var firebaseConfig = {
    apiKey: "AIzaSyASBJT8FTyGHtSy8iRpB12YN2NlbhG7SNA",
    authDomain: "booksanta-a3d08.firebaseapp.com",
    databaseURL: "https://booksanta-a3d08.firebaseio.com",
    projectId: "booksanta-a3d08",
    storageBucket: "booksanta-a3d08.appspot.com",
    messagingSenderId: "510592064529",
    appId: "1:510592064529:web:d0874c57f82787f0d6e5b0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
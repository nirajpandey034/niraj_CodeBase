import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAJ7D7S4DpxmtMcvOHWzfY2DsV6_syCdI4",
    authDomain: "ur-code-base.firebaseapp.com",
    databaseURL: "https://ur-code-base-default-rtdb.firebaseio.com",
    projectId: "ur-code-base",
    storageBucket: "ur-code-base.appspot.com",
    messagingSenderId: "827272485747",
    appId: "1:827272485747:web:2fe1ec9fd25fed87410306",
    measurementId: "G-LXMYBMC5BW"
  };

  firebase.initializeApp(config);


  export default firebase;
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB3gAFnMP2HtZaSabLFJroq0kgICBpYRSw",
    authDomain: "akinwork-dc979.firebaseapp.com",
    projectId: "akinwork-dc979",
    storageBucket: "gs://akinwork-dc979.appspot.com",
    messagingSenderId: "261467172943",
    appId: "1:261467172943:web:20e2991385f3399a8eba3a",
    databaseURL: "https://akinwork-dc979-default-rtdb.firebaseio.com/",
};

let fb = firebase.initializeApp(firebaseConfig);


let fa = firebase.auth()

let db = firebase.database()

let fs = firebase.storage();


export {
    db, fs, fa, fb
}

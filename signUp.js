import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBe7d9bllq8RnmI6xxEBk3oub3qogPT2aM",
    authDomain: "thinkwise-c7673.firebaseapp.com",
    databaseURL: "https://thinkwise-c7673-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "thinkwise-c7673",
    storageBucket: "thinkwise-c7673.appspot.com",
    messagingSenderId: "37732571551",
    appId: "1:37732571551:web:9b90a849ac5454f33a85aa",
    measurementId: "G-8957WM4SB7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth(app);

let SignUpForm = document.getElementsByClassName('SignUpForm')[0];          // Selektion des HTML-Elements mit der Klasse 'SignUpForm'

let EmailInput = SignUpForm.querySelector('#emailInput');                   // Selektion der Eingabefelder innerhalb des Formulars
let PasswordInput = SignUpForm.querySelector('#passwordInput');
let FirstNameInput = SignUpForm.querySelector('#firstNameInput');
let LastNameInput = SignUpForm.querySelector('#lastNameInput');

let RegisterUser = evt => {
    evt.preventDefault();       // Verhindern des Standardverhaltens des Formulars

    createUserWithEmailAndPassword(auth, EmailInput.value, PasswordInput.value)      // Erstellen eines Benutzers mit E-Mail und Passwort über das Firebase-Authentifizierungsmodul
    .then((userCredential)=>{
        const user = userCredential.user;
        set(ref(db, 'users/' + user.uid),{
            firstname: FirstNameInput.value,
            lastname: LastNameInput.value,
            email: EmailInput.value,
        });

        window.location.href = "https://benjiwurfl.github.io/Home/";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/email-already-in-use") {            // Wenn der User eine Email eingibt, die bereits in Verwendung ist, kommt die entsprechende Alert 
            alert("This email address is already registered. Please use a different one.");
        } else if (errorCode === "auth/weak-password") {            // Wenn der User ein Passwort eingibt, welches unter 6 characters ist, kommt die entsprechende Alert
            alert("Password should be at least 6 characters long. Please choose a stronger password.");
        } else {
            alert(errorMessage);
        }
    });
}

SignUpForm.addEventListener('submit', RegisterUser);
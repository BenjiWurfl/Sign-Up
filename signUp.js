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

        let EmailInput = document.getElementById('emailInput');
        let PasswordInput = document.getElementById('passwordInput');
        let FirstNameInput = document.getElementById('firstNameInput');
        let LastNameInput = document.getElementById('lastNameInput');
        let SignUpForm = document.getElementById('SignUpForm');

        let RegisterUser = evt => {
            evt.preventDefault();

            createUserWithEmailAndPassword(auth, EmailInput.value, PasswordInput.value)
            .then((credentials)=>{
                set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
                    firstname: FirstNameInput.value,
                    lastname: LastNameInput.value
                })

            })
            .catch((error) =>{
                alert(error.message)
                console.log(error.code);
                console.log(error.message);
            })
        }

        SignUpForm.addEventListener('submit', RegisterUser);
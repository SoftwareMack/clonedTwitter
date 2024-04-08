import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5XwLBPLwMrnQt-b52pgMI0rS9j3q0YME",
  authDomain: "cloned-twitter-d53e9.firebaseapp.com",
  databaseURL: "https://cloned-twitter-d53e9-default-rtdb.firebaseio.com/",
  projectId: "cloned-twitter-d53e9",
  storageBucket: "cloned-twitter-d53e9.appspot.com",
  messagingSenderId: "640704049838",
  appId: "1:640704049838:web:5840619c7cdbd8e949733f",
  measurementId: "G-NN7GBQJ7PH"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (user.emailVerified) {
        location.replace('./main.html')
    }
    const uid = user.uid;
    // ...
}
  });


const btn = document.getElementById('loginBtn')
btn.addEventListener('click', () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            if (user) {
                if (!user.emailVerified) {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            Swal.fire({
                                title: "Verify Your ID",
                                text: `Verification Email Sent to ${user.email}`,
                                icon: 'success',
                                confirmButtonText: 'OK'
                              })
                        });
                } else {
                    Swal.fire({
                        text: `User Signed Up !`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                      }).then(()=>{
                          window.location.href = 'index.html'
                        });
                    // ...
                }
                const uid = user.uid;
                // ...
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorMessage === "Firebase: Error (auth/invalid-email).") {
                Swal.fire({
                  text: `Invalid Email Address`,
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
            }
              else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
                Swal.fire({
                  text: `This email Is Not Signed Up`,
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
              }
              else if (errorMessage === "Firebase: Error (auth/missing-password).") {
                Swal.fire({
                  text: `Enter Password First`,
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
              }
              else if (errorMessage === "Firebase: Error (auth/wrong-password).") {
                Swal.fire({
                  text: `Wrong Password Entered`,
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
              }
        });
})

const forgot = document.getElementById('forgot')
forgot.addEventListener('click', () => {
    const email = document.getElementById('email').value
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            Swal.fire({
                text: `You can reset your password email sent on ${email}`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log(email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
})

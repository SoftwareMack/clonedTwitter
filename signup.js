// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

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
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

// Event listener for sign up button
const btn = document.getElementById('signBtn');
btn.addEventListener('click', () => {
    // Get user input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nameF = document.getElementById('namef').value;
    const nameL = document.getElementById('namel').value;
    const country = document.getElementById('country').value;
    const phone = document.getElementById('phone').value;
    const nick = document.getElementById('nick').value;
    const about = document.getElementById('about').value;

    // Validate inputs
  if (!nameF || !email || !password || !country || !phone || !nick || !about || !nameL) {
    Swal.fire({
      text: `Please fill all the fields`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }
  const fileInput = document.getElementById('img');
if (!fileInput.files.length) {
    Swal.fire({
      text: `Please Select Profile Photo`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      try {
        const docRef = await setDoc(doc(db, "users", user.uid), {
          nameF,
          nameL,
          name: `${(nameF).toLowerCase()} ${(nameL).toLowerCase()}`,
          nick,
          about,
          country,
          phone,
          email,
          uid: user.uid
        });
        const storageRef = ref(storage, email);

        var file = document.getElementById('img')
        uploadBytes(storageRef, file.files[0]).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      // var file = document.getElementById('img')
      // const mountainsRef = ref(storage, `images/${file.files[0].name}`);
      // uploadBytes(mountainsRef, file.files[0]).then((snapshot) => {
      //   console.log('Uploaded a blob or file!');
      // });

      Swal.fire({
        text: `User Signed Up !`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = 'login.html'
      }
      )
      console.log(user);
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
      else if (errorMessage === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
        Swal.fire({
          text: `Password Should Be Atleast 6 Characters Long`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
        Swal.fire({
          text: `This email Is Already Taken`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else {
        console.log(errorMessage);
      }
    });
});

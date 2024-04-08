import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getDownloadURL, getStorage, ref } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

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
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.id == uid) {
                document.getElementById('namef').value = doc.data().nameF
                document.getElementById('namel').value = doc.data().nameL
                document.getElementById('about').value = doc.data().about
                document.getElementById('nick').value = doc.data().nick
                document.getElementById('country').value = doc.data().country
                document.getElementById('phone').value = doc.data().phone
            }
        });
        getDownloadURL(ref(storage, user.email))
            .then((url) => {
                document.getElementById('user').src = url
            })
    }
});
const btnAccount = document.getElementById('editBtn')
btnAccount.addEventListener('click', async () => {
    const nameF = document.getElementById('namef').value
    const nameL = document.getElementById('namel').value
    const country = document.getElementById('country').value
    const phone = document.getElementById('phone').value
    const about = document.getElementById('about').value
    const nick = document.getElementById('nick').value
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            const washingtonRef = doc(db, "users", uid);
            await updateDoc(washingtonRef, {
                nameF,
                nameL,
                country,
                phone,
                about,
                nick,
                name: `${(nameF).toLowerCase()} ${(nameL).toLowerCase()}`
            });
            Swal.fire({
                title: 'Changes Done',
                text: 'You profile changes have been edited successfully',
                icon: "success"
            }).then(() => {
                Swal.fire({
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                }).then(() => {
                    location.replace('./profileManage.html');
                });
            });
        }
    });
    // ...
})

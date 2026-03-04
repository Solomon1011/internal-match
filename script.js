// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 PASTE YOUR REAL FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// CREATE ACCOUNT
window.registerUser = function () {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Account created successfully!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

// LOGIN
window.loginUser = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Invalid login details");
    });
};

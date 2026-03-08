import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.6.1/firebase-auth.js";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIZnZjeCROX5UmcqUQIfTdt6oRU6AmvOg",
  authDomain: "internal-match.firebaseapp.com",
  projectId: "internal-match",
  storageBucket: "internal-match.appspot.com",
  messagingSenderId: "129707008837",
  appId: "1:129707008837:web:f3f0033bbbe673107a542c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// SIGNUP FUNCTION
export async function signup(email, password, displayName) {

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Update user profile
    await updateProfile(user, {
      displayName: displayName
    });

    console.log("Signup success:", user);

    return user;

  } catch (error) {

    console.error("Signup error:", error.code, error.message);

    alert("Signup failed: " + error.message);

    return null;

  }

}


// LOGIN FUNCTION
export async function login(email, password) {

  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    console.log("Login success:", user);

    return user;

  } catch (error) {

    console.error("Login error:", error.code, error.message);

    alert("Login failed: " + error.message);

    return null;

  }

}


// LOGOUT FUNCTION
export async function logout() {

  try {

    await signOut(auth);

    console.log("User logged out");

  } catch (error) {

    console.error("Logout error:", error);

  }

}


// CHECK AUTH STATE
export function checkAuth(callback) {

  onAuthStateChanged(auth, (user) => {

    if (user) {

      console.log("User logged in:", user);

    } else {

      console.log("No user logged in");

    }

    callback(user);

  });

}

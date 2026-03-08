// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.6.1/firebase-auth.js";

// Firebase config
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

// Signup function
export async function signup(email, password, displayName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
  } catch (error) {
    alert(`Signup error: ${error.message}`);
    return null;
  }
}

// Login function
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    alert(`Login error: ${error.message}`);
    return null;
  }
}

// Logout function
export async function logout() {
  await signOut(auth);
}

// Forgot Password
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Check authentication state
export function checkAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

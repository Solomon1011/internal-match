import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

// Signup with logging
export async function signup(email, password, displayName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    console.log("Signup successful:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Signup error:", error.code, error.message);
    alert(`Signup error: ${error.code} - ${error.message}`);
    return null;
  }
}

// Login with logging
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error.code, error.message);
    alert(`Login error: ${error.code} - ${error.message}`);
    return null;
  }
}

// Logout
export async function logout() {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error.code, error.message);
  }
}

// Check auth
export function checkAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:", user);
    callback(user);
  });
}

// Update profile
export async function updateUserProfile({ displayName }) {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName });
    console.log("Profile updated:", displayName);
  }
}

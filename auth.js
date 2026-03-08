// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.6.1/firebase-auth.js";

// ✅ Replace with your Firebase config
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
    console.log("Signup success:", userCredential.user);

    // Redirect after signup
    window.location.href = "dashboard.html";
    return userCredential.user;
  } catch (error) {
    console.error("Signup error:", error.code, error.message);
    alert(`Signup error: ${error.code} - ${error.message}`);
    return null;
  }
}

// Login function
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login success:", userCredential.user);

    // Redirect after login
    window.location.href = "dashboard.html";
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error.code, error.message);
    alert(`Login error: ${error.code} - ${error.message}`);
    return null;
  }
}

// Logout function
export async function logout() {
  try {
    await signOut(auth);
    console.log("Logged out");
    window.location.href = "index.html"; // redirect to home
  } catch (error) {
    console.error("Logout error:", error.code, error.message);
  }
}

// Check authentication state
export function checkAuth(callback) {
  onAuthStateChanged(auth, user => {
    console.log("Auth state:", user);
    callback(user);
  });
}

// ✅ Form handling
document.addEventListener("DOMContentLoaded", () => {
  const authForm = document.getElementById("authForm");
  if (!authForm) return;

  authForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page reload

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const nameInput = document.getElementById("name"); // only on signup

    if (nameInput) {
      const displayName = nameInput.value.trim();
      await signup(email, password, displayName);
    } else {
      await login(email, password);
    }
  });
});

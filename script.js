// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyDIZnZjeCROX5UmcqUQIfTdt6oRU6AmvOg",
    authDomain: "internal-match.firebaseapp.com",
    projectId: "internal-match",
    storageBucket: "internal-match.appspot.com",
    messagingSenderId: "129707008837",
    appId: "1:129707008837:web:f3f0033bbbe673107a542c"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;

auth.onAuthStateChanged(user=>{
  if(!user) window.location.href="profile_setup.html";
  else currentUser = user;
});

function showTab(tab){
  ['profile-tab','people-tab','liked-tab','chats-tab'].forEach(t=> document.getElementById(t).style.display='none');
  document.getElementById(tab+'-tab').style.display='block';
}
showTab('profile');

function saveProfile(){
  if(!currentUser) return;
  db.collection("users").doc(currentUser.uid).set({
    username: document.getElementById('edit-username').value || "",
    age: document.getElementById('edit-age').value || "",
    location: document.getElementById('edit-location').value || "",
    gender: document.getElementById('edit-gender').value,
    interest: document.getElementById('edit-interest').value || "",
    pic: document.getElementById('edit-pic').value || ""
  });
  alert("Profile updated!");
}

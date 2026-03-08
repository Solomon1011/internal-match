import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
updateProfile
} from "https://www.gstatic.com/firebasejs/10.6.1/firebase-auth.js";


const firebaseConfig = {

apiKey: "AIzaSyDIZnZjeCROX5UmcqUQIfTdt6oRU6AmvOg",

authDomain: "internal-match.firebaseapp.com",

projectId: "internal-match",

storageBucket: "internal-match.appspot.com",

messagingSenderId: "129707008837",

appId: "1:129707008837:web:f3f0033bbbe673107a542c"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export async function signup(email,password,name){

try{

const userCredential = await createUserWithEmailAndPassword(auth,email,password);

await updateProfile(userCredential.user,{displayName:name});

return userCredential.user;

}catch(error){

alert(error.message);

return null;

}

}


export async function login(email,password){

try{

const userCredential = await signInWithEmailAndPassword(auth,email,password);

return userCredential.user;

}catch(error){

alert(error.message);

return null;

}

}


export async function logout(){

await signOut(auth);

}


export function checkAuth(callback){

onAuthStateChanged(auth,(user)=>{

callback(user);

});

}

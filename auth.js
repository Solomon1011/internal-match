import { signup, login } from "./app.js";

const form = document.getElementById("authForm");

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const action = form.dataset.action;

const email = document.getElementById("email").value;

const password = document.getElementById("password").value;

if(action==="signup"){

const name = document.getElementById("name").value;

const user = await signup(email,password,name);

if(user){

alert("Signup successful");

window.location.href="dashboard.html";

}

}

if(action==="login"){

const user = await login(email,password);

if(user){

alert("Login successful");

window.location.href="dashboard.html";

}

}

});

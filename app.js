function login(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

if(!email || !password){
alert("Enter email and password")
return
}

alert("Login successful")

window.location="dashboard.html"

}

function signup(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

if(!email || !password){
alert("Fill all fields")
return
}

alert("Account created")

window.location="profile_setup.html"

}

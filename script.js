let profiles = [
    {name: "Sophia", age: 22, img: "https://randomuser.me/api/portraits/women/1.jpg"},
    {name: "Daniel", age: 25, img: "https://randomuser.me/api/portraits/men/2.jpg"},
    {name: "Amara", age: 23, img: "https://randomuser.me/api/portraits/women/3.jpg"}
];

let currentIndex = 0;

function login() {
    let username = document.getElementById("username").value;
    if(username === "") {
        alert("Enter your name");
        return;
    }
    localStorage.setItem("user", username);
    localStorage.setItem("coins", 10);
    window.location.href = "dashboard.html";
}

function loadProfile() {
    if(document.getElementById("profileName")) {
        let profile = profiles[currentIndex];
        document.getElementById("profileName").innerText = profile.name;
        document.getElementById("profileAge").innerText = "Age: " + profile.age;
        document.getElementById("profilePic").src = profile.img;

        document.getElementById("welcome").innerText =
            "Welcome " + localStorage.getItem("user");

        document.getElementById("coins").innerText =
            localStorage.getItem("coins");
    }
}

function like() {
    let coins = parseInt(localStorage.getItem("coins"));
    if(coins <= 0) {
        alert("No coins! Buy premium.");
        return;
    }
    coins--;
    localStorage.setItem("coins", coins);
    nextProfile();
}

function ignore() {
    nextProfile();
}

function nextProfile() {
    currentIndex++;
    if(currentIndex >= profiles.length) {
        currentIndex = 0;
    }
    loadProfile();
}

function buyCoins() {
    localStorage.setItem("coins", 50);
    alert("Coins Added!");
}

window.onload = loadProfile;

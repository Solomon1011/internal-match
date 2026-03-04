
// Register
function register() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  alert("Account created successfully!");
  window.location.href = "login.html";
}

// Login
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  if (email === savedEmail && password === savedPassword) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login details");
  }
}

// Logout
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// Show welcome message
if (window.location.pathname.includes("dashboard.html")) {
  const email = localStorage.getItem("userEmail");
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "login.html";
  } else {
    document.getElementById("welcomeUser").innerText = "Welcome, " + email;
  }
}

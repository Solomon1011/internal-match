// app.js

// Check if user is logged in
export async function checkAuth() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user || null;
}

// Get current user
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

// Login function
export function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
    }
    return false;
}

// Signup function
export function signup(name, email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) {
        return false; // Email already exists
    }
    const newUser = { name, email, password, bio: "" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
}

// Logout function
export function logout() {
    localStorage.removeItem("currentUser");
}

// Update profile
export function updateProfile(name, bio) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = getCurrentUser();

    const index = users.findIndex(u => u.email === currentUser.email);
    if (index !== -1) {
        users[index].name = name;
        users[index].bio = bio;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(users[index]));
        return true;
    }
    return false;
}

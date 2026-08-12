// ==========================================
// Hotel Management System
// script.js
// ==========================================
function updateNavAuthState() {

    const nav = document.getElementById("navAuthSlot");

    if (!nav) return;
    const fullname = localStorage.getItem("fullname");
    if (fullname) {
        nav.innerHTML = `
            <span>Welcome, ${fullname}</span>
            <a href="#" id="logoutBtn">Logout</a>
        `;

        document
            .getElementById("logoutBtn")
            .addEventListener("click", logout);
    }
    else {
        nav.innerHTML = `<a href="login.html">Login</a>`;
    }
}

updateNavAuthState();

// ------------------------------
// Logout
// ------------------------------
function logout(e) {
    if (e) e.preventDefault();
    localStorage.clear();
    window.location.href = "login.html";
}

// ------------------------------
// Home Button
// ------------------------------
function goToRooms() {
    window.location.href = "adminLogin.html";
}

function adminLogout() {
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("adminToken");
    window.location.href =
        "adminLogin.html";
}

// ------------------------------
// Register
// ------------------------------
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", registerUser);
}

async function registerUser(e) {
    e.preventDefault();
    const user = {
        fullname: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        passwordHash: document.getElementById("password").value,
        role: "User"
    };

    try {
        await postData("Users", user);
        alert("Registration Successful");
        window.location.href = "login.html";
    }

    catch (error) {
        alert(error.message);
    }
}

// ------------------------------
// Login
// ------------------------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
}

async function loginUser(e) {
    e.preventDefault();
    const login = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value
    };

    try {
        const result = await postData("Auth/login", login);
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("fullname", result.fullname);
        localStorage.setItem("role", result.role);
        alert(result.message);
        window.location.href = "index.html";
    }

    catch {
        alert("Invalid Email or Password");
    }
}

// ------------------------------
// Contact Form
// ------------------------------
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", sendMessage);
}

async function sendMessage(e) {
    e.preventDefault();
    const contact = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {
        await postData("ContactMessages", contact);
        alert("Message Sent Successfully");
        contactForm.reset();
    }

    catch {
        alert("Unable to send message.");
    }
}

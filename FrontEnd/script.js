// ===============================
// Hotel Management System
// script.js
// ===============================

const API = "https://localhost:5001/api";


// ===============================
// HOME PAGE
// ===============================

function goToRooms() {
    window.location.href = "rooms.html";
}


// ===============================
// LOAD ROOMS
// ===============================

function loadRooms() {

    fetch(`${API}/Rooms`)

        .then(response => response.json())

        .then(data => {

            let output = "";

            data.forEach(room => {

                output += `
                    <div class="room">

                        <h3>Room Number : ${room.roomNO}</h3>

                        <p>Room Type : ${room.roomType}</p>

                        <p>Capacity : ${room.capacity}</p>

                        <p>Price : ₹${room.price}</p>

                        <p>Status : ${room.isAvailable ? "Available" : "Booked"}</p>

                        <button onclick="bookRoom(${room.roomId})">
                            Book Now
                        </button>

                    </div>
                `;

            });

            document.getElementById("roomlist").innerHTML = output;

        })

        .catch(error => {

            console.log(error);

        });

}

if (window.location.pathname.includes("rooms.html")) {

    loadRooms();

}


// ===============================
// SAVE ROOM ID
// ===============================

function bookRoom(roomId) {

    localStorage.setItem("roomId", roomId);

    window.location.href = "booking.html";

}


// ===============================
// BOOK ROOM
// ===============================

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const booking = {

            userId: 1,

            roomId: Number(localStorage.getItem("roomId")),

            checkInDate: document.getElementById("checkIn").value,

            checkOutDate: document.getElementById("checkOut").value,

            totalAmount: 5000,

            bookingStatus: "Confirmed"

        };

        const response = await fetch(`${API}/Bookings`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(booking)

        });

        if (response.ok) {

            alert("Booking Successful");

            localStorage.removeItem("roomId");

            window.location.href = "rooms.html";

        }
        else {

            alert("Booking Failed");

        }

    });

}


// ===============================
// REGISTER USER
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const user = {

            fullname: document.getElementById("name").value,

            email: document.getElementById("email").value,

            passwordHash: document.getElementById("password").value,

            role: "User"

        };

        const response = await fetch(`${API}/Users`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(user)

        });

        if (response.ok) {

            alert("Registration Successful");

            window.location.href = "login.html";

        }
        else {

            alert("Registration Failed");

        }

    });

}


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const login = {

            email: document.getElementById("email").value,

            password: document.getElementById("password").value

        };

        const response = await fetch(`${API}/Auth/login`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(login)

        });

        if (response.ok) {

            const result = await response.json();

            alert(result.message);

            window.location.href = "index.html";

        }
        else {

            alert("Invalid Email or Password");

        }

    });

}


// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const contact = {

            name: document.getElementById("name").value,

            email: document.getElementById("email").value,

            message: document.getElementById("message").value

        };

        const response = await fetch(`${API}/ContactMessages`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(contact)

        });

        if (response.ok) {

            alert("Message Sent Successfully");

            contactForm.reset();

        }
        else {

            alert("Failed to Send Message");

        }

    });

}
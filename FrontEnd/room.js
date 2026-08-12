// ================================
// rooms.js
// ================================

if (sessionStorage.getItem("isAdmin") !== "true") {

    alert("Access denied. Admin login required.");

    window.location.href = "adminLogin.html";
}

async function loadRooms() {

    try {

        const rooms = await getData("Rooms");

        const container = document.getElementById("roomlist");

        if (!container) return;

        container.innerHTML = "";

        rooms.forEach(room => {

            container.innerHTML += `

            <div class="room">

                <h3>Room ${room.roomNO}</h3>

                <p>Type : ${room.roomType}</p>

                <p>Capacity : ${room.capacity}</p>

                <p>Price : ₹${room.price}</p>

                <p>Status : ${room.isAvailable ? "Available" : "Booked"}</p>

                <button onclick="bookRoom(${room.roomId})">
                    Book
                </button>

            </div>

            `;

        });

    }

    catch (err) {

        console.error(err);

    }

}

async function addRoom() {

    alert("addRoom() called");

    const room = {
        roomNO: document.getElementById("roomNumber").value,
        roomType: document.getElementById("roomType").value,
        capacity: Number(document.getElementById("capacity").value),
        price: Number(document.getElementById("price").value),
        imageUrl: document.getElementById("imageUrl").value,
        isAvailable: true
    };

    console.log(room);

    try {
        await postData("Rooms", room);
        alert("Room Added Successfully");
        loadRooms();
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
}

function bookRoom(roomId) {

    localStorage.setItem("roomId", roomId);

    window.location.href = "booking.html";

}

window.addEventListener("load", loadRooms);

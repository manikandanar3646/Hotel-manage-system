// ================================
// booking.js
// ================================

async function loadRoomsToDropdown() {

    try {

        const rooms = await getData("Rooms");

        const dropdown = document.getElementById("roomId");

        if (!dropdown) return;

        dropdown.innerHTML =
            "<option value=''>Select Room</option>";

        rooms.forEach(room => {

            if (room.isAvailable) {

                dropdown.innerHTML += `

                <option value="${room.roomId}">

                    ${room.roomNO} - ₹${room.price}

                </option>

                `;

            }

        });

    }

    catch (err) {

        console.error(err);

    }

}

async function loadBookings() {

    try {

        const bookings = await getData("Bookings");

        const container = document.getElementById("bookingList");

        if (!container) return;

        container.innerHTML = "";

        bookings.forEach(b => {

            container.innerHTML += `

            <div class="room">

                <h3>Booking #${b.bookingId}</h3>

                <p>User ID : ${b.userId}</p>

                <p>Room ID : ${b.roomId}</p>

                <p>Check In : ${b.checkInDate}</p>

                <p>Check Out : ${b.checkOutDate}</p>

                <p>Total : ₹${b.totalAmount}</p>

                <p>Status : ${b.bookingStatus}</p>

            </div>

            `;

        });

    }

    catch (err) {

        console.error(err);

    }

}

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", createBooking);

}

async function createBooking(e) {

    e.preventDefault();

    const booking = {

        userId: Number(localStorage.getItem("userId")),

        roomId: Number(document.getElementById("roomId").value),

        checkInDate: document.getElementById("checkIn").value,

        checkOutDate: document.getElementById("checkOut").value,

        totalAmount: Number(document.getElementById("totalAmount").value),

        bookingStatus: "Booked"

    };

    try {

        await postData("Bookings", booking);

        alert("Booking Successful");

        bookingForm.reset();

        loadBookings();

    }

    catch (err) {

        alert(err.message);

    }

}

window.onload = function () {

    loadBookings();

    loadRoomsToDropdown();

};
async function loadBookings() {
    try {
        const bookings = await getData("bookings");

        let container = document.getElementById("bookingList");
        container.innerHTML = "";

        bookings.forEach(b => {
            container.innerHTML += `
                <div class="card">
                    <h3>${b.customerName}</h3>
                    <p>Room ID: ${b.roomId}</p>
                    <p>Check In: ${b.checkInDate}</p>
                    <p>Check Out: ${b.checkOutDate}</p>
                    <p>Total: ₹${b.totalAmount}</p>
                    <p>Status: ${b.status}</p>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error loading bookings:", error);
    }
}
async function addBooking() {

    const booking = {
        customerName: document.getElementById("customerName").value,
        roomId: parseInt(document.getElementById("roomId").value),
        checkInDate: document.getElementById("checkIn").value,
        checkOutDate: document.getElementById("checkOut").value,
        totalAmount: parseFloat(document.getElementById("totalAmount").value)
    };

    try {
        await postData("bookings", booking);

        alert("Booking Successful!");

        loadBookings(); // refresh UI

    } catch (error) {
        console.error("Booking error:", error);
    }
}
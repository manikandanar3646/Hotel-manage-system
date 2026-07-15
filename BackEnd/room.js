async function loadRooms() {
    try {
        const rooms = await getData("rooms");

        const container = document.getElementById("roomlist");
        container.innerHTML = "";

        rooms.forEach(r => {
            container.innerHTML += `
                <div class="room-card">
                    <h3>Room: ${r.roomNumber}</h3>
                    <p>Type: ${r.type}</p>
                    <p>Price: ₹${r.price}</p>
                </div>
            `;
        });

    } catch (err) {
        console.error("Failed to load rooms", err);
    }
}

async function addRoom() {

    const room = {
        roomNumber: document.getElementById("roomNumber").value,
        type: document.getElementById("type").value,
        price: parseFloat(document.getElementById("price").value)
    };

    try {
        await postData("rooms", room);

        alert("Room Added!");

        loadRooms(); // refresh UI

    } catch (err) {
        console.error("Add room failed", err);
    }
}

// AUTO LOAD ON PAGE OPEN
loadRooms();
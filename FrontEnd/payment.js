async function loadPayments() {
    try {
        const payments = await getData("payments");

        let container = document.getElementById("paymentList");
        container.innerHTML = "";

        payments.forEach(p => {
            container.innerHTML += `
                <div class="card">
                    <h3>${p.customerName}</h3>
                    <p>Booking ID: ${p.bookingId}</p>
                    <p>Amount: ₹${p.amount}</p>
                    <p>Status: ${p.paymentStatus}</p>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error loading payments:", error);
    }
}
async function addPayment() {

    const payment = {
        bookingId: parseInt(document.getElementById("bookingId").value),
        customerName: document.getElementById("customerName").value,
        amount: parseFloat(document.getElementById("amount").value)
    };

    try {
        await postData("payments", payment);

        alert("Payment Successful!");

        loadPayments(); // refresh UI

    } catch (error) {
        console.error("Payment error:", error);
    }
}
// ================================
// payment.js
// ================================

async function loadPayments() {

    try {

        const payments = await getData("Payments");

        const container = document.getElementById("paymentList");

        if (!container) return;

        container.innerHTML = "";

        payments.forEach(payment => {

            container.innerHTML += `

            <div class="room">

                <h3>Payment #${payment.paymentId}</h3>

                <p>Booking ID : ${payment.bookingId}</p>

                <p>Amount : ₹${payment.amount}</p>

                <p>Method : ${payment.paymentMethod}</p>

                <p>Status : ${payment.paymentStatus}</p>

                <p>Date : ${payment.paymentDate}</p>

            </div>

            `;

        });

    }

    catch (err) {

        console.error(err);

    }

}

async function addPayment() {

    const payment = {

        bookingId: Number(document.getElementById("bookingId").value),

        amount: Number(document.getElementById("amount").value),

        paymentMethod: document.getElementById("paymentMethod").value,

        paymentStatus: "Paid"

    };

    try {

        await postData("Payments", payment);

        alert("Payment Successful");

        loadPayments();

    }

    catch (err) {

        alert(err.message);

    }

}

window.onload = loadPayments;
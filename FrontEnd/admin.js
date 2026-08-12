const adminLoginForm =
    document.getElementById("adminLoginForm");

if (adminLoginForm) {
    adminLoginForm.addEventListener(
        "submit",
        adminLogin
    );
}


async function adminLogin(e) {
    e.preventDefault();
    const email =
        document.getElementById("adminEmail")
            .value
            .trim();

    const password =
        document.getElementById("adminPassword")
            .value;
  
    const admin = {
        email: email,
        password: password

    };

    try {
        const result =
            await postData(
                "Admin/login",
                admin
            );
        sessionStorage.setItem(
            "adminToken",
            result.token
        );
        sessionStorage.setItem(
            "isAdmin",
            "true"
        );
        alert(result.message);
        window.location.href =
            "rooms.html";

    }
    catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);
    alert(error.message);

}
}

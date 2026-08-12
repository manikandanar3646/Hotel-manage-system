// Backend API URL
const API = "https://localhost:7138/api";
// ==========================================
// GET
// ==========================================
async function getData(endpoint) {

    const response =
        await fetch(`${API}/${endpoint}`);

    if (!response.ok) {

        const errorText =
            await response.text();

        throw new Error(
            errorText ||
            "Something went wrong"
        );
    }

    return await response.json();
}

// ==========================================
// POST
// ==========================================

async function postData(endpoint, data) {

    const token =
        sessionStorage.getItem("adminToken");

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {

        headers["Authorization"] =
            `Bearer ${token}`;
    }

    const response =
        await fetch(
            `${API}/${endpoint}`,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            }
        );

    if (!response.ok) {

        const errorText =
            await response.text();

        throw new Error(
            errorText ||
            "Something went wrong"
        );
    }

    const text =
        await response.text();

    return text
        ? JSON.parse(text)
        : {};
}


// ==========================================
// PUT
// ==========================================

async function putData(endpoint, data) {

    const token =
        sessionStorage.getItem("adminToken");

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {

        headers["Authorization"] =
            `Bearer ${token}`;
    }

    const response =
        await fetch(
            `${API}/${endpoint}`,
            {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            }
        );

    if (!response.ok) {

        const errorText =
            await response.text();

        throw new Error(
            errorText ||
            "Something went wrong"
        );
    }

    const text =
        await response.text();

    return text
        ? JSON.parse(text)
        : {};
}


// ==========================================
// DELETE
// ==========================================

async function deleteData(endpoint) {

    const token =
        sessionStorage.getItem("adminToken");

    const headers = {};

    if (token) {

        headers["Authorization"] =
            `Bearer ${token}`;
    }

    const response =
        await fetch(
            `${API}/${endpoint}`,
            {
                method: "DELETE",
                headers: headers
            }
        );

    if (!response.ok) {

        const errorText =
            await response.text();

        throw new Error(
            errorText ||
            "Something went wrong"
        );
    }

    return true;
}

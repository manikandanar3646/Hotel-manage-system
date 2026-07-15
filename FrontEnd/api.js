const API_BASE_URL = "https://localhost:7138/swagger/index.html";

// Generic GET request
async function getData(endpoint) {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return await response.json();
}

// Generic POST request
async function postData(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}
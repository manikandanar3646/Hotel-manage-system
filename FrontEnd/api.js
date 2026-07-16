const API = "http://localhost:5092/api";


async function getData(endpoint) {

    const response = await fetch(`${API}/${endpoint}`);

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    return await response.json();
}


async function postData(endpoint, data) {

    const response = await fetch(`${API}/${endpoint}`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });


    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Something went wrong");
    }


    const text = await response.text();

    return text ? JSON.parse(text) : {};
}


async function putData(endpoint, data) {

    const response = await fetch(`${API}/${endpoint}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });


    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Something went wrong");
    }


    const text = await response.text();

    return text ? JSON.parse(text) : {};
}


async function deleteData(endpoint) {

    const response = await fetch(`${API}/${endpoint}`, {

        method: "DELETE"

    });


    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Something went wrong");
    }


    return true;
}
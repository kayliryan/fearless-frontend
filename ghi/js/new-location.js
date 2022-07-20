window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/states/';
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        let stateTag = document.getElementById('state');

        for (let state of data.states) {
            let option = document.createElement("option");
            option.value = state.abbreviation;
            option.innerHTML = state.state;
            stateTag.appendChild(option);
        }
    }

    let formTag = document.getElementById('create-location-form'); //Our form element
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault();
        let formData = new FormData(formTag);
        let json = JSON.stringify(Object.fromEntries(formData));
        let locationUrl = 'http://localhost:8000/api/locations/';
        let fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newLocation = await response.json();
        }
    });

});
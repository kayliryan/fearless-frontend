window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/locations/';
    const response = await fetch(url);
    
    if (response.ok) {
        const data = await response.json();
        let locationTag = document.getElementById('location');
        for (let location of data.locations) {
            let option = document.createElement('option');
            option.value = location.id;
            option.innerHTML = location.name
            locationTag.appendChild(option);
        }
    }

    let formTag = document.getElementById('create-conference-form');
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault();
        let formData = new FormData(formTag);
        let json = JSON.stringify(Object.fromEntries(formData));
        
        let conferenceUrl = 'http://localhost:8000/api/conferences/';
        let fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newConference = await response.json();
        }

    });













});
window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');
    const url = 'http://localhost:8000/api/conferences/';

    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        for (let conference of data.conferences) {
            const option = document.createElement('option');
            option.value = conference.href;
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }
    }

    let formTag = document.getElementById('create-presentation-form');
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault();
        let formData = new FormData(formTag);
        let json = JSON.stringify(Object.fromEntries(formData));
        
        let conference = document.getElementById('conference');
        let conf_value = conference.options[conference.selectedIndex].value;
        let presentationUrl = `http://localhost:8000${conf_value}presentations/`;
        let fetchConfig = {
            method: 'post',
            body: json,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        let response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newPresentation = await response.json();
        }


    });
});
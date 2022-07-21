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
    let loadingTag = document.getElementById('loading-conference-spinner');
    loadingTag.classList.add("d-none");
    selectTag.classList.remove("d-none");

    let formTag = document.getElementById('create-attendee-form');
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault();
        let formData = new FormData(formTag);
        let json = JSON.stringify(Object.fromEntries(formData));
        let attendeeUrl = 'http://localhost:8001/api/attendees/'
        let fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        let response = await fetch(attendeeUrl, fetchConfig);
        if (response.ok) {
            let successTag = document.getElementById('success-message');
            successTag.classList.remove('d-none');
            formTag.classList.add('d-none');
            const newPresentation = await response.json();
        }

    });
});

function createCard(name, description, pictureUrl, start, end, location) {
    return `
    <div class = ".card-columns">
      <div class="card shadow mb-5 bg-white rounded d-inline-flex">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
            <small class="text-muted">${start} - ${end}</small>
        </div>
    </div>
    `;
  }

window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response  = await fetch(url);

        if (!response.ok) {
            const html = `
            <div class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>Response is not ok</div>
            </div>`
            const column = document.querySelector('.row');
            column.innerHTML += html;
        } else {
            const data = await response.json();
            let count = 0
            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const location = details.conference.location.name;
                    const startDate = details.conference.starts;
                    const endDate = details.conference.ends;
                    let start = new Date(startDate).toLocaleDateString();
                    let end = new Date(endDate).toLocaleDateString();
                    //Below works but above is more concise
                    // let date1 = new Date(startDate); 
                    // let date2 = new Date(endDate);
                    // let start = (date1.getMonth()+1) + "/" + (date1.getDate()) + "/" + (date1.getFullYear());
                    // let end = (date2.getMonth()+1) + "/" + (date2.getDate()) + "/" + (date2.getFullYear());
                    const html = createCard(name, description, pictureUrl, start, end, location);
                    const column = document.querySelector('#col-' + count%3);
                    // const column = document.getElementById('col-' + count%3);
                    //These are same thing. first one uses id selector through the #
                    column.innerHTML += html;
                    count++
                    }
                }
            
        
            }
    } catch (e) {
        const html = `
        <div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>Error: ${e}</div>
        </div>`
        const column = document.querySelector('.row');
        column.innerHTML += html;
    }

});


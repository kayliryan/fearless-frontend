
function createCard(name, description, pictureUrl, start, end) {
    return `
    <div class = ".card-columns">
      <div class="card shadow p-3 mb-5 bg-white rounded d-inline-flex p-2">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
        </div>
        <footer style="background-color:#E8E8E8">${start} - ${end}</footer>
      </div>
    </div>
    `;
  }

window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response  = await fetch(url);

        if (!response.ok) {
            console.log("Response not ok");
        } else {
            const data = await response.json();
            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const startDate = details.conference.starts;
                    const endDate = details.conference.ends;
                    let date1 = new Date(startDate); 
                    let date2 = new Date(endDate);
                    let start = (date1.getMonth()+1) + "/" + (date1.getDate()) + "/" + (date1.getFullYear());
                    let end = (date2.getMonth()+1) + "/" + (date2.getDate()) + "/" + (date2.getFullYear());
                    const html = createCard(name, description, pictureUrl, start, end);
                    const column3 = document.querySelector('.row');
                    column3.innerHTML += html;
                    }
                }
            
        
            }
    } catch (e) {
        console.log("error:", e)
    }

});



const cardsContent = document.querySelector("#cardsContent");

function createCard(amazingEvent) {
  const card = document.createElement("div");

  card.innerHTML = `
    <div class="card mb-2 mr-2 align-self-center bg-dark" style="width: 18rem;">
      <img src="${amazingEvent.image}" class="card-img-top" alt="${amazingEvent.name}">
      <div class="card-body d-flex flex-column justify-content-center">
        <h5 class="card-title">${amazingEvent.name}</h5>
        <h5 class="card-title">${amazingEvent.date}</h5>
        <p class="card-text">${amazingEvent.description}</p>
        <p>$${amazingEvent.price}</p>
        <a href="#" class="btn btn-light">More details</a>
      </div>
    </div>
  `;

  cardsContent.appendChild(card);
}

window.onload = () => {
  const currentDate = data.currentDate;

  for (const amazingEvent of data.events) {
    if (new Date(amazingEvent.date) > new Date(currentDate)) {
      createCard(amazingEvent);
    }
  }
};

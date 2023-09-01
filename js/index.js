const cardsContent = document.querySelector("#cardsContent");
const categoryContent = document.querySelector("#categoryContent");

const loadCategories = () => {
  const categories = [];

  data.events.forEach((amazingEvent) => {
    if (!categories.includes(amazingEvent.category))
      categories.push(amazingEvent.category);
  });

  categories.forEach((category) => {
    const categoryCheckBox = document.createElement("div");

    categoryCheckBox.innerHTML = `
    <label class="form-check-label p-4">
    <div class="d-flex align-items-center">
    <input type="checkbox" class="form-check-input" name="${category}">
    <span class="mt-1">
        ${category}
    </span>
    </div>
    </label>
    `;

    categoryContent.appendChild(categoryCheckBox);
  });
};

const loadCards = () => {
  data.events.forEach((amazingEvent) => {

    const card = document.createElement("div");

    card.innerHTML = `
      <div class="card mb-2 mr-2 align-self-center text-dark" style="width: 18rem;">
        <img src="${amazingEvent.image}" class="card-img-top" alt="${amazingEvent.name}">
        <div class="card-body d-flex flex-column justify-content-center">
          <h5 class="card-title">${amazingEvent.name}</h5>
          <h5 class="card-title">${amazingEvent.date}</h5>
          <p class="card-text">${amazingEvent.description}</p>
          <p>$${amazingEvent.price}</p>
          <a href="details.html" class="btn btn-dark">More details</a>
        </div>
      </div>
    `;

    cardsContent.appendChild(card);
  });
};

window.onload = () => {
  loadCategories();
  loadCards();
};

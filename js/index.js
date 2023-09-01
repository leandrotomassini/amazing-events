// Variables globales
let cardsContent;
let categoryContent;

// Función para cargar las categorías y las tarjetas de eventos
const loadCategoriesAndCards = () => {
  cardsContent = document.querySelector("#cardsContent");
  categoryContent = document.querySelector("#categoryContent");

  const categories = [];

  // Limpia el contenido actual de los contenedores
  cardsContent.innerHTML = "";
  categoryContent.innerHTML = "";

  data.events.forEach((amazingEvent) => {
    // Verifica si la categoría ya existe en el array de categorías
    if (!categories.includes(amazingEvent.category)) {
      categories.push(amazingEvent.category);

      // Crea el checkbox de categoría
      const categoryCheckBox = document.createElement("div");
      categoryCheckBox.innerHTML = `
        <label class="form-check-label p-4">
          <div class="d-flex align-items-center">
            <input type="checkbox" class="form-check-input" name="${amazingEvent.category}">
            <span class="mt-1">${amazingEvent.category}</span>
          </div>
        </label>
      `;

      // Agrega el checkbox al contenedor de categorías
      categoryContent.appendChild(categoryCheckBox);

      // Agrega un evento change para detectar cambios en los checkboxes
      const checkbox = categoryCheckBox.querySelector("input");
      checkbox.addEventListener("change", () => {
        filterCardsByCategory();
      });
    }

    // Crea la tarjeta de evento
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="card mb-2 mr-2 align-self-center text-dark" style="width: 18rem;">
        <img src="${amazingEvent.image}" class="card-img-top" alt="${amazingEvent.name}">
        <div class="card-body d-flex flex-column justify-content-center">
          <h5 class="card-title">${amazingEvent.name}</h5>
          <label>${amazingEvent.category}</label>
          <h5 class="card-title">${amazingEvent.date}</h5>
          <p class="card-text">${amazingEvent.description}</p>
          <p>$${amazingEvent.price}</p>
          <a href="details.html" class="btn btn-dark">Más detalles</a>
        </div>
      </div>
    `;

    // Agrega la tarjeta al contenedor de tarjetas
    cardsContent.appendChild(card);
  });

  // Agrega un evento change al checkbox "Todos" para mostrar todas las tarjetas
  const allCheckbox = document.querySelector(
    "#categoryContent input[name='Todos']"
  );

  if (allCheckbox) {
    allCheckbox.addEventListener("change", () => {
      filterCardsByCategory();
    });
  }
};

// Función para filtrar tarjetas por categoría
const filterCardsByCategory = () => {
  const checkboxes = document.querySelectorAll(
    "#categoryContent input[type=checkbox]:checked"
  );

  const selectedCategories = Array.from(checkboxes).map(
    (checkbox) => checkbox.name
  );

  const cards = cardsContent.querySelectorAll(".card");

  cards.forEach((card) => {
    const cardCategory = card.querySelector("label").textContent.trim();

    if (
      selectedCategories.length === 0 ||
      selectedCategories.includes("Todos") ||
      selectedCategories.includes(cardCategory)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

// Función principal al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  loadCategoriesAndCards();
});

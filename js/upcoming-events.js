// Función principal al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  // Variables globales
  let cardsContent;
  let categoryContent;
  let noResultsMessage;

  // Función para cargar las categorías y las tarjetas de eventos futuros
  const loadCategoriesAndCards = async () => {
    cardsContent = document.querySelector("#cardsContent");
    categoryContent = document.querySelector("#categoryContent");
    noResultsMessage = document.querySelector("#noResultsMessage");

    const categories = [];
    const currentDate = new Date();

    // Limpia el contenido actual de los contenedores
    cardsContent.innerHTML = "";
    categoryContent.innerHTML = "";

    try {
      // Realiza una solicitud GET para obtener los datos desde la API
      const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");

      if (!response.ok) {
        throw new Error(`Error al cargar los datos: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !Array.isArray(data.events)) {
        throw new Error("Los datos no son válidos.");
      }

      data.events.forEach((amazingEvent) => {
        const eventDate = new Date(amazingEvent.date);

        // Verifica si la fecha del evento es posterior a la fecha actual
        if (eventDate > currentDate) {
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
              filterCards("");
            });
          }

          // Crea la tarjeta de evento
          createCard(amazingEvent);
        }
      });

      // Llama a la función de filtrado al cargar las tarjetas
      filterCards("");
    } catch (error) {
      console.error(error);
    }
  };

  // Función para filtrar tarjetas por categoría y búsqueda
  const filterCards = (searchTerm) => {
    const checkboxes = document.querySelectorAll(
      "#categoryContent input[type=checkbox]:checked"
    );

    const selectedCategories = Array.from(checkboxes).map(
      (checkbox) => checkbox.name
    );

    const cards = cardsContent.querySelectorAll(".card");

    let resultsExist = false;

    cards.forEach((card) => {
      const cardCategory = card.querySelector("label").textContent.trim();
      const cardTitle = card
        .querySelector(".main-title")
        .textContent.trim()
        .toLowerCase();
      searchTerm = searchTerm.trim().toLowerCase();

      if (
        (selectedCategories.length === 0 ||
          selectedCategories.includes(cardCategory)) &&
        (searchTerm === "" || cardTitle.includes(searchTerm))
      ) {
        card.style.display = "block";
        resultsExist = true;
      } else {
        card.style.display = "none";
      }
    });

    // Mostrar u ocultar el mensaje de "No hay resultados"
    if (!resultsExist) {
      noResultsMessage.style.display = "block";
    } else {
      noResultsMessage.style.display = "none";
    }
  };

  // Función para crear una tarjeta de evento
  const createCard = (amazingEvent) => {
    // Crea la tarjeta de evento
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="card mb-2 mr-2 align-self-center text-dark" style="width: 18rem;">
        <img src="${amazingEvent.image}" class="card-img-top" alt="${amazingEvent.name}">
        <div class="card-body d-flex flex-column justify-content-center">
          <h5 class="card-title main-title">${amazingEvent.name}</h5>
          <label>${amazingEvent.category}</label>
          <h5 class="card-title">${amazingEvent.date}</h5>
          <p class="card-text">${amazingEvent.description}</p>
          <p>$${amazingEvent.price}</p>
          <a href="details.html?eventId=${amazingEvent._id}" class="btn btn-dark" data-event-id="${amazingEvent._id}">More details</a>
        </div>
      </div>
    `;

    // Agrega la tarjeta al contenedor de tarjetas
    cardsContent.appendChild(card);
  };

  // Función para agregar manejo de eventos en las cajas de búsqueda
  const setupSearchBoxes = () => {
    const searchInputs = document.querySelectorAll("input[type='search']");
    const searchButtons = document.querySelectorAll("button[type='submit']");

    searchInputs.forEach((searchInput) => {
      searchInput.addEventListener("input", () => {
        filterCards(searchInput.value);
      });

      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          filterCards(searchInput.value);
        }
      });
    });

    searchButtons.forEach((searchButton) => {
      searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        const parentForm = searchButton.closest("form");
        const input = parentForm.querySelector("input[type='search']");
        filterCards(input.value);
      });
    });
  };

  // Cargar las categorías y las tarjetas de eventos al cargar la página
  loadCategoriesAndCards();

  // Configurar el manejo de eventos en las cajas de búsqueda
  setupSearchBoxes();
});

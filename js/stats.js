// Defino la URL de la API de datos
const url = "https://mindhub-xj03.onrender.com/api/amazing";

// Declaro las variables de estadísticas para eventos futuros y pasados
const upcomingCategoryStatistics = {};
const pastCategoryStatistics = {};

// Realizo una solicitud HTTP GET a la URL y manejo la respuesta en formato JSON
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // Extraigo la lista de eventos de los datos
    const events = data.events;

    let eventWithHighestAssistance = null;
    let eventWithLowestAssistance = null;
    let eventWithLargestCapacity = null;

    let highestAssistancePercentage = 0;
    let lowestAssistancePercentage = 100;
    let largestEventCapacity = 0;

    // Recorro la lista de eventos
    for (const event of events) {
      // Calculo el porcentaje de asistencia para cada evento
      const assistancePercentage = (event.assistance / event.capacity) * 100;

      // Actualizo los eventos con la asistencia más alta y más baja
      if (assistancePercentage > highestAssistancePercentage) {
        highestAssistancePercentage = assistancePercentage;
        eventWithHighestAssistance = event;
      }

      if (assistancePercentage < lowestAssistancePercentage) {
        lowestAssistancePercentage = assistancePercentage;
        eventWithLowestAssistance = event;
      }

      if (event.capacity > largestEventCapacity) {
        largestEventCapacity = event.capacity;
        eventWithLargestCapacity = event;
      }

      // Obtengo la categoría y la fecha del evento
      const category = event.category;

      // Obtengo el precio y la asistencia del evento, asegurándome de que sean números válidos
      const price = event.price || 0;
      const assistance = event.assistance || 0;
      const estimate = event.estimate || 0;


      // Calculo los ingresos del evento
      let eventRevenues = price * assistance;


      // Verifico si el evento es futuro o pasado en función de la fecha
      if (event.date > data.currentDate) {

        eventRevenues = price * estimate;

        // Si es un evento futuro, actualizo las estadísticas de categoría para eventos futuros
        if (!upcomingCategoryStatistics[category]) {
          upcomingCategoryStatistics[category] = {
            totalRevenues: 0,
            totalAssistance: 0,
          };
        }

        upcomingCategoryStatistics[category].totalRevenues += eventRevenues;
        upcomingCategoryStatistics[category].totalAssistance += estimate;
      } else {
        // Si es un evento pasado, actualizo las estadísticas de categoría para eventos pasados
        if (!pastCategoryStatistics[category]) {
          pastCategoryStatistics[category] = {
            totalRevenues: 0,
            totalAssistance: 0,
          };
        }
        pastCategoryStatistics[category].totalRevenues += eventRevenues;
        pastCategoryStatistics[category].totalAssistance += assistance;
      }
    }

    // Calcular los porcentajes de asistencia para eventos futuros
    for (const category in upcomingCategoryStatistics) {
      const stats = upcomingCategoryStatistics[category];
      const newRow = document.createElement("tr");

      const categoryCell = document.createElement("td");
      categoryCell.textContent = category;

      const revenuesCell = document.createElement("td");
      // Formatear los ingresos sin decimales y sin .00
      const formattedRevenues = stats.totalRevenues.toLocaleString("en-US", { style: "currency", currency: "USD" }).replace(".00", "");
      revenuesCell.textContent = formattedRevenues;

      const assistancePercentageCell = document.createElement("td");
      // Calcular el porcentaje de asistencia y mostrarlo en formato 0.00%
      if (stats.totalRevenues > 0) {
        assistancePercentageCell.textContent = `${(stats.totalAssistance / stats.totalRevenues * 100).toFixed(2)}%`;
      } else {
        assistancePercentageCell.textContent = "0.00%";
      }

      newRow.appendChild(categoryCell);
      newRow.appendChild(revenuesCell);
      newRow.appendChild(assistancePercentageCell);

      upcomingEventsTableBody.appendChild(newRow);
    }

    // Calcular los porcentajes de asistencia para eventos pasados
    for (const category in pastCategoryStatistics) {
      const stats = pastCategoryStatistics[category];

      const pastEventsTableBody = document.getElementById("pastEventsTableBody");

      const newRow = document.createElement("tr");

      const categoryCell = document.createElement("td");
      categoryCell.textContent = category;

      const revenuesCell = document.createElement("td");
      // Formatear los ingresos sin decimales y sin .00
      const formattedRevenues = stats.totalRevenues.toLocaleString("en-US", { style: "currency", currency: "USD" }).replace(".00", "");
      revenuesCell.textContent = formattedRevenues;

      const assistancePercentageCell = document.createElement("td");
      // Calcular el porcentaje de asistencia y mostrarlo en formato 0.00%
      if (stats.totalRevenues > 0) {
        assistancePercentageCell.textContent = `${(stats.totalAssistance / stats.totalRevenues * 100).toFixed(2)}%`;
      } else {
        assistancePercentageCell.textContent = "0.00%";
      }

      newRow.appendChild(categoryCell);
      newRow.appendChild(revenuesCell);
      newRow.appendChild(assistancePercentageCell);

      pastEventsTableBody.appendChild(newRow);
    }

    // Actualizar la tabla de información con los nombres de eventos
    document.getElementById("highestAssistanceCell").textContent = eventWithHighestAssistance ? eventWithHighestAssistance.name : "N/A";
    document.getElementById("lowestAssistanceCell").textContent = eventWithLowestAssistance ? eventWithLowestAssistance.name : "N/A";
    document.getElementById("largestCapacityCell").textContent = eventWithLargestCapacity ? eventWithLargestCapacity.name : "N/A";
  })
  .catch((error) => {
    console.error("Error al obtener los datos:", error);
  });

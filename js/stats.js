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
      let assistancePercentage = (event.assistance * 100) / event.capacity;

      // Verifico si el evento es futuro o pasado en función de la fecha
      if (event.date > data.currentDate) {
        // Si es un evento futuro, actualizo las estadísticas de categoría para eventos futuros
        if (!upcomingCategoryStatistics[event.category]) {
          upcomingCategoryStatistics[event.category] = {
            totalRevenues: 0,
            totalAssistance: 0,
          };
        }

        // Utilizo "estimate" para calcular los ingresos y la asistencia para eventos futuros
        const estimatedAssistancePercentage = (event.estimate * 100) / event.capacity;
        const estimatedRevenues = event.price * event.estimate;

        upcomingCategoryStatistics[event.category].totalRevenues += estimatedRevenues;
        upcomingCategoryStatistics[event.category].totalAssistance += event.estimate;

        // Actualizo los eventos con la asistencia más alta y más baja
        if (estimatedAssistancePercentage > highestAssistancePercentage) {
          highestAssistancePercentage = estimatedAssistancePercentage;
          eventWithHighestAssistance = event;
        }

        if (estimatedAssistancePercentage < lowestAssistancePercentage) {
          lowestAssistancePercentage = estimatedAssistancePercentage;
          eventWithLowestAssistance = event;
        }

        if (event.capacity > largestEventCapacity) {
          largestEventCapacity = event.capacity;
          eventWithLargestCapacity = event;
        }
      } else {
        // Si es un evento pasado, actualizo las estadísticas de categoría para eventos pasados
        if (!pastCategoryStatistics[event.category]) {
          pastCategoryStatistics[event.category] = {
            totalRevenues: 0,
            totalAssistance: 0,
          };
        }

        const revenues = event.price * event.assistance;

        pastCategoryStatistics[event.category].totalRevenues += revenues;
        pastCategoryStatistics[event.category].totalAssistance += event.assistance;
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

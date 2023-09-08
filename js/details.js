document.addEventListener("DOMContentLoaded", () => {
    // ID del evento de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("eventId");

    // URL de la API que contiene todos los eventos
    const apiUrl = "https://mindhub-xj03.onrender.com/api/amazing"; // Reemplaza con la URL de tu API

    // Realiza una solicitud HTTP para obtener todos los eventos
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Encuentra el evento correspondiente en los datos obtenidos de la API
            const event = data.events.find((event) => event._id === parseInt(eventId));

            if (event) {
                // Actualiza los elementos HTML con los detalles del evento

                // Nombre del evento
                document.getElementById("eventName").textContent = event.name;

                // Fecha del evento
                const eventDateElement = document.getElementById("eventDate");
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
                eventDateElement.textContent = formattedDate;

                // Descripción del evento
                document.getElementById("eventDescription").textContent = event.description;

                // Categoría del evento
                document.getElementById("eventCategory").textContent = event.category;

                // Lugar del evento
                document.getElementById("eventPlace").textContent = event.place;

                // Capacidad del evento 
                const eventCapacityElement = document.getElementById("eventCapacity");
                eventCapacityElement.textContent = new Intl.NumberFormat().format(
                    event.capacity
                );

                // Asistencia al evento
                const eventAssistanceElement = document.getElementById(
                    "eventAssistance"
                );
                eventAssistanceElement.textContent = new Intl.NumberFormat().format(
                    event.assistance
                );

                // Precio del evento
                const eventPriceElement = document.getElementById("eventPrice");
                eventPriceElement.textContent = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(event.price);

                // Imagen del evento
                const eventImageElement = document.getElementById("eventImage");
                eventImageElement.src = event.image;
                eventImageElement.alt = event.name;
            }
        })
        .catch((error) => {
            console.error("Error al obtener los detalles del evento:", error);
        });
});

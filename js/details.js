document.addEventListener("DOMContentLoaded", () => {
    // ID del evento de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("eventId");

    // Encuentra el evento correspondiente en tu fuente de datos (data.events)
    const event = data.events.find((event) => event._id === eventId);

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

        // Capacidad del evento (con formato de miles)
        const eventCapacityElement = document.getElementById("eventCapacity");
        eventCapacityElement.textContent = new Intl.NumberFormat().format(event.capacity);

        // Asistencia al evento (con formato de miles)
        const eventAssistanceElement = document.getElementById("eventAssistance");
        eventAssistanceElement.textContent = new Intl.NumberFormat().format(event.assistance);

        // Precio del evento (con formato de moneda)
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
});

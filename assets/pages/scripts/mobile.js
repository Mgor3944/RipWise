// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Extract the alert preferences from the URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get the alerts and contactable time from the URL parameters
    const alertsParam = urlParams.get('alerts');
    const contactTimeParam = urlParams.get('contactTime');

    // Parse the extracted JSON data
    let selectedAlerts = [];
    let contactTime = {};

    if (alertsParam) {
        try {
            selectedAlerts = JSON.parse(alertsParam);
        } catch (error) {
            console.error('Error parsing alerts from URL:', error);
        }
    }
    
    if (contactTimeParam) {
        try {
            contactTime = JSON.parse(contactTimeParam);
        } catch (error) {
            console.error('Error parsing contact time from URL:', error);
        }
    }

    // Display the selected alerts
    const alertsContainer = document.querySelector('.userSelectedAlerts');

    if (selectedAlerts.length > 0) {
        alertsContainer.innerHTML = ''; // Clear any placeholder text
        selectedAlerts.forEach(alert => {
            const formattedAlert = alert.replace(/-/g, ' '); // Replace hyphens with spaces for each alert
            const alertDiv = document.createElement('div');
            alertDiv.className = 'retrievedAlert';
            alertDiv.id = alert.toLowerCase().replace(/\s+/g, '-'); // tagging alert ID with name of selected alert
            alertDiv.textContent = formattedAlert;
            alertsContainer.appendChild(alertDiv);
        });
    } else {
        alertsContainer.textContent = 'No alerts selected.';
    }

    // Display the selected contactable time
    const contactTimeContainer = document.querySelector('.userSelectedTime');

    if (contactTime.from && contactTime.to) {
        contactTimeContainer.innerHTML = `<span class="retrievedTime"> Contact Time: <strong>From ${contactTime.from} to ${contactTime.to}</strong></span>`;
    } else {
        contactTimeContainer.textContent = 'No contact time specified.';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map and set its view to the specified coordinates
    var map = L.map('map-mobile', { zoomControl: false }).setView([-33.698838, 151.309927], 17);

    // Add OpenStreetMap tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define custom points for the route
    var latlngs = [
        [-33.699788, 151.308555], // ripwise kiosk
        [-33.699797, 151.308613],
        [-33.699725, 151.308837],
        [-33.699607, 151.309043],
        [-33.699540, 151.309267],
        [-33.699361, 151.309415],
        [-33.699124, 151.309690],
        [-33.698805, 151.310291] // safe swim zone
    ];

    // Create a polyline to show the customized route and add it to the map
    var customPolyline = L.polyline(latlngs, {
        color: '#257BF4',
        weight: 5,
        opacity: 0.8,
        dashArray: '5, 10' // Optional: make the polyline dashed to indicate a suggested route
    }).addTo(map);

    // Fit the map view to the polyline
    map.fitBounds(customPolyline.getBounds(), {
        padding: [50, 50]
    });

    // Add markers for start and end points
    var startMarker = L.marker(latlngs[0]).addTo(map).bindPopup('<div class="ssz-box">Location<b>RipWise Kiosk</b></div>');
    var endMarker = L.marker(latlngs[latlngs.length - 1]).addTo(map).bindPopup('<div class="ssz-box">Destination<b>Safe Swim Zone</b></div>').openPopup();

    // Add "Start Navigation" button functionality
    const startNavButton = document.querySelector('.start-nav');
    startNavButton.addEventListener('click', function () {
        // do something when nav button is clicked
    });
});
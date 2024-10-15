// Toggle Menu
let sidebar = document.querySelector(".sidebar");
let menu = document.querySelector(".menu");
let openAlerts = document.querySelector(".alert-box");

menu.addEventListener("click", ()=> {
    sidebar.classList.toggle("open");
});

openAlerts.addEventListener("click", ()=> {
    sidebar.classList.toggle("open");
});

// Load Leaflett Interactive Map
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map and set its view to a given geographical location and zoom level
    var map = L.map('map').setView([-33.698838, 151.309927], 17); // Turimetta Beach coordinates [latitude, longitude] and zoom level

    // Load and display tile layers on the map (e.g., from OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker for the kiosk location
    var kioskMarker = L.marker([-33.696700, 151.310085]).addTo(map);
    kioskMarker.bindPopup('<b>RipWise Kiosk</b><br>This is where you are located.').openPopup();

    // Add a marker for the safe swim zone location
    var safeSwimMarker = L.marker([-33.699537, 151.309504]).addTo(map);
    safeSwimMarker.bindPopup('<b>Safe Swim Zone</b><br>Designated safe swimming area.').openPopup();

    // Create a polyline to show the path from the kiosk to the safe swim zone
    // Create two polylines to show the path from the kiosk to the safe swim zone
    var latlngs = [
        [-33.696700, 151.310085], // Kiosk location
        [-33.696940, 151.310350], // Intermediate point 1 to follow visible path
        [-33.697200, 151.310600], // Intermediate point 2
        [-33.698000, 151.310200], // Intermediate point 3
        [-33.698800, 151.309800], // Intermediate point 4
        [-33.699537, 151.309504]  // Safe swim zone location
    ];

    // Create a polyline with dashed styles and add it to the map
    var polyline = L.polyline(latlngs, {
        color: '#257BF4',
        dashArray: '10, 10'
    }).addTo(map);

    polyline.bindPopup('Path from Kiosk to Safe Swim Zone');
});





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

    // Define different map views
    var streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var satelliteLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> contributors'
    });

    // Add default map view
    streetLayer.addTo(map);

    // Create a layers control and add to the map to switch views
    var baseMaps = {
        "Street View": streetLayer,
        "Satellite View": satelliteLayer
    };
    L.control.layers(baseMaps).addTo(map);

    // Add a marker for the kiosk location
    var kioskMarker = L.marker([-33.696700, 151.310085]).addTo(map);
    kioskMarker.bindPopup('<b>RipWise Kiosk</b><br>This is where you are located.').openPopup();

    // Add a marker for the safe swim zone location
    var safeSwimMarker = L.marker([-33.699537, 151.309504]).addTo(map);
    safeSwimMarker.bindPopup('Safe Swim Zone<br><b>Turimetta Beach</b>').openPopup();

    // Create a polyline to show the path from the kiosk to the safe swim zone
    var latlngs = [
        [-33.696700, 151.310085], // Kiosk location
        [-33.696940, 151.310350],
        [-33.697200, 151.310600],
        [-33.698000, 151.310200],
        [-33.698800, 151.309800],
        [-33.699537, 151.309504]  // Safe swim zone location
    ];

    // Create a polyline with dashed styles and add it to the map
    var polyline = L.polyline(latlngs, {
        color: '#257BF4',
        dashArray: '10, 10'
    }).addTo(map);

    polyline.bindPopup('<div class="custom-popup">Path from Kiosk to Safe Swim Zone</div>');

    ///////////
    // BREAK //
    ///////////

    // Generate QR Code 
    const qrContainer = document.querySelector('.QR-code');

    const url_new = new URL('/assets/pages/mobile.html', window.location.origin);

    const qrCanvas = document.createElement('canvas');
    qrCanvas.className = 'qr-code-wrapper';
    qrContainer.appendChild(qrCanvas);

    const qrCode = new QRious({
        element: qrCanvas,
        size: 100,
        value: url_new.toString()
    });

    qrContainer.appendChild(qrCode.element); // send QR code to html

    ///////////
    // BREAK //
    ///////////

    // Toggle between live camera popup states
    const liveCameraSection = document.getElementById('live-camera');
    const scanQrSection = document.getElementById('scan-QR-code');
    const getDirectionsButton = document.getElementById('get-directions');

    scanQrSection.style.display = 'none';

    getDirectionsButton.addEventListener('click', function() {
        liveCameraSection.style.display = 'none';
        scanQrSection.style.display = 'flex';
    });
});






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

    ///////////
    // Initialize the first map
    ///////////

    var map1 = L.map('map', {
        center: [-33.699297, 151.309423],
        zoom: 17,
        zoomControl: true
    });

    // Define streetLayer for map1
    var streetLayer1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    streetLayer1.addTo(map1);

    var kioskMarker1 = L.marker([-33.699788, 151.308555]).addTo(map1);
    kioskMarker1.bindPopup("You're here<br><b>RipWise Kiosk</b>").openPopup();

    var safeSwimMarker1 = L.marker([-33.698805, 151.310291]).addTo(map1);
    safeSwimMarker1.bindPopup('Destination<br><b>Safe Swim Zone</b>').openPopup();

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

    var polyline1 = L.polyline(latlngs, {
        color: '#257BF4',
        dashArray: '10, 10'
    }).addTo(map1);

    polyline1.bindPopup('<div class="custom-popup">Path from Kiosk to Safe Swim Zone</div>');

    ///////////
    // Initialize the second map --> small version for popup
    ///////////

    var map2 = L.map('nav-map-wrap', {
        center: [-33.699297, 151.309423],
        zoom: 17,
        zoomControl: false
    });

    // Add default map view to the second map
    var streetLayer2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    streetLayer2.addTo(map2);

    // Add markers and polyline to the second map
    var kioskMarker2 = L.marker([-33.699788, 151.308555]).addTo(map2);

    var safeSwimMarker2 = L.marker([-33.698805, 151.310291]).addTo(map2);
    safeSwimMarker2.bindPopup('Destination<br><b>Safe Swim Zone</b>');

    var polyline2 = L.polyline(latlngs, {
        color: '#257BF4',
        dashArray: '10, 10'
    }).addTo(map2);

    polyline2.bindPopup('<div class="custom-popup">Path from Kiosk to Safe Swim Zone</div>');

    ///////////
    // Expand Icon Click Event Listener
    ///////////

    const expandIcon = document.getElementById('expand-icon');
    const mapContainer = document.getElementById('map'); // Full-size map container
    const camFeedWrapper = document.getElementById('cam-feed-wrapper'); // Full-size camera feed
    const liveCamWrap = document.getElementById('live-cam-wrap'); // Live Camera popup
    const navMapWrap = document.getElementById('nav-map-wrap'); // Small Map popup
    const pContentText = document.querySelector('.p-content-text p'); // Text in content section

    expandIcon.addEventListener('click', function () {
        if (mapContainer.style.display === 'none') {

            // Display the large map and small live camera feed

            mapContainer.style.display = 'block';
            camFeedWrapper.style.display = 'none';
            liveCamWrap.style.display = 'block';
            navMapWrap.style.display = 'none';

            pContentText.textContent = "We provide a live camera of the safe swim zone. You can access directions below.";
    
            map1.invalidateSize(); // Recalculate size for map1 when it's displayed
        } else {

            // Display the large live camera feed and the small map

            mapContainer.style.display = 'none';
            camFeedWrapper.style.display = 'block';
            liveCamWrap.style.display = 'none';
            navMapWrap.style.display = 'block';
    
            pContentText.textContent = "We provide real-time navigation to the safe swimming zone. ";
    
            map2.invalidateSize(); // Recalculate size for map2 when it's displayed
        }
    });

    ///////////
    // Generate QR Code for Nav Directions on Mobile
    ///////////

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
    // Display QR code page of popup on click
    ///////////

    const liveCameraSection = document.getElementById('live-camera');
    const scanQrSection = document.getElementById('scan-QR-code');
    const getDirectionsButton = document.getElementById('get-directions');

    getDirectionsButton.addEventListener('click', function() {
        liveCameraSection.style.display = 'none';
        expandIcon.style.display = 'none';
        scanQrSection.style.display = 'flex';
    });

    ///////////
    // Display Current Time
    ///////////

    function updateTime() {
        // Create a new Date object and convert to AEST timezone
        const now = new Date();

        // Options to display the time correctly in AEST
        const options = {
            timeZone: 'Australia/Sydney', // Time zone for AEST
            hour: 'numeric',
            minute: '2-digit',
            hour12: true // Use 24-hour format
        };

        // Format the current time as AEST
        const currentTimeAEST = now.toLocaleTimeString('en-AU', options);

        // Update the HTML element with the current time
        document.getElementById('live-time').textContent = currentTimeAEST;
    }

    // Update the time every second
    setInterval(updateTime, 1000);

    // Initial call to set the time immediately
    updateTime();
});
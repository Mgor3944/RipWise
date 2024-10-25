//////////////////////////////
//////////////////////////////
// Retrieve Selected Alerts //
//////////////////////////////
//////////////////////////////

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

    ///////////////////////////////
    ///////////////////////////////
    /// Display Selected Alerts ///
    ///////////////////////////////
    ///////////////////////////////

    const alertsIcon = document.querySelector(".alerts");
    const alertOverlay = document.getElementById("alert-popup-overlay");
    const alertsPopup = document.getElementById("alerts-popup");
    const closePopupBtn = document.getElementById("close-alert-popup");
    const alertSummaryMessage = document.querySelector(".alert-summary-message");
    const alertIconBox = document.getElementById("alert-icon-box");

    // Function to show popup
    function showAlertsPopup() {
        alertOverlay.style.display = "block";
        alertsPopup.style.display = "block"; 
        alertIconBox.classList.toggle('active');

        const alertsCount = selectedAlerts.length;
        const contactUntil = contactTime.to ? contactTime.to : "an unspecified time";
        alertSummaryMessage.innerHTML = `You have signed up to receive  <strong>${alertsCount} alert(s)</strong> until <strong>${contactUntil}</strong> today via the RipWise kiosk.`;
    }

    // Show popup and overlay when alerts icon is clicked
    alertsIcon.addEventListener("click", function(event) {
        event.preventDefault();
        showAlertsPopup();
    });

    // Automatically show alerts popup if alerts or contact time parameters are present in the URL
    if (alertsParam || contactTimeParam) {
        showAlertsPopup();
    }

    // Close popup and overlay when close button is clicked
    closePopupBtn.addEventListener("click", function() {
        alertOverlay.style.display = "none";
        alertsPopup.style.display = "none";
        alertIconBox.classList.remove('active');
    });

    // Close popup and overlay when clicking outside the popup (on overlay)
    alertOverlay.addEventListener("click", function() {
        alertOverlay.style.display = "none";
        alertsPopup.style.display = "none";
        alertIconBox.classList.remove('active');
    });
});


//////////////////////////////
//////////////////////////////
/// Navigation Map Display ///
//////////////////////////////
//////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the original map (map-mobile) and set its view
    var mapMobile = L.map('map-mobile', { zoomControl: false }).setView([-33.698838, 151.309927], 15);

    // Add OpenStreetMap tile layer to the map-mobile
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapMobile);

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

    // Create a polyline to show the customized route and add it to the map-mobile
    var customPolyline = L.polyline(latlngs, {
        color: '#257BF4',
        weight: 5,
        opacity: 0.8,
        dashArray: '5, 10' // Optional: make the polyline dashed to indicate a suggested route
    }).addTo(mapMobile);

    // Fit the map view to the polyline
    mapMobile.fitBounds(customPolyline.getBounds(), {
        padding: [60, 60]
    });

    // Add markers for start and end points
    var startMarker = L.marker(latlngs[0]).addTo(mapMobile).bindPopup('<div class="ssz-box">Location<b>RipWise Kiosk</b></div>');
    var endMarker = L.marker(latlngs[latlngs.length - 1]).addTo(mapMobile).bindPopup('<div class="ssz-box">Destination<b>Safe Swim Zone</b></div>').openPopup();

    // Add a custom icon for the compass arrow
    var compassIcon = L.divIcon({
        html: `<img id="compass-arrow" src="../../assets/icons/nav-arrow.svg" style="width: 40px; height: 40px; transform: rotate(0deg);">`,
        iconSize: [50, 50],
        className: 'compass-icon' // Custom class for additional styling if needed
    });

    // Add a marker at the specific coordinates with the compass arrow icon
    var compassMarker = L.marker([-33.699788, 151.308555], { icon: compassIcon }).addTo(mapMobile);

    // Add "Start Navigation" button functionality
    const startNavButton = document.querySelector('.start-nav');
    startNavButton.addEventListener('click', function () {
        document.getElementById('nav-details').style.display = 'none';
        document.getElementById('directions-panel').style.display = 'block';
        document.getElementById('compass-arrow').style.display = 'none';

        // Add device orientation event listener
        window.addEventListener('deviceorientation', function (event) {
            const compassArrow = document.getElementById('compass-arrow');
            if (event.alpha !== null) {
                // The alpha value represents the rotation around the z-axis (in degrees)
                let rotation = event.alpha;

                // Adjust the rotation of the arrow
                compassArrow.style.transform = `rotate(${rotation}deg)`;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get the live camera link and the video container
    const liveCameraLink = document.getElementById('live-camera-link');
    const liveFeedContainer = document.getElementById('ripwise-live-feed');

    // Add event listener for the live camera link
    liveCameraLink.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior (if needed)

        // Toggle active class on the live camera link
        liveCameraLink.classList.toggle('active');

        // Display the live feed container (toggle visibility)
        if (liveFeedContainer.style.display === 'none' || liveFeedContainer.style.display === '') {
            liveFeedContainer.style.display = 'flex';
        } else {
            liveFeedContainer.style.display = 'none';
        }
    });
});




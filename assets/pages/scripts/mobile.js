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

// Setting

function initMap() {
    const mapOptions = {
        zoom: 17,
        center: { lat: -33.698838, lng: 151.309927 }, // Turimetta Beach Coordinates
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    };
    const map = new google.maps.Map(document.getElementById("map-mobile"), mapOptions);

    // Marker locations
    const kioskLocation = { lat: -33.696700, lng: 151.310085 };
    const swimZoneLocation = { lat: -33.699537, lng: 151.309504 };

    const line1 = { lat: -33.696940, lng: 151.310350};
    const line2 = { lat: -33.697200, lng: 151.310600};
    const line3 = { lat: -33.698000, lng: 151.310200};
    const line4 = { lat: -33.698800, lng: 151.309800};

    // Add markers to the map
    const kioskMarker = new google.maps.Marker({
        position: kioskLocation,
        map: map,
        title: "RipWise Kiosk"
    });

    const swimZoneMarker = new google.maps.Marker({
        position: swimZoneLocation,
        map: map,
        title: "Safe Swim Zone"
    });

    // Draw a line between the two locations
    const routePath = new google.maps.Polyline({
        path: [kioskLocation, line1, line2, line3, line4, swimZoneLocation],
        geodesic: true,
        strokeColor: "#257BF4",
        strokeOpacity: 1.0,
        strokeWeight: 4
    });

    routePath.setMap(map);

    // Show directions on button click
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    document.querySelector(".start-nav").addEventListener("click", () => {
        window.location.href = "https://www.alltrails.com/explore/map/norah-head-lighthouse-loop-9c779f5?u=m&sh=rmdpxv";
    });

    // document.querySelector(".start-nav").addEventListener("click", () => {
    //     const request = {
    //         origin: kioskLocation,
    //         destination: swimZoneLocation,
    //         travelMode: google.maps.TravelMode.WALKING
    //     };
    //     directionsService.route(request, (result, status) => {
    //         if (status === google.maps.DirectionsStatus.OK) {
    //             directionsRenderer.setDirections(result);
    //         } else {
    //             console.error("Directions request failed due to " + status);
    //         }
    //     });
    // });
}
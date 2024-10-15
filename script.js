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

// Toggle Alert Preferences Accordian

function toggleAccordion(element) {
    const content = element.nextElementSibling;

    // Toggle the display of the content
    if (content.style.display === 'flex') {
        content.style.display = 'none';
        element.querySelector('.arrow').classList.remove('rotate');
    } else {
        closeAllAccordions(); // Close other open accordions
        content.style.display = 'flex';
        element.querySelector('.arrow').classList.add('rotate');
    }
}

function closeAllAccordions() {
    const allContents = document.querySelectorAll('.accordion-content');
    const allArrows = document.querySelectorAll('.accordion-title .arrow');

    allContents.forEach(content => (content.style.display = 'none'));
    allArrows.forEach(arrow => arrow.classList.remove('rotate'));
}

function handleSelection(checkbox) {
    const selectedItems = document.querySelector('.alerts-wrap'); // Div where selected items will appear inside
    const label = checkbox.parentElement.textContent.trim();

    if (checkbox.checked) {
        const selectedAlert = document.createElement('div');
        selectedAlert.className = 'chosenAlert';
        selectedAlert.id = label; // Assign unique ID for each alert
        selectedAlert.dataset.label = label; // Store label for reference

        // Create the span to hold the alert label text
        const alertText = document.createElement('span');
        alertText.textContent = label;

        // Create the close icon
        const closeIcon = document.createElement('img');
        closeIcon.src = '/assets/icons/close.svg';
        closeIcon.className = 'close';
        closeIcon.onclick = () => {
            checkbox.checked = false; // Uncheck the checkbox
            selectedAlert.remove(); // Remove the alert from the selected items
            toggleSelectedItemsVisibility();
        };

        // Append text and close icon to the alert div
        selectedAlert.appendChild(alertText);
        selectedAlert.appendChild(closeIcon);

        // Add the alert to the selected items container
        selectedItems.appendChild(selectedAlert);
    } else {
        // Remove the alert if the checkbox is unchecked
        const selectedAlert = selectedItems.querySelector(`[data-label="${label}"]`);
        if (selectedAlert) selectedAlert.remove();
    }

    // Toggle the visibility of the selected-items div
    toggleSelectedItemsVisibility();
}

// Visibility of Selected Alerts Section
function toggleSelectedItemsVisibility() {
    const selectedItemsDiv = document.querySelector('.selected-alerts'); // parent div
    const selectedItems = document.querySelector('.alerts-wrap'); // div where active alerts go
    if (selectedItems.children.length > 0) {
        selectedItemsDiv.style.display = 'flex';
    } else {
        selectedItemsDiv.style.display = 'none';
    }
}

// Focus on first select box --> Get Alerts
window.onload = () => {
    const fromTimeSelect = document.querySelector('.from-time');
    fromTimeSelect.focus(); // Set focus on the first select box
};

// Ensures that from time and to time are never the same --> Get Alerts
document.addEventListener('DOMContentLoaded', () => {
    const fromTimeSelect = document.querySelector('.from-time');
    const toTimeSelect = document.querySelector('.to-time');
    const errorMessage = document.querySelector('.time-error-message');

    function checkTimes() {
        const fromTimeValue = fromTimeSelect.value;
        const toTimeValue = toTimeSelect.value;

        if (fromTimeValue === toTimeValue) {
            // If "From" and "To" times are the same, display error message and highlight the select boxes
            fromTimeSelect.style.border = '1px solid red';
            toTimeSelect.style.border = '1px solid red';
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'From and cannot be the same';
        } else if (fromTimeValue > toTimeValue) {
            // If "From" time is after "To" time, display error message and highlight the select boxes
            fromTimeSelect.style.border = '1px solid red';
            toTimeSelect.style.border = '1px solid red';
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'The "From" time is later than the "To" time';
        } else {
            // Reset styles when the times are valid
            fromTimeSelect.style.border = '';
            toTimeSelect.style.border = '';
            errorMessage.style.display = 'none';
        }
    }

    // Add event listeners to the "From" and "To" dropdowns
    fromTimeSelect.addEventListener('change', checkTimes);
    toTimeSelect.addEventListener('change', checkTimes);
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





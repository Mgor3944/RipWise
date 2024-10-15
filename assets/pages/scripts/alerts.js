// Focus on first select box --> Get Alerts
window.onload = () => {
    const fromTimeSelect = document.querySelector('.from-time');
    fromTimeSelect.focus(); // Set focus on the first select box
};

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
    const alertErrorMessage = document.querySelector('.alert-error-message');

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

        // Hide the error message if it is displayed
        alertErrorMessage.style.display = 'none';
    } else {
        // Remove the alert if the checkbox is unchecked
        const selectedAlert = selectedItems.querySelector(`[data-label="${label}"]`);
        if (selectedAlert) selectedAlert.remove();
    }

    // Toggle the visibility of the selected-items
    toggleSelectedItemsVisibility();
}

// Visibility of Selected Alerts Section
function toggleSelectedItemsVisibility() {
    const selectedItems = document.querySelector('.alerts-wrap'); // div where active alerts go
    const alertDummyText = document.querySelector('.alert-dummy-text'); // dummy text element

    if (selectedItems.children.length > 0) {
        alertDummyText.style.display = 'none';
    } else {
        alertDummyText.style.display = 'block';
    }
}

// Ensures that from time and to time are never the same --> Get Alerts
document.addEventListener('DOMContentLoaded', () => {
    const fromTimeSelect = document.querySelector('.from-time');
    const toTimeSelect = document.querySelector('.to-time');
    const errorMessage = document.querySelector('.time-error-message');

    function checkTimes() {
        const fromTimeValue = fromTimeSelect.value;
        const toTimeValue = toTimeSelect.value;

        if (fromTimeValue >= toTimeValue) {
            // If "From" and "To" times are the same, display error message and highlight the select boxes
            fromTimeSelect.style.border = '1px solid red';
            toTimeSelect.style.border = '1px solid red';
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Start time cannot be the same or later than end time.';
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

// Hide alert-container-outer and show alerts-submitted-container on submit
const submitButton = document.getElementById('submit-alerts');

submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission

    // Check if at least one alert is selected
    const selectedAlertsWrap = document.querySelector('.alerts-wrap');
    const selectedAlerts = selectedAlertsWrap.querySelectorAll('.chosenAlert');
    const alertErrorMessage = document.querySelector('.alert-error-message');

    if (selectedAlerts.length === 0) {
        alertErrorMessage.style.display = 'block';
        alertErrorMessage.textContent = 'Please select at least one alert before submitting.';
        return;
    }

    // Hide the original get alerts form
    const alertContainerOuter = document.querySelector('.alert-container-outer');
    alertContainerOuter.style.display = 'none';

    // Show the alerts submitted QR code
    const alertsSubmittedContainer = document.querySelector('.alerts-submitted-container');
    alertsSubmittedContainer.style.display = 'flex';

    // Display the selected alerts
    const displayAlertsContainer = document.querySelector('.displaySelectedAlerts');
    displayAlertsContainer.innerHTML = ''; // Clear previous selections

    // Create empty array for selected alerts
    const selectedAlertLabels = [];
    
    selectedAlerts.forEach(alert => {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alertSelected';
        alertDiv.id = alert.dataset.label.toLowerCase().replace(/\s+/g, '-'); // Set ID based on alert label
        alertDiv.textContent = alert.dataset.label;
        displayAlertsContainer.appendChild(alertDiv);

        selectedAlertLabels.push(alert.dataset.label.toLowerCase().replace(/\s+/g, '-')); // Store select alerts
    });

    // Display the selected contactable time
    const fromTimeSelect = document.querySelector('.from-time').value;
    const toTimeSelect = document.querySelector('.to-time').value;
    const displayTimeContainer = document.querySelector('.displaySelectedTime');
    displayTimeContainer.innerHTML = `<span class="time-selected">From: ${fromTimeSelect} - Until: ${toTimeSelect}</span>`;

    // Generate QR code with selected alerts and contactable time
    const qrCodeContainer = document.querySelector('.QR-code');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code

    // Setting up QR code parameters
    const url = new URL('/assets/pages/mobile.html', window.location.origin);
    url.searchParams.append('alerts', JSON.stringify(selectedAlertLabels));
    url.searchParams.append('contactTime', JSON.stringify({from: fromTimeSelect, to: toTimeSelect }));

    const QRCodeCanvas = document.createElement('canvas');
    QRCodeCanvas.className = 'qr-code-canvas'; // Add class name for styling

    const qr = new QRious({
        element: QRCodeCanvas,
        size: 210,
        value: url.toString()
    });

    qrCodeContainer.appendChild(qr.element); // send QR code to html

    console.log(qr);
});
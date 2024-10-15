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
            const alertDiv = document.createElement('div');
            alertDiv.className = 'retrievedAlert';
            alertDiv.textContent = alert;
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

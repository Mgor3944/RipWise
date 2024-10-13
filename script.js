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
    const selectedItems = document.querySelector('.selected-items');
    const label = checkbox.parentElement.textContent.trim();

    if (checkbox.checked) {
        const selectedAlert = document.createElement('div');
        selectedAlert.className = 'alertSelected';
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
    const selectedItems = document.querySelector('.selected-items');
    if (selectedItems.children.length > 0) {
        selectedItems.style.display = 'flex';
    } else {
        selectedItems.style.display = 'none';
    }
}
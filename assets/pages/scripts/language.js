document.addEventListener('DOMContentLoaded', function () {
    const languageItems = document.querySelectorAll('.language-item');
    const searchInput = document.getElementById('language-search');
    const updateButton = document.getElementById('language-btn');
    const languagePopup = document.getElementById('language-popup');
    const languagePopupOverlay = document.getElementById('language-popup-overlay');
    const noResultsMessage = document.getElementById('no-results-message'); // Added no-results-message element
    let activeLanguage = 'en'; // Default language is set to English
    let previewLanguage = 'en'; // Temporary variable for preview language

    // Object to store translations for different languages
    const translations = {
        fr: {
            'title-box': {
                'ripCurrents': 'Courants d\'arrachement'
            },
            'rip-title': {
                'whatIsARip': 'Qu\'est-ce qu\'un courant d\'arrachement?',
                'escapeARip': 'Échapper à un courant'
            },
            'rip-details': [
                'Un courant d\'arrachement est un courant très fort et étroit qui se dirige vers la mer.',
                'Il a généralement des zones d\'eau plus sombres sans vagues déferlantes.',
                'Les courants d\'arrachement peuvent atteindre des vitesses plus rapides que les nageurs olympiques.'
            ],
            'escape-steps': [
                {
                    'title': 'Étape 1',
                    'description': 'Ne paniquez pas, restez calme!'
                },
                {
                    'title': 'Étape 2',
                    'description': 'Nagez à travers le courant.'
                },
                {
                    'title': 'Étape 3',
                    'description': 'Nagez vers la plage.'
                },
                {
                    'title': 'NE PAS',
                    'description': 'Ne nagez pas contre la direction du courant.'
                }
            ]
        },
        en: {
            'title-box': {
                'ripCurrents': 'Rip Currents'
            },
            'rip-title': {
                'whatIsARip': 'What Is A Rip?',
                'escapeARip': 'Escape A Rip'
            },
            'rip-details': [
                'A rip is a very strong and narrow current that flows out to the sea.',
                'It usually has darker patches of water with no breaking waves.',
                'Rip currents can reach speeds faster than Olympic swimmers.'
            ],
            'escape-steps': [
                {
                    'title': 'Step 1',
                    'description': 'Don\'t panic, stay calm!'
                },
                {
                    'title': 'Step 2',
                    'description': 'Swim across the rip.'
                },
                {
                    'title': 'Step 3',
                    'description': 'Swim back to the sand.'
                },
                {
                    'title': 'DO NOT',
                    'description': 'Do not swim against the direction of the rip current.'
                }
            ]
        }
    };

    // Function to translate the content to the selected language
    function translateContent(language) {
        if (translations[language]) {
            const translation = translations[language];

            // Update the title box
            const titleBox = document.querySelector('.title-box h1');
            if (titleBox) {
                titleBox.textContent = translation['title-box']['ripCurrents'];
            }

            // Update the rip titles
            document.querySelector('.rip-explain .rip-title').textContent = translation['rip-title']['whatIsARip'];
            document.querySelector('.rip-escape .rip-title').textContent = translation['rip-title']['escapeARip'];

            // Update rip details
            const ripDetailItems = document.querySelectorAll('.rip-details .rip-detail-item .rip-explanation');
            ripDetailItems.forEach((item, index) => {
                item.textContent = translation['rip-details'][index];
            });

            // Update escape steps
            const escapeSteps = document.querySelectorAll('.escape-step');
            escapeSteps.forEach((step, index) => {
                const stepTitle = step.querySelector('h3');
                const stepDescription = step.querySelector('p');

                if (index < translation['escape-steps'].length) {
                    stepTitle.textContent = translation['escape-steps'][index]['title'];
                    stepDescription.textContent = translation['escape-steps'][index]['description'];
                }
            });
        }
    }

    // Language Selection Handler
    languageItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove 'selected' class and hide tick from all items
            languageItems.forEach(i => {
                i.classList.remove('selected');
                const tickIcon = i.querySelector('.tick-icon');
                if (tickIcon) tickIcon.style.display = 'none';
            });

            // Add 'selected' class to clicked item
            this.classList.add('selected');

            // Show tick icon for the selected item
            const tickIcon = this.querySelector('.tick-icon');
            if (tickIcon) tickIcon.style.display = 'inline-block';

            // Set the preview language based on user choice
            previewLanguage = this.textContent.trim().toLowerCase() === 'français' ? 'fr' : 'en';
        });
    });

    // Search Filter Functionality
    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        let matchesFound = false;

        languageItems.forEach(item => {
            if (item.textContent.toLowerCase().includes(filter)) {
                item.style.display = 'flex';
                matchesFound = true;
            } else {
                item.style.display = 'none';
            }
        });

        // Show or hide the "no results" message based on matches found
        noResultsMessage.style.display = matchesFound ? 'none' : 'block';
    });

    // Set initial tick icon visibility for default selected item
    function setInitialSelectedLanguage() {
        languageItems.forEach(item => {
            if (item.textContent.trim().toLowerCase() === (previewLanguage === 'fr' ? 'français' : 'english')) {
                item.classList.add('selected');
                const tickIcon = item.querySelector('.tick-icon');
                if (tickIcon) tickIcon.style.display = 'inline-block';
            } else {
                item.classList.remove('selected');
                const tickIcon = item.querySelector('.tick-icon');
                if (tickIcon) tickIcon.style.display = 'none';
            }
        });
    }

    // Event listener for the "Update Content" button
    updateButton.addEventListener('click', function () {
        // Update the active language to the preview language
        activeLanguage = previewLanguage;

        // Translate content to the active language
        translateContent(activeLanguage);

        // Hide the language popup
        languagePopup.style.display = 'none';
        languagePopupOverlay.style.display = 'none';
    });

    // Event listeners to open and close the language popup
    document.querySelector('[data-target="language"]').addEventListener('click', function () {
        // Set the preview language to the current active language when the popup is opened
        previewLanguage = activeLanguage;

        // Set the initial selection when the popup is opened
        setInitialSelectedLanguage();

        languagePopup.style.display = 'block';
        languagePopupOverlay.style.display = 'block';
    });

    document.getElementById('close-icon').addEventListener('click', function () {
        // Hide the language popup without updating the language
        languagePopup.style.display = 'none';
        languagePopupOverlay.style.display = 'none';
    });

    languagePopupOverlay.addEventListener('click', function () {
        // Hide the language popup without updating the language
        languagePopup.style.display = 'none';
        languagePopupOverlay.style.display = 'none';
    });

    // Set the default selection on the first load
    setInitialSelectedLanguage();
    translateContent(activeLanguage);
});
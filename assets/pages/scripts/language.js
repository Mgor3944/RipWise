document.addEventListener('DOMContentLoaded', function () {
    const languageItems = document.querySelectorAll('.language-item');
    const searchInput = document.getElementById('language-search');
    const updateButton = document.getElementById('language-btn');
    let selectedLanguage = 'english'; // Default language is set to English

    // Object to store translations for different languages
    const translations = {
        fr: {
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

            // Set the selected language based on user choice
            selectedLanguage = this.textContent.trim().toLowerCase();
        });
    });

    // Search Filter Functionality
    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        languageItems.forEach(item => {
            if (item.textContent.toLowerCase().includes(filter)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Set initial tick icon visibility for default selected item
    languageItems.forEach(item => {
        if (item.classList.contains('selected')) {
            const tickIcon = item.querySelector('.tick-icon');
            if (tickIcon) tickIcon.style.display = 'inline-block';
        }
    });

    // Event listener for the "Update Site" button
    updateButton.addEventListener('click', function () {
        if (selectedLanguage === 'français') {
            translateContent('fr');
        } else if (selectedLanguage === 'english') {
            translateContent('en');
        }
        // Add more conditions for other languages if needed
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only prevent default if it's a section scroll, not a detail/back button which is handled separately
            if (!this.classList.contains('button-small') && !this.classList.contains('back-button')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when a nav link is clicked (for mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Functionality for "Ver Más" and "Volver" buttons
    const mainSections = {
        '#services-overview': true, // Main section for services
        '#blog': true // Main section for blog
    };

    document.querySelectorAll('.button-small').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor jump

            const targetId = this.getAttribute('href'); // e.g., "#personalized-training"

            // Hide all main sections
            Object.keys(mainSections).forEach(sectionId => {
                const section = document.querySelector(sectionId);
                if (section) {
                    section.classList.add('hidden');
                }
            });

            // Hide all detail sections first, to ensure only one is visible
            document.querySelectorAll('.detail-section').forEach(section => {
                section.classList.add('hidden');
            });

            // Show the target detail section
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                // Scroll to the top of the newly revealed section
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor jump

            const currentDetailSection = this.closest('.detail-section');
            if (currentDetailSection) {
                currentDetailSection.classList.add('hidden'); // Hide current detail section
            }

            const targetHash = this.getAttribute('href'); // e.g., "#services-overview" or "#blog"
            const targetMainSection = document.querySelector(targetHash);
            if (targetMainSection) {
                targetMainSection.classList.remove('hidden'); // Show the main section
                targetMainSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Ensure the correct initial section is visible on page load if hash exists
    const initialHash = window.location.hash;
    if (initialHash && document.querySelector(initialHash) && !mainSections[initialHash]) {
        // If it's a detail section hash on load, show it and hide main
        const targetSection = document.querySelector(initialHash);
        if (targetSection.classList.contains('detail-section')) {
            // Hide all main sections first
            Object.keys(mainSections).forEach(sectionId => {
                const section = document.querySelector(sectionId);
                if (section) {
                    section.classList.add('hidden');
                }
            });
            targetSection.classList.remove('hidden');
            targetSection.scrollIntoView({ behavior: 'auto', block: 'start' }); // Use auto to prevent initial jump
        }
    } else {
        // Ensure main overview and blog are visible by default, others hidden
        // This is a safety net for initial load
        document.getElementById('services-overview').classList.remove('hidden');
        document.getElementById('blog').classList.remove('hidden');
        document.querySelectorAll('.detail-section').forEach(section => {
            section.classList.add('hidden');
        });
    }

});
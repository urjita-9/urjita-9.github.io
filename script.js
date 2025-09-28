document.addEventListener('DOMContentLoaded', function() {
    // Select all sections that have IDs corresponding to navbar links, plus the hero section
    const sections = document.querySelectorAll('#home, #projects, #education, #skills, #certificates, #publications, #contact');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = 'home'; 

        // Determine which section is currently in view
        sections.forEach(section => {
            // Get the position of the section relative to the viewport
            const rect = section.getBoundingClientRect();
            
            // Check if the section's top is visible (or slightly below the top of the viewport)
            // AND the top half of the section is visible. 
            // The value 100 ensures the link is active when the section is near the top.
            if (rect.top <= 100 && rect.bottom >= 100) {
                 current = section.getAttribute('id');
            }
        });

        // Loop through nav links and apply the 'active' class
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section ID
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Set 'home' link (or first visible link) as active on initial load
    updateActiveLink();

    // Attach the function to the scroll event for continuous update
    window.addEventListener('scroll', updateActiveLink);
    
    // Attach the function to clicks on nav links for immediate feedback
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
             // Use a slight delay to allow smooth scroll to finish before checking position
            setTimeout(updateActiveLink, 50); 
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {

    // --- Dynamic Text (Typing Effect) in Hero Section ---
    const dynamicTextElement = document.querySelector('.dynamic-text');
    const phrases = ["a Full Stack Developer", "a Problem Solver", "a Lifelong Learner"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    let deletingSpeed = 100;
    let pauseTime = 1500; // Time to pause at the end of a phrase

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            dynamicTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at the end of the phrase
            isDeleting = true;
            setTimeout(typeEffect, pauseTime);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500); // Pause before typing next phrase
        } else {
            const speed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(typeEffect, speed);
        }
    }
    typeEffect();


    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            if (window.innerWidth <= 992) {
                document.querySelector('.nav-links').classList.remove('active');
                document.querySelector('.menu-toggle i').classList.remove('fa-times');
                document.querySelector('.menu-toggle i').classList.add('fa-bars');
            }
        });
    });


    // --- Navbar Active Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // Adjust for fixed navbar height
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // --- Mobile Navbar Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksList = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinksList.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times'); // Toggle X icon
    });


    // --- Skills Progress Bar Animation on Scroll ---
    const skillBars = document.querySelectorAll('.progress-bar');

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const skillSection = document.getElementById('skills');
            if (skillSection.getBoundingClientRect().top < window.innerHeight / 1.5) {
                const progress = bar.dataset.progress;
                bar.style.width = progress + '%';
            } else {
                 // Reset width if scrolled out of view to re-animate on re-entry
                bar.style.width = '0%';
            }
        });
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Call on load to check if already in view


    // --- Project Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // --- Contact Form Validation (Client-Side) ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        let isValid = true;
        formStatus.textContent = '';
        formStatus.style.color = '';

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Simple validation example
        if (name.value.trim() === '') {
            displayError(name, 'Name is required.');
            isValid = false;
        } else {
            clearError(name);
        }

        if (email.value.trim() === '') {
            displayError(email, 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            displayError(email, 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError(email);
        }

        if (subject.value.trim() === '') {
            displayError(subject, 'Subject is required.');
            isValid = false;
        } else {
            clearError(subject);
        }

        if (message.value.trim() === '') {
            displayError(message, 'Message is required.');
            isValid = false;
        } else {
            clearError(message);
        }

        if (isValid) {
            // In a real application, you would send this data to a server here.
            // For this client-side example, we'll just show a success message.
            formStatus.textContent = 'Message sent successfully!';
            formStatus.style.color = 'green';
            contactForm.reset(); // Clear the form
        } else {
            formStatus.textContent = 'Please correct the errors in the form.';
            formStatus.style.color = 'red';
        }
    });

    function displayError(inputElement, message) {
        const formGroup = inputElement.closest('.form-group');
        const errorMessageDiv = formGroup.querySelector('.error-message');
        errorMessageDiv.textContent = message;
        errorMessageDiv.style.display = 'block';
        inputElement.classList.add('is-invalid'); // Add a class for styling invalid input
    }

    function clearError(inputElement) {
        const formGroup = inputElement.closest('.form-group');
        const errorMessageDiv = formGroup.querySelector('.error-message');
        errorMessageDiv.textContent = '';
        errorMessageDiv.style.display = 'none';
        inputElement.classList.remove('is-invalid');
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }


    // --- Scroll to Top Button ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

});

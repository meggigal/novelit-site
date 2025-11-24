document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Carousel Logic (Infinite Loop Sliding)
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    if (track && slides.length > 0) {
        const slideWidth = 100; // 100%

        // Clone first and last slides for infinite loop
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);

        // Add clones to DOM
        track.appendChild(firstClone);
        track.insertBefore(lastClone, slides[0]);

        // Update slides list to include clones
        const allSlides = document.querySelectorAll('.carousel-slide');

        // Initial state: show first real slide (index 1)
        let currentIndex = 1;
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

        let isTransitioning = false;

        const updateSlidePosition = (index, animate = true) => {
            if (animate) {
                track.style.transition = 'transform 0.5s ease-in-out';
            } else {
                track.style.transition = 'none';
            }
            track.style.transform = `translateX(-${index * slideWidth}%)`;
        };

        const moveToNextSlide = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex++;
            updateSlidePosition(currentIndex);
        };

        const moveToPrevSlide = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex--;
            updateSlidePosition(currentIndex);
        };

        // Handle Transition End for Infinite Loop
        track.addEventListener('transitionend', () => {
            isTransitioning = false;

            // If at last clone (after real last slide), jump to real first slide
            if (currentIndex === allSlides.length - 1) {
                currentIndex = 1;
                updateSlidePosition(currentIndex, false);
            }

            // If at first clone (before real first slide), jump to real last slide
            if (currentIndex === 0) {
                currentIndex = allSlides.length - 2;
                updateSlidePosition(currentIndex, false);
            }
        });

        // Event Listeners
        if (nextBtn) nextBtn.addEventListener('click', moveToNextSlide);
        if (prevBtn) prevBtn.addEventListener('click', moveToPrevSlide);

        // Optional: Auto-play
        // setInterval(moveToNextSlide, 5000);
    }
});

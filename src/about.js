// Add infinite scroll to your site's module system
export const infiniteScrollModule = {
  init: function () {
    // Check if we're on the about page by looking for about_content
    const aboutContent = document.querySelector('.about_content');
    if (!aboutContent) return;

    // Only initialize on desktop
    if (window.innerWidth >= 992) {
      this.setupInfiniteScroll();
    }

    // Handle resize
    window.addEventListener('resize', () => {
      // Remove existing scroll
      this.cleanupScroll();

      // Reinitialize if on desktop
      if (window.innerWidth >= 992) {
        this.setupInfiniteScroll();
      }
    });
  },

  setupInfiniteScroll: function () {
    const aboutContent = document.querySelector('.about_content');
    const contentElements = document.querySelectorAll('.about_content-inner, .row.cc-about-info');
    if (!aboutContent || contentElements.length === 0) return;

    // Create container
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'infinite-scroll-container';
    aboutContent.appendChild(scrollContainer);

    // Clone content three times
    const topContent = Array.from(contentElements).map((el) => el.cloneNode(true));
    const middleContent = Array.from(contentElements).map((el) => el.cloneNode(true));
    const bottomContent = Array.from(contentElements).map((el) => el.cloneNode(true));

    // Add all clones to container
    [...topContent, ...middleContent, ...bottomContent].forEach((el) => {
      scrollContainer.appendChild(el);
    });

    // Hide original content
    contentElements.forEach((el) => {
      el.style.display = 'none';
    });

    // Style container
    aboutContent.style.overflow = 'hidden';
    aboutContent.style.position = 'relative';
    aboutContent.style.height = '100%';

    scrollContainer.style.position = 'absolute';
    scrollContainer.style.top = '0';
    scrollContainer.style.left = '0';
    scrollContainer.style.width = '100%';

    // Calculate height of one section
    let sectionHeight = 0;
    middleContent.forEach((el) => {
      sectionHeight += el.offsetHeight;
    });

    // Set initial position
    scrollContainer.style.transform = `translateY(-${sectionHeight}px)`;

    // Track current position
    let currentPosition = -sectionHeight;

    // Setup wheel event
    const wheelHandler = (e) => {
      e.preventDefault();

      // Update position
      currentPosition -= e.deltaY;

      // Handle wrapping
      if (currentPosition < -sectionHeight * 2) {
        currentPosition += sectionHeight;
      } else if (currentPosition > 0) {
        currentPosition -= sectionHeight;
      }

      // Apply new position
      scrollContainer.style.transform = `translateY(${currentPosition}px)`;
    };

    // Setup touch events
    let touchStartY = 0;

    const touchStartHandler = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const touchMoveHandler = (e) => {
      const currentY = e.touches[0].clientY;
      const delta = touchStartY - currentY;
      touchStartY = currentY;

      // Update position
      currentPosition -= delta;

      // Handle wrapping
      if (currentPosition < -sectionHeight * 2) {
        currentPosition += sectionHeight;
      } else if (currentPosition > 0) {
        currentPosition -= sectionHeight;
      }

      // Apply position
      scrollContainer.style.transform = `translateY(${currentPosition}px)`;

      e.preventDefault();
    };

    // Add event listeners
    aboutContent.addEventListener('wheel', wheelHandler);
    aboutContent.addEventListener('touchstart', touchStartHandler);
    aboutContent.addEventListener('touchmove', touchMoveHandler);

    // Store references for cleanup
    this.eventHandlers = {
      wheel: wheelHandler,
      touchStart: touchStartHandler,
      touchMove: touchMoveHandler,
    };
  },

  cleanupScroll: function () {
    const aboutContent = document.querySelector('.about_content');
    const scrollContainer = document.querySelector('.infinite-scroll-container');

    // Remove container if it exists
    if (scrollContainer) {
      scrollContainer.remove();
    }

    // Show original content
    document.querySelectorAll('.about_content-inner, .row.cc-about-info').forEach((el) => {
      el.style.display = '';
    });

    // Remove event listeners
    if (aboutContent && this.eventHandlers) {
      aboutContent.removeEventListener('wheel', this.eventHandlers.wheel);
      aboutContent.removeEventListener('touchstart', this.eventHandlers.touchStart);
      aboutContent.removeEventListener('touchmove', this.eventHandlers.touchMove);
    }

    // Reset styles
    if (aboutContent) {
      aboutContent.style.overflow = '';
      aboutContent.style.position = '';
      aboutContent.style.height = '';
    }
  },
};

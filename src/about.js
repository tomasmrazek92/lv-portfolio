export const infiniteScrollModule = {
  init: function () {
    const aboutContent = document.querySelector('.about_content');
    if (!aboutContent) return;

    if (window.innerWidth >= 992) {
      this.setupInfiniteScroll();
    }

    window.addEventListener('resize', () => {
      this.cleanupScroll();

      if (window.innerWidth >= 992) {
        this.setupInfiniteScroll();
      }
    });
  },

  setupInfiniteScroll: function () {
    const aboutContent = document.querySelector('.about_content');
    const contentElements = document.querySelectorAll('.about_content-inner, .row.cc-about-info');
    if (!aboutContent || contentElements.length === 0) return;

    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'infinite-scroll-container';
    aboutContent.appendChild(scrollContainer);

    const topContent = Array.from(contentElements).map((el) => el.cloneNode(true));
    const middleContent = Array.from(contentElements).map((el) => el.cloneNode(true));
    const bottomContent = Array.from(contentElements).map((el) => el.cloneNode(true));

    [...topContent, ...middleContent, ...bottomContent].forEach((el) => {
      scrollContainer.appendChild(el);
    });

    contentElements.forEach((el) => {
      el.style.display = 'none';
    });

    aboutContent.style.position = 'relative';
    aboutContent.style.height = '100%';

    scrollContainer.style.position = 'absolute';
    scrollContainer.style.top = '0';
    scrollContainer.style.left = '0';
    scrollContainer.style.width = '100%';

    requestAnimationFrame(() => {
      let sectionHeight = 0;
      topContent.forEach((el) => {
        sectionHeight += el.getBoundingClientRect().height;
      });

      let offsetToSecondInner = 0;
      let aboutInnerCount = 0;
      const allElements = scrollContainer.children;

      for (let i = 0; i < allElements.length; i++) {
        if (allElements[i].classList.contains('about_content-inner')) {
          aboutInnerCount++;
          if (aboutInnerCount === 2) {
            break;
          }
        }
        offsetToSecondInner += allElements[i].getBoundingClientRect().height;
      }

      scrollContainer.style.transform = `translateY(-${0}px)`;
      let currentPosition = -offsetToSecondInner;

      const wheelHandler = (e) => {
        e.preventDefault();

        currentPosition -= e.deltaY;

        if (currentPosition < -offsetToSecondInner - sectionHeight) {
          currentPosition += sectionHeight;
        } else if (currentPosition > -offsetToSecondInner + sectionHeight) {
          currentPosition -= sectionHeight;
        }

        scrollContainer.style.transform = `translateY(${currentPosition}px)`;
      };

      let touchStartY = 0;

      const touchStartHandler = (e) => {
        touchStartY = e.touches[0].clientY;
      };

      const touchMoveHandler = (e) => {
        const currentY = e.touches[0].clientY;
        const delta = touchStartY - currentY;
        touchStartY = currentY;

        currentPosition -= delta;

        if (currentPosition < -offsetToSecondInner - sectionHeight) {
          currentPosition += sectionHeight;
        } else if (currentPosition > -offsetToSecondInner + sectionHeight) {
          currentPosition -= sectionHeight;
        }

        scrollContainer.style.transform = `translateY(${currentPosition}px)`;

        e.preventDefault();
      };

      aboutContent.addEventListener('wheel', wheelHandler);
      aboutContent.addEventListener('touchstart', touchStartHandler);
      aboutContent.addEventListener('touchmove', touchMoveHandler);

      this.eventHandlers = {
        wheel: wheelHandler,
        touchStart: touchStartHandler,
        touchMove: touchMoveHandler,
      };
    });
  },

  cleanupScroll: function () {
    const aboutContent = document.querySelector('.about_content');
    const scrollContainer = document.querySelector('.infinite-scroll-container');

    if (scrollContainer) {
      scrollContainer.remove();
    }

    document.querySelectorAll('.about_content-inner, .row.cc-about-info').forEach((el) => {
      el.style.display = '';
    });

    if (aboutContent && this.eventHandlers) {
      aboutContent.removeEventListener('wheel', this.eventHandlers.wheel);
      aboutContent.removeEventListener('touchstart', this.eventHandlers.touchStart);
      aboutContent.removeEventListener('touchmove', this.eventHandlers.touchMove);
    }

    if (aboutContent) {
      aboutContent.style.overflow = '';
      aboutContent.style.position = '';
      aboutContent.style.height = '';
    }
  },
};

import { infiniteScrollModule } from './about';
gsap.registerPlugin(SplitText, ScrollTrigger);

// Functions
function initSliders() {
  const hpSlider = new Swiper('.hp-work_slider-slider', {
    // Optional parameters
    spaceBetween: 1,
    loop: true,
    speed: 2000,
    mousewheel: {
      enabled: true,
      forceToAxis: true,
    },
    on: {
      slideChange: (swiper) => {
        updateHpSlider(swiper);
      },
      init: (swiper) => {
        updateHpSlider(swiper);
      },
    },
  });
}

function updateHpSlider(swiper) {
  let index = swiper.realIndex;
  let activeSlider = $(swiper.slides[index]);

  let title = activeSlider.attr('data-title');
  let location = activeSlider.attr('data-location');
  let tags = activeSlider.attr('data-tags');

  $('[data-tags-el]').text(tags);
  $('[data-location-el]').text(location);
  $('[data-title-el]').text(title);
}

function initLenis() {
  let lenis;
  if (Webflow.env('editor') === undefined) {
    lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.7,
      gestureOrientation: 'vertical',
      normalizeWheel: false,
      smoothTouch: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.lenisInstance = lenis;
  }
  $('[data-lenis-start]').on('click', function () {
    lenis.start();
  });
  $('[data-lenis-stop]').on('click', function () {
    lenis.stop();
  });
  $('[data-lenis-toggle]').on('click', function () {
    $(this).toggleClass('stop-scroll');
    if ($(this).hasClass('stop-scroll')) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  // Watch for height changes in the body element
  const { body } = document;

  const observer = new ResizeObserver(() => {
    lenis.resize();
  });

  // Start observing the body
  observer.observe(body);

  // Lenis animation loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function initPageGap() {
  // Set initial CSS variable
  document.documentElement.style.setProperty('--gap-size', '0');

  // Create frame elements if they don't exist
  if (!document.querySelector('.site-frame')) {
    // Create the four frame elements
    const positions = ['top', 'right', 'bottom', 'left'];
    const frameContainer = document.createElement('div');
    frameContainer.className = 'site-frame-container';

    // Create all four frames with a loop
    positions.forEach((position) => {
      const frame = document.createElement('div');
      frame.className = `site-frame site-frame-${position}`;
      frameContainer.appendChild(frame);
    });

    // Add container to body
    document.body.appendChild(frameContainer);

    // Add CSS for our frames
    const style = document.createElement('style');
    style.innerHTML = `
      .site-frame-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
      }
      
      .site-frame {
        position: absolute;
        background-color: var(--body-2);
        transition: transform 0.3s ease;
      }
      
      .site-frame-top, .site-frame-bottom {
        left: 0;
        width: 100%;
        height: 5px;
        transform: scaleY(var(--gap-size));
      }
      
      .site-frame-top {
        top: 0;
        transform-origin: top center;
      }
      
      .site-frame-bottom {
        bottom: 0;
        transform-origin: bottom center;
      }
      
      .site-frame-left, .site-frame-right {
        top: 0;
        height: 100%;
        width: 5px;
        transform: scaleX(var(--gap-size));
      }
      
      .site-frame-left {
        left: 0;
        transform-origin: left center;
      }
      
      .site-frame-right {
        right: 0;
        transform-origin: right center;
      }
    `;
    document.head.appendChild(style);
  }

  // Get Lenis instance if it exists
  const lenis = window.lenis || null;

  // Function to handle scroll updates
  function updateGap(scrollTop) {
    if (scrollTop > 100) {
      gsap.to(document.documentElement, {
        duration: 0,
        '--gap-size': 1,
        ease: 'power2.out',
      });
    } else {
      gsap.to(document.documentElement, {
        duration: 0,
        '--gap-size': 0,
        ease: 'power2.out',
      });
    }
  }

  // If using Lenis scroll
  if (lenis) {
    lenis.on('scroll', ({ scroll }) => {
      updateGap(scroll);
    });
  } else {
    // Fallback to regular scroll event
    $(window).scroll(function () {
      updateGap($(this).scrollTop());
    });
  }
}

function pauseScroll(state) {
  // Pause Lenis scrolling during transition
  if (window.lenisInstance) {
    if (state === true) {
      window.lenisInstance.stop();
    } else {
      window.lenisInstance.start();
    }
  }
}

// -- Anims
function animateHomepageHero() {
  $('.nav_meta-col').each(function () {
    let links = $(this).find('a');
    let pars = $(this).find('p');

    initMaskTextReveal(links);
    initMaskTextReveal(pars);
    gsap.fromTo($('.nav_mode'), { scale: 0 }, { scale: 1 });
  });

  $('.hp-hero_content-block').each(function () {
    let tl = gsap.timeline();
    initMaskTextReveal($(this).find('p').eq(0));
    tl.fromTo(
      $(this).find('li'),
      { opacity: 0, xPercent: -5 },
      { opacity: 1, xPercent: 0, stagger: 0.2 }
    );
  });

  $('.hp-hero_content-visual').each(function () {
    // Set initial state - fully clipped (hidden)
    gsap.set($(this), {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    });

    // Create the reveal animation
    gsap.to($(this), {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.5,
      ease: 'power3.inOut',
    });
  });
}

function animateWorkLoad() {
  var tl = gsap.timeline({});

  let visualList = '.work-d_hero-wrap.cc-images .work-d_hero-list';
  let visualItem = '.work-d_hero-wrap.cc-images .work-d_hero-list-item';
  let visualImg = '.work-d_hero-wrap.cc-images img';
  let timeline = '.work-d_hero-timeline';

  tl.set(
    [timeline],
    {
      y: '0vh',
      rotate: 0.001,
    },
    '<'
  );

  tl.set(
    timeline,
    {
      opacity: 0,
    },
    '<'
  );

  tl.set(
    visualItem,
    {
      scale: 0.5,
      rotate: 0.001,
    },
    '<'
  );

  tl.set(
    visualImg,
    {
      rotate: 0.001,
      scale: 1.4,
    },
    '<'
  );

  tl.to(
    visualList,
    {
      duration: 2.2,
      ease: 'Power4.easeOut',
      rotate: 0.001,
      y: 0,
      clearProps: 'all',
      delay: 0,
      onComplete: () => {
        initMaskTextReveal($('[data-split="work-heading"]'));
      },
    },
    '<'
  );

  tl.to(
    visualItem,
    {
      duration: 2,
      ease: 'Expo.easeInOut',
      rotate: 0.001,
      scale: 1,
      y: '0px',
      clearProps: 'all',
    },
    '< 1.2'
  );

  tl.to(
    visualImg,
    {
      duration: 2.1,
      ease: 'Expo.easeInOut',
      rotate: 0.001,
      scale: 1,
      clearProps: 'all',
    },
    '<'
  );
  tl.to(
    timeline,
    {
      duration: 2.1,
      ease: 'Expo.easeInOut',
      rotate: 0.001,
      y: 0,
      opacity: 1,
      clearProps: 'all',
    },
    '<'
  );
}

function animateWorkTimeline() {
  let wrap = $('.work-d_hero-part.cc-images');

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrap,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      markers: true,
    },
  });

  tl.to('.work-d_hero-timeline-inner', {
    y: () => {
      let containerHeight = $('.work-d_hero-timeline').height();
      let itemHeight = $('.work-d_hero-timeline_item').first().outerHeight(true);
      return -(containerHeight - itemHeight) + 'px';
    },
  });

  $('.work-d_hero-timeline_item').on('click', function () {
    // Get the index of the clicked timeline item
    let index = $(this).index();

    // Find the corresponding list item with the same index
    let targetElement = $('.work-d_hero-list-item').eq(index);

    // Get the target element's position
    let targetPosition =
      targetElement.offset().top -
      1.6 * parseFloat(getComputedStyle(document.documentElement).fontSize);

    // Scroll to the target position using Lenis
    lenisInstance.scrollTo(targetPosition, {
      duration: 1.2, // Animation duration in seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out expo (optional)
    });
  });
}

function animateWorkIcon() {
  let icon = $('.work-d_content-part_icon');

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: icon,
    },
  });
  tl.from(icon, {
    scale: 0,
  });
  tl.from(
    icon.find('svg'),
    {
      scale: 0,
      delay: 0.2,
    },
    '<'
  );
}

function initMaskTextReveal(el) {
  const splitConfig = {
    lines: { duration: 0.8, stagger: 0.08 },
    words: { duration: 0.6, stagger: 0.06 },
    chars: { duration: 0.4, stagger: 0.01 },
  };

  $(el).each(function () {
    const heading = $(this);

    // Add a small delay to ensure the element is rendered
    setTimeout(function () {
      const type = heading.data('split-reveal') || 'lines';
      const typesToSplit =
        type === 'lines'
          ? ['lines']
          : type === 'words'
          ? ['lines', 'words']
          : ['lines', 'words', 'chars'];

      // Force reflow before creating split text
      heading[0].offsetHeight;

      try {
        const splitText = new SplitText(heading[0], {
          type: typesToSplit.join(', '),
          mask: 'lines',
          linesClass: 'line',
          wordsClass: 'word',
          charsClass: 'letter',
        });

        // Ensure targets exist
        const targets = splitText[type];
        if (!targets || targets.length === 0) {
          console.warn('No split targets found for', heading);
          return;
        }

        // Set initial state for animation
        gsap.set(targets, { yPercent: 110 });

        // Force reflow again
        heading[0].offsetHeight;

        const config = splitConfig[type];
        const triggerType = heading.data('trigger-type') || 'load';

        // Make sure the element is visible for the split text
        gsap.set(heading, { visibility: 'visible', opacity: 1 });

        if (triggerType === 'scroll') {
          gsap.to(targets, {
            yPercent: 0,
            duration: config.duration,
            stagger: config.stagger,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: heading[0],
              start: 'clamp(top 80%)',
              once: true,
              markers: heading.data('debug-markers') === 'true',
            },
          });
        } else {
          // For load animations
          gsap.to(targets, {
            yPercent: 0,
            duration: config.duration,
            stagger: config.stagger,
            ease: 'expo.out',
            delay: 0.2, // Slightly longer delay to ensure everything is ready
          });
        }
      } catch (error) {
        console.error('Error in SplitText:', error);
      }
    }, 50); // Small timeout to ensure the DOM is ready
  });
}

// Global
function initSiteFunctionality() {
  initSliders();
  initPageGap();
  initLenis();
  document.fonts.ready.then(function () {
    initMaskTextReveal('[data-split="heading"]');
  });
}

function initHomepage() {
  animateHomepageHero();
}

function initWork() {
  animateWorkTimeline();
  animateWorkLoad();
  animateWorkIcon();
}

function initAbout() {
  infiniteScrollModule.init();
}

// Modular Barba.js implementation with work item transition

$(document).ready(function () {
  // Set up initial page load without Barba
  const namespace = $('[data-barba="container"]').data('barba-namespace');
  runInitFunctions(namespace);

  // Initialize Barba transitions
  initBarba();
});

function runInitFunctions(namespace) {
  console.log('Running init functions for namespace:', namespace);

  // Always run global functionality
  initSiteFunctionality();

  // Run page-specific code
  if (namespace === 'home') {
    initHomepage();
  } else if (namespace === 'work') {
    initWork();
  } else if (namespace === 'about') {
    initAbout();
  }
}

function initBarba() {
  // Add transition styles
  addTransitionStyles();

  // Variables for work item transition
  let clonedElement = null;
  let clickedItemData = null;

  // Initialize Barba with transitions
  barba.init({
    wrapper: '#barba-wrapper',
    container: '.barba-container',
    timeout: 7000,
    prefetchIgnore: true,

    // Define transitions
    transitions: [createWorkItemTransition(), createDefaultTransition()],
  });

  function addTransitionStyles() {
    const transitionStyles = document.createElement('style');
    transitionStyles.innerHTML = `
      .barba-container {
        position: relative;
      }
      
      html.is-animating .barba-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .work-item-clone {
        position: fixed;
        z-index: 9999;
        pointer-events: none;
        transition: none;
        will-change: transform, width, height, top, left;
        transform-origin: center center;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(transitionStyles);
  }

  function createWorkItemTransition() {
    return {
      name: 'home-to-work',
      from: { namespace: 'home' },
      to: { namespace: 'work' },

      // Only apply to work slider items
      custom: ({ trigger }) => {
        return $(trigger).closest('.work_slider-item').length > 0;
      },

      // Before transition
      before(data) {
        document.documentElement.classList.add('is-animating');
      },

      // Before leaving page
      beforeLeave(data) {
        pauseScroll(true);
        cloneWorkItem(data.trigger);
      },

      // When leaving page
      leave(data) {
        return createLeaveAnimation(data.current.container);
      },

      // Before entering new page
      beforeEnter(data) {
        window.scrollTo(0, 0);
        gsap.set(data.next.container, {
          opacity: 0,
          visibility: 'visible',
        });
      },

      // After transition
      after(data) {
        animateCloneToTarget(data.next.container);
        const namespace = data.next.container.dataset.barbaNamespace;
        runInitFunctions(namespace);
        pauseScroll(false);
        document.documentElement.classList.remove('is-animating');
      },
    };
  }

  function createDefaultTransition() {
    return {
      name: 'default-transition',

      before(data) {
        document.documentElement.classList.add('is-animating');
      },

      beforeLeave(data) {
        pauseScroll(true);
      },

      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5,
        });
      },

      beforeEnter(data) {
        window.scrollTo(0, 0);
      },

      enter(data) {
        return gsap.to(data.next.container, {
          opacity: 1,
          duration: 0.5,
        });
      },

      after(data) {
        const namespace = data.next.container.dataset.barbaNamespace;
        runInitFunctions(namespace);
        pauseScroll(false);
        document.documentElement.classList.remove('is-animating');
      },
    };
  }

  function cloneWorkItem(trigger) {
    const clickedItem = $(trigger).closest('.work_slider-item');

    if (clickedItem.length) {
      // Store position and size data
      const rect = clickedItem[0].getBoundingClientRect();
      const styles = window.getComputedStyle(clickedItem[0]);

      // Store data for later use
      clickedItemData = {
        rect,
        backgroundColor: styles.backgroundColor,
        borderRadius: styles.borderRadius || '0px',
      };

      // Create clone element
      clonedElement = document.createElement('div');
      clonedElement.className = 'work-item-clone';

      // Find the image element in the clicked item
      const imgElement = clickedItem.find('img');
      const imgSrc = imgElement.attr('src') || '';

      // Style the cloned element
      $(clonedElement).css({
        position: 'fixed',
        top: rect.top + 'px',
        left: rect.left + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        backgroundColor: clickedItemData.backgroundColor,
        borderRadius: clickedItemData.borderRadius,
        zIndex: 9999,
      });

      // Create and append image container div inside the clone
      if (imgSrc) {
        const imgContainer = $('<div class="clone-img-container"></div>');
        const imgClone = $('<img>').attr('src', imgSrc);

        imgContainer.css({
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        });

        imgClone.css({
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        });

        imgContainer.append(imgClone);
        $(clonedElement).append(imgContainer);
      }

      // Add to body
      document.body.appendChild(clonedElement);
    }
  }

  function createLeaveAnimation(container) {
    const tl = gsap.timeline();

    // Fade out container
    tl.to(container, {
      opacity: 0,
      duration: 0.5,
    });

    // If we have a cloned element, animate it to center
    if (clonedElement && clickedItemData) {
      // Calculate center position
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const targetWidth = Math.min(windowWidth * 0.8, 800);
      const targetHeight = targetWidth * (clickedItemData.rect.height / clickedItemData.rect.width);
      const targetLeft = (windowWidth - targetWidth) / 2;
      const targetTop = (windowHeight - targetHeight) / 2;

      // Animate to center
      tl.to(
        clonedElement,
        {
          top: targetTop,
          left: targetLeft,
          width: targetWidth,
          height: targetHeight,
          duration: 0.8,
          ease: 'power2.inOut',
          delay: 0.1,
        },
        '-=0.3'
      );
    }

    return tl;
  }

  function animateCloneToTarget(container) {
    return new Promise((resolve) => {
      const targetElement = $(container).find('.work-d_hero-list-item').first()[0];

      if (clonedElement && targetElement) {
        setTimeout(() => {
          const state = Flip.getState(clonedElement);

          const targetRect = targetElement.getBoundingClientRect();
          $(clonedElement).css({
            top: targetRect.top + 'px',
            left: targetRect.left + 'px',
            width: targetRect.width + 'px',
            height: targetRect.height + 'px',
          });

          const imgElement = $(clonedElement).find('img');
          console.log(imgElement);

          const tl = gsap.timeline({
            onComplete: () => {
              gsap.to(container, {
                opacity: 1,
                duration: 0.5,
                onComplete: () => {
                  if (clonedElement) {
                    clonedElement.remove();
                    clonedElement = null;
                  }
                  resolve();
                },
              });
            },
          });

          tl.add(
            Flip.from(state, {
              duration: 0.8,
              ease: 'power2.inOut',
            })
          );

          tl.add(
            gsap.to(imgElement, {
              scale: 1.4,
              duration: 0.8,
              ease: 'power2.inOut',
            }),
            0
          ); // Start at the same time as the FLIP animation
        }, 100);
      } else {
        gsap.to(container, {
          opacity: 1,
          duration: 0.5,
          onComplete: resolve,
        });

        if (clonedElement) {
          clonedElement.remove();
          clonedElement = null;
        }
      }
    });
  }
}

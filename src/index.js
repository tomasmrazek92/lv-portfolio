import { infiniteScrollModule } from './about';
import SwiperGL from './swiper-dist/swiper-gl.esm.js';

gsap.registerPlugin(SplitText, ScrollTrigger);

// Functions
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
      lenisInstance.scrollTo(0);
    } else {
      window.lenisInstance.start();
      lenisInstance.scrollTo(0);
    }
  }
}

function initTimeCheck() {
  function updateCETTime() {
    const now = new Date();

    // Convert to CET timezone (UTC+1 or UTC+2 during daylight savings)
    const cetOptions = {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    const cetTimeString = now.toLocaleTimeString('en-GB', cetOptions);

    // Update the time display
    $('[data-time-cet]').text(`CET ${cetTimeString}`);
  }

  // Update time immediately
  updateCETTime();

  // Update every second
  setInterval(updateCETTime, 1000);
}

function initCSSMarquee() {
  const pixelsPerSecond = 75; // Set the marquee speed (pixels per second)
  const marquees = document.querySelectorAll('[data-css-marquee]');
  let activeMarquees = [];
  let resizeTimer;

  function setupMarquee(marquee) {
    // Check if already initialized
    if (marquee.getAttribute('data-initialized') === 'true') {
      return;
    }

    // Duplicate each [data-css-marquee-list] element inside its container
    const lists = marquee.querySelectorAll('[data-css-marquee-list]');
    lists.forEach((list) => {
      const duplicate = list.cloneNode(true);
      marquee.appendChild(duplicate);
    });

    // Calculate the width and set the animation duration accordingly
    marquee.querySelectorAll('[data-css-marquee-list]').forEach((list) => {
      list.style.animationDuration = list.offsetWidth / pixelsPerSecond + 's';
      list.style.animationPlayState = 'paused';
    });

    // Mark as initialized
    marquee.setAttribute('data-initialized', 'true');
    activeMarquees.push(marquee);
  }

  function destroyMarquee(marquee) {
    // Remove any duplicated lists
    const lists = marquee.querySelectorAll('[data-css-marquee-list]');
    for (let i = lists.length - 1; i >= lists.length / 2; i--) {
      lists[i].remove();
    }

    // Reset animation styles
    marquee.querySelectorAll('[data-css-marquee-list]').forEach((list) => {
      list.style.animationDuration = '';
      list.style.animationPlayState = '';
    });

    // Mark as not initialized
    marquee.setAttribute('data-initialized', 'false');

    // Remove from active marquees
    const index = activeMarquees.indexOf(marquee);
    if (index > -1) {
      activeMarquees.splice(index, 1);
    }
  }

  function checkBreakpoint(marquee) {
    const breakpoint = parseInt(marquee.getAttribute('data-breakpoint') || '0');
    const currentWidth = window.innerWidth;

    if (currentWidth <= breakpoint) {
      setupMarquee(marquee);
    } else {
      if (marquee.getAttribute('data-initialized') === 'true') {
        destroyMarquee(marquee);
      }
    }
  }

  // Create an IntersectionObserver to check if the marquee container is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target.getAttribute('data-initialized') === 'true') {
          entry.target
            .querySelectorAll('[data-css-marquee-list]')
            .forEach(
              (list) =>
                (list.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused')
            );
        }
      });
    },
    { threshold: 0 }
  );

  // Initialize based on breakpoints
  function initAll() {
    marquees.forEach((marquee) => {
      checkBreakpoint(marquee);
      observer.observe(marquee);
    });
  }

  // Handle window resize
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      marquees.forEach((marquee) => {
        checkBreakpoint(marquee);
      });
    }, 250); // Debounce resize events
  }

  // Set up resize listener
  window.addEventListener('resize', handleResize);

  // Initial setup
  initAll();
}

function handleAnchorScroll() {
  const urlParams = new URLSearchParams(window.location.search);
  const anchorId = urlParams.get('anchor');

  if (anchorId) {
    const targetElement = document.getElementById(anchorId);

    if (targetElement && window.lenisInstance) {
      setTimeout(() => {
        window.lenisInstance.scrollTo(targetElement, {
          duration: 1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }, 100);
    }
  }
}

// -- Nav
function initNav() {
  let hamOpen = $('[data-nav-toggle="open"]');
  let hamClose = $('[data-nav-toggle="close"]');

  let navbar = $('.nav_menu');
  let logo = $('[data-menu-brand]');
  let items = $('.nav_menu-item');
  let subLinks = $('.nav_menu-sublinks li');
  let navMeta = $('.nav_menu-meta');

  // Init;
  gsap.set(navbar, { display: 'none' });
  gsap.set([navbar, items, subLinks, navMeta], { opacity: 0 });
  gsap.set(logo, { text: '' });

  const menuAnimations = {
    open: () => {
      let tl = gsap.timeline();

      animateScambleText(logo, logo.attr('data-menu-text'));

      tl.set(navbar, { display: 'flex' });
      tl.set(hamClose, { yPercent: 100 });
      tl.to(hamOpen.find('svg'), { scale: 0, ease: 'power4.out' });
      tl.to(hamOpen, { scale: 0, ease: 'power4.out' }, '<0.1');
      tl.to(navbar, { opacity: 1 }, '<');
      tl.to(hamClose, { yPercent: 0 });
      tl.to(items, { opacity: 1, stagger: 0.1 }, '<');
      tl.fromTo(
        items.find('.nav_menu-item_list'),
        { scale: 0 },
        { scale: 1, stagger: 0.1 },
        '<0.3'
      );
      tl.fromTo(
        items.find('p'),
        { yPercent: 300 },
        { yPercent: 0, stagger: 0.1, duration: 0.6 },
        '<'
      );
      tl.fromTo(
        items.find('.w-embed'),
        { xPercent: 300 },
        { xPercent: 0, stagger: 0.1, duration: 0.6 },
        '<'
      );
      tl.to([subLinks, navMeta], { opacity: 1, stagger: 0.2 }, '<');

      return tl;
    },

    close: () => {
      let tl = gsap.timeline();

      tl.to([subLinks, navMeta], { opacity: 0, duration: 0.3 });
      tl.to(hamClose, { yPercent: 100 }, '<');
      tl.to(items.find('p'), { yPercent: 300, stagger: 0.05, duration: 1 }, '<0.2');
      tl.to(items.find('.nav_menu-item_list'), { scale: 0, stagger: 0.1 }, '<');
      tl.to(items, { opacity: 0, stagger: 0.1 }, '<');
      tl.to(navbar, { opacity: 0 }, '<0.4');
      tl.to(hamOpen.find('svg'), { scale: 1, ease: 'power4.out' }, '<');
      tl.to(hamOpen, { scale: 1, ease: 'power4.out' }, '<');
      tl.set(navbar, { display: 'none' });

      animateScambleText(logo, '');

      return tl;
    },
  };

  function openMenu() {
    menuAnimations.open();
  }

  function closeMenu() {
    menuAnimations.close();
  }

  hamOpen.on('click', openMenu);
  hamClose.on('click', closeMenu);
}
function animateNav() {
  $('.nav_meta-col').each(function () {
    let links = $(this).find('a');
    let pars = $(this).find('p');

    initMaskTextReveal(links);
    initMaskTextReveal(pars);
    gsap.fromTo($('.nav_mode'), { scale: 0 }, { scale: 1 });
  });
}

function initBackHome() {
  let backHome = $('[data-back-to-home]');
  let label = backHome.find('[data-back-label]');
  let originalText = label.text();

  backHome.hover(
    function () {
      animateScambleText(label, 'Home, sweet home');
    },
    function () {
      animateScambleText(label, originalText);
    }
  );
}

// -- Homepage
function animateHomepageHero() {
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

function animateWorksLinks(list, listitem) {
  console.log($(list).find(listitem));
  $(list)
    .find(listitem)
    .hover(function () {
      const index = $(this).parent().index();
      const totalImages = $('.links-imgs_box-item').length;
      const movePercentage = -(index * (100 / totalImages));

      gsap.to('.links-imgs_box-list', {
        yPercent: movePercentage,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    });

  $(list).hover(
    function () {
      gsap.to('.links-imgs_box-wrap', {
        scale: 1,
        duration: 0.2,
        ease: 'power4.in',
      });
    },
    function () {
      gsap.to('.links-imgs_box-wrap', {
        scale: 0,
        duration: 0.2,
        ease: 'power4.out',
      });
    }
  );
}

function initDynamicCustomTextCursor() {
  let cursorItem = document.querySelector('.cursor');
  let cursorParagraph = cursorItem.querySelector('p');
  let targets = document.querySelectorAll('[data-cursor]');
  let xOffset = 6;
  let yOffset = 140;
  let cursorIsOnRight = false;
  let currentTarget = null;
  let lastText = '';

  // Position cursor relative to actual cursor position on page load
  gsap.set(cursorItem, { xPercent: xOffset, yPercent: yOffset, scale: 0.8 });

  // Use GSAP quick.to for a more performative tween on the cursor
  let xTo = gsap.quickTo(cursorItem, 'x', { ease: 'power3' });
  let yTo = gsap.quickTo(cursorItem, 'y', { ease: 'power3' });

  // Function to get the width of the cursor element including a buffer
  const getCursorEdgeThreshold = () => {
    return cursorItem.offsetWidth + 16; // Cursor width + 16px margin
  };

  // On mousemove, call the quickTo functions to the actual cursor position
  window.addEventListener('mousemove', (e) => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let { scrollY } = window;
    let cursorX = e.clientX;
    let cursorY = e.clientY + scrollY; // Adjust cursorY to account for scroll

    // Default offsets
    let xPercent = xOffset;
    let yPercent = yOffset;

    // Adjust X offset dynamically based on cursor width
    let cursorEdgeThreshold = getCursorEdgeThreshold();
    if (cursorX > windowWidth - cursorEdgeThreshold) {
      cursorIsOnRight = true;
      xPercent = -100;
    } else {
      cursorIsOnRight = false;
    }

    // Adjust Y offset if in the bottom 10% of the current viewport
    if (cursorY > scrollY + windowHeight * 0.9) {
      yPercent = -120;
    }

    if (currentTarget) {
      let newText = currentTarget.getAttribute('data-cursor');
      if (newText !== lastText) {
        // Only update if the text is different
        cursorParagraph.innerHTML = newText;
        lastText = newText;

        // Recalculate edge awareness whenever the text changes
        cursorEdgeThreshold = getCursorEdgeThreshold();
      }
    }

    gsap.to(cursorItem, {
      xPercent: xPercent,
      yPercent: yPercent,
      duration: 0.9,
      scale: 1,
      ease: 'power3',
    });
    xTo(cursorX);
    yTo(cursorY - scrollY);
  });

  // Add a mouse enter listener for each link that has a data-cursor attribute
  targets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      currentTarget = target; // Set the current target

      let newText = target.getAttribute('data-cursor');

      // Update only if the text changes
      if (newText !== lastText) {
        cursorParagraph.innerHTML = newText;
        lastText = newText;

        // Recalculate edge awareness whenever the text changes
        let cursorEdgeThreshold = getCursorEdgeThreshold();
      }
    });
  });
}

function initWorkScroll() {
  let mm = gsap.matchMedia();
  mm.add('(min-width: 992px)', () => {
    const items = $('.work_slider-item');
    const itemCount = items.length;
    const workWall = $('.work-wall');
    const sliderRow = $('.hp-work_slider-row');
    const totalWidth = itemCount * 100;
    const dynamicHeight = totalWidth;

    workWall.css('height', dynamicHeight + 'vh');

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(sliderRow, {
      xPercent: -(totalWidth - 100),
      ease: 'none',
      scrollTrigger: {
        trigger: workWall,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: false,
      },
    });

    const imgs = $('.work_slider-item img');

    if (window.lenisInstance) {
      let isScrolling = false;
      let scrollTimeout;

      window.lenisInstance.on('scroll', (e) => {
        if ($(window).width() > 991) {
          const velocity = Math.abs(e.velocity);
          if (velocity > 15 && !isScrolling) {
            isScrolling = true;

            gsap.to(imgs, {
              scale: 1.1,
              duration: 1,
              ease: 'power4.out',
            });

            gsap.to(items.find('.work_slider-item_visual'), {
              scale: 0.8,
              duration: 1,
              ease: 'power4.out',
            });
          }

          clearTimeout(scrollTimeout);

          scrollTimeout = setTimeout(() => {
            isScrolling = false;
            gsap.to(imgs, {
              scale: 1,
              duration: 1,
              ease: 'power4.out',
            });
            gsap.to(items.find('.work_slider-item_visual'), {
              scale: 1,
              duration: 1,
              ease: 'power4.out',
            });
          }, 15);
        }
      });
    }
  });
}

function initWorkCounter() {
  $('[data-work-counter]').text('(' + $('.work_slider-item').length + ')');
}

// -- Works Page
function animateWorkLoad() {
  var tl = gsap.timeline({});

  let visualWrap = '.work-d_hero-wrap.cc-images';
  let visualList = '.work-d_hero-wrap.cc-images .work-d_hero-list';
  let visualItem = '.work-d_hero-wrap.cc-images .work-d_hero-list-item';
  let timeline = '.work-d_hero-timeline';

  tl.set(
    [timeline],
    {
      y: '10vh',
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

  tl.to(
    visualList,
    {
      duration: 1,
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

  tl.from(
    visualItem,
    {
      duration: 2,
      ease: 'Expo.easeInOut',
      rotate: 0.001,
      opacity: 0,
      y: '0px',
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
  let firstItem = $('.work-d_hero-list-item').first();
  let lastItem = $('.work-d_hero-list-item').last();

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrap,
      start: () => {
        let firstItemCenter = firstItem.outerHeight() / 2;
        console.log(firstItemCenter);
        return firstItemCenter + 'px center';
      },
      end: () => {
        let lastItemCenter = lastItem.offset().top + lastItem.outerHeight() / 2;
        let wrapTop = wrap.offset().top;
        return lastItemCenter - wrapTop + 'px center';
      },
      scrub: true,
      markers: true,
    },
  });

  tl.to('.work-d_hero-timeline-inner', {
    y: () => {
      let containerHeight = $('.work-d_hero-timeline-inner').height();
      let itemHeight = $('.work-d_hero-timeline_item').first().outerHeight(true);
      return -(containerHeight - itemHeight) + 'px';
    },
    ease: 'none',
  });

  $('.work-d_hero-timeline_item').on('click', function () {
    let index = $(this).index();
    let targetElement = $('.work-d_hero-list-item').eq(index);

    let targetPosition = targetElement.offset().top;
    let targetHeight = targetElement.outerHeight();
    let windowHeight = $(window).height();

    let centeredPosition = targetPosition - windowHeight / 2 + targetHeight / 2;

    lenisInstance.scrollTo(centeredPosition, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  });

  // Active State
  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: '.section.cc-work-d-content',
      start: 'top bottom',
      end: 'top bottom',
      markers: true,
      onEnterBack: () => {
        gsap.to($('.work-d_hero-timeline-active'), { height: '10.8rem', y: 0 });
      },
      onLeave: () => {
        let itemHeight = $('.work-d_hero-timeline_item').first().outerHeight(true);
        gsap.to($('.work-d_hero-timeline-active'), { height: '1px', y: itemHeight + 3 + 'px' });
      },
    },
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

// -- About Page
function initAboutImgs() {
  $(document).ready(function () {
    const $images = $('.about_visual-box-inner-extra img');
    const maxLayers = $images.length;
    let currentLayer = -1;
    let shuffledIndexes = [];

    if (maxLayers === 0) return;

    function shuffleArray() {
      shuffledIndexes = Array.from({ length: maxLayers }, (_, i) => i);
      for (let i = shuffledIndexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIndexes[i], shuffledIndexes[j]] = [shuffledIndexes[j], shuffledIndexes[i]];
      }
    }

    shuffleArray();

    $images.css({
      display: 'block',
      opacity: 0,
    });

    $('.about_visual-box-inner').on('click', function () {
      if (currentLayer >= maxLayers - 1) {
        resetLayers();
        return;
      }

      addNewLayer();
    });

    function addNewLayer() {
      currentLayer++;
      const rotation = Math.random() * 10 - 5;
      const finalScale = Math.pow(0.99, currentLayer + 1);
      const initialScale = finalScale * 0.99;
      const randomIndex = shuffledIndexes[currentLayer];
      const $targetImage = $images.eq(randomIndex);

      gsap.set($targetImage[0], {
        opacity: 0,
        scale: initialScale,
        rotation: rotation + 2,
        zIndex: currentLayer + 10,
      });

      gsap.to($targetImage[0], {
        opacity: 1,
        scale: finalScale,
        rotation: rotation,
        duration: 0.6,
        ease: 'back.out(1.2)',
        delay: 0.1,
      });
    }

    function resetLayers() {
      gsap.to($images, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.in',
        onComplete: function () {
          gsap.set($images, {
            scale: 1,
            rotation: 0,
            zIndex: 'auto',
          });
          currentLayer = -1;
          shuffleArray();
        },
      });
    }
  });
}

// -- Why Page
function initWhySwipers() {
  function changeTitle(swiper) {
    let index = swiper.activeIndex;
    let activeSlide = swiper.slides[index];
    animateScambleText($('[data-work-slider="title"]'), $(activeSlide).attr('data-title'));
    animateScambleText($('[data-work-slider="desc"]'), $(activeSlide).attr('data-description'));
  }
  const caseSwiper = new Swiper('.why-hero_cases-slider', {
    slidesPerView: 1,
    modules: [SwiperGL],
    effect: 'gl',
    gl: {
      // specify required shader effect
      shader: 'morph-y',
    },
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.swiper-nav.cc-cases',
      bulletClass: 'swiper-dot',
      bulletActiveClass: 'cc-active',
      clickable: true,
    },
    on: {
      slideChange: function () {
        changeTitle(this);
      },
      init: function () {
        changeTitle(this);
      },
    },
  });

  const testimonials = new Swiper('.why-hero_quotes-slider', {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    speed: 600,
    pagination: {
      el: '.swiper-nav.cc-quotes',
      bulletClass: 'swiper-dot',
      bulletActiveClass: 'cc-active',
      clickable: true,
    },
    on: {
      init: function () {
        updateAvatarImages(this);
        $('.swiper-slide').each(function () {
          gsap.set($(this).find('[data-item-el]'), {
            yPercent: 50,
            opacity: 0,
          });
        });
        gsap.to($('.swiper-slide-active [data-item-el]'), {
          yPercent: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.6,
          ease: 'power2.out',
        });
      },
      slideChangeTransitionEnd: function () {
        gsap.to($('.swiper-slide:not(.swiper-slide-active) [data-item-el]'), {
          yPercent: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.3,
        });
        gsap.to($('.swiper-slide-active [data-item-el]'), {
          yPercent: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
        });
      },
    },
  });

  function updateAvatarImages(swiper) {
    let { slides } = swiper;
    let totalSlides = slides.length;

    slides.forEach((slide, index) => {
      let cc1Circle = $(slide).find('.why-hero_quotes-avatar-circle.cc-1');
      let cc2Circle = $(slide).find('.why-hero_quotes-avatar-circle.cc-2');

      let nextSlideIndex = (index + 1) % totalSlides;
      let nextNextSlideIndex = (index + 2) % totalSlides;

      let nextSlideCC3Image = $(slides[nextSlideIndex])
        .find('.why-hero_quotes-avatar-circle.cc-avatar img')
        .attr('src');
      let nextNextSlideCC3Image = $(slides[nextNextSlideIndex])
        .find('.why-hero_quotes-avatar-circle.cc-avatar img')
        .attr('src');

      if (nextNextSlideCC3Image) {
        cc1Circle.find('img').attr('src', nextNextSlideCC3Image);
      }

      if (nextSlideCC3Image) {
        cc2Circle.find('img').attr('src', nextSlideCC3Image);
      }
    });
  }
}

// -- Contact Page
function initAdvancedFormValidation() {
  const forms = document.querySelectorAll('[data-form-validate]');
  forms.forEach((formContainer) => {
    const startTime = new Date().getTime();

    const form = formContainer.querySelector('form');
    if (!form) return;

    const validateFields = form.querySelectorAll('[data-validate]');
    const dataSubmit = form.querySelector('[data-submit]');
    if (!dataSubmit) return;

    const realSubmitInput = dataSubmit.querySelector('input[type="submit"]');
    if (!realSubmitInput) return;

    function isSpam() {
      const currentTime = new Date().getTime();
      return currentTime - startTime < 5000;
    }

    // Disable select options with invalid values on page load
    validateFields.forEach(function (fieldGroup) {
      const select = fieldGroup.querySelector('select');
      if (select) {
        const options = select.querySelectorAll('option');
        options.forEach(function (option) {
          if (
            option.value === '' ||
            option.value === 'disabled' ||
            option.value === 'null' ||
            option.value === 'false'
          ) {
            option.setAttribute('disabled', 'disabled');
          }
        });
      }
    });

    function validateAndStartLiveValidationForAll() {
      let allValid = true;
      let firstInvalidField = null;

      validateFields.forEach(function (fieldGroup) {
        const input = fieldGroup.querySelector('input, textarea, select');
        const radioCheckGroup = fieldGroup.querySelector('[data-radiocheck-group]');
        if (!input && !radioCheckGroup) return;

        if (input) input.__validationStarted = true;
        if (radioCheckGroup) {
          radioCheckGroup.__validationStarted = true;
          const inputs = radioCheckGroup.querySelectorAll(
            'input[type="radio"], input[type="checkbox"]'
          );
          inputs.forEach(function (input) {
            input.__validationStarted = true;
          });
        }

        updateFieldStatus(fieldGroup);

        if (!isValid(fieldGroup)) {
          allValid = false;
          if (!firstInvalidField) {
            firstInvalidField = input || radioCheckGroup.querySelector('input');
          }
        }
      });

      if (!allValid && firstInvalidField) {
        firstInvalidField.focus();
      }

      return allValid;
    }

    function isValid(fieldGroup) {
      const radioCheckGroup = fieldGroup.querySelector('[data-radiocheck-group]');
      if (radioCheckGroup) {
        const inputs = radioCheckGroup.querySelectorAll(
          'input[type="radio"], input[type="checkbox"]'
        );
        const checkedInputs = radioCheckGroup.querySelectorAll('input:checked');
        const min = parseInt(radioCheckGroup.getAttribute('min')) || 1;
        const max = parseInt(radioCheckGroup.getAttribute('max')) || inputs.length;
        const checkedCount = checkedInputs.length;

        if (inputs[0].type === 'radio') {
          return checkedCount >= 1;
        }
        if (inputs.length === 1) {
          return inputs[0].checked;
        }
        return checkedCount >= min && checkedCount <= max;
      }
      const input = fieldGroup.querySelector('input, textarea, select');
      if (!input) return false;

      let valid = true;
      const min = parseInt(input.getAttribute('min')) || 0;
      const max = parseInt(input.getAttribute('max')) || Infinity;
      const value = input.value.trim();
      const { length } = value;

      if (input.tagName.toLowerCase() === 'select') {
        if (value === '' || value === 'disabled' || value === 'null' || value === 'false') {
          valid = false;
        }
      } else if (input.type === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        valid = emailPattern.test(value);
      } else {
        if (input.hasAttribute('min') && length < min) valid = false;
        if (input.hasAttribute('max') && length > max) valid = false;
      }

      return valid;
    }

    function updateFieldStatus(fieldGroup) {
      const radioCheckGroup = fieldGroup.querySelector('[data-radiocheck-group]');
      if (radioCheckGroup) {
        const inputs = radioCheckGroup.querySelectorAll(
          'input[type="radio"], input[type="checkbox"]'
        );
        const checkedInputs = radioCheckGroup.querySelectorAll('input:checked');

        if (checkedInputs.length > 0) {
          fieldGroup.classList.add('is--filled');
        } else {
          fieldGroup.classList.remove('is--filled');
        }

        const valid = isValid(fieldGroup);

        if (valid) {
          fieldGroup.classList.add('is--success');
          fieldGroup.classList.remove('is--error');
        } else {
          fieldGroup.classList.remove('is--success');
          const anyInputValidationStarted = Array.from(inputs).some(
            (input) => input.__validationStarted
          );
          if (anyInputValidationStarted) {
            fieldGroup.classList.add('is--error');
          } else {
            fieldGroup.classList.remove('is--error');
          }
        }
      } else {
        const input = fieldGroup.querySelector('input, textarea, select');
        if (!input) return;

        const value = input.value.trim();

        if (value) {
          fieldGroup.classList.add('is--filled');
        } else {
          fieldGroup.classList.remove('is--filled');
        }

        const valid = isValid(fieldGroup);

        if (valid) {
          fieldGroup.classList.add('is--success');
          fieldGroup.classList.remove('is--error');
        } else {
          fieldGroup.classList.remove('is--success');
          if (input.__validationStarted) {
            fieldGroup.classList.add('is--error');
          } else {
            fieldGroup.classList.remove('is--error');
          }
        }
      }
    }

    validateFields.forEach(function (fieldGroup) {
      const input = fieldGroup.querySelector('input, textarea, select');
      const radioCheckGroup = fieldGroup.querySelector('[data-radiocheck-group]');

      if (radioCheckGroup) {
        const inputs = radioCheckGroup.querySelectorAll(
          'input[type="radio"], input[type="checkbox"]'
        );
        inputs.forEach(function (input) {
          input.__validationStarted = false;

          input.addEventListener('change', function () {
            requestAnimationFrame(function () {
              if (!input.__validationStarted) {
                const checkedCount = radioCheckGroup.querySelectorAll('input:checked').length;
                const min = parseInt(radioCheckGroup.getAttribute('min')) || 1;

                if (checkedCount >= min) {
                  input.__validationStarted = true;
                }
              }

              if (input.__validationStarted) {
                updateFieldStatus(fieldGroup);
              }
            });
          });

          input.addEventListener('blur', function () {
            input.__validationStarted = true;
            updateFieldStatus(fieldGroup);
          });
        });
      } else if (input) {
        input.__validationStarted = false;

        if (input.tagName.toLowerCase() === 'select') {
          input.addEventListener('change', function () {
            input.__validationStarted = true;
            updateFieldStatus(fieldGroup);
          });
        } else {
          input.addEventListener('input', function () {
            const value = input.value.trim();
            const { length } = value;
            const min = parseInt(input.getAttribute('min')) || 0;
            const max = parseInt(input.getAttribute('max')) || Infinity;

            if (!input.__validationStarted) {
              if (input.type === 'email') {
                if (isValid(fieldGroup)) input.__validationStarted = true;
              } else {
                if (
                  (input.hasAttribute('min') && length >= min) ||
                  (input.hasAttribute('max') && length <= max)
                ) {
                  input.__validationStarted = true;
                }
              }
            }

            if (input.__validationStarted) {
              updateFieldStatus(fieldGroup);
            }
          });

          input.addEventListener('blur', function () {
            input.__validationStarted = true;
            updateFieldStatus(fieldGroup);
          });
        }
      }
    });

    dataSubmit.addEventListener('click', function () {
      if (validateAndStartLiveValidationForAll()) {
        if (isSpam()) {
          alert('Form submitted too quickly. Please try again.');
          return;
        }
        realSubmitInput.click();
      }
    });

    form.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
        if (validateAndStartLiveValidationForAll()) {
          if (isSpam()) {
            alert('Form submitted too quickly. Please try again.');
            return;
          }
          realSubmitInput.click();
        }
      }
    });
  });

  // Checkbox and Radio Class
  $('.form-checkbox').each(function () {
    const $label = $(this);
    const $input = $label.find('input[type="checkbox"], input[type="radio"]');

    function updateState() {
      if ($input.attr('type') === 'radio') {
        $(`input[name="${$input.attr('name')}"]`).each(function () {
          $(this).closest('.form-checkbox').removeClass('cc-active');
        });
      }

      if ($input.is(':checked')) {
        $label.addClass('cc-active');
      } else {
        $label.removeClass('cc-active');
      }
    }

    updateState();
    $input.on('change', updateState);
  });
}

// -- Anim Functions
function animateScambleText(label, text) {
  let scrambleChars = '0123456789!@#$%^&*()_+<>?:|';
  gsap.to(label, {
    duration: 0.5,
    scrambleText: {
      text: text,
      chars: scrambleChars,
      speed: 0.3,
      ease: 'power2.inOut',
    },
  });
}

function initMaskTextReveal(el) {
  const splitConfig = {
    lines: { duration: 0.8, stagger: 0.08 },
    words: { duration: 0.6, stagger: 0.06 },
    chars: { duration: 0.4, stagger: 0.01 },
  };

  let splitInstances = [];
  let scrollTriggerInstances = [];

  function setupSplitText() {
    scrollTriggerInstances.forEach((trigger) => {
      if (trigger) trigger.kill();
    });

    splitInstances.forEach((split) => {
      if (split) split.revert();
    });

    splitInstances = [];
    scrollTriggerInstances = [];

    $(el).each(function () {
      const heading = $(this);
      if (heading.hasClass('animated')) return;
      const type = heading.data('split-reveal') || 'lines';
      const typesToSplit =
        type === 'lines'
          ? ['lines']
          : type === 'words'
          ? ['lines', 'words']
          : ['lines', 'words', 'chars'];

      const isInsideLi = heading.closest('li').length > 0;

      gsap.set(heading, { visibility: 'visible', opacity: 1 });

      if (isInsideLi) {
        gsap.set(heading.closest('li'), { opacity: 0 });
      }

      try {
        const splitText = new SplitText(heading[0], {
          type: typesToSplit.join(', '),
          mask: 'lines',
          linesClass: 'line',
          wordsClass: 'word',
          charsClass: 'letter',
        });

        splitInstances.push(splitText);

        const targets = splitText[type];
        if (!targets || targets.length === 0) {
          console.warn('No split targets found for', heading);
          return;
        }

        gsap.set(targets, { yPercent: 110 });

        const config = splitConfig[type];
        const triggerType = heading.data('trigger-type') || 'load';

        const animateText = () => {
          const tl = gsap.timeline({
            onComplete: () => {
              heading.addClass('animated');
            },
          });

          if (isInsideLi) {
            tl.to(
              heading.closest('li'),
              {
                opacity: 1,
                duration: config.duration * 0.3,
                ease: 'power2.out',
              },
              0
            );
          }

          tl.to(
            targets,
            {
              yPercent: -8,
              duration: config.duration,
              stagger: config.stagger,
              ease: 'expo.out',
            },
            isInsideLi ? config.duration * 0.15 : 0
          );

          return tl;
        };

        if (triggerType === 'scroll') {
          const trigger = ScrollTrigger.create({
            trigger: heading[0],
            start: 'clamp(top 80%)',
            once: true,
            markers: heading.data('debug-markers') === 'true',
            onEnter: animateText,
          });

          scrollTriggerInstances.push(trigger);
        } else {
          gsap.delayedCall(0.2, animateText);
        }
      } catch (error) {
        console.error('Error in SplitText:', error);
      }
    });
  }

  setTimeout(setupSplitText, 300);

  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  const debouncedResize = debounce(setupSplitText, 200);
  $(window).on('resize', debouncedResize);

  return function cleanup() {
    $(window).off('resize', debouncedResize);
    scrollTriggerInstances.forEach((trigger) => {
      if (trigger) trigger.kill();
    });
    splitInstances.forEach((split) => {
      if (split) split.revert();
    });
  };
}

function initItemReveal(el) {
  let scrollTriggerInstances = [];

  function setupItemReveal() {
    scrollTriggerInstances.forEach((trigger) => {
      if (trigger) trigger.kill();
    });

    scrollTriggerInstances = [];

    $(el).each(function () {
      const item = $(this);
      if (item.hasClass('animated')) return;

      const duration = item.data('duration') || 0.6;
      const delay = item.data('delay') || 0;
      const triggerType = item.data('trigger-type') || 'scroll';

      gsap.set(item, { opacity: 0 });

      const animateItem = () => {
        gsap.to(item, {
          opacity: 1,
          duration: duration,
          delay: delay,
          ease: 'power2.out',
          onComplete: () => {
            item.addClass('animated');
          },
        });
      };

      if (triggerType === 'scroll') {
        const trigger = ScrollTrigger.create({
          trigger: item[0],
          start: 'clamp(top 95%)',
          once: true,
          markers: item.data('debug-markers') === 'true',
          onEnter: animateItem,
        });

        scrollTriggerInstances.push(trigger);
      } else {
        gsap.delayedCall(0.2, animateItem);
      }
    });
  }

  setTimeout(setupItemReveal, 300);

  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  const debouncedResize = debounce(setupItemReveal, 200);
  $(window).on('resize', debouncedResize);

  return function cleanup() {
    $(window).off('resize', debouncedResize);
    scrollTriggerInstances.forEach((trigger) => {
      if (trigger) trigger.kill();
    });
  };
}

function initGridReveal() {
  gsap.fromTo(
    '.grid-line.is-h',
    {
      scaleX: 0,
    },
    {
      scaleX: 1,
      stagger: 0.1,
      duration: 3,
      immediateRender: true,
      ease: 'power4.inOut',
    }
  );

  gsap.fromTo(
    '.grid-line.is-v',
    {
      scaleY: 0,
    },
    {
      scaleY: 1,
      stagger: 0.1,
      duration: 2,
      immediateRender: true,
      ease: 'power4.inOut',
    }
  );
}

function initButtonCharacterStagger() {
  const offsetIncrement = 0.01; // Transition offset increment in seconds
  const buttons = document.querySelectorAll('[data-button-animate-chars]');

  buttons.forEach((button) => {
    const text = button.textContent; // Get the button's text content
    button.innerHTML = ''; // Clear the original content

    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.transitionDelay = `${index * offsetIncrement}s`;

      // Handle spaces explicitly
      if (char === ' ') {
        span.style.whiteSpace = 'pre'; // Preserve space width
      }

      button.appendChild(span);
    });
  });
}

// Global
function initSiteFunctionality() {
  initNav();
  initPageGap();
  initLenis();
  initTimeCheck();
  initGridReveal();
  animateNav();
  initCSSMarquee();
  initBackHome();
  document.fonts.ready.then(function () {
    initMaskTextReveal('[data-split="heading"]');
    initItemReveal('[data-item-reveal]');
    initButtonCharacterStagger();
  });
  window.initDarkModeToggle();
}

// Pages
function initHomepage() {
  initWorkScroll();
  animateHomepageHero();
  animateWorksLinks('.hp-hero_content-clients ul', '.hp-hero_links');
  initDynamicCustomTextCursor();
  initWorkCounter();
}
function initWork() {
  animateWorkTimeline();
  animateWorkLoad();
  animateWorkIcon();
}
function initAbout() {
  setTimeout(() => {
    initAboutImgs();
    initGridReveal();
    animateWorksLinks('.about_clients-list.cc-clients', '.about_clients-item');
  }, 500);
}
function initWhy() {
  initWhySwipers();
}
function initContact() {
  initAdvancedFormValidation();
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
  // Always run global functionality
  initSiteFunctionality();

  // Run page-specific code
  if (namespace === 'home') {
    initHomepage();
  } else if (namespace === 'work') {
    initWork();
  } else if (namespace === 'about') {
    initAbout();
  } else if (namespace === 'why') {
    initWhy();
  } else if (namespace === 'contact') {
    initContact();
  }

  // Add transition styles
  setTimeout(() => {
    gsap.to('[data-barba=container]', { opacity: 1 });
  }, 300);
}

function initBarba() {
  addTransitionStyles();

  // Variables for work item transition
  let clonedElement = null;
  let clickedItemData = null;

  // Initialize Barba with transitions
  barba.init({
    timeout: 7000,
    prefetchIgnore: true,
    sync: true,

    // Define transitions
    transitions: createDefaultTransition(),
  });

  function createDefaultTransition() {
    function transitionPages(data) {
      let html = $('html');
      let currPreloader = $(data.current.container).find('.page-transition');
      let nextPreloader = $(data.next.container).find('.page-transition');
      let tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.inOut' } });

      tl.call(() => {
        window.scrollTo(0, 0);
      });

      tl.set([data.current.container, data.next.container], {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      });

      tl.set(html, { backgroundColor: '#4C4C4C' });

      tl.set(data.next.container, {
        scale: 0.8,
        zIndex: 2,
      });

      tl.set(data.current.container, {
        zIndex: 1,
      });

      tl.to(currPreloader, {
        scaleY: 1,
        duration: 0.4,
      });

      tl.to(
        data.current.container,
        {
          scale: 0.8,
          duration: 0.5,
        },
        '-=0.1'
      );

      tl.set(
        data.current.container,
        {
          opacity: 0,
          pointerEvents: 'none',
        },
        '+=0.2'
      );
      tl.fromTo(
        nextPreloader,
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 1,
          onStart: () => {
            const namespace = data.next.container.dataset.barbaNamespace;
            runInitFunctions(namespace);
          },
        },
        '-=0.3'
      );
      tl.set(
        data.next.container,
        {
          opacity: 1,
        },
        '<'
      );

      tl.to(
        data.next.container,
        {
          scale: 1,
          duration: 1,
          onComplete: () => {
            gsap.set(html, { backgroundColor: '' });
            gsap.set(data.next.container, {
              clearProps: 'all',
            });
            gsap.set(data.next.container, {
              opacity: 1,
            });
          },
        },
        '<'
      );

      return tl;
    }

    return {
      name: 'default-transition',

      before(data) {
        document.documentElement.classList.add('is-animating');
        pauseScroll(true);
      },

      async enter(data) {
        await transitionPages(data);
      },

      async after(data) {
        pauseScroll(false);
        document.documentElement.classList.remove('is-animating');
        handleAnchorScroll();
      },
    };
  }

  // Work Animation
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

          // Start at the same time as the FLIP animation
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

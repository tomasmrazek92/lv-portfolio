if (typeof THREE === 'undefined') {
  import('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js').then(() => {
    initLabsGrid();
  });
}

import { fragmentShader, vertexShader } from './three/shaders.js';

gsap.registerPlugin(SplitText, ScrollTrigger, TextPlugin);

// Functions
function initLenis() {
  if (window.lenisInstance) {
    window.lenisInstance.destroy();
    window.lenisInstance = null;
  }

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

  $('[data-lenis-start]')
    .off('click')
    .on('click', function () {
      lenis.start();
    });
  $('[data-lenis-stop]')
    .off('click')
    .on('click', function () {
      lenis.stop();
    });
  $('[data-lenis-toggle]')
    .off('click')
    .on('click', function () {
      $(this).toggleClass('stop-scroll');
      if ($(this).hasClass('stop-scroll')) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

  const { body } = document;
  const observer = new ResizeObserver(() => {
    lenis.resize();
  });
  observer.observe(body);
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

  @media only screen and (max-width:992px){
  .site-frame.site-frame-bottom{
    display:none;
  }
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

var scrollPosition = 0;

function pauseScroll(state) {
  // Pause Lenis scrolling during transition
  if (window.lenisInstance) {
    if (state === true) {
      disableScroll();
    } else {
      enableScroll();
    }
  }

  function disableScroll() {
    scrollPosition = window.scrollY;
    $('body').css({
      overflow: 'hidden',
      position: 'fixed',
      top: `0`,
      width: '100%',
    });
    window.lenisInstance.scrollTo(0, {
      immediate: true,
      onComplete: () => {
        window.lenisInstance.stop();
      },
    });
  }

  function enableScroll() {
    $('body').css({
      overflow: '',
      position: '',
      top: '',
      width: '',
    });
    window.lenisInstance.start();
    window.lenisInstance.scrollTo(scrollPosition, {});
  }
}

function stollToTop() {
  $('[data-scroll-top]').on('click', function () {
    if (window.lenisInstance) {
      window.lenisInstance.scrollTo(0);
    } else {
      // If 'lenis' is not defined, fall back to the default browser scroll behavior.
      window.scrollTo(0, 0);
    }
  });
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
  const pixelsPerSecond = 60; // Set the marquee speed (pixels per second)
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
  function scrollToAnchor(anchorId, updateUrl = false) {
    const targetElement = document.getElementById(anchorId);

    if (targetElement && window.lenisInstance) {
      const scrollAction = () => {
        window.lenisInstance.scrollTo(targetElement, {
          duration: 1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      };

      updateUrl ? scrollAction() : setTimeout(scrollAction, 100);

      if (updateUrl) {
        window.history.pushState({}, '', window.location.pathname + '?anchor=' + anchorId);
      }
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const anchorId = urlParams.get('anchor');

  if (anchorId) scrollToAnchor(anchorId);

  $('a[href^="?anchor="], a[href^="#"], a[href*="' + window.location.pathname + '?anchor="]').on(
    'click',
    function (e) {
      const href = $(this).attr('href');
      let anchorId;

      if (href.startsWith('#')) {
        anchorId = href.substring(1);
      } else if (href.includes('?anchor=')) {
        const urlParts = href.split('?');
        const currentPath = window.location.pathname;
        const linkPath = urlParts[0] || currentPath;

        if (linkPath === currentPath || linkPath === '') {
          e.preventDefault();
          anchorId = new URLSearchParams(urlParts[1]).get('anchor');
        }
      }

      if (anchorId) {
        const $navMenu = $('.nav_menu');
        if ($navMenu.is(':visible')) {
          pauseScroll(false);
          $('[data-nav-toggle="close"]').trigger('click');
          setTimeout(() => {
            scrollToAnchor(anchorId, true);
          }, 500);
        } else {
          scrollToAnchor(anchorId, true);
        }
      }
    }
  );
}

function initClipboardCopy() {
  $('[data-copy-clipboard]').on('click', function () {
    const targetId = $(this).attr('data-copy-clipboard');
    const $target = $(`[data-copy-clipboard="${targetId}"]`).find('.line');

    if ($target.length) {
      const originalText = $target.text();

      const showTooltip = () => {
        const $tooltip = $('<div class="copy-tooltip">Copied</div>');
        $tooltip.css({
          position: 'absolute',
          background: 'var(--body-2)',
          color: 'var(--text-2)',
          padding: '.5em 1em',
          borderRadius: '.25em',
          fontSize: '1.5rem',
          whiteSpace: 'nowrap',
          zIndex: 9999,
          pointerEvents: 'none',
        });

        const targetOffset = $target.offset();
        $tooltip.css({
          top: targetOffset.top - 40,
          left: targetOffset.left + $target.outerWidth() / 2 - $tooltip.outerWidth() / 2,
        });

        $('body').append($tooltip);

        setTimeout(() => {
          $tooltip.remove();
        }, 1500);
      };

      navigator.clipboard
        .writeText(originalText)
        .then(() => {
          showTooltip();
        })
        .catch(() => {
          const textArea = document.createElement('textarea');
          textArea.value = originalText;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);

          showTooltip();
        });
    }
  });
}

function resetWebflow(data) {
  let dataWF = new DOMParser()
    .parseFromString(data.next.html, 'text/html')
    .querySelector('html')
    .getAttribute('data-wf-page');
  document.documentElement.setAttribute('data-wf-page', dataWF),
    // reset webflow interactions
    window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow &&
    window.Webflow.require &&
    window.Webflow.require('ix2') &&
    window.Webflow.require('ix2').init();
  // reset w--current class
  $('.w--current').removeClass('w--current');
  $('a').each(function () {
    if ($(this).attr('href') === window.location.pathname) {
      $(this).addClass('w--current');
    }
  });
}

const VideoModal = {
  isOpen: false,
  $overlay: null,
  $container: null,
  $videoWrapper: null,
  $originalElement: null,
  originalMaxWidth: null,
  originalPlayers: [],
  modalPlayer: null,

  init() {
    this.initOriginalPlyrs();
    this.bindEvents();
    this.addStyles();
  },

  initOriginalPlyrs() {
    const $videoEls = $('.plyr_video');
    if ($videoEls.length) {
      this.originalPlayers = [];

      $videoEls.each((index, videoEl) => {
        const player = new Plyr(videoEl, {
          controls: ['play', 'progress', 'mute', 'fullscreen'],
          muted: true,
          autoplay: true,
          loop: { active: true },
        });

        $(videoEl).closest('[data-video-player]').find('.plyr__controls').hide();

        player.on('ready', () => {
          setTimeout(() => {
            player.play();
            player.muted = true;
          }, 100);
        });

        player.on('loadeddata', () => {
          player.play();
        });

        this.originalPlayers.push(player);
      });
    }
  },

  bindEvents() {
    $('[data-video-player]').each((index, element) => {
      $(element).click((e) => {
        e.preventDefault();
        this.open($(e.currentTarget));
      });
    });
  },

  open($element) {
    if (this.isOpen) return;

    const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const $video = $element.find('video')[0];

      if ($video) {
        // Reset video state
        $video.removeAttribute('playsinline');
        $video.removeAttribute('webkit-playsinline');
        $video.controls = false;
        $video.currentTime = 0; // Restart
        $video.muted = false;

        // Handle fullscreen exit
        const handleFullscreenExit = () => {
          // Clean up listeners
          $video.removeEventListener('webkitendfullscreen', handleFullscreenExit);
          $video.removeEventListener('fullscreenchange', handleFullscreenExit);

          // Pause and reset video
          $video.pause();
          $video.setAttribute('playsinline', '');
          $video.setAttribute('webkit-playsinline', '');
          $video.controls = false;

          // Replace video element to fully reset
          const $container = $element.closest('[data-video-player]');
          const $newVideo = $($video).clone(true)[0];
          $video.replaceWith($newVideo);

          // Reinitialize Plyr
          const newPlayer = new Plyr($newVideo, {
            controls: ['play', 'progress', 'mute', 'fullscreen'],
            muted: true,
            autoplay: true,
            loop: { active: true },
          });

          $($container).find('.plyr__controls').hide();

          newPlayer.on('ready', () => {
            newPlayer.play().catch(() => {});
          });
        };

        // Add fullscreen exit listeners
        $video.addEventListener('webkitendfullscreen', handleFullscreenExit);
        $video.addEventListener('fullscreenchange', () => {
          if (!document.fullscreenElement) handleFullscreenExit();
        });

        // Play and fullscreen
        $video
          .play()
          .then(() => {
            const requestFullscreen =
              $video.requestFullscreen ||
              $video.webkitEnterFullscreen ||
              $video.webkitRequestFullscreen ||
              $video.msRequestFullscreen;

            if (requestFullscreen) {
              requestFullscreen.call($video);
            }
          })
          .catch((err) => {
            console.warn('Autoplay or fullscreen failed:', err);
          });
      }

      return;
    }

    // Non-mobile modal logic...
    this.$originalElement = $element;
    this.originalMaxWidth = $element.css('max-width');

    pauseScroll(true);
    $element.css('max-width', 'none');

    this.createElement();
    this.setupModal($element);
    this.animateIn();

    this.isOpen = true;
  },

  close() {
    if (!this.isOpen) return;

    this.pauseVideo();
    this.animateOut();
  },

  createElement() {
    this.$overlay = $('<div class="video-modal-overlay"></div>');
    this.$container = $('<div class="video-modal-container"></div>');
    this.$videoWrapper = $('<div class="video-modal-wrapper"></div>');
    const $closeBtn = $('<div class="video-modal-close">×</div>');

    this.$videoWrapper.append($closeBtn);
    this.$container.append(this.$videoWrapper);
    this.$overlay.append(this.$container);
    $('body').append(this.$overlay);

    this.bindCloseEvents($closeBtn);
  },

  setupModal($element) {
    const elementRect = $element[0].getBoundingClientRect();
    const aspectRatio = $element.attr('data-video-player') || '16/9';

    this.$container.css({
      position: 'fixed',
      left: elementRect.left + 'px',
      top: elementRect.top + 'px',
      width: elementRect.width + 'px',
      height: elementRect.height + 'px',
      zIndex: 9999,
    });

    this.$videoWrapper.css('aspect-ratio', aspectRatio);

    const $clonedElement = $element.clone(true);
    $clonedElement.find('.plyr').replaceWith($clonedElement.find('video'));
    this.$videoWrapper.append($clonedElement);
    $element.css('visibility', 'hidden');
  },

  animateIn() {
    gsap.set(this.$overlay, { opacity: 0 });
    gsap.to(this.$overlay, { opacity: 1, duration: 0.3 });

    gsap.to(this.$container, {
      left: '5vw',
      top: '5vh',
      width: '90vw',
      height: '90vh',
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => this.activateModalVideo(),
    });
  },

  activateModalVideo() {
    const $clonedElement = this.$videoWrapper.find('[data-video-player]');
    const $videoEl = $clonedElement.find('.plyr_video');

    if ($videoEl.length) {
      this.modalPlayer = new Plyr($videoEl[0], {
        controls: ['play', 'progress', 'mute', 'fullscreen'],
        muted: false,
        autoplay: false,
        loop: { active: true },
      });

      this.modalPlayer.on('ready', () => {
        setTimeout(() => {
          this.modalPlayer.restart();
          this.modalPlayer.muted = false;
          this.modalPlayer.play().catch(() => {});
        }, 100);
      });
    }
  },

  animateOut() {
    const elementRect = this.$originalElement[0].getBoundingClientRect();

    gsap.to(this.$container, {
      left: elementRect.left + 'px',
      top: elementRect.top + 'px',
      width: elementRect.width + 'px',
      height: elementRect.height + 'px',
      duration: 0.4,
      ease: 'power2.in',
    });

    gsap.to(this.$overlay, {
      opacity: 0,
      duration: 0.3,
      delay: 0.2,
      onComplete: () => this.cleanup(),
    });
  },

  cleanup() {
    this.$overlay.remove();
    this.$originalElement.css({
      visibility: 'visible',
      'max-width': this.originalMaxWidth,
    });

    if (this.modalPlayer) {
      this.modalPlayer.destroy();
      this.modalPlayer = null;
    }

    pauseScroll(false);
    $(document).off('keydown.videoModal');
    this.resetProperties();
  },

  resetProperties() {
    this.isOpen = false;
    this.$overlay = null;
    this.$container = null;
    this.$videoWrapper = null;
    this.$originalElement = null;
    this.originalMaxWidth = null;
  },

  bindCloseEvents($closeBtn) {
    $closeBtn.click(() => this.close());
    this.$overlay.click((e) => {
      if (e.target === this.$overlay[0]) this.close();
    });
    $(document).on('keydown.videoModal', (e) => {
      if (e.key === 'Escape') this.close();
    });
  },

  playVideo() {
    if (this.modalPlayer) {
      this.modalPlayer.play();
    }
  },

  pauseVideo() {
    if (this.modalPlayer) {
      this.modalPlayer.pause();
    }
  },

  addStyles() {
    $('<style>')
      .text(
        `
        .video-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9998;
            backdrop-filter: blur(10px);
        }
        
        .video-modal-container {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .video-modal-wrapper {
            width: 100%;
            max-width: 1200px;
            max-height: 80vh;
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }
        
        .video-modal-wrapper [data-video-player] {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover;
        }
        
        .video-modal-wrapper video {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover;
        }
        
        .video-modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: var(--body1);
            color: var(--text-1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            z-index: 10000;
            transition: all 0.2s ease;
        }
        
        .video-modal-close:hover {
            background: var(--body-2);
            color: var(--text-2);
            transform: scale(1.1);
        }
    `
      )
      .appendTo('head');
  },
};

function initDynamicCustomTextCursor() {
  let cursorItem = document.querySelector('.cursor');
  if (!cursorItem) return;

  let cursorParagraph = cursorItem.querySelector('p');
  let targets = document.querySelectorAll('[data-cursor]');
  let xOffset = 6;
  let yOffset = 140;
  let cursorIsOnRight = false;
  let currentTarget = null;
  let lastText = '';
  let isActive = false;
  let xTo, yTo;

  const checkScreenSize = () => {
    return window.innerWidth >= 992;
  };

  const initCursor = () => {
    if (!checkScreenSize()) return;

    isActive = true;
    gsap.set(cursorItem, { xPercent: xOffset, yPercent: yOffset, scale: 0.8 });
    xTo = gsap.quickTo(cursorItem, 'x', { ease: 'power3' });
    yTo = gsap.quickTo(cursorItem, 'y', { ease: 'power3' });
    cursorItem.style.display = 'block';
  };

  const destroyCursor = () => {
    isActive = false;
    if (cursorItem) {
      cursorItem.style.display = 'none';
    }
  };

  const getCursorEdgeThreshold = () => {
    return cursorItem.offsetWidth + 16;
  };

  const handleMouseMove = (e) => {
    if (!isActive) return;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let { scrollY } = window;
    let cursorX = e.clientX;
    let cursorY = e.clientY + scrollY;

    let xPercent = xOffset;
    let yPercent = yOffset;

    let cursorEdgeThreshold = getCursorEdgeThreshold();

    if (cursorX > windowWidth - cursorEdgeThreshold) {
      cursorIsOnRight = true;
      xPercent = -100;
    } else {
      cursorIsOnRight = false;
    }

    if (cursorY > scrollY + windowHeight * 0.9) {
      yPercent = -120;
    }

    if (currentTarget) {
      let newText = currentTarget.getAttribute('data-cursor');
      if (newText !== lastText) {
        cursorParagraph.innerHTML = newText;
        lastText = newText;
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
  };

  const handleMouseEnter = (target) => {
    if (!isActive) return;

    currentTarget = target;
    let newText = target.getAttribute('data-cursor');

    if (newText !== lastText) {
      cursorParagraph.innerHTML = newText;
      lastText = newText;
      getCursorEdgeThreshold();
    }

    if (target.tagName !== 'A') {
      cursorItem.style.backgroundColor = 'var(--text-3)';
      cursorItem.style.color = 'var(--body-2)';
    } else {
      cursorItem.style.backgroundColor = '';
      cursorItem.style.color = '';
    }
  };

  const handleResize = () => {
    if (checkScreenSize() && !isActive) {
      initCursor();
    } else if (!checkScreenSize() && isActive) {
      destroyCursor();
    }
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);

  targets.forEach((target) => {
    target.addEventListener('mouseenter', () => handleMouseEnter(target));
  });

  if (checkScreenSize()) {
    initCursor();
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
    pauseScroll(true);
  }

  function closeMenu() {
    menuAnimations.close();
    pauseScroll(false);
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
  let originalText = label.attr('data-original-text');

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
    initMaskTextReveal($(this).find('.hp-hero_content-label').eq(0));
    tl.fromTo(
      $(this).find('li'),
      { opacity: 0, xPercent: -5 },
      { opacity: 1, xPercent: 0, stagger: 0.2 }
    );
    tl.fromTo(
      $('.hp-hero').find('[data-item-reveal]'),
      { opacity: 0, visibility: 'hidden' },
      { opacity: 1, visibility: 'visible' }
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
      onComplete: () => {
        $(this).css('clip-path', '');
      },
    });
  });
}

function animateHeroScrol() {
  // create
  let mm = gsap.matchMedia();

  let hero = $('.hp-hero');

  if (!hero.length) return;

  // add a media query. When it matches, the associated function will run
  mm.add('(min-width: 992px)', () => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'center top',
        end: 'bottom top',
        scrub: 1,
        onEnterBack: () => {
          gsap.to($('.hp-work_head-link'), {
            rotate: 0,
          });
        },
        onLeave: () => {
          gsap.to($('.hp-work_head-link'), {
            rotate: 180,
          });
        },
      },
    });

    tl.to($('.hp-hero').add('.nav_wrapper'), {
      opacity: 0.1,
    });
  });
}

function animateWorksLinks(list, listitem) {
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
  let timeline = '.work-d_hero-timeline-box';
  let navigation = '.work-navigation';

  tl.set(
    [timeline, navigation],
    {
      y: '10vh',
      rotate: 0.001,
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
    [timeline, navigation],
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

function waitForImagesAndLayout() {
  return new Promise((resolve) => {
    const items = $('.work-d_hero-list-item');
    if (!items.length) {
      resolve();
      return;
    }

    const images = items.find('img');
    let loadedImages = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      setTimeout(resolve, 100);
      return;
    }

    function checkComplete() {
      loadedImages++;
      if (loadedImages >= totalImages) {
        setTimeout(resolve, 100);
      }
    }

    images.each(function () {
      if (this.complete) {
        checkComplete();
      } else {
        $(this).on('load error', checkComplete);
      }
    });

    setTimeout(resolve, 2000);
  });
}

let timelineGlobalState = {
  isInitialized: false,
  scrollTriggerInstance: null,
  rafId: null,
  lastTransformValue: -1,
  lastUpdateTime: 0,
  cachedData: {},
};
function animateWorkTimeline() {
  let scrollTriggerInstance;
  let cachedData = {};
  let lastUpdateTime = 0;
  const updateThreshold = 16;

  function cacheItemPositions() {
    const items = $('.work-d_hero-list-item');
    const timelineItems = $('.work-d_hero-timeline_item');
    const isSmallScreen = $(window).width() < 992;

    cachedData = {
      items: items,
      timelineItems: timelineItems,
      isSmallScreen: isSmallScreen,
      itemData: [],
      timelineItemSize: isSmallScreen
        ? timelineItems.first().outerWidth(true)
        : timelineItems.first().outerHeight(true),
    };

    items.each(function (index) {
      const $item = $(this);
      const offset = $item.offset();
      cachedData.itemData.push({
        top: offset.top,
        height: $item.outerHeight(),
        center: offset.top + $item.outerHeight() / 2,
      });
    });
  }

  function initializeTimeline() {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }

    let wrap = $('.work-d_hero-part.cc-images');
    if (!wrap.length) return;

    let list = $('.work-d_hero-list');
    let items = $('.work-d_hero-list-item');
    let timeline = $('.work-d_hero-timeline');
    let timelineInner = $('.work-d_hero-timeline-inner');
    let firstItem = items.first();
    let lastItem = items.last();

    const timelineItems = $('.work-d_hero-timeline_item');
    const isSmallScreen = $(window).width() < 992;

    cacheItemPositions();

    gsap.set(timelineInner, {
      y: 0,
      x: 0,
      force3D: true,
      willChange: 'transform',
    });

    let itemsTl = gsap.timeline({ paused: true });

    if (isSmallScreen) {
      itemsTl.fromTo(
        timelineItems.find('.work-d_hero-timeline_mask'),
        {
          yPercent: 50,
          opacity: 0,
        },
        { yPercent: 0, opacity: 1, stagger: 0.2 }
      );
    }

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: wrap[0],
      onEnter: () => {
        timeline.addClass('cc-active');
        if (isSmallScreen) {
          itemsTl.play();
        }
      },
      onEnterBack: () => {
        timeline.addClass('cc-active');
        if (isSmallScreen) {
          itemsTl.play();
        }
      },
      onLeave: () => {
        timeline.removeClass('cc-active');
        if (isSmallScreen) {
          itemsTl.reverse();
        }
      },
      onLeaveBack: () => {
        timeline.removeClass('cc-active');
        if (isSmallScreen) {
          itemsTl.reverse();
        }
      },
      start: () => {
        const firstItemHeight = firstItem.outerHeight();
        const firstItemCenter = firstItemHeight / 2;
        return firstItemCenter + 'px center';
      },
      end: () => {
        const listHeight = list.outerHeight();
        const lastItemHeight = lastItem.outerHeight();
        const lastItemCenter = listHeight - lastItemHeight / 2;
        return lastItemCenter + 'px center';
      },
      scrub: 0,
      onUpdate: (self) => {
        const now = performance.now();
        if (now - lastUpdateTime < updateThreshold) return;
        lastUpdateTime = now;

        const windowHeight = $(window).height();
        const windowScrollTop = $(window).scrollTop();
        const viewportCenter = windowScrollTop + windowHeight / 2;

        if (!cachedData.itemData.length) return;

        const firstItemCenter = cachedData.itemData[0].center;

        if (viewportCenter < firstItemCenter) {
          gsap.set(timelineInner, { y: 0, x: 0 });
          cachedData.timelineItems.removeClass('active');
          cachedData.timelineItems.eq(0).addClass('active');
          return;
        }

        let imageProgress = 0;
        let currentImageIndex = -1;

        for (let i = 0; i < cachedData.itemData.length; i++) {
          if (viewportCenter >= cachedData.itemData[i].center) {
            imageProgress = i;
            currentImageIndex = i;
          } else {
            break;
          }
        }

        if (currentImageIndex < cachedData.itemData.length - 1 && currentImageIndex >= 0) {
          const currentCenter = cachedData.itemData[currentImageIndex].center;
          const nextCenter = cachedData.itemData[currentImageIndex + 1].center;

          if (viewportCenter > currentCenter) {
            const progressToNext = (viewportCenter - currentCenter) / (nextCenter - currentCenter);
            imageProgress += Math.min(1, Math.max(0, progressToNext));
          }
        }

        const translateValue = imageProgress * cachedData.timelineItemSize;

        if (cachedData.isSmallScreen) {
          gsap.set(timelineInner, { x: -translateValue, y: 0 });
        } else {
          gsap.set(timelineInner, { y: -translateValue, x: 0 });
        }
      },
    });

    $(document).off('click.workTimeline', '.work-d_hero-timeline_item');
    $(document).on('click.workTimeline', '.work-d_hero-timeline_item', function () {
      let index = $(this).index();
      let targetElement = items.eq(index);

      if (targetElement.length) {
        let targetPosition = targetElement.offset().top;
        let targetHeight = targetElement.outerHeight();
        let windowHeight = $(window).height();
        let centeredPosition = targetPosition + targetHeight / 2 - windowHeight / 2;

        if (typeof lenisInstance !== 'undefined' && lenisInstance.scrollTo) {
          lenisInstance.scrollTo(centeredPosition, {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          $('html, body').animate({ scrollTop: Math.max(0, centeredPosition) }, 1200);
        }
      }
    });
  }

  let resizeTimer;
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if ($(window).width() !== $(window).data('prevWidth')) {
        $(window).data('prevWidth', $(window).width());
        timelineGlobalState.isInitialized = false;
        setTimeout(() => {
          waitForImagesAndLayout().then(() => {
            initializeTimeline();
          });
        }, 100);
      }
    }, 150);
  }

  function cleanup() {
    if (timelineGlobalState.scrollTriggerInstance) {
      timelineGlobalState.scrollTriggerInstance.kill();
      timelineGlobalState.scrollTriggerInstance = null;
    }
    if (timelineGlobalState.rafId) {
      cancelAnimationFrame(timelineGlobalState.rafId);
      timelineGlobalState.rafId = null;
    }
    $(window).off('resize.workTimeline');
    $(document).off('click.workTimeline');
    timelineGlobalState.isInitialized = false;
    timelineGlobalState.lastTransformValue = -1;
    timelineGlobalState.cachedData = {};
  }

  waitForImagesAndLayout().then(() => {
    initializeTimeline();
  });

  $(window).off('resize.workTimeline');
  $(window).on('resize.workTimeline', handleResize);

  if (typeof window.barba !== 'undefined') {
    window.barba.hooks.before(() => {
      cleanup();
    });
  }

  return {
    destroy: cleanup,
    refresh: () => {
      cleanup();
      waitForImagesAndLayout().then(() => {
        initializeTimeline();
      });
    },
  };
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
      const finalScale = Math.pow(0.7, currentLayer + 1);
      const initialScale = finalScale * 0.99;
      const randomIndex = shuffledIndexes[currentLayer];
      const $targetImage = $images.eq(randomIndex);

      gsap.set($targetImage[0], {
        opacity: 0,
        scale: 0.8,
        rotation: rotation + 2,
        zIndex: currentLayer + 10,
      });

      gsap.to($targetImage[0], {
        opacity: 1,
        scale: 0.7,
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
    effect: 'fade',
    fadeEffect: {
      crossfade: true,
    },
    loop: true,
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
    speed: 200,
    navigation: {
      nextEl: '.why-hero_quotes-slide-inner',
    },
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
        $(`input[name="${$input.attr('name')}"]`)
          .not(':checked')
          .each(function () {
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

// -- Labs Page
function initLabsGrid() {
  if (!document.getElementById('gallery')) return;

  const config = {
    cellSize: 0.75,
    zoomLevel: 1.25,
    lerpFactor: 0.075,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'transparent',
    textColor: '#ffffff',
    hoverColor: 'rgba(255, 255, 255, 0)',
    wheelSensitivity: 0.0008,
    wheelDamping: 0.92,
    momentumThreshold: 0.1,
    mouseSensitivity: 0.003,
    touchSensitivity: 0.008,
  };

  const projects = [];

  $('[data-lab-item]').each(function () {
    const $item = $(this);

    const project = {
      id: $item.attr('data-lab-item'),
      title: $item.find('[data-lab-title]').text().trim(),
      label: $item.find('[data-lab-label]').text().trim(),
      desc: $item.find('[data-lab-desc]').text().trim(),
      image: $item.find('[data-lab-img]').attr('src'),
      imageHiRes: $item.find('[data-lab-hires-img]').attr('src'),
    };

    projects.push(project);
  });

  let scene, camera, renderer, plane;
  let isDragging = false,
    isClick = true,
    clickStartTime = 0;
  let previousMouse = { x: 0, y: 0 };
  let offset = { x: 0, y: 0 },
    targetOffset = { x: 0, y: 0 };
  let mousePosition = { x: -1, y: -1 };
  let zoomLevel = 1.0,
    targetZoom = 1.0;
  let textTextures = [];

  let currentHoveredCell = { x: -999, y: -999 };
  let targetHoveredCell = { x: -999, y: -999 };
  let hoverAnimationValue = 0;
  let targetHoverValue = 0;
  const hoverSpeed = 0.15;

  const rgbaToArray = (color) => {
    if (color === 'transparent') {
      return [0, 0, 0, 0];
    }

    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      return [r, g, b, 1];
    }

    const match = color.match(/rgba?\(([^)]+)\)/);
    if (!match) return [0, 0, 0, 1];
    return match[1]
      .split(',')
      .map((v, i) => (i < 3 ? parseFloat(v.trim()) / 255 : parseFloat(v.trim() || 1)));
  };

  const getComputedTextColor = () => {
    const container = document.getElementById('gallery');
    const computedStyle = getComputedStyle(container);
    return computedStyle.color || '#ffffff';
  };

  const createTextTexture = (title, year) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 512, 512);
    ctx.font = '100px Arial';
    ctx.fillStyle = getComputedTextColor();
    ctx.textBaseline = 'top';

    const wrapText = (text, maxWidth) => {
      const words = text.split(' ');
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const { width } = ctx.measureText(currentLine + ' ' + word);
        if (width < maxWidth) {
          currentLine += ' ' + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    };

    const titleLines = wrapText(title, 400);
    titleLines.forEach((line, index) => {
      ctx.fillText(line, 25, 25 + index * 35); // Reduced spacing and margin
    });

    ctx.fillStyle = 'red';
    ctx.fillText(year, 25, 25 + titleLines.length * 35 + 10);

    const texture = new THREE.CanvasTexture(canvas);
    Object.assign(texture, {
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      flipY: false,
      generateMipmaps: false,
      format: THREE.RGBAFormat,
    });

    return texture;
  };

  const createTextureAtlas = (textures, isText = false) => {
    const textureCount = textures.length;
    const atlasWidth = textureCount; // Back to 1D
    const atlasHeight = 1;

    const textureSize = isText ? 512 : 512; // Smaller text size
    const canvas = document.createElement('canvas');
    canvas.width = atlasWidth * textureSize;
    canvas.height = atlasHeight * textureSize;
    const ctx = canvas.getContext('2d');

    textures.forEach((texture, index) => {
      const x = (index % atlasWidth) * textureSize;
      const y = Math.floor(index / atlasWidth) * textureSize;

      if (isText && texture.source?.data) {
        ctx.drawImage(texture.source.data, x, y, textureSize, textureSize);
      } else if (!isText) {
        if (texture.image?.complete && texture.image.naturalWidth > 0) {
          ctx.drawImage(texture.image, x, y, textureSize, textureSize);
        } else {
          ctx.fillStyle = '#ff0000';
          ctx.fillRect(x, y, textureSize, textureSize);
        }
      }
    });

    const atlasTexture = new THREE.CanvasTexture(canvas);
    Object.assign(atlasTexture, {
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      flipY: false,
    });

    atlasTexture.needsUpdate = true;

    return {
      texture: atlasTexture,
      atlasWidth: atlasWidth,
      atlasHeight: atlasHeight,
    };
  };

  const loadTextures = () => {
    const textureLoader = new THREE.TextureLoader();
    const imageTextures = [];
    let loadedCount = 0;

    return new Promise((resolve) => {
      projects.forEach((project, index) => {
        const texture = textureLoader.load(
          project.image,
          () => {
            if (++loadedCount === projects.length) resolve(imageTextures);
          },
          undefined,
          (error) => {
            if (++loadedCount === projects.length) resolve(imageTextures);
          }
        );

        Object.assign(texture, {
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
        });

        imageTextures.push(texture);
        textTextures.push(createTextTexture(project.title, project.label));
      });
    });
  };

  const getProjectAtCell = (cellX, cellY) => {
    const texIndex = Math.floor((cellX + cellY * 11.0) % projects.length);
    const actualIndex = texIndex < 0 ? projects.length + texIndex : texIndex;
    return projects[actualIndex];
  };

  const updateHoveredCell = () => {
    if (!renderer || mousePosition.x < 0 || mousePosition.y < 0) {
      targetHoveredCell = { x: -999, y: -999 };
      return;
    }

    const rect = renderer.domElement.getBoundingClientRect();
    const screenX = (mousePosition.x / rect.width) * 2 - 1;
    const screenY = -((mousePosition.y / rect.height) * 2 - 1);

    const radius = Math.sqrt(screenX * screenX + screenY * screenY);
    const distortion = 1.0 - 0.08 * radius * radius;
    const distortedX = screenX * distortion;
    const distortedY = screenY * distortion;

    const aspectRatio = rect.width / rect.height;
    let worldX = distortedX * aspectRatio * zoomLevel + offset.x;
    let worldY = distortedY * zoomLevel + offset.y;

    const cellPosX = (worldX / config.cellSize) * 0.95;
    const cellPosY = (worldY / config.cellSize) * 0.95;

    const cellX = Math.floor(cellPosX);
    const cellY = Math.floor(cellPosY);

    targetHoveredCell = { x: cellX, y: cellY };
  };

  const updateMousePosition = (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mousePosition.x = event.clientX - rect.left;
    mousePosition.y = event.clientY - rect.top;

    updateHoveredCell();

    if (plane?.material.uniforms) {
      plane.material.uniforms.uMousePos.value.set(mousePosition.x, mousePosition.y);
    }
  };

  const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
  };

  const isClickOnNavigation = (event) => {
    const { target } = event;
    return (
      target.closest('nav') ||
      target.closest('.navbar') ||
      target.closest('[data-nav]') ||
      target.closest('header') ||
      target.tagName === 'A' ||
      target.closest('a')
    );
  };

  const startDrag = (event, x, y) => {
    if (isClickOnNavigation(event)) return false;

    isDragging = true;
    isClick = true;
    clickStartTime = Date.now();
    document.body.classList.add('dragging');
    previousMouse.x = x;
    previousMouse.y = y;
    setTimeout(() => isDragging && (targetZoom = config.zoomLevel), 150);
    return true;
  };

  const onPointerDown = (e) => {
    if (!startDrag(e, e.clientX, e.clientY)) return;
  };

  const onTouchStart = (e) => {
    if (!startDrag(e, e.touches[0].clientX, e.touches[0].clientY)) return;
    e.preventDefault();
  };

  const handleMove = (currentX, currentY, isTouch = false) => {
    if (!isDragging || currentX === undefined || currentY === undefined) return;

    const deltaX = currentX - previousMouse.x;
    const deltaY = currentY - previousMouse.y;

    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      isClick = false;
      if (targetZoom === 1.0) targetZoom = config.zoomLevel;
    }

    const sensitivity = isTouch ? config.touchSensitivity : config.mouseSensitivity;
    targetOffset.x -= deltaX * sensitivity;
    targetOffset.y += deltaY * sensitivity;
    previousMouse.x = currentX;
    previousMouse.y = currentY;
  };

  const onPointerMove = (e) => handleMove(e.clientX, e.clientY);
  const onTouchMove = (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX, e.touches[0].clientY, true);
  };

  const onPointerUp = (event) => {
    if (!isDragging) return;

    isDragging = false;
    document.body.classList.remove('dragging');
    targetZoom = 1.0;

    if (isClick && Date.now() - clickStartTime < 200) {
      const endX = event.clientX || event.changedTouches?.[0]?.clientX;
      const endY = event.clientY || event.changedTouches?.[0]?.clientY;

      if (endX !== undefined && endY !== undefined && !isClickOnNavigation(event)) {
        const rect = renderer.domElement.getBoundingClientRect();
        const screenX = ((endX - rect.left) / rect.width) * 2 - 1;
        const screenY = -(((endY - rect.top) / rect.height) * 2 - 1);

        const radius = Math.sqrt(screenX * screenX + screenY * screenY);
        const distortion = 1.0 - 0.08 * radius * radius;

        let worldX = screenX * distortion * (rect.width / rect.height) * zoomLevel + offset.x;
        let worldY = screenY * distortion * zoomLevel + offset.y;

        const cellX = Math.floor((worldX / config.cellSize) * 0.95);
        const cellY = Math.floor((worldY / config.cellSize) * 0.95);

        const clickedProject = getProjectAtCell(cellX, cellY);

        if (clickedProject) {
          modalController.open(clickedProject.id);
        }
      }
    }
  };

  const modalController = {
    activePlayer: null,

    init() {
      this.setupEventListeners();
      this.checkUrlQuery();
    },

    setupEventListeners() {
      $('[data-modal-close]').on('click', () => this.close());

      $(document).on('keydown', (event) => {
        if (event.key === 'Escape') this.close();
      });

      $('.labs-modal_wrap').on('click', (event) => {
        const $target = $(event.target);
        const $videoContainer = $('.labs-modal_video:visible');
        const $imageContainer = $('.labs-modal_img-item:visible');

        if (
          !$target.closest('.labs-modal_video').length &&
          !$target.closest('.labs-modal_img-item').length
        ) {
          this.close();
        }
      });

      $(window).on('popstate', () => {
        this.checkUrlQuery();
      });
    },

    checkUrlQuery() {
      const urlParams = new URLSearchParams(window.location.search);
      const modalId = urlParams.get('project');

      if (modalId) {
        const $modal = $(`[data-lab-item="${modalId}"]`);
        if ($modal.length) {
          this.open(modalId);
        }
      } else {
        this.close();
      }
    },

    open(id) {
      this.destroyVideo();

      pauseScroll(true);
      $('.labs-modal_wrap').css('display', 'flex');
      $('[data-lab-item]').hide();

      const $modal = $(`[data-lab-item="${id}"]`);
      $modal.css('display', 'flex');

      this.handleMediaType($modal);
      this.updateUrl(id);
    },

    close() {
      this.destroyVideo();
      pauseScroll(false);
      $('[data-lab-item]').hide();
      $('.labs-modal_wrap').css('display', 'none');
      this.updateUrl();
    },

    updateUrl(modalId = null) {
      const url = new URL(window.location);

      if (modalId) {
        url.searchParams.set('project', modalId);
      } else {
        url.searchParams.delete('project');
      }

      window.history.pushState({}, '', url);
    },

    handleMediaType($modal) {
      const $videoContainer = $modal.find('.labs-modal_video');
      const $imageContainer = $modal.find('.labs-modal_img-item');
      const $video = $videoContainer.find('video');

      $videoContainer.hide();
      $imageContainer.hide();

      if ($video.length) {
        const $source = $video.find('source');
        const videoSrc = $source.attr('src') || $video.attr('src');

        if (videoSrc && videoSrc.trim() !== '') {
          $videoContainer.show();
          this.initializeVideo($video);
        } else {
          $imageContainer.css('display', 'flex');
        }
      } else {
        $imageContainer.css('display', 'flex');
      }
    },

    initializeVideo($video) {
      if (typeof Plyr !== 'undefined') {
        const videoElement = $video[0];

        videoElement.currentTime = 0;
        videoElement.pause();

        this.activePlayer = new Plyr(videoElement, {
          controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'fullscreen',
          ],
          autoplay: false,
          loop: { active: true },
        });

        this.activePlayer.on('ready', () => {
          this.activePlayer.currentTime = 0;
          setTimeout(() => {
            if (this.activePlayer && $('.labs-modal_wrap').is(':visible')) {
              this.activePlayer.play();
            }
          }, 100);
        });

        this.activePlayer.on('loadeddata', () => {
          this.activePlayer.currentTime = 0;
        });
      }
    },

    destroyVideo() {
      if (this.activePlayer) {
        try {
          this.activePlayer.pause();
          this.activePlayer.currentTime = 0;
          this.activePlayer.destroy();
        } catch (e) {}
        this.activePlayer = null;
      }

      $('video').each(function () {
        this.pause();
        this.currentTime = 0;
        this.load();
      });
    },
  };

  const onWindowResize = () => {
    const container = document.getElementById('gallery');
    if (!container) return;

    const { offsetWidth: width, offsetHeight: height } = container;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    plane?.material.uniforms.uResolution.value.set(width, height);
  };

  const setupThemeObserver = () => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class')
        ) {
          setTimeout(() => {
            updateTextColors();
          }, 400);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });
  };

  const updateTextColors = () => {
    if (!plane?.material?.uniforms?.uTextAtlas) return;

    const newTextTextures = projects.map((p) => createTextTexture(p.title, p.label));
    const textResult = createTextureAtlas(newTextTextures, true);

    const old = plane.material.uniforms.uTextAtlas.value;
    if (old && old.dispose) old.dispose();

    const tex = textResult.texture;
    tex.needsUpdate = true;
    tex.colorSpace = THREE.SRGBColorSpace;
    plane.material.uniforms.uTextAtlas.value = tex;

    plane.material.needsUpdate = true;
    renderer.resetState();
    renderer.compile(scene, camera);
    renderer.render(scene, camera);
  };

  let wheelVelocity = { x: 0, y: 0 };
  let lastWheelTime = 0;
  let momentumAnimation = null;

  const setupEventListeners = () => {
    const container = document.getElementById('gallery');

    if (!container) return;

    let wheelTimeout = null;
    const handleWheel = (e) => {
      e.preventDefault();

      // Throttle wheel events
      if (wheelTimeout) return;

      wheelTimeout = setTimeout(() => {
        wheelTimeout = null;
      }, 16); // ~60fps throttling

      const currentTime = Date.now();
      const deltaTime = currentTime - lastWheelTime;
      lastWheelTime = currentTime;

      let { deltaX } = e;
      let { deltaY } = e;

      if (Math.abs(e.deltaX) > 0 || Math.abs(e.deltaY) > 0) {
        document.body.classList.add('dragging');

        if (e.deltaMode === 1) {
          deltaX *= 16;
          deltaY *= 16;
        } else if (e.deltaMode === 2) {
          deltaX *= 400;
          deltaY *= 400;
        }

        const sensitivity = config.wheelSensitivity || 0.0008;
        const moveX = deltaX * sensitivity;
        const moveY = deltaY * sensitivity;

        targetOffset.x += moveX;
        targetOffset.y -= moveY;

        // Keep existing momentum code but with capped velocity
        wheelVelocity.x = Math.max(-2, Math.min(2, (moveX / Math.max(deltaTime, 16)) * 1000));
        wheelVelocity.y = Math.max(-2, Math.min(2, (moveY / Math.max(deltaTime, 16)) * 1000));

        clearTimeout(container.wheelTimeout);
        container.wheelTimeout = setTimeout(() => {
          document.body.classList.remove('dragging');
        }, 150);
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mouseup', onPointerUp);
    container.addEventListener('mouseleave', onPointerUp);

    const passiveOpts = { passive: false };
    container.addEventListener('touchstart', onTouchStart, passiveOpts);
    container.addEventListener('touchmove', onTouchMove, passiveOpts);
    container.addEventListener('touchend', onPointerUp, passiveOpts);
    container.addEventListener('wheel', handleWheel, passiveOpts);

    window.addEventListener('resize', onWindowResize);
    container.addEventListener('contextmenu', (e) => e.preventDefault());

    renderer.domElement.addEventListener('mousemove', updateMousePosition);
    renderer.domElement.addEventListener('mouseleave', () => {
      mousePosition.x = mousePosition.y = -1;
      targetHoveredCell = { x: -999, y: -999 };
      targetHoverValue = 0;
      if (plane?.material.uniforms) {
        plane.material.uniforms.uMousePos.value.set(-1, -1);
      }
    });
  };

  const animate = () => {
    requestAnimationFrame(animate);

    // Handle momentum decay in main loop
    if (Math.abs(wheelVelocity.x) > 0.01 || Math.abs(wheelVelocity.y) > 0.01) {
      targetOffset.x += wheelVelocity.x * 0.016;
      targetOffset.y -= wheelVelocity.y * 0.016;

      wheelVelocity.x *= 0.92; // Damping
      wheelVelocity.y *= 0.92;
    }

    offset.x += (targetOffset.x - offset.x) * config.lerpFactor;
    offset.y += (targetOffset.y - offset.y) * config.lerpFactor;
    zoomLevel += (targetZoom - zoomLevel) * config.lerpFactor;

    const cellChanged =
      currentHoveredCell.x !== targetHoveredCell.x || currentHoveredCell.y !== targetHoveredCell.y;

    if (cellChanged) {
      if (hoverAnimationValue > 0.01) {
        hoverAnimationValue = lerp(hoverAnimationValue, 0, hoverSpeed * 1.5);
      } else {
        currentHoveredCell.x = targetHoveredCell.x;
        currentHoveredCell.y = targetHoveredCell.y;
        if (targetHoveredCell.x !== -999) {
          targetHoverValue = 1;
        }
      }
    } else {
      targetHoverValue = targetHoveredCell.x === -999 ? 0 : 1;
      hoverAnimationValue = lerp(hoverAnimationValue, targetHoverValue, hoverSpeed);
    }

    if (plane?.material.uniforms) {
      plane.material.uniforms.uOffset.value.set(offset.x, offset.y);
      plane.material.uniforms.uZoom.value = zoomLevel;
      plane.material.uniforms.uHoveredCell.value.set(currentHoveredCell.x, currentHoveredCell.y);
      plane.material.uniforms.uHoverIntensity.value = hoverAnimationValue;
    }

    renderer.render(scene, camera);
  };

  const init = async () => {
    const container = document.getElementById('gallery');
    if (!container) {
      return;
    }

    const existingCanvas = container.querySelector('canvas');
    if (existingCanvas) {
      existingCanvas.remove();
    }

    if (projects.length === 0) {
      return;
    }

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setClearColor(new THREE.Color(0, 0, 0), 0);
    container.appendChild(renderer.domElement);

    const imageTextures = await loadTextures();

    const imageResult = createTextureAtlas(imageTextures, false);
    console.log(textTextures);
    const textResult = createTextureAtlas(textTextures, true);

    const uniforms = {
      uOffset: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(container.offsetWidth, container.offsetHeight) },
      uBorderColor: { value: new THREE.Vector4(...rgbaToArray(config.borderColor)) },
      uHoverColor: { value: new THREE.Vector4(...rgbaToArray(config.hoverColor)) },
      uBackgroundColor: { value: new THREE.Vector4(...rgbaToArray(config.backgroundColor)) },
      uMousePos: { value: new THREE.Vector2(-1, -1) },
      uZoom: { value: 1.0 },
      uCellSize: { value: config.cellSize },
      uTextureCount: { value: projects.length },
      uAtlasSize: { value: imageResult.atlasSize },
      uAtlasWidth: { value: imageResult.atlasWidth },
      uAtlasHeight: { value: imageResult.atlasHeight },
      uImageAtlas: { value: imageResult.texture },
      uTextAtlas: { value: textResult.texture },
      uHoveredCell: { value: new THREE.Vector2(-999, -999) },
      uHoverIntensity: { value: 0.0 },
    };
    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    material.needsUpdate = true;
    renderer.compile(scene, camera);

    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    setupEventListeners();

    setupThemeObserver();

    animate();
    modalController.init();
  };

  init();
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

  function cleanupInstance() {
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
      const originalText = heading.data('original-text');
      if (originalText) {
        heading.html(originalText);
      }
      heading.removeClass('animated');
      gsap.set(heading, { clearProps: 'all' });
      if (heading.closest('li').length > 0) {
        gsap.set(heading.closest('li'), { clearProps: 'all' });
      }
    });
  }

  function setupSplitText() {
    $(el).each(function () {
      const heading = $(this);

      if (heading.hasClass('split-initialized')) {
        return;
      }

      heading.addClass('split-initialized');
      heading.removeClass('animated');

      const originalText = heading.data('original-text') || heading.text();
      heading.data('original-text', originalText);

      if (heading.find('.line, .word, .letter').length > 0) {
        heading.html(originalText);
      }

      const type = heading.data('split-reveal') || 'lines';
      const typesToSplit =
        type === 'lines'
          ? ['lines']
          : type === 'words'
          ? ['lines', 'words']
          : ['lines', 'words', 'chars'];

      const isInsideLi = heading.closest('li').length > 0;

      gsap.set(heading, {
        visibility: 'visible',
        opacity: 1,
        clearProps: 'transform',
      });

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
    cleanupInstance();

    $(el).each(function () {
      $(this).removeClass('split-initialized');
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
  let gridH = $('.grid-line.is-h');
  let gridV = $('.grid-line.is-v');

  if (gridH.length) {
    gsap.fromTo(
      gridH,
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        stagger: 0.1,
        duration: 6,
        immediateRender: true,
        ease: 'power4.out',
      }
    );
  }

  if (gridV.length) {
    gsap.fromTo(
      gridV,
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
  stollToTop();
  initTimeCheck();
  initGridReveal();
  animateNav();
  initCSSMarquee();
  initBackHome();
  initClipboardCopy();
  handleAnchorScroll();
  document.fonts.ready.then(function () {
    initMaskTextReveal('[data-split="heading"]');
    initItemReveal('[data-item-reveal]');
    initButtonCharacterStagger();
  });
  window.initDarkModeToggle();
  VideoModal.init();
}

// Pages
function initHomepage() {
  animateHeroScrol();
  initWorkScroll();
  animateHomepageHero();
  animateWorksLinks('.hp-hero_content-clients ul', '.hp-hero_links');
  initDynamicCustomTextCursor();
  initWorkCounter();
}
let workTimelineInstance;
function initWork() {
  if (workTimelineInstance) {
    workTimelineInstance.destroy();
  }

  setTimeout(() => {
    workTimelineInstance = animateWorkTimeline();
    animateWorkLoad();
    animateWorkIcon();
  }, 100);
}
function initAbout() {
  setTimeout(() => {
    initAboutImgs();
    initGridReveal();
    animateWorksLinks('.about_clients-list.cc-clients', '.about_clients-item');
    initDynamicCustomTextCursor();
  }, 500);
}
function initWhy() {
  initWhySwipers();
}
function initContact() {
  initAdvancedFormValidation();
}
function initLabs() {
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  });
  initLabsGrid();
}

// Modular Barba.js implementation with work item transition
$(document).ready(function () {
  // Set up initial page load without Barba
  const namespace = $('[data-barba="container"]').data('barba-namespace');
  runInitFunctions();

  // Initialize Barba transitions
  initBarba();
});

function runInitFunctions(data) {
  initSiteFunctionality();

  const namespace =
    data?.next?.container?.dataset?.barbaNamespace ||
    $('[data-barba="container"]').data('barba-namespace');

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
  } else if (namespace === 'labs') {
    initLabs();
  }

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
    timeout: 15000,
    prefetchIgnore: true,
    sync: true,
    debug: true,

    // Define transitions
    transitions: [createWorkItemTransition(), createDefaultTransition()],
  });

  function createDefaultTransition() {
    function transitionPages(data) {
      let html = $('html');
      let currPreloader = $(data.current.container).find('.page-transition');
      let nextPreloader = $(data.next.container).find('.page-transition');
      let tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.inOut' } });

      tl.to(currPreloader, {
        scaleY: 1,
        duration: 0.4,
        onComplete: () => {
          pauseScroll(true);
        },
      });

      tl.to(
        data.current.container,
        {
          scale: 0.8,
          duration: 0.5,
          onStart: () => {
            gsap.set([data.current.container, data.next.container], {
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
            });

            gsap.set(html, { backgroundColor: '#4C4C4C' });

            gsap.set(data.next.container, {
              scale: 0.8,
              zIndex: 2,
            });

            gsap.set(data.current.container, {
              zIndex: 1,
            });
          },
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
            runInitFunctions(data);
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

            if (data.next.namespace === 'work' && workTimelineInstance) {
              setTimeout(() => {
                workTimelineInstance.refresh();
              }, 200);
            }
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

        if (workTimelineInstance) {
          workTimelineInstance.destroy();
        }
      },

      async enter(data) {
        await transitionPages(data);
        resetWebflow(data);
      },

      async after(data) {
        pauseScroll(false);
        initDynamicCustomTextCursor();
        document.documentElement.classList.remove('is-animating');
        handleAnchorScroll();
        if (data.next.namespace === 'labs') {
          initLabs();
        }
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

      custom: ({ trigger }) => {
        return $(trigger).closest('.work_slider-item').length > 0;
      },

      before(data) {
        document.documentElement.classList.add('is-animating');

        if (workTimelineInstance) {
          workTimelineInstance.destroy();
        }
      },

      beforeLeave(data) {
        cloneWorkItem(data.trigger);
      },

      leave(data) {
        return createLeaveAnimation(data.current.container);
      },

      beforeEnter(data) {
        gsap.set(data.next.container, {
          opacity: 0,
          visibility: 'visible',
        });
      },

      afterEnter(data) {
        resetWebflow(data);
        pauseScroll(false);
        animateCloneToTarget(data.next.container);
      },

      after(data) {
        runInitFunctions(data);
        document.documentElement.classList.remove('is-animating');

        if (data.next.namespace === 'work' && workTimelineInstance) {
          setTimeout(() => {
            workTimelineInstance.refresh();
          }, 300);
        }
      },
    };
  }
}

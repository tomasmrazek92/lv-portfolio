$(document).ready(function () {
  const config = {
    timeline: '.hp-precision_timeline-wrap',
    container: '.container-large',
    columns: '.hp-precision_col',
    trigger: '.hp-precision_trigger',
    gradientPaths: '.hp-precision_timeline-wrap svg path[stroke*="var"]',
    timelineTexts: '.hp-precision_timeline-text',
  };

  let mainTimeline = null;
  let textTimelines = [];
  let scrollTriggers = [];
  let textPathElements = [];
  let columnStates = [];

  let resizeTimeout;
  let scrollTimeout;
  let isScrolling = false;
  let lastScrollY = window.scrollY;
  let pendingResize = false;
  let orientationChangeTimeout;

  function detectScrolling() {
    const currentScrollY = window.scrollY;
    if (currentScrollY !== lastScrollY) {
      isScrolling = true;
      lastScrollY = currentScrollY;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        if (pendingResize) {
          pendingResize = false;
          executeResize();
        }
      }, 150);
    }
  }

  function executeResize() {
    killAllAnimations();

    setTimeout(() => {
      initAnimation();
    }, 100);
  }

  function handleResize() {
    clearTimeout(resizeTimeout);

    if (isScrolling) {
      pendingResize = true;
      return;
    }

    resizeTimeout = setTimeout(() => {
      if (!isScrolling) {
        executeResize();
      } else {
        pendingResize = true;
      }
    }, 250);
  }

  function killAllAnimations() {
    if (mainTimeline) {
      mainTimeline.kill();
      mainTimeline = null;
    }

    textTimelines.forEach((tl) => tl.kill());
    textTimelines = [];

    scrollTriggers.forEach((st) => st.kill());
    scrollTriggers = [];

    $(config.timeline).find('.timeline-path-text').remove();
    $(config.timelineTexts).css('opacity', '');

    gsap.set(config.timeline, { clearProps: 'all' });
    gsap.set(config.gradientPaths, { clearProps: 'all' });

    textPathElements = [];
    columnStates = [];
  }

  function calculateTimelinePosition() {
    const $timeline = $(config.timeline);
    const $container = $(config.container);
    const $cols = $(config.columns);
    if (!$timeline.length || !$container.length || !$cols.length) return 0;
    const containerRight = $container[0].getBoundingClientRect().right;
    const lastColRight = $cols.last()[0].getBoundingClientRect().right;
    return containerRight - lastColRight;
  }

  function setupPathAnimation() {
    const gradientPaths = $(config.gradientPaths);
    gradientPaths.each(function () {
      const pathLength = this.getTotalLength();
      gsap.set(this, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 1,
      });
    });
    return gradientPaths;
  }

  function setupTextPathAnimation() {
    const $svg = $(config.timeline).find('svg');

    $(config.timelineTexts).each(function (index) {
      const $text = $(this);
      const textContent = $text.text().toUpperCase();
      const pathId = `line-${index + 1}`;
      const textPathId = `textPath-${index + 1}`;

      const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textElement.setAttribute('class', 'timeline-path-text');
      textElement.setAttribute('font-size', '1.3em');
      textElement.setAttribute('font-family', 'TT Norms Pro Mono, Impact, sans-serif');
      textElement.setAttribute('fill', getComputedStyle($text[0]).color);
      textElement.setAttribute('font-weight', '500');
      textElement.setAttribute('letter-spacing', '.05em');
      textElement.setAttribute('text-transform', 'uppercase');
      textElement.setAttribute('text-anchor', 'end');

      const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
      textPath.setAttribute('href', `#${pathId}`);
      textPath.setAttribute('id', textPathId);
      textPath.setAttribute('startOffset', '0%');
      textPath.textContent = textContent;

      textElement.appendChild(textPath);
      $svg[0].appendChild(textElement);

      $text.css('opacity', '0');

      const pathElement = document.querySelector(`#${pathId}`);
      if (pathElement) {
        const textBBox = textElement.getBBox();
        const individualPathLength = pathElement.getTotalLength();
        const elementWidth = textBBox.width;
        const numberOfLetters = textPath.textContent.length;
        const startOffsetPercent =
          (elementWidth / individualPathLength) * (100 * (numberOfLetters * 1.1));

        gsap.set(textElement, { y: '-1.5em' });
        gsap.set(textPath, { attr: { startOffset: `${startOffsetPercent}%` } });

        textPathElements.push({
          textElement: textElement,
          textPath: textPath,
          textPathId: textPathId,
          startOffset: startOffsetPercent,
          endOffset: 100,
          index: index,
        });
      }
    });
  }

  function checkColumnVisibility() {
    const $cols = $(config.columns);

    $cols.each(function (index) {
      const rect = this.getBoundingClientRect();
      const colNumber = index + 1;
      const colWidth = rect.width;
      const windowWidth = window.innerWidth;
      const isStartingToDisappear = rect.left <= 0;
      const is40PercentHidden = rect.left <= -(colWidth * 0.4);
      const isAppearingFromRight = rect.left <= windowWidth && rect.right > windowWidth;
      const isInMiddleOfView = rect.left <= windowWidth / 2;
      const leftSideInMiddle = rect.left <= windowWidth / 2;
      const rightSideInMiddle = rect.right <= windowWidth / 2;

      if (!columnStates[index]) {
        columnStates[index] = {
          startedDisappearing: false,
          is40PercentHidden: false,
          appearingFromRight: false,
          inMiddleOfView: false,
          leftSideInMiddle: false,
          rightSideInMiddle: false,
        };
      }

      if (isStartingToDisappear && !columnStates[index].startedDisappearing) {
        columnStates[index].startedDisappearing = true;
      }

      if (is40PercentHidden && !columnStates[index].is40PercentHidden) {
        columnStates[index].is40PercentHidden = true;
      }

      if (isAppearingFromRight && !columnStates[index].appearingFromRight) {
        columnStates[index].appearingFromRight = true;
      }

      if (leftSideInMiddle && !columnStates[index].leftSideInMiddle) {
        columnStates[index].leftSideInMiddle = true;
      }

      if (rightSideInMiddle && !columnStates[index].rightSideInMiddle) {
        columnStates[index].rightSideInMiddle = true;
      }
    });
  }

  function getBreakpoint() {
    const width = window.innerWidth;
    if (width >= 1440) return 'large-desktop';
    if (width >= 1280) return 'desktop';
    if (width >= 768) return 'tablet';
    return 'mobile';
  }

  function getTextTriggerConditions(index, breakpoint) {
    const checkColumn = (colIndex, state) =>
      columnStates[colIndex] && columnStates[colIndex][state];

    const conditions = {
      'large-desktop': {
        0: () => checkColumn(1, 'startedDisappearing'),
        1: () => checkColumn(1, 'startedDisappearing'),
        2: () => checkColumn(1, 'is40PercentHidden'),
        3: () => checkColumn(1, 'startedDisappearing'),
        4: () => checkColumn(3, 'leftSideInMiddle'),
        5: () => checkColumn(3, 'leftSideInMiddle'),
      },
      desktop: {
        0: () => checkColumn(1, 'startedDisappearing'),
        1: () => checkColumn(1, 'startedDisappearing'),
        2: () => checkColumn(1, 'is40PercentHidden'),
        3: () => checkColumn(1, 'startedDisappearing'),
        4: () => checkColumn(3, 'leftSideInMiddle'),
        5: () => checkColumn(3, 'leftSideInMiddle'),
      },
      tablet: {
        0: () => checkColumn(1, 'startedDisappearing'),
        1: () => checkColumn(1, 'startedDisappearing'),
        2: () => checkColumn(1, 'is40PercentHidden'),
        3: () => checkColumn(1, 'startedDisappearing'),
        4: () => checkColumn(2, 'leftSideInMiddle'),
        5: () => checkColumn(3, 'leftSideInMiddle'),
      },
      mobile: {
        0: () => checkColumn(1, 'startedDisappearing'),
        1: () => checkColumn(1, 'startedDisappearing'),
        2: () => checkColumn(1, 'is40PercentHidden'),
        3: () => checkColumn(1, 'startedDisappearing'),
        4: () => checkColumn(2, 'leftSideInMiddle'),
        5: () => checkColumn(3, 'leftSideInMiddle'),
      },
    };

    return conditions[breakpoint] && conditions[breakpoint][index]
      ? conditions[breakpoint][index]
      : () => false;
  }

  function getTextEndConditions(index, breakpoint) {
    const checkColumn = (colIndex, state) =>
      columnStates[colIndex] && columnStates[colIndex][state];

    const endConditions = {
      'large-desktop': {
        4: () => checkColumn(3, 'rightSideInMiddle'),
      },
      desktop: {
        4: () => checkColumn(3, 'rightSideInMiddle'),
      },
      tablet: {
        4: () => checkColumn(2, 'rightSideInMiddle'),
      },
      mobile: {
        4: () => checkColumn(2, 'rightSideInMiddle'),
      },
    };

    return endConditions[breakpoint] && endConditions[breakpoint][index]
      ? endConditions[breakpoint][index]
      : null;
  }

  function createStandardTextAnimations() {
    const standardElements = textPathElements.filter((element) => element.index !== 4);

    standardElements.forEach((textPathElement) => {
      const { index } = textPathElement;
      let hasStarted = false;
      let startProgress = 0;
      let textAnimation = null;

      const targetElement = document.querySelector(`#${textPathElement.textPathId}`);
      if (targetElement) {
        textAnimation = gsap.fromTo(
          `#${textPathElement.textPathId}`,
          {
            attr: { startOffset: `${textPathElement.startOffset}%` },
          },
          {
            attr: { startOffset: `${textPathElement.endOffset}%` },
            ease: 'none',
            paused: true,
            immediateRender: false,
          }
        );
      }

      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: config.trigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const currentBreakpoint = getBreakpoint();

            if (!hasStarted) {
              const triggerCondition = getTextTriggerConditions(index, currentBreakpoint);
              const shouldStart = triggerCondition();

              if (shouldStart) {
                hasStarted = true;
                startProgress = self.progress;
              }
            }

            if (hasStarted && textAnimation) {
              const totalDuration = 1 - startProgress;
              const rawProgress =
                totalDuration > 0 ? (self.progress - startProgress) / totalDuration : 0;
              const relativeProgress = Math.min(1, Math.max(0, rawProgress));
              textAnimation.progress(relativeProgress);
            }
          },
        },
      });

      scrollTriggers.push(textTl.scrollTrigger);
      textTimelines.push(textTl);
    });
  }

  function createCustomEndTextAnimation() {
    const customElement = textPathElements.find((element) => element.index === 4);
    if (!customElement) {
      return;
    }

    let textAnimation = gsap.fromTo(
      `#${customElement.textPathId}`,
      {
        attr: { startOffset: `${customElement.startOffset}%` },
      },
      {
        attr: { startOffset: `${customElement.endOffset}%` },
        ease: 'none',
        duration: 1,
        paused: true,
      }
    );

    let hasStarted = false;
    let startScrollPosition = 0;
    let frameCount = 0;
    let lastTriggerState = false;
    let triggerStableFrames = 0;
    let animationDuration = 0.3;

    ScrollTrigger.create({
      trigger: config.trigger,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        frameCount++;

        if (frameCount < 5) {
          textAnimation.progress(0);
          return;
        }

        checkColumnVisibility();

        const currentBreakpoint = getBreakpoint();
        const triggerCondition = getTextTriggerConditions(4, currentBreakpoint);

        const shouldStart = triggerCondition();

        if (shouldStart === lastTriggerState) {
          triggerStableFrames++;
        } else {
          triggerStableFrames = 0;
          lastTriggerState = shouldStart;
        }

        if (!hasStarted && shouldStart && triggerStableFrames > 2) {
          hasStarted = true;
          startScrollPosition = self.scroll();
        }

        if (hasStarted) {
          const totalScrollRange = self.end - self.start;
          const animationRange = totalScrollRange * animationDuration;
          const currentRange = self.scroll() - startScrollPosition;
          const progress = Math.min(1, Math.max(0, currentRange / animationRange));

          textAnimation.progress(progress);
        }
      },
    });
  }

  function initAnimation() {
    const moveX = calculateTimelinePosition();
    const gradientPaths = setupPathAnimation();
    setupTextPathAnimation();

    mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: config.trigger,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: checkColumnVisibility,
        onRefresh: () => checkColumnVisibility(),
      },
    });

    scrollTriggers.push(mainTimeline.scrollTrigger);

    mainTimeline
      .to(config.timeline, { x: moveX, ease: 'none' }, 0)
      .to(gradientPaths, { strokeDashoffset: 0, ease: 'none' }, 0);

    createStandardTextAnimations();
    createCustomEndTextAnimation();

    ScrollTrigger.refresh();
  }

  initAnimation();

  $(window).on('resize', handleResize);
  $(window).on('scroll', detectScrolling);

  $(window).on('orientationchange', function () {
    clearTimeout(orientationChangeTimeout);
    orientationChangeTimeout = setTimeout(() => {
      if (!isScrolling) {
        executeResize();
      } else {
        pendingResize = true;
      }
    }, 500);
  });
});

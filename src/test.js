function initLenis() {
    lenis = new Lenis({
        lerp: .12
    }), lenis.on("scroll", ScrollTrigger.update), gsap.ticker.add((e => {
        lenis.raf(1e3 * e)
    })), gsap.ticker.lagSmoothing(0)
}

function initLenisCheckScrollUpDown() {
    function e() {
        lenis.on("scroll", a)
    }
    var t = 0,
        a = function(e) {
            var a = e.targetScroll;
            Math.abs(t - a) >= 50 && (a > t ? document.body.setAttribute("data-scrolling-direction", "down") : document.body.setAttribute("data-scrolling-direction", "up"), t = a, a > 50 ? document.body.setAttribute("data-scrolling-started", "true") : document.body.setAttribute("data-scrolling-started", "false"))
        };
    e(), barba.hooks.beforeLeave((() => {
        lenis.off("scroll", a), t = 0
    })), barba.hooks.after((() => {
        e()
    }))
}

function isTouchScreendevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints
}

function initCurrentYear(e) {
    const t = (new Date).getFullYear(),
        a = e.querySelectorAll("[data-current-year]");
    a.length > 0 && a.forEach((e => {
        e.textContent = t
    }))
}

function initBarbaNavUpdate(e) {
    const t = $(e.next.html).find("[data-barba-update]");
    $("[data-barba-update]").each((function(e) {
        const a = $(t[e]);
        if (a.length) {
            const e = a.attr("aria-current");
            void 0 !== e ? $(this).attr("aria-current", e) : $(this).removeAttr("aria-current");
            const t = a.attr("class");
            $(this).attr("class", t)
        }
    }))
}

function initSplit() {
    let e = document.querySelectorAll('[data-split="lines"]'),
        t = document.querySelectorAll('[data-split="letters"]');
    gsap.set(".modal-wrap", {
        display: "block",
        autoAlpha: 0
    }), new SplitText(e, {
        type: "lines",
        linesClass: "single-line"
    }).lines.forEach((e => {
        let t = document.createElement("div");
        t.classList.add("single-line-wrap"), e.parentNode.insertBefore(t, e), t.appendChild(e)
    })), Array.from(t).map((e => {
        if (!e.hasAttribute("split-ran")) return new SplitText(e, {
            type: "words, chars",
            charsClass: "single-letter"
        })
    })).forEach((e => {
        e && (e.elements[0].setAttribute("split-ran", "true"), e.elements[0].hasAttribute("data-letters-delay") && e.chars.forEach(((e, t) => {
            let a = t / 150 + "s";
            e.style.setProperty("transition-delay", a)
        })))
    })), gsap.set(".modal-wrap", {
        display: "none",
        autoAlpha: 1,
        clearProps: !0
    })
}

function initLoad(e) {
    let t, a, r = document.querySelector(".nav-row"),
        o = e.querySelector(".section"),
        i = o.querySelectorAll(".single-line"),
        n = o.querySelector('[data-load-items="wrap-p"]'),
        l = o.querySelector('[data-load-items="wrap-buttons"]'),
        s = e.querySelectorAll('[data-load-items="reveal"]');
    n && (t = n.querySelectorAll("p")), l && (a = l.querySelectorAll(".button"));
    let c = gsap.timeline({
        defaults: {
            ease: "osmo-ease",
            duration: 1.2
        },
        onStart: () => {
            ScrollTrigger.refresh()
        },
        onComplete: () => {
            ScrollTrigger.refresh()
        }
    });
    c.set(o, {
        autoAlpha: 1
    }, .5).to(i, {
        y: 0,
        stagger: staggerDefault
    }).to(r, {
        y: 0
    }, "<"), s.length > 1 && c.from(s, {
        yPercent: 20,
        autoAlpha: 0,
        stagger: staggerDefault
    }, .3), n && c.to(t, {
        y: 0,
        stagger: staggerDefault
    }, .3), l && c.from(a, {
        autoAlpha: 0,
        duration: .6,
        stagger: staggerDefault
    }, .8)
}

function initTextScroll(e) {
    e.querySelectorAll('[data-reveal="scroll"]').forEach((e => {
        lines = e.querySelectorAll(".single-line"), gsap.to(lines, {
            y: 0,
            duration: durationDefault + .2,
            stagger: staggerDefault,
            scrollTrigger: {
                trigger: e,
                start: "top 90%",
                once: !0
            }
        })
    }))
}

function initRevealScroll(e) {
    e.querySelectorAll('[data-reveal="fade"]').forEach((e => {
        gsap.from(e, {
            yPercent: 20,
            autoAlpha: 0,
            duration: durationDefault + .2,
            scrollTrigger: {
                trigger: e,
                start: "top bottom",
                once: !0
            }
        })
    }))
}

function initModal() {
    function e() {
        s.forEach((e => {
            let t = e.getAttribute("data-state"),
                a = e.querySelector(".faq-link");
            "open" === t && a.click()
        })), p.play(0), infoModalOpen = !1, awardStackEffect.reverse()
    }
    let t = document.querySelectorAll("[data-modal-cta]"),
        a = document.querySelector(".modal-wrap"),
        r = a.querySelector(".modal-bg"),
        o = a.querySelector(".sidebar"),
        i = o.querySelectorAll("[data-modal]"),
        n = o.querySelectorAll(".sidebar-title .single-line"),
        l = document.querySelectorAll("[data-modal-close]"),
        s = document.querySelectorAll(".faq-item"),
        c = o.querySelectorAll("[data-modal-reveal]"),
        u = !1,
        d = gsap.timeline({
            paused: !0
        }).set(a, {
            display: "block"
        }).set(o, {
            display: "flex"
        }).fromTo(r, {
            opacity: 0
        }, {
            opacity: .5
        }).fromTo(o, {
            yPercent: isMobileLandscape ? 110 : 0,
            xPercent: isMobileLandscape ? 0 : 110
        }, {
            xPercent: 0,
            yPercent: 0,
            duration: 1
        }, "<").fromTo(n, {
            y: "120%"
        }, {
            y: "0%",
            stagger: .02
        }, ">-=0.8").fromTo([s, c], {
            yPercent: 70,
            autoAlpha: 0
        }, {
            yPercent: 0,
            autoAlpha: 1,
            stagger: .05
        }, "<+=0.3"),
        p = gsap.timeline({
            paused: !0,
            onStart: () => {
                u = !0
            },
            onComplete: () => {
                u = !1
            }
        }).to(r, {
            opacity: 0
        }).to(n, {
            y: "120%",
            stagger: {
                each: .03,
                from: "end"
            },
            duration: .65
        }, "<").to([s, c], {
            yPercent: 70,
            autoAlpha: 0,
            stagger: .03,
            duration: .65
        }, "<").to(o, {
            xPercent: isMobileLandscape ? 0 : 110,
            yPercent: isMobileLandscape ? 110 : 0
        }, "<+=0.25").set(a, {
            display: "none"
        });
    t.forEach((e => {
        e.addEventListener("click", (() => {
            let t = e.getAttribute("data-modal-cta");
            i.forEach((e => {
                e.style.display = "none"
            })), o.querySelector(`[data-modal="${t}"]`).style.display = "flex", infoModalOpen = !0, d.play(0), "founders" === t && awardStackEffect.play(0)
        }))
    })), l.forEach((t => {
        t.addEventListener("click", (() => {
            u || e()
        }))
    })), document.addEventListener("keydown", (t => {
        "Escape" === t.key && infoModalOpen && e()
    }))
}

function initFaq(e) {
    function t(e) {
        n.forEach(((t, a) => {
            const r = t.parentElement;
            if (a === e) {
                r.classList.add("active");
                const e = Flip.getState(l);
                r.appendChild(l), Flip.from(e, {
                    duration: .4
                })
            } else r.classList.remove("active")
        }))
    }
    let a = e.querySelectorAll(".faq-item"),
        r = e.querySelectorAll('[data-flip-button="button"]');
    r[0].classList.add("active");
    let o = document.createElement("div");
    o.classList.add("tab-button__bg"), o.setAttribute("data-flip-button", "bg"), r[0].appendChild(o), a.forEach((e => {
        let t = e.querySelector(".faq-link"),
            r = e.querySelector(".faq-content"),
            o = e.querySelectorAll(".single-line");
        t.addEventListener("click", (() => {
            a.forEach((t => {
                t !== e && "open" === t.getAttribute("data-state") && t.querySelector(".faq-link").click()
            })), "closed" === e.getAttribute("data-state") ? (e.setAttribute("data-state", "open"), gsap.to(r, {
                height: "auto",
                onComplete: () => {
                    ScrollTrigger.refresh()
                }
            }), gsap.fromTo(o, {
                y: "120%"
            }, {
                y: "0%",
                stagger: .05,
                delay: .05
            })) : (e.setAttribute("data-state", "closed"), gsap.to(r, {
                height: 0,
                duration: .65,
                onComplete: () => {
                    ScrollTrigger.refresh()
                }
            }))
        }))
    }));
    const i = e.querySelectorAll("[data-faq-nav='row']"),
        n = e.querySelectorAll("[data-faq-nav='link']"),
        l = e.querySelector('[data-flip-button="bg"]');
    i.forEach(((e, a) => {
        ScrollTrigger.create({
            trigger: e,
            start: "top 30%",
            onEnter: () => t(a),
            onLeaveBack: () => t(a - 1)
        })
    }))
}

function setContainerHeight() {
    let e = document.querySelector(".cs-col-vid");
    if (e) {
        e.style.height = "auto";
        let t = e.offsetHeight;
        e.style.height = t + "px"
    }
}

function debounce(e, t) {
    let a;
    return function() {
        clearTimeout(a), a = setTimeout(e, t)
    }
}

function initVideoModal() {
    function e() {
        y.play(0);
        let e = Object.values(vimeoPlayers)[0];
        vimeoPlayerPause(o, e), e.unload();
        let t = Flip.getState(n),
            a = Flip.getState(l);
        d.appendChild(n), d.appendChild(l), gsap.delayedCall(.001, (() => {
            Flip.from(t, {
                duration: .9
            }), Flip.from(a, {
                duration: .9
            })
        })), videoModalOpen = !1
    }
    let t = document.querySelector("[data-video-open]"),
        a = document.querySelectorAll("[data-video-close]"),
        r = document.querySelector(".video-wrap"),
        o = r.querySelector("[data-vimeo-player-target]"),
        i = r.querySelector(".bg"),
        n = document.querySelector(".hero-vid-bg"),
        l = document.querySelector(".hero-vid-wrap"),
        s = document.querySelector(".video-player__wrap"),
        c = s.querySelector(".video-player"),
        u = s.querySelector(".single-vimeo-player"),
        d = document.querySelector(".home-hero-vid"),
        p = document.querySelector(".hero-vid-info"),
        g = p.querySelector(".eyebrow"),
        m = d.querySelector(".home-vid-star").querySelectorAll("rect");
    setContainerHeight(), window.addEventListener("resize", debounce(setContainerHeight, 150));
    let f = gsap.timeline({
            paused: !0
        }).set(r, {
            display: "flex"
        }).set(u, {
            opacity: 0
        }).to(p, {
            autoAlpha: 0
        }).to(m, {
            height: 0
        }, "<").fromTo(i, {
            opacity: 0
        }, {
            opacity: .75
        }, "<").to(l, {
            autoAlpha: 0,
            duration: .5
        }).set(u, {
            opacity: 1
        }, "<"),
        y = gsap.timeline({
            paused: !0
        }).to(i, {
            opacity: 0
        }).to(u, {
            opacity: 0,
            duration: .25
        }, "<").to(l, {
            autoAlpha: 1
        }, "<").set(r, {
            display: "none"
        }).to(p, {
            autoAlpha: 1,
            duration: .5
        }).to(m, {
            height: "100%"
        }, "<+=0.25").to(l, {
            autoAlpha: 1,
            duration: .001,
            overwrite: "auto",
            clearProps: !0
        });
    t.addEventListener("click", (() => {
        let e = Flip.getState(n),
            t = Flip.getState(l);
        f.play(0), videoModalOpen = !0, s.appendChild(n), c.appendChild(l), gsap.delayedCall(.001, (() => {
            Flip.from(e, {
                duration: 1.2
            }), Flip.from(t, {
                duration: 1.2,
                onComplete: () => {
                    isTouchScreendevice() || vimeoPlayerPlay(o, Object.values(vimeoPlayers)[0])
                }
            })
        }))
    })), a.forEach((t => {
        t.addEventListener("click", (() => {
            e()
        }))
    })), document.addEventListener("keydown", (t => {
        "Escape" === t.key && videoModalOpen && e()
    })), d.addEventListener("mouseenter", (() => {
        gsap.to(g, {
            scrambleText: {
                text: "play reel",
                chars: "lowercase",
                speed: .8
            }
        })
    })), d.addEventListener("mouseleave", (() => {
        gsap.to(g, {
            scrambleText: {
                text: originalText,
                chars: "lowercase"
            }
        })
    }))
}

function initVideos() {
    document.querySelectorAll("[data-vimeo-player-target]").forEach(((e, t) => {
        let a = "vimeo-player-index-" + t;
        e.id = a;
        const r = new Vimeo.Player(e);
        let o;
        vimeoPlayers[a] = r, r.on("play", (() => {
            e.setAttribute("data-vimeo-status-loaded", "true")
        })), "false" === e.getAttribute("data-vimeo-player-autoplay") ? (r.setVolume(1), r.pause()) : (r.setVolume(0), e.setAttribute("data-vimeo-status-muted", "true"), "false" === e.getAttribute("data-vimeo-status-paused-by-user") && gsap.timeline({
            scrollTrigger: {
                trigger: e,
                start: "0% 100%",
                end: "100% 0%",
                toggleActions: "play none none none",
                markers: !1,
                onEnter: () => vimeoPlayerPlay(e, r),
                onLeave: () => vimeoPlayerPause(e, r),
                onEnterBack: () => vimeoPlayerPlay(e, r),
                onLeaveBack: () => vimeoPlayerPause(e, r)
            }
        })), e.querySelectorAll('[data-vimeo-control="play"]').forEach((t => {
            t.addEventListener("click", (() => {
                "true" === e.getAttribute("data-vimeo-status-muted") ? r.setVolume(0) : r.setVolume(1), vimeoPlayerPlay(e, r)
            }))
        })), e.querySelectorAll('[data-vimeo-control="pause"]').forEach((t => {
            t.addEventListener("click", (() => {
                vimeoPlayerPause(e, r), "true" === e.getAttribute("data-vimeo-player-autoplay") && (e.setAttribute("data-vimeo-status-paused-by-user", "true"), tl && tl.kill())
            }))
        })), r.getDuration().then((t => {
            const a = secondsTimeSpanToHMS(t),
                r = e.querySelector(".vimeo-duration .duration");
            r && (r.textContent = a), e.querySelectorAll('[data-vimeo-control="timeline"], progress').forEach((e => {
                e.max = t
            }))
        })), e.querySelectorAll('[data-vimeo-control="timeline"]').forEach((t => {
            t.addEventListener("input", (function() {
                r.setCurrentTime(parseFloat(t.value));
                const a = e.querySelector("progress");
                a && (a.value = t.value)
            }))
        })), r.on("timeupdate", (function(t) {
            const a = secondsTimeSpanToHMS(Math.trunc(t.seconds)),
                r = e.querySelector(".vimeo-duration .time");
            r && (r.textContent = a), e.querySelectorAll('[data-vimeo-control="timeline"], progress').forEach((e => {
                e.value = t.seconds
            }))
        })), document.addEventListener("mousemove", (function() {
            clearTimeout(o), e.setAttribute("data-vimeo-status-hover", "true"), o = setTimeout((() => {
                e.setAttribute("data-vimeo-status-hover", "false")
            }), 3e3)
        })), r.on("timeupdate", (t => {
            const a = secondsTimeSpanToHMS(Math.trunc(t.seconds)),
                r = e.querySelector(".vimeo-duration .time");
            r && (r.textContent = a), e.querySelectorAll('[data-vimeo-control="timeline"], progress').forEach((e => {
                e.value = t.seconds
            }))
        })), r.on("ended", (() => {
            let t = document.querySelector("[data-video-close]");
            e.setAttribute("data-vimeo-status-activated", "false"), e.setAttribute("data-vimeo-status-play", "false"), r.unload(), t.click()
        }))
    }))
}

function vimeoPlayerPlay(e, t) {
    e.setAttribute("data-vimeo-status-activated", "true"), e.setAttribute("data-vimeo-status-play", "true"), t.play()
}

function vimeoPlayerPause(e, t) {
    e.setAttribute("data-vimeo-status-play", "false"), t.pause()
}

function secondsTimeSpanToHMS(e) {
    e -= 3600 * Math.floor(e / 3600);
    const t = Math.floor(e / 60);
    return t + ":" + ((e -= 60 * t) < 10 ? "0" + e : e)
}

function initOsmoBasicFormValidation() {
    function e() {
        return (new Date).getTime() - i < 5e3
    }

    function t() {
        let e = !0,
            t = null;
        return l.forEach((function(o) {
            const i = o.querySelector("input, textarea");
            i && (r(o), i.__validationStarted = !0, a(o) || (e = !1, t || (t = i)))
        })), !e && t && t.focus(), e
    }

    function a(e) {
        const t = e.querySelector("input, textarea");
        if (!t) return !1;
        let a = !0;
        const r = parseInt(t.getAttribute("min")) || 0,
            o = parseInt(t.getAttribute("max")) || 1 / 0,
            i = t.value.trim(),
            n = i.length;
        return "email" === t.type ? a = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i) : (t.hasAttribute("min") && n < r && (a = !1), t.hasAttribute("max") && n > o && (a = !1)), a
    }

    function r(e) {
        const t = e.querySelector("input, textarea");
        t && (t.value.trim() ? e.classList.add("is--filled") : e.classList.remove("is--filled"), a(e) ? (e.classList.add("is--success"), e.classList.remove("is--error")) : (e.classList.remove("is--success"), e.classList.add("is--error")))
    }
    const o = document.querySelector("[data-form-validate]"),
        i = (new Date).getTime();
    if (!o) return;
    const n = o.querySelector("form");
    if (!n) return;
    const l = n.querySelectorAll("[data-validate]"),
        s = n.querySelector("[data-submit]");
    if (!s) return;
    const c = s.querySelector('input[type="submit"]');
    c && (l.forEach((function(e) {
        const t = e.querySelector("input, textarea");
        t && (t.__validationStarted = !1, t.addEventListener("input", (function() {
            const o = t.value.trim().length,
                i = parseInt(t.getAttribute("min")) || 0,
                n = parseInt(t.getAttribute("max")) || 1 / 0;
            t.__validationStarted || ("email" === t.type ? a(e) && (t.__validationStarted = !0) : (t.hasAttribute("min") && o >= i || t.hasAttribute("max") && o <= n) && (t.__validationStarted = !0)), t.__validationStarted && r(e)
        })), t.addEventListener("blur", (function() {
            t.__validationStarted = !0, r(e)
        })))
    })), s.addEventListener("click", (function() {
        if (t()) {
            if (e()) return void alert("Form submitted too quickly. Please try again.");
            c.click()
        }
    })), n.addEventListener("keydown", (function(a) {
        if ("Enter" === a.key && "TEXTAREA" !== a.target.tagName && (a.preventDefault(), t())) {
            if (e()) return void alert("Form submitted too quickly. Please try again.");
            c.click()
        }
    })))
}

function initParallax(e) {
    e.querySelectorAll('[data-parallax="trigger"]').forEach((e => {
        const t = e.getAttribute("data-parallax-direction") || "vertical",
            a = parseFloat(e.getAttribute("data-parallax-scrub")) || !0,
            r = parseFloat(e.getAttribute("data-parallax-start")) || -5,
            o = parseFloat(e.getAttribute("data-parallax-end")) || 20,
            i = e.getAttribute("data-parallax-scroll-start") || "top bottom",
            n = e.getAttribute("data-parallax-scroll-end") || "bottom top",
            l = e.querySelector('[data-parallax="target"]') || e,
            s = "horizontal" === t ? "xPercent" : "yPercent";
        gsap.fromTo(l, {
            [s]: r
        }, {
            [s]: o,
            ease: "none",
            scrollTrigger: {
                trigger: e,
                start: i,
                end: n,
                scrub: a
            }
        })
    }))
}

function initPricingCards(e) {
    let t = e.querySelector('[data-price="card-main"]'),
        a = t.querySelector('[data-price="sub"]'),
        r = t.querySelector('[data-price="note"]'),
        o = t.querySelectorAll('[data-price="h"]'),
        i = t.querySelectorAll('[data-price="button"]'),
        n = t.querySelector("[data-subscription-button]"),
        l = "quarter",
        s = a.textContent,
        c = r.textContent,
        u = a.getAttribute("data-alt-text"),
        d = r.getAttribute("data-alt-text"),
        p = gsap.timeline();
    i.forEach((e => {
        e.addEventListener("click", (() => {
            let g = e.getAttribute("data-price-state");
            "annual" === g && g != l ? (() => {
                p.clear(), l = "annual", i[0].classList.remove("active"), i[1].classList.add("active"), t.classList.add("active");
                let e = n.getAttribute("href"),
                    s = e.includes("?") ? e.split("?")[0] : e;
                n.setAttribute("href", `${s}?type=annual`), p.fromTo(o, {
                    yPercent: 0
                }, {
                    yPercent: -100
                }).to(a, {
                    scrambleText: {
                        text: u,
                        speed: .75
                    },
                    duration: 1
                }, "<").to(r, {
                    scrambleText: {
                        text: d,
                        speed: .75
                    },
                    duration: 1
                }, "<")
            })() : (() => {
                p.clear(), l = "quarter", i[1].classList.remove("active"), i[0].classList.add("active"), t.classList.remove("active");
                let e = n.getAttribute("href"),
                    u = e.includes("?") ? e.split("?")[0] : e;
                n.setAttribute("href", u), p.to(o, {
                    yPercent: 0
                }).to(a, {
                    scrambleText: {
                        text: s,
                        speed: .75
                    },
                    duration: 1
                }, "<").to(r, {
                    scrambleText: {
                        text: c,
                        speed: .75
                    },
                    duration: 1
                }, "<")
            })()
        }))
    }));
    let g = e.querySelector('[data-price="card-life"]'),
        m = g.querySelectorAll('[data-price-overlay="trigger"]'),
        f = g.querySelector('[data-price-overlay="main"]'),
        y = g.querySelector('[data-price-overlay="overlay"]'),
        v = y.querySelectorAll(".single-line"),
        b = !1,
        h = gsap.timeline();
    m.forEach((e => {
        e.addEventListener("click", (() => {
            b ? (b = !1, g.setAttribute("data-card-state", "default"), h.clear(), h.to(v, {
                y: "120%",
                overwrite: "auto",
                stagger: {
                    each: .01,
                    from: "end"
                }
            }).to(f, {
                autoAlpha: 1,
                duration: .5
            }, "<+=0.5").set(y, {
                autoAlpha: 0
            })) : (b = !0, g.setAttribute("data-card-state", "overlay"), h.clear(), h.to(f, {
                autoAlpha: 0,
                duration: .5
            }).set(y, {
                autoAlpha: 1
            }, .1).fromTo(v, {
                y: "120%"
            }, {
                y: "0%",
                stagger: .03,
                overwrite: "auto"
            }, "<+=0.1"))
        }))
    }))
}

function initFooterLogo(e) {
    let t = e.querySelector(".footer-logo"),
        a = t.querySelectorAll(".footer-logo-letter"),
        r = t.querySelector("#footer-icon");
    gsap.set([r, a], {
        transformOrigin: "center center"
    }), gsap.timeline({
        defaults: {
            duration: 1
        },
        scrollTrigger: {
            trigger: t,
            start: "40% bottom",
            once: !0
        }
    }).from(r, {
        autoAlpha: 0,
        rotate: -90,
        duration: 1.3
    }).from(a, {
        x: "5em",
        autoAlpha: 0,
        stagger: .1
    }, "<")
}

function initMobileMenu() {
    let e = document.querySelector(".nav-menu"),
        t = document.querySelectorAll("[data-nav-button]"),
        a = e.querySelectorAll("[data-menu-reveal]"),
        r = document.querySelector(".menu-bg"),
        o = gsap.timeline();
    const i = () => {
        menuOpen = !1, menuButton.classList.remove("close"), document.body.setAttribute("data-nav-status", "closed"), o.clear().to(e, {
            yPercent: -120
        }).to(r, {
            autoAlpha: 0
        }, "<").to(t, {
            autoAlpha: 1,
            y: "0em",
            stagger: {
                each: .05,
                from: "end"
            }
        }, "<+=0.2").set(e, {
            display: "none"
        })
    };
    menuButton.addEventListener("click", (() => {
        menuOpen ? i() : (menuOpen = !0, menuButton.classList.add("close"), document.body.setAttribute("data-nav-status", "open"), o.clear().set([e, r], {
            display: "block"
        }).fromTo(r, {
            autoAlpha: 0
        }, {
            autoAlpha: 1
        }).fromTo(t, {
            autoAlpha: 1,
            y: "0em"
        }, {
            autoAlpha: 0,
            y: "-3em",
            stagger: .01
        }, "<").fromTo(e, {
            yPercent: -120
        }, {
            yPercent: 0
        }, "<+=0.2").fromTo(a, {
            autoAlpha: 0,
            yPercent: 50
        }, {
            autoAlpha: 1,
            yPercent: 0,
            stagger: .05
        }, "<+=0.25"))
    })), r.addEventListener("click", (() => {
        i()
    }))
}

function initBasicFormValidation(e) {
    e.querySelectorAll("[data-form-validate]").forEach((e => {
        const t = e.querySelectorAll("[data-validate] input, [data-validate] textarea"),
            a = e.querySelector("[data-submit]"),
            r = a.querySelector('input[type="submit"]'),
            o = (new Date).getTime(),
            i = e => {
                const t = e.closest("[data-validate]"),
                    a = e.getAttribute("min"),
                    r = e.getAttribute("max"),
                    o = e.getAttribute("type");
                let i = !0;
                return "" !== e.value.trim() ? t.classList.add("is--filled") : t.classList.remove("is--filled"), a && e.value.length < a && (i = !1), r && e.value.length > r && (i = !1), "email" !== o || /\S+@\S+\.\S+/.test(e.value) || (i = !1), i ? (t.classList.remove("is--error"), t.classList.add("is--success")) : (t.classList.remove("is--success"), t.classList.add("is--error")), i
            },
            n = () => {
                let e = !0,
                    a = null;
                return t.forEach((t => {
                    const r = i(t);
                    r || a || (a = t), r || (e = !1), (e => {
                        e.addEventListener("input", (function() {
                            i(e)
                        }))
                    })(t)
                })), a && a.focus(), e
            },
            l = () => ((new Date).getTime() - o) / 1e3 < 5;
        a.addEventListener("click", (function() {
            if (n()) {
                if (l()) return void alert("Form submitted too quickly. Please try again.");
                r.click()
            }
        })), e.addEventListener("keydown", (function(e) {
            if ("Enter" === e.key && (e.preventDefault(), n())) {
                if (l()) return void alert("Form submitted too quickly. Please try again.");
                r.click()
            }
        }))
    }))
}

function initUpdatesPage(e) {
    const t = e.querySelector("[data-updates-count]"),
        a = e.querySelector("[data-updates-time]"),
        r = e.querySelectorAll("[data-video-on-hover]"),
        o = e.querySelectorAll("[data-date]");
    t && (t.innerText = r.length), o.forEach((e => {
        const t = e.textContent.trim();
        e.innerText = (e => {
            const t = new Date(e);
            if (isNaN(t.getTime())) return "Invalid date";
            const a = new Date;
            t.setHours(0, 0, 0, 0), a.setHours(0, 0, 0, 0);
            const r = a - t,
                o = Math.floor(r / 864e5);
            if (0 === o) return "Today";
            if (o < 7) return `${o} day${o>1?"s":""} ago`; {
                const e = Math.floor(o / 7);
                return `${e} week${e>1?"s":""} ago`
            }
        })(t)
    })), a.innerText = o[0].textContent
}

function initRandomItems(e) {
    const t = e.querySelectorAll("[data-randomize-list]");
    t.length < 1 || t.forEach((e => {
        const t = e.querySelectorAll("[data-randomize='item']"),
            a = t[Math.floor(Math.random() * t.length)];
        t.forEach((e => {
            e !== a && e.remove(), ScrollTrigger.refresh()
        }))
    }))
}

function initHomeDashboard(e) {
    function t() {
        c.setAttribute("data-notification-status", "active"), u && clearTimeout(u), u = setTimeout((() => {
            c.setAttribute("data-notification-status", "not-active"), u = null
        }), 2e3)
    }
    let a = e.querySelector(".db-container"),
        r = a.querySelector(".db-wrapper"),
        o = r.querySelector(".db-search"),
        i = r.querySelector(".db-side"),
        n = r.querySelectorAll(".db-content__card"),
        l = r.querySelectorAll("[data-db-el]"),
        s = r.querySelectorAll("[data-db-note-trigger]"),
        c = r.querySelector('[data-notification="home-db"]'),
        u = null;
    gsap.set(l, {
        autoAlpha: 0
    }), gsap.set(a, {
        pointerEvents: "none"
    }), gsap.timeline({
        scrollTrigger: {
            trigger: a,
            start: "top bottom",
            end: "bottom bottom+=15%",
            scrub: !0
        },
        defaults: {
            ease: "none"
        },
        onComplete: () => {
            d.play(0)
        }
    }).from(r, {
        rotateX: "20deg",
        z: "-20em"
    }).from(o, {
        z: "40em",
        autoAlpha: 0
    }, "<").from(i, {
        z: "35em",
        autoAlpha: 0
    }, "<").from(n, {
        z: e => 35 - 5 * e + "em",
        stagger: .01
    }, "<").to(l, {
        autoAlpha: 0,
        duration: .01
    }, 0).set(a, {
        pointerEvents: "none"
    });
    let d = gsap.timeline({
        paused: !0,
        defaults: {
            duration: .8
        },
        onComplete: () => {
            gsap.set(a, {
                pointerEvents: "auto"
            })
        }
    });
    d.to([i, o, n], {
        z: "4em",
        borderColor: "rgba(239, 238, 236, 0.65)",
        boxShadow: "0 2px 40px 0 hsla(10.95890410958904, 100.00%, 57.06%, 0.25)",
        stagger: .1,
        ease: "power1.inOut",
        duration: .35
    }).to([i, o, n], {
        z: "0em",
        borderColor: "rgba(239, 238, 236, 0.08)",
        boxShadow: "0 0px 00px 0 hsla(10.95890410958904, 100.00%, 57.06%, 0)",
        stagger: staggerDefault,
        ease: "power3.out"
    }, .35).to(l, {
        autoAlpha: 1,
        stagger: .03,
        duration: .5
    }, "<"), s.forEach((e => {
        e.addEventListener("click", t)
    })), document.addEventListener("keydown", (e => {
        const a = e.target.tagName.toLowerCase();
        "input" === a || "textarea" === a || e.target.isContentEditable || !e.metaKey && !e.ctrlKey || "e" !== e.key && "k" !== e.key || (e.preventDefault(), t())
    }))
}

function initPlayVideoHover(e) {
    e.querySelectorAll("[data-video-on-hover]").forEach((e => {
        let t = e.getAttribute("data-video-src"),
            a = e.querySelector("video");
        "" !== t && (e.addEventListener("mouseenter", (() => {
            "" === a.getAttribute("src") && a.setAttribute("src", t), e.setAttribute("data-video-on-hover", "active"), a.play()
        })), e.addEventListener("mouseleave", (() => {
            e.setAttribute("data-video-on-hover", "not-active"), setTimeout((() => {
                a.pause(), a.currentTime = 0
            }), 200)
        })))
    }))
}

function initSliders(e) {
    gsap.utils.toArray(e.querySelectorAll('[data-slider="list"]')).forEach((e => {
        function t() {
            c || (c = gsap.delayedCall(4, r))
        }

        function a() {
            c && c.kill(), c = null
        }

        function r() {
            u.next({
                ease: "osmo-ease",
                duration: .725
            }), c = gsap.delayedCall(4, r)
        }
        const o = gsap.utils.toArray(e.querySelectorAll('[data-slider="slide"]')),
            i = e.closest(".section"),
            n = i ? gsap.utils.toArray(i.querySelectorAll('[data-slider="button"]')) : [];
        let l, s, c;
        const u = horizontalLoop(o, {
            paused: !0,
            draggable: !0,
            center: !0,
            onChange: (e, t) => {
                l && l.classList.remove("active"), e.classList.add("active"), l = e, n.length > 0 && (s && s.classList.remove("active"), n[t].classList.add("active"), s = n[t])
            }
        });
        u.toIndex(3, {
            ease: "linear",
            duration: .1
        }), ScrollTrigger.create({
            trigger: e,
            start: "top 75%",
            once: !0,
            onEnter: () => {
                u.toIndex(4, {
                    ease: "osmo-ease",
                    duration: .725
                })
            }
        }), ScrollTrigger.create({
            trigger: e,
            start: "top bottom",
            end: "bottom top",
            onEnter: t,
            onLeave: a,
            onEnterBack: t,
            onLeaveBack: a
        }), [e].forEach((r => {
            r && (r.addEventListener("mouseenter", a), r.addEventListener("mouseleave", (() => {
                ScrollTrigger.isInViewport(e) && t()
            })))
        })), o.forEach(((e, t) => e.addEventListener("click", (() => u.toIndex(t, {
            ease: "osmo-ease",
            duration: .725
        }))))), n.length > 0 && n.forEach(((e, t) => {
            e.addEventListener("click", (() => {
                u.toIndex(t, {
                    ease: "osmo-ease",
                    duration: .725
                }), s && s.classList.remove("active"), e.classList.add("active"), s = e
            }))
        }))
    }))
}

function horizontalLoop(e, t) {
    let a;
    return e = gsap.utils.toArray(e), t = t || {}, gsap.context((() => {
        function r(e, t) {
            t = t || {}, Math.abs(e - y) > u / 2 && (e += e > y ? -u : u);
            let a = gsap.utils.wrap(0, u, e),
                r = p[a];
            return r > c.time() != e > y && e !== y && (r += c.duration() * (e > y ? 1 : -1)), (r < 0 || r > c.duration()) && (t.modifiers = {
                time: i
            }), y = a, t.overwrite = !0, gsap.killTweensOf(n), 0 === t.duration ? c.time(i(r)) : c.tweenTo(r, t)
        }
        let o, i, n, l = t.onChange,
            s = 0,
            c = gsap.timeline({
                repeat: t.repeat,
                onUpdate: l && function() {
                    let t = c.closestIndex();
                    s !== t && (s = t, l(e[t], t))
                },
                paused: t.paused,
                defaults: {
                    ease: "none"
                },
                onReverseComplete: () => c.totalTime(c.rawTime() + 100 * c.duration())
            }),
            u = e.length,
            d = e[0].offsetLeft,
            p = [],
            g = [],
            m = [],
            f = [],
            y = 0,
            v = !1,
            b = t.center,
            h = 100 * (t.speed || 1),
            S = !1 === t.snap ? e => e : gsap.utils.snap(t.snap || 1),
            A = 0,
            q = !0 === b ? e[0].parentNode : gsap.utils.toArray(b)[0] || e[0].parentNode,
            E = () => {
                let a, r = q.getBoundingClientRect();
                e.forEach(((e, t) => {
                    g[t] = parseFloat(gsap.getProperty(e, "width", "px")), f[t] = S(parseFloat(gsap.getProperty(e, "x", "px")) / g[t] * 100 + gsap.getProperty(e, "xPercent")), a = e.getBoundingClientRect(), m[t] = a.left - (t ? r.right : r.left), r = a
                })), gsap.set(e, {
                    xPercent: e => f[e]
                }), o = e[u - 1].offsetLeft + f[u - 1] / 100 * g[u - 1] - d + m[0] + e[u - 1].offsetWidth * gsap.getProperty(e[u - 1], "scaleX") + (parseFloat(t.paddingRight) || 0)
            },
            x = () => {
                A = b ? c.duration() * (q.offsetWidth / 2) / o : 0, b && p.forEach(((e, t) => {
                    p[t] = i(c.labels["label" + t] + c.duration() * g[t] / 2 / o - A)
                }))
            },
            L = (e, t, a) => {
                let r, o = e.length,
                    i = 1e10,
                    n = 0;
                for (; o--;) r = Math.abs(e[o] - t), r > a / 2 && (r = a - r), r < i && (i = r, n = o);
                return n
            },
            T = () => {
                let t, a, r, n, l;
                for (c.clear(), t = 0; t < u; t++) a = e[t], r = f[t] / 100 * g[t], n = a.offsetLeft + r - d + m[0], l = n + g[t] * gsap.getProperty(a, "scaleX"), c.to(a, {
                    xPercent: S((r - l) / g[t] * 100),
                    duration: l / h
                }, 0).fromTo(a, {
                    xPercent: S((r - l + o) / g[t] * 100)
                }, {
                    xPercent: f[t],
                    duration: (r - l + o - r) / h,
                    immediateRender: !1
                }, l / h).add("label" + t, n / h), p[t] = n / h;
                i = gsap.utils.wrap(0, c.duration())
            },
            w = e => {
                let t = c.progress();
                c.progress(0, !0), E(), e && T(), x(), e && c.draggable ? c.time(p[y], !0) : c.progress(t, !0)
            },
            k = () => w(!0);
        if (gsap.set(e, {
                x: 0
            }), E(), T(), x(), window.addEventListener("resize", k), c.toIndex = (e, t) => r(e, t), c.closestIndex = e => {
                let t = L(p, c.time(), c.duration());
                return e && (y = t, v = !1), t
            }, c.current = () => v ? c.closestIndex(!0) : y, c.next = e => r(c.current() + 1, e), c.previous = e => r(c.current() - 1, e), c.times = p, c.progress(1, !0).progress(0, !0), t.reversed && (c.vars.onReverseComplete(), c.reverse()), t.draggable && "function" == typeof Draggable) {
            n = document.createElement("div");
            let t, a, r, l, s, u, d = gsap.utils.wrap(0, 1),
                g = () => c.progress(d(a + (r.startX - r.x) * t)),
                m = () => c.closestIndex(!0);
            r = Draggable.create(n, {
                trigger: e[0].parentNode,
                type: "x",
                onPressInit() {
                    let e = this.x;
                    gsap.killTweensOf(c), u = !c.paused(), c.pause(), a = c.progress(), w(), t = 1 / o, s = a / -t - e, gsap.set(n, {
                        x: a / -t
                    })
                },
                onDrag: g,
                onThrowUpdate: g,
                overshootTolerance: 0,
                inertia: !0,
                snap(e) {
                    if (Math.abs(a / -t - this.x) < 10) return l + s;
                    let r = -e * t * c.duration(),
                        o = i(r),
                        n = p[L(p, o, c.duration())] - o;
                    return Math.abs(n) > c.duration() / 2 && (n += n < 0 ? c.duration() : -c.duration()), l = (r + n) / c.duration() / -t, l
                },
                onRelease() {
                    m(), r.isThrowing && (v = !0)
                },
                onThrowComplete: () => {
                    m(), u && c.play()
                }
            })[0], c.draggable = r
        }
        return c.closestIndex(!0), s = y, l && l(e[y], y), a = c, () => window.removeEventListener("resize", k)
    })), a
}

function initFlipButtons(e) {
    e.querySelectorAll('[data-flip-button="wrap"]').forEach((e => {
        let t = e.querySelectorAll('[data-flip-button="button"]'),
            a = e.querySelector('[data-flip-button="bg"]');
        t.forEach((function(t) {
            t.addEventListener("mouseenter", (function() {
                const e = Flip.getState(a);
                this.appendChild(a), Flip.from(e, {
                    duration: .4
                })
            })), t.addEventListener("focus", (function() {
                const e = Flip.getState(a);
                this.appendChild(a), Flip.from(e, {
                    duration: .4
                })
            })), t.addEventListener("mouseleave", (function() {
                const t = Flip.getState(a);
                e.querySelector(".active").appendChild(a), Flip.from(t, {
                    duration: .4
                })
            })), t.addEventListener("blur", (function() {
                const t = Flip.getState(a);
                e.querySelector(".active").appendChild(a), Flip.from(t, {
                    duration: .4
                })
            }))
        }))
    }))
}

function initTabSystem(e) {
    e.querySelectorAll('[data-tabs="wrapper"]').forEach((e => {
        function t(e, t = !1) {
            if (!t && (s || a[e] === i)) return;
            s = !0;
            const c = n,
                u = r[e],
                d = l,
                p = o[e];
            let g = c.querySelectorAll(".single-line") || [],
                m = u.querySelectorAll(".single-line");
            const f = gsap.timeline({
                defaults: {
                    duration: .5,
                    ease: "power2.inOut"
                },
                onComplete: () => {
                    t || (c && c.classList.remove("active"), d && d.classList.remove("active")), n = u, l = p, s = !1
                }
            });
            u.classList.add("active"), p.classList.add("active"), f.to(g, {
                y: "-120%",
                stagger: .01
            }, 0).to(d, {
                autoAlpha: 0,
                xPercent: 3
            }, 0).fromTo(m, {
                y: "120%"
            }, {
                y: "0%",
                stagger: .075
            }, .3).fromTo(p, {
                autoAlpha: 0,
                xPercent: 3
            }, {
                autoAlpha: 1,
                xPercent: 0
            }, "<");
            let y = d.querySelector("video");
            y && !y.paused && y.pause();
            let v = p.querySelector("video");
            v && "video" === p.dataset.tabsContent && (!v.src && v.dataset.src && (v.src = v.dataset.src, v.load()), v.play()), i && i.classList.remove("active"), a[e].classList.add("active"), i = a[e]
        }
        let a = e.querySelector('[data-tabs="nav"]').querySelectorAll('[data-tabs="button"]'),
            r = e.querySelector('[data-tabs="content-wrap"]').querySelectorAll('[data-tabs="content-item"]'),
            o = e.querySelector('[data-tabs="visual-wrap"]').querySelectorAll('[data-tabs="visual-item"]'),
            i = a[0],
            n = r[0],
            l = o[0],
            s = !1;
        ScrollTrigger.create({
            trigger: e,
            start: "top-=50% bottom",
            onEnter: () => {
                let e = o[0];
                if (e && "video" === e.dataset.tabsContent) {
                    let t = e.querySelector("video");
                    t && (!t.src && t.dataset.src && (t.src = t.dataset.src, t.load()), t.play())
                }
            }
        }), t(0, !0), a.forEach(((e, a) => {
            e.addEventListener("click", (() => t(a)))
        })), r[0].classList.add("active"), o[0].classList.add("active"), a[0].classList.add("active")
    }));
    let t = e.querySelector("[data-easteregg]");
    if (t) {
        let e = t.parentElement,
            a = e.querySelector('[data-notification="home-slack"]'),
            r = e.querySelector(".slack-overlay");
        t.addEventListener("click", (() => {
            a.setAttribute("data-notification-status", "active"), gsap.fromTo(r, {
                opacity: 0
            }, {
                opacity: .35,
                duration: .4
            })
        }));
        let o = t.querySelector("input");
        o && o.addEventListener("blur", (() => {
            a.setAttribute("data-notification-status", "inactive"), gsap.to(r, {
                opacity: 0,
                duration: .4
            })
        }))
    }
}

function initStartTextScroll(e) {
    let t = e.querySelector("[data-start-wrap]"),
        a = t.querySelectorAll("[data-start-heading]"),
        r = a[0].querySelectorAll(".single-letter"),
        o = a[1].querySelectorAll(".single-letter");
    gsap.set(o, {
        autoAlpha: 0
    }), gsap.timeline({
        scrollTrigger: {
            trigger: t,
            start: "top 95%",
            end: "top 25%",
            scrub: !0
        },
        defaults: {
            ease: "linear",
            duration: 1
        }
    }).from(r, {
        autoAlpha: 0,
        stagger: .03,
        yoyo: !0,
        repeat: 1
    }).fromTo(o, {
        autoAlpha: 0
    }, {
        autoAlpha: 1,
        stagger: .03
    }, ">-=0.1")
}

function createStackEffect(e) {
    const t = document.querySelector(e),
        a = t.querySelector(".rotate-content"),
        r = t.querySelectorAll(".rotate-card"),
        o = r.length;
    window.innerWidth;
    let i = window.innerHeight;
    gsap.set(a, {
        opacity: 0,
        transform: "rotate3d(0.75, 0, 0, 40deg) rotate3d(0, 1, 0, 35deg)"
    }), gsap.set(r, {
        z: e => -200 - 20 * e,
        rotationZ: -90
    });
    const n = gsap.timeline({
        paused: !0,
        defaults: {
            duration: awardsStackDuration
        },
        onStart: () => {
            gsap.set(a, {
                opacity: 1
            })
        }
    });
    return n.fromTo(r, {
        z: e => -.8 * i - 90 * e
    }, {
        z: e => -.9 * i + 90 * (o - e - 1)
    }, 0).fromTo(r, {
        rotationZ: -150
    }, {
        rotationZ: e => 360 - 4 * e,
        stagger: .006
    }, 0), r.forEach((e => {
        e.addEventListener("mouseenter", (() => {
            gsap.to(e, {
                x: "-2em",
                duration: .4,
                ease: "power1"
            })
        })), e.addEventListener("mouseleave", (() => {
            gsap.to(e, {
                x: "0em",
                duration: .4,
                ease: "power1"
            })
        }))
    })), n
}

function initFeaturesIcons(e) {
    e.querySelectorAll("[data-svg-src]").forEach((e => {
        const t = e.getAttribute("data-svg-src");
        e.setAttribute("data-svg-src", ""), e.innerHTML = t
    }));
    const t = e.querySelectorAll("[data-svg-copy]"),
        a = e.querySelectorAll("[data-svg-download]");
    t.forEach((e => {
        e.addEventListener("click", (() => {
            const t = e.closest("[data-svg]"),
                a = t ? .querySelector("svg");
            if (a) {
                copyToClipboard(a.outerHTML);
                const t = e.querySelector("span");
                t && (t.textContent = "Copied!");
                const r = document.querySelector('[data-notification="icon-positive"]');
                r && r.setAttribute("data-notification-status", "active"), setTimeout((() => {
                    t && (t.textContent = "Copy"), r && r.setAttribute("data-notification-status", "not-active")
                }), 2e3)
            }
        }))
    })), a.forEach((e => {
        e.addEventListener("click", (() => {
            const t = e.closest("[data-svg]"),
                a = t ? .querySelector("svg");
            a && function(e, t) {
                const a = new Blob([e], {
                        type: "image/svg+xml"
                    }),
                    r = URL.createObjectURL(a),
                    o = document.createElement("a");
                o.href = r, o.download = t, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(r)
            }(a.outerHTML, `${t.getAttribute("data-svg")||"icon"}.svg`)
        }))
    }))
}

function initFeaturesCode(e) {
    e.querySelectorAll("[data-code-copy]").forEach((e => {
        e.addEventListener("click", (() => {
            const t = e.closest(".dash-code"),
                a = t ? .querySelector("pre code");
            if (a) {
                copyToClipboard(a.textContent), e.querySelector("span").textContent = "Copied!";
                const t = document.querySelector('[data-notification="code-positive"]');
                t && t.setAttribute("data-notification-status", "active"), setTimeout((() => {
                    e.querySelector("span").textContent = "Copy", t && t.setAttribute("data-notification-status", "not-active")
                }), 2e3)
            }
        }))
    }))
}

function copyToClipboard(e) {
    navigator.clipboard.writeText(e).catch((() => {}))
}

function initAboutScroll(e) {
    let t = e.querySelector("[data-about-scroll]"),
        a = t.querySelectorAll(".about-divider-img"),
        r = t.querySelectorAll(".divider");
    gsap.timeline({
        scrollTrigger: {
            trigger: t,
            start: "top 60%",
            once: !0
        }
    }).fromTo(r, {
        scaleX: .2
    }, {
        scaleX: 1,
        duration: 1
    }).fromTo(a[0], {
        x: "20em"
    }, {
        x: "0em",
        duration: 1.2
    }, "<").fromTo(a[1], {
        x: "-20em"
    }, {
        x: "0em",
        duration: 1.2
    }, "<")
}

function initUpdatesNumber(e) {
    e.querySelectorAll("[data-updates-nr]").forEach((e => {
        e.innerText = amountOfUpdates
    }))
}

function initPlausibleCustomEvents(e) {
    e.querySelectorAll("[data-plausible]").forEach((function(e) {
        e.addEventListener("click", (function() {
            var e = this.getAttribute("data-plausible");
            plausible(e)
        }))
    }))
}

function initGeneral(e) {
    initLenis(), initPlausibleCustomEvents(e), initLenisCheckScrollUpDown(), initSplit(e), UnicornStudio.init(), initLoad(e), initTextScroll(e), initParallax(e), initCurrentYear(e), initFooterLogo(e), initBasicFormValidation(e), initUpdatesNumber(e)
}
let lenis;
gsap.registerPlugin(SplitText, CustomEase, ScrambleTextPlugin, Flip, Draggable, InertiaPlugin),
    CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");
let staggerDefault = .075,
    durationDefault = .8,
    transitionOffset = 225;
gsap.defaults({
    ease: "osmo-ease",
    duration: durationDefault
}), gsap.config({
    nullTargetWarn: !1
});
const vimeoPlayers = {};
let originalText, videoModalOpen = !1,
    infoModalOpen = !1,
    menuOpen = !1,
    menuButton = document.querySelector(".menu-button"),
    originalTextEl = document.querySelector("#reel-text");
originalTextEl && (originalText = originalTextEl.innerText);
let awardStackEffect, isMobile = window.innerWidth < 480,
    isMobileLandscape = window.innerWidth < 768,
    isTablet = window.innerWidth < 992,
    targetProgress = 0,
    smoothingDuration = .3,
    awardsStackDuration = 1.75,
    amountOfUpdates = document.querySelectorAll("[data-updates-list]").length;
initMobileMenu(), initUpdatesNumber(document), initPlausibleCustomEvents(document), barba.hooks.leave((() => {
    lenis.destroy()
})), barba.hooks.enter((e => {
    initBarbaNavUpdate(e), window.scrollTo(0, 0)
})), barba.hooks.afterEnter((e => {
    let t = e.next.container;
    e.next.namespace, ScrollTrigger.getAll().forEach((e => {
        e.kill()
    })), void 0 === Webflow.env("editor") && (lenis = new Lenis({
        duration: 1.25,
        wrapper: document.body,
        easing: e => 1 === e ? 1 : 1 - Math.pow(2, -13 * e)
    }), lenis.scrollTo(".page-w", {
        duration: .5,
        force: !0,
        lock: !0
    }), lenis.on("scroll", ScrollTrigger.update), gsap.ticker.add((e => {
        lenis.raf(1e3 * e)
    })), gsap.ticker.lagSmoothing(0)), initGeneral(t)
})), barba.init({
    debug: !1,
    preventRunning: !0,
    prevent: function({
        el: e
    }) {
        if (e.hasAttribute("data-barba-prevent")) return !0
    },
    transitions: [{
        name: "default",
        sync: !1,
        leave(e) {
            e.next.namespace, e.current.container.getAttribute("data-barba-namespace");
            const t = gsap.timeline({
                onStart: () => {
                    menuOpen && menuButton.click()
                },
                onComplete: () => {
                    e.current.container.remove()
                }
            });
            return t.to(e.current.container, {
                autoAlpha: 0,
                duration: .5
            }), t
        },
        enter(e) {
            gsap.timeline({
                onComplete: () => {
                    lenis.start()
                }
            }).from(e.next.container, {
                autoAlpha: 0,
                duration: 1
            })
        }
    }],
    views: [{
        namespace: "home",
        afterEnter(e) {
            let t = e.next.container;
            awardStackEffect = createStackEffect("[data-rotating-cards]"), initHomeDashboard(t), initPlayVideoHover(t), initFlipButtons(t), initSliders(t), initTabSystem(t), initPricingCards(t), initStartTextScroll(t), initModal(), initVideoModal(), initVideos(), initFeaturesIcons(t), initFeaturesCode(t), initAboutScroll(t), initUpdatesPage(t)
        }
    }, {
        namespace: "pricing",
        afterEnter(e) {
            let t = e.next.container;
            initFlipButtons(t), initPricingCards(t)
        }
    }, {
        namespace: "faq",
        afterEnter(e) {
            let t = e.next.container;
            initFaq(t), initFlipButtons(t)
        }
    }, {
        namespace: "newsletter",
        afterEnter(e) {
            let t = e.next.container;
            initSliders(t), initUpdatesPage(t)
        }
    }, {
        namespace: "updates",
        afterEnter(e) {
            let t = e.next.container;
            initUpdatesPage(t), initRevealScroll(t), initRandomItems(t), initPlayVideoHover(t)
        }
    }]
});
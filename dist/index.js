"use strict";(()=>{var y={init:function(){document.querySelector(".about_content")&&(window.innerWidth>=992&&this.setupInfiniteScroll(),window.addEventListener("resize",()=>{this.cleanupScroll(),window.innerWidth>=992&&this.setupInfiniteScroll()}))},setupInfiniteScroll:function(){let e=document.querySelector(".about_content"),n=document.querySelectorAll(".about_content-inner, .row.cc-about-info");if(!e||n.length===0)return;let t=document.createElement("div");t.className="infinite-scroll-container",e.appendChild(t);let r=Array.from(n).map(i=>i.cloneNode(!0)),a=Array.from(n).map(i=>i.cloneNode(!0)),u=Array.from(n).map(i=>i.cloneNode(!0));[...r,...a,...u].forEach(i=>{t.appendChild(i)}),n.forEach(i=>{i.style.display="none"}),e.style.overflow="hidden",e.style.position="relative",e.style.height="100%",t.style.position="absolute",t.style.top="0",t.style.left="0",t.style.width="100%";let s=0;a.forEach(i=>{s+=i.offsetHeight}),t.style.transform=`translateY(-${s}px)`;let l=-s,o=i=>{i.preventDefault(),l-=i.deltaY,l<-s*2?l+=s:l>0&&(l-=s),t.style.transform=`translateY(${l}px)`},c=0,d=i=>{c=i.touches[0].clientY},f=i=>{let m=i.touches[0].clientY,p=c-m;c=m,l-=p,l<-s*2?l+=s:l>0&&(l-=s),t.style.transform=`translateY(${l}px)`,i.preventDefault()};e.addEventListener("wheel",o),e.addEventListener("touchstart",d),e.addEventListener("touchmove",f),this.eventHandlers={wheel:o,touchStart:d,touchMove:f}},cleanupScroll:function(){let e=document.querySelector(".about_content"),n=document.querySelector(".infinite-scroll-container");n&&n.remove(),document.querySelectorAll(".about_content-inner, .row.cc-about-info").forEach(t=>{t.style.display=""}),e&&this.eventHandlers&&(e.removeEventListener("wheel",this.eventHandlers.wheel),e.removeEventListener("touchstart",this.eventHandlers.touchStart),e.removeEventListener("touchmove",this.eventHandlers.touchMove)),e&&(e.style.overflow="",e.style.position="",e.style.height="")}};gsap.registerPlugin(SplitText,ScrollTrigger);function x(){let e=new Swiper(".hp-work_slider-slider",{spaceBetween:1,loop:!0,speed:2e3,mousewheel:{enabled:!0,forceToAxis:!0},on:{slideChange:n=>{v(n)},init:n=>{v(n)}}})}function v(e){let n=e.realIndex,t=$(e.slides[n]),r=t.attr("data-title"),a=t.attr("data-location"),u=t.attr("data-tags");$("[data-tags-el]").text(u),$("[data-location-el]").text(a),$("[data-title-el]").text(r)}function k(){let e;if(Webflow.env("editor")===void 0){let a=function(s){e.raf(s),requestAnimationFrame(a)};var r=a;e=new Lenis({lerp:.075,wheelMultiplier:.7,gestureOrientation:"vertical",normalizeWheel:!1,smoothTouch:!1}),requestAnimationFrame(a),window.lenisInstance=e}$("[data-lenis-start]").on("click",function(){e.start()}),$("[data-lenis-stop]").on("click",function(){e.stop()}),$("[data-lenis-toggle]").on("click",function(){$(this).toggleClass("stop-scroll"),$(this).hasClass("stop-scroll")?e.stop():e.start()});let{body:n}=document;new ResizeObserver(()=>{e.resize()}).observe(n);function r(a){e.raf(a),requestAnimationFrame(r)}requestAnimationFrame(r)}function E(){if(document.documentElement.style.setProperty("--gap-size","0"),!document.querySelector(".site-frame")){let t=["top","right","bottom","left"],r=document.createElement("div");r.className="site-frame-container",t.forEach(u=>{let s=document.createElement("div");s.className=`site-frame site-frame-${u}`,r.appendChild(s)}),document.body.appendChild(r);let a=document.createElement("style");a.innerHTML=`
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
    `,document.head.appendChild(a)}let e=window.lenis||null;function n(t){t>100?gsap.to(document.documentElement,{duration:0,"--gap-size":1,ease:"power2.out"}):gsap.to(document.documentElement,{duration:0,"--gap-size":0,ease:"power2.out"})}e?e.on("scroll",({scroll:t})=>{n(t)}):$(window).scroll(function(){n($(this).scrollTop())})}function w(e){window.lenisInstance&&(e===!0?window.lenisInstance.stop():window.lenisInstance.start())}function C(){$(".nav_meta-col").each(function(){let e=$(this).find("a"),n=$(this).find("p");g(e),g(n),gsap.fromTo($(".nav_mode"),{scale:0},{scale:1})}),$(".hp-hero_content-block").each(function(){let e=gsap.timeline();g($(this).find("p").eq(0)),e.fromTo($(this).find("li"),{opacity:0,xPercent:-5},{opacity:1,xPercent:0,stagger:.2})}),$(".hp-hero_content-visual").each(function(){gsap.set($(this),{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"}),gsap.to($(this),{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"power3.inOut"})})}function S(){var e=gsap.timeline({});let n=".work-d_hero-wrap.cc-images .work-d_hero-list",t=".work-d_hero-wrap.cc-images .work-d_hero-list-item",r=".work-d_hero-wrap.cc-images img",a=".work-d_hero-timeline";e.set([a],{y:"0vh",rotate:.001},"<"),e.set(a,{opacity:0},"<"),e.set(t,{scale:.5,rotate:.001},"<"),e.set(r,{rotate:.001,scale:1.4},"<"),e.to(n,{duration:2.2,ease:"Power4.easeOut",rotate:.001,y:0,clearProps:"all",delay:0,onComplete:()=>{g($('[data-split="work-heading"]'))}},"<"),e.to(t,{duration:2,ease:"Expo.easeInOut",rotate:.001,scale:1,y:"0px",clearProps:"all"},"< 1.2"),e.to(r,{duration:2.1,ease:"Expo.easeInOut",rotate:.001,scale:1,clearProps:"all"},"<"),e.to(a,{duration:2.1,ease:"Expo.easeInOut",rotate:.001,y:0,opacity:1,clearProps:"all"},"<")}function T(){let e=$(".work-d_hero-part.cc-images");gsap.timeline({scrollTrigger:{trigger:e,start:"top top",end:"bottom bottom",scrub:1,markers:!0}}).to(".work-d_hero-timeline-inner",{y:()=>{let t=$(".work-d_hero-timeline").height(),r=$(".work-d_hero-timeline_item").first().outerHeight(!0);return-(t-r)+"px"}}),$(".work-d_hero-timeline_item").on("click",function(){let t=$(this).index(),a=$(".work-d_hero-list-item").eq(t).offset().top-1.6*parseFloat(getComputedStyle(document.documentElement).fontSize);lenisInstance.scrollTo(a,{duration:1.2,easing:u=>Math.min(1,1.001-Math.pow(2,-10*u))})})}function _(){let e=$(".work-d_content-part_icon"),n=gsap.timeline({scrollTrigger:{trigger:e}});n.from(e,{scale:0}),n.from(e.find("svg"),{scale:0,delay:.2},"<")}function g(e){let n={lines:{duration:.8,stagger:.08},words:{duration:.6,stagger:.06},chars:{duration:.4,stagger:.01}};$(e).each(function(){let t=$(this);setTimeout(function(){let r=t.data("split-reveal")||"lines",a=r==="lines"?["lines"]:r==="words"?["lines","words"]:["lines","words","chars"];t[0].offsetHeight;try{let s=new SplitText(t[0],{type:a.join(", "),mask:"lines",linesClass:"line",wordsClass:"word",charsClass:"letter"})[r];if(!s||s.length===0){console.warn("No split targets found for",t);return}gsap.set(s,{yPercent:110}),t[0].offsetHeight;let l=n[r],o=t.data("trigger-type")||"load";gsap.set(t,{visibility:"visible",opacity:1}),o==="scroll"?gsap.to(s,{yPercent:0,duration:l.duration,stagger:l.stagger,ease:"expo.out",scrollTrigger:{trigger:t[0],start:"clamp(top 80%)",once:!0,markers:t.data("debug-markers")==="true"}}):gsap.to(s,{yPercent:0,duration:l.duration,stagger:l.stagger,ease:"expo.out",delay:.2})}catch(u){console.error("Error in SplitText:",u)}},50)})}function H(){x(),E(),k(),document.fonts.ready.then(function(){g('[data-split="heading"]')})}function I(){C()}function L(){T(),S(),_()}function P(){y.init()}$(document).ready(function(){let e=$('[data-barba="container"]').data("barba-namespace");b(e),q()});function b(e){console.log("Running init functions for namespace:",e),H(),e==="home"?I():e==="work"?L():e==="about"&&P()}function q(){t();let e=null,n=null;barba.init({wrapper:"#barba-wrapper",container:".barba-container",timeout:7e3,prefetchIgnore:!0,transitions:[r(),a()]});function t(){let o=document.createElement("style");o.innerHTML=`
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
    `,document.head.appendChild(o)}function r(){return{name:"home-to-work",from:{namespace:"home"},to:{namespace:"work"},custom:({trigger:o})=>$(o).closest(".work_slider-item").length>0,before(o){document.documentElement.classList.add("is-animating")},beforeLeave(o){w(!0),u(o.trigger)},leave(o){return s(o.current.container)},beforeEnter(o){window.scrollTo(0,0),gsap.set(o.next.container,{opacity:0,visibility:"visible"})},after(o){l(o.next.container);let c=o.next.container.dataset.barbaNamespace;b(c),w(!1),document.documentElement.classList.remove("is-animating")}}}function a(){return{name:"default-transition",before(o){document.documentElement.classList.add("is-animating")},beforeLeave(o){w(!0)},leave(o){return gsap.to(o.current.container,{opacity:0,duration:.5})},beforeEnter(o){window.scrollTo(0,0)},enter(o){return gsap.to(o.next.container,{opacity:1,duration:.5})},after(o){let c=o.next.container.dataset.barbaNamespace;b(c),w(!1),document.documentElement.classList.remove("is-animating")}}}function u(o){let c=$(o).closest(".work_slider-item");if(c.length){let d=c[0].getBoundingClientRect(),f=window.getComputedStyle(c[0]);n={rect:d,backgroundColor:f.backgroundColor,borderRadius:f.borderRadius||"0px"},e=document.createElement("div"),e.className="work-item-clone";let m=c.find("img").attr("src")||"";if($(e).css({position:"fixed",top:d.top+"px",left:d.left+"px",width:d.width+"px",height:d.height+"px",backgroundColor:n.backgroundColor,borderRadius:n.borderRadius,zIndex:9999}),m){let p=$('<div class="clone-img-container"></div>'),h=$("<img>").attr("src",m);p.css({width:"100%",height:"100%",overflow:"hidden"}),h.css({width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}),p.append(h),$(e).append(p)}document.body.appendChild(e)}}function s(o){let c=gsap.timeline();if(c.to(o,{opacity:0,duration:.5}),e&&n){let d=window.innerWidth,f=window.innerHeight,i=Math.min(d*.8,800),m=i*(n.rect.height/n.rect.width),p=(d-i)/2,h=(f-m)/2;c.to(e,{top:h,left:p,width:i,height:m,duration:.8,ease:"power2.inOut",delay:.1},"-=0.3")}return c}function l(o){return new Promise(c=>{let d=$(o).find(".work-d_hero-list-item").first()[0];e&&d?setTimeout(()=>{let f=Flip.getState(e),i=d.getBoundingClientRect();$(e).css({top:i.top+"px",left:i.left+"px",width:i.width+"px",height:i.height+"px"});let m=$(e).find("img");console.log(m);let p=gsap.timeline({onComplete:()=>{gsap.to(o,{opacity:1,duration:.5,onComplete:()=>{e&&(e.remove(),e=null),c()}})}});p.add(Flip.from(f,{duration:.8,ease:"power2.inOut"})),p.add(gsap.to(m,{scale:1.4,duration:.8,ease:"power2.inOut"}),0)},100):(gsap.to(o,{opacity:1,duration:.5,onComplete:c}),e&&(e.remove(),e=null))})}}})();

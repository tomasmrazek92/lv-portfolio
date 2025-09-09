"use strict";(()=>{var Ce=Object.create;var ae=Object.defineProperty;var ke=Object.getOwnPropertyDescriptor;var Se=Object.getOwnPropertyNames;var Ie=Object.getPrototypeOf,Pe=Object.prototype.hasOwnProperty;var _e=(e=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(e,{get:(t,i)=>(typeof require!="undefined"?require:t)[i]}):e)(function(e){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var He=(e,t,i,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Se(t))!Pe.call(e,o)&&o!==i&&ae(e,o,{get:()=>t[o],enumerable:!(l=ke(t,o))||l.enumerable});return e};var Me=(e,t,i)=>(i=e!=null?Ce(Ie(e)):{},He(t||!e||!e.__esModule?ae(i,"default",{value:e,enumerable:!0}):i,e));var re=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,se=`
  uniform vec2 uOffset;
  uniform vec2 uResolution;
  uniform vec4 uBorderColor;
  uniform vec4 uHoverColor;
  uniform vec4 uBackgroundColor;
  uniform vec2 uMousePos;
  uniform float uZoom;
  uniform float uCellSize;
  uniform float uTextureCount;
  uniform float uAtlasWidth;
  uniform float uAtlasHeight;
  uniform sampler2D uImageAtlas;
  uniform sampler2D uTextAtlas;
  uniform vec2 uHoveredCell;
  uniform float uHoverIntensity;
  varying vec2 vUv;
  
  void main() {
    vec2 screenUV = (vUv - 0.5) * 2.0;
    
    float radius = length(screenUV);
    float distortion = 1.0 - 0.08 * radius * radius;
    vec2 distortedUV = screenUV * distortion;
    
    vec2 aspectRatio = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 worldCoord = distortedUV * aspectRatio;
    
    worldCoord *= uZoom;
    worldCoord += uOffset;
    
    vec2 cellPos = worldCoord / uCellSize;
    
    cellPos.x = cellPos.x * 0.95;
    cellPos.y = cellPos.y * 0.95;
    
    vec2 cellId = floor(cellPos);
    vec2 cellUV = fract(cellPos);
    
    bool isHovered = (cellId.x == uHoveredCell.x && cellId.y == uHoveredCell.y && uHoverIntensity > 0.01);
    
    float cellIndex = cellId.x + cellId.y * 11.0;
    float texIndex = mod(cellIndex, uTextureCount);
    
    vec3 color = vec3(0.0);
    float alpha = 0.0;
    
    float textHeight = 0.32;
    float textMargin = 0.05;
    float imageMargin = 0.05;
    
    float actualTextMargin = textMargin;
    float actualTextHeight = textHeight;
    float actualImageMargin = imageMargin;
    float actualImageHeight;
    
    if (isHovered) {
      float scaleReduction = uHoverIntensity * 0.02;
      actualImageMargin = imageMargin + scaleReduction;
    }
    
    bool inTextArea = cellUV.x >= actualTextMargin && cellUV.x <= (1.0 - actualTextMargin) && 
                      cellUV.y >= actualTextMargin && cellUV.y <= actualTextHeight;
    
    if (inTextArea) {
      vec2 textCoord = vec2(
        (cellUV.x - actualTextMargin) / (1.0 - 2.0 * actualTextMargin),
        (cellUV.y - actualTextMargin) / (actualTextHeight - actualTextMargin)
      );
      
      float atlasX = mod(texIndex, uAtlasWidth);
      float atlasY = floor(texIndex / uAtlasWidth);
      vec2 atlasUV = (vec2(atlasX, atlasY) + textCoord) / vec2(uAtlasWidth, uAtlasHeight);
      atlasUV.y = 1.0 - atlasUV.y;
      
      vec4 textColor = texture2D(uTextAtlas, atlasUV);
      
      if (textColor.a > 0.3) {
        color = textColor.rgb;
        alpha = smoothstep(0.2, 0.7, textColor.a);
        
        if (isHovered) {
          color = mix(color, uHoverColor.rgb, uHoverIntensity * uHoverColor.a * 0.2);
        }
      }
    }
    
    float imageY = textHeight + 0.02;
    actualImageHeight = 1.0 - imageY - actualImageMargin;
    
    bool inImageArea = cellUV.x >= actualImageMargin && cellUV.x <= (1.0 - actualImageMargin) && 
                       cellUV.y >= imageY && cellUV.y <= (imageY + actualImageHeight);
    
    if (inImageArea) {
      vec2 imageUV = vec2(
        (cellUV.x - actualImageMargin) / (1.0 - 2.0 * actualImageMargin),
        (cellUV.y - imageY) / actualImageHeight
      );
      
      float atlasX = mod(texIndex, uAtlasWidth);
      float atlasY = floor(texIndex / uAtlasWidth);
      vec2 atlasUV = (vec2(atlasX, atlasY) + imageUV) / vec2(uAtlasWidth, uAtlasHeight);
      atlasUV.y = 1.0 - atlasUV.y;
      
      vec4 imageColor = texture2D(uImageAtlas, atlasUV);
      color = imageColor.rgb;
      alpha = 1.0;
      
      if (isHovered) {
        color = mix(color, uHoverColor.rgb, uHoverIntensity * uHoverColor.a * 0.3);
      }
    }
        
    float fade = 1.0 - smoothstep(1.2, 1.8, radius);
    alpha *= fade;
    
    gl_FragColor = vec4(color, alpha);
  }
`;typeof THREE=="undefined"&&import("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js").then(()=>{me()});gsap.registerPlugin(SplitText,ScrollTrigger,TextPlugin);function Ae(){window.lenisInstance&&(window.lenisInstance.destroy(),window.lenisInstance=null);let e;if(Webflow.env("editor")===void 0){let o=function(r){e.raf(r),requestAnimationFrame(o)};var l=o;e=new Lenis({lerp:.075,wheelMultiplier:.7,gestureOrientation:"vertical",normalizeWheel:!1,smoothTouch:!1}),requestAnimationFrame(o),window.lenisInstance=e}$("[data-lenis-start]").off("click").on("click",function(){e.start()}),$("[data-lenis-stop]").off("click").on("click",function(){e.stop()}),$("[data-lenis-toggle]").off("click").on("click",function(){$(this).toggleClass("stop-scroll"),$(this).hasClass("stop-scroll")?e.stop():e.start()});let{body:t}=document;new ResizeObserver(()=>{e.resize()}).observe(t)}function Le(){if(document.documentElement.style.setProperty("--gap-size","0"),!document.querySelector(".site-frame")){let i=["top","right","bottom","left"],l=document.createElement("div");l.className="site-frame-container",i.forEach(r=>{let u=document.createElement("div");u.className=`site-frame site-frame-${r}`,l.appendChild(u)}),document.body.appendChild(l);let o=document.createElement("style");o.innerHTML=`
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
`,document.head.appendChild(o)}let e=window.lenis||null;function t(i){i>100?gsap.to(document.documentElement,{duration:0,"--gap-size":1,ease:"power2.out"}):gsap.to(document.documentElement,{duration:0,"--gap-size":0,ease:"power2.out"})}e?e.on("scroll",({scroll:i})=>{t(i)}):$(window).scroll(function(){t($(this).scrollTop())})}var le=0;function V(e){window.lenisInstance&&(e===!0?t():i());function t(){le=window.scrollY,$("body").css({overflow:"hidden",position:"fixed",top:"0",width:"100%"}),window.lenisInstance.scrollTo(0,{immediate:!0,onComplete:()=>{window.lenisInstance.stop()}})}function i(){$("body").css({overflow:"",position:"",top:"",width:""}),window.lenisInstance.start(),window.lenisInstance.scrollTo(le,{})}}function Re(){$("[data-scroll-top]").on("click",function(){window.lenisInstance?window.lenisInstance.scrollTo(0):window.scrollTo(0,0)})}function We(){function e(){let t=new Date,i={timeZone:"Europe/Paris",hour:"2-digit",minute:"2-digit",hour12:!0},l=t.toLocaleTimeString("en-GB",i);$("[data-time-cet]").text(`CET ${l}`)}e(),setInterval(e,1e3)}function ze(){let t=document.querySelectorAll("[data-css-marquee]"),i=[],l;function o(n){if(n.getAttribute("data-initialized")==="true")return;n.querySelectorAll("[data-css-marquee-list]").forEach(d=>{let f=d.cloneNode(!0);n.appendChild(f)}),n.querySelectorAll("[data-css-marquee-list]").forEach(d=>{d.style.animationDuration=d.offsetWidth/60+"s",d.style.animationPlayState="paused"}),n.setAttribute("data-initialized","true"),i.push(n)}function r(n){let c=n.querySelectorAll("[data-css-marquee-list]");for(let f=c.length-1;f>=c.length/2;f--)c[f].remove();n.querySelectorAll("[data-css-marquee-list]").forEach(f=>{f.style.animationDuration="",f.style.animationPlayState=""}),n.setAttribute("data-initialized","false");let d=i.indexOf(n);d>-1&&i.splice(d,1)}function u(n){let c=parseInt(n.getAttribute("data-breakpoint")||"0");window.innerWidth<=c?o(n):n.getAttribute("data-initialized")==="true"&&r(n)}let h=new IntersectionObserver(n=>{n.forEach(c=>{c.target.getAttribute("data-initialized")==="true"&&c.target.querySelectorAll("[data-css-marquee-list]").forEach(d=>d.style.animationPlayState=c.isIntersecting?"running":"paused")})},{threshold:0});function s(){t.forEach(n=>{u(n),h.observe(n)})}function p(){clearTimeout(l),l=setTimeout(()=>{t.forEach(n=>{u(n)})},250)}window.addEventListener("resize",p),s()}function de(){function e(l,o=!1){let r=document.getElementById(l);if(r&&window.lenisInstance){let u=()=>{window.lenisInstance.scrollTo(r,{duration:1,easing:h=>Math.min(1,1.001-Math.pow(2,-10*h))})};o?u():setTimeout(u,100),o&&window.history.pushState({},"",window.location.pathname+"?anchor="+l)}}let i=new URLSearchParams(window.location.search).get("anchor");i&&e(i),$('a[href^="?anchor="], a[href^="#"], a[href*="'+window.location.pathname+'?anchor="]').on("click",function(l){let o=$(this).attr("href"),r;if(o.startsWith("#"))r=o.substring(1);else if(o.includes("?anchor=")){let u=o.split("?"),h=window.location.pathname,s=u[0]||h;(s===h||s==="")&&(l.preventDefault(),r=new URLSearchParams(u[1]).get("anchor"))}r&&($(".nav_menu").is(":visible")?(V(!1),$('[data-nav-toggle="close"]').trigger("click"),setTimeout(()=>{e(r,!0)},500)):e(r,!0))})}function qe(){$("[data-copy-clipboard]").on("click",function(){let e=$(this).attr("data-copy-clipboard"),t=$(`[data-copy-clipboard="${e}"]`).find(".line");if(t.length){let i=t.text(),l=()=>{let o=$('<div class="copy-tooltip">Copied</div>');o.css({position:"absolute",background:"var(--body-2)",color:"var(--text-2)",padding:".5em 1em",borderRadius:".25em",fontSize:"1.5rem",whiteSpace:"nowrap",zIndex:9999,pointerEvents:"none"});let r=t.offset();o.css({top:r.top-40,left:r.left+t.outerWidth()/2-o.outerWidth()/2}),$("body").append(o),setTimeout(()=>{o.remove()},1500)};navigator.clipboard.writeText(i).then(()=>{l()}).catch(()=>{let o=document.createElement("textarea");o.value=i,document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),l()})}})}function ce(e){let t=new DOMParser().parseFromString(e.next.html,"text/html").querySelector("html").getAttribute("data-wf-page");document.documentElement.setAttribute("data-wf-page",t),window.Webflow&&window.Webflow.destroy(),window.Webflow&&window.Webflow.ready(),window.Webflow&&window.Webflow.require&&window.Webflow.require("ix2")&&window.Webflow.require("ix2").init(),$(".w--current").removeClass("w--current"),$("a").each(function(){$(this).attr("href")===window.location.pathname&&$(this).addClass("w--current")})}var Ve={isOpen:!1,$overlay:null,$container:null,$videoWrapper:null,$originalElement:null,originalMaxWidth:null,originalPlayers:[],modalPlayer:null,init(){this.initOriginalPlyrs(),this.bindEvents(),this.addStyles()},initOriginalPlyrs(){let e=$(".plyr_video");e.length&&(this.originalPlayers=[],e.each((t,i)=>{let l=new Plyr(i,{controls:["play","progress","mute","fullscreen"],muted:!0,autoplay:!0,loop:{active:!0}});$(i).closest("[data-video-player]").find(".plyr__controls").hide(),l.on("ready",()=>{setTimeout(()=>{l.play(),l.muted=!0},100)}),l.on("loadeddata",()=>{l.play()}),this.originalPlayers.push(l)}))},bindEvents(){$("[data-video-player]").each((e,t)=>{$(t).click(i=>{i.preventDefault(),this.open($(i.currentTarget))})})},open(e){if(this.isOpen)return;if(window.innerWidth<768||/Mobi|Android/i.test(navigator.userAgent)){let i=e.find("video")[0];if(i){i.removeAttribute("playsinline"),i.removeAttribute("webkit-playsinline"),i.controls=!1,i.currentTime=0,i.muted=!1;let l=()=>{i.removeEventListener("webkitendfullscreen",l),i.removeEventListener("fullscreenchange",l),i.pause(),i.setAttribute("playsinline",""),i.setAttribute("webkit-playsinline",""),i.controls=!1;let o=e.closest("[data-video-player]"),r=$(i).clone(!0)[0];i.replaceWith(r);let u=new Plyr(r,{controls:["play","progress","mute","fullscreen"],muted:!0,autoplay:!0,loop:{active:!0}});$(o).find(".plyr__controls").hide(),u.on("ready",()=>{u.play().catch(()=>{})})};i.addEventListener("webkitendfullscreen",l),i.addEventListener("fullscreenchange",()=>{document.fullscreenElement||l()}),i.play().then(()=>{let o=i.requestFullscreen||i.webkitEnterFullscreen||i.webkitRequestFullscreen||i.msRequestFullscreen;o&&o.call(i)}).catch(o=>{console.warn("Autoplay or fullscreen failed:",o)})}return}this.$originalElement=e,this.originalMaxWidth=e.css("max-width"),V(!0),e.css("max-width","none"),this.createElement(),this.setupModal(e),this.animateIn(),this.isOpen=!0},close(){this.isOpen&&(this.pauseVideo(),this.animateOut())},createElement(){this.$overlay=$('<div class="video-modal-overlay"></div>'),this.$container=$('<div class="video-modal-container"></div>'),this.$videoWrapper=$('<div class="video-modal-wrapper"></div>');let e=$('<div class="video-modal-close">\xD7</div>');this.$videoWrapper.append(e),this.$container.append(this.$videoWrapper),this.$overlay.append(this.$container),$("body").append(this.$overlay),this.bindCloseEvents(e)},setupModal(e){let t=e[0].getBoundingClientRect(),i=e.attr("data-video-player")||"16/9";this.$container.css({position:"fixed",left:t.left+"px",top:t.top+"px",width:t.width+"px",height:t.height+"px",zIndex:9999}),this.$videoWrapper.css("aspect-ratio",i);let l=e.clone(!0);l.find(".plyr").replaceWith(l.find("video")),this.$videoWrapper.append(l),e.css("visibility","hidden")},animateIn(){gsap.set(this.$overlay,{opacity:0}),gsap.to(this.$overlay,{opacity:1,duration:.3}),gsap.to(this.$container,{left:"5vw",top:"5vh",width:"90vw",height:"90vh",duration:.6,ease:"power2.out",onComplete:()=>this.activateModalVideo()})},activateModalVideo(){let t=this.$videoWrapper.find("[data-video-player]").find(".plyr_video");t.length&&(this.modalPlayer=new Plyr(t[0],{controls:["play","progress","mute","fullscreen"],muted:!1,autoplay:!1,loop:{active:!0}}),this.modalPlayer.on("ready",()=>{setTimeout(()=>{this.modalPlayer.restart(),this.modalPlayer.muted=!1,this.modalPlayer.play().catch(()=>{})},100)}))},animateOut(){let e=this.$originalElement[0].getBoundingClientRect();gsap.to(this.$container,{left:e.left+"px",top:e.top+"px",width:e.width+"px",height:e.height+"px",duration:.4,ease:"power2.in"}),gsap.to(this.$overlay,{opacity:0,duration:.3,delay:.2,onComplete:()=>this.cleanup()})},cleanup(){this.$overlay.remove(),this.$originalElement.css({visibility:"visible","max-width":this.originalMaxWidth}),this.modalPlayer&&(this.modalPlayer.destroy(),this.modalPlayer=null),V(!1),$(document).off("keydown.videoModal"),this.resetProperties()},resetProperties(){this.isOpen=!1,this.$overlay=null,this.$container=null,this.$videoWrapper=null,this.$originalElement=null,this.originalMaxWidth=null},bindCloseEvents(e){e.click(()=>this.close()),this.$overlay.click(t=>{t.target===this.$overlay[0]&&this.close()}),$(document).on("keydown.videoModal",t=>{t.key==="Escape"&&this.close()})},playVideo(){this.modalPlayer&&this.modalPlayer.play()},pauseVideo(){this.modalPlayer&&this.modalPlayer.pause()},addStyles(){$("<style>").text(`
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
    `).appendTo("head")}};function Q(){let e=document.querySelector(".cursor");if(!e)return;let t=e.querySelector("p"),i=document.querySelectorAll("[data-cursor]"),l=6,o=140,r=!1,u=null,h="",s=!1,p,n,c=()=>window.innerWidth>=992,d=()=>{c()&&(s=!0,gsap.set(e,{xPercent:l,yPercent:o,scale:.8}),p=gsap.quickTo(e,"x",{ease:"power3"}),n=gsap.quickTo(e,"y",{ease:"power3"}),e.style.display="block")},f=()=>{s=!1,e&&(e.style.display="none")},v=()=>e.offsetWidth+16,w=E=>{if(!s)return;let P=window.innerWidth,L=window.innerHeight,{scrollY:W}=window,A=E.clientX,I=E.clientY+W,z=l,U=o,O=v();if(A>P-O?(r=!0,z=-100):r=!1,I>W+L*.9&&(U=-120),u){let X=u.getAttribute("data-cursor");X!==h&&(t.innerHTML=X,h=X,O=v())}gsap.to(e,{xPercent:z,yPercent:U,duration:.9,scale:1,ease:"power3"}),p(A),n(I-W)},C=E=>{if(!s)return;u=E;let P=E.getAttribute("data-cursor");P!==h&&(t.innerHTML=P,h=P,v()),E.tagName!=="A"?(e.style.backgroundColor="var(--text-3)",e.style.color="var(--body-2)"):(e.style.backgroundColor="",e.style.color="")},b=()=>{c()&&!s?d():!c()&&s&&f()};window.addEventListener("mousemove",w),window.addEventListener("resize",b),i.forEach(E=>{E.addEventListener("mouseenter",()=>C(E))}),c()&&d()}function Fe(){let e=$('[data-nav-toggle="open"]'),t=$('[data-nav-toggle="close"]'),i=$(".nav_menu"),l=$("[data-menu-brand]"),o=$(".nav_menu-item"),r=$(".nav_menu-sublinks li"),u=$(".nav_menu-meta");gsap.set(i,{display:"none"}),gsap.set([i,o,r,u],{opacity:0}),gsap.set(l,{text:""});let h={open:()=>{let n=gsap.timeline();return D(l,l.attr("data-menu-text")),n.set(i,{display:"flex"}),n.set(t,{yPercent:100}),n.to(e.find("svg"),{scale:0,ease:"power4.out"}),n.to(e,{scale:0,ease:"power4.out"},"<0.1"),n.to(i,{opacity:1},"<"),n.to(t,{yPercent:0}),n.to(o,{opacity:1,stagger:.1},"<"),n.fromTo(o.find(".nav_menu-item_list"),{scale:0},{scale:1,stagger:.1},"<0.3"),n.fromTo(o.find("p"),{yPercent:300},{yPercent:0,stagger:.1,duration:.6},"<"),n.fromTo(o.find(".w-embed"),{xPercent:300},{xPercent:0,stagger:.1,duration:.6},"<"),n.to([r,u],{opacity:1,stagger:.2},"<"),n},close:()=>{let n=gsap.timeline();return n.to([r,u],{opacity:0,duration:.3}),n.to(t,{yPercent:100},"<"),n.to(o.find("p"),{yPercent:300,stagger:.05,duration:1},"<0.2"),n.to(o.find(".nav_menu-item_list"),{scale:0,stagger:.1},"<"),n.to(o,{opacity:0,stagger:.1},"<"),n.to(i,{opacity:0},"<0.4"),n.to(e.find("svg"),{scale:1,ease:"power4.out"},"<"),n.to(e,{scale:1,ease:"power4.out"},"<"),n.set(i,{display:"none"}),D(l,""),n}};function s(){h.open(),V(!0)}function p(){h.close(),V(!1)}e.on("click",s),t.on("click",p)}function Ue(){$(".nav_meta-col").each(function(){let e=$(this).find("a"),t=$(this).find("p");N(e),N(t),gsap.fromTo($(".nav_mode"),{scale:0},{scale:1})})}function Oe(){let e=$("[data-back-to-home]"),t=e.find("[data-back-label]"),i=t.attr("data-original-text");e.hover(function(){D(t,"Home, sweet home")},function(){D(t,i)})}function Ye(){$(".hp-hero_content-block").each(function(){let e=gsap.timeline();N($(this).find(".hp-hero_content-label").eq(0)),e.fromTo($(this).find("li"),{opacity:0,xPercent:-5},{opacity:1,xPercent:0,stagger:.2}),e.fromTo($(".hp-hero").find("[data-item-reveal]"),{opacity:0,visibility:"hidden"},{opacity:1,visibility:"visible"})}),$(".hp-hero_content-visual").each(function(){gsap.set($(this),{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"}),gsap.to($(this),{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"power3.inOut",onComplete:()=>{$(this).css("clip-path","")}})})}function Be(){let e=gsap.matchMedia(),t=$(".hp-hero");t.length&&e.add("(min-width: 992px)",()=>{gsap.timeline({scrollTrigger:{trigger:t,start:"center top",end:"bottom top",scrub:1,onEnterBack:()=>{gsap.to($(".hp-work_head-link"),{rotate:0})},onLeave:()=>{gsap.to($(".hp-work_head-link"),{rotate:180})}}}).to($(".hp-hero").add(".nav_wrapper"),{opacity:.1})})}function ue(e,t){$(e).find(t).hover(function(){let i=$(this).parent().index(),l=$(".links-imgs_box-item").length,o=-(i*(100/l));gsap.to(".links-imgs_box-list",{yPercent:o,duration:.3,ease:"power2.inOut"})}),$(e).hover(function(){gsap.to(".links-imgs_box-wrap",{scale:1,duration:.2,ease:"power4.in"})},function(){gsap.to(".links-imgs_box-wrap",{scale:0,duration:.2,ease:"power4.out"})})}function De(){gsap.matchMedia().add("(min-width: 992px)",()=>{let t=$(".work_slider-item"),i=t.length,l=$(".work-wall"),o=$(".hp-work_slider-row"),r=i*100,u=r;l.css("height",u+"vh"),gsap.registerPlugin(ScrollTrigger),gsap.to(o,{xPercent:-(r-100),ease:"none",scrollTrigger:{trigger:l,start:"top top",end:"bottom bottom",scrub:1,pin:!1}});let h=$(".work_slider-item img");if(window.lenisInstance){let s=!1,p;window.lenisInstance.on("scroll",n=>{$(window).width()>991&&(Math.abs(n.velocity)>15&&!s&&(s=!0,gsap.to(h,{scale:1.1,duration:1,ease:"power4.out"}),gsap.to(t.find(".work_slider-item_visual"),{scale:.8,duration:1,ease:"power4.out"})),clearTimeout(p),p=setTimeout(()=>{s=!1,gsap.to(h,{scale:1,duration:1,ease:"power4.out"}),gsap.to(t.find(".work_slider-item_visual"),{scale:1,duration:1,ease:"power4.out"})},15))})}})}function Xe(){$("[data-work-counter]").text("("+$(".work_slider-item").length+")")}function Ne(){var e=gsap.timeline({});let t=".work-d_hero-wrap.cc-images",i=".work-d_hero-wrap.cc-images .work-d_hero-list",l=".work-d_hero-wrap.cc-images .work-d_hero-list-item",o=".work-d_hero-timeline-box",r=".work-navigation";e.set([o,r],{y:"10vh",rotate:.001,opacity:0},"<"),e.to(i,{duration:1,ease:"Power4.easeOut",rotate:.001,y:0,clearProps:"all",delay:0,onComplete:()=>{N($('[data-split="work-heading"]'))}},"<"),e.from(l,{duration:2,ease:"Expo.easeInOut",rotate:.001,opacity:0,y:"0px",clearProps:"all"},"<"),e.to([o,r],{duration:2.1,ease:"Expo.easeInOut",rotate:.001,y:0,opacity:1,clearProps:"all"},"<")}function je(){let e;function t(){e&&e.kill();let i=$(".work-d_hero-part.cc-images");if(!i.length)return;let l=$(".work-d_hero-list"),o=$(".work-d_hero-list-item"),r=$(".work-d_hero-timeline"),u=$(".work-d_hero-timeline-inner"),h=o.first(),s=o.last(),p=$(".work-d_hero-timeline_item"),n=$(window).width()<992;gsap.set(u,{y:0,x:0});let c=gsap.timeline({paused:!0});n&&c.fromTo(p.find(".work-d_hero-timeline_mask"),{yPercent:50,opacity:0},{yPercent:0,opacity:1,stagger:.2}),e=ScrollTrigger.create({trigger:i[0],onEnter:()=>{r.addClass("cc-active"),n&&c.play()},onEnterBack:()=>{r.addClass("cc-active"),n&&c.play()},onLeave:()=>{r.removeClass("cc-active"),n&&c.reverse()},onLeaveBack:()=>{r.removeClass("cc-active"),n&&c.reverse()},start:()=>h.outerHeight()/2+"px center",end:()=>{let d=l.outerHeight(),f=s.outerHeight();return d-f/2+"px center"},markers:!0,scrub:0,onUpdate:d=>{let f=$(window).width()<992,v=$(window).height(),C=$(window).scrollTop()+v/2,b=h.offset().top,E=h.outerHeight(),P=b+E/2;if(C<P){gsap.set(u,{y:0,x:0}),p.removeClass("active"),p.eq(0).addClass("active");return}let L=0;o.each(function(A){let I=$(this),z=I.offset().top,U=I.outerHeight(),O=z+U/2;if(C<O)return!1;L+=1}),L=Math.max(0,L-1);let W=L;if(W<o.length-1){let A=o.eq(W),I=o.eq(W+1);if(A.length&&I.length){let z=A.offset().top+A.outerHeight()/2,U=I.offset().top+I.outerHeight()/2;if(C>z){let O=(C-z)/(U-z);L+=Math.min(1,Math.max(0,O))}}}if(f){let A=p.first().outerWidth(!0),I=L*A;gsap.set(u,{x:-I,y:0})}else{let A=p.first().outerHeight(!0),I=L*A;gsap.set(u,{y:-I,x:0})}}}),$(document).off("click.workTimeline",".work-d_hero-timeline_item"),$(document).on("click.workTimeline",".work-d_hero-timeline_item",function(){let d=$(this).index(),f=o.eq(d);if(f.length){let v=f.offset().top,w=f.outerHeight(),C=$(window).height(),b=v+w/2-C/2;typeof lenisInstance!="undefined"&&lenisInstance.scrollTo?lenisInstance.scrollTo(b,{duration:1.2,easing:E=>Math.min(1,1.001-Math.pow(2,-10*E))}):$("html, body").animate({scrollTop:Math.max(0,b)},1200)}})}t(),$(window).off("resize.workTimeline"),$(window).on("resize.workTimeline",function(){$(window).width()!==$(window).data("prevWidth")&&($(window).data("prevWidth",$(window).width()),setTimeout(t,100))})}function Ze(){let e=$(".work-d_content-part_icon"),t=gsap.timeline({scrollTrigger:{trigger:e}});t.from(e,{scale:0}),t.from(e.find("svg"),{scale:0,delay:.2},"<")}function Qe(){$(document).ready(function(){let e=$(".about_visual-box-inner-extra img"),t=e.length,i=-1,l=[];if(t===0)return;function o(){l=Array.from({length:t},(h,s)=>s);for(let h=l.length-1;h>0;h--){let s=Math.floor(Math.random()*(h+1));[l[h],l[s]]=[l[s],l[h]]}}o(),e.css({display:"block",opacity:0}),$(".about_visual-box-inner").on("click",function(){if(i>=t-1){u();return}r()});function r(){i++;let h=Math.random()*10-5,p=Math.pow(.7,i+1)*.99,n=l[i],c=e.eq(n);gsap.set(c[0],{opacity:0,scale:.8,rotation:h+2,zIndex:i+10}),gsap.to(c[0],{opacity:1,scale:.7,rotation:h,duration:.6,ease:"back.out(1.2)",delay:.1})}function u(){gsap.to(e,{opacity:0,scale:.8,duration:.4,stagger:.05,ease:"power2.in",onComplete:function(){gsap.set(e,{scale:1,rotation:0,zIndex:"auto"}),i=-1,o()}})}})}function Je(){function e(o){let r=o.activeIndex,u=o.slides[r];D($('[data-work-slider="title"]'),$(u).attr("data-title")),D($('[data-work-slider="desc"]'),$(u).attr("data-description"))}let t=new Swiper(".why-hero_cases-slider",{slidesPerView:1,effect:"fade",fadeEffect:{crossfade:!0},loop:!0,pagination:{el:".swiper-nav.cc-cases",bulletClass:"swiper-dot",bulletActiveClass:"cc-active",clickable:!0},on:{slideChange:function(){e(this)},init:function(){e(this)}}}),i=new Swiper(".why-hero_quotes-slider",{slidesPerView:1,effect:"fade",fadeEffect:{crossFade:!0},loop:!0,speed:200,navigation:{nextEl:".why-hero_quotes-slide-inner"},pagination:{el:".swiper-nav.cc-quotes",bulletClass:"swiper-dot",bulletActiveClass:"cc-active",clickable:!0},on:{init:function(){l(this),$(".swiper-slide").each(function(){gsap.set($(this).find("[data-item-el]"),{yPercent:50,opacity:0})}),gsap.to($(".swiper-slide-active [data-item-el]"),{yPercent:0,opacity:1,stagger:.2,duration:.6,ease:"power2.out"})},slideChangeTransitionEnd:function(){gsap.to($(".swiper-slide:not(.swiper-slide-active) [data-item-el]"),{yPercent:50,opacity:0,stagger:.1,duration:.3}),gsap.to($(".swiper-slide-active [data-item-el]"),{yPercent:0,opacity:1,stagger:.2,duration:.6,delay:.2,ease:"power2.out"})}}});function l(o){let{slides:r}=o,u=r.length;r.forEach((h,s)=>{let p=$(h).find(".why-hero_quotes-avatar-circle.cc-1"),n=$(h).find(".why-hero_quotes-avatar-circle.cc-2"),c=(s+1)%u,d=(s+2)%u,f=$(r[c]).find(".why-hero_quotes-avatar-circle.cc-avatar img").attr("src"),v=$(r[d]).find(".why-hero_quotes-avatar-circle.cc-avatar img").attr("src");v&&p.find("img").attr("src",v),f&&n.find("img").attr("src",f)})}}function Ke(){document.querySelectorAll("[data-form-validate]").forEach(t=>{let i=new Date().getTime(),l=t.querySelector("form");if(!l)return;let o=l.querySelectorAll("[data-validate]"),r=l.querySelector("[data-submit]");if(!r)return;let u=r.querySelector('input[type="submit"]');if(!u)return;function h(){return new Date().getTime()-i<5e3}o.forEach(function(c){let d=c.querySelector("select");d&&d.querySelectorAll("option").forEach(function(v){(v.value===""||v.value==="disabled"||v.value==="null"||v.value==="false")&&v.setAttribute("disabled","disabled")})});function s(){let c=!0,d=null;return o.forEach(function(f){let v=f.querySelector("input, textarea, select"),w=f.querySelector("[data-radiocheck-group]");!v&&!w||(v&&(v.__validationStarted=!0),w&&(w.__validationStarted=!0,w.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(b){b.__validationStarted=!0})),n(f),p(f)||(c=!1,d||(d=v||w.querySelector("input"))))}),!c&&d&&d.focus(),c}function p(c){let d=c.querySelector("[data-radiocheck-group]");if(d){let P=d.querySelectorAll('input[type="radio"], input[type="checkbox"]'),L=d.querySelectorAll("input:checked"),W=parseInt(d.getAttribute("min"))||1,A=parseInt(d.getAttribute("max"))||P.length,I=L.length;return P[0].type==="radio"?I>=1:P.length===1?P[0].checked:I>=W&&I<=A}let f=c.querySelector("input, textarea, select");if(!f)return!1;let v=!0,w=parseInt(f.getAttribute("min"))||0,C=parseInt(f.getAttribute("max"))||1/0,b=f.value.trim(),{length:E}=b;return f.tagName.toLowerCase()==="select"?(b===""||b==="disabled"||b==="null"||b==="false")&&(v=!1):f.type==="email"?v=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b):(f.hasAttribute("min")&&E<w&&(v=!1),f.hasAttribute("max")&&E>C&&(v=!1)),v}function n(c){let d=c.querySelector("[data-radiocheck-group]");if(d){let f=d.querySelectorAll('input[type="radio"], input[type="checkbox"]');d.querySelectorAll("input:checked").length>0?c.classList.add("is--filled"):c.classList.remove("is--filled"),p(c)?(c.classList.add("is--success"),c.classList.remove("is--error")):(c.classList.remove("is--success"),Array.from(f).some(b=>b.__validationStarted)?c.classList.add("is--error"):c.classList.remove("is--error"))}else{let f=c.querySelector("input, textarea, select");if(!f)return;f.value.trim()?c.classList.add("is--filled"):c.classList.remove("is--filled"),p(c)?(c.classList.add("is--success"),c.classList.remove("is--error")):(c.classList.remove("is--success"),f.__validationStarted?c.classList.add("is--error"):c.classList.remove("is--error"))}}o.forEach(function(c){let d=c.querySelector("input, textarea, select"),f=c.querySelector("[data-radiocheck-group]");f?f.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(w){w.__validationStarted=!1,w.addEventListener("change",function(){requestAnimationFrame(function(){if(!w.__validationStarted){let C=f.querySelectorAll("input:checked").length,b=parseInt(f.getAttribute("min"))||1;C>=b&&(w.__validationStarted=!0)}w.__validationStarted&&n(c)})}),w.addEventListener("blur",function(){w.__validationStarted=!0,n(c)})}):d&&(d.__validationStarted=!1,d.tagName.toLowerCase()==="select"?d.addEventListener("change",function(){d.__validationStarted=!0,n(c)}):(d.addEventListener("input",function(){let v=d.value.trim(),{length:w}=v,C=parseInt(d.getAttribute("min"))||0,b=parseInt(d.getAttribute("max"))||1/0;d.__validationStarted||(d.type==="email"?p(c)&&(d.__validationStarted=!0):(d.hasAttribute("min")&&w>=C||d.hasAttribute("max")&&w<=b)&&(d.__validationStarted=!0)),d.__validationStarted&&n(c)}),d.addEventListener("blur",function(){d.__validationStarted=!0,n(c)})))}),r.addEventListener("click",function(){if(s()){if(h()){alert("Form submitted too quickly. Please try again.");return}u.click()}}),l.addEventListener("keydown",function(c){if(c.key==="Enter"&&c.target.tagName!=="TEXTAREA"&&(c.preventDefault(),s())){if(h()){alert("Form submitted too quickly. Please try again.");return}u.click()}})}),$(".form-checkbox").each(function(){let t=$(this),i=t.find('input[type="checkbox"], input[type="radio"]');function l(){i.attr("type")==="radio"&&$(`input[name="${i.attr("name")}"]`).not(":checked").each(function(){$(this).closest(".form-checkbox").removeClass("cc-active")}),i.is(":checked")?t.addClass("cc-active"):t.removeClass("cc-active")}l(),i.on("change",l)})}function me(){if(!document.getElementById("gallery"))return;let e={cellSize:.75,zoomLevel:1.25,lerpFactor:.075,borderColor:"rgba(255, 255, 255, 0.15)",backgroundColor:"transparent",textColor:"#ffffff",hoverColor:"rgba(255, 255, 255, 0)",wheelSensitivity:8e-4,wheelDamping:.92,momentumThreshold:.1,mouseSensitivity:.003,touchSensitivity:.008},t=[];$("[data-lab-item]").each(function(){let a=$(this),m={id:a.attr("data-lab-item"),title:a.find("[data-lab-title]").text().trim(),label:a.find("[data-lab-label]").text().trim(),desc:a.find("[data-lab-desc]").text().trim(),image:a.find("[data-lab-img]").attr("src"),imageHiRes:a.find("[data-lab-hires-img]").attr("src")};t.push(m)});let i,l,o,r,u=!1,h=!0,s=0,p={x:0,y:0},n={x:0,y:0},c={x:0,y:0},d={x:-1,y:-1},f=1,v=1,w=[],C={x:-999,y:-999},b={x:-999,y:-999},E=0,P=0,L=.15,W=a=>{if(a==="transparent")return[0,0,0,0];if(a.startsWith("#")){let g=a.slice(1),y=parseInt(g.substr(0,2),16)/255,T=parseInt(g.substr(2,2),16)/255,x=parseInt(g.substr(4,2),16)/255;return[y,T,x,1]}let m=a.match(/rgba?\(([^)]+)\)/);return m?m[1].split(",").map((g,y)=>y<3?parseFloat(g.trim())/255:parseFloat(g.trim()||1)):[0,0,0,1]},A=()=>{let a=document.getElementById("gallery");return getComputedStyle(a).color||"#ffffff"},I=(a,m)=>{let g=document.createElement("canvas");g.width=512,g.height=512;let y=g.getContext("2d");y.clearRect(0,0,512,512),y.font="100px Arial",y.fillStyle=A(),y.textBaseline="top";let x=((k,H)=>{let _=k.split(" "),R=[],M=_[0];for(let q=1;q<_.length;q++){let F=_[q],{width:B}=y.measureText(M+" "+F);B<H?M+=" "+F:(R.push(M),M=F)}return R.push(M),R})(a,400);x.forEach((k,H)=>{y.fillText(k,25,25+H*35)}),y.fillStyle="red",y.fillText(m,25,25+x.length*35+10);let S=new THREE.CanvasTexture(g);return Object.assign(S,{wrapS:THREE.ClampToEdgeWrapping,wrapT:THREE.ClampToEdgeWrapping,minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter,flipY:!1,generateMipmaps:!1,format:THREE.RGBAFormat}),S},z=(a,m=!1)=>{let y=a.length,T=1,x=512,S=document.createElement("canvas");S.width=y*x,S.height=T*x;let k=S.getContext("2d");a.forEach((_,R)=>{var F,B;let M=R%y*x,q=Math.floor(R/y)*x;m&&((F=_.source)!=null&&F.data)?k.drawImage(_.source.data,M,q,x,x):m||((B=_.image)!=null&&B.complete&&_.image.naturalWidth>0?k.drawImage(_.image,M,q,x,x):(k.fillStyle="#ff0000",k.fillRect(M,q,x,x)))});let H=new THREE.CanvasTexture(S);return Object.assign(H,{wrapS:THREE.ClampToEdgeWrapping,wrapT:THREE.ClampToEdgeWrapping,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,flipY:!1}),H.needsUpdate=!0,{texture:H,atlasWidth:y,atlasHeight:T}},U=()=>{let a=new THREE.TextureLoader,m=[],g=0;return new Promise(y=>{t.forEach((T,x)=>{let S=a.load(T.image,()=>{++g===t.length&&y(m)},void 0,k=>{++g===t.length&&y(m)});Object.assign(S,{wrapS:THREE.ClampToEdgeWrapping,wrapT:THREE.ClampToEdgeWrapping,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter}),m.push(S),w.push(I(T.title,T.label))})})},O=(a,m)=>{let g=Math.floor((a+m*11)%t.length),y=g<0?t.length+g:g;return t[y]},X=()=>{if(!o||d.x<0||d.y<0){b={x:-999,y:-999};return}let a=o.domElement.getBoundingClientRect(),m=d.x/a.width*2-1,g=-(d.y/a.height*2-1),y=Math.sqrt(m*m+g*g),T=1-.08*y*y,x=m*T,S=g*T,k=a.width/a.height,H=x*k*f+n.x,_=S*f+n.y,R=H/e.cellSize*.95,M=_/e.cellSize*.95,q=Math.floor(R),F=Math.floor(M);b={x:q,y:F}},he=a=>{let m=o.domElement.getBoundingClientRect();d.x=a.clientX-m.left,d.y=a.clientY-m.top,X(),r!=null&&r.material.uniforms&&r.material.uniforms.uMousePos.value.set(d.x,d.y)},J=(a,m,g)=>a+(m-a)*g,K=a=>{let{target:m}=a;return m.closest("nav")||m.closest(".navbar")||m.closest("[data-nav]")||m.closest("header")||m.tagName==="A"||m.closest("a")},G=(a,m,g)=>K(a)?!1:(u=!0,h=!0,s=Date.now(),document.body.classList.add("dragging"),p.x=m,p.y=g,setTimeout(()=>u&&(v=e.zoomLevel),150),!0),ge=a=>{G(a,a.clientX,a.clientY)},ve=a=>{G(a,a.touches[0].clientX,a.touches[0].clientY)&&a.preventDefault()},ee=(a,m,g=!1)=>{if(!u||a===void 0||m===void 0)return;let y=a-p.x,T=m-p.y;(Math.abs(y)>2||Math.abs(T)>2)&&(h=!1,v===1&&(v=e.zoomLevel));let x=g?e.touchSensitivity:e.mouseSensitivity;c.x-=y*x,c.y+=T*x,p.x=a,p.y=m},ye=a=>ee(a.clientX,a.clientY),we=a=>{a.preventDefault(),ee(a.touches[0].clientX,a.touches[0].clientY,!0)},j=a=>{var m,g,y,T;if(u&&(u=!1,document.body.classList.remove("dragging"),v=1,h&&Date.now()-s<200)){let x=a.clientX||((g=(m=a.changedTouches)==null?void 0:m[0])==null?void 0:g.clientX),S=a.clientY||((T=(y=a.changedTouches)==null?void 0:y[0])==null?void 0:T.clientY);if(x!==void 0&&S!==void 0&&!K(a)){let k=o.domElement.getBoundingClientRect(),H=(x-k.left)/k.width*2-1,_=-((S-k.top)/k.height*2-1),R=Math.sqrt(H*H+_*_),M=1-.08*R*R,q=H*M*(k.width/k.height)*f+n.x,F=_*M*f+n.y,B=Math.floor(q/e.cellSize*.95),Ee=Math.floor(F/e.cellSize*.95),ne=O(B,Ee);ne&&te.open(ne.id)}}},te={activePlayer:null,init(){this.setupEventListeners(),this.checkUrlQuery()},setupEventListeners(){$("[data-modal-close]").on("click",()=>this.close()),$(document).on("keydown",a=>{a.key==="Escape"&&this.close()}),$(".labs-modal_wrap").on("click",a=>{let m=$(a.target),g=$(".labs-modal_video:visible"),y=$(".labs-modal_img-item:visible");!m.closest(".labs-modal_video").length&&!m.closest(".labs-modal_img-item").length&&this.close()}),$(window).on("popstate",()=>{this.checkUrlQuery()})},checkUrlQuery(){let m=new URLSearchParams(window.location.search).get("project");m?$(`[data-lab-item="${m}"]`).length&&this.open(m):this.close()},open(a){this.destroyVideo(),V(!0),$(".labs-modal_wrap").css("display","flex"),$("[data-lab-item]").hide();let m=$(`[data-lab-item="${a}"]`);m.css("display","flex"),this.handleMediaType(m),this.updateUrl(a)},close(){this.destroyVideo(),V(!1),$("[data-lab-item]").hide(),$(".labs-modal_wrap").css("display","none"),this.updateUrl()},updateUrl(a=null){let m=new URL(window.location);a?m.searchParams.set("project",a):m.searchParams.delete("project"),window.history.pushState({},"",m)},handleMediaType(a){let m=a.find(".labs-modal_video"),g=a.find(".labs-modal_img-item"),y=m.find("video");if(m.hide(),g.hide(),y.length){let x=y.find("source").attr("src")||y.attr("src");x&&x.trim()!==""?(m.show(),this.initializeVideo(y)):g.css("display","flex")}else g.css("display","flex")},initializeVideo(a){if(typeof Plyr!="undefined"){let m=a[0];m.currentTime=0,m.pause(),this.activePlayer=new Plyr(m,{controls:["play-large","play","progress","current-time","mute","volume","fullscreen"],autoplay:!1,loop:{active:!0}}),this.activePlayer.on("ready",()=>{this.activePlayer.currentTime=0,setTimeout(()=>{this.activePlayer&&$(".labs-modal_wrap").is(":visible")&&this.activePlayer.play()},100)}),this.activePlayer.on("loadeddata",()=>{this.activePlayer.currentTime=0})}},destroyVideo(){if(this.activePlayer){try{this.activePlayer.pause(),this.activePlayer.currentTime=0,this.activePlayer.destroy()}catch{}this.activePlayer=null}$("video").each(function(){this.pause(),this.currentTime=0,this.load()})}},xe=()=>{let a=document.getElementById("gallery");if(!a)return;let{offsetWidth:m,offsetHeight:g}=a;l.updateProjectionMatrix(),o.setSize(m,g),o.setPixelRatio(window.devicePixelRatio),r==null||r.material.uniforms.uResolution.value.set(m,g)},be=()=>{let a=new MutationObserver(m=>{m.forEach(g=>{g.type==="attributes"&&(g.attributeName==="data-theme"||g.attributeName==="class")&&setTimeout(()=>{Te()},400)})});a.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme","class"]}),a.observe(document.body,{attributes:!0,attributeFilter:["data-theme","class"]})},Te=()=>{var T,x;if(!((x=(T=r==null?void 0:r.material)==null?void 0:T.uniforms)!=null&&x.uTextAtlas))return;let a=t.map(S=>I(S.title,S.label)),m=z(a,!0),g=r.material.uniforms.uTextAtlas.value;g&&g.dispose&&g.dispose();let y=m.texture;y.needsUpdate=!0,y.colorSpace=THREE.SRGBColorSpace,r.material.uniforms.uTextAtlas.value=y,r.material.needsUpdate=!0,o.resetState(),o.compile(i,l),o.render(i,l)},Y={x:0,y:0},ie=0,lt=null,$e=()=>{let a=document.getElementById("gallery");if(!a)return;let m=null,g=T=>{if(T.preventDefault(),m)return;m=setTimeout(()=>{m=null},16);let x=Date.now(),S=x-ie;ie=x;let{deltaX:k}=T,{deltaY:H}=T;if(Math.abs(T.deltaX)>0||Math.abs(T.deltaY)>0){document.body.classList.add("dragging"),T.deltaMode===1?(k*=16,H*=16):T.deltaMode===2&&(k*=400,H*=400);let _=e.wheelSensitivity||8e-4,R=k*_,M=H*_;c.x+=R,c.y-=M,Y.x=Math.max(-2,Math.min(2,R/Math.max(S,16)*1e3)),Y.y=Math.max(-2,Math.min(2,M/Math.max(S,16)*1e3)),clearTimeout(a.wheelTimeout),a.wheelTimeout=setTimeout(()=>{document.body.classList.remove("dragging")},150)}};a.addEventListener("mousedown",ge),a.addEventListener("mousemove",ye),a.addEventListener("mouseup",j),a.addEventListener("mouseleave",j);let y={passive:!1};a.addEventListener("touchstart",ve,y),a.addEventListener("touchmove",we,y),a.addEventListener("touchend",j,y),a.addEventListener("wheel",g,y),window.addEventListener("resize",xe),a.addEventListener("contextmenu",T=>T.preventDefault()),o.domElement.addEventListener("mousemove",he),o.domElement.addEventListener("mouseleave",()=>{d.x=d.y=-1,b={x:-999,y:-999},P=0,r!=null&&r.material.uniforms&&r.material.uniforms.uMousePos.value.set(-1,-1)})},oe=()=>{requestAnimationFrame(oe),(Math.abs(Y.x)>.01||Math.abs(Y.y)>.01)&&(c.x+=Y.x*.016,c.y-=Y.y*.016,Y.x*=.92,Y.y*=.92),n.x+=(c.x-n.x)*e.lerpFactor,n.y+=(c.y-n.y)*e.lerpFactor,f+=(v-f)*e.lerpFactor,C.x!==b.x||C.y!==b.y?E>.01?E=J(E,0,L*1.5):(C.x=b.x,C.y=b.y,b.x!==-999&&(P=1)):(P=b.x===-999?0:1,E=J(E,P,L)),r!=null&&r.material.uniforms&&(r.material.uniforms.uOffset.value.set(n.x,n.y),r.material.uniforms.uZoom.value=f,r.material.uniforms.uHoveredCell.value.set(C.x,C.y),r.material.uniforms.uHoverIntensity.value=E),o.render(i,l)};(async()=>{let a=document.getElementById("gallery");if(!a)return;let m=a.querySelector("canvas");if(m&&m.remove(),t.length===0)return;i=new THREE.Scene,l=new THREE.OrthographicCamera(-1,1,1,-1,.1,10),l.position.z=1,o=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),o.setSize(a.offsetWidth,a.offsetHeight),o.setPixelRatio(window.devicePixelRatio),o.setClearColor(new THREE.Color(0,0,0),0),a.appendChild(o.domElement);let g=await U(),y=z(g,!1);console.log(w);let T=z(w,!0),x={uOffset:{value:new THREE.Vector2(0,0)},uResolution:{value:new THREE.Vector2(a.offsetWidth,a.offsetHeight)},uBorderColor:{value:new THREE.Vector4(...W(e.borderColor))},uHoverColor:{value:new THREE.Vector4(...W(e.hoverColor))},uBackgroundColor:{value:new THREE.Vector4(...W(e.backgroundColor))},uMousePos:{value:new THREE.Vector2(-1,-1)},uZoom:{value:1},uCellSize:{value:e.cellSize},uTextureCount:{value:t.length},uAtlasSize:{value:y.atlasSize},uAtlasWidth:{value:y.atlasWidth},uAtlasHeight:{value:y.atlasHeight},uImageAtlas:{value:y.texture},uTextAtlas:{value:T.texture},uHoveredCell:{value:new THREE.Vector2(-999,-999)},uHoverIntensity:{value:0}},S=new THREE.PlaneGeometry(2,2),k=new THREE.ShaderMaterial({vertexShader:re,fragmentShader:se,uniforms:x});k.needsUpdate=!0,o.compile(i,l),r=new THREE.Mesh(S,k),i.add(r),$e(),be(),oe(),te.init()})()}function D(e,t){let i="0123456789!@#$%^&*()_+<>?:|";gsap.to(e,{duration:.5,scrambleText:{text:t,chars:i,speed:.3,ease:"power2.inOut"}})}function N(e){let t={lines:{duration:.8,stagger:.08},words:{duration:.6,stagger:.06},chars:{duration:.4,stagger:.01}},i=[],l=[];function o(){l.forEach(s=>{s&&s.kill()}),i.forEach(s=>{s&&s.revert()}),i=[],l=[],$(e).each(function(){let s=$(this),p=s.data("original-text");p&&s.html(p),s.removeClass("animated"),gsap.set(s,{clearProps:"all"}),s.closest("li").length>0&&gsap.set(s.closest("li"),{clearProps:"all"})})}function r(){$(e).each(function(){let s=$(this);if(s.hasClass("split-initialized"))return;s.addClass("split-initialized"),s.removeClass("animated");let p=s.data("original-text")||s.text();s.data("original-text",p),s.find(".line, .word, .letter").length>0&&s.html(p);let n=s.data("split-reveal")||"lines",c=n==="lines"?["lines"]:n==="words"?["lines","words"]:["lines","words","chars"],d=s.closest("li").length>0;gsap.set(s,{visibility:"visible",opacity:1,clearProps:"transform"}),d&&gsap.set(s.closest("li"),{opacity:0});try{let f=new SplitText(s[0],{type:c.join(", "),mask:"lines",linesClass:"line",wordsClass:"word",charsClass:"letter"});i.push(f);let v=f[n];if(!v||v.length===0){console.warn("No split targets found for",s);return}gsap.set(v,{yPercent:110});let w=t[n],C=s.data("trigger-type")||"load",b=()=>{let E=gsap.timeline({onComplete:()=>{s.addClass("animated")}});return d&&E.to(s.closest("li"),{opacity:1,duration:w.duration*.3,ease:"power2.out"},0),E.to(v,{yPercent:-8,duration:w.duration,stagger:w.stagger,ease:"expo.out"},d?w.duration*.15:0),E};if(C==="scroll"){let E=ScrollTrigger.create({trigger:s[0],start:"clamp(top 80%)",once:!0,onEnter:b});l.push(E)}else gsap.delayedCall(.2,b)}catch(f){console.error("Error in SplitText:",f)}})}setTimeout(r,300);function u(s,p){let n;return function(){let c=this,d=arguments;clearTimeout(n),n=setTimeout(()=>s.apply(c,d),p)}}let h=u(r,200);return $(window).on("resize",h),function(){$(window).off("resize",h),o(),$(e).each(function(){$(this).removeClass("split-initialized")})}}function Ge(e){let t=[];function i(){t.forEach(r=>{r&&r.kill()}),t=[],$(e).each(function(){let r=$(this);if(r.hasClass("animated"))return;let u=r.data("duration")||.6,h=r.data("delay")||0,s=r.data("trigger-type")||"scroll";gsap.set(r,{opacity:0});let p=()=>{gsap.to(r,{opacity:1,duration:u,delay:h,ease:"power2.out",onComplete:()=>{r.addClass("animated")}})};if(s==="scroll"){let n=ScrollTrigger.create({trigger:r[0],start:"clamp(top 95%)",once:!0,onEnter:p});t.push(n)}else gsap.delayedCall(.2,p)})}setTimeout(i,300);function l(r,u){let h;return function(){let s=this,p=arguments;clearTimeout(h),h=setTimeout(()=>r.apply(s,p),u)}}let o=l(i,200);return $(window).on("resize",o),function(){$(window).off("resize",o),t.forEach(u=>{u&&u.kill()})}}function fe(){let e=$(".grid-line.is-h"),t=$(".grid-line.is-v");e.length&&gsap.fromTo(e,{scaleX:0},{scaleX:1,stagger:.1,duration:6,immediateRender:!0,ease:"power4.out"}),t.length&&gsap.fromTo(t,{scaleY:0},{scaleY:1,stagger:.1,duration:2,immediateRender:!0,ease:"power4.inOut"})}function et(){document.querySelectorAll("[data-button-animate-chars]").forEach(i=>{let l=i.textContent;i.innerHTML="",[...l].forEach((o,r)=>{let u=document.createElement("span");u.textContent=o,u.style.transitionDelay=`${r*.01}s`,o===" "&&(u.style.whiteSpace="pre"),i.appendChild(u)})})}function tt(){Fe(),Le(),Ae(),Re(),We(),fe(),Ue(),ze(),Oe(),qe(),de(),document.fonts.ready.then(function(){N('[data-split="heading"]'),Ge("[data-item-reveal]"),et()}),window.initDarkModeToggle(),Ve.init()}function it(){Be(),De(),Ye(),ue(".hp-hero_content-clients ul",".hp-hero_links"),Q(),Xe()}function ot(){je(),Ne(),Ze()}function nt(){setTimeout(()=>{Qe(),fe(),ue(".about_clients-list.cc-clients",".about_clients-item"),Q()},500)}function at(){Je()}function rt(){Ke()}function pe(){window.addEventListener("pageshow",function(e){e.persisted&&window.location.reload()}),me()}$(document).ready(function(){let e=$('[data-barba="container"]').data("barba-namespace");Z(),st()});function Z(e){var i,l,o;tt();let t=((o=(l=(i=e==null?void 0:e.next)==null?void 0:i.container)==null?void 0:l.dataset)==null?void 0:o.barbaNamespace)||$('[data-barba="container"]').data("barba-namespace");t==="home"?it():t==="work"?ot():t==="about"?nt():t==="why"?at():t==="contact"?rt():t==="labs"&&pe(),setTimeout(()=>{gsap.to("[data-barba=container]",{opacity:1})},300)}function st(){l();let e=null,t=null;barba.init({timeout:15e3,prefetchIgnore:!0,sync:!0,debug:!0,transitions:[o(),i()]});function i(){function r(u){let h=$("html"),s=$(u.current.container).find(".page-transition"),p=$(u.next.container).find(".page-transition"),n=gsap.timeline({defaults:{duration:.6,ease:"power2.inOut"}});return n.to(s,{scaleY:1,duration:.4,onComplete:()=>{V(!0)}}),n.to(u.current.container,{scale:.8,duration:.5,onStart:()=>{gsap.set([u.current.container,u.next.container],{position:"fixed",top:0,left:0,width:"100%",height:"100vh",overflow:"hidden"}),gsap.set(h,{backgroundColor:"#4C4C4C"}),gsap.set(u.next.container,{scale:.8,zIndex:2}),gsap.set(u.current.container,{zIndex:1})}},"-=0.1"),n.set(u.current.container,{opacity:0,pointerEvents:"none"},"+=0.2"),n.fromTo(p,{scaleY:1},{scaleY:0,duration:1,onStart:()=>{Z(u)}},"-=0.3"),n.set(u.next.container,{opacity:1},"<"),n.to(u.next.container,{scale:1,duration:1,onComplete:()=>{gsap.set(h,{backgroundColor:""}),gsap.set(u.next.container,{clearProps:"all"}),gsap.set(u.next.container,{opacity:1})}},"<"),n}return{name:"default-transition",before(u){document.documentElement.classList.add("is-animating")},async enter(u){await r(u),ce(u)},async after(u){V(!1),Q(),document.documentElement.classList.remove("is-animating"),de(),u.next.namespace==="labs"&&pe()}}}function l(){let r=document.createElement("style");r.innerHTML=`
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
`,document.head.appendChild(r)}function o(){function r(s){let p=$(s).closest(".work_slider-item").find(".work_slider-item_visual");if(p.length){let n=p[0].getBoundingClientRect(),c=window.getComputedStyle(p[0]);t={rect:n,backgroundColor:c.backgroundColor,borderRadius:c.borderRadius||"0px"},e=document.createElement("div"),e.className="work-item-clone";let f=p.find("img").attr("src")||"";if($(e).css({position:"fixed",top:n.top+"px",left:n.left+"px",width:n.width+"px",height:n.height+"px",backgroundColor:t.backgroundColor,borderRadius:t.borderRadius,zIndex:9999}),f){let v=$('<div class="clone-img-container"></div>'),w=$("<img>").attr("src",f);v.css({width:"100%",height:"100%",overflow:"hidden"}),w.css({width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}),v.append(w),$(e).append(v)}document.body.appendChild(e)}}function u(s){let p=gsap.timeline();if(p.to(s,{opacity:0,duration:.5,onComplete:()=>{V(!0)}}),e&&t){let n=window.innerWidth,c=window.innerHeight,d=Math.min(n*.8,800),f=d*(t.rect.height/t.rect.width),v=(n-d)/2,w=(c-f)/2;p.to(e,{top:w,left:v,width:d,height:f,duration:.8,ease:"power2.inOut",delay:.1},"-=0.3")}return p}function h(s){return new Promise(p=>{let n=$(s).find(".work-d_hero-list-img-mask").first()[0];e&&n?setTimeout(()=>{let c=Flip.getState(e),d=n.getBoundingClientRect();$(e).css({top:d.top+"px",left:d.left+"px",width:d.width+"px",height:d.height+"px"});let f=$(e).find("img");gsap.timeline({onComplete:()=>{gsap.to(s,{opacity:1,duration:.5,onComplete:()=>{e&&(e.remove(),e=null),p()}})}}).add(Flip.from(c,{duration:.8,ease:"power2.inOut"}))},100):(gsap.to(s,{opacity:1,duration:.5,onComplete:p}),e&&(e.remove(),e=null))})}return{name:"home-to-work",from:{namespace:"home"},to:{namespace:"work"},custom:({trigger:s})=>$(s).closest(".work_slider-item").length>0,before(s){document.documentElement.classList.add("is-animating")},beforeLeave(s){r(s.trigger)},leave(s){return u(s.current.container)},beforeEnter(s){gsap.set(s.next.container,{opacity:0,visibility:"visible"})},afterEnter(s){ce(s),V(!1),h(s.next.container)},after(s){Z(s),document.documentElement.classList.remove("is-animating")}}}}})();

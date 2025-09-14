"use strict";(()=>{var Ie=Object.create;var ce=Object.defineProperty;var Pe=Object.getOwnPropertyDescriptor;var _e=Object.getOwnPropertyNames;var Ae=Object.getPrototypeOf,He=Object.prototype.hasOwnProperty;var Me=(e=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(e,{get:(t,i)=>(typeof require!="undefined"?require:t)[i]}):e)(function(e){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var Le=(e,t,i,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of _e(t))!He.call(e,a)&&a!==i&&ce(e,a,{get:()=>t[a],enumerable:!(s=Pe(t,a))||s.enumerable});return e};var Re=(e,t,i)=>(i=e!=null?Ie(Ae(e)):{},Le(t||!e||!e.__esModule?ce(i,"default",{value:e,enumerable:!0}):i,e));var de=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,ue=`
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
`;typeof THREE=="undefined"&&import("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js").then(()=>{ge()});gsap.registerPlugin(SplitText,ScrollTrigger,TextPlugin);function We(){window.lenisInstance&&(window.lenisInstance.destroy(),window.lenisInstance=null);let e;if(Webflow.env("editor")===void 0){let a=function(n){e.raf(n),requestAnimationFrame(a)};var s=a;e=new Lenis({lerp:.075,wheelMultiplier:.7,gestureOrientation:"vertical",normalizeWheel:!1,smoothTouch:!1}),requestAnimationFrame(a),window.lenisInstance=e}$("[data-lenis-start]").off("click").on("click",function(){e.start()}),$("[data-lenis-stop]").off("click").on("click",function(){e.stop()}),$("[data-lenis-toggle]").off("click").on("click",function(){$(this).toggleClass("stop-scroll"),$(this).hasClass("stop-scroll")?e.stop():e.start()});let{body:t}=document;new ResizeObserver(()=>{e.resize()}).observe(t)}function ze(){if(document.documentElement.style.setProperty("--gap-size","0"),!document.querySelector(".site-frame")){let i=["top","right","bottom","left"],s=document.createElement("div");s.className="site-frame-container",i.forEach(n=>{let c=document.createElement("div");c.className=`site-frame site-frame-${n}`,s.appendChild(c)}),document.body.appendChild(s);let a=document.createElement("style");a.innerHTML=`
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
`,document.head.appendChild(a)}let e=window.lenis||null;function t(i){i>100?gsap.to(document.documentElement,{duration:0,"--gap-size":1,ease:"power2.out"}):gsap.to(document.documentElement,{duration:0,"--gap-size":0,ease:"power2.out"})}e?e.on("scroll",({scroll:i})=>{t(i)}):$(window).scroll(function(){t($(this).scrollTop())})}var me=0;function Y(e){window.lenisInstance&&(e===!0?t():i());function t(){me=window.scrollY,$("body").css({overflow:"hidden",position:"fixed",top:"0",width:"100%"}),window.lenisInstance.scrollTo(0,{immediate:!0,onComplete:()=>{window.lenisInstance.stop()}})}function i(){$("body").css({overflow:"",position:"",top:"",width:""}),window.lenisInstance.start(),window.lenisInstance.scrollTo(me,{})}}function qe(){$("[data-scroll-top]").on("click",function(){window.lenisInstance?window.lenisInstance.scrollTo(0):window.scrollTo(0,0)})}function Ve(){function e(){let t=new Date,i={timeZone:"Europe/Paris",hour:"2-digit",minute:"2-digit",hour12:!0},s=t.toLocaleTimeString("en-GB",i);$("[data-time-cet]").text(`CET ${s}`)}e(),setInterval(e,1e3)}function Ue(){let t=document.querySelectorAll("[data-css-marquee]"),i=[],s;function a(r){if(r.getAttribute("data-initialized")==="true")return;r.querySelectorAll("[data-css-marquee-list]").forEach(m=>{let f=m.cloneNode(!0);r.appendChild(f)}),r.querySelectorAll("[data-css-marquee-list]").forEach(m=>{m.style.animationDuration=m.offsetWidth/60+"s",m.style.animationPlayState="paused"}),r.setAttribute("data-initialized","true"),i.push(r)}function n(r){let l=r.querySelectorAll("[data-css-marquee-list]");for(let f=l.length-1;f>=l.length/2;f--)l[f].remove();r.querySelectorAll("[data-css-marquee-list]").forEach(f=>{f.style.animationDuration="",f.style.animationPlayState=""}),r.setAttribute("data-initialized","false");let m=i.indexOf(r);m>-1&&i.splice(m,1)}function c(r){let l=parseInt(r.getAttribute("data-breakpoint")||"0");window.innerWidth<=l?a(r):r.getAttribute("data-initialized")==="true"&&n(r)}let g=new IntersectionObserver(r=>{r.forEach(l=>{l.target.getAttribute("data-initialized")==="true"&&l.target.querySelectorAll("[data-css-marquee-list]").forEach(m=>m.style.animationPlayState=l.isIntersecting?"running":"paused")})},{threshold:0});function u(){t.forEach(r=>{c(r),g.observe(r)})}function v(){clearTimeout(s),s=setTimeout(()=>{t.forEach(r=>{c(r)})},250)}window.addEventListener("resize",v),u()}function he(){function e(s,a=!1){let n=document.getElementById(s);if(n&&window.lenisInstance){let c=()=>{window.lenisInstance.scrollTo(n,{duration:1,easing:g=>Math.min(1,1.001-Math.pow(2,-10*g))})};a?c():setTimeout(c,100),a&&window.history.pushState({},"",window.location.pathname+"?anchor="+s)}}let i=new URLSearchParams(window.location.search).get("anchor");i&&e(i),$('a[href^="?anchor="], a[href^="#"], a[href*="'+window.location.pathname+'?anchor="]').on("click",function(s){let a=$(this).attr("href"),n;if(a.startsWith("#"))n=a.substring(1);else if(a.includes("?anchor=")){let c=a.split("?"),g=window.location.pathname,u=c[0]||g;(u===g||u==="")&&(s.preventDefault(),n=new URLSearchParams(c[1]).get("anchor"))}n&&($(".nav_menu").is(":visible")?(Y(!1),$('[data-nav-toggle="close"]').trigger("click"),setTimeout(()=>{e(n,!0)},500)):e(n,!0))})}function Fe(){$("[data-copy-clipboard]").on("click",function(){let e=$(this).attr("data-copy-clipboard"),t=$(`[data-copy-clipboard="${e}"]`).find(".line");if(t.length){let i=t.text(),s=()=>{let a=$('<div class="copy-tooltip">Copied</div>');a.css({position:"absolute",background:"var(--body-2)",color:"var(--text-2)",padding:".5em 1em",borderRadius:".25em",fontSize:"1.5rem",whiteSpace:"nowrap",zIndex:9999,pointerEvents:"none"});let n=t.offset();a.css({top:n.top-40,left:n.left+t.outerWidth()/2-a.outerWidth()/2}),$("body").append(a),setTimeout(()=>{a.remove()},1500)};navigator.clipboard.writeText(i).then(()=>{s()}).catch(()=>{let a=document.createElement("textarea");a.value=i,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),s()})}})}function fe(e){let t=new DOMParser().parseFromString(e.next.html,"text/html").querySelector("html").getAttribute("data-wf-page");document.documentElement.setAttribute("data-wf-page",t),window.Webflow&&window.Webflow.destroy(),window.Webflow&&window.Webflow.ready(),window.Webflow&&window.Webflow.require&&window.Webflow.require("ix2")&&window.Webflow.require("ix2").init(),$(".w--current").removeClass("w--current"),$("a").each(function(){$(this).attr("href")===window.location.pathname&&$(this).addClass("w--current")})}var De={isOpen:!1,$overlay:null,$container:null,$videoWrapper:null,$originalElement:null,originalMaxWidth:null,originalPlayers:[],modalPlayer:null,init(){this.initOriginalPlyrs(),this.bindEvents(),this.addStyles()},initOriginalPlyrs(){let e=$(".plyr_video");e.length&&(this.originalPlayers=[],e.each((t,i)=>{let s=new Plyr(i,{controls:["play","progress","mute","fullscreen"],muted:!0,autoplay:!0,loop:{active:!0}});$(i).closest("[data-video-player]").find(".plyr__controls").hide(),s.on("ready",()=>{setTimeout(()=>{s.play(),s.muted=!0},100)}),s.on("loadeddata",()=>{s.play()}),this.originalPlayers.push(s)}))},bindEvents(){$("[data-video-player]").each((e,t)=>{$(t).click(i=>{i.preventDefault(),this.open($(i.currentTarget))})})},open(e){if(this.isOpen)return;if(window.innerWidth<768||/Mobi|Android/i.test(navigator.userAgent)){let i=e.find("video")[0];if(i){i.removeAttribute("playsinline"),i.removeAttribute("webkit-playsinline"),i.controls=!1,i.currentTime=0,i.muted=!1;let s=()=>{i.removeEventListener("webkitendfullscreen",s),i.removeEventListener("fullscreenchange",s),i.pause(),i.setAttribute("playsinline",""),i.setAttribute("webkit-playsinline",""),i.controls=!1;let a=e.closest("[data-video-player]"),n=$(i).clone(!0)[0];i.replaceWith(n);let c=new Plyr(n,{controls:["play","progress","mute","fullscreen"],muted:!0,autoplay:!0,loop:{active:!0}});$(a).find(".plyr__controls").hide(),c.on("ready",()=>{c.play().catch(()=>{})})};i.addEventListener("webkitendfullscreen",s),i.addEventListener("fullscreenchange",()=>{document.fullscreenElement||s()}),i.play().then(()=>{let a=i.requestFullscreen||i.webkitEnterFullscreen||i.webkitRequestFullscreen||i.msRequestFullscreen;a&&a.call(i)}).catch(a=>{console.warn("Autoplay or fullscreen failed:",a)})}return}this.$originalElement=e,this.originalMaxWidth=e.css("max-width"),Y(!0),e.css("max-width","none"),this.createElement(),this.setupModal(e),this.animateIn(),this.isOpen=!0},close(){this.isOpen&&(this.pauseVideo(),this.animateOut())},createElement(){this.$overlay=$('<div class="video-modal-overlay"></div>'),this.$container=$('<div class="video-modal-container"></div>'),this.$videoWrapper=$('<div class="video-modal-wrapper"></div>');let e=$('<div class="video-modal-close">\xD7</div>');this.$videoWrapper.append(e),this.$container.append(this.$videoWrapper),this.$overlay.append(this.$container),$("body").append(this.$overlay),this.bindCloseEvents(e)},setupModal(e){let t=e[0].getBoundingClientRect(),i=e.attr("data-video-player")||"16/9";this.$container.css({position:"fixed",left:t.left+"px",top:t.top+"px",width:t.width+"px",height:t.height+"px",zIndex:9999}),this.$videoWrapper.css("aspect-ratio",i);let s=e.clone(!0);s.find(".plyr").replaceWith(s.find("video")),this.$videoWrapper.append(s),e.css("visibility","hidden")},animateIn(){gsap.set(this.$overlay,{opacity:0}),gsap.to(this.$overlay,{opacity:1,duration:.3}),gsap.to(this.$container,{left:"5vw",top:"5vh",width:"90vw",height:"90vh",duration:.6,ease:"power2.out",onComplete:()=>this.activateModalVideo()})},activateModalVideo(){let t=this.$videoWrapper.find("[data-video-player]").find(".plyr_video");t.length&&(this.modalPlayer=new Plyr(t[0],{controls:["play","progress","mute","fullscreen"],muted:!1,autoplay:!1,loop:{active:!0}}),this.modalPlayer.on("ready",()=>{setTimeout(()=>{this.modalPlayer.restart(),this.modalPlayer.muted=!1,this.modalPlayer.play().catch(()=>{})},100)}))},animateOut(){let e=this.$originalElement[0].getBoundingClientRect();gsap.to(this.$container,{left:e.left+"px",top:e.top+"px",width:e.width+"px",height:e.height+"px",duration:.4,ease:"power2.in"}),gsap.to(this.$overlay,{opacity:0,duration:.3,delay:.2,onComplete:()=>this.cleanup()})},cleanup(){this.$overlay.remove(),this.$originalElement.css({visibility:"visible","max-width":this.originalMaxWidth}),this.modalPlayer&&(this.modalPlayer.destroy(),this.modalPlayer=null),Y(!1),$(document).off("keydown.videoModal"),this.resetProperties()},resetProperties(){this.isOpen=!1,this.$overlay=null,this.$container=null,this.$videoWrapper=null,this.$originalElement=null,this.originalMaxWidth=null},bindCloseEvents(e){e.click(()=>this.close()),this.$overlay.click(t=>{t.target===this.$overlay[0]&&this.close()}),$(document).on("keydown.videoModal",t=>{t.key==="Escape"&&this.close()})},playVideo(){this.modalPlayer&&this.modalPlayer.play()},pauseVideo(){this.modalPlayer&&this.modalPlayer.pause()},addStyles(){$("<style>").text(`
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
    `).appendTo("head")}};function ie(){let e=document.querySelector(".cursor");if(!e)return;let t=e.querySelector("p"),i=document.querySelectorAll("[data-cursor]"),s=6,a=140,n=!1,c=null,g="",u=!1,v,r,l=()=>window.innerWidth>=992,m=()=>{l()&&(u=!0,gsap.set(e,{xPercent:s,yPercent:a,scale:.8}),v=gsap.quickTo(e,"x",{ease:"power3"}),r=gsap.quickTo(e,"y",{ease:"power3"}),e.style.display="block")},f=()=>{u=!1,e&&(e.style.display="none")},y=()=>e.offsetWidth+16,T=E=>{if(!u)return;let S=window.innerWidth,H=window.innerHeight,{scrollY:L}=window,X=E.clientX,M=E.clientY+L,W=s,U=a,F=y();if(X>S-F?(n=!0,W=-100):n=!1,M>L+H*.9&&(U=-120),c){let B=c.getAttribute("data-cursor");B!==g&&(t.innerHTML=B,g=B,F=y())}gsap.to(e,{xPercent:W,yPercent:U,duration:.9,scale:1,ease:"power3"}),v(X),r(M-L)},I=E=>{if(!u)return;c=E;let S=E.getAttribute("data-cursor");S!==g&&(t.innerHTML=S,g=S,y()),E.tagName!=="A"?(e.style.backgroundColor="var(--text-3)",e.style.color="var(--body-2)"):(e.style.backgroundColor="",e.style.color="")},w=()=>{l()&&!u?m():!l()&&u&&f()};window.addEventListener("mousemove",T),window.addEventListener("resize",w),i.forEach(E=>{E.addEventListener("mouseenter",()=>I(E))}),l()&&m()}function Oe(){let e=$('[data-nav-toggle="open"]'),t=$('[data-nav-toggle="close"]'),i=$(".nav_menu"),s=$("[data-menu-brand]"),a=$(".nav_menu-item"),n=$(".nav_menu-sublinks li"),c=$(".nav_menu-meta");gsap.set(i,{display:"none"}),gsap.set([i,a,n,c],{opacity:0}),gsap.set(s,{text:""});let g={open:()=>{let r=gsap.timeline();return Z(s,s.attr("data-menu-text")),r.set(i,{display:"flex"}),r.set(t,{yPercent:100}),r.to(e.find("svg"),{scale:0,ease:"power4.out"}),r.to(e,{scale:0,ease:"power4.out"},"<0.1"),r.to(i,{opacity:1},"<"),r.to(t,{yPercent:0}),r.to(a,{opacity:1,stagger:.1},"<"),r.fromTo(a.find(".nav_menu-item_list"),{scale:0},{scale:1,stagger:.1},"<0.3"),r.fromTo(a.find("p"),{yPercent:300},{yPercent:0,stagger:.1,duration:.6},"<"),r.fromTo(a.find(".w-embed"),{xPercent:300},{xPercent:0,stagger:.1,duration:.6},"<"),r.to([n,c],{opacity:1,stagger:.2},"<"),r},close:()=>{let r=gsap.timeline();return r.to([n,c],{opacity:0,duration:.3}),r.to(t,{yPercent:100},"<"),r.to(a.find("p"),{yPercent:300,stagger:.05,duration:1},"<0.2"),r.to(a.find(".nav_menu-item_list"),{scale:0,stagger:.1},"<"),r.to(a,{opacity:0,stagger:.1},"<"),r.to(i,{opacity:0},"<0.4"),r.to(e.find("svg"),{scale:1,ease:"power4.out"},"<"),r.to(e,{scale:1,ease:"power4.out"},"<"),r.set(i,{display:"none"}),Z(s,""),r}};function u(){g.open(),Y(!0)}function v(){g.close(),Y(!1)}e.on("click",u),t.on("click",v)}function Ye(){$(".nav_meta-col").each(function(){let e=$(this).find("a"),t=$(this).find("p");Q(e),Q(t),gsap.fromTo($(".nav_mode"),{scale:0},{scale:1})})}function Xe(){let e=$("[data-back-to-home]"),t=e.find("[data-back-label]"),i=t.attr("data-original-text");e.hover(function(){Z(t,"Home, sweet home")},function(){Z(t,i)})}function Be(){$(".hp-hero_content-block").each(function(){let e=gsap.timeline();Q($(this).find(".hp-hero_content-label").eq(0)),e.fromTo($(this).find("li"),{opacity:0,xPercent:-5},{opacity:1,xPercent:0,stagger:.2}),e.fromTo($(".hp-hero").find("[data-item-reveal]"),{opacity:0,visibility:"hidden"},{opacity:1,visibility:"visible"})}),$(".hp-hero_content-visual").each(function(){gsap.set($(this),{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"}),gsap.to($(this),{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"power3.inOut",onComplete:()=>{$(this).css("clip-path","")}})})}function Ne(){let e=gsap.matchMedia(),t=$(".hp-hero");t.length&&e.add("(min-width: 992px)",()=>{gsap.timeline({scrollTrigger:{trigger:t,start:"center top",end:"bottom top",scrub:1,onEnterBack:()=>{gsap.to($(".hp-work_head-link"),{rotate:0})},onLeave:()=>{gsap.to($(".hp-work_head-link"),{rotate:180})}}}).to($(".hp-hero").add(".nav_wrapper"),{opacity:.1})})}function pe(e,t){$(e).find(t).hover(function(){let i=$(this).parent().index(),s=$(".links-imgs_box-item").length,a=-(i*(100/s));gsap.to(".links-imgs_box-list",{yPercent:a,duration:.3,ease:"power2.inOut"})}),$(e).hover(function(){gsap.to(".links-imgs_box-wrap",{scale:1,duration:.2,ease:"power4.in"})},function(){gsap.to(".links-imgs_box-wrap",{scale:0,duration:.2,ease:"power4.out"})})}function je(){gsap.matchMedia().add("(min-width: 992px)",()=>{let t=$(".work_slider-item"),i=t.length,s=$(".work-wall"),a=$(".hp-work_slider-row"),n=i*100,c=n;s.css("height",c+"vh"),gsap.registerPlugin(ScrollTrigger),gsap.to(a,{xPercent:-(n-100),ease:"none",scrollTrigger:{trigger:s,start:"top top",end:"bottom bottom",scrub:1,pin:!1}});let g=$(".work_slider-item img");if(window.lenisInstance){let u=!1,v;window.lenisInstance.on("scroll",r=>{$(window).width()>991&&(Math.abs(r.velocity)>15&&!u&&(u=!0,gsap.to(g,{scale:1.1,duration:1,ease:"power4.out"}),gsap.to(t.find(".work_slider-item_visual"),{scale:.8,duration:1,ease:"power4.out"})),clearTimeout(v),v=setTimeout(()=>{u=!1,gsap.to(g,{scale:1,duration:1,ease:"power4.out"}),gsap.to(t.find(".work_slider-item_visual"),{scale:1,duration:1,ease:"power4.out"})},15))})}})}function Ze(){$("[data-work-counter]").text("("+$(".work_slider-item").length+")")}function Qe(){var e=gsap.timeline({});let t=".work-d_hero-wrap.cc-images",i=".work-d_hero-wrap.cc-images .work-d_hero-list",s=".work-d_hero-wrap.cc-images .work-d_hero-list-item",a=".work-d_hero-timeline-box",n=".work-navigation";e.set([a,n],{y:"10vh",rotate:.001,opacity:0},"<"),e.to(i,{duration:1,ease:"Power4.easeOut",rotate:.001,y:0,clearProps:"all",delay:0,onComplete:()=>{Q($('[data-split="work-heading"]'))}},"<"),e.from(s,{duration:2,ease:"Expo.easeInOut",rotate:.001,opacity:0,y:"0px",clearProps:"all"},"<"),e.to([a,n],{duration:2.1,ease:"Expo.easeInOut",rotate:.001,y:0,opacity:1,clearProps:"all"},"<")}function ee(){return new Promise(e=>{let t=$(".work-d_hero-list-item");if(!t.length){e();return}let i=t.find("img"),s=0,a=i.length;if(a===0){setTimeout(e,100);return}function n(){s++,s>=a&&setTimeout(e,100)}i.each(function(){this.complete?n():$(this).on("load error",n)}),setTimeout(e,2e3)})}var O={isInitialized:!1,scrollTriggerInstance:null,rafId:null,lastTransformValue:-1,lastUpdateTime:0,cachedData:{}};function Je(){let e,t={},i=0,s=16;function a(){let v=$(".work-d_hero-list-item"),r=$(".work-d_hero-timeline_item"),l=$(window).width()<992;t={items:v,timelineItems:r,isSmallScreen:l,itemData:[],timelineItemSize:l?r.first().outerWidth(!0):r.first().outerHeight(!0)},v.each(function(m){let f=$(this),y=f.offset();t.itemData.push({top:y.top,height:f.outerHeight(),center:y.top+f.outerHeight()/2})})}function n(){e&&e.kill();let v=$(".work-d_hero-part.cc-images");if(!v.length)return;let r=$(".work-d_hero-list"),l=$(".work-d_hero-list-item"),m=$(".work-d_hero-timeline"),f=$(".work-d_hero-timeline-inner"),y=l.first(),T=l.last(),I=$(".work-d_hero-timeline_item"),w=$(window).width()<992;a(),gsap.set(f,{y:0,x:0,force3D:!0,willChange:"transform"});let E=gsap.timeline({paused:!0});w&&E.fromTo(I.find(".work-d_hero-timeline_mask"),{yPercent:50,opacity:0},{yPercent:0,opacity:1,stagger:.2}),e=ScrollTrigger.create({trigger:v[0],onEnter:()=>{m.addClass("cc-active"),w&&E.play()},onEnterBack:()=>{m.addClass("cc-active"),w&&E.play()},onLeave:()=>{m.removeClass("cc-active"),w&&E.reverse()},onLeaveBack:()=>{m.removeClass("cc-active"),w&&E.reverse()},start:()=>y.outerHeight()/2+"px center",end:()=>{let S=r.outerHeight(),H=T.outerHeight();return S-H/2+"px center"},scrub:0,onUpdate:S=>{let H=performance.now();if(H-i<s)return;i=H;let L=$(window).height(),M=$(window).scrollTop()+L/2;if(!t.itemData.length)return;let W=t.itemData[0].center;if(M<W){gsap.set(f,{y:0,x:0}),t.timelineItems.removeClass("active"),t.timelineItems.eq(0).addClass("active");return}let U=0,F=-1;for(let z=0;z<t.itemData.length&&M>=t.itemData[z].center;z++)U=z,F=z;if(F<t.itemData.length-1&&F>=0){let z=t.itemData[F].center,J=t.itemData[F+1].center;if(M>z){let K=(M-z)/(J-z);U+=Math.min(1,Math.max(0,K))}}let B=U*t.timelineItemSize;t.isSmallScreen?gsap.set(f,{x:-B,y:0}):gsap.set(f,{y:-B,x:0})}}),$(document).off("click.workTimeline",".work-d_hero-timeline_item"),$(document).on("click.workTimeline",".work-d_hero-timeline_item",function(){let S=$(this).index(),H=l.eq(S);if(H.length){let L=H.offset().top,X=H.outerHeight(),M=$(window).height(),W=L+X/2-M/2;typeof lenisInstance!="undefined"&&lenisInstance.scrollTo?lenisInstance.scrollTo(W,{duration:1.2,easing:U=>Math.min(1,1.001-Math.pow(2,-10*U))}):$("html, body").animate({scrollTop:Math.max(0,W)},1200)}})}let c;function g(){clearTimeout(c),c=setTimeout(()=>{$(window).width()!==$(window).data("prevWidth")&&($(window).data("prevWidth",$(window).width()),O.isInitialized=!1,setTimeout(()=>{ee().then(()=>{n()})},100))},150)}function u(){O.scrollTriggerInstance&&(O.scrollTriggerInstance.kill(),O.scrollTriggerInstance=null),O.rafId&&(cancelAnimationFrame(O.rafId),O.rafId=null),$(window).off("resize.workTimeline"),$(document).off("click.workTimeline"),O.isInitialized=!1,O.lastTransformValue=-1,O.cachedData={}}return ee().then(()=>{n()}),$(window).off("resize.workTimeline"),$(window).on("resize.workTimeline",g),typeof window.barba!="undefined"&&window.barba.hooks.before(()=>{u()}),{destroy:u,refresh:()=>{u(),ee().then(()=>{n()})}}}function Ke(){let e=$(".work-d_content-part_icon"),t=gsap.timeline({scrollTrigger:{trigger:e}});t.from(e,{scale:0}),t.from(e.find("svg"),{scale:0,delay:.2},"<")}function Ge(){$(document).ready(function(){let e=$(".about_visual-box-inner-extra img"),t=e.length,i=-1,s=[];if(t===0)return;function a(){s=Array.from({length:t},(g,u)=>u);for(let g=s.length-1;g>0;g--){let u=Math.floor(Math.random()*(g+1));[s[g],s[u]]=[s[u],s[g]]}}a(),e.css({display:"block",opacity:0}),$(".about_visual-box-inner").on("click",function(){if(i>=t-1){c();return}n()});function n(){i++;let g=Math.random()*10-5,v=Math.pow(.7,i+1)*.99,r=s[i],l=e.eq(r);gsap.set(l[0],{opacity:0,scale:.8,rotation:g+2,zIndex:i+10}),gsap.to(l[0],{opacity:1,scale:.7,rotation:g,duration:.6,ease:"back.out(1.2)",delay:.1})}function c(){gsap.to(e,{opacity:0,scale:.8,duration:.4,stagger:.05,ease:"power2.in",onComplete:function(){gsap.set(e,{scale:1,rotation:0,zIndex:"auto"}),i=-1,a()}})}})}function et(){function e(a){let n=a.activeIndex,c=a.slides[n];Z($('[data-work-slider="title"]'),$(c).attr("data-title")),Z($('[data-work-slider="desc"]'),$(c).attr("data-description"))}let t=new Swiper(".why-hero_cases-slider",{slidesPerView:1,effect:"fade",fadeEffect:{crossfade:!0},loop:!0,pagination:{el:".swiper-nav.cc-cases",bulletClass:"swiper-dot",bulletActiveClass:"cc-active",clickable:!0},on:{slideChange:function(){e(this)},init:function(){e(this)}}}),i=new Swiper(".why-hero_quotes-slider",{slidesPerView:1,effect:"fade",fadeEffect:{crossFade:!0},loop:!0,speed:200,navigation:{nextEl:".why-hero_quotes-slide-inner"},pagination:{el:".swiper-nav.cc-quotes",bulletClass:"swiper-dot",bulletActiveClass:"cc-active",clickable:!0},on:{init:function(){s(this),$(".swiper-slide").each(function(){gsap.set($(this).find("[data-item-el]"),{yPercent:50,opacity:0})}),gsap.to($(".swiper-slide-active [data-item-el]"),{yPercent:0,opacity:1,stagger:.2,duration:.6,ease:"power2.out"})},slideChangeTransitionEnd:function(){gsap.to($(".swiper-slide:not(.swiper-slide-active) [data-item-el]"),{yPercent:50,opacity:0,stagger:.1,duration:.3}),gsap.to($(".swiper-slide-active [data-item-el]"),{yPercent:0,opacity:1,stagger:.2,duration:.6,delay:.2,ease:"power2.out"})}}});function s(a){let{slides:n}=a,c=n.length;n.forEach((g,u)=>{let v=$(g).find(".why-hero_quotes-avatar-circle.cc-1"),r=$(g).find(".why-hero_quotes-avatar-circle.cc-2"),l=(u+1)%c,m=(u+2)%c,f=$(n[l]).find(".why-hero_quotes-avatar-circle.cc-avatar img").attr("src"),y=$(n[m]).find(".why-hero_quotes-avatar-circle.cc-avatar img").attr("src");y&&v.find("img").attr("src",y),f&&r.find("img").attr("src",f)})}}function tt(){document.querySelectorAll("[data-form-validate]").forEach(t=>{let i=new Date().getTime(),s=t.querySelector("form");if(!s)return;let a=s.querySelectorAll("[data-validate]"),n=s.querySelector("[data-submit]");if(!n)return;let c=n.querySelector('input[type="submit"]');if(!c)return;function g(){return new Date().getTime()-i<5e3}a.forEach(function(l){let m=l.querySelector("select");m&&m.querySelectorAll("option").forEach(function(y){(y.value===""||y.value==="disabled"||y.value==="null"||y.value==="false")&&y.setAttribute("disabled","disabled")})});function u(){let l=!0,m=null;return a.forEach(function(f){let y=f.querySelector("input, textarea, select"),T=f.querySelector("[data-radiocheck-group]");!y&&!T||(y&&(y.__validationStarted=!0),T&&(T.__validationStarted=!0,T.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(w){w.__validationStarted=!0})),r(f),v(f)||(l=!1,m||(m=y||T.querySelector("input"))))}),!l&&m&&m.focus(),l}function v(l){let m=l.querySelector("[data-radiocheck-group]");if(m){let S=m.querySelectorAll('input[type="radio"], input[type="checkbox"]'),H=m.querySelectorAll("input:checked"),L=parseInt(m.getAttribute("min"))||1,X=parseInt(m.getAttribute("max"))||S.length,M=H.length;return S[0].type==="radio"?M>=1:S.length===1?S[0].checked:M>=L&&M<=X}let f=l.querySelector("input, textarea, select");if(!f)return!1;let y=!0,T=parseInt(f.getAttribute("min"))||0,I=parseInt(f.getAttribute("max"))||1/0,w=f.value.trim(),{length:E}=w;return f.tagName.toLowerCase()==="select"?(w===""||w==="disabled"||w==="null"||w==="false")&&(y=!1):f.type==="email"?y=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(w):(f.hasAttribute("min")&&E<T&&(y=!1),f.hasAttribute("max")&&E>I&&(y=!1)),y}function r(l){let m=l.querySelector("[data-radiocheck-group]");if(m){let f=m.querySelectorAll('input[type="radio"], input[type="checkbox"]');m.querySelectorAll("input:checked").length>0?l.classList.add("is--filled"):l.classList.remove("is--filled"),v(l)?(l.classList.add("is--success"),l.classList.remove("is--error")):(l.classList.remove("is--success"),Array.from(f).some(w=>w.__validationStarted)?l.classList.add("is--error"):l.classList.remove("is--error"))}else{let f=l.querySelector("input, textarea, select");if(!f)return;f.value.trim()?l.classList.add("is--filled"):l.classList.remove("is--filled"),v(l)?(l.classList.add("is--success"),l.classList.remove("is--error")):(l.classList.remove("is--success"),f.__validationStarted?l.classList.add("is--error"):l.classList.remove("is--error"))}}a.forEach(function(l){let m=l.querySelector("input, textarea, select"),f=l.querySelector("[data-radiocheck-group]");f?f.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(T){T.__validationStarted=!1,T.addEventListener("change",function(){requestAnimationFrame(function(){if(!T.__validationStarted){let I=f.querySelectorAll("input:checked").length,w=parseInt(f.getAttribute("min"))||1;I>=w&&(T.__validationStarted=!0)}T.__validationStarted&&r(l)})}),T.addEventListener("blur",function(){T.__validationStarted=!0,r(l)})}):m&&(m.__validationStarted=!1,m.tagName.toLowerCase()==="select"?m.addEventListener("change",function(){m.__validationStarted=!0,r(l)}):(m.addEventListener("input",function(){let y=m.value.trim(),{length:T}=y,I=parseInt(m.getAttribute("min"))||0,w=parseInt(m.getAttribute("max"))||1/0;m.__validationStarted||(m.type==="email"?v(l)&&(m.__validationStarted=!0):(m.hasAttribute("min")&&T>=I||m.hasAttribute("max")&&T<=w)&&(m.__validationStarted=!0)),m.__validationStarted&&r(l)}),m.addEventListener("blur",function(){m.__validationStarted=!0,r(l)})))}),n.addEventListener("click",function(){if(u()){if(g()){alert("Form submitted too quickly. Please try again.");return}c.click()}}),s.addEventListener("keydown",function(l){if(l.key==="Enter"&&l.target.tagName!=="TEXTAREA"&&(l.preventDefault(),u())){if(g()){alert("Form submitted too quickly. Please try again.");return}c.click()}})}),$(".form-checkbox").each(function(){let t=$(this),i=t.find('input[type="checkbox"], input[type="radio"]');function s(){i.attr("type")==="radio"&&$(`input[name="${i.attr("name")}"]`).not(":checked").each(function(){$(this).closest(".form-checkbox").removeClass("cc-active")}),i.is(":checked")?t.addClass("cc-active"):t.removeClass("cc-active")}s(),i.on("change",s)})}function ge(){if(!document.getElementById("gallery"))return;let e={cellSize:.75,zoomLevel:1.25,lerpFactor:.075,borderColor:"rgba(255, 255, 255, 0.15)",backgroundColor:"transparent",textColor:"#ffffff",hoverColor:"rgba(255, 255, 255, 0)",wheelSensitivity:8e-4,wheelDamping:.92,momentumThreshold:.1,mouseSensitivity:.003,touchSensitivity:.008},t=[];$("[data-lab-item]").each(function(){let o=$(this),d={id:o.attr("data-lab-item"),title:o.find("[data-lab-title]").text().trim(),label:o.find("[data-lab-label]").text().trim(),desc:o.find("[data-lab-desc]").text().trim(),image:o.find("[data-lab-img]").attr("src"),imageHiRes:o.find("[data-lab-hires-img]").attr("src")};t.push(d)});let i,s,a,n,c=!1,g=!0,u=0,v={x:0,y:0},r={x:0,y:0},l={x:0,y:0},m={x:-1,y:-1},f=1,y=1,T=[],I={x:-999,y:-999},w={x:-999,y:-999},E=0,S=0,H=.15,L=o=>{if(o==="transparent")return[0,0,0,0];if(o.startsWith("#")){let h=o.slice(1),p=parseInt(h.substr(0,2),16)/255,b=parseInt(h.substr(2,2),16)/255,x=parseInt(h.substr(4,2),16)/255;return[p,b,x,1]}let d=o.match(/rgba?\(([^)]+)\)/);return d?d[1].split(",").map((h,p)=>p<3?parseFloat(h.trim())/255:parseFloat(h.trim()||1)):[0,0,0,1]},X=()=>{let o=document.getElementById("gallery");return getComputedStyle(o).color||"#ffffff"},M=(o,d)=>{let h=document.createElement("canvas");h.width=512,h.height=512;let p=h.getContext("2d");p.clearRect(0,0,512,512),p.font="100px Arial",p.fillStyle=X(),p.textBaseline="top";let x=((C,_)=>{let P=C.split(" "),R=[],A=P[0];for(let q=1;q<P.length;q++){let D=P[q],{width:j}=p.measureText(A+" "+D);j<_?A+=" "+D:(R.push(A),A=D)}return R.push(A),R})(o,400);x.forEach((C,_)=>{p.fillText(C,25,25+_*35)}),p.fillStyle="red",p.fillText(d,25,25+x.length*35+10);let k=new THREE.CanvasTexture(h);return Object.assign(k,{wrapS:THREE.ClampToEdgeWrapping,wrapT:THREE.ClampToEdgeWrapping,minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter,flipY:!1,generateMipmaps:!1,format:THREE.RGBAFormat}),k},W=(o,d=!1)=>{let p=o.length,b=1,x=512,k=document.createElement("canvas");k.width=p*x,k.height=b*x;let C=k.getContext("2d");o.forEach((P,R)=>{var D,j;let A=R%p*x,q=Math.floor(R/p)*x;d&&((D=P.source)!=null&&D.data)?C.drawImage(P.source.data,A,q,x,x):d||((j=P.image)!=null&&j.complete&&P.image.naturalWidth>0?C.drawImage(P.image,A,q,x,x):(C.fillStyle="#ff0000",C.fillRect(A,q,x,x)))});let _=new THREE.CanvasTexture(k);return Object.assign(_,{wrapS:THREE.ClampToEdgeWrapping,wrapT:THREE.ClampToEdgeWrapping,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,flipY:!1}),_.needsUpdate=!0,{texture:_,atlasWidth:p,atlasHeight:b}},U=()=>{let o=new THREE.TextureLoader,d=[],h=0;return new Promise(p=>{t.forEach((b,x)=>{let k=o.load(b.image,()=>{++h===t.length&&p(d)},void 0,C=>{++h===t.length&&p(d)});Object.assign(k,{wrapS:THREE.ClampToEdgeWrapping,wrapT:THREE.ClampToEdgeWrapping,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter}),d.push(k),T.push(M(b.title,b.label))})})},F=(o,d)=>{let h=Math.floor((o+d*11)%t.length),p=h<0?t.length+h:h;return t[p]},B=()=>{if(!a||m.x<0||m.y<0){w={x:-999,y:-999};return}let o=a.domElement.getBoundingClientRect(),d=m.x/o.width*2-1,h=-(m.y/o.height*2-1),p=Math.sqrt(d*d+h*h),b=1-.08*p*p,x=d*b,k=h*b,C=o.width/o.height,_=x*C*f+r.x,P=k*f+r.y,R=_/e.cellSize*.95,A=P/e.cellSize*.95,q=Math.floor(R),D=Math.floor(A);w={x:q,y:D}},z=o=>{let d=a.domElement.getBoundingClientRect();m.x=o.clientX-d.left,m.y=o.clientY-d.top,B(),n!=null&&n.material.uniforms&&n.material.uniforms.uMousePos.value.set(m.x,m.y)},J=(o,d,h)=>o+(d-o)*h,K=o=>{let{target:d}=o;return d.closest("nav")||d.closest(".navbar")||d.closest("[data-nav]")||d.closest("header")||d.tagName==="A"||d.closest("a")},ne=(o,d,h)=>K(o)?!1:(c=!0,g=!0,u=Date.now(),document.body.classList.add("dragging"),v.x=d,v.y=h,setTimeout(()=>c&&(y=e.zoomLevel),150),!0),we=o=>{ne(o,o.clientX,o.clientY)},xe=o=>{ne(o,o.touches[0].clientX,o.touches[0].clientY)&&o.preventDefault()},oe=(o,d,h=!1)=>{if(!c||o===void 0||d===void 0)return;let p=o-v.x,b=d-v.y;(Math.abs(p)>2||Math.abs(b)>2)&&(g=!1,y===1&&(y=e.zoomLevel));let x=h?e.touchSensitivity:e.mouseSensitivity;l.x-=p*x,l.y+=b*x,v.x=o,v.y=d},be=o=>oe(o.clientX,o.clientY),Te=o=>{o.preventDefault(),oe(o.touches[0].clientX,o.touches[0].clientY,!0)},G=o=>{var d,h,p,b;if(c&&(c=!1,document.body.classList.remove("dragging"),y=1,g&&Date.now()-u<200)){let x=o.clientX||((h=(d=o.changedTouches)==null?void 0:d[0])==null?void 0:h.clientX),k=o.clientY||((b=(p=o.changedTouches)==null?void 0:p[0])==null?void 0:b.clientY);if(x!==void 0&&k!==void 0&&!K(o)){let C=a.domElement.getBoundingClientRect(),_=(x-C.left)/C.width*2-1,P=-((k-C.top)/C.height*2-1),R=Math.sqrt(_*_+P*P),A=1-.08*R*R,q=_*A*(C.width/C.height)*f+r.x,D=P*A*f+r.y,j=Math.floor(q/e.cellSize*.95),Se=Math.floor(D/e.cellSize*.95),le=F(j,Se);le&&ae.open(le.id)}}},ae={activePlayer:null,init(){this.setupEventListeners(),this.checkUrlQuery()},setupEventListeners(){$("[data-modal-close]").on("click",()=>this.close()),$(document).on("keydown",o=>{o.key==="Escape"&&this.close()}),$(".labs-modal_wrap").on("click",o=>{let d=$(o.target),h=$(".labs-modal_video:visible"),p=$(".labs-modal_img-item:visible");!d.closest(".labs-modal_video").length&&!d.closest(".labs-modal_img-item").length&&this.close()}),$(window).on("popstate",()=>{this.checkUrlQuery()})},checkUrlQuery(){let d=new URLSearchParams(window.location.search).get("project");d?$(`[data-lab-item="${d}"]`).length&&this.open(d):this.close()},open(o){this.destroyVideo(),Y(!0),$(".labs-modal_wrap").css("display","flex"),$("[data-lab-item]").hide();let d=$(`[data-lab-item="${o}"]`);d.css("display","flex"),this.handleMediaType(d),this.updateUrl(o)},close(){this.destroyVideo(),Y(!1),$("[data-lab-item]").hide(),$(".labs-modal_wrap").css("display","none"),this.updateUrl()},updateUrl(o=null){let d=new URL(window.location);o?d.searchParams.set("project",o):d.searchParams.delete("project"),window.history.pushState({},"",d)},handleMediaType(o){let d=o.find(".labs-modal_video"),h=o.find(".labs-modal_img-item"),p=d.find("video");if(d.hide(),h.hide(),p.length){let x=p.find("source").attr("src")||p.attr("src");x&&x.trim()!==""?(d.show(),this.initializeVideo(p)):h.css("display","flex")}else h.css("display","flex")},initializeVideo(o){if(typeof Plyr!="undefined"){let d=o[0];d.currentTime=0,d.pause(),this.activePlayer=new Plyr(d,{controls:["play-large","play","progress","current-time","mute","volume","fullscreen"],autoplay:!1,loop:{active:!0}}),this.activePlayer.on("ready",()=>{this.activePlayer.currentTime=0,setTimeout(()=>{this.activePlayer&&$(".labs-modal_wrap").is(":visible")&&this.activePlayer.play()},100)}),this.activePlayer.on("loadeddata",()=>{this.activePlayer.currentTime=0})}},destroyVideo(){if(this.activePlayer){try{this.activePlayer.pause(),this.activePlayer.currentTime=0,this.activePlayer.destroy()}catch{}this.activePlayer=null}$("video").each(function(){this.pause(),this.currentTime=0,this.load()})}},$e=()=>{let o=document.getElementById("gallery");if(!o)return;let{offsetWidth:d,offsetHeight:h}=o;s.updateProjectionMatrix(),a.setSize(d,h),a.setPixelRatio(window.devicePixelRatio),n==null||n.material.uniforms.uResolution.value.set(d,h)},Ee=()=>{let o=new MutationObserver(d=>{d.forEach(h=>{h.type==="attributes"&&(h.attributeName==="data-theme"||h.attributeName==="class")&&setTimeout(()=>{Ce()},400)})});o.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme","class"]}),o.observe(document.body,{attributes:!0,attributeFilter:["data-theme","class"]})},Ce=()=>{var b,x;if(!((x=(b=n==null?void 0:n.material)==null?void 0:b.uniforms)!=null&&x.uTextAtlas))return;let o=t.map(k=>M(k.title,k.label)),d=W(o,!0),h=n.material.uniforms.uTextAtlas.value;h&&h.dispose&&h.dispose();let p=d.texture;p.needsUpdate=!0,p.colorSpace=THREE.SRGBColorSpace,n.material.uniforms.uTextAtlas.value=p,n.material.needsUpdate=!0,a.resetState(),a.compile(i,s),a.render(i,s)},N={x:0,y:0},re=0,ut=null,ke=()=>{let o=document.getElementById("gallery");if(!o)return;let d=null,h=b=>{if(b.preventDefault(),d)return;d=setTimeout(()=>{d=null},16);let x=Date.now(),k=x-re;re=x;let{deltaX:C}=b,{deltaY:_}=b;if(Math.abs(b.deltaX)>0||Math.abs(b.deltaY)>0){document.body.classList.add("dragging"),b.deltaMode===1?(C*=16,_*=16):b.deltaMode===2&&(C*=400,_*=400);let P=e.wheelSensitivity||8e-4,R=C*P,A=_*P;l.x+=R,l.y-=A,N.x=Math.max(-2,Math.min(2,R/Math.max(k,16)*1e3)),N.y=Math.max(-2,Math.min(2,A/Math.max(k,16)*1e3)),clearTimeout(o.wheelTimeout),o.wheelTimeout=setTimeout(()=>{document.body.classList.remove("dragging")},150)}};o.addEventListener("mousedown",we),o.addEventListener("mousemove",be),o.addEventListener("mouseup",G),o.addEventListener("mouseleave",G);let p={passive:!1};o.addEventListener("touchstart",xe,p),o.addEventListener("touchmove",Te,p),o.addEventListener("touchend",G,p),o.addEventListener("wheel",h,p),window.addEventListener("resize",$e),o.addEventListener("contextmenu",b=>b.preventDefault()),a.domElement.addEventListener("mousemove",z),a.domElement.addEventListener("mouseleave",()=>{m.x=m.y=-1,w={x:-999,y:-999},S=0,n!=null&&n.material.uniforms&&n.material.uniforms.uMousePos.value.set(-1,-1)})},se=()=>{requestAnimationFrame(se),(Math.abs(N.x)>.01||Math.abs(N.y)>.01)&&(l.x+=N.x*.016,l.y-=N.y*.016,N.x*=.92,N.y*=.92),r.x+=(l.x-r.x)*e.lerpFactor,r.y+=(l.y-r.y)*e.lerpFactor,f+=(y-f)*e.lerpFactor,I.x!==w.x||I.y!==w.y?E>.01?E=J(E,0,H*1.5):(I.x=w.x,I.y=w.y,w.x!==-999&&(S=1)):(S=w.x===-999?0:1,E=J(E,S,H)),n!=null&&n.material.uniforms&&(n.material.uniforms.uOffset.value.set(r.x,r.y),n.material.uniforms.uZoom.value=f,n.material.uniforms.uHoveredCell.value.set(I.x,I.y),n.material.uniforms.uHoverIntensity.value=E),a.render(i,s)};(async()=>{let o=document.getElementById("gallery");if(!o)return;let d=o.querySelector("canvas");if(d&&d.remove(),t.length===0)return;i=new THREE.Scene,s=new THREE.OrthographicCamera(-1,1,1,-1,.1,10),s.position.z=1,a=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),a.setSize(o.offsetWidth,o.offsetHeight),a.setPixelRatio(window.devicePixelRatio),a.setClearColor(new THREE.Color(0,0,0),0),o.appendChild(a.domElement);let h=await U(),p=W(h,!1);console.log(T);let b=W(T,!0),x={uOffset:{value:new THREE.Vector2(0,0)},uResolution:{value:new THREE.Vector2(o.offsetWidth,o.offsetHeight)},uBorderColor:{value:new THREE.Vector4(...L(e.borderColor))},uHoverColor:{value:new THREE.Vector4(...L(e.hoverColor))},uBackgroundColor:{value:new THREE.Vector4(...L(e.backgroundColor))},uMousePos:{value:new THREE.Vector2(-1,-1)},uZoom:{value:1},uCellSize:{value:e.cellSize},uTextureCount:{value:t.length},uAtlasSize:{value:p.atlasSize},uAtlasWidth:{value:p.atlasWidth},uAtlasHeight:{value:p.atlasHeight},uImageAtlas:{value:p.texture},uTextAtlas:{value:b.texture},uHoveredCell:{value:new THREE.Vector2(-999,-999)},uHoverIntensity:{value:0}},k=new THREE.PlaneGeometry(2,2),C=new THREE.ShaderMaterial({vertexShader:de,fragmentShader:ue,uniforms:x});C.needsUpdate=!0,a.compile(i,s),n=new THREE.Mesh(k,C),i.add(n),ke(),Ee(),se(),ae.init()})()}function Z(e,t){let i="0123456789!@#$%^&*()_+<>?:|";gsap.to(e,{duration:.5,scrambleText:{text:t,chars:i,speed:.3,ease:"power2.inOut"}})}function Q(e){let t={lines:{duration:.8,stagger:.08},words:{duration:.6,stagger:.06},chars:{duration:.4,stagger:.01}},i=[],s=[];function a(){s.forEach(u=>{u&&u.kill()}),i.forEach(u=>{u&&u.revert()}),i=[],s=[],$(e).each(function(){let u=$(this),v=u.data("original-text");v&&u.html(v),u.removeClass("animated"),gsap.set(u,{clearProps:"all"}),u.closest("li").length>0&&gsap.set(u.closest("li"),{clearProps:"all"})})}function n(){$(e).each(function(){let u=$(this);if(u.hasClass("split-initialized"))return;u.addClass("split-initialized"),u.removeClass("animated");let v=u.data("original-text")||u.text();u.data("original-text",v),u.find(".line, .word, .letter").length>0&&u.html(v);let r=u.data("split-reveal")||"lines",l=r==="lines"?["lines"]:r==="words"?["lines","words"]:["lines","words","chars"],m=u.closest("li").length>0;gsap.set(u,{visibility:"visible",opacity:1,clearProps:"transform"}),m&&gsap.set(u.closest("li"),{opacity:0});try{let f=new SplitText(u[0],{type:l.join(", "),mask:"lines",linesClass:"line",wordsClass:"word",charsClass:"letter"});i.push(f);let y=f[r];if(!y||y.length===0){console.warn("No split targets found for",u);return}gsap.set(y,{yPercent:110});let T=t[r],I=u.data("trigger-type")||"load",w=()=>{let E=gsap.timeline({onComplete:()=>{u.addClass("animated")}});return m&&E.to(u.closest("li"),{opacity:1,duration:T.duration*.3,ease:"power2.out"},0),E.to(y,{yPercent:-8,duration:T.duration,stagger:T.stagger,ease:"expo.out"},m?T.duration*.15:0),E};if(I==="scroll"){let E=ScrollTrigger.create({trigger:u[0],start:"clamp(top 80%)",once:!0,onEnter:w});s.push(E)}else gsap.delayedCall(.2,w)}catch(f){console.error("Error in SplitText:",f)}})}setTimeout(n,300);function c(u,v){let r;return function(){let l=this,m=arguments;clearTimeout(r),r=setTimeout(()=>u.apply(l,m),v)}}let g=c(n,200);return $(window).on("resize",g),function(){$(window).off("resize",g),a(),$(e).each(function(){$(this).removeClass("split-initialized")})}}function it(e){let t=[];function i(){t.forEach(n=>{n&&n.kill()}),t=[],$(e).each(function(){let n=$(this);if(n.hasClass("animated"))return;let c=n.data("duration")||.6,g=n.data("delay")||0,u=n.data("trigger-type")||"scroll";gsap.set(n,{opacity:0});let v=()=>{gsap.to(n,{opacity:1,duration:c,delay:g,ease:"power2.out",onComplete:()=>{n.addClass("animated")}})};if(u==="scroll"){let r=ScrollTrigger.create({trigger:n[0],start:"clamp(top 95%)",once:!0,onEnter:v});t.push(r)}else gsap.delayedCall(.2,v)})}setTimeout(i,300);function s(n,c){let g;return function(){let u=this,v=arguments;clearTimeout(g),g=setTimeout(()=>n.apply(u,v),c)}}let a=s(i,200);return $(window).on("resize",a),function(){$(window).off("resize",a),t.forEach(c=>{c&&c.kill()})}}function ve(){let e=$(".grid-line.is-h"),t=$(".grid-line.is-v");e.length&&gsap.fromTo(e,{scaleX:0},{scaleX:1,stagger:.1,duration:6,immediateRender:!0,ease:"power4.out"}),t.length&&gsap.fromTo(t,{scaleY:0},{scaleY:1,stagger:.1,duration:2,immediateRender:!0,ease:"power4.inOut"})}function nt(){document.querySelectorAll("[data-button-animate-chars]").forEach(i=>{let s=i.textContent;i.innerHTML="",[...s].forEach((a,n)=>{let c=document.createElement("span");c.textContent=a,c.style.transitionDelay=`${n*.01}s`,a===" "&&(c.style.whiteSpace="pre"),i.appendChild(c)})})}function ot(){Oe(),ze(),We(),qe(),Ve(),ve(),Ye(),Ue(),Xe(),Fe(),he(),document.fonts.ready.then(function(){Q('[data-split="heading"]'),it("[data-item-reveal]"),nt()}),window.initDarkModeToggle(),De.init()}function at(){Ne(),je(),Be(),pe(".hp-hero_content-clients ul",".hp-hero_links"),ie(),Ze()}var V;function rt(){V&&V.destroy(),setTimeout(()=>{V=Je(),Qe(),Ke()},100)}function st(){setTimeout(()=>{Ge(),ve(),pe(".about_clients-list.cc-clients",".about_clients-item"),ie()},500)}function lt(){et()}function ct(){tt()}function ye(){window.addEventListener("pageshow",function(e){e.persisted&&window.location.reload()}),ge()}$(document).ready(function(){let e=$('[data-barba="container"]').data("barba-namespace");te(),dt()});function te(e){var i,s,a;ot();let t=((a=(s=(i=e==null?void 0:e.next)==null?void 0:i.container)==null?void 0:s.dataset)==null?void 0:a.barbaNamespace)||$('[data-barba="container"]').data("barba-namespace");t==="home"?at():t==="work"?rt():t==="about"?st():t==="why"?lt():t==="contact"?ct():t==="labs"&&ye(),setTimeout(()=>{gsap.to("[data-barba=container]",{opacity:1})},300)}function dt(){s();let e=null,t=null;barba.init({timeout:15e3,prefetchIgnore:!0,sync:!0,debug:!0,transitions:[a(),i()]});function i(){function n(c){let g=$("html"),u=$(c.current.container).find(".page-transition"),v=$(c.next.container).find(".page-transition"),r=gsap.timeline({defaults:{duration:.6,ease:"power2.inOut"}});return r.to(u,{scaleY:1,duration:.4,onComplete:()=>{Y(!0)}}),r.to(c.current.container,{scale:.8,duration:.5,onStart:()=>{gsap.set([c.current.container,c.next.container],{position:"fixed",top:0,left:0,width:"100%",height:"100vh",overflow:"hidden"}),gsap.set(g,{backgroundColor:"#4C4C4C"}),gsap.set(c.next.container,{scale:.8,zIndex:2}),gsap.set(c.current.container,{zIndex:1})}},"-=0.1"),r.set(c.current.container,{opacity:0,pointerEvents:"none"},"+=0.2"),r.fromTo(v,{scaleY:1},{scaleY:0,duration:1,onStart:()=>{te(c)}},"-=0.3"),r.set(c.next.container,{opacity:1},"<"),r.to(c.next.container,{scale:1,duration:1,onComplete:()=>{gsap.set(g,{backgroundColor:""}),gsap.set(c.next.container,{clearProps:"all"}),gsap.set(c.next.container,{opacity:1}),c.next.namespace==="work"&&V&&setTimeout(()=>{V.refresh()},200)}},"<"),r}return{name:"default-transition",before(c){document.documentElement.classList.add("is-animating"),V&&V.destroy()},async enter(c){await n(c),fe(c)},async after(c){Y(!1),ie(),document.documentElement.classList.remove("is-animating"),he(),c.next.namespace==="labs"&&ye()}}}function s(){let n=document.createElement("style");n.innerHTML=`
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
`,document.head.appendChild(n)}function a(){return{name:"home-to-work",from:{namespace:"home"},to:{namespace:"work"},custom:({trigger:n})=>$(n).closest(".work_slider-item").length>0,before(n){document.documentElement.classList.add("is-animating"),V&&V.destroy()},beforeLeave(n){cloneWorkItem(n.trigger)},leave(n){return createLeaveAnimation(n.current.container)},beforeEnter(n){gsap.set(n.next.container,{opacity:0,visibility:"visible"})},afterEnter(n){fe(n),Y(!1),animateCloneToTarget(n.next.container)},after(n){te(n),document.documentElement.classList.remove("is-animating"),n.next.namespace==="work"&&V&&setTimeout(()=>{V.refresh()},300)}}}}})();

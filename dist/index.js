"use strict";(()=>{var Se=Object.create;var de=Object.defineProperty;var Ie=Object.getOwnPropertyDescriptor;var Pe=Object.getOwnPropertyNames;var _e=Object.getPrototypeOf,Ae=Object.prototype.hasOwnProperty;var Me=(e=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(e,{get:(t,i)=>(typeof require!="undefined"?require:t)[i]}):e)(function(e){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var He=(e,t,i,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Pe(t))!Ae.call(e,o)&&o!==i&&de(e,o,{get:()=>t[o],enumerable:!(r=Ie(t,o))||r.enumerable});return e};var Le=(e,t,i)=>(i=e!=null?Se(_e(e)):{},He(t||!e||!e.__esModule?de(i,"default",{value:e,enumerable:!0}):i,e));var ue=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,me=`
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
`;typeof THREE=="undefined"&&import("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js").then(()=>{ve()});gsap.registerPlugin(SplitText,ScrollTrigger,TextPlugin);function Re(){window.lenisInstance&&(window.lenisInstance.destroy(),window.lenisInstance=null);let e;if(Webflow.env("editor")===void 0){let o=function(n){e.raf(n),requestAnimationFrame(o)};var r=o;e=new Lenis({lerp:.075,wheelMultiplier:.7,gestureOrientation:"vertical",normalizeWheel:!1,smoothTouch:!1}),requestAnimationFrame(o),window.lenisInstance=e}$("[data-lenis-start]").off("click").on("click",function(){e.start()}),$("[data-lenis-stop]").off("click").on("click",function(){e.stop()}),$("[data-lenis-toggle]").off("click").on("click",function(){$(this).toggleClass("stop-scroll"),$(this).hasClass("stop-scroll")?e.stop():e.start()});let{body:t}=document;new ResizeObserver(()=>{e.resize()}).observe(t)}function We(){if(document.documentElement.style.setProperty("--gap-size","0"),!document.querySelector(".site-frame")){let i=["top","right","bottom","left"],r=document.createElement("div");r.className="site-frame-container",i.forEach(n=>{let l=document.createElement("div");l.className=`site-frame site-frame-${n}`,r.appendChild(l)}),document.body.appendChild(r);let o=document.createElement("style");o.innerHTML=`
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
`,document.head.appendChild(o)}let e=window.lenis||null;function t(i){i>100?gsap.to(document.documentElement,{duration:0,"--gap-size":1,ease:"power2.out"}):gsap.to(document.documentElement,{duration:0,"--gap-size":0,ease:"power2.out"})}e?e.on("scroll",({scroll:i})=>{t(i)}):$(window).scroll(function(){t($(this).scrollTop())})}var fe=0;function O(e){window.lenisInstance&&(e===!0?t():i());function t(){fe=window.scrollY,$("body").css({overflow:"hidden",position:"fixed",top:"0",width:"100%"}),window.lenisInstance.scrollTo(0,{immediate:!0,onComplete:()=>{window.lenisInstance.stop()}})}function i(){$("body").css({overflow:"",position:"",top:"",width:""}),window.lenisInstance.start(),window.lenisInstance.scrollTo(fe,{})}}function ze(){$("[data-scroll-top]").on("click",function(){window.lenisInstance?window.lenisInstance.scrollTo(0):window.scrollTo(0,0)})}function qe(){function e(){let t=new Date,i={timeZone:"Europe/Paris",hour:"2-digit",minute:"2-digit",hour12:!0},r=t.toLocaleTimeString("en-GB",i);$("[data-time-cet]").text(`CET ${r}`)}e(),setInterval(e,1e3)}function Ve(){let t=document.querySelectorAll("[data-css-marquee]"),i=[],r;function o(s){if(s.getAttribute("data-initialized")==="true")return;s.querySelectorAll("[data-css-marquee-list]").forEach(m=>{let f=m.cloneNode(!0);s.appendChild(f)}),s.querySelectorAll("[data-css-marquee-list]").forEach(m=>{m.style.animationDuration=m.offsetWidth/60+"s",m.style.animationPlayState="paused"}),s.setAttribute("data-initialized","true"),i.push(s)}function n(s){let c=s.querySelectorAll("[data-css-marquee-list]");for(let f=c.length-1;f>=c.length/2;f--)c[f].remove();s.querySelectorAll("[data-css-marquee-list]").forEach(f=>{f.style.animationDuration="",f.style.animationPlayState=""}),s.setAttribute("data-initialized","false");let m=i.indexOf(s);m>-1&&i.splice(m,1)}function l(s){let c=parseInt(s.getAttribute("data-breakpoint")||"0");window.innerWidth<=c?o(s):s.getAttribute("data-initialized")==="true"&&n(s)}let p=new IntersectionObserver(s=>{s.forEach(c=>{c.target.getAttribute("data-initialized")==="true"&&c.target.querySelectorAll("[data-css-marquee-list]").forEach(m=>m.style.animationPlayState=c.isIntersecting?"running":"paused")})},{threshold:0});function u(){t.forEach(s=>{l(s),p.observe(s)})}function w(){clearTimeout(r),r=setTimeout(()=>{t.forEach(s=>{l(s)})},250)}window.addEventListener("resize",w),u()}function pe(){function e(r,o=!1){let n=document.getElementById(r);if(n&&window.lenisInstance){let l=()=>{window.lenisInstance.scrollTo(n,{duration:1,easing:p=>Math.min(1,1.001-Math.pow(2,-10*p))})};o?l():setTimeout(l,100),o&&window.history.pushState({},"",window.location.pathname+"?anchor="+r)}}let i=new URLSearchParams(window.location.search).get("anchor");i&&e(i),$('a[href^="?anchor="], a[href^="#"], a[href*="'+window.location.pathname+'?anchor="]').on("click",function(r){let o=$(this).attr("href"),n;if(o.startsWith("#"))n=o.substring(1);else if(o.includes("?anchor=")){let l=o.split("?"),p=window.location.pathname,u=l[0]||p;(u===p||u==="")&&(r.preventDefault(),n=new URLSearchParams(l[1]).get("anchor"))}n&&($(".nav_menu").is(":visible")?(O(!1),$('[data-nav-toggle="close"]').trigger("click"),setTimeout(()=>{e(n,!0)},500)):e(n,!0))})}function Ue(){$("[data-copy-clipboard]").on("click",function(){let e=$(this).attr("data-copy-clipboard"),t=$(`[data-copy-clipboard="${e}"]`).find(".line");if(t.length){let i=t.text(),r=()=>{let o=$('<div class="copy-tooltip">Copied</div>');o.css({position:"absolute",background:"var(--body-2)",color:"var(--text-2)",padding:".5em 1em",borderRadius:".25em",fontSize:"1.5rem",whiteSpace:"nowrap",zIndex:9999,pointerEvents:"none"});let n=t.offset();o.css({top:n.top-40,left:n.left+t.outerWidth()/2-o.outerWidth()/2}),$("body").append(o),setTimeout(()=>{o.remove()},1500)};navigator.clipboard.writeText(i).then(()=>{r()}).catch(()=>{let o=document.createElement("textarea");o.value=i,document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),r()})}})}function he(e){let t=new DOMParser().parseFromString(e.next.html,"text/html").querySelector("html").getAttribute("data-wf-page");document.documentElement.setAttribute("data-wf-page",t),window.Webflow&&window.Webflow.destroy(),window.Webflow&&window.Webflow.ready(),window.Webflow&&window.Webflow.require&&window.Webflow.require("ix2")&&window.Webflow.require("ix2").init(),$(".w--current").removeClass("w--current"),$("a").each(function(){$(this).attr("href")===window.location.pathname&&$(this).addClass("w--current")})}var Fe={isOpen:!1,$overlay:null,$container:null,$videoWrapper:null,$originalElement:null,originalMaxWidth:null,originalPlayers:[],modalPlayer:null,init(){this.initOriginalPlyrs(),this.bindEvents(),this.addStyles()},initOriginalPlyrs(){let e=$(".plyr_video");e.length&&(this.originalPlayers=[],e.each((t,i)=>{let r=new Plyr(i,{controls:["play","progress","mute","fullscreen"],muted:!0,autoplay:!0,loop:{active:!0}});$(i).closest("[data-video-player]").find(".plyr__controls").hide(),r.on("ready",()=>{setTimeout(()=>{r.play(),r.muted=!0},100)}),r.on("loadeddata",()=>{r.play()}),this.originalPlayers.push(r)}))},bindEvents(){$("[data-video-player]").each((e,t)=>{$(t).click(i=>{i.preventDefault(),this.open($(i.currentTarget))})})},open(e){if(this.isOpen)return;if(window.innerWidth<768||/Mobi|Android/i.test(navigator.userAgent)){let i=e.find("video")[0];if(i){i.removeAttribute("playsinline"),i.removeAttribute("webkit-playsinline"),i.controls=!1,i.currentTime=0,i.muted=!1;let r=()=>{i.removeEventListener("webkitendfullscreen",r),i.removeEventListener("fullscreenchange",r),i.pause(),i.setAttribute("playsinline",""),i.setAttribute("webkit-playsinline",""),i.controls=!1;let o=e.closest("[data-video-player]"),n=$(i).clone(!0)[0];i.replaceWith(n);let l=new Plyr(n,{controls:["play","progress","mute","fullscreen"],muted:!0,autoplay:!0,loop:{active:!0}});$(o).find(".plyr__controls").hide(),l.on("ready",()=>{l.play().catch(()=>{})})};i.addEventListener("webkitendfullscreen",r),i.addEventListener("fullscreenchange",()=>{document.fullscreenElement||r()}),i.play().then(()=>{let o=i.requestFullscreen||i.webkitEnterFullscreen||i.webkitRequestFullscreen||i.msRequestFullscreen;o&&o.call(i)}).catch(o=>{console.warn("Autoplay or fullscreen failed:",o)})}return}this.$originalElement=e,this.originalMaxWidth=e.css("max-width"),O(!0),e.css("max-width","none"),this.createElement(),this.setupModal(e),this.animateIn(),this.isOpen=!0},close(){this.isOpen&&(this.pauseVideo(),this.animateOut())},createElement(){this.$overlay=$('<div class="video-modal-overlay"></div>'),this.$container=$('<div class="video-modal-container"></div>'),this.$videoWrapper=$('<div class="video-modal-wrapper"></div>');let e=$('<div class="video-modal-close">\xD7</div>');this.$videoWrapper.append(e),this.$container.append(this.$videoWrapper),this.$overlay.append(this.$container),$("body").append(this.$overlay),this.bindCloseEvents(e)},setupModal(e){let t=e[0].getBoundingClientRect(),i=e.attr("data-video-player")||"16/9";this.$container.css({position:"fixed",left:t.left+"px",top:t.top+"px",width:t.width+"px",height:t.height+"px",zIndex:9999}),this.$videoWrapper.css("aspect-ratio",i);let r=e.clone(!0);r.find(".plyr").replaceWith(r.find("video")),this.$videoWrapper.append(r),e.css("visibility","hidden")},animateIn(){gsap.set(this.$overlay,{opacity:0}),gsap.to(this.$overlay,{opacity:1,duration:.3}),gsap.to(this.$container,{left:"5vw",top:"5vh",width:"90vw",height:"90vh",duration:.6,ease:"power2.out",onComplete:()=>this.activateModalVideo()})},activateModalVideo(){let t=this.$videoWrapper.find("[data-video-player]").find(".plyr_video");t.length&&(this.modalPlayer=new Plyr(t[0],{controls:["play","progress","mute","fullscreen"],muted:!1,autoplay:!1,loop:{active:!0}}),this.modalPlayer.on("ready",()=>{setTimeout(()=>{this.modalPlayer.restart(),this.modalPlayer.muted=!1,this.modalPlayer.play().catch(()=>{})},100)}))},animateOut(){let e=this.$originalElement[0].getBoundingClientRect();gsap.to(this.$container,{left:e.left+"px",top:e.top+"px",width:e.width+"px",height:e.height+"px",duration:.4,ease:"power2.in"}),gsap.to(this.$overlay,{opacity:0,duration:.3,delay:.2,onComplete:()=>this.cleanup()})},cleanup(){this.$overlay.remove(),this.$originalElement.css({visibility:"visible","max-width":this.originalMaxWidth}),this.modalPlayer&&(this.modalPlayer.destroy(),this.modalPlayer=null),O(!1),$(document).off("keydown.videoModal"),this.resetProperties()},resetProperties(){this.isOpen=!1,this.$overlay=null,this.$container=null,this.$videoWrapper=null,this.$originalElement=null,this.originalMaxWidth=null},bindCloseEvents(e){e.click(()=>this.close()),this.$overlay.click(t=>{t.target===this.$overlay[0]&&this.close()}),$(document).on("keydown.videoModal",t=>{t.key==="Escape"&&this.close()})},playVideo(){this.modalPlayer&&this.modalPlayer.play()},pauseVideo(){this.modalPlayer&&this.modalPlayer.pause()},addStyles(){$("<style>").text(`
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
    `).appendTo("head")}};function oe(){let e=document.querySelector(".cursor");if(!e)return;let t=e.querySelector("p"),i=document.querySelectorAll("[data-cursor]"),r=6,o=140,n=!1,l=null,p="",u=!1,w,s,c=()=>window.innerWidth>=992,m=()=>{c()&&(u=!0,gsap.set(e,{xPercent:r,yPercent:o,scale:.8}),w=gsap.quickTo(e,"x",{ease:"power3"}),s=gsap.quickTo(e,"y",{ease:"power3"}),e.style.display="block")},f=()=>{u=!1,e&&(e.style.display="none")},v=()=>e.offsetWidth+16,x=b=>{if(!u)return;let C=window.innerWidth,W=window.innerHeight,{scrollY:L}=window,I=b.clientX,_=b.clientY+L,F=r,B=o,X=v();if(I>C-X?(n=!0,F=-100):n=!1,_>L+W*.9&&(B=-120),l){let R=l.getAttribute("data-cursor");R!==p&&(t.innerHTML=R,p=R,X=v())}gsap.to(e,{xPercent:F,yPercent:B,duration:.9,scale:1,ease:"power3"}),w(I),s(_-L)},k=b=>{if(!u)return;l=b;let C=b.getAttribute("data-cursor");C!==p&&(t.innerHTML=C,p=C,v()),b.tagName!=="A"?(e.style.backgroundColor="var(--text-3)",e.style.color="var(--body-2)"):(e.style.backgroundColor="",e.style.color="")},y=()=>{c()&&!u?m():!c()&&u&&f()};window.addEventListener("mousemove",x),window.addEventListener("resize",y),i.forEach(b=>{b.addEventListener("mouseenter",()=>k(b))}),c()&&m()}function De(){let e=$('[data-nav-toggle="open"]'),t=$('[data-nav-toggle="close"]'),i=$(".nav_menu"),r=$("[data-menu-brand]"),o=$(".nav_menu-item"),n=$(".nav_menu-sublinks li"),l=$(".nav_menu-meta");gsap.set(i,{display:"none"}),gsap.set([i,o,n,l],{opacity:0}),gsap.set(r,{text:""});let p={open:()=>{let s=gsap.timeline();return j(r,r.attr("data-menu-text")),s.set(i,{display:"flex"}),s.set(t,{yPercent:100}),s.to(e.find("svg"),{scale:0,ease:"power4.out"}),s.to(e,{scale:0,ease:"power4.out"},"<0.1"),s.to(i,{opacity:1},"<"),s.to(t,{yPercent:0}),s.to(o,{opacity:1,stagger:.1},"<"),s.fromTo(o.find(".nav_menu-item_list"),{scale:0},{scale:1,stagger:.1},"<0.3"),s.fromTo(o.find("p"),{yPercent:300},{yPercent:0,stagger:.1,duration:.6},"<"),s.fromTo(o.find(".w-embed"),{xPercent:300},{xPercent:0,stagger:.1,duration:.6},"<"),s.to([n,l],{opacity:1,stagger:.2},"<"),s},close:()=>{let s=gsap.timeline();return s.to([n,l],{opacity:0,duration:.3}),s.to(t,{yPercent:100},"<"),s.to(o.find("p"),{yPercent:300,stagger:.05,duration:1},"<0.2"),s.to(o.find(".nav_menu-item_list"),{scale:0,stagger:.1},"<"),s.to(o,{opacity:0,stagger:.1},"<"),s.to(i,{opacity:0},"<0.4"),s.to(e.find("svg"),{scale:1,ease:"power4.out"},"<"),s.to(e,{scale:1,ease:"power4.out"},"<"),s.set(i,{display:"none"}),j(r,""),s}};function u(){p.open(),O(!0)}function w(){p.close(),O(!1)}e.on("click",u),t.on("click",w)}function Oe(){$(".nav_meta-col").each(function(){let e=$(this).find("a"),t=$(this).find("p");Q(e),Q(t),gsap.fromTo($(".nav_mode"),{scale:0},{scale:1})})}function Ye(){let e=$("[data-back-to-home]"),t=e.find("[data-back-label]"),i=t.attr("data-original-text");e.hover(function(){j(t,"Home, sweet home")},function(){j(t,i)})}function Xe(){$(".hp-hero_content-block").each(function(){let e=gsap.timeline();Q($(this).find(".hp-hero_content-label").eq(0)),e.fromTo($(this).find("li"),{opacity:0,xPercent:-5},{opacity:1,xPercent:0,stagger:.2}),e.fromTo($(".hp-hero").find("[data-item-reveal]"),{opacity:0,visibility:"hidden"},{opacity:1,visibility:"visible"})}),$(".hp-hero_content-visual").each(function(){gsap.set($(this),{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"}),gsap.to($(this),{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"power3.inOut",onComplete:()=>{$(this).css("clip-path","")}})})}function Be(){let e=gsap.matchMedia(),t=$(".hp-hero");t.length&&e.add("(min-width: 992px)",()=>{gsap.timeline({scrollTrigger:{trigger:t,start:"center top",end:"bottom top",scrub:1,onEnterBack:()=>{gsap.to($(".hp-work_head-link"),{rotate:0})},onLeave:()=>{gsap.to($(".hp-work_head-link"),{rotate:180})}}}).to($(".hp-hero").add(".nav_wrapper"),{opacity:.1})})}function ge(e,t){$(e).find(t).hover(function(){let i=$(this).parent().index(),r=$(".links-imgs_box-item").length,o=-(i*(100/r));gsap.to(".links-imgs_box-list",{yPercent:o,duration:.3,ease:"power2.inOut"})}),$(e).hover(function(){gsap.to(".links-imgs_box-wrap",{scale:1,duration:.2,ease:"power4.in"})},function(){gsap.to(".links-imgs_box-wrap",{scale:0,duration:.2,ease:"power4.out"})})}function Ne(){gsap.matchMedia().add("(min-width: 992px)",()=>{let t=$(".work_slider-item"),i=t.length,r=$(".work-wall"),o=$(".hp-work_slider-row"),n=i*100,l=n;r.css("height",l+"vh"),gsap.registerPlugin(ScrollTrigger),gsap.to(o,{xPercent:-(n-100),ease:"none",scrollTrigger:{trigger:r,start:"top top",end:"bottom bottom",scrub:1,pin:!1}});let p=$(".work_slider-item img");if(window.lenisInstance){let u=!1,w;window.lenisInstance.on("scroll",s=>{$(window).width()>991&&(Math.abs(s.velocity)>15&&!u&&(u=!0,gsap.to(p,{scale:1.1,duration:1,ease:"power4.out"}),gsap.to(t.find(".work_slider-item_visual"),{scale:.8,duration:1,ease:"power4.out"})),clearTimeout(w),w=setTimeout(()=>{u=!1,gsap.to(p,{scale:1,duration:1,ease:"power4.out"}),gsap.to(t.find(".work_slider-item_visual"),{scale:1,duration:1,ease:"power4.out"})},15))})}})}function je(){$("[data-work-counter]").text("("+$(".work_slider-item").length+")")}function Ze(){var e=gsap.timeline({});let t=".work-d_hero-wrap.cc-images",i=".work-d_hero-wrap.cc-images .work-d_hero-list",r=".work-d_hero-wrap.cc-images .work-d_hero-list-item",o=".work-d_hero-timeline-box",n=".work-navigation";e.set([o,n],{y:"10vh",rotate:.001,opacity:0},"<"),e.to(i,{duration:1,ease:"Power4.easeOut",rotate:.001,y:0,clearProps:"all",delay:0,onComplete:()=>{Q($('[data-split="work-heading"]'))}},"<"),e.from(r,{duration:2,ease:"Expo.easeInOut",rotate:.001,opacity:0,y:"0px",clearProps:"all"},"<"),e.to([o,n],{duration:2.1,ease:"Expo.easeInOut",rotate:.001,y:0,opacity:1,clearProps:"all"},"<")}function ie(){return new Promise(e=>{let t=$(".work-d_hero-list-item");if(!t.length){e();return}let i=t.find("img"),r=0,o=i.length;if(o===0){setTimeout(e,100);return}function n(){r++,r>=o&&setTimeout(e,100)}i.each(function(){this.complete?n():$(this).on("load error",n)}),setTimeout(e,2e3)})}function Qe(){let e,t={},i=0,r=-1,o=null,n=!1,l=16,p=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);function u(){let v=$(".work-d_hero-list-item"),x=$(".work-d_hero-timeline_item"),k=$(window).width()<992;return!v.length||!x.length?!1:(t={items:v,timelineItems:x,isSmallScreen:k,itemData:[],timelineItemSize:k?x.first().outerWidth(!0):x.first().outerHeight(!0)},v.each(function(y){let b=$(this),C=b.offset();C&&t.itemData.push({top:C.top,height:b.outerHeight(),center:C.top+b.outerHeight()/2})}),t.itemData.length>0)}function w(){if(!n||!t.itemData.length)return;let v=$(window).height(),k=$(window).scrollTop()+v/2,y=$(".work-d_hero-timeline-inner");if(!y.length)return;let b=t.itemData[0].center;if(k<b){r!==0&&(t.isSmallScreen,y[0].style.transform="translate3d(0px, 0px, 0px)",r=0);return}let C=0,W=-1;for(let I=0;I<t.itemData.length&&k>=t.itemData[I].center;I++)C=I,W=I;if(W<t.itemData.length-1&&W>=0){let I=t.itemData[W].center,_=t.itemData[W+1].center;if(k>I){let F=(k-I)/(_-I);C+=Math.min(1,Math.max(0,F))}}let L=Math.round(C*t.timelineItemSize);Math.abs(L-r)>.5&&(t.isSmallScreen?y[0].style.transform=`translate3d(${-L}px, 0px, 0px)`:y[0].style.transform=`translate3d(0px, ${-L}px, 0px)`,r=L)}function s(){e&&e.kill();let v=$(".work-d_hero-part.cc-images");if(!v.length)return;let x=$(".work-d_hero-list"),k=$(".work-d_hero-list-item"),y=$(".work-d_hero-timeline"),b=$(".work-d_hero-timeline-inner"),C=k.first(),W=k.last();if(!k.length||!y.length||!b.length)return;let L=$(".work-d_hero-timeline_item"),I=$(window).width()<992;if(!u())return;r=-1,n=!0,b[0].style.transform="translate3d(0px, 0px, 0px)",b[0].style.willChange="transform";let _=gsap.timeline({paused:!0});I&&_.fromTo(L.find(".work-d_hero-timeline_mask"),{yPercent:50,opacity:0},{yPercent:0,opacity:1,stagger:.2});let F=$(window).scrollTop(),B=$(window).height(),X=F+B/2;if(t.itemData.length>0){let R=t.itemData[0].center,q=t.itemData[t.itemData.length-1].center;X>=R&&X<=q&&(y.addClass("cc-active"),I&&_.progress(1),w())}if(e=ScrollTrigger.create({trigger:v[0],onEnter:()=>{y.addClass("cc-active"),I&&_.play()},onEnterBack:()=>{y.addClass("cc-active"),I&&_.play()},onLeave:()=>{y.removeClass("cc-active"),I&&_.reverse()},onLeaveBack:()=>{y.removeClass("cc-active"),I&&_.reverse()},start:()=>C.outerHeight()/2+"px center",end:()=>{let R=x.outerHeight(),q=W.outerHeight();return R-q/2+"px center"},scrub:p?!1:0,onUpdate:p?null:R=>{o||(o=requestAnimationFrame(()=>{let q=performance.now();if(q-i<l){o=null;return}i=q,w(),o=null}))}}),p){let R;$(window).on("scroll.workTimelineSafari",()=>{clearTimeout(R),R=setTimeout(()=>{w()},5)})}$(document).off("click.workTimeline",".work-d_hero-timeline_item"),$(document).on("click.workTimeline",".work-d_hero-timeline_item",function(){let R=$(this).index(),q=k.eq(R);if(q.length){let Z=q.offset().top,J=q.outerHeight(),K=$(window).height(),G=Z+J/2-K/2;typeof lenisInstance!="undefined"&&lenisInstance.scrollTo?lenisInstance.scrollTo(G,{duration:1.2,easing:ee=>Math.min(1,1.001-Math.pow(2,-10*ee))}):$("html, body").animate({scrollTop:Math.max(0,G)},1200)}})}let c;function m(){clearTimeout(c),c=setTimeout(()=>{$(window).width()!==$(window).data("prevWidth")&&($(window).data("prevWidth",$(window).width()),n=!1,setTimeout(()=>{ie().then(()=>{s()})},100))},150)}function f(){e&&(e.kill(),e=null),o&&(cancelAnimationFrame(o),o=null),$(window).off("resize.workTimeline"),$(window).off("scroll.workTimelineSafari"),$(document).off("click.workTimeline"),n=!1,r=-1,t={}}return ie().then(()=>{s()}),$(window).off("resize.workTimeline"),$(window).on("resize.workTimeline",m),typeof window.barba!="undefined"&&window.barba.hooks.before(()=>{f()}),{destroy:f,refresh:()=>{f(),ie().then(()=>{s()})}}}function Je(){let e=$(".work-d_content-part_icon"),t=gsap.timeline({scrollTrigger:{trigger:e}});t.from(e,{scale:0}),t.from(e.find("svg"),{scale:0,delay:.2},"<")}function Ke(){$(document).ready(function(){let e=$(".about_visual-box-inner-extra img"),t=e.length,i=-1,r=[];if(t===0)return;function o(){r=Array.from({length:t},(p,u)=>u);for(let p=r.length-1;p>0;p--){let u=Math.floor(Math.random()*(p+1));[r[p],r[u]]=[r[u],r[p]]}}o(),e.css({display:"block",opacity:0}),$(".about_visual-box-inner").on("click",function(){if(i>=t-1){l();return}n()});function n(){i++;let p=Math.random()*10-5,w=Math.pow(.7,i+1)*.99,s=r[i],c=e.eq(s);gsap.set(c[0],{opacity:0,scale:.8,rotation:p+2,zIndex:i+10}),gsap.to(c[0],{opacity:1,scale:.7,rotation:p,duration:.6,ease:"back.out(1.2)",delay:.1})}function l(){gsap.to(e,{opacity:0,scale:.8,duration:.4,stagger:.05,ease:"power2.in",onComplete:function(){gsap.set(e,{scale:1,rotation:0,zIndex:"auto"}),i=-1,o()}})}})}function Ge(){function e(o){let n=o.activeIndex,l=o.slides[n];j($('[data-work-slider="title"]'),$(l).attr("data-title")),j($('[data-work-slider="desc"]'),$(l).attr("data-description"))}let t=new Swiper(".why-hero_cases-slider",{slidesPerView:1,effect:"fade",fadeEffect:{crossfade:!0},loop:!0,pagination:{el:".swiper-nav.cc-cases",bulletClass:"swiper-dot",bulletActiveClass:"cc-active",clickable:!0},on:{slideChange:function(){e(this)},init:function(){e(this)}}}),i=new Swiper(".why-hero_quotes-slider",{slidesPerView:1,effect:"fade",fadeEffect:{crossFade:!0},loop:!0,speed:200,navigation:{nextEl:".why-hero_quotes-slide-inner"},pagination:{el:".swiper-nav.cc-quotes",bulletClass:"swiper-dot",bulletActiveClass:"cc-active",clickable:!0},on:{init:function(){r(this),$(".swiper-slide").each(function(){gsap.set($(this).find("[data-item-el]"),{yPercent:50,opacity:0})}),gsap.to($(".swiper-slide-active [data-item-el]"),{yPercent:0,opacity:1,stagger:.2,duration:.6,ease:"power2.out"})},slideChangeTransitionEnd:function(){gsap.to($(".swiper-slide:not(.swiper-slide-active) [data-item-el]"),{yPercent:50,opacity:0,stagger:.1,duration:.3}),gsap.to($(".swiper-slide-active [data-item-el]"),{yPercent:0,opacity:1,stagger:.2,duration:.6,delay:.2,ease:"power2.out"})}}});function r(o){let{slides:n}=o,l=n.length;n.forEach((p,u)=>{let w=$(p).find(".why-hero_quotes-avatar-circle.cc-1"),s=$(p).find(".why-hero_quotes-avatar-circle.cc-2"),c=(u+1)%l,m=(u+2)%l,f=$(n[c]).find(".why-hero_quotes-avatar-circle.cc-avatar img").attr("src"),v=$(n[m]).find(".why-hero_quotes-avatar-circle.cc-avatar img").attr("src");v&&w.find("img").attr("src",v),f&&s.find("img").attr("src",f)})}}function et(){document.querySelectorAll("[data-form-validate]").forEach(t=>{let i=new Date().getTime(),r=t.querySelector("form");if(!r)return;let o=r.querySelectorAll("[data-validate]"),n=r.querySelector("[data-submit]");if(!n)return;let l=n.querySelector('input[type="submit"]');if(!l)return;function p(){return new Date().getTime()-i<5e3}o.forEach(function(c){let m=c.querySelector("select");m&&m.querySelectorAll("option").forEach(function(v){(v.value===""||v.value==="disabled"||v.value==="null"||v.value==="false")&&v.setAttribute("disabled","disabled")})});function u(){let c=!0,m=null;return o.forEach(function(f){let v=f.querySelector("input, textarea, select"),x=f.querySelector("[data-radiocheck-group]");!v&&!x||(v&&(v.__validationStarted=!0),x&&(x.__validationStarted=!0,x.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(y){y.__validationStarted=!0})),s(f),w(f)||(c=!1,m||(m=v||x.querySelector("input"))))}),!c&&m&&m.focus(),c}function w(c){let m=c.querySelector("[data-radiocheck-group]");if(m){let C=m.querySelectorAll('input[type="radio"], input[type="checkbox"]'),W=m.querySelectorAll("input:checked"),L=parseInt(m.getAttribute("min"))||1,I=parseInt(m.getAttribute("max"))||C.length,_=W.length;return C[0].type==="radio"?_>=1:C.length===1?C[0].checked:_>=L&&_<=I}let f=c.querySelector("input, textarea, select");if(!f)return!1;let v=!0,x=parseInt(f.getAttribute("min"))||0,k=parseInt(f.getAttribute("max"))||1/0,y=f.value.trim(),{length:b}=y;return f.tagName.toLowerCase()==="select"?(y===""||y==="disabled"||y==="null"||y==="false")&&(v=!1):f.type==="email"?v=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(y):(f.hasAttribute("min")&&b<x&&(v=!1),f.hasAttribute("max")&&b>k&&(v=!1)),v}function s(c){let m=c.querySelector("[data-radiocheck-group]");if(m){let f=m.querySelectorAll('input[type="radio"], input[type="checkbox"]');m.querySelectorAll("input:checked").length>0?c.classList.add("is--filled"):c.classList.remove("is--filled"),w(c)?(c.classList.add("is--success"),c.classList.remove("is--error")):(c.classList.remove("is--success"),Array.from(f).some(y=>y.__validationStarted)?c.classList.add("is--error"):c.classList.remove("is--error"))}else{let f=c.querySelector("input, textarea, select");if(!f)return;f.value.trim()?c.classList.add("is--filled"):c.classList.remove("is--filled"),w(c)?(c.classList.add("is--success"),c.classList.remove("is--error")):(c.classList.remove("is--success"),f.__validationStarted?c.classList.add("is--error"):c.classList.remove("is--error"))}}o.forEach(function(c){let m=c.querySelector("input, textarea, select"),f=c.querySelector("[data-radiocheck-group]");f?f.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(x){x.__validationStarted=!1,x.addEventListener("change",function(){requestAnimationFrame(function(){if(!x.__validationStarted){let k=f.querySelectorAll("input:checked").length,y=parseInt(f.getAttribute("min"))||1;k>=y&&(x.__validationStarted=!0)}x.__validationStarted&&s(c)})}),x.addEventListener("blur",function(){x.__validationStarted=!0,s(c)})}):m&&(m.__validationStarted=!1,m.tagName.toLowerCase()==="select"?m.addEventListener("change",function(){m.__validationStarted=!0,s(c)}):(m.addEventListener("input",function(){let v=m.value.trim(),{length:x}=v,k=parseInt(m.getAttribute("min"))||0,y=parseInt(m.getAttribute("max"))||1/0;m.__validationStarted||(m.type==="email"?w(c)&&(m.__validationStarted=!0):(m.hasAttribute("min")&&x>=k||m.hasAttribute("max")&&x<=y)&&(m.__validationStarted=!0)),m.__validationStarted&&s(c)}),m.addEventListener("blur",function(){m.__validationStarted=!0,s(c)})))}),n.addEventListener("click",function(){if(u()){if(p()){alert("Form submitted too quickly. Please try again.");return}l.click()}}),r.addEventListener("keydown",function(c){if(c.key==="Enter"&&c.target.tagName!=="TEXTAREA"&&(c.preventDefault(),u())){if(p()){alert("Form submitted too quickly. Please try again.");return}l.click()}})}),$(".form-checkbox").each(function(){let t=$(this),i=t.find('input[type="checkbox"], input[type="radio"]');function r(){i.attr("type")==="radio"&&$(`input[name="${i.attr("name")}"]`).not(":checked").each(function(){$(this).closest(".form-checkbox").removeClass("cc-active")}),i.is(":checked")?t.addClass("cc-active"):t.removeClass("cc-active")}r(),i.on("change",r)})}function ve(){if(!document.getElementById("gallery"))return;let e={cellSize:.75,zoomLevel:1.25,lerpFactor:.075,borderColor:"rgba(255, 255, 255, 0.15)",backgroundColor:"transparent",textColor:"#ffffff",hoverColor:"rgba(255, 255, 255, 0)",wheelSensitivity:8e-4,wheelDamping:.92,momentumThreshold:.1,mouseSensitivity:.003,touchSensitivity:.008},t=[];$("[data-lab-item]").each(function(){let a=$(this),d={id:a.attr("data-lab-item"),title:a.find("[data-lab-title]").text().trim(),label:a.find("[data-lab-label]").text().trim(),desc:a.find("[data-lab-desc]").text().trim(),image:a.find("[data-lab-img]").attr("src"),imageHiRes:a.find("[data-lab-hires-img]").attr("src")};t.push(d)});let i,r,o,n,l=!1,p=!0,u=0,w={x:0,y:0},s={x:0,y:0},c={x:0,y:0},m={x:-1,y:-1},f=1,v=1,x=[],k={x:-999,y:-999},y={x:-999,y:-999},b=0,C=0,W=.15,L=a=>{if(a==="transparent")return[0,0,0,0];if(a.startsWith("#")){let h=a.slice(1),g=parseInt(h.substr(0,2),16)/255,E=parseInt(h.substr(2,2),16)/255,T=parseInt(h.substr(4,2),16)/255;return[g,E,T,1]}let d=a.match(/rgba?\(([^)]+)\)/);return d?d[1].split(",").map((h,g)=>g<3?parseFloat(h.trim())/255:parseFloat(h.trim()||1)):[0,0,0,1]},I=()=>{let a=document.getElementById("gallery");return getComputedStyle(a).color||"#ffffff"},_=(a,d)=>{let h=document.createElement("canvas");h.width=512,h.height=512;let g=h.getContext("2d");g.clearRect(0,0,512,512),g.font="100px Arial",g.fillStyle=I(),g.textBaseline="top";let T=((S,M)=>{let A=S.split(" "),z=[],H=A[0];for(let V=1;V<A.length;V++){let D=A[V],{width:N}=g.measureText(H+" "+D);N<M?H+=" "+D:(z.push(H),H=D)}return z.push(H),z})(a,400);T.forEach((S,M)=>{g.fillText(S,25,25+M*35)}),g.fillStyle="red",g.fillText(d,25,25+T.length*35+10);let P=new THREE.CanvasTexture(h);return Object.assign(P,{wrapS:THREE.ClampToEdgeWrapping,wrapT:THREE.ClampToEdgeWrapping,minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter,flipY:!1,generateMipmaps:!1,format:THREE.RGBAFormat}),P},F=(a,d=!1)=>{let g=a.length,E=1,T=512,P=document.createElement("canvas");P.width=g*T,P.height=E*T;let S=P.getContext("2d");a.forEach((A,z)=>{var D,N;let H=z%g*T,V=Math.floor(z/g)*T;d&&((D=A.source)!=null&&D.data)?S.drawImage(A.source.data,H,V,T,T):d||((N=A.image)!=null&&N.complete&&A.image.naturalWidth>0?S.drawImage(A.image,H,V,T,T):(S.fillStyle="#ff0000",S.fillRect(H,V,T,T)))});let M=new THREE.CanvasTexture(P);return Object.assign(M,{wrapS:THREE.ClampToEdgeWrapping,wrapT:THREE.ClampToEdgeWrapping,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,flipY:!1}),M.needsUpdate=!0,{texture:M,atlasWidth:g,atlasHeight:E}},B=()=>{let a=new THREE.TextureLoader,d=[],h=0;return new Promise(g=>{t.forEach((E,T)=>{let P=a.load(E.image,()=>{++h===t.length&&g(d)},void 0,S=>{++h===t.length&&g(d)});Object.assign(P,{wrapS:THREE.ClampToEdgeWrapping,wrapT:THREE.ClampToEdgeWrapping,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter}),d.push(P),x.push(_(E.title,E.label))})})},X=(a,d)=>{let h=Math.floor((a+d*11)%t.length),g=h<0?t.length+h:h;return t[g]},R=()=>{if(!o||m.x<0||m.y<0){y={x:-999,y:-999};return}let a=o.domElement.getBoundingClientRect(),d=m.x/a.width*2-1,h=-(m.y/a.height*2-1),g=Math.sqrt(d*d+h*h),E=1-.08*g*g,T=d*E,P=h*E,S=a.width/a.height,M=T*S*f+s.x,A=P*f+s.y,z=M/e.cellSize*.95,H=A/e.cellSize*.95,V=Math.floor(z),D=Math.floor(H);y={x:V,y:D}},q=a=>{let d=o.domElement.getBoundingClientRect();m.x=a.clientX-d.left,m.y=a.clientY-d.top,R(),n!=null&&n.material.uniforms&&n.material.uniforms.uMousePos.value.set(m.x,m.y)},Z=(a,d,h)=>a+(d-a)*h,J=a=>{let{target:d}=a;return d.closest("nav")||d.closest(".navbar")||d.closest("[data-nav]")||d.closest("header")||d.tagName==="A"||d.closest("a")},K=(a,d,h)=>J(a)?!1:(l=!0,p=!0,u=Date.now(),document.body.classList.add("dragging"),w.x=d,w.y=h,setTimeout(()=>l&&(v=e.zoomLevel),150),!0),G=a=>{K(a,a.clientX,a.clientY)},ee=a=>{K(a,a.touches[0].clientX,a.touches[0].clientY)&&a.preventDefault()},ae=(a,d,h=!1)=>{if(!l||a===void 0||d===void 0)return;let g=a-w.x,E=d-w.y;(Math.abs(g)>2||Math.abs(E)>2)&&(p=!1,v===1&&(v=e.zoomLevel));let T=h?e.touchSensitivity:e.mouseSensitivity;c.x-=g*T,c.y+=E*T,w.x=a,w.y=d},xe=a=>ae(a.clientX,a.clientY),be=a=>{a.preventDefault(),ae(a.touches[0].clientX,a.touches[0].clientY,!0)},te=a=>{var d,h,g,E;if(l&&(l=!1,document.body.classList.remove("dragging"),v=1,p&&Date.now()-u<200)){let T=a.clientX||((h=(d=a.changedTouches)==null?void 0:d[0])==null?void 0:h.clientX),P=a.clientY||((E=(g=a.changedTouches)==null?void 0:g[0])==null?void 0:E.clientY);if(T!==void 0&&P!==void 0&&!J(a)){let S=o.domElement.getBoundingClientRect(),M=(T-S.left)/S.width*2-1,A=-((P-S.top)/S.height*2-1),z=Math.sqrt(M*M+A*A),H=1-.08*z*z,V=M*H*(S.width/S.height)*f+s.x,D=A*H*f+s.y,N=Math.floor(V/e.cellSize*.95),Ce=Math.floor(D/e.cellSize*.95),ce=X(N,Ce);ce&&re.open(ce.id)}}},re={activePlayer:null,init(){this.setupEventListeners(),this.checkUrlQuery()},setupEventListeners(){$("[data-modal-close]").on("click",()=>this.close()),$(document).on("keydown",a=>{a.key==="Escape"&&this.close()}),$(".labs-modal_wrap").on("click",a=>{let d=$(a.target),h=$(".labs-modal_video:visible"),g=$(".labs-modal_img-item:visible");!d.closest(".labs-modal_video").length&&!d.closest(".labs-modal_img-item").length&&this.close()}),$(window).on("popstate",()=>{this.checkUrlQuery()})},checkUrlQuery(){let d=new URLSearchParams(window.location.search).get("project");d?$(`[data-lab-item="${d}"]`).length&&this.open(d):this.close()},open(a){this.destroyVideo(),O(!0),$(".labs-modal_wrap").css("display","flex"),$("[data-lab-item]").hide();let d=$(`[data-lab-item="${a}"]`);d.css("display","flex"),this.handleMediaType(d),this.updateUrl(a)},close(){this.destroyVideo(),O(!1),$("[data-lab-item]").hide(),$(".labs-modal_wrap").css("display","none"),this.updateUrl()},updateUrl(a=null){let d=new URL(window.location);a?d.searchParams.set("project",a):d.searchParams.delete("project"),window.history.pushState({},"",d)},handleMediaType(a){let d=a.find(".labs-modal_video"),h=a.find(".labs-modal_img-item"),g=d.find("video");if(d.hide(),h.hide(),g.length){let T=g.find("source").attr("src")||g.attr("src");T&&T.trim()!==""?(d.show(),this.initializeVideo(g)):h.css("display","flex")}else h.css("display","flex")},initializeVideo(a){if(typeof Plyr!="undefined"){let d=a[0];d.currentTime=0,d.pause(),this.activePlayer=new Plyr(d,{controls:["play-large","play","progress","current-time","mute","volume","fullscreen"],autoplay:!1,loop:{active:!0}}),this.activePlayer.on("ready",()=>{this.activePlayer.currentTime=0,setTimeout(()=>{this.activePlayer&&$(".labs-modal_wrap").is(":visible")&&this.activePlayer.play()},100)}),this.activePlayer.on("loadeddata",()=>{this.activePlayer.currentTime=0})}},destroyVideo(){if(this.activePlayer){try{this.activePlayer.pause(),this.activePlayer.currentTime=0,this.activePlayer.destroy()}catch{}this.activePlayer=null}$("video").each(function(){this.pause(),this.currentTime=0,this.load()})}},Te=()=>{let a=document.getElementById("gallery");if(!a)return;let{offsetWidth:d,offsetHeight:h}=a;r.updateProjectionMatrix(),o.setSize(d,h),o.setPixelRatio(window.devicePixelRatio),n==null||n.material.uniforms.uResolution.value.set(d,h)},$e=()=>{let a=new MutationObserver(d=>{d.forEach(h=>{h.type==="attributes"&&(h.attributeName==="data-theme"||h.attributeName==="class")&&setTimeout(()=>{Ee()},400)})});a.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme","class"]}),a.observe(document.body,{attributes:!0,attributeFilter:["data-theme","class"]})},Ee=()=>{var E,T;if(!((T=(E=n==null?void 0:n.material)==null?void 0:E.uniforms)!=null&&T.uTextAtlas))return;let a=t.map(P=>_(P.title,P.label)),d=F(a,!0),h=n.material.uniforms.uTextAtlas.value;h&&h.dispose&&h.dispose();let g=d.texture;g.needsUpdate=!0,g.colorSpace=THREE.SRGBColorSpace,n.material.uniforms.uTextAtlas.value=g,n.material.needsUpdate=!0,o.resetState(),o.compile(i,r),o.render(i,r)},Y={x:0,y:0},se=0,dt=null,ke=()=>{let a=document.getElementById("gallery");if(!a)return;let d=null,h=E=>{if(E.preventDefault(),d)return;d=setTimeout(()=>{d=null},16);let T=Date.now(),P=T-se;se=T;let{deltaX:S}=E,{deltaY:M}=E;if(Math.abs(E.deltaX)>0||Math.abs(E.deltaY)>0){document.body.classList.add("dragging"),E.deltaMode===1?(S*=16,M*=16):E.deltaMode===2&&(S*=400,M*=400);let A=e.wheelSensitivity||8e-4,z=S*A,H=M*A;c.x+=z,c.y-=H,Y.x=Math.max(-2,Math.min(2,z/Math.max(P,16)*1e3)),Y.y=Math.max(-2,Math.min(2,H/Math.max(P,16)*1e3)),clearTimeout(a.wheelTimeout),a.wheelTimeout=setTimeout(()=>{document.body.classList.remove("dragging")},150)}};a.addEventListener("mousedown",G),a.addEventListener("mousemove",xe),a.addEventListener("mouseup",te),a.addEventListener("mouseleave",te);let g={passive:!1};a.addEventListener("touchstart",ee,g),a.addEventListener("touchmove",be,g),a.addEventListener("touchend",te,g),a.addEventListener("wheel",h,g),window.addEventListener("resize",Te),a.addEventListener("contextmenu",E=>E.preventDefault()),o.domElement.addEventListener("mousemove",q),o.domElement.addEventListener("mouseleave",()=>{m.x=m.y=-1,y={x:-999,y:-999},C=0,n!=null&&n.material.uniforms&&n.material.uniforms.uMousePos.value.set(-1,-1)})},le=()=>{requestAnimationFrame(le),(Math.abs(Y.x)>.01||Math.abs(Y.y)>.01)&&(c.x+=Y.x*.016,c.y-=Y.y*.016,Y.x*=.92,Y.y*=.92),s.x+=(c.x-s.x)*e.lerpFactor,s.y+=(c.y-s.y)*e.lerpFactor,f+=(v-f)*e.lerpFactor,k.x!==y.x||k.y!==y.y?b>.01?b=Z(b,0,W*1.5):(k.x=y.x,k.y=y.y,y.x!==-999&&(C=1)):(C=y.x===-999?0:1,b=Z(b,C,W)),n!=null&&n.material.uniforms&&(n.material.uniforms.uOffset.value.set(s.x,s.y),n.material.uniforms.uZoom.value=f,n.material.uniforms.uHoveredCell.value.set(k.x,k.y),n.material.uniforms.uHoverIntensity.value=b),o.render(i,r)};(async()=>{let a=document.getElementById("gallery");if(!a)return;let d=a.querySelector("canvas");if(d&&d.remove(),t.length===0)return;i=new THREE.Scene,r=new THREE.OrthographicCamera(-1,1,1,-1,.1,10),r.position.z=1,o=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),o.setSize(a.offsetWidth,a.offsetHeight),o.setPixelRatio(window.devicePixelRatio),o.setClearColor(new THREE.Color(0,0,0),0),a.appendChild(o.domElement);let h=await B(),g=F(h,!1);console.log(x);let E=F(x,!0),T={uOffset:{value:new THREE.Vector2(0,0)},uResolution:{value:new THREE.Vector2(a.offsetWidth,a.offsetHeight)},uBorderColor:{value:new THREE.Vector4(...L(e.borderColor))},uHoverColor:{value:new THREE.Vector4(...L(e.hoverColor))},uBackgroundColor:{value:new THREE.Vector4(...L(e.backgroundColor))},uMousePos:{value:new THREE.Vector2(-1,-1)},uZoom:{value:1},uCellSize:{value:e.cellSize},uTextureCount:{value:t.length},uAtlasSize:{value:g.atlasSize},uAtlasWidth:{value:g.atlasWidth},uAtlasHeight:{value:g.atlasHeight},uImageAtlas:{value:g.texture},uTextAtlas:{value:E.texture},uHoveredCell:{value:new THREE.Vector2(-999,-999)},uHoverIntensity:{value:0}},P=new THREE.PlaneGeometry(2,2),S=new THREE.ShaderMaterial({vertexShader:ue,fragmentShader:me,uniforms:T});S.needsUpdate=!0,o.compile(i,r),n=new THREE.Mesh(P,S),i.add(n),ke(),$e(),le(),re.init()})()}function j(e,t){let i="0123456789!@#$%^&*()_+<>?:|";gsap.to(e,{duration:.5,scrambleText:{text:t,chars:i,speed:.3,ease:"power2.inOut"}})}function Q(e){let t={lines:{duration:.8,stagger:.08},words:{duration:.6,stagger:.06},chars:{duration:.4,stagger:.01}},i=[],r=[];function o(){r.forEach(u=>{u&&u.kill()}),i.forEach(u=>{u&&u.revert()}),i=[],r=[],$(e).each(function(){let u=$(this),w=u.data("original-text");w&&u.html(w),u.removeClass("animated"),gsap.set(u,{clearProps:"all"}),u.closest("li").length>0&&gsap.set(u.closest("li"),{clearProps:"all"})})}function n(){$(e).each(function(){let u=$(this);if(u.hasClass("split-initialized"))return;u.addClass("split-initialized"),u.removeClass("animated");let w=u.data("original-text")||u.text();u.data("original-text",w),u.find(".line, .word, .letter").length>0&&u.html(w);let s=u.data("split-reveal")||"lines",c=s==="lines"?["lines"]:s==="words"?["lines","words"]:["lines","words","chars"],m=u.closest("li").length>0;gsap.set(u,{visibility:"visible",opacity:1,clearProps:"transform"}),m&&gsap.set(u.closest("li"),{opacity:0});try{let f=new SplitText(u[0],{type:c.join(", "),mask:"lines",linesClass:"line",wordsClass:"word",charsClass:"letter"});i.push(f);let v=f[s];if(!v||v.length===0){console.warn("No split targets found for",u);return}gsap.set(v,{yPercent:110});let x=t[s],k=u.data("trigger-type")||"load",y=()=>{let b=gsap.timeline({onComplete:()=>{u.addClass("animated")}});return m&&b.to(u.closest("li"),{opacity:1,duration:x.duration*.3,ease:"power2.out"},0),b.to(v,{yPercent:-8,duration:x.duration,stagger:x.stagger,ease:"expo.out"},m?x.duration*.15:0),b};if(k==="scroll"){let b=ScrollTrigger.create({trigger:u[0],start:"clamp(top 80%)",once:!0,onEnter:y});r.push(b)}else gsap.delayedCall(.2,y)}catch(f){console.error("Error in SplitText:",f)}})}setTimeout(n,300);function l(u,w){let s;return function(){let c=this,m=arguments;clearTimeout(s),s=setTimeout(()=>u.apply(c,m),w)}}let p=l(n,200);return $(window).on("resize",p),function(){$(window).off("resize",p),o(),$(e).each(function(){$(this).removeClass("split-initialized")})}}function tt(e){let t=[];function i(){t.forEach(n=>{n&&n.kill()}),t=[],$(e).each(function(){let n=$(this);if(n.hasClass("animated"))return;let l=n.data("duration")||.6,p=n.data("delay")||0,u=n.data("trigger-type")||"scroll";gsap.set(n,{opacity:0});let w=()=>{gsap.to(n,{opacity:1,duration:l,delay:p,ease:"power2.out",onComplete:()=>{n.addClass("animated")}})};if(u==="scroll"){let s=ScrollTrigger.create({trigger:n[0],start:"clamp(top 95%)",once:!0,onEnter:w});t.push(s)}else gsap.delayedCall(.2,w)})}setTimeout(i,300);function r(n,l){let p;return function(){let u=this,w=arguments;clearTimeout(p),p=setTimeout(()=>n.apply(u,w),l)}}let o=r(i,200);return $(window).on("resize",o),function(){$(window).off("resize",o),t.forEach(l=>{l&&l.kill()})}}function we(){let e=$(".grid-line.is-h"),t=$(".grid-line.is-v");e.length&&gsap.fromTo(e,{scaleX:0},{scaleX:1,stagger:.1,duration:6,immediateRender:!0,ease:"power4.out"}),t.length&&gsap.fromTo(t,{scaleY:0},{scaleY:1,stagger:.1,duration:2,immediateRender:!0,ease:"power4.inOut"})}function it(){document.querySelectorAll("[data-button-animate-chars]").forEach(i=>{let r=i.textContent;i.innerHTML="",[...r].forEach((o,n)=>{let l=document.createElement("span");l.textContent=o,l.style.transitionDelay=`${n*.01}s`,o===" "&&(l.style.whiteSpace="pre"),i.appendChild(l)})})}function nt(){De(),We(),Re(),ze(),qe(),we(),Oe(),Ve(),Ye(),Ue(),pe(),document.fonts.ready.then(function(){Q('[data-split="heading"]'),tt("[data-item-reveal]"),it()}),window.initDarkModeToggle(),Fe.init()}function ot(){Be(),Ne(),Xe(),ge(".hp-hero_content-clients ul",".hp-hero_links"),oe(),je()}var U;function at(){U&&U.destroy(),setTimeout(()=>{U=Qe(),Ze(),Je()},100)}function rt(){setTimeout(()=>{Ke(),we(),ge(".about_clients-list.cc-clients",".about_clients-item"),oe()},500)}function st(){Ge()}function lt(){et()}function ye(){window.addEventListener("pageshow",function(e){e.persisted&&window.location.reload()}),ve()}$(document).ready(function(){let e=$('[data-barba="container"]').data("barba-namespace");ne(),ct()});function ne(e){var i,r,o;nt();let t=((o=(r=(i=e==null?void 0:e.next)==null?void 0:i.container)==null?void 0:r.dataset)==null?void 0:o.barbaNamespace)||$('[data-barba="container"]').data("barba-namespace");t==="home"?ot():t==="work"?at():t==="about"?rt():t==="why"?st():t==="contact"?lt():t==="labs"&&ye(),setTimeout(()=>{gsap.to("[data-barba=container]",{opacity:1})},300)}function ct(){r();let e=null,t=null;barba.init({timeout:15e3,prefetchIgnore:!0,sync:!0,debug:!0,transitions:[o(),i()]});function i(){function n(l){let p=$("html"),u=$(l.current.container).find(".page-transition"),w=$(l.next.container).find(".page-transition"),s=gsap.timeline({defaults:{duration:.6,ease:"power2.inOut"}});return s.to(u,{scaleY:1,duration:.4,onComplete:()=>{O(!0)}}),s.to(l.current.container,{scale:.8,duration:.5,onStart:()=>{gsap.set([l.current.container,l.next.container],{position:"fixed",top:0,left:0,width:"100%",height:"100vh",overflow:"hidden"}),gsap.set(p,{backgroundColor:"#4C4C4C"}),gsap.set(l.next.container,{scale:.8,zIndex:2}),gsap.set(l.current.container,{zIndex:1})}},"-=0.1"),s.set(l.current.container,{opacity:0,pointerEvents:"none"},"+=0.2"),s.fromTo(w,{scaleY:1},{scaleY:0,duration:1,onStart:()=>{ne(l)}},"-=0.3"),s.set(l.next.container,{opacity:1},"<"),s.to(l.next.container,{scale:1,duration:1,onComplete:()=>{gsap.set(p,{backgroundColor:""}),gsap.set(l.next.container,{clearProps:"all"}),gsap.set(l.next.container,{opacity:1}),l.next.namespace==="work"&&U&&setTimeout(()=>{U.refresh()},200)}},"<"),s}return{name:"default-transition",before(l){document.documentElement.classList.add("is-animating"),U&&U.destroy()},async enter(l){await n(l),he(l)},async after(l){O(!1),oe(),document.documentElement.classList.remove("is-animating"),pe(),l.next.namespace==="labs"&&ye()}}}function r(){let n=document.createElement("style");n.innerHTML=`
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
`,document.head.appendChild(n)}function o(){return{name:"home-to-work",from:{namespace:"home"},to:{namespace:"work"},custom:({trigger:n})=>$(n).closest(".work_slider-item").length>0,before(n){document.documentElement.classList.add("is-animating"),U&&U.destroy()},beforeLeave(n){cloneWorkItem(n.trigger)},leave(n){return createLeaveAnimation(n.current.container)},beforeEnter(n){gsap.set(n.next.container,{opacity:0,visibility:"visible"})},afterEnter(n){he(n),O(!1),animateCloneToTarget(n.next.container)},after(n){ne(n),document.documentElement.classList.remove("is-animating"),n.next.namespace==="work"&&U&&setTimeout(()=>{U.refresh()},300)}}}}})();

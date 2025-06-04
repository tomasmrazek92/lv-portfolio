"use strict";(()=>{function gt(e){let t=e[0],i=e[1],s=e[2];return Math.sqrt(t*t+i*i+s*s)}function et(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function Qt(e,t,i,s){return e[0]=t,e[1]=i,e[2]=s,e}function mt(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e[2]=t[2]+i[2],e}function pt(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e[2]=t[2]-i[2],e}function jt(e,t,i){return e[0]=t[0]*i[0],e[1]=t[1]*i[1],e[2]=t[2]*i[2],e}function Vt(e,t,i){return e[0]=t[0]/i[0],e[1]=t[1]/i[1],e[2]=t[2]/i[2],e}function W(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e}function Ht(e,t){let i=t[0]-e[0],s=t[1]-e[1],r=t[2]-e[2];return Math.sqrt(i*i+s*s+r*r)}function Zt(e,t){let i=t[0]-e[0],s=t[1]-e[1],r=t[2]-e[2];return i*i+s*s+r*r}function xt(e){let t=e[0],i=e[1],s=e[2];return t*t+i*i+s*s}function Jt(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e}function Wt(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e}function it(e,t){let i=t[0],s=t[1],r=t[2],n=i*i+s*s+r*r;return n>0&&(n=1/Math.sqrt(n)),e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function Yt(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function yt(e,t,i){let s=t[0],r=t[1],n=t[2],a=i[0],o=i[1],l=i[2];return e[0]=r*l-n*o,e[1]=n*a-s*l,e[2]=s*o-r*a,e}function qt(e,t,i,s){let r=t[0],n=t[1],a=t[2];return e[0]=r+s*(i[0]-r),e[1]=n+s*(i[1]-n),e[2]=a+s*(i[2]-a),e}function _t(e,t,i){let s=t[0],r=t[1],n=t[2],a=i[3]*s+i[7]*r+i[11]*n+i[15];return a=a||1,e[0]=(i[0]*s+i[4]*r+i[8]*n+i[12])/a,e[1]=(i[1]*s+i[5]*r+i[9]*n+i[13])/a,e[2]=(i[2]*s+i[6]*r+i[10]*n+i[14])/a,e}function Xt(e,t,i){let s=t[0],r=t[1],n=t[2],a=i[3]*s+i[7]*r+i[11]*n+i[15];return a=a||1,e[0]=(i[0]*s+i[4]*r+i[8]*n)/a,e[1]=(i[1]*s+i[5]*r+i[9]*n)/a,e[2]=(i[2]*s+i[6]*r+i[10]*n)/a,e}function $t(e,t,i){let s=t[0],r=t[1],n=t[2];return e[0]=s*i[0]+r*i[3]+n*i[6],e[1]=s*i[1]+r*i[4]+n*i[7],e[2]=s*i[2]+r*i[5]+n*i[8],e}function te(e,t,i){let s=t[0],r=t[1],n=t[2],a=i[0],o=i[1],l=i[2],h=i[3],c=o*n-l*r,d=l*s-a*n,u=a*r-o*s,f=o*u-l*d,g=l*c-a*u,p=a*d-o*c,m=h*2;return c*=m,d*=m,u*=m,f*=2,g*=2,p*=2,e[0]=s+c+f,e[1]=r+d+g,e[2]=n+u+p,e}var ee=function(){let e=[0,0,0],t=[0,0,0];return function(i,s){et(e,i),et(t,s),it(e,e),it(t,t);let r=Yt(e,t);return r>1?0:r<-1?Math.PI:Math.acos(r)}}();function ie(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}var R=class extends Array{constructor(t=0,i=t,s=t){return super(t,i,s),this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(t){this[0]=t}set y(t){this[1]=t}set z(t){this[2]=t}set(t,i=t,s=t){return t.length?this.copy(t):(Qt(this,t,i,s),this)}copy(t){return et(this,t),this}add(t,i){return i?mt(this,t,i):mt(this,this,t),this}sub(t,i){return i?pt(this,t,i):pt(this,this,t),this}multiply(t){return t.length?jt(this,this,t):W(this,this,t),this}divide(t){return t.length?Vt(this,this,t):W(this,this,1/t),this}inverse(t=this){return Wt(this,t),this}len(){return gt(this)}distance(t){return t?Ht(this,t):gt(this)}squaredLen(){return xt(this)}squaredDistance(t){return t?Zt(this,t):xt(this)}negate(t=this){return Jt(this,t),this}cross(t,i){return i?yt(this,t,i):yt(this,this,t),this}scale(t){return W(this,this,t),this}normalize(){return it(this,this),this}dot(t){return Yt(this,t)}equals(t){return ie(this,t)}applyMatrix3(t){return $t(this,this,t),this}applyMatrix4(t){return _t(this,this,t),this}scaleRotateMatrix4(t){return Xt(this,this,t),this}applyQuaternion(t){return te(this,this,t),this}angle(t){return ee(this,t)}lerp(t,i){return qt(this,this,t,i),this}clone(){return new R(this[0],this[1],this[2])}fromArray(t,i=0){return this[0]=t[i],this[1]=t[i+1],this[2]=t[i+2],this}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t}transformDirection(t){let i=this[0],s=this[1],r=this[2];return this[0]=t[0]*i+t[4]*s+t[8]*r,this[1]=t[1]*i+t[5]*s+t[9]*r,this[2]=t[2]*i+t[6]*s+t[10]*r,this.normalize()}},wt=new R,se=1,re=1,vt=!1,Z=class{constructor(t,i={}){t.canvas||console.error("gl not passed as first argument to Geometry"),this.gl=t,this.attributes=i,this.id=se++,this.VAOs={},this.drawRange={start:0,count:0},this.instancedCount=0,this.gl.renderer.bindVertexArray(null),this.gl.renderer.currentGeometry=null,this.glState=this.gl.renderer.state;for(let s in i)this.addAttribute(s,i[s])}addAttribute(t,i){if(this.attributes[t]=i,i.id=re++,i.size=i.size||1,i.type=i.type||(i.data.constructor===Float32Array?this.gl.FLOAT:i.data.constructor===Uint16Array?this.gl.UNSIGNED_SHORT:this.gl.UNSIGNED_INT),i.target=t==="index"?this.gl.ELEMENT_ARRAY_BUFFER:this.gl.ARRAY_BUFFER,i.normalized=i.normalized||!1,i.stride=i.stride||0,i.offset=i.offset||0,i.count=i.count||(i.stride?i.data.byteLength/i.stride:i.data.length/i.size),i.divisor=i.instanced||0,i.needsUpdate=!1,i.usage=i.usage||this.gl.STATIC_DRAW,i.buffer||this.updateAttribute(i),i.divisor){if(this.isInstanced=!0,this.instancedCount&&this.instancedCount!==i.count*i.divisor)return console.warn("geometry has multiple instanced buffers of different length"),this.instancedCount=Math.min(this.instancedCount,i.count*i.divisor);this.instancedCount=i.count*i.divisor}else t==="index"?this.drawRange.count=i.count:this.attributes.index||(this.drawRange.count=Math.max(this.drawRange.count,i.count))}updateAttribute(t){let i=!t.buffer;i&&(t.buffer=this.gl.createBuffer()),this.glState.boundBuffer!==t.buffer&&(this.gl.bindBuffer(t.target,t.buffer),this.glState.boundBuffer=t.buffer),i?this.gl.bufferData(t.target,t.data,t.usage):this.gl.bufferSubData(t.target,0,t.data),t.needsUpdate=!1}setIndex(t){this.addAttribute("index",t)}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}setInstancedCount(t){this.instancedCount=t}createVAO(t){this.VAOs[t.attributeOrder]=this.gl.renderer.createVertexArray(),this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),this.bindAttributes(t)}bindAttributes(t){t.attributeLocations.forEach((i,{name:s,type:r})=>{if(!this.attributes[s]){console.warn(`active attribute ${s} not being supplied`);return}let n=this.attributes[s];this.gl.bindBuffer(n.target,n.buffer),this.glState.boundBuffer=n.buffer;let a=1;r===35674&&(a=2),r===35675&&(a=3),r===35676&&(a=4);let o=n.size/a,l=a===1?0:a*a*a,h=a===1?0:a*a;for(let c=0;c<a;c++)this.gl.vertexAttribPointer(i+c,o,n.type,n.normalized,n.stride+l,n.offset+c*h),this.gl.enableVertexAttribArray(i+c),this.gl.renderer.vertexAttribDivisor(i+c,n.divisor)}),this.attributes.index&&this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.attributes.index.buffer)}draw({program:t,mode:i=this.gl.TRIANGLES}){this.gl.renderer.currentGeometry!==`${this.id}_${t.attributeOrder}`&&(this.VAOs[t.attributeOrder]||this.createVAO(t),this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),this.gl.renderer.currentGeometry=`${this.id}_${t.attributeOrder}`),t.attributeLocations.forEach((s,{name:r})=>{let n=this.attributes[r];n.needsUpdate&&this.updateAttribute(n)}),this.isInstanced?this.attributes.index?this.gl.renderer.drawElementsInstanced(i,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*2,this.instancedCount):this.gl.renderer.drawArraysInstanced(i,this.drawRange.start,this.drawRange.count,this.instancedCount):this.attributes.index?this.gl.drawElements(i,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*2):this.gl.drawArrays(i,this.drawRange.start,this.drawRange.count)}getPosition(){let t=this.attributes.position;if(t.data)return t;if(!vt)return console.warn("No position buffer data found to compute bounds"),vt=!0}computeBoundingBox(t){t||(t=this.getPosition());let i=t.data,s=t.stride?t.stride/i.BYTES_PER_ELEMENT:t.size;this.bounds||(this.bounds={min:new R,max:new R,center:new R,scale:new R,radius:1/0});let r=this.bounds.min,n=this.bounds.max,a=this.bounds.center,o=this.bounds.scale;r.set(1/0),n.set(-1/0);for(let l=0,h=i.length;l<h;l+=s){let c=i[l],d=i[l+1],u=i[l+2];r.x=Math.min(c,r.x),r.y=Math.min(d,r.y),r.z=Math.min(u,r.z),n.x=Math.max(c,n.x),n.y=Math.max(d,n.y),n.z=Math.max(u,n.z)}o.sub(n,r),a.add(r,n).divide(2)}computeBoundingSphere(t){t||(t=this.getPosition());let i=t.data,s=t.stride?t.stride/i.BYTES_PER_ELEMENT:t.size;this.bounds||this.computeBoundingBox(t);let r=0;for(let n=0,a=i.length;n<a;n+=s)wt.fromArray(i,n),r=Math.max(r,this.bounds.center.squaredDistance(wt));this.bounds.radius=Math.sqrt(r)}remove(){for(let t in this.VAOs)this.gl.renderer.deleteVertexArray(this.VAOs[t]),delete this.VAOs[t];for(let t in this.attributes)this.gl.deleteBuffer(this.attributes[t].buffer),delete this.attributes[t]}},ne=1,At={},st=class{constructor(t,{vertex:i,fragment:s,uniforms:r={},transparent:n=!1,cullFace:a=t.BACK,frontFace:o=t.CCW,depthTest:l=!0,depthWrite:h=!0,depthFunc:c=t.LESS}={}){t.canvas||console.error("gl not passed as fist argument to Program"),this.gl=t,this.uniforms=r,this.id=ne++,i||console.warn("vertex shader not supplied"),s||console.warn("fragment shader not supplied"),this.transparent=n,this.cullFace=a,this.frontFace=o,this.depthTest=l,this.depthWrite=h,this.depthFunc=c,this.blendFunc={},this.blendEquation={},this.transparent&&!this.blendFunc.src&&(this.gl.renderer.premultipliedAlpha?this.setBlendFunc(this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA):this.setBlendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA));let d=t.createShader(t.VERTEX_SHADER);t.shaderSource(d,i),t.compileShader(d),t.getShaderInfoLog(d)!==""&&console.warn(`${t.getShaderInfoLog(d)}
Vertex Shader
${Mt(i)}`);let u=t.createShader(t.FRAGMENT_SHADER);if(t.shaderSource(u,s),t.compileShader(u),t.getShaderInfoLog(u)!==""&&console.warn(`${t.getShaderInfoLog(u)}
Fragment Shader
${Mt(s)}`),this.program=t.createProgram(),t.attachShader(this.program,d),t.attachShader(this.program,u),t.linkProgram(this.program),!t.getProgramParameter(this.program,t.LINK_STATUS))return console.warn(t.getProgramInfoLog(this.program));t.deleteShader(d),t.deleteShader(u),this.uniformLocations=new Map;let f=t.getProgramParameter(this.program,t.ACTIVE_UNIFORMS);for(let m=0;m<f;m++){let x=t.getActiveUniform(this.program,m);this.uniformLocations.set(x,t.getUniformLocation(this.program,x.name));let v=x.name.match(/(\w+)/g);x.uniformName=v[0],v.length===3?(x.isStructArray=!0,x.structIndex=Number(v[1]),x.structProperty=v[2]):v.length===2&&isNaN(Number(v[1]))&&(x.isStruct=!0,x.structProperty=v[1])}this.attributeLocations=new Map;let g=[],p=t.getProgramParameter(this.program,t.ACTIVE_ATTRIBUTES);for(let m=0;m<p;m++){let x=t.getActiveAttrib(this.program,m),v=t.getAttribLocation(this.program,x.name);v!==-1&&(g[v]=x.name,this.attributeLocations.set(x,v))}this.attributeOrder=g.join("")}setBlendFunc(t,i,s,r){this.blendFunc.src=t,this.blendFunc.dst=i,this.blendFunc.srcAlpha=s,this.blendFunc.dstAlpha=r,t&&(this.transparent=!0)}setBlendEquation(t,i){this.blendEquation.modeRGB=t,this.blendEquation.modeAlpha=i}applyState(){this.depthTest?this.gl.renderer.enable(this.gl.DEPTH_TEST):this.gl.renderer.disable(this.gl.DEPTH_TEST),this.cullFace?this.gl.renderer.enable(this.gl.CULL_FACE):this.gl.renderer.disable(this.gl.CULL_FACE),this.blendFunc.src?this.gl.renderer.enable(this.gl.BLEND):this.gl.renderer.disable(this.gl.BLEND),this.cullFace&&this.gl.renderer.setCullFace(this.cullFace),this.gl.renderer.setFrontFace(this.frontFace),this.gl.renderer.setDepthMask(this.depthWrite),this.gl.renderer.setDepthFunc(this.depthFunc),this.blendFunc.src&&this.gl.renderer.setBlendFunc(this.blendFunc.src,this.blendFunc.dst,this.blendFunc.srcAlpha,this.blendFunc.dstAlpha),this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB,this.blendEquation.modeAlpha)}use({flipFaces:t=!1}={}){let i=-1;this.gl.renderer.state.currentProgram===this.id||(this.gl.useProgram(this.program),this.gl.renderer.state.currentProgram=this.id),this.uniformLocations.forEach((r,n)=>{let a=n.uniformName,o=this.uniforms[a];if(n.isStruct&&(o=o[n.structProperty],a+=`.${n.structProperty}`),n.isStructArray&&(o=o[n.structIndex][n.structProperty],a+=`[${n.structIndex}].${n.structProperty}`),!o)return Et(`Active uniform ${a} has not been supplied`);if(o&&o.value===void 0)return Et(`${a} uniform is missing a value parameter`);if(o.value.texture)return i=i+1,o.value.update(i),q(this.gl,n.type,r,i);if(o.value.length&&o.value[0].texture){let l=[];return o.value.forEach(h=>{i=i+1,h.update(i),l.push(i)}),q(this.gl,n.type,r,l)}q(this.gl,n.type,r,o.value)}),this.applyState(),t&&this.gl.renderer.setFrontFace(this.frontFace===this.gl.CCW?this.gl.CW:this.gl.CCW)}remove(){this.gl.deleteProgram(this.program)}};function q(e,t,i,s){s=s.length?ae(s):s;let r=e.renderer.state.uniformLocations.get(i);if(s.length)if(r===void 0||r.length!==s.length)e.renderer.state.uniformLocations.set(i,s.slice(0));else{if(oe(r,s))return;r.set?r.set(s):le(r,s),e.renderer.state.uniformLocations.set(i,r)}else{if(r===s)return;e.renderer.state.uniformLocations.set(i,s)}switch(t){case 5126:return s.length?e.uniform1fv(i,s):e.uniform1f(i,s);case 35664:return e.uniform2fv(i,s);case 35665:return e.uniform3fv(i,s);case 35666:return e.uniform4fv(i,s);case 35670:case 5124:case 35678:case 35680:return s.length?e.uniform1iv(i,s):e.uniform1i(i,s);case 35671:case 35667:return e.uniform2iv(i,s);case 35672:case 35668:return e.uniform3iv(i,s);case 35673:case 35669:return e.uniform4iv(i,s);case 35674:return e.uniformMatrix2fv(i,!1,s);case 35675:return e.uniformMatrix3fv(i,!1,s);case 35676:return e.uniformMatrix4fv(i,!1,s)}}function Mt(e){let t=e.split(`
`);for(let i=0;i<t.length;i++)t[i]=i+1+": "+t[i];return t.join(`
`)}function ae(e){let t=e.length,i=e[0].length;if(i===void 0)return e;let s=t*i,r=At[s];r||(At[s]=r=new Float32Array(s));for(let n=0;n<t;n++)r.set(e[n],n*i);return r}function oe(e,t){if(e.length!==t.length)return!1;for(let i=0,s=e.length;i<s;i++)if(e[i]!==t[i])return!1;return!0}function le(e,t){for(let i=0,s=e.length;i<s;i++)e[i]=t[i]}var _=0;function Et(e){_>100||(console.warn(e),_++,_>100&&console.warn("More than 100 program warnings - stopping logs."))}var X=new R,ce=1,rt=class{constructor({canvas:t=document.createElement("canvas"),width:i=300,height:s=150,dpr:r=1,alpha:n=!1,depth:a=!0,stencil:o=!1,antialias:l=!1,premultipliedAlpha:h=!1,preserveDrawingBuffer:c=!1,powerPreference:d="default",autoClear:u=!0,webgl:f=2}={}){let g={alpha:n,depth:a,stencil:o,antialias:l,premultipliedAlpha:h,preserveDrawingBuffer:c,powerPreference:d};this.dpr=r,this.alpha=n,this.color=!0,this.depth=a,this.stencil=o,this.premultipliedAlpha=h,this.autoClear=u,this.id=ce++,f===2&&(this.gl=t.getContext("webgl2",g)),this.isWebgl2=!!this.gl,this.gl||(this.gl=t.getContext("webgl",g)),this.gl||console.error("unable to create webgl context"),this.gl.renderer=this,this.setSize(i,s),this.state={},this.state.blendFunc={src:this.gl.ONE,dst:this.gl.ZERO},this.state.blendEquation={modeRGB:this.gl.FUNC_ADD},this.state.cullFace=null,this.state.frontFace=this.gl.CCW,this.state.depthMask=!0,this.state.depthFunc=this.gl.LESS,this.state.premultiplyAlpha=!1,this.state.flipY=!1,this.state.unpackAlignment=4,this.state.framebuffer=null,this.state.viewport={x:0,y:0,width:null,height:null},this.state.textureUnits=[],this.state.activeTextureUnit=0,this.state.boundBuffer=null,this.state.uniformLocations=new Map,this.state.currentProgram=null,this.extensions={},this.isWebgl2?(this.getExtension("EXT_color_buffer_float"),this.getExtension("OES_texture_float_linear")):(this.getExtension("OES_texture_float"),this.getExtension("OES_texture_float_linear"),this.getExtension("OES_texture_half_float"),this.getExtension("OES_texture_half_float_linear"),this.getExtension("OES_element_index_uint"),this.getExtension("OES_standard_derivatives"),this.getExtension("EXT_sRGB"),this.getExtension("WEBGL_depth_texture"),this.getExtension("WEBGL_draw_buffers")),this.getExtension("WEBGL_compressed_texture_astc"),this.getExtension("EXT_texture_compression_bptc"),this.getExtension("WEBGL_compressed_texture_s3tc"),this.getExtension("WEBGL_compressed_texture_etc1"),this.getExtension("WEBGL_compressed_texture_pvrtc"),this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),this.vertexAttribDivisor=this.getExtension("ANGLE_instanced_arrays","vertexAttribDivisor","vertexAttribDivisorANGLE"),this.drawArraysInstanced=this.getExtension("ANGLE_instanced_arrays","drawArraysInstanced","drawArraysInstancedANGLE"),this.drawElementsInstanced=this.getExtension("ANGLE_instanced_arrays","drawElementsInstanced","drawElementsInstancedANGLE"),this.createVertexArray=this.getExtension("OES_vertex_array_object","createVertexArray","createVertexArrayOES"),this.bindVertexArray=this.getExtension("OES_vertex_array_object","bindVertexArray","bindVertexArrayOES"),this.deleteVertexArray=this.getExtension("OES_vertex_array_object","deleteVertexArray","deleteVertexArrayOES"),this.drawBuffers=this.getExtension("WEBGL_draw_buffers","drawBuffers","drawBuffersWEBGL"),this.parameters={},this.parameters.maxTextureUnits=this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this.parameters.maxAnisotropy=this.getExtension("EXT_texture_filter_anisotropic")?this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT):0}setSize(t,i){this.width=t,this.height=i,this.gl.canvas.width=t*this.dpr,this.gl.canvas.height=i*this.dpr,Object.assign(this.gl.canvas.style,{width:t+"px",height:i+"px"})}setViewport(t,i,s=0,r=0){this.state.viewport.width===t&&this.state.viewport.height===i||(this.state.viewport.width=t,this.state.viewport.height=i,this.state.viewport.x=s,this.state.viewport.y=r,this.gl.viewport(s,r,t,i))}setScissor(t,i,s=0,r=0){this.gl.scissor(s,r,t,i)}enable(t){this.state[t]!==!0&&(this.gl.enable(t),this.state[t]=!0)}disable(t){this.state[t]!==!1&&(this.gl.disable(t),this.state[t]=!1)}setBlendFunc(t,i,s,r){this.state.blendFunc.src===t&&this.state.blendFunc.dst===i&&this.state.blendFunc.srcAlpha===s&&this.state.blendFunc.dstAlpha===r||(this.state.blendFunc.src=t,this.state.blendFunc.dst=i,this.state.blendFunc.srcAlpha=s,this.state.blendFunc.dstAlpha=r,s!==void 0?this.gl.blendFuncSeparate(t,i,s,r):this.gl.blendFunc(t,i))}setBlendEquation(t,i){t=t||this.gl.FUNC_ADD,!(this.state.blendEquation.modeRGB===t&&this.state.blendEquation.modeAlpha===i)&&(this.state.blendEquation.modeRGB=t,this.state.blendEquation.modeAlpha=i,i!==void 0?this.gl.blendEquationSeparate(t,i):this.gl.blendEquation(t))}setCullFace(t){this.state.cullFace!==t&&(this.state.cullFace=t,this.gl.cullFace(t))}setFrontFace(t){this.state.frontFace!==t&&(this.state.frontFace=t,this.gl.frontFace(t))}setDepthMask(t){this.state.depthMask!==t&&(this.state.depthMask=t,this.gl.depthMask(t))}setDepthFunc(t){this.state.depthFunc!==t&&(this.state.depthFunc=t,this.gl.depthFunc(t))}activeTexture(t){this.state.activeTextureUnit!==t&&(this.state.activeTextureUnit=t,this.gl.activeTexture(this.gl.TEXTURE0+t))}bindFramebuffer({target:t=this.gl.FRAMEBUFFER,buffer:i=null}={}){this.state.framebuffer!==i&&(this.state.framebuffer=i,this.gl.bindFramebuffer(t,i))}getExtension(t,i,s){return i&&this.gl[i]?this.gl[i].bind(this.gl):(this.extensions[t]||(this.extensions[t]=this.gl.getExtension(t)),i?this.extensions[t]?this.extensions[t][s].bind(this.extensions[t]):null:this.extensions[t])}sortOpaque(t,i){return t.renderOrder!==i.renderOrder?t.renderOrder-i.renderOrder:t.program.id!==i.program.id?t.program.id-i.program.id:t.zDepth!==i.zDepth?t.zDepth-i.zDepth:i.id-t.id}sortTransparent(t,i){return t.renderOrder!==i.renderOrder?t.renderOrder-i.renderOrder:t.zDepth!==i.zDepth?i.zDepth-t.zDepth:i.id-t.id}sortUI(t,i){return t.renderOrder!==i.renderOrder?t.renderOrder-i.renderOrder:t.program.id!==i.program.id?t.program.id-i.program.id:i.id-t.id}getRenderList({scene:t,camera:i,frustumCull:s,sort:r}){let n=[];if(i&&s&&i.updateFrustum(),t.traverse(a=>{if(!a.visible)return!0;a.draw&&(s&&a.frustumCulled&&i&&!i.frustumIntersectsMesh(a)||n.push(a))}),r){let a=[],o=[],l=[];n.forEach(h=>{h.program.transparent?h.program.depthTest?o.push(h):l.push(h):a.push(h),h.zDepth=0,!(h.renderOrder!==0||!h.program.depthTest||!i)&&(h.worldMatrix.getTranslation(X),X.applyMatrix4(i.projectionViewMatrix),h.zDepth=X.z)}),a.sort(this.sortOpaque),o.sort(this.sortTransparent),l.sort(this.sortUI),n=a.concat(o,l)}return n}render({scene:t,camera:i,target:s=null,update:r=!0,sort:n=!0,frustumCull:a=!0,clear:o}){s===null?(this.bindFramebuffer(),this.setViewport(this.width*this.dpr,this.height*this.dpr)):(this.bindFramebuffer(s),this.setViewport(s.width,s.height)),(o||this.autoClear&&o!==!1)&&(this.depth&&(!s||s.depth)&&(this.enable(this.gl.DEPTH_TEST),this.setDepthMask(!0)),this.gl.clear((this.color?this.gl.COLOR_BUFFER_BIT:0)|(this.depth?this.gl.DEPTH_BUFFER_BIT:0)|(this.stencil?this.gl.STENCIL_BUFFER_BIT:0))),r&&t.updateMatrixWorld(),i&&i.updateMatrixWorld(),this.getRenderList({scene:t,camera:i,frustumCull:a,sort:n}).forEach(h=>{h.draw({camera:i})})}};function zt(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e}function Pt(e,t,i,s,r){return e[0]=t,e[1]=i,e[2]=s,e[3]=r,e}function he(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e}function Dt(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=i*i+s*s+r*r+n*n;return a>0&&(a=1/Math.sqrt(a)),e[0]=i*a,e[1]=s*a,e[2]=r*a,e[3]=n*a,e}function Bt(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]}function de(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e}function ue(e,t,i){i=i*.5;let s=Math.sin(i);return e[0]=s*t[0],e[1]=s*t[1],e[2]=s*t[2],e[3]=Math.cos(i),e}function bt(e,t,i){let s=t[0],r=t[1],n=t[2],a=t[3],o=i[0],l=i[1],h=i[2],c=i[3];return e[0]=s*c+a*o+r*h-n*l,e[1]=r*c+a*l+n*o-s*h,e[2]=n*c+a*h+s*l-r*o,e[3]=a*c-s*o-r*l-n*h,e}function fe(e,t,i){i*=.5;let s=t[0],r=t[1],n=t[2],a=t[3],o=Math.sin(i),l=Math.cos(i);return e[0]=s*l+a*o,e[1]=r*l+n*o,e[2]=n*l-r*o,e[3]=a*l-s*o,e}function ge(e,t,i){i*=.5;let s=t[0],r=t[1],n=t[2],a=t[3],o=Math.sin(i),l=Math.cos(i);return e[0]=s*l-n*o,e[1]=r*l+a*o,e[2]=n*l+s*o,e[3]=a*l-r*o,e}function me(e,t,i){i*=.5;let s=t[0],r=t[1],n=t[2],a=t[3],o=Math.sin(i),l=Math.cos(i);return e[0]=s*l+r*o,e[1]=r*l-s*o,e[2]=n*l+a*o,e[3]=a*l-n*o,e}function pe(e,t,i,s){let r=t[0],n=t[1],a=t[2],o=t[3],l=i[0],h=i[1],c=i[2],d=i[3],u,f,g,p,m;return f=r*l+n*h+a*c+o*d,f<0&&(f=-f,l=-l,h=-h,c=-c,d=-d),1-f>1e-6?(u=Math.acos(f),g=Math.sin(u),p=Math.sin((1-s)*u)/g,m=Math.sin(s*u)/g):(p=1-s,m=s),e[0]=p*r+m*l,e[1]=p*n+m*h,e[2]=p*a+m*c,e[3]=p*o+m*d,e}function xe(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=i*i+s*s+r*r+n*n,o=a?1/a:0;return e[0]=-i*o,e[1]=-s*o,e[2]=-r*o,e[3]=n*o,e}function ye(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e}function we(e,t){let i=t[0]+t[4]+t[8],s;if(i>0)s=Math.sqrt(i+1),e[3]=.5*s,s=.5/s,e[0]=(t[5]-t[7])*s,e[1]=(t[6]-t[2])*s,e[2]=(t[1]-t[3])*s;else{let r=0;t[4]>t[0]&&(r=1),t[8]>t[r*3+r]&&(r=2);let n=(r+1)%3,a=(r+2)%3;s=Math.sqrt(t[r*3+r]-t[n*3+n]-t[a*3+a]+1),e[r]=.5*s,s=.5/s,e[3]=(t[n*3+a]-t[a*3+n])*s,e[n]=(t[n*3+r]+t[r*3+n])*s,e[a]=(t[a*3+r]+t[r*3+a])*s}return e}function ve(e,t,i="YXZ"){let s=Math.sin(t[0]*.5),r=Math.cos(t[0]*.5),n=Math.sin(t[1]*.5),a=Math.cos(t[1]*.5),o=Math.sin(t[2]*.5),l=Math.cos(t[2]*.5);return i==="XYZ"?(e[0]=s*a*l+r*n*o,e[1]=r*n*l-s*a*o,e[2]=r*a*o+s*n*l,e[3]=r*a*l-s*n*o):i==="YXZ"?(e[0]=s*a*l+r*n*o,e[1]=r*n*l-s*a*o,e[2]=r*a*o-s*n*l,e[3]=r*a*l+s*n*o):i==="ZXY"?(e[0]=s*a*l-r*n*o,e[1]=r*n*l+s*a*o,e[2]=r*a*o+s*n*l,e[3]=r*a*l-s*n*o):i==="ZYX"?(e[0]=s*a*l-r*n*o,e[1]=r*n*l+s*a*o,e[2]=r*a*o-s*n*l,e[3]=r*a*l+s*n*o):i==="YZX"?(e[0]=s*a*l+r*n*o,e[1]=r*n*l+s*a*o,e[2]=r*a*o-s*n*l,e[3]=r*a*l-s*n*o):i==="XZY"&&(e[0]=s*a*l-r*n*o,e[1]=r*n*l-s*a*o,e[2]=r*a*o+s*n*l,e[3]=r*a*l+s*n*o),e}var Ae=zt,Me=Pt,Ee=Bt,be=Dt,nt=class extends Array{constructor(t=0,i=0,s=0,r=1){return super(t,i,s,r),this.onChange=()=>{},this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}get w(){return this[3]}set x(t){this[0]=t,this.onChange()}set y(t){this[1]=t,this.onChange()}set z(t){this[2]=t,this.onChange()}set w(t){this[3]=t,this.onChange()}identity(){return de(this),this.onChange(),this}set(t,i,s,r){return t.length?this.copy(t):(Me(this,t,i,s,r),this.onChange(),this)}rotateX(t){return fe(this,this,t),this.onChange(),this}rotateY(t){return ge(this,this,t),this.onChange(),this}rotateZ(t){return me(this,this,t),this.onChange(),this}inverse(t=this){return xe(this,t),this.onChange(),this}conjugate(t=this){return ye(this,t),this.onChange(),this}copy(t){return Ae(this,t),this.onChange(),this}normalize(t=this){return be(this,t),this.onChange(),this}multiply(t,i){return i?bt(this,t,i):bt(this,this,t),this.onChange(),this}dot(t){return Ee(this,t)}fromMatrix3(t){return we(this,t),this.onChange(),this}fromEuler(t){return ve(this,t,t.order),this}fromAxisAngle(t,i){return ue(this,t,i),this}slerp(t,i){return pe(this,this,t,i),this}fromArray(t,i=0){return this[0]=t[i],this[1]=t[i+1],this[2]=t[i+2],this[3]=t[i+3],this}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t[i+3]=this[3],t}},Ce=1e-6;function Te(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function Se(e,t,i,s,r,n,a,o,l,h,c,d,u,f,g,p,m){return e[0]=t,e[1]=i,e[2]=s,e[3]=r,e[4]=n,e[5]=a,e[6]=o,e[7]=l,e[8]=h,e[9]=c,e[10]=d,e[11]=u,e[12]=f,e[13]=g,e[14]=p,e[15]=m,e}function Ue(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Fe(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],d=t[9],u=t[10],f=t[11],g=t[12],p=t[13],m=t[14],x=t[15],v=i*o-s*a,A=i*l-r*a,w=i*h-n*a,M=s*l-r*o,y=s*h-n*o,S=r*h-n*l,I=c*p-d*g,F=c*m-u*g,b=c*x-f*g,U=d*m-u*p,T=d*x-f*p,C=u*x-f*m,E=v*C-A*T+w*U+M*b-y*F+S*I;return E?(E=1/E,e[0]=(o*C-l*T+h*U)*E,e[1]=(r*T-s*C-n*U)*E,e[2]=(p*S-m*y+x*M)*E,e[3]=(u*y-d*S-f*M)*E,e[4]=(l*b-a*C-h*F)*E,e[5]=(i*C-r*b+n*F)*E,e[6]=(m*w-g*S-x*A)*E,e[7]=(c*S-u*w+f*A)*E,e[8]=(a*T-o*b+h*I)*E,e[9]=(s*b-i*T-n*I)*E,e[10]=(g*y-p*w+x*v)*E,e[11]=(d*w-c*y-f*v)*E,e[12]=(o*F-a*U-l*I)*E,e[13]=(i*U-s*F+r*I)*E,e[14]=(p*A-g*M-m*v)*E,e[15]=(c*M-d*A+u*v)*E,e):null}function Ie(e){let t=e[0],i=e[1],s=e[2],r=e[3],n=e[4],a=e[5],o=e[6],l=e[7],h=e[8],c=e[9],d=e[10],u=e[11],f=e[12],g=e[13],p=e[14],m=e[15],x=t*a-i*n,v=t*o-s*n,A=t*l-r*n,w=i*o-s*a,M=i*l-r*a,y=s*l-r*o,S=h*g-c*f,I=h*p-d*f,F=h*m-u*f,b=c*p-d*g,U=c*m-u*g,T=d*m-u*p;return x*T-v*U+A*b+w*F-M*I+y*S}function Ct(e,t,i){let s=t[0],r=t[1],n=t[2],a=t[3],o=t[4],l=t[5],h=t[6],c=t[7],d=t[8],u=t[9],f=t[10],g=t[11],p=t[12],m=t[13],x=t[14],v=t[15],A=i[0],w=i[1],M=i[2],y=i[3];return e[0]=A*s+w*o+M*d+y*p,e[1]=A*r+w*l+M*u+y*m,e[2]=A*n+w*h+M*f+y*x,e[3]=A*a+w*c+M*g+y*v,A=i[4],w=i[5],M=i[6],y=i[7],e[4]=A*s+w*o+M*d+y*p,e[5]=A*r+w*l+M*u+y*m,e[6]=A*n+w*h+M*f+y*x,e[7]=A*a+w*c+M*g+y*v,A=i[8],w=i[9],M=i[10],y=i[11],e[8]=A*s+w*o+M*d+y*p,e[9]=A*r+w*l+M*u+y*m,e[10]=A*n+w*h+M*f+y*x,e[11]=A*a+w*c+M*g+y*v,A=i[12],w=i[13],M=i[14],y=i[15],e[12]=A*s+w*o+M*d+y*p,e[13]=A*r+w*l+M*u+y*m,e[14]=A*n+w*h+M*f+y*x,e[15]=A*a+w*c+M*g+y*v,e}function Re(e,t,i){let s=i[0],r=i[1],n=i[2],a,o,l,h,c,d,u,f,g,p,m,x;return t===e?(e[12]=t[0]*s+t[4]*r+t[8]*n+t[12],e[13]=t[1]*s+t[5]*r+t[9]*n+t[13],e[14]=t[2]*s+t[6]*r+t[10]*n+t[14],e[15]=t[3]*s+t[7]*r+t[11]*n+t[15]):(a=t[0],o=t[1],l=t[2],h=t[3],c=t[4],d=t[5],u=t[6],f=t[7],g=t[8],p=t[9],m=t[10],x=t[11],e[0]=a,e[1]=o,e[2]=l,e[3]=h,e[4]=c,e[5]=d,e[6]=u,e[7]=f,e[8]=g,e[9]=p,e[10]=m,e[11]=x,e[12]=a*s+c*r+g*n+t[12],e[13]=o*s+d*r+p*n+t[13],e[14]=l*s+u*r+m*n+t[14],e[15]=h*s+f*r+x*n+t[15]),e}function ke(e,t,i){let s=i[0],r=i[1],n=i[2];return e[0]=t[0]*s,e[1]=t[1]*s,e[2]=t[2]*s,e[3]=t[3]*s,e[4]=t[4]*r,e[5]=t[5]*r,e[6]=t[6]*r,e[7]=t[7]*r,e[8]=t[8]*n,e[9]=t[9]*n,e[10]=t[10]*n,e[11]=t[11]*n,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function Ge(e,t,i,s){let r=s[0],n=s[1],a=s[2],o=Math.hypot(r,n,a),l,h,c,d,u,f,g,p,m,x,v,A,w,M,y,S,I,F,b,U,T,C,E,G;return Math.abs(o)<Ce?null:(o=1/o,r*=o,n*=o,a*=o,l=Math.sin(i),h=Math.cos(i),c=1-h,d=t[0],u=t[1],f=t[2],g=t[3],p=t[4],m=t[5],x=t[6],v=t[7],A=t[8],w=t[9],M=t[10],y=t[11],S=r*r*c+h,I=n*r*c+a*l,F=a*r*c-n*l,b=r*n*c-a*l,U=n*n*c+h,T=a*n*c+r*l,C=r*a*c+n*l,E=n*a*c-r*l,G=a*a*c+h,e[0]=d*S+p*I+A*F,e[1]=u*S+m*I+w*F,e[2]=f*S+x*I+M*F,e[3]=g*S+v*I+y*F,e[4]=d*b+p*U+A*T,e[5]=u*b+m*U+w*T,e[6]=f*b+x*U+M*T,e[7]=g*b+v*U+y*T,e[8]=d*C+p*E+A*G,e[9]=u*C+m*E+w*G,e[10]=f*C+x*E+M*G,e[11]=g*C+v*E+y*G,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e)}function Ye(e,t){return e[0]=t[12],e[1]=t[13],e[2]=t[14],e}function Kt(e,t){let i=t[0],s=t[1],r=t[2],n=t[4],a=t[5],o=t[6],l=t[8],h=t[9],c=t[10];return e[0]=Math.hypot(i,s,r),e[1]=Math.hypot(n,a,o),e[2]=Math.hypot(l,h,c),e}function ze(e){let t=e[0],i=e[1],s=e[2],r=e[4],n=e[5],a=e[6],o=e[8],l=e[9],h=e[10],c=t*t+i*i+s*s,d=r*r+n*n+a*a,u=o*o+l*l+h*h;return Math.sqrt(Math.max(c,d,u))}var Pe=function(){let e=[0,0,0];return function(t,i){let s=e;Kt(s,i);let r=1/s[0],n=1/s[1],a=1/s[2],o=i[0]*r,l=i[1]*n,h=i[2]*a,c=i[4]*r,d=i[5]*n,u=i[6]*a,f=i[8]*r,g=i[9]*n,p=i[10]*a,m=o+d+p,x=0;return m>0?(x=Math.sqrt(m+1)*2,t[3]=.25*x,t[0]=(u-g)/x,t[1]=(f-h)/x,t[2]=(l-c)/x):o>d&&o>p?(x=Math.sqrt(1+o-d-p)*2,t[3]=(u-g)/x,t[0]=.25*x,t[1]=(l+c)/x,t[2]=(f+h)/x):d>p?(x=Math.sqrt(1+d-o-p)*2,t[3]=(f-h)/x,t[0]=(l+c)/x,t[1]=.25*x,t[2]=(u+g)/x):(x=Math.sqrt(1+p-o-d)*2,t[3]=(l-c)/x,t[0]=(f+h)/x,t[1]=(u+g)/x,t[2]=.25*x),t}}();function De(e,t,i,s){let r=t[0],n=t[1],a=t[2],o=t[3],l=r+r,h=n+n,c=a+a,d=r*l,u=r*h,f=r*c,g=n*h,p=n*c,m=a*c,x=o*l,v=o*h,A=o*c,w=s[0],M=s[1],y=s[2];return e[0]=(1-(g+m))*w,e[1]=(u+A)*w,e[2]=(f-v)*w,e[3]=0,e[4]=(u-A)*M,e[5]=(1-(d+m))*M,e[6]=(p+x)*M,e[7]=0,e[8]=(f+v)*y,e[9]=(p-x)*y,e[10]=(1-(d+g))*y,e[11]=0,e[12]=i[0],e[13]=i[1],e[14]=i[2],e[15]=1,e}function Be(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=i+i,o=s+s,l=r+r,h=i*a,c=s*a,d=s*o,u=r*a,f=r*o,g=r*l,p=n*a,m=n*o,x=n*l;return e[0]=1-d-g,e[1]=c+x,e[2]=u-m,e[3]=0,e[4]=c-x,e[5]=1-h-g,e[6]=f+p,e[7]=0,e[8]=u+m,e[9]=f-p,e[10]=1-h-d,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Ke(e,t,i,s,r){let n=1/Math.tan(t/2),a=1/(s-r);return e[0]=n/i,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=n,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=(r+s)*a,e[11]=-1,e[12]=0,e[13]=0,e[14]=2*r*s*a,e[15]=0,e}function Le(e,t,i,s,r,n,a){let o=1/(t-i),l=1/(s-r),h=1/(n-a);return e[0]=-2*o,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*l,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*h,e[11]=0,e[12]=(t+i)*o,e[13]=(r+s)*l,e[14]=(a+n)*h,e[15]=1,e}function Ne(e,t,i,s){let r=t[0],n=t[1],a=t[2],o=s[0],l=s[1],h=s[2],c=r-i[0],d=n-i[1],u=a-i[2],f=c*c+d*d+u*u;f===0?u=1:(f=1/Math.sqrt(f),c*=f,d*=f,u*=f);let g=l*u-h*d,p=h*c-o*u,m=o*d-l*c;return f=g*g+p*p+m*m,f===0&&(h?o+=1e-6:l?h+=1e-6:l+=1e-6,g=l*u-h*d,p=h*c-o*u,m=o*d-l*c,f=g*g+p*p+m*m),f=1/Math.sqrt(f),g*=f,p*=f,m*=f,e[0]=g,e[1]=p,e[2]=m,e[3]=0,e[4]=d*m-u*p,e[5]=u*g-c*m,e[6]=c*p-d*g,e[7]=0,e[8]=c,e[9]=d,e[10]=u,e[11]=0,e[12]=r,e[13]=n,e[14]=a,e[15]=1,e}var Y=class extends Array{constructor(t=1,i=0,s=0,r=0,n=0,a=1,o=0,l=0,h=0,c=0,d=1,u=0,f=0,g=0,p=0,m=1){return super(t,i,s,r,n,a,o,l,h,c,d,u,f,g,p,m),this}get x(){return this[12]}get y(){return this[13]}get z(){return this[14]}get w(){return this[15]}set x(t){this[12]=t}set y(t){this[13]=t}set z(t){this[14]=t}set w(t){this[15]=t}set(t,i,s,r,n,a,o,l,h,c,d,u,f,g,p,m){return t.length?this.copy(t):(Se(this,t,i,s,r,n,a,o,l,h,c,d,u,f,g,p,m),this)}translate(t,i=this){return Re(this,i,t),this}rotate(t,i,s=this){return Ge(this,s,t,i),this}scale(t,i=this){return ke(this,i,typeof t=="number"?[t,t,t]:t),this}multiply(t,i){return i?Ct(this,t,i):Ct(this,this,t),this}identity(){return Ue(this),this}copy(t){return Te(this,t),this}fromPerspective({fov:t,aspect:i,near:s,far:r}={}){return Ke(this,t,i,s,r),this}fromOrthogonal({left:t,right:i,bottom:s,top:r,near:n,far:a}){return Le(this,t,i,s,r,n,a),this}fromQuaternion(t){return Be(this,t),this}setPosition(t){return this.x=t[0],this.y=t[1],this.z=t[2],this}inverse(t=this){return Fe(this,t),this}compose(t,i,s){return De(this,t,i,s),this}getRotation(t){return Pe(t,this),this}getTranslation(t){return Ye(t,this),this}getScaling(t){return Kt(t,this),this}getMaxScaleOnAxis(){return ze(this)}lookAt(t,i,s){return Ne(this,t,i,s),this}determinant(){return Ie(this)}fromArray(t,i=0){return this[0]=t[i],this[1]=t[i+1],this[2]=t[i+2],this[3]=t[i+3],this[4]=t[i+4],this[5]=t[i+5],this[6]=t[i+6],this[7]=t[i+7],this[8]=t[i+8],this[9]=t[i+9],this[10]=t[i+10],this[11]=t[i+11],this[12]=t[i+12],this[13]=t[i+13],this[14]=t[i+14],this[15]=t[i+15],this}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t[i+3]=this[3],t[i+4]=this[4],t[i+5]=this[5],t[i+6]=this[6],t[i+7]=this[7],t[i+8]=this[8],t[i+9]=this[9],t[i+10]=this[10],t[i+11]=this[11],t[i+12]=this[12],t[i+13]=this[13],t[i+14]=this[14],t[i+15]=this[15],t}};function Oe(e,t,i="YXZ"){return i==="XYZ"?(e[1]=Math.asin(Math.min(Math.max(t[8],-1),1)),Math.abs(t[8])<.99999?(e[0]=Math.atan2(-t[9],t[10]),e[2]=Math.atan2(-t[4],t[0])):(e[0]=Math.atan2(t[6],t[5]),e[2]=0)):i==="YXZ"?(e[0]=Math.asin(-Math.min(Math.max(t[9],-1),1)),Math.abs(t[9])<.99999?(e[1]=Math.atan2(t[8],t[10]),e[2]=Math.atan2(t[1],t[5])):(e[1]=Math.atan2(-t[2],t[0]),e[2]=0)):i==="ZXY"?(e[0]=Math.asin(Math.min(Math.max(t[6],-1),1)),Math.abs(t[6])<.99999?(e[1]=Math.atan2(-t[2],t[10]),e[2]=Math.atan2(-t[4],t[5])):(e[1]=0,e[2]=Math.atan2(t[1],t[0]))):i==="ZYX"?(e[1]=Math.asin(-Math.min(Math.max(t[2],-1),1)),Math.abs(t[2])<.99999?(e[0]=Math.atan2(t[6],t[10]),e[2]=Math.atan2(t[1],t[0])):(e[0]=0,e[2]=Math.atan2(-t[4],t[5]))):i==="YZX"?(e[2]=Math.asin(Math.min(Math.max(t[1],-1),1)),Math.abs(t[1])<.99999?(e[0]=Math.atan2(-t[9],t[5]),e[1]=Math.atan2(-t[2],t[0])):(e[0]=0,e[1]=Math.atan2(t[8],t[10]))):i==="XZY"&&(e[2]=Math.asin(-Math.min(Math.max(t[4],-1),1)),Math.abs(t[4])<.99999?(e[0]=Math.atan2(t[6],t[5]),e[1]=Math.atan2(t[8],t[0])):(e[0]=Math.atan2(-t[9],t[10]),e[1]=0)),e}var Tt=new Y,at=class extends Array{constructor(t=0,i=t,s=t,r="YXZ"){return super(t,i,s),this.order=r,this.onChange=()=>{},this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(t){this[0]=t,this.onChange()}set y(t){this[1]=t,this.onChange()}set z(t){this[2]=t,this.onChange()}set(t,i=t,s=t){return t.length?this.copy(t):(this[0]=t,this[1]=i,this[2]=s,this.onChange(),this)}copy(t){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this.onChange(),this}reorder(t){return this.order=t,this.onChange(),this}fromRotationMatrix(t,i=this.order){return Oe(this,t,i),this}fromQuaternion(t,i=this.order){return Tt.fromQuaternion(t),this.fromRotationMatrix(Tt,i)}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t}},O=class{constructor(){this.parent=null,this.children=[],this.visible=!0,this.matrix=new Y,this.worldMatrix=new Y,this.matrixAutoUpdate=!0,this.position=new R,this.quaternion=new nt,this.scale=new R(1),this.rotation=new at,this.up=new R(0,1,0),this.rotation.onChange=()=>this.quaternion.fromEuler(this.rotation),this.quaternion.onChange=()=>this.rotation.fromQuaternion(this.quaternion)}setParent(t,i=!0){this.parent&&t!==this.parent&&this.parent.removeChild(this,!1),this.parent=t,i&&t&&t.addChild(this,!1)}addChild(t,i=!0){~this.children.indexOf(t)||this.children.push(t),i&&t.setParent(this,!1)}removeChild(t,i=!0){~this.children.indexOf(t)&&this.children.splice(this.children.indexOf(t),1),i&&t.setParent(null,!1)}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.worldMatrixNeedsUpdate||t)&&(this.parent===null?this.worldMatrix.copy(this.matrix):this.worldMatrix.multiply(this.parent.worldMatrix,this.matrix),this.worldMatrixNeedsUpdate=!1,t=!0);for(let i=0,s=this.children.length;i<s;i++)this.children[i].updateMatrixWorld(t)}updateMatrix(){this.matrix.compose(this.quaternion,this.position,this.scale),this.worldMatrixNeedsUpdate=!0}traverse(t){if(!t(this))for(let i=0,s=this.children.length;i<s;i++)this.children[i].traverse(t)}decompose(){this.matrix.getTranslation(this.position),this.matrix.getRotation(this.quaternion),this.matrix.getScaling(this.scale),this.rotation.fromQuaternion(this.quaternion)}lookAt(t,i=!1){i?this.matrix.lookAt(this.position,t,this.up):this.matrix.lookAt(t,this.position,this.up),this.matrix.getRotation(this.quaternion),this.rotation.fromQuaternion(this.quaternion)}},Qe=new Y,je=new R,Ve=new R,ot=class extends O{constructor(t,{near:i=.1,far:s=100,fov:r=45,aspect:n=1,left:a,right:o,bottom:l,top:h,zoom:c=1}={}){super(),Object.assign(this,{near:i,far:s,fov:r,aspect:n,left:a,right:o,bottom:l,top:h,zoom:c}),this.projectionMatrix=new Y,this.viewMatrix=new Y,this.projectionViewMatrix=new Y,this.worldPosition=new R,this.type=a||o?"orthographic":"perspective",this.type==="orthographic"?this.orthographic():this.perspective()}perspective({near:t=this.near,far:i=this.far,fov:s=this.fov,aspect:r=this.aspect}={}){return Object.assign(this,{near:t,far:i,fov:s,aspect:r}),this.projectionMatrix.fromPerspective({fov:s*(Math.PI/180),aspect:r,near:t,far:i}),this.type="perspective",this}orthographic({near:t=this.near,far:i=this.far,left:s=this.left,right:r=this.right,bottom:n=this.bottom,top:a=this.top,zoom:o=this.zoom}={}){return Object.assign(this,{near:t,far:i,left:s,right:r,bottom:n,top:a,zoom:o}),s/=o,r/=o,n/=o,a/=o,this.projectionMatrix.fromOrthogonal({left:s,right:r,bottom:n,top:a,near:t,far:i}),this.type="orthographic",this}updateMatrixWorld(){return super.updateMatrixWorld(),this.viewMatrix.inverse(this.worldMatrix),this.worldMatrix.getTranslation(this.worldPosition),this.projectionViewMatrix.multiply(this.projectionMatrix,this.viewMatrix),this}lookAt(t){return super.lookAt(t,!0),this}project(t){return t.applyMatrix4(this.viewMatrix),t.applyMatrix4(this.projectionMatrix),this}unproject(t){return t.applyMatrix4(Qe.inverse(this.projectionMatrix)),t.applyMatrix4(this.worldMatrix),this}updateFrustum(){this.frustum||(this.frustum=[new R,new R,new R,new R,new R,new R]);let t=this.projectionViewMatrix;this.frustum[0].set(t[3]-t[0],t[7]-t[4],t[11]-t[8]).constant=t[15]-t[12],this.frustum[1].set(t[3]+t[0],t[7]+t[4],t[11]+t[8]).constant=t[15]+t[12],this.frustum[2].set(t[3]+t[1],t[7]+t[5],t[11]+t[9]).constant=t[15]+t[13],this.frustum[3].set(t[3]-t[1],t[7]-t[5],t[11]-t[9]).constant=t[15]-t[13],this.frustum[4].set(t[3]-t[2],t[7]-t[6],t[11]-t[10]).constant=t[15]-t[14],this.frustum[5].set(t[3]+t[2],t[7]+t[6],t[11]+t[10]).constant=t[15]+t[14];for(let i=0;i<6;i++){let s=1/this.frustum[i].distance();this.frustum[i].multiply(s),this.frustum[i].constant*=s}}frustumIntersectsMesh(t){if(!t.geometry.attributes.position||((!t.geometry.bounds||t.geometry.bounds.radius===1/0)&&t.geometry.computeBoundingSphere(),!t.geometry.bounds))return!0;let i=je;i.copy(t.geometry.bounds.center),i.applyMatrix4(t.worldMatrix);let s=t.geometry.bounds.radius*t.worldMatrix.getMaxScaleOnAxis();return this.frustumIntersectsSphere(i,s)}frustumIntersectsSphere(t,i){let s=Ve;for(let r=0;r<6;r++){let n=this.frustum[r];if(s.copy(n).dot(t)+n.constant<-i)return!1}return!0}};function He(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e}function Ze(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=i+i,o=s+s,l=r+r,h=i*a,c=s*a,d=s*o,u=r*a,f=r*o,g=r*l,p=n*a,m=n*o,x=n*l;return e[0]=1-d-g,e[3]=c-x,e[6]=u+m,e[1]=c+x,e[4]=1-h-g,e[7]=f-p,e[2]=u-m,e[5]=f+p,e[8]=1-h-d,e}function Je(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e}function We(e,t,i,s,r,n,a,o,l,h){return e[0]=t,e[1]=i,e[2]=s,e[3]=r,e[4]=n,e[5]=a,e[6]=o,e[7]=l,e[8]=h,e}function qe(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e}function _e(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],d=c*a-o*h,u=-c*n+o*l,f=h*n-a*l,g=i*d+s*u+r*f;return g?(g=1/g,e[0]=d*g,e[1]=(-c*s+r*h)*g,e[2]=(o*s-r*a)*g,e[3]=u*g,e[4]=(c*i-r*l)*g,e[5]=(-o*i+r*n)*g,e[6]=f*g,e[7]=(-h*i+s*l)*g,e[8]=(a*i-s*n)*g,e):null}function St(e,t,i){let s=t[0],r=t[1],n=t[2],a=t[3],o=t[4],l=t[5],h=t[6],c=t[7],d=t[8],u=i[0],f=i[1],g=i[2],p=i[3],m=i[4],x=i[5],v=i[6],A=i[7],w=i[8];return e[0]=u*s+f*a+g*h,e[1]=u*r+f*o+g*c,e[2]=u*n+f*l+g*d,e[3]=p*s+m*a+x*h,e[4]=p*r+m*o+x*c,e[5]=p*n+m*l+x*d,e[6]=v*s+A*a+w*h,e[7]=v*r+A*o+w*c,e[8]=v*n+A*l+w*d,e}function Xe(e,t,i){let s=t[0],r=t[1],n=t[2],a=t[3],o=t[4],l=t[5],h=t[6],c=t[7],d=t[8],u=i[0],f=i[1];return e[0]=s,e[1]=r,e[2]=n,e[3]=a,e[4]=o,e[5]=l,e[6]=u*s+f*a+h,e[7]=u*r+f*o+c,e[8]=u*n+f*l+d,e}function $e(e,t,i){let s=t[0],r=t[1],n=t[2],a=t[3],o=t[4],l=t[5],h=t[6],c=t[7],d=t[8],u=Math.sin(i),f=Math.cos(i);return e[0]=f*s+u*a,e[1]=f*r+u*o,e[2]=f*n+u*l,e[3]=f*a-u*s,e[4]=f*o-u*r,e[5]=f*l-u*n,e[6]=h,e[7]=c,e[8]=d,e}function ti(e,t,i){let s=i[0],r=i[1];return e[0]=s*t[0],e[1]=s*t[1],e[2]=s*t[2],e[3]=r*t[3],e[4]=r*t[4],e[5]=r*t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e}function ei(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],d=t[9],u=t[10],f=t[11],g=t[12],p=t[13],m=t[14],x=t[15],v=i*o-s*a,A=i*l-r*a,w=i*h-n*a,M=s*l-r*o,y=s*h-n*o,S=r*h-n*l,I=c*p-d*g,F=c*m-u*g,b=c*x-f*g,U=d*m-u*p,T=d*x-f*p,C=u*x-f*m,E=v*C-A*T+w*U+M*b-y*F+S*I;return E?(E=1/E,e[0]=(o*C-l*T+h*U)*E,e[1]=(l*b-a*C-h*F)*E,e[2]=(a*T-o*b+h*I)*E,e[3]=(r*T-s*C-n*U)*E,e[4]=(i*C-r*b+n*F)*E,e[5]=(s*b-i*T-n*I)*E,e[6]=(p*S-m*y+x*M)*E,e[7]=(m*w-g*S-x*A)*E,e[8]=(g*y-p*w+x*v)*E,e):null}var lt=class extends Array{constructor(t=1,i=0,s=0,r=0,n=1,a=0,o=0,l=0,h=1){return super(t,i,s,r,n,a,o,l,h),this}set(t,i,s,r,n,a,o,l,h){return t.length?this.copy(t):(We(this,t,i,s,r,n,a,o,l,h),this)}translate(t,i=this){return Xe(this,i,t),this}rotate(t,i=this){return $e(this,i,t),this}scale(t,i=this){return ti(this,i,t),this}multiply(t,i){return i?St(this,t,i):St(this,this,t),this}identity(){return qe(this),this}copy(t){return Je(this,t),this}fromMatrix4(t){return He(this,t),this}fromQuaternion(t){return Ze(this,t),this}fromBasis(t,i,s){return this.set(t[0],t[1],t[2],i[0],i[1],i[2],s[0],s[1],s[2]),this}inverse(t=this){return _e(this,t),this}getNormalMatrix(t){return ei(this,t),this}},ii=0,N=class extends O{constructor(t,{geometry:i,program:s,mode:r=t.TRIANGLES,frustumCulled:n=!0,renderOrder:a=0}={}){super(),t.canvas||console.error("gl not passed as first argument to Mesh"),this.gl=t,this.id=ii++,this.geometry=i,this.program=s,this.mode=r,this.frustumCulled=n,this.renderOrder=a,this.modelViewMatrix=new Y,this.normalMatrix=new lt,this.beforeRenderCallbacks=[],this.afterRenderCallbacks=[]}onBeforeRender(t){return this.beforeRenderCallbacks.push(t),this}onAfterRender(t){return this.afterRenderCallbacks.push(t),this}draw({camera:t}={}){this.beforeRenderCallbacks.forEach(s=>s&&s({mesh:this,camera:t})),t&&(this.program.uniforms.modelMatrix||Object.assign(this.program.uniforms,{modelMatrix:{value:null},viewMatrix:{value:null},modelViewMatrix:{value:null},normalMatrix:{value:null},projectionMatrix:{value:null},cameraPosition:{value:null}}),this.program.uniforms.projectionMatrix.value=t.projectionMatrix,this.program.uniforms.cameraPosition.value=t.worldPosition,this.program.uniforms.viewMatrix.value=t.viewMatrix,this.modelViewMatrix.multiply(t.viewMatrix,this.worldMatrix),this.normalMatrix.getNormalMatrix(this.modelViewMatrix),this.program.uniforms.modelMatrix.value=this.worldMatrix,this.program.uniforms.modelViewMatrix.value=this.modelViewMatrix,this.program.uniforms.normalMatrix.value=this.normalMatrix);let i=this.program.cullFace&&this.worldMatrix.determinant()<0;this.program.use({flipFaces:i}),this.geometry.draw({mode:this.mode,program:this.program}),this.afterRenderCallbacks.forEach(s=>s&&s({mesh:this,camera:t}))}},Ut=new Uint8Array(4);function Ft(e){return(e&e-1)===0}var si=1,J=class{constructor(t,{image:i,target:s=t.TEXTURE_2D,type:r=t.UNSIGNED_BYTE,format:n=t.RGBA,internalFormat:a=n,wrapS:o=t.CLAMP_TO_EDGE,wrapT:l=t.CLAMP_TO_EDGE,generateMipmaps:h=!0,minFilter:c=h?t.NEAREST_MIPMAP_LINEAR:t.LINEAR,magFilter:d=t.LINEAR,premultiplyAlpha:u=!1,unpackAlignment:f=4,flipY:g=s==t.TEXTURE_2D,anisotropy:p=0,level:m=0,width:x,height:v=x}={}){this.gl=t,this.id=si++,this.image=i,this.target=s,this.type=r,this.format=n,this.internalFormat=a,this.minFilter=c,this.magFilter=d,this.wrapS=o,this.wrapT=l,this.generateMipmaps=h,this.premultiplyAlpha=u,this.unpackAlignment=f,this.flipY=g,this.anisotropy=Math.min(p,this.gl.renderer.parameters.maxAnisotropy),this.level=m,this.width=x,this.height=v,this.texture=this.gl.createTexture(),this.store={image:null},this.glState=this.gl.renderer.state,this.state={},this.state.minFilter=this.gl.NEAREST_MIPMAP_LINEAR,this.state.magFilter=this.gl.LINEAR,this.state.wrapS=this.gl.REPEAT,this.state.wrapT=this.gl.REPEAT,this.state.anisotropy=0}bind(){this.glState.textureUnits[this.glState.activeTextureUnit]!==this.id&&(this.gl.bindTexture(this.target,this.texture),this.glState.textureUnits[this.glState.activeTextureUnit]=this.id)}update(t=0){let i=!(this.image===this.store.image&&!this.needsUpdate);if((i||this.glState.textureUnits[t]!==this.id)&&(this.gl.renderer.activeTexture(t),this.bind()),!!i){if(this.needsUpdate=!1,this.flipY!==this.glState.flipY&&(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,this.flipY),this.glState.flipY=this.flipY),this.premultiplyAlpha!==this.glState.premultiplyAlpha&&(this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),this.glState.premultiplyAlpha=this.premultiplyAlpha),this.unpackAlignment!==this.glState.unpackAlignment&&(this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,this.unpackAlignment),this.glState.unpackAlignment=this.unpackAlignment),this.minFilter!==this.state.minFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MIN_FILTER,this.minFilter),this.state.minFilter=this.minFilter),this.magFilter!==this.state.magFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MAG_FILTER,this.magFilter),this.state.magFilter=this.magFilter),this.wrapS!==this.state.wrapS&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_S,this.wrapS),this.state.wrapS=this.wrapS),this.wrapT!==this.state.wrapT&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_T,this.wrapT),this.state.wrapT=this.wrapT),this.anisotropy&&this.anisotropy!==this.state.anisotropy&&(this.gl.texParameterf(this.target,this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropy),this.state.anisotropy=this.anisotropy),this.image){if(this.image.width&&(this.width=this.image.width,this.height=this.image.height),this.target===this.gl.TEXTURE_CUBE_MAP)for(let s=0;s<6;s++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+s,this.level,this.internalFormat,this.format,this.type,this.image[s]);else if(ArrayBuffer.isView(this.image))this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,this.image);else if(this.image.isCompressedTexture)for(let s=0;s<this.image.length;s++)this.gl.compressedTexImage2D(this.target,s,this.internalFormat,this.image[s].width,this.image[s].height,0,this.image[s].data);else this.gl.texImage2D(this.target,this.level,this.internalFormat,this.format,this.type,this.image);this.generateMipmaps&&(!this.gl.renderer.isWebgl2&&(!Ft(this.image.width)||!Ft(this.image.height))?(this.generateMipmaps=!1,this.wrapS=this.wrapT=this.gl.CLAMP_TO_EDGE,this.minFilter=this.gl.LINEAR):this.gl.generateMipmap(this.target)),this.onUpdate&&this.onUpdate()}else if(this.target===this.gl.TEXTURE_CUBE_MAP)for(let s=0;s<6;s++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+s,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,Ut);else this.width?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,null):this.gl.texImage2D(this.target,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,Ut);this.store.image=this.image}}},ct=class extends Array{constructor(t=0,i=t,s=t,r=t){return super(t,i,s,r),this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}get w(){return this[3]}set x(t){this[0]=t}set y(t){this[1]=t}set z(t){this[2]=t}set w(t){this[3]=t}set(t,i,s,r){return t.length?this.copy(t):(Pt(this,t,i,s,r),this)}copy(t){return zt(this,t),this}normalize(){return Dt(this,this),this}multiply(t){return he(this,this,t),this}dot(t){return Bt(this,t)}fromArray(t,i=0){return this[0]=t[i],this[1]=t[i+1],this[2]=t[i+2],this[3]=t[i+3],this}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t[i+3]=this[3],t}},Q=class extends Z{constructor(t,{width:i=1,height:s=1,widthSegments:r=1,heightSegments:n=1,attributes:a={}}={}){let o=r,l=n,h=(o+1)*(l+1),c=o*l*6,d=new Float32Array(h*3),u=new Float32Array(h*3),f=new Float32Array(h*2),g=c>65536?new Uint32Array(c):new Uint16Array(c);Q.buildPlane(d,u,f,g,i,s,0,o,l),Object.assign(a,{position:{size:3,data:d},normal:{size:3,data:u},uv:{size:2,data:f},index:{data:g}}),super(t,a)}static buildPlane(t,i,s,r,n,a,o,l,h,c=0,d=1,u=2,f=1,g=-1,p=0,m=0){let x=p,v=n/l,A=a/h;for(let w=0;w<=h;w++){let M=w*A-a/2;for(let y=0;y<=l;y++,p++){let S=y*v-n/2;if(t[p*3+c]=S*f,t[p*3+d]=M*g,t[p*3+u]=o/2,i[p*3+c]=0,i[p*3+d]=0,i[p*3+u]=o>=0?1:-1,s[p*2]=y/l,s[p*2+1]=1-w/h,w===h||y===l)continue;let I=x+y+w*(l+1),F=x+y+(w+1)*(l+1),b=x+y+(w+1)*(l+1)+1,U=x+y+w*(l+1)+1;r[m*6]=I,r[m*6+1]=F,r[m*6+2]=U,r[m*6+3]=F,r[m*6+4]=b,r[m*6+5]=U,m++}}}},ri="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wgARCAIAAgADAREAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAwQFAgEABv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAPrAQM8JEMlGzI8WDAMKdPGgh44GKI8bNC5kOZMipowLmhYcHDIiLGAAEWMhQRgGFCDBQBCIMAGDAwY0WhQWNDggQxYoHAJsMdADY8OBDoYYHCgDJxJClUKJCoUGIi50INnAIUOdBioECAMk4WDlAqhicANnDR0YCHCKDCFECTTg6MEsTGzYsOlIpBgocpBzguRxMKODAgLDQEWOHDQAweCFEZFwB0GTCYIASmWx06dNBjouZGwREPngoweDjI2cFiYJjAUCUymMBwpWHzAAnCQQyDMgRYKbNnjpsmGDJgrDYgCDmhc+eJwUrlQ4Ml8fAHAAmBJpGJYc4BHy2UABPJooZPBh4omjY8Wx4XEyWAOixk2DMjA2FNHAIuAFARSCCpsdCiRNJ4oFK50sn0xSFScDFhIlEIZMADgUpj4Q4SiSAPDo+GGw44WgxNJ4mTwQA6FGhwpjhoGLCJ0GICxsZKA2OACcLACQIjZaLZVGAAkKAhcUEw4UEKHRgaHwRGJ548NDIQeHx0eFiUJioiLBggQfLRUGAJNJgqMAxU8ZDFUfPHBAWMEUQGi4WBk4AJwmAMHTgwPHBAIPhDhJIxsdNmQxsaKgwKCZ4WIxwcKBoOOjZWCC5EI4oLmxoKYDhwwYYOE8lE84NhywNHgJFJgE8EHCsMnBAMUQgmRiUGHwgUIYGSiYEAR0RJh4dKZQGxkIaFxQAAEyQeHzRodOBx44eECCIHRgbKo0FBEkjkwIUCiWTwuKhCkGFhETNGTx0dHwwMyNgSaTBA0MlMthwYkLgRQMUQxPFhQCOj4UZKYuTCeJksmGi6fQDAwBJZAIZVLBQCmgQkbHjQuMBRMSPGR4sBBAZLIIikgRDFAojZoVERQAAGigUzwoRSeOlQdHBoTIBCPCZEDn1JcHBgwRD58nlYqjQiOHBQEGGAgY0KnAgYeCGgQYpGhImAjBRNiAEbMEsCDHjgYogSMSx0sFEeOkI+bJwEXEx0+hKI2EFCYSTxXDAhMaGzYAAFHzwuaGx0MNGzRgyFDHgJOBDwUmE4KeFgJsIBPDBknCY4VCqOGD58+cFAJwWDFwoDR0SEAAwPgxQSMF4+gMkknhTwMaLJXOgxs6KGDBk2cFDI4EEhUliRsZHgAICJnQYqFK5TGwRKIwgZBiQUoFUrDYgZOAhclnAA2fUH0oQlEcQFgA6fRF4ODBAAIASBBDgUbHDgkJkslmyibMgieSwYY8HKI6GMCAsIAzhswBLR9GUwYMySCOTDxWK5aLBoTJBIJB0oFculY8RRIILEgEcDFsrmhYnCxkUAGwp4liIMSMDRWOE00OHhcAcCDAM4Uj6EonToAiEMUPF8qDA8aFiYTSeYKQ4US+dJIEATxAELlMvFcATxICVAJKODIElADgERPFsMTRYMcOBQJ0cMnRkulcyECEkhC5ssGggIIKiYc8JmB8oj5QMgSaTRUOZHSiMCoqYBFA6ThMZAEgAFPE0GUCyNk8hmR42BBBRk0GKpRAhBoSJ5s6NgBQVFhYKUR4nACgHCFgoGBImio2GHR0ATBM6MBjgoBMCoMTCHhY0NlYoiJ88TwpoEGGh4ZNGwIsGHTIMKMhBAjCAEXHioPixgOEOlMfOghY2bODAcGICZ48cNmwQieGQQgYHSmFNBxImkkSNmhwsDAweJAiFDC5k0OFY0Kkcnix4YKg+Li4UcCnTgyPnjBg8cOBgIMSFDg6MAzgI6eETBVLJoXPCpwlEI2NhykNjgqQhEaNCYsFKBWFzZoTJx0IUBkETgQ2MGAg+VjxJMjJ0GBFQQEAHHjAUfMAxYSGCoMAAoQ0ZJJCFR0OEKBRBE8WNgwYkKDA+ZHRkyKARwoGBUkCAc4HKI8UDggcCAgYInAQhkOUwgUdGScJmjp48ZGBwZBCRNJoU8CHSwbFzB06Kk0QAjAwPDQYyDHxsTJpIFxMWHCkOjAYfOEoVDmhYyCODhQChR02LHDIsIHR02bPBDIgJBwhNMlIZCmgIMEKk8QND5RHg4yHDGRIlkwTJokNFIeGBotHCWKDAAUCHgYcOFHCiGPGxQlihoOFMmTgqADDAMycNmx8aFhUXEiWLhSqMFMZCjxsMKEQlCZLFh4plMKMDxsGcFhASDDAsZCBBsaKgwAESSZNmggQXJAmaHBwXHSgdPHRo2AJBPEgIwVQA+VDRwMNASGSARNMFYoD4wdDhzYYWJAsYNmDAYOeCBxkGJgwwoCDnhMgCY2Mjg+Vx0IeEjoYTFwAgYGR4WCDR0UOjAAEIEwCFKBSGzoQMbOjwYQJZgKcADBSAE8TBDI2GNiBKNDhNIJKNFgsFwolE0LCIqcMDAcnmAo4IAwh44ePATxgni4QMUgwocCBBwoDYmIHDpg4MD5gikonnSyWjoInCp0VI5OMlouFYpFMESxQRAhQxRAgBwIIk0aHApomgRk6AJ5g2GBCIuLjxRHzQIGMD5sWMGwQkIEg6WiwEDGREGKi4E6NDRTKwcXJhLEBwyYKAcOHEAYicHRs2ICxQCggIgCBioqTwA0UBwXCDBUHwoqLGAYATAGxspBRoZBCoubOnQwMMGOACeQxAeHQg0Ux8SI5g2KmBkZHThkOFBkgWOCQsImhkMdEzRQKho2eMgzAcXAAx0oGjxs6HNHDYAwFNASeTCQJmRgtlsqDYIlEoXPHhUGOFcqATZQAEcUBiwkLDZ4EYOmhw0BHBg8ePDZwniwyGDhgQ2NGwRommSgLi5JI5KNjxouH0RcPE4kACOLDoAWKRUKg2MBxIhi4cyThMIbDHBQwFAGBophjQcIcECYJjpSGRkXFhkyBFzIwCFxIWBGRgOVC4UwYiBEySJGjoMplIdHhsyTiKZKgYmCg8GHwZHEBcSMBykUQ4cMdJhMFBotDBkTAghUVAGhoMLgjRw6dGSgWh4VJ4UQFyeLmg4ccKYybJ4kZPDYcEPD4YIAJRLJwgLngxUKA4OiIiZOHRo8KhDZKIgmBGRsdOAAYYfNGSgfSj5KJgIweJwqdGBoKUxkATxIYNHAoUplQZBgQBLJRNEwQUeHikPAAQEnmjhwCdNCRMJJwOPjAAwEGx8ZOlEuhyWTgAcWEQZk6GGx8OKgxQXMGAgwUimEOnhsGfPEUTMmxsbDFIKABE0QBGzwICLmzAkZKQwSwI6WB4ONDBROiAMweFREADODQyUDJPPC5MBmzoyVyoaGRkYBEUiiJ0GHGTIwUAZ4AShUGaACxocOiRkMbFwI8WiiUToI2FNGwImDEiKDGymbNAwBgQJoIcGwhUK4coDAoThUQJBgycBhxkfGDgYWJYiYBgxwbMC4E8ECHQpXLRRMk8XCFAOJks4SiKeGx8eCCgAXACQoURkMPFIONBCaKGBIngDZgSNjQ+MhghgETDBs6OATB0wdNhTx0rFgpC5OFQQ8GFToiIk4XCjZUGBIRChBYCaDjxswBPHTAsZNhBYGdERYGPDI6DODIcZPCx4SBhwxkAENAxwsDQmBAgxs0GCEkRBComdKZUACw2bNHQQQYEycLnTx0weGx40ICoIWIwyPDR0IWi2dBgBUQAHjpwCDNBApRNiwY8MDxo2AFREETiSBK5RFDpUNjZoKDJQkKAzZsbMihsrGiOKHhYnHgowOlQ+iKgsADC4qIkwENACYYHw54McGR8oDocARhg6KE8mCg6FADpVChxoMTyGJiYoFHSmCERsqiZGEzhkXABxkdLh9AOE4XGTJ0SIpwMLE4XHgxk4HGh0ZGDQuRiqNhhQQJoqdClQrGzwYKDJ5BPnBYqloIeMDRSJx86TxowIjRZGAhXKxwmiBo0NHBY4ZJ4MyPGQAU6dCADQMUAH0ZWHzxKIRJJxQKw8NhRkKAEyMfLgT6Ephgx06DFT58SDCoqUT6MrhCqeJwmTgAcIFGgooJBRoOHFTAkLAxQWAgBg+qPpSiFJR8kfNk0aHygVxsMZFgYMjAimWCoCFhMnmBYWFhY0OFcuFQYJ5PERA8cOBSkeFTQyOD42JE0lk4XBComYKp9KfTFAKTT5c+XEDo4VCyOHBcAdOCYUbLZZAEkmABIADMmRoOUSwOgwIkSxcyLHBkoGxY0aGy8bFBYkE0UNnCUKlYvF88cMEokiRgbKhTBi5g8LmTAyUCsVDRMJIEnCZoaDmApWDnTwQKIk8QMBzoM0eCi4UvBRMwcMigqcAEYqFMsipMCgAQI6UCkHEyaZMmQocYHRwbOCxPBCIuMGgoAaLB4XBhRw6IE4CbOAToQREB0pjgmdLIcwAAk8nFg8eExMCHMBgoQoBjAiIAA5YHQoIGaAGDB0yYNCpgIOlQZFRICPFIARSeZCDoEmk0GHKY6LHCuVhwwTCccKAsTwJgWOBgh42PjYMnkoyUyyNDYuIC4mLnhsMaBChoaHhobFBY0GDiYiLATYyDIwiNBDQUKHClEphyODGjAsLGQYMEDCAxorhSWRxA8VBscHjwsTSeJmSgPnAZ4yUykMGAIYKbECWDOC5o2HAk46dEzoyUAY0UAwoCKBOBnTJo2cEgR0aKwAmkcRMjBQKI0EAEwmAzYU8eODA8MjYcyMlEKLkwjAwQEcHCgeERYVEDAQqAzQYACDlImiwwNDQUwKiRseCgxcVJAiFGyoUTAiIgBsITxM0CGimOjQQeGBocJ5KIZPOhR8+hKhNEQZPAmTBgwdCAgY2OE48PDw4dFxUWOj4YGYEyOJAhgeHg4kImCkdIwucPGhwtFQKMGgZsGRyKTTBULp9CMk0SFhMCLgxYVHhwGLHRwVOlArhxQEaAHR4KZNE0lk4TGRseKYUkGB4WJgsBMhioVioFAGQBoAfNkoOdLBbGDYmLCQgLmTwMEOlk8SRYoDZsbKB4CDOGTg4NnjAmSCYInR8rlQdAnDAiTxQ2DMjpbLhonE8SFSUQwI2OlUdGRgVECSKATZkKEGSudEwA0fRHjJs2bBiguHHhsKcJh88TTxorlUOPFEyICAkdGBcQClksBhUmkY+fIAIeCmh0bKJTAEsjgDQEEMmB0qGTQwNlcGKCwyMgiYCGigWAoqRD5oVNlMplE8MlcKBEhIKEJwuGHR06DAEc+ZPnwg0GDi46VxoyTSSeHhcljh4YGQQ2UikDBngZk8DMAxYpH04cmEchCQUbHSmNjJVGAJ0EKghcEbGgwqABASYSxIyOBycNlUEZFTBkbNE8McCk0WKpYKIyCPGRUmCAQIdKJcKQgRyeAOgTZYHykNBA54EJCZ4wECiwEGGGhcQIwmNnBIaHAgIAMmhw0ICIYGRxUsFUsFY0BBE8jEoUGyoVxgaOk0TMgjpoaKI0OjBsGYPCYMyEMggQcdCk8RECSdMGRo0eOBggQeACIkGOiZ4IPls//8QAHxAAAwEBAAMBAQEBAAAAAAAAAgMEAQASExQFERAV/9oACAEBAAECAMadOOLaGWMPUpbkBDUVGPyv3atcup0dShKEhIK/6+lNOnnHxGJO3D2g3yUlR7aWjrg2Mo2Q5OIsV858ksYgl60WFqzyfTHx1U3TsGt9M79ZUdTAGYKI8wXgZmDlvnYO4PzrmVKqdAUKcyh0prElu3yDnE4/7oKPHfVprD0+k1MXs7U5rdoaNgUT7PxroQsTQKtEAXL8uvyttk1a66mkr0Siw6uxs7HmBqGUFKwAIMjUxajrpofoqxVf11vS0WvZxgO/xr8bj1XrqE2s3l68aBopc0AjnnUHCeoX+eMR/msjVKC3nWwnqwQykHJSMZTt6k9xGtJfSCnMpW0ehX4a1zHt8dEu3fY5gsF26sWclbV0AnKOSucMdU9L9Ne3BWrQAoWCf0TDHF8ezkLU7hsrdW/EL5js6TJA52OW+fV+QmkEmpvCybYSYelS9zfp+llg1e/TzkqXPk2S6o9NBocKzQ8jMFJUj00Y+ZsjUSsS7R/KCbh162d7XYwLMpHZfmbOC1dO9bdz0foAZFgZMIIHEhk8qZlt6p5ucxryr1wOW1epmmlybR3W80wKgjHVhqTUlcSpKFuUK6Z3q3J2SLlUk8pZa+n3trKpmOlEMmdLs3zKmUpSKGWt9Hy/KgMJeIFILBR10vZuua7MBc/zLQhMqUI9bUU82nTSTuZiwYqZaOBmUMGhIKeNImqOSUZi3c520MKgn5vu1mJSpqGrnnCYZ2nYxup0VijZwnxU/IUWOr+jep6hyWKQiY55oNhiUtXg4r9almFWqteEHioA0TXgka6ee9vLUvVNjJhrOnamtb7vrWSlCkAMmKQKBMHpsA1zIzFdivVq5lBrWNWKjN7HghamTGtCREB7am/pF+ixhBUpqFoQRtVoh/EYtLcU79DHgbF1Y+fkbhKGgaAs1r5QUM3KxhmZuQ2c2tNz0fFiN4S98zAmGcmiC43yvU7HGvlriUhWJY5lZXNdtCqJ8OR8Oz0cs08rtTIjFNVTrbG7QDmpp/P2YNGcasb36vZkYImTN7wKgTWnkOewDWOpctoqUaI1T8fOyPUBWmpbklEqOaMETsdSW0L0XHnJUhqHuW5FoCM5zD/JMYTX/p1bQdVD6WQh+cExDqzdtpWEKolLJdKnC1jTb7EuwsBek82CsEhMqX+DjJ5EYWjVJsDpVrlRWv3nTGV2D1AJEd9iKFvpZTrT/P4SmBKnHfTbX/WGRsVD0jQamgqXX01NIFxi48cD1UqzZXIzV0qaxusDUAE4KXvpFZZmgzHaTMo4VzEzq0aC6Ts0jNKzzSWf2Mrc3dlNL53BU1v6mvDTPdE2SnMSmLIuo7QNSFp179cxqafzjRNVE2VoppdWuhJxgtZoEUa3tMzx21jYVLmpNfEx7TysxsyxWZzXZzmFZ9h0bQmmM1PFrqK3VM3t5rjxBJsmejMXQlUr5BVQ59SX9JL+XNOtyaZKkapm+2Vv571GOsVrDs83NKz6sqyoDQoRYDAaVgGudWMChma+uljsrGneRiaQsV+hRcT3iw930rlckN/P2XEJpmSihdJ1m3lMlkRHDwF73tsGlj3p1QQFK5IvKmj2C6uh1X0ZYqj88RVz6HVez0vmzsFaW7SZ8SWowktnU4HWouB5G2nS5WiTOCaMJNWZM0SC9VGar0S4tiTCrG0PdS/HzKCc1sjoRY97RJbDqb62DnR5EYUPpY6jkkrnrcK2AdZFrCFj8YE5yUOJsXqFpU5gqZqd/m4LENheomahretChOS5Nk/9ygrU/oWfoqpzGIYC2z6vUPHiAxpW9YbqMhnkUjBcfmzhxGs6hfgGVkelq0tW7lAjo0lFXBSpKwD+OAexqVnLOuURobdNTr69wPRkzNPWGxx1nYlqH4dWLWnvammSn+aqkGq+WdJrlRi387SJeCgMPm96zIiONsiwYHw/82eCSbJrU1S+AM1mEqcPzp5tnXGXMaWztygmbyTzDQ9dTta1i+Vsi8BoAPkAYmPtrGotNQTYn1qL2s569n8fpGkWEk1sEUrxyWpDkIRBsQrFlIuRVOKtSM0WLXiEzvClxvRzAJ42bXIShF9OvjbKShSpEmZjBLF6rM73Y5HLQatLS7yxome6VJZm8jNZvZIaVqYDsTLKiZbhBTkEv4v0YyUrPWhCcWIDV1SfUGf2heLEYjW0TDDU+QofkTOmX1MW/FuB2O0ljP0vVixgNHCHxZQVp1nR706O7quTlE6wq7MSEqdYT1N0xlYNeVzrAME1umcHOx8/wfJ8poeOlO5NK3KPO3HAIzzAh2bl+h2uytNE7FMQ59BBivoOwKacYBavDCXRBafTKk1UB4ZF69s9/wDVEnAocbFVJJIAQEyNyWM3tMBatgVK1RjM1PI4dATm+WZBrdjm1bg0tF070UrqyxL0reFB8gXdmkH9/sis5bF8G61gDJuu0wVocAa/GibDo3VpSaakJ5FQNFeynvuYTecxjU8jEYlOAlWyqQ1b1vnch3Uj/UcgEo9cipl1Lagp1Ko7M8cnNCW65Op1I/NifCmZ/ZvK72aveOgrCoRm5rNX8gxqBGFxzHKwH87PTihUBxmwZt4NxNSKdoLVWCEs8SJkI2WdAaQ5GcJT1JxALFbRybELEdTRK1g7tNT9WgkLHFZ1G0OF+nI7T3JVfKtByYpQat4VYxLZvWtTEeEnBwjtC3LpqfYLc3ahRk4oWkfAMARHCzKUNS4FgQerdVnowMFVOWm9wDP6XMygKPbVTZYFa6lOTQoI5vUCWKaaXm1j2JOV6lyBKxWpDluJ7Xqp2o6yZSJkQISvpdLQo1sz2vSxe6FMzU4GAWGmVAzNnezaiunu9s5O1yqenb5W9SLmTUzlEiUEsQB45zu0/q8kMZz0CK+cDCFnb2K9G7o/xi3S+Cyzpec3X7Wu7LUVKrXTZd79LyPQJLE0UOs5mvonslpmx2/yycAYx21gUwRwKm2bUJTlOsY97aAL2Jco3GOJn3aFHs7QHFmNJJPwwHKbNiB4HuqbY28b0XT2BYP6bqQoUalsn/mtGhtbXUm7ZwlJFeNDKF7OcxznCX5wRJjUubpzKk31sfUdEzHsW9NeatIsGp1RkLZrPp99WJ1fEHOW8sJhsJgv1ZrOVx0fWNqWoYt/1Ob/AEj3TKjhSII5al6t2Y3iIhBRzql1eBmBQyr/AKNdtlY3ouFy1rTEsuae0C7dboUBeutXMkFi2+lia1hjgbhsZy0Ckc1rDScpC4bMpKj3mwGiDp9HelFbtMd+4XDPs2ZxuFuAOUGdVdj/ANQ6cxJQ9KlEWIbtTtBhBVpP1LVsgaR7MqdYU48dxmmDp8mWnRPBz1AhKmtW9R4GKJYISukC4sQ3WpMyFKQynaf6JWsjebwqqoofS9wT5iwH8wJAnGjnHTlAUmJoOsk7MtAJwOFYLs2pw8EjY6Vj3rxQRugIBLHNMNU1BHyV+lWNU2evsoQxPAOLc/Hizaiva8GjUbGG3NlOPJlrXLEubktodpsVQL0GoCPhTJqjSxJYTaqKKgnxR7lU4QB+en81UL46oDlYLSUYMleHCeElLte1yjgkShOgTm96nN+t7xtyxVWNc0D1uM1awAo9QALq3D0xY0H9vLzBUKOSAkx7rDpxmak/aXRzbMiZijVWhqaEMnNYYlk9CtUsMq3FakuBa2Mo1yuZ1hPY64Hq1erJmcwp8wMn1f54SL0LMLGt9HhYjEjwAocGXjxm0LzFgYg3DA5GASOp0MpnfNStmNXmLWgFMmaPNmWisN0G6/GO1VLKnOqBki0iU/aR0e8dQoBHgnkmlF3UaWMR40ZumvZg1bF4gD0iMmjtB1i/KU0zOTSVuUi1RVS3TuEw9Q5PuCsp3m73tClTG40Xsd5sebV49ZBi5FuW7POMUgCgmUgNS03v0FsHdeBJNm0jqUhyXuoN+Nc57gZ5Byti0ezET5OoLaX9WrvH+p0Wk+WgWnwsoF0+9v8AjWezxkGlegQJYb9D5o1pCcAV4lgPEyQtD0tLrGMo/spLP++TNwGE9jjGhJp3OgISViCw6q2OM6seYvJnv+1VINRT7cLOoW9B77WgCwStLQ8GCC8nUhqZVTojkGRkzg8VkgyJjSzev3c3ZiTqwJbdJzCNb5xnnStWKl5bQoVWVdVO0lQ+hokCluUQrYqlLReD8frjylCJGzJlGdpjvq+XEYtamJQE5yNXRU82tZjJXteWtS3Xg+cFLxTZzMWgwFoJBzbCCgWmTU64qs/Q/wCgVJ04/FZPQlOPzVOBTQoU1RPapwaEIfnnAUxDSpA+KxYBarS4ujJGY6moNdy8WveUunn4ZFj81yqprVvcfkgdEEknZAmFlFDm+3x3QNmKwHTa+Y1OIOqxrEOW9NJlKEkyJj7Ock00rBZkuhjf7rxpxinI/SOzaV0GU6Fr1KsYblsn9FeN0djTjHUoNRZyc1S0Ui5pm9qSY1HAhoMajpgfRTX9Pue41huOU9TYghXguHCwHAaXg9iuzHMoep6HExZ+/HKNXSmG7m6unGeD1unpgGdLsaxcYLmFCxXn8s569KrRpx0vAT9NUSg6tNKiz+aJ94rmWiZMKpBM6XqZr/LwqQ+RStBy3TAhCSXn+LBfIIXKsZ+iV81C9SWzuleDEswGhsqp8MQ5fbrFUTXqqrx0KUI8fWSZUDPedb/cnqM8plTx7+ciKORazOvhpOxNeVE1q1ROSeer45pKZ1T/ABakN1pWBS+nKfznzHKoUnPZHUFDNpmontTeL1mvt5jGvvy6SeSEBFSNnGbcK2k604gdpePS7+cYgpE6aWE2lxlpK3GiwOyh7TXOjUTJbEUn9pLGMcxrLt/QKyRv5TJcWBLv79E7G6xFCXzNmPGLrZadfsYm5EyEzxzZDs7Ccbg9jQ1TQ2fI0TRjIKUb1JGbzPfAW+4Gzm0dLORywSnApU2esDM2/wAcpoBiE/mdKxNGt/Qy9VydnWhPTZOIAQFx4s2UM2dQd+aOY1Vitw8dn90tSKVIxMU6VYZNMKUNWSd5vKAAm5p8PeyOmbG9pvOkHS7Nk+zWTqCfICn1tC/0XV186VkoTrhlkWljGUgx3EXjgI5E0YLxg1Lcs1VZg5OibYtWlUiGEszJOsSyNyHKyZMhp1wM0A5xx9JW+nWkS5WwsgZMEtEFEWQxJTtjSYtr2CTQTOpU6PTVOcw4Z4CVFKiJeT7jyoYxvENEwS5MvPNgxKSpiTH+hqTbjJ6Ej2MI9lxPVUfXLSh2E9szkb6fjZ+cUdS3S7L6da43aDs3+CvwnIDB7CcR6wpRmjGQENUDGu+radL/ADQznaGeMWCS8qHibGzFOCwN4jSI43HvafoTiGYx2o6RqSXjhpYxeSkDOeWCxBIDvEMIkAsBRo181gnAK2rarqgMGEwjoCtTcHeImaGqUlIAGUbgfEmcqW1NM1GpPZrRtweDPBZ/QrcFLk2S0NZViswGGzjUCn8tVMyeLiKMkKcyiuq9jUGmxNaqlWMpY+mllzahfNWFhV/QWgyQx1evpHcQvmdRzGCxj9f5A0edE2JanZh6yN39/qWLoyx1CaFt+s6sdhmCgYDl4WKmWpjypVZN/PaliTQQCWmdnetqFJ/mP2nLE0rUo10ZTnIFY6huVG9oNfq+XiJExPSaiRWGJMECst0D1+1bZM0WsLTn1YrWasF+EKCHsI2blAVBgBiTlNTXsNz3hoK1VTcbvb0jQsnIMHJRzUtxlTXssLavrUyfoFauvMB+NHFEnjp+kX+4zzktGn6AYjkjmlpEeGK8QHia9XRlQHntQxdCadJwMEemx5UZo+wS/s+x8GAI55lQu11NtTqnEtkmSKhJznuY43MoOordc5v1Sni2YTlvFren1TpNZrKMe1n9HEH2/wCWY3KczE8PS8lLJK55o8VUJA3tD+KXKiZaEmone8nCdVV/6H1gYjBiSGwr3VHQ61tf0+7Hm3AlYgnreAsQRTKkVKgWn6dTq9zNR2B6yXQFHPM+Bs2oVPg4cAwuUanzHMqN8CUpKHkKYqqc9bSz9Ov9SmoSS1Jyuyqc2rLKTcw365bTcgzdJqTJ7h9EyxmJIljx7SI2v+hXJEdEG9WVzvPxVNJJOndk717lCDU3FSbI5RrnnkCdvsp5yrFXbXTP2LxYmikXRPxretw9YpUrlDgC3oiBhcvASmbW+yjhJNHmWWanlulehJrMv0m1F/VnMKuRp9Kc+kgxdOcSJniajmQscnFhCTttz9NTJkIIJxOb+IKUPYTbGng9MNysxImidGs+lBo6ctL2+TRDCpy8t3WUQPje46Tr6oBAELaiqZ2lOqfdfoipyTP+tzBAF57ToKonmFUTfzGI9U0rVtyBelhGxnAgpZkPm2AZ/WO2uVRK6Y1ZqClFDE7lrBoH9D6BVKuMwKwX85PzfwwlxJJ5BAzg/wAM6A893eTx813mYzI2RqHqrmEVE8iTL38WD1gnFApU7FP7WCDhrBSZFIyTNEFODRqChVQrADiJKceq1zXhvePz/KM6RRidX38wmFnHzUrUSgE99ZKRMufQq7QtQSMFpqwFYe0E5HFkwlh9Sv1K1yikGIAlGRX/xAAgEAACAgIDAQEBAQAAAAAAAAAAAQIREiEDEBMxQSJR/9oACAEBAAM/AE4igLkEoicWUetocUbFAWNdb6zM+qfTe0bLKVmL2JMURS7VFMyHFCsjFCbKFJaP5o3Q7HMyMTKQ+MtUPqhKHSexSgUmWxNaHAzFEyHkYSFga+jkzdFxMUxzbRTFyI/UeSGyzQ1PpSYkKRl1ZiJopmA3M/rZmJQMEzN6MCyvhKTGOLMY9KchPrRFoSMzyL+iEhp0ZjaGkLkiVdEhyR5jkOxzMWeWhw/Sxr71aHOVjZ5oTibZiyyhuXeQoiG1oTWxR+GBVmQ5Mw2YClHrZZQpsxMjExLMGJTFJFwEWUxcg+McdDmOUhtijESiUew1toT+oT3Rh8RbFxo0x5MbZmYocGen0zZW2ijAtssouBsy+mBiZoQppHktFmCM7LkIqJrTJQHNDTJWSmUORRcen+9W7KiJQK+Dl1YsWN2ySkKIqFiU6HyyFRUPgkxRQnEw6abGV9KWiSVDk7LFGiMo0UnRmmUaMUX1ixOPVGZgXEUVYmmU+lRerGjMfTkNGhih16D40aHBicC46JSGjJHnEyVMyK/Ch8bE0NytG1YoURnASTodiqhMZ9G7SEyh9PjkNlI9CKi7MTQ2UOT6oyWxWU+lGJinTLvrzZcRvaGSHMb30xcaEJiyKLTLG2Pj0ORkulFdKmxSYimxqY7M6swpo/kwQ5dpGj1soVifWMhTY4LSJSHFbFAXJaL6dmAzJjExRFCPTkmV0+Qd0TY0x2UxSiKKFRaPKLKM3dka2KXw/ClsvZT2IjGJZmh0zEjixNstjsUBSVIxVDkYItGKPTrEzKZcD+RLRYmvgoGCaG7HkZGuv66wL6SQ4aQ+R9VFjizMUmRoTZk/goopiIoSTMrHIlxkojf09GKPWihvtSQuNNl2jJ66UIjcxIsotMcbRJ2YFjmWWYRI0ZTMGJiLTKTLZsSQhOVrp2UykPaRKbHFmA52i3TMCjJCkhQVFrZx8YktMw1Zm/op9XF6JZEhcS2KTMmVEoyZZgKqkKUXQ1Y4MV7IsiylodGSGkZtnk2WZji+tdV1b6UTNUKaN3Rh1RixTFMXGjF0PklouIodYyZcjItDRcSkYRoY1oc42YsyFNbFNCTejExYm6ZRkutmMDOzxMtWKUWU2YTG2OSQq6aGxRsu6G5jMkKKEloXJ0zEV9OzL6LtyQ7HEa6qXSx2RlFlJl2NyKLFxIxQq0eqHAslHSHMcdmInEXIRimLZTsyK2WtdNR0KEWWmf2ItMbmNyRUUKK2IUURabErMmz+yzzFWy3QoIUon4NdOZS6SRkxTKM2KETFaHNUOypFGaFKLHbIwQhMxiOKosTRptDy2a0YvYsSipGi0Jt2NS0ZPZVJGcShRjQo2XaGykNouVlNCikNqxpGhpMzsbmOTMIlLrAyWzMscUUU6YpxMBzEWNnmKaMhcaFIxei2JGQopmTEhRQuRFJ0bsXEhcioRboyMV1UjBVZcBybMpC4mKbQoioUkzTG22NGTKQky5Co0WOjTG2xuRihRjbI9USzJTozWyo/BRuhwY4IcxmUj4aLQ4FopCsRibKQprpyfWETIWJ531m6M3YoREzI8zf0VVYnExY5srbfVjj+imJWkNiiKhyZg+nOjQpQHkKQoiPLQ70xscxuSKoUULkiKCYtmIoseRjK2KdEaE0Jq0eMTNUWOBTN3Za+jM+7QkVaQ52NOh5i44marpcaMrpkrGntlochw30oR2xP9E/0chPZi9GRn1gVIcqNIyEYCPO6HMaY0ZmFMUaFgKEaPSz6YJjyM30uKhTaE0Lji6G20NPpUxWa+jj+jmzP6UhQW+khchkJbFA9EUYxLuhlxHF2NF6M4D4VZNOiZ6FD+GZSLKM2RYuNoUoocFoy+icRtMdslGRmyjzYpIwP5+ikjAztMzbGOAq301JFQM4jnJjRihtMc7JQslKRVDhTE4GmurKYnxikmYzMdFn8m2JMTMlSHAqYoxPaGhu3Q+NigWzMSKHZrZRSHrrJFCkKhUzNuhxZZQuMTiYfveczORaFAqQ5MwLZnEUS0NWNjjM9jGfwdkiUF1cxNmz+KZou2hpmj+WO2NyLVocIjnoakSLjsUo6RSbocJMcnsSQhMw+DkOY0V0uOAhP4zRmjZkaKQpIwFIfF+mb7TgXMeY4jKkN0eiKE066TkYisTiRijXVMzYlsXVMUzzVHozPY1IwRmi3dD+pDX4NFIqLM70PiZZijJj5GNO6KMvwoXH86ch8bEzL9EhPQqM4nknQ7HZkmPPrIqI2xJ9ZDjIpIXHEziZGUhVsSFZgxFrptnka6cmOaPKOhzZiJqhO6Q4suVGX4KS+GH4YFQ2Z2aeunGQ5jiipmXVnnFjTY2xyKVj4x2NjZcRMXImojdjixX0zFUNwGUxMVFnkj0G3RYuPbE+rVlLpY7FKRFGTodlSNCSPQ/Sn1hszZ/Vi0RUSNGTFEsyVsUU6GpMqQmJbFRYoxM4tDTY3yHnEc0P8JRfaS62KaLiz+hI3XTii0ODEn0kjNlFGhND45McmNopbEtmIkz9szQ7PR7FCI2yjMZjHZa12hQLl16aLR5xo9LQ4yY8jRSHFmTLXXoMVUxxZQkNGH0yLZkLE1026ZbFFGtFG2OzzL+ssTQhRRZ6yHxswQmZuiht2iRa6dlxLEUKUTGzJlsXEzDSHMlfX6xQFyi2J2KMyxxMRCoTQl0psVCaFtochwZQu7LY7KFiYxZQ5yHEZJPbH0iVD5foqs1Y0NjSscoi+Mi0YDkKzARc+qQ+UxRgZWVIaYmjZgZlCfWTKFIamPiNGY5GrPL4N6fSaFx2ejHY0McjAzEVEY8WfRqTGPbNjG4khpDG1sqLMrJL8P4HBFsZmYMwMl1sVGatHmKSFVowTMmJFlaHJ2PjYkvo7dDky2Y9LkEa0S45UxjcaMyUOsUejY4yJGLKEXsaE0JCmhKLFFsTuhbbP6dGTGNGuqHA9I10sfh52ZkoMsUIlyLKGmYDZYpLQuNCppGbLFRRsSVGhxsuQ/paotErHL6LEotj4zJCQpRMLQ+QwZchjRUiqFOAoFSFIUFRGSYpWymxVQsutFiiJmJmKIhNCcSpvrYxj42eg0rMtMUDDr16zFCOzdCg9sUlrpRTFbKZGYoGbHyMQiIo9L4RURWexgWy2YjZUjEUCxpkrHQ7MzTZKMmPkZTMSxQEKhfCnocmaFyQIqz+mKDFJWRFISYpwPMx6cX9L/TNdZH6NTGhOBpn0cXokpEuVIZgUZqzDq0YbRmqvpCmjYoIyKRTYrHIaHMcH1bKMkOzBmy5FIVGDGv0S+Myf0ViYlEiiM2RNV1YkIjJNdUymUxyqzKIonpGirMTGJnBjHMkndDikYikJmERUzbKLJWNCE4WIzYjNbPrQ4T6XIxQYnHYo3Q5MRfWzEow62VH6Sv6a2y/0xX0fyz03YkObE/onG0YiRS+9OZimOTHlZVGET2ZiZxGXEaPQx/BNfBwXwpiVCjEUYnomYWLZ/WmKtlPRUjVHqYox6TVIuRgxCZFxMrocZmRihS+iMTJGKGyxolkSsaZJRHf0sUmUKhJCdtPqiymxyLFBlsckPiYpCaI1oocn1cfgvpGIrKHFGvooXszvZjexuY7M4jmSGvoq0ODMdCbEx2ecvvS/WR5jHaPM9NMs/lm2OyxpFRM2WUKBkqGmNmxRiJfpkxItdb2LkiUOAmxJCihTMNlaPRmZiRRGSFxHp0mKCPqMbpjTqyXMNDTszEKWxQMVo20WeTL+MbGUy2UzKI57HBlwKiy7FE1ocxjyEkMkNMvbHejHZSLl1mO+rHEqOi7RjIXTLQ5StigRiKURMjFCTdMV7YsCmZX03aJSdjWmZIp9K0JRFiVFjtswTHJjgzOJii5DchwZkUxNFI+oUG0LkLKMUxtkhtjn+DhG6MUOIy2bHdM0KhzFAUiypGMhxnQ5sdDZjEwHKQlAoV/RcgolqjehjndGfSh0ntmPwqil1k9lnomU2bHxHqYyKLMWZCiVHRaY5zbHGQsRTgJknLSHjtD+0KMfgpRehWyihodly6zPM9ImrEl0+WRLKxwkrE0KBSoU2US40KX6P7Y19Zv6ZFrtRFMyRiJm6LKgUh5lRFRm2LjZmUxDGmKQ4H8FWh2ZLYrKXWbE/wAKXwTXwUEJxZVj6ZiNDUho9OkuPrNmDEJ7MOsmJsUYjaZLjkxj5GOxxY5dNMbfX8jkh8Y5SRpEVAyscJDGhR+mb0YIVl9VItdKhvY8hMUNrqzfVxFFCEyyr0KN9X1+ljgKSE40WUxREJREeh5sSNEZJmadEm2PiMWZocENuimKY7s0YxPVnk0JxEoUJJmcn0zEtmZirMesxxR/IrItUKIoCkhFEZsotGJ6ocGeuhKDFsUbG3orZZWizBilE0K6PQwHEbHBmYojG2OYoocmbplI/gcGzJly31ocjA2YxLMm+qYoKj0Q4fTAszGzBixFQ70aNdslNnmz0MUZjHJi4dsTg0jJMSsQmhQExVRR+WJoQzMdswdFspFDkxvpMfWERuNHoOMj+hJGQlHrF30pjZSLE3rpRiy5vqxJFlIbQykSpjjfTkii5GBkJdKJ+Iv6yxbMZdWx8Y7M/o4/Ga2xNDsUkKmbY4Sosch5GRjA0V06LNlM2XRo0YrvFmaFCAuqiPFjyGYjk+liYjXwbJNDaGpH8DsdjTMSIkKvpvT6SRlY5scS0MaY4FiFXSiZGSY8hykOL+GQoIa0hyMiynRQrN2JTIqqFEUkJWWJdKJlEcjGx20KdowGYyN6LVGixqRkJKi9UU/hg6NmSFxCRi+n/pkrKZmWJoqJSFgOQ4lS7VX1Y5D5dtGC+GR5SLVFIsQv0VmxFlfCxi40Obovq2Md0WqND2NSPQ80MxmWxTiJGTNCL2It2jEjxRFK6Ghz0YmhjZjs0RkiMlZGBfbjyFlKunIbkW0JQFFUJifT+DTMBF/OvNikZnkxJUZL6f105jZSorYkzMtDkYRG0xxbHKQ6POBbJSZ/JZot9YIux32zP6WKJiPkHBGEWn0mKKs9EZSPPploto0ioH6zYpISYpnlZbHfTitEiRQ5DTGNsbLQqERcSMDYuRC6cmNnmzBUehUxtjaMShCURuLokrGm7P0cWOY2YoyLMBUOVspsSG0KKF9HOZJjiWymiqKgPaLZhEXIJIU0xxk31oTRdjjIbHAdjvqkao8xMUF9FNfTN0VEzWxSRinoUYu0RlZi6FE9GJJGukkbvqLQnFnkmSU2hyY+RI80OQy31HE80y2y5UKcaMUzYpClAtfBwfwZ5RLKtmExP9NliYpjZgjbFI2JIdfOrYuMpmBbHHbY5rTHF7kOxzSMihSiKmeNi2x50JJCrrOPdI0UeljU3RLPYoRQ5Ik/wsR5FasXPxsak+vJDmqQ7GqLihOJb+CghKIzKLQlZvqn0qtkYRMy2bEi2Wvgofgom9FdVsldDWrJSkYui0jSrpKAowZdlWPO30xsZRQ2x5HozKzZb+dZ0mJQMRcbM2PIwVMXKKBZbG38MRpKjJKxLYlHQh7LbHkascDKehpnpAodjYkKYorRFw2IY4lDY5DGh2VNGNFQREUhYsTTG5MbHGQ8iVoeJrYorp2KCNHqxRKlourE41202MbZiZPtCsswEodLkHFEmxlIsdjbpigixdYCcqM4nmhTEk6PVsaGmaE4slFvQ3Kmb2VSP5JcRX1nsXYptmLMpUU7o18MVR5s0ZMWNljkhw2ZjezCi0KhOzGRaMbocxmemRgKJk9CihxHISELkgJJuirNliPN2V8HNDFBWzJ6Gp2YC5EYC5Il7L6cdUOroXInaHxT0OEvhVChAQ0zQ7LLYrsiRUSyySMCy/g7HMxiYLpQQpITE5CqkZjjI0YMUvpbEJLZmx8Zk9iiZCaLsSsR5i5UWYCS2Y2kb7TVjs2RcDJWZfgmKCqjC6PX8FP8FxGKM2xoaZmYTFyC40JyKQ0jIQkzY5MtWxJGvhixxdGilVlikUtikJS6Seh2WypCYsRUUmSTL+ilEikz7RgZqhL6RxKTHEfJI3Y4s0ioFjUulRFoUbFbHysw+oXGLbNl9uD2ep5oyGmORURIW6MXtim6Qk9kYqkIi0KzG2ilbZezH969OlRRlLrMUBswiWy2Z7HxnlEyFIyFDrQ3EaseRopGIz1MTB9ZClBls2LkVGaNCkJMo9GNDgNlGbooUEKN9ehjIUYjkNM0ZGuvqLGOKFXWehIqXSoSQoqj1MVbGiolxY4stiiKczHaGxyR6bY+N6XWMDY0bMipiFCInD6RLkJIo2KS0VI9RcSPUfGNmRhI/kzZdjHExZZRkP8AClsTT6ymx3oaRjsa6xkesjVmAx0PlHBmcRRgPEpOjbENjyMlQ2MUIkeRUYM/kdjQ0yoFspjxJR/RtjkyoH82iQzJlMtGCFyGBcxDKQ5FoUbHJjiMZRaHCz0KkeisUI7FD4OQ6LFB7NHpEYxJbNiiKcCrQqdiyZhMzLZtGSRHjgZ2YsWJaEJkYMxLQ31kbFAuJSpmb6oWIlAscRtmLHJWxIyKXVswN9YjkZRJSHAc3ocYlR2ek2ODGhNmLHMcUi49JISQ4jr6WKCbFyN7HkPIbaMqI8UBOIo2IsUWRS6U+mnRmhmBTLZURxHkOLM42YIfw2JwNM3ZUe6ifWXZRsaYn1YlFltoaY4ouBi2NsbMWegojY2OCHHRobka+ihB7Mm0mb+i5Yiiy0hca6pbPQUFtiV0y099JmJ6M/owYpRE4lMlGY5ocxxEeaGzI2MpFCkil06LTFG6LbQ1IkmOTLSaMYinAz3Q1+ChGhSNsdlr50+Pq6FjZkYWxxTMLME9jnexzk6JNjijMwG9WOTHKJhEtMdsobHWxn6xCmYR69OpRKXwpWKO2JmZ5oVWVZbFM8xzKNGKdiTdGTYpFzEUYsUxKIqHKxwsbmZs81dFrpswVicaEhTLiyrMGxq0mPklbEf4S4mWu9GSGk6HZZaHA31UjEuJbFYmZfhGhSNaHEpi5I9NN0OxcbFys0VEUUy7G2zEuQmUtH8lvZgz1KIi5DF/DEWJbFZia0VHr8YkZWN2Oc2ecu00eUz0MUJCxNMbfSaNOkNMZbGhcejYnsVCihjixzfWjzRYuRnmy5Ci0KUEa11kmVY5uhwkYFjZfWMRVTFIiJ7PMXKKBZQqFxxNmI+QzR6XowbdGExyYzBGUusIEpjghzMh2NIckVO6EkUJIxkXITSE0fyNIsxRcRxHscOvQykUSikZoqx2zMUdifTzMTISVdrEoyGxwZ6MwY5GBIsbLNCiKSaKKlRihyVDMBzMEWNsUImchRIiVn9mSMYscmyWZoaHKJaEJCxGkxysxuiTkOBnopWYFC5UUmUKSN6NbFHrFDyP6FZiNjstCZiOUhQMjIUWeguM1fVlpmMhlDn1h1YmrLEpmtdWmU+skZiiYGbRgj//xAAUEQEAAAAAAAAAAAAAAAAAAADA/9oACAECAQE/AAAH/8QAFBEBAAAAAAAAAAAAAAAAAAAAwP/aAAgBAwEBPwAAB//Z",ni=.5*(Math.sqrt(3)-1),K=(3-Math.sqrt(3))/6,It=e=>Math.floor(e)|0,Rt=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]);function ai(e=Math.random){let t=oi(e),i=new Float64Array(t).map(r=>Rt[r%12*2]),s=new Float64Array(t).map(r=>Rt[r%12*2+1]);return function(n,a){let o=0,l=0,h=0,c=(n+a)*ni,d=It(n+c),u=It(a+c),f=(d+u)*K,g=d-f,p=u-f,m=n-g,x=a-p,v,A;m>x?(v=1,A=0):(v=0,A=1);let w=m-v+K,M=x-A+K,y=m-1+2*K,S=x-1+2*K,I=d&255,F=u&255,b=.5-m*m-x*x;if(b>=0){let C=I+t[F],E=i[C],G=s[C];b*=b,o=b*b*(E*m+G*x)}let U=.5-w*w-M*M;if(U>=0){let C=I+v+t[F+A],E=i[C],G=s[C];U*=U,l=U*U*(E*w+G*M)}let T=.5-y*y-S*S;if(T>=0){let C=I+1+t[F+1],E=i[C],G=s[C];T*=T,h=T*T*(E*y+G*S)}return 70*(o+l+h)}}function oi(e){let i=new Uint8Array(512);for(let s=0;s<512/2;s++)i[s]=s;for(let s=0;s<512/2-1;s++){let r=s+~~(e()*(256-s)),n=i[s];i[s]=i[r],i[r]=n}for(let s=256;s<512;s++)i[s]=i[s-256];return i}function kt(e){return e*(.5-Math.random())}function V(e,t){return e+Math.random()*(t-e)}var Gt=ai(Math.random);function L(e){return Math.max(0,Math.min(1,e))}function li(e,t,i){i=i||0;let s=t,r=2,n=2,a=r/s,o=a*Math.sqrt(3)/2,l=n/o,h=[],c=[],d=[],u=[],f=[],g=[],p=[],m=0,x=[],v=0,A=2;for(let M=0;M<l;M+=1){v=M*o,M%2===1?m=-a/2:m=0;for(let y=0;y<=s;y+=1){let S=Math.sign(y*a+m-r/2);c.push(y*a+m-r/2,v-n/2,0),p.push((y*a+m)/r,v/n),c.push(y*a+a/2+m-r/2,o+v-n/2,0),p.push((y*a+a/2+m)/r,(o+v)/n),c.push(y*a-a/2+m-r/2,o+v-n/2,0),p.push((y*a-a/2+m)/r,(o+v)/n);let I=Gt(y/l,M/l)+Math.random(),F=L(v/n+2*I/t),b=Math.random();h.push(F,L(F+.1*i),L(F+.1*i)),g.push(b,b,b);let U=[y*a+m-r/2,v-n/2,0];d.push(...U,...U,...U);let T=[A*S*V(-.3,.3),-A*V(-.3,.3)*1.5,-kt(.5)],C=[A*S*V(.3,.6),-A*V(.3,.6)*1.5,-kt(.5)];u.push(...T,...T,...T),f.push(...C,...C,...C),x.push(0,0,1,0,1,0,1,0,0),c.push(y*a+m-r/2,v-n/2,0),p.push((y*a+m)/r,v/n),c.push(y*a+a+m-r/2,v-n/2,0),p.push((y*a+a+m)/r,v/n),c.push(y*a+a/2+m-r/2,o+v-n/2,0),p.push((y*a+a/2+m)/r,(o+v)/n),I=Gt((y+1)/l,M/l)+Math.random();let E=L(v/n+2*I/t);b=Math.random(),h.push(E,E,L(E+.1*i)),g.push(b,b,b);let G=[y*a+m-r/2,v-n/2,0];u.push(...T,...T,...T),f.push(...C,...C,...C),d.push(...G,...G,...G),x.push(0,0,1,0,1,0,1,0,0)}}let w=new Z(e);return w.addAttribute("position",{size:3,data:new Float32Array(c)}),w.addAttribute("bary",{size:3,data:new Float32Array(x)}),w.addAttribute("uv",{size:2,data:new Float32Array(p)}),w.addAttribute("offset",{size:1,data:new Float32Array(h)}),w.addAttribute("centroid1",{size:3,data:new Float32Array(d)}),w.addAttribute("control0",{size:3,data:new Float32Array(u)}),w.addAttribute("control1",{size:3,data:new Float32Array(f)}),w.addAttribute("random",{size:1,data:new Float32Array(g)}),w}var P="float PI = 3.141592653589793238;",k=`
precision highp float;

uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec4 resolution;
varying vec2 vUv;
`,dt=`
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute float offset;
attribute vec3 bary;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float progress;
uniform vec4 resolution;

varying vec2 vUv;
varying float vProgress;
varying float vProgress1;
varying vec3 vBary;
`,ut=`
mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
              oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
              oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
              0.0,                                0.0,                                0.0,                                1.0);
}
vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}
`,ci={uniforms:{intensity:{value:1,type:"f",min:0,max:3}},fragment:`
  ${k}
  uniform float intensity;
  uniform sampler2D displacement;
  mat2 getRotM(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }
  const float PI = 3.1415;
  const float angle1 = PI *0.25;
  const float angle2 = -PI *0.75;
  void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 disp = texture2D(displacement, newUV);
    vec2 dispVec = vec2(disp.r, disp.g);
    vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * intensity * progress;
    vec4 t1 = texture2D(texture1, distortedPosition1);
    vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * intensity * (1.0 - progress);
    vec4 t2 = texture2D(texture2, distortedPosition2);
    gl_FragColor = mix(t1, t2, progress);
  }
`},hi={uniforms:{intensity:{value:.3,type:"f",min:0,max:2}},fragment:`
  ${k}
  uniform float intensity;
  uniform sampler2D displacement;
  void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 d1 = texture2D(texture1, newUV);
    vec4 d2 = texture2D(texture2, newUV);
    float displace1 = (d1.r + d1.g + d1.b)*0.33;
    float displace2 = (d2.r + d2.g + d2.b)*0.33;

    vec4 t1 = texture2D(texture1, vec2(newUV.x, newUV.y + progress * (displace2 * intensity)));
    vec4 t2 = texture2D(texture2, vec2(newUV.x, newUV.y + (1.0 - progress) * (displace1 * intensity)));
    gl_FragColor = mix(t1, t2, progress);
  }
`},di={uniforms:{},fragment:`
    ${k}
    const float MIN_AMOUNT = -0.16;
    const float MAX_AMOUNT = 1.5;

    const float PI = 3.141592653589793;

    const float scale = 512.0;
    const float sharpness = 3.0;

    const float cylinderRadius = 1.0 / PI / 2.0;

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    vec3 hitPoint(float hitAngle, float yc, vec3 point, mat3 rrotation) {
      float hitPoint = hitAngle / (2.0 * PI);
      point.y = hitPoint;
      return rrotation * point;
    }

    vec4 antiAlias(vec4 color1, vec4 color2, float distanc) {
      distanc *= scale;
      if(distanc < 0.0)
        return color2;
      if(distanc > 2.0)
        return color1;
      float dd = pow(1.0 - distanc / 2.0, sharpness);
      return ((color2 - color1) * dd) + color1;
    }

    float distanceToEdge(vec3 point) {
      float dx = abs(point.x > 0.5 ? 1.0 - point.x : point.x);
      float dy = abs(point.y > 0.5 ? 1.0 - point.y : point.y);
      if(point.x < 0.0)
        dx = -point.x;
      if(point.x > 1.0)
        dx = point.x - 1.0;
      if(point.y < 0.0)
        dy = -point.y;
      if(point.y > 1.0)
        dy = point.y - 1.0;
      if((point.x < 0.0 || point.x > 1.0) && (point.y < 0.0 || point.y > 1.0))
        return sqrt(dx * dx + dy * dy);
      return min(dx, dy);
    }

    vec4 seeThrough(float yc, vec2 p, mat3 rotation, mat3 rrotation, float cylinderAngle) {
      float hitAngle = PI - (acos(yc / cylinderRadius) - cylinderAngle);
      vec3 point = hitPoint(hitAngle, yc, rotation * vec3(p, 1.0), rrotation);
      if(yc <= 0.0 && (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0)) {
        return getToColor(p);
      }

      if(yc > 0.0)
        return getFromColor(p);

      vec4 color = getFromColor(point.xy);
      vec4 tcolor = vec4(0.0);

      return antiAlias(color, tcolor, distanceToEdge(point));
    }

    vec4 seeThroughWithShadow(float yc, vec2 p, vec3 point, mat3 rotation, mat3 rrotation, float cylinderAngle, float amount) {
      float shadow = distanceToEdge(point) * 30.0;
      shadow = (1.0 - shadow) / 3.0;

      if(shadow < 0.0)
        shadow = 0.0;
      else
        shadow *= amount;

      vec4 shadowColor = seeThrough(yc, p, rotation, rrotation, cylinderAngle);
      shadowColor.r -= shadow;
      shadowColor.g -= shadow;
      shadowColor.b -= shadow;

      return shadowColor;
    }

    vec4 backside(float yc, vec3 point) {
      vec4 color = getFromColor(point.xy);
      float gray = (color.r + color.b + color.g) / 15.0;
      gray += (8.0 / 10.0) * (pow(1.0 - abs(yc / cylinderRadius), 2.0 / 10.0) / 2.0 + (5.0 / 10.0));
      color.rgb = vec3(gray);
      return color;
    }

    vec4 behindSurface(vec2 p, float yc, vec3 point, mat3 rrotation, float cylinderAngle, float amount) {
      float shado = (1.0 - ((-cylinderRadius - yc) / amount * 7.0)) / 6.0;
      shado *= 1.0 - abs(point.x - 0.5);

      yc = (-cylinderRadius - cylinderRadius - yc);

      float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;
      point = hitPoint(hitAngle, yc, point, rrotation);

      if(yc < 0.0 && point.x >= 0.0 && point.y >= 0.0 && point.x <= 1.0 && point.y <= 1.0 && (hitAngle < PI || amount > 0.5)) {
        shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / (71.0 / 100.0));
        shado *= pow(-yc / cylinderRadius, 3.0);
        shado *= 0.5;
      } else {
        shado = 0.0;
      }
      return vec4(getToColor(p).rgb - shado, 1.0);
    }

    void main() {
      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);

      float amount = progress * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;
      float cylinderCenter = amount;
          // 360 degrees * amount
      float cylinderAngle = 2.0 * PI * amount;

      const float angle = 100.0 * PI / 180.0;
      float c = cos(-angle);
      float s = sin(-angle);

      mat3 rotation = mat3(c, s, 0, -s, c, 0, -0.801, 0.8900, 1);
      c = cos(angle);
      s = sin(angle);

      mat3 rrotation = mat3(c, s, 0, -s, c, 0, 0.98500, 0.985, 1);

      vec3 point = rotation * vec3(newUV, 1.0);

      float yc = point.y - cylinderCenter;

      if(yc < -cylinderRadius) {
                        // Behind surface
        gl_FragColor = behindSurface(newUV, yc, point, rrotation, cylinderAngle, amount);
        return;
      }

      if(yc > cylinderRadius) {
                        // Flat surface
        gl_FragColor = getFromColor(newUV);
        return;
      }

      float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;

      float hitAngleMod = mod(hitAngle, 2.0 * PI);
      if((hitAngleMod > PI && amount < 0.5) || (hitAngleMod > PI / 2.0 && amount < 0.0)) {
        gl_FragColor = seeThrough(yc, newUV, rotation, rrotation, cylinderAngle);
        return;
      }

      point = hitPoint(hitAngle, yc, point, rrotation);

      if(point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0) {
        gl_FragColor = seeThroughWithShadow(yc, newUV, point, rotation, rrotation, cylinderAngle, amount);
        return;
      }

      vec4 color = backside(yc, point);

      vec4 otherColor;
      if(yc < 0.0) {
        float shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / 0.71);
        shado *= pow(-yc / cylinderRadius, 3.0);
        shado *= 0.5;
        otherColor = vec4(0.0, 0.0, 0.0, shado);
      } else {
        otherColor = getFromColor(newUV);
      }

      color = antiAlias(color, otherColor, cylinderRadius - abs(yc));

      vec4 cl = seeThroughWithShadow(yc, newUV, point, rotation, rrotation, cylinderAngle, amount);
      float dist = distanceToEdge(point);

      gl_FragColor = antiAlias(color, cl, dist);
    }
  `},ui={uniforms:{},fragment:`
    ${k}
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      vec2 p = newUV;
      float x = progress;
      x = smoothstep(.0,1.0,(x*2.0+p.x-1.0));
      vec4 f = mix(
        texture2D(texture1, (p-.5)*(1.-x)+.5),
        texture2D(texture2, (p-.5)*x+.5),
        x);
      gl_FragColor = f;
    }
  `},fi={uniforms:{},fragment:`
    ${k}
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      vec2 p = newUV;
      float x = progress;
      x = smoothstep(.0,1.0,(x*2.0+p.y-1.0));
      vec4 f = mix(
        texture2D(texture1, (p-.5)*(1.-x)+.5),
        texture2D(texture2, (p-.5)*x+.5),
        x);
      gl_FragColor = f;
    }
  `},gi={uniforms:{},fragment:`
    ${k}
    ivec2 squaresMin = ivec2(50);
    int steps = 20;

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float d = min(progress, 1.0 - progress);
      float dist = steps>0 ? ceil(d * float(steps)) / float(steps) : d;
      vec2 squareSize = 2.0 * dist / vec2(squaresMin);

      vec2 p = dist>0.0 ? (floor(newUV / squareSize) + 0.5) * squareSize : newUV;

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,p);
      vec4 t2 = texture2D(texture2,p);

      gl_FragColor = mix(t1, t2, progress);
    }
  `},mi={uniforms:{},detail:12,offsetTop:0,vertex:`
    ${dt}
    attribute vec3 centroid1;

    ${ut}

    void main() {
      ${P}
      vUv = uv;
      vBary = bary;

      vec3 newpos = position;

      float o = 1. - offset;
      float pr = (progress - 0.5) * (0. + resolution.y / resolution.x) + 0.5;
      pr = progress;
      float prog = clamp((pr - o * 0.9) / 0.1, 0., 1.);
      vProgress = prog;
      vProgress1 = clamp((pr - clamp(o - 0.1, 0., 1.) * 0.9) / 0.1, 0., 1.);
      newpos = rotate((newpos - centroid1), vec3(1., 0., 0.), -prog * PI) + centroid1 + vec3(0., -1., 0.) * prog * 0.;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
  `,fragment:`
    ${k}
    varying float vProgress;
    varying float vProgress1;
    ${P}
    varying vec3 vBary;

    void main()	{
      float width = 2.5 * vProgress1;
      vec3 d;
      #ifdef GL_OES_standard_derivatives
        d = fwidth(vBary);
      #endif
      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
      float alpha = max(max(s.x, s.y), s.z);
      vec3 color = vec3(alpha);
      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 t = texture2D(texture1, newUV);
      float opa = smoothstep(1., 0.5, vProgress);
      opa = 1. - vProgress;
      gl_FragColor = vec4(vUv, 0.0, opa);
      gl_FragColor = vec4(t.rgb + .5 * color * vProgress1, opa);
    }
  `},pi={uniforms:{},detail:20,offsetTop:.4,vertex:`
    ${dt}
    ${ut}

    void main() {
      ${P}
      vUv = uv;
      vBary = bary;

      vec3 newpos = position;

      float o = 1. - offset;
      float prog = clamp((progress - o * 0.6) / 0.4, 0., 1.);
      vProgress = prog;
      vProgress1 = clamp((progress - clamp(o - 0.1, -0., 1.) * 0.9) / 0.1, 0., 1.);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
  `,fragment:`
    ${k}
    varying float vProgress;
    varying float vProgress1;
    ${P}
    varying vec3 vBary;
    void main()	{
      float width = 2.5 * vProgress1;
      vec3 d;
      #ifdef GL_OES_standard_derivatives
        d = fwidth(vBary);
      #endif
      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
      float alpha = max(max(s.x, s.y), s.z);
      vec3 color = vec3(alpha);

      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 t = texture2D(texture1, newUV);
      float opa = smoothstep(1., 0.5, vProgress);
      opa = 1. - vProgress;
      gl_FragColor = vec4(t.rgb + 1. * color * vProgress1, opa);
    }
  `},xi={uniforms:{},detail:40,offsetTop:1,vertex:`
    ${dt}
    attribute vec3 control0;
    attribute vec3 control1;

    ${ut}

    float easeOut(float t){
      return  t * t * t;
    }

    vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
      return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
    }

    void main() {
      ${P}
      vUv = uv;
      vBary = bary;

      vec3 newpos = position;

      float o = 1. - offset;
      float prog = clamp((progress - o * 0.6) / 0.4, 0., 1.);
      vProgress = prog;
      vProgress1 = clamp((progress - clamp(o - 0.2, -0., 1.) * 0.6) / 0.4, 0., 1.);
      newpos = bezier4(newpos, control0, control1, newpos, easeOut(prog));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
  `,fragment:`
    ${k}
    varying float vProgress;
    varying float vProgress1;
    ${P}
    varying vec3 vBary;
    void main()	{
      float width = 2.5 * vProgress1;
      vec3 d;
      #ifdef GL_OES_standard_derivatives
        d = fwidth(vBary);
      #endif
      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
      float alpha = max(max(s.x, s.y), s.z);
      vec3 color = vec3(alpha);

      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 t = texture2D(texture1, newUV);
      float opa = smoothstep(1., 0.5, vProgress);
      opa = 1. - vProgress;
      gl_FragColor = vec4(vUv, 0.0, opa);
      opa = smoothstep(0.5, 1., opa);
      gl_FragColor = vec4(t.rgb + 1. * color * vProgress1, opa);
    }
  `},yi={uniforms:{radius:{value:.9,type:"f",min:.1,max:2},width:{value:.35,type:"f",min:0,max:1}},fragment:`
    ${k}
    uniform float width;
    uniform float radius;
    uniform sampler2D displacement;
    float parabola( float x, float k ) {
      return pow( 4. * x * ( 1. - x ), k );
    }
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      vec2 p = newUV;
      vec2 start = vec2(0.5,0.5);
      vec2 aspect = resolution.wz;
      vec2 uv = newUV;
      float dt = parabola(progress, 1.);
      vec4 noise = texture2D(displacement, fract(vUv+time*0.04));
      float prog = progress*0.66 + noise.g * 0.04;
      float circ = 1. - smoothstep(-width, 0.0, radius * distance(start*aspect, uv*aspect) - prog*(1.+width));
      float intpl = pow(abs(circ), 1.);
      vec4 t1 = texture2D( texture1, (uv - 0.5) * (1.0 - intpl) + 0.5 ) ;
      vec4 t2 = texture2D( texture2, (uv - 0.5) * intpl + 0.5 );
      gl_FragColor = mix( t1, t2, intpl );
    }
  `},wi={uniforms:{intensity:{value:50,type:"f",min:1,max:100}},fragment:`
    ${k}
    uniform float intensity;
    mat2 rotate(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }
    const float PI = 3.1415;
    const float angle1 = PI *0.25;
    const float angle2 = PI *0.25;

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      vec2 uvDivided = fract(newUV*vec2(intensity,1.));

      vec2 uvDisplaced1 = newUV + rotate(angle1)*uvDivided*progress*0.1;
      vec2 uvDisplaced2 = newUV + rotate(angle2)*uvDivided*(1. - progress)*0.1;

      vec4 t1 = texture2D(texture1,uvDisplaced1);
      vec4 t2 = texture2D(texture2,uvDisplaced2);

      gl_FragColor = mix(t1, t2, progress);
    }

  `},vi={uniforms:{size:{value:.25,type:"f",min:.1,max:1}},fragment:`
    ${k}
    uniform float size; // = 0.2
    float count = 20.; // = 10.0
    float smoothness = .5; // = 0.5
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float pr = smoothstep(-smoothness, 0.0, newUV.x - progress * (1.0 + smoothness));
      float s = step(pr, fract(count * newUV.x));

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,uv1);
      vec4 t2 = texture2D(texture2,uv2);
      gl_FragColor = mix(t1, t2, s);

    }
  `},Ai={uniforms:{},fragment:`
    ${k}
    ivec2 squares = ivec2(10,10);
    vec2 direction = vec2(1.0, -0.5);
    float smoothness = 1.6;

    const vec2 center = vec2(0.5, 0.5);
    void main() {
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      vec2 v = normalize(direction);
      v /= abs(v.x)+abs(v.y);
      float d = v.x * center.x + v.y * center.y;
      float offset = smoothness;
      float pr = smoothstep(-offset, 0.0, v.x * newUV.x + v.y * newUV.y - (d-0.5+progress*(1.+offset)));
      vec2 squarep = fract(newUV*vec2(squares));
      vec2 squaremin = vec2(pr/2.0);
      vec2 squaremax = vec2(1.0 - pr/2.0);
      float a = (1.0 - step(progress, 0.0)) * step(squaremin.x, squarep.x) * step(squaremin.y, squarep.y) * step(squarep.x, squaremax.x) * step(squarep.y, squaremax.y);

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,newUV);
      vec4 t2 = texture2D(texture2,newUV);

      gl_FragColor = mix(t1, t2, a);
    }
  `},Mi={uniforms:{intensity:{value:50,type:"f",min:1,max:100}},fragment:`
    ${k}
    uniform float intensity;
    mat2 rotate(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }
    const float PI = 3.1415;
    const float angle1 = PI *0.25;
    const float angle2 = -PI *0.75;
    const float noiseSeed = 2.;
    float random() {
      return fract(sin(noiseSeed + dot(gl_FragCoord.xy / resolution.xy / 10.0, vec2(12.9898, 4.1414))) * 43758.5453);
    }
    float hash(float n) { return fract(sin(n) * 1e4); }
    float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
    float hnoise(vec2 x) {
      vec2 i = floor(x);
      vec2 f = fract(x);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float hn = hnoise(newUV.xy * resolution.xy / 100.0);
      vec2 d = vec2(0.,normalize(vec2(0.5,0.5) - newUV.xy).y);
      vec2 uv1 = newUV + d * progress / 5.0 * (1.0 + hn / 2.0);
      vec2 uv2 = newUV - d * (1.0 - progress) / 5.0 * (1.0 + hn / 2.0);
      vec4 t1 = texture2D(texture1,uv1);
      vec4 t2 = texture2D(texture2,uv2);
      gl_FragColor = mix(t1, t2, progress);
    }
  `},Ei={uniforms:{},fragment:`
  ${k}
  uniform sampler2D displacement;
  vec2 mirrored(vec2 v) {
    vec2 m = mod(v,2.);
    return mix(m,2.0 - m, step(1.0 ,m));
  }
  void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 noise = texture2D(displacement, mirrored(newUV+time*0.04));
    float prog = (1.0 - progress)*0.8 -0.05 + noise.g * 0.06;
    float intpl = pow(abs(smoothstep(0., 1., (prog*2. - vUv.x + 0.5))), 10.);

    vec4 t1 = texture2D( texture2, (newUV - 0.5) * (1.0 - intpl) + 0.5 ) ;
    vec4 t2 = texture2D( texture1, (newUV - 0.5) * intpl + 0.5 );
    gl_FragColor = mix( t1, t2, intpl );
  }
  `},bi={uniforms:{},fragment:`
    ${k}
    float size = 0.2;

    float rand (vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float r = rand(vec2(0, newUV.y));
      float m = smoothstep(0.0, -size, newUV.x*(1.0-size) + size*r - ((progress) * (1.0 + size)));

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,uv1);
      vec4 t2 = texture2D(texture2,uv2);
      gl_FragColor = mix(t1, t2, m);

    }
  `},Ci={uniforms:{},fragment:`
    ${k}
    const float SQRT_2 = 1.414213562373;
    const vec2 center = vec2(0, 0);// = vec2(0, 0);
    const float dots = 20.0;// = 20.0;

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      bool nextImage = distance(fract(newUV * dots), vec2(0.5, 0.5)) < ( progress / distance(newUV, center));
      gl_FragColor = nextImage ? getToColor(newUV) : getFromColor(newUV);
    }

  `},Ti={uniforms:{},fragment:`
    ${k}
    const float SQRT_2 = 1.414213562373;
    // Center should be 0.5, 0.5 for UV space
    const vec2 center = vec2(0.5, 0.5);
    const float dots = 20.0;// = 20.0;

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    void main()	{
      float aspect = resolution.x / resolution.y;
      // Screen-corrected UVs for dot pattern calculation (makes dots appear square on screen)
      vec2 screenUV = (vUv - center) * vec2(aspect, 1.0) + center;

      // Aspect-corrected UVs for texture sampling (using resolution uniform)
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      // Calculate overall distance threshold using original vUv for a circular boundary
      float dist = distance(vUv, center); // center is (0.5, 0.5)

      // Calculate dot pattern distance using screen-corrected UVs for screen-square dots
      float dotPatternDist = distance(fract(screenUV * dots), vec2(0.5, 0.5));

      // Compare dot pattern distance (screen-square dots) with circular threshold boundary
      bool nextImage = dotPatternDist < ( progress / dist );

      // Sample textures using aspect-corrected newUV
      gl_FragColor = nextImage ? getToColor(newUV) : getFromColor(newUV);
    }

  `},Si={uniforms:{},fragment:`
    ${k}
    const float size = 0.04; // = 0.04
    const float zoom = 100.0; // = 50.0
    const float colorSeparation = 0.3; // = 0.3

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float inv = 1. - progress;
      vec2 disp = size*vec2(cos(zoom*newUV.x), sin(zoom*newUV.y));
      vec4 texTo = getToColor(newUV + inv*disp);
      vec4 texFrom = vec4(
        getFromColor(newUV + progress*disp*(1.0 - colorSeparation)).r,
        getFromColor(newUV + progress*disp).g,
        getFromColor(newUV + progress*disp*(1.0 + colorSeparation)).b,
        1.0);
      gl_FragColor = texTo*progress + texFrom*inv;
    }

  `},z={dots:Ci,"dots-circle":Ti,flyeye:Si,"morph-x":ci,"morph-y":hi,"page-curl":di,"peel-x":ui,"peel-y":fi,"polygons-fall":mi,"polygons-morph":pi,"polygons-wind":xi,pixelize:gi,ripple:yi,shutters:wi,slices:vi,squares:Ai,stretch:Mi,"wave-x":Ei,wind:bi},H=`
attribute vec2 uv;
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,tt=(e,t)=>{let{shaderPerSlide:i,swiper:s}=t,r=s.params.loop?s.realIndex:s.activeIndex,n=z;if(Array.isArray(e)&&e.length){if(i)return typeof e[r]=="undefined"?z[e[0]]:z[e[r]];n={},Object.keys(z).forEach(o=>{e.includes(o)&&(n[o]=z[o])})}let a=Math.floor(Math.random()*Object.keys(n).length);return n[Object.keys(n)[a]]},ht=class{constructor(t){let i=t.shader==="random"||Array.isArray(t.shader)?tt(t.shader,t):z[t.shader];this.shader=i,this.displacement=t.displacementMap||ri,this.scene=new O,this.swiper=t.swiper,this.vertex=i.vertex||H,this.fragment=i.fragment,this.uniforms=i.uniforms||{},this.renderer=new rt({dpr:2,webgl:2,alpha:!0}),this.gl=this.renderer.gl,this.width=window.innerWidth,this.height=window.innerHeight,this.renderer.setSize(this.width,this.height),this.gl.clearColor(1,1,1,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.opts=t,this.container=this.swiper.el,this.displacementTexture=null,this.width=this.swiper.width,this.height=this.swiper.height,this.swiper.isElement&&(this.gl.canvas.setAttribute("slot","container-start"),this.swiper.hostEl.classList.add("swiper-gl")),this.container.prepend(this.gl.canvas),this.camera=new ot(this.gl,{fov:45}),this.camera.perspective({aspect:this.gl.canvas.width/this.gl.canvas.height}),this.camera.position.set(0,0,2),this.time=0,this.current=0,this.init(()=>{this.addObjects(),this.resize(),this.render()})}animateUniform(t,i,s){let r=t.value,n=null,a;window.cancelAnimationFrame(this.animateUniformFrame);let o=i>t.value?"next":"prev",l=(c,d)=>o==="next"&&c>=d||o==="prev"&&c<=d,h=()=>{if(this.destroyed)return;a=new Date().getTime(),n===null&&(n=a);let c=Math.max(Math.min((a-n)/this.swiper.params.speed,1),0),d=.5-Math.cos(c*Math.PI)/2,u=r+d*(i-r);if(l(u,i)&&(u=i),t.value=u,l(u,i)){cancelAnimationFrame(this.animateUniformFrame),s&&s();return}this.animateUniformFrame=requestAnimationFrame(h)};h()}loadTextures(){let t=[],i=this;return this.images=[],this.textures=[],(this.swiper&&this.swiper.isElement?this.swiper.hostEl:this.container).querySelectorAll(".swiper-gl-image").forEach(r=>{this.images.push(r.src)}),this.images.forEach((r,n)=>{let a=new Promise(o=>{let l=new Image;l.crossOrigin="anonymous";let h=new J(this.gl);l.onload=()=>{h.image=l,i.textures[n]=h,o()},l.src=r});t.push(a)}),t.push(new Promise(r=>{let n=new Image;n.crossOrigin="anonymous";let a=new J(this.gl);n.onload=()=>{a.image=n,i.displacementTexture=a,r()},n.src=this.displacement})),Promise.all(t)}init(t){this.loadTextures().then(()=>{this.initialized=!0,this.onInit&&this.onInit(),t()})}resize(){if(!this.initialized||this.destroyed)return;let{width:t,height:i}=this.swiper;this.width=t,this.height=i,this.renderer.setSize(t,i);let s=this.camera.position.z;if(this.camera.perspective({aspect:t/i,fov:2*(180/Math.PI)*Math.atan(1/(2*s))}),!this.textures[0].image)return;let r=this.textures[0].image.height/this.textures[0].image.width,n,a;i/t>r?(n=t/i*r,a=1):(n=1,a=i/t/r),this.material.uniforms.resolution.value.x=t,this.material.uniforms.resolution.value.y=i,this.material.uniforms.resolution.value.z=n,this.material.uniforms.resolution.value.w=a,this.shader.vertex&&this.vertexMaterial&&(this.vertexMaterial.uniforms.resolution.value.x=t,this.vertexMaterial.uniforms.resolution.value.y=i,this.vertexMaterial.uniforms.resolution.value.z=n,this.vertexMaterial.uniforms.resolution.value.w=a),this.shader.vertex?(this.nextMesh.scale.set(this.camera.aspect/2,1/2,1/2),this.currentMesh.scale.set(this.camera.aspect/2,1/2,1/2)):(this.plane.scale.x=this.camera.aspect,this.plane.scale.y=1)}createMaterial(){return new st(this.gl,{extensions:{derivatives:"#extension GL_OES_standard_derivatives : enable"},uniforms:{time:{type:"f",value:0},progress:{type:"f",value:0},intensity:{type:"f",value:0},width:{type:"f",value:0},radius:{type:"f",value:0},size:{type:"f",value:0},texture1:{type:"f",value:this.textures[0]},texture2:{type:"f",value:this.textures[1]},displacement:{type:"f",value:this.displacementTexture},resolution:{type:"v4",value:new ct}},vertex:this.shader.vertex||H,fragment:this.shader.fragment,...this.shader.vertex?{transparent:!0,depthWrite:!1}:{}})}addObjects(){if(this.scene.children.forEach(t=>{this.scene.removeChild(t)}),this.scene.children.forEach(t=>{this.scene.removeChild(t)}),this.material=this.createMaterial(),this.shader.vertex){let t=li(this.gl,this.shader.detail,this.shader.offsetTop),i=this.textures[1];this.vertexMaterial=this.createMaterial(),this.vertexMaterial.uniforms.texture1.value=i,this.currentMesh=new N(this.gl,{geometry:t,program:this.material}),this.nextMesh=new N(this.gl,{geometry:t,program:this.vertexMaterial}),this.nextMesh.position.z=-1e-4,this.currentMesh.setParent(this.scene),this.nextMesh.setParent(this.scene)}else{let t=new Q(this.gl,{width:1,height:1,widthSegments:2,heightSegments:2});this.plane=new N(this.gl,{geometry:t,program:this.material}),this.plane.setParent(this.scene)}}replaceShader(t){let i,s;this.shader.vertex?(i=this.material.uniforms.texture1.value,s=this.vertexMaterial.uniforms.texture1.value):(i=this.material.uniforms.texture1.value,s=this.material.uniforms.texture2.value);let r=t==="random"||Array.isArray(t)?tt(t,this.opts):z[t],{fragment:n,uniforms:a,vertex:o}=r;this.shader=r,this.vertex=o||H,this.fragment=n||"",this.uniforms=a||{},this.addObjects(),this.shader.vertex?(this.material.uniforms.texture1.value=s,this.vertexMaterial.uniforms.texture1.value=s):(this.material.uniforms.texture1.value=i,this.material.uniforms.texture2.value=s,this.material.uniforms.progress.value=1),this.resize(),this.swiper.params.gl.shader=t}replaceRandomShader(){let t=tt(this.opts.shader,this.opts),{fragment:i,uniforms:s,vertex:r}=t;this.shader=t,this.fragment=i||"",this.uniforms=s||{},this.vertex=r||H,this.addObjects(),this.resize()}setProgress(t,i,s,r,n){if(this.destroyed||this.swiper.glDestroyed)return;if(!this.initialized){this.onInit=()=>{requestAnimationFrame(()=>{this.setProgress(t,i,s,r)})};return}this.swiper.params.loop&&this.swiper.slides[t]&&this.swiper.slides[i]&&(t=parseInt(this.swiper.slides[t].getAttribute("data-swiper-slide-index"),10),i=parseInt(this.swiper.slides[i].getAttribute("data-swiper-slide-index"),10));let a=this.textures[i],o=this.textures[t];if(this.material.uniforms.texture1.value=o,this.shader.vertex?this.vertexMaterial.uniforms.texture1.value=a:this.material.uniforms.texture2.value=a,n){if(this.preventShaderReplace){this.material.uniforms.progress.value=Math.abs(s);return}this.preventShaderReplace=!0,requestAnimationFrame(()=>{this.preventShaderReplace=!1}),this.swiper.params.gl.shader==="random"||Array.isArray(this.swiper.params.gl.shader)?(this.replaceRandomShader(),this.material.uniforms.texture1.value=o,this.material.uniforms.texture2.value=a,this.material.uniforms.progress.value=Math.abs(s)):this.material.uniforms.progress.value=Math.abs(s)}else r?(s===0&&this.material.uniforms.progress.value===0&&(this.material.uniforms.progress.value=1),s===1&&this.material.uniforms.progress.value===1&&(this.material.uniforms.progress.value=0),this.animateUniform(this.material.uniforms.progress,s,()=>{(this.swiper.params.gl.shader==="random"||Array.isArray(this.swiper.params.gl.shader))&&(this.replaceRandomShader(),this.material.uniforms.texture1.value=o,this.material.uniforms.texture2.value=a,this.material.uniforms.progress.value=s),s===1&&(this.material.uniforms.texture1.value=a),this.material.uniforms.progress.value=0})):this.material.uniforms.progress.value=Math.abs(s)}render(){this.swiper.destroyed||this.destroyed||(this.time+=.05,this.material.uniforms.time.value=this.time,Object.keys(this.uniforms).forEach(t=>{this.material.uniforms[t].value=this.uniforms[t].value}),requestAnimationFrame(this.render.bind(this)),this.renderer.render({scene:this.scene,camera:this.camera}))}destroy(){this.initialized=!1,this.destroyed=!0,this.gl&&this.gl.canvas&&this.container.removeChild(this.gl.canvas)}};typeof window!="undefined"&&window.SwiperElementRegisterParams&&window.SwiperElementRegisterParams(["gl"]);function Lt({swiper:e,on:t,extendParams:i}){e.gl=null;let s=!1;function r(){try{let l=document.createElement("canvas");return!!window.WebGLRenderingContext&&(l.getContext("webgl")||l.getContext("experimental-webgl"))}catch{return!1}}i({gl:{shader:"random",shaderPerSlide:!1,displacementMap:void 0}});let n=()=>{e.gl=new ht({swiper:e,shader:e.params.gl.shader,shaderPerSlide:e.params.gl.shaderPerSlide,displacementMap:e.params.gl.displacementMap})},a,o;t("beforeInit",()=>{if(e.params.effect!=="gl")return;if(!r()){s=!0;return}e.classNames.push(`${e.params.containerModifierClass}gl`);let l={watchSlidesProgress:!0};Object.assign(e.params,l),Object.assign(e.originalParams,l)}),t("init",()=>{e.params.effect!=="gl"||s||e.glDestroyed||e.gl||n()}),t("resize",()=>{e.params.effect!=="gl"||s||e.glDestroyed||e.gl.resize()}),t("setTranslate",()=>{if(e.params.effect!=="gl"||s||e.glDestroyed)return;e.gl||n();let l,h,c,d=!1,u;if(e.slides.forEach((p,m)=>{let x=p.progress;e.params.cssMode&&Math.round(x*100)===0&&(d=!0),(x>0&&x<1||x===0&&e.progress<o)&&(l=m,h=m+1,c=x,u=l),(x<0&&x>-1||x===0&&e.progress>o)&&(l=m-1,h=m,c=1+x,u=h)}),o=e.progress||0,typeof l=="undefined"&&typeof h=="undefined")return;d=d&&Math.round(c)===c;let f=Math.min(u,e.activeIndex),g=Math.max(u,e.activeIndex);!e.params.loop&&g!==f&&(l=f,h=g),e.gl.setProgress(l,h,c,a,d)}),t("setTransition",(l,h)=>{e.params.effect!=="gl"||s||e.glDestroyed||(a=h>0&&!e.params.cssMode)}),t("slidesGridLengthChange",()=>{e.params.effect!=="gl"||s||!e.initialized||e.glDestroyed||e.gl&&e.gl.loadTextures&&e.gl.loadTextures()}),t("beforeDestroy",()=>{e.params.effect!=="gl"||s||e.gl&&(e.glDestroyed=!0,e.gl.destroy(),e.gl=null)})}gsap.registerPlugin(SplitText,ScrollTrigger);function Ui(){let e;if(Webflow.env("editor")===void 0){let r=function(a){e.raf(a),requestAnimationFrame(r)};var s=r;e=new Lenis({lerp:.075,wheelMultiplier:.7,gestureOrientation:"vertical",normalizeWheel:!1,smoothTouch:!1}),requestAnimationFrame(r),window.lenisInstance=e}$("[data-lenis-start]").on("click",function(){e.start()}),$("[data-lenis-stop]").on("click",function(){e.stop()}),$("[data-lenis-toggle]").on("click",function(){$(this).toggleClass("stop-scroll"),$(this).hasClass("stop-scroll")?e.stop():e.start()});let{body:t}=document;new ResizeObserver(()=>{e.resize()}).observe(t);function s(r){e.raf(r),requestAnimationFrame(s)}requestAnimationFrame(s)}function Fi(){if(document.documentElement.style.setProperty("--gap-size","0"),!document.querySelector(".site-frame")){let i=["top","right","bottom","left"],s=document.createElement("div");s.className="site-frame-container",i.forEach(n=>{let a=document.createElement("div");a.className=`site-frame site-frame-${n}`,s.appendChild(a)}),document.body.appendChild(s);let r=document.createElement("style");r.innerHTML=`
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
    `,document.head.appendChild(r)}let e=window.lenis||null;function t(i){i>100?gsap.to(document.documentElement,{duration:0,"--gap-size":1,ease:"power2.out"}):gsap.to(document.documentElement,{duration:0,"--gap-size":0,ease:"power2.out"})}e?e.on("scroll",({scroll:i})=>{t(i)}):$(window).scroll(function(){t($(this).scrollTop())})}function D(e){window.lenisInstance&&(e===!0?(window.lenisInstance.stop(),lenisInstance.scrollTo(0)):(window.lenisInstance.start(),lenisInstance.scrollTo(0)))}function Ii(){function e(){let t=new Date,i={timeZone:"Europe/Paris",hour:"2-digit",minute:"2-digit",hour12:!0},s=t.toLocaleTimeString("en-GB",i);$("[data-time-cet]").text(`CET ${s}`)}e(),setInterval(e,1e3)}function Ri(){let t=document.querySelectorAll("[data-css-marquee]"),i=[],s;function r(c){if(c.getAttribute("data-initialized")==="true")return;c.querySelectorAll("[data-css-marquee-list]").forEach(u=>{let f=u.cloneNode(!0);c.appendChild(f)}),c.querySelectorAll("[data-css-marquee-list]").forEach(u=>{u.style.animationDuration=u.offsetWidth/75+"s",u.style.animationPlayState="paused"}),c.setAttribute("data-initialized","true"),i.push(c)}function n(c){let d=c.querySelectorAll("[data-css-marquee-list]");for(let f=d.length-1;f>=d.length/2;f--)d[f].remove();c.querySelectorAll("[data-css-marquee-list]").forEach(f=>{f.style.animationDuration="",f.style.animationPlayState=""}),c.setAttribute("data-initialized","false");let u=i.indexOf(c);u>-1&&i.splice(u,1)}function a(c){let d=parseInt(c.getAttribute("data-breakpoint")||"0");window.innerWidth<=d?r(c):c.getAttribute("data-initialized")==="true"&&n(c)}let o=new IntersectionObserver(c=>{c.forEach(d=>{d.target.getAttribute("data-initialized")==="true"&&d.target.querySelectorAll("[data-css-marquee-list]").forEach(u=>u.style.animationPlayState=d.isIntersecting?"running":"paused")})},{threshold:0});function l(){t.forEach(c=>{a(c),o.observe(c)})}function h(){clearTimeout(s),s=setTimeout(()=>{t.forEach(c=>{a(c)})},250)}window.addEventListener("resize",h),l()}function ki(){let t=new URLSearchParams(window.location.search).get("anchor");if(t){let i=document.getElementById(t);i&&window.lenisInstance&&setTimeout(()=>{window.lenisInstance.scrollTo(i,{duration:1,easing:s=>Math.min(1,1.001-Math.pow(2,-10*s))})},100)}}function Gi(){let e=$('[data-nav-toggle="open"]'),t=$('[data-nav-toggle="close"]'),i=$(".nav_menu"),s=$("[data-menu-brand]"),r=$(".nav_menu-item"),n=$(".nav_menu-sublinks li"),a=$(".nav_menu-meta");gsap.set(i,{display:"none"}),gsap.set([i,r,n,a],{opacity:0}),gsap.set(s,{text:""});let o={open:()=>{let c=gsap.timeline();return B(s,s.attr("data-menu-text")),c.set(i,{display:"flex"}),c.set(t,{yPercent:100}),c.to(e.find("svg"),{scale:0,ease:"power4.out"}),c.to(e,{scale:0,ease:"power4.out"},"<0.1"),c.to(i,{opacity:1},"<"),c.to(t,{yPercent:0}),c.to(r,{opacity:1,stagger:.1},"<"),c.fromTo(r.find(".nav_menu-item_list"),{scale:0},{scale:1,stagger:.1},"<0.3"),c.fromTo(r.find("p"),{yPercent:300},{yPercent:0,stagger:.1,duration:.6},"<"),c.fromTo(r.find(".w-embed"),{xPercent:300},{xPercent:0,stagger:.1,duration:.6},"<"),c.to([n,a],{opacity:1,stagger:.2},"<"),c},close:()=>{let c=gsap.timeline();return c.to([n,a],{opacity:0,duration:.3}),c.to(t,{yPercent:100},"<"),c.to(r.find("p"),{yPercent:300,stagger:.05,duration:1},"<0.2"),c.to(r.find(".nav_menu-item_list"),{scale:0,stagger:.1},"<"),c.to(r,{opacity:0,stagger:.1},"<"),c.to(i,{opacity:0},"<0.4"),c.to(e.find("svg"),{scale:1,ease:"power4.out"},"<"),c.to(e,{scale:1,ease:"power4.out"},"<"),c.set(i,{display:"none"}),B(s,""),c}};function l(){o.open(),D(!0)}function h(){o.close(),D(!1)}e.on("click",l),t.on("click",h)}function Yi(){$(".nav_meta-col").each(function(){let e=$(this).find("a"),t=$(this).find("p");j(e),j(t),gsap.fromTo($(".nav_mode"),{scale:0},{scale:1})})}function zi(){let e=$("[data-back-to-home]"),t=e.find("[data-back-label]"),i=t.text();e.hover(function(){B(t,"Home, sweet home")},function(){B(t,i)})}function Pi(){$(".hp-hero_content-block").each(function(){let e=gsap.timeline();j($(this).find("p").eq(0)),e.fromTo($(this).find("li"),{opacity:0,xPercent:-5},{opacity:1,xPercent:0,stagger:.2})}),$(".hp-hero_content-visual").each(function(){gsap.set($(this),{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"}),gsap.to($(this),{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"power3.inOut"})})}function Nt(e,t){console.log($(e).find(t)),$(e).find(t).hover(function(){let i=$(this).parent().index(),s=$(".links-imgs_box-item").length,r=-(i*(100/s));gsap.to(".links-imgs_box-list",{yPercent:r,duration:.3,ease:"power2.inOut"})}),$(e).hover(function(){gsap.to(".links-imgs_box-wrap",{scale:1,duration:.2,ease:"power4.in"})},function(){gsap.to(".links-imgs_box-wrap",{scale:0,duration:.2,ease:"power4.out"})})}function Di(){let e=document.querySelector(".cursor"),t=e.querySelector("p"),i=document.querySelectorAll("[data-cursor]"),s=6,r=140,n=!1,a=null,o="";gsap.set(e,{xPercent:s,yPercent:r,scale:.8});let l=gsap.quickTo(e,"x",{ease:"power3"}),h=gsap.quickTo(e,"y",{ease:"power3"}),c=()=>e.offsetWidth+16;window.addEventListener("mousemove",d=>{let u=window.innerWidth,f=window.innerHeight,{scrollY:g}=window,p=d.clientX,m=d.clientY+g,x=s,v=r,A=c();if(p>u-A?(n=!0,x=-100):n=!1,m>g+f*.9&&(v=-120),a){let w=a.getAttribute("data-cursor");w!==o&&(t.innerHTML=w,o=w,A=c())}gsap.to(e,{xPercent:x,yPercent:v,duration:.9,scale:1,ease:"power3"}),l(p),h(m-g)}),i.forEach(d=>{d.addEventListener("mouseenter",()=>{a=d;let u=d.getAttribute("data-cursor");if(u!==o){t.innerHTML=u,o=u;let f=c()}})})}function Bi(){gsap.matchMedia().add("(min-width: 992px)",()=>{let t=$(".work_slider-item"),i=t.length,s=$(".work-wall"),r=$(".hp-work_slider-row"),n=i*100,a=n;s.css("height",a+"vh"),gsap.registerPlugin(ScrollTrigger),gsap.to(r,{xPercent:-(n-100),ease:"none",scrollTrigger:{trigger:s,start:"top top",end:"bottom bottom",scrub:1,pin:!1}});let o=$(".work_slider-item img");if(window.lenisInstance){let l=!1,h;window.lenisInstance.on("scroll",c=>{$(window).width()>991&&(Math.abs(c.velocity)>15&&!l&&(l=!0,gsap.to(o,{scale:1.1,duration:1,ease:"power4.out"}),gsap.to(t.find(".work_slider-item_visual"),{scale:.8,duration:1,ease:"power4.out"})),clearTimeout(h),h=setTimeout(()=>{l=!1,gsap.to(o,{scale:1,duration:1,ease:"power4.out"}),gsap.to(t.find(".work_slider-item_visual"),{scale:1,duration:1,ease:"power4.out"})},15))})}})}function Ki(){$("[data-work-counter]").text("("+$(".work_slider-item").length+")")}function Li(){var e=gsap.timeline({});let t=".work-d_hero-wrap.cc-images",i=".work-d_hero-wrap.cc-images .work-d_hero-list",s=".work-d_hero-wrap.cc-images .work-d_hero-list-item",r=".work-d_hero-timeline";e.set([r],{y:"10vh",rotate:.001},"<"),e.set(r,{opacity:0},"<"),e.to(i,{duration:1,ease:"Power4.easeOut",rotate:.001,y:0,clearProps:"all",delay:0,onComplete:()=>{j($('[data-split="work-heading"]'))}},"<"),e.from(s,{duration:2,ease:"Expo.easeInOut",rotate:.001,opacity:0,y:"0px",clearProps:"all"},"<"),e.to(r,{duration:2.1,ease:"Expo.easeInOut",rotate:.001,y:0,opacity:1,clearProps:"all"},"<")}function Ni(){let e=$(".work-d_hero-part.cc-images"),t=$(".work-d_hero-list-item").first(),i=$(".work-d_hero-list-item").last();gsap.timeline({scrollTrigger:{trigger:e,start:()=>{let n=t.outerHeight()/2;return console.log(n),n+"px center"},end:()=>{let n=i.offset().top+i.outerHeight()/2,a=e.offset().top;return n-a+"px center"},scrub:!0,markers:!0}}).to(".work-d_hero-timeline-inner",{y:()=>{let n=$(".work-d_hero-timeline-inner").height(),a=$(".work-d_hero-timeline_item").first().outerHeight(!0);return-(n-a)+"px"},ease:"none"}),$(".work-d_hero-timeline_item").on("click",function(){let n=$(this).index(),a=$(".work-d_hero-list-item").eq(n),o=a.offset().top,l=a.outerHeight(),h=$(window).height(),c=o-h/2+l/2;lenisInstance.scrollTo(c,{duration:1.2,easing:d=>Math.min(1,1.001-Math.pow(2,-10*d))})});let r=gsap.timeline({scrollTrigger:{trigger:".section.cc-work-d-content",start:"top bottom",end:"top bottom",markers:!0,onEnterBack:()=>{gsap.to($(".work-d_hero-timeline-active"),{height:"10.8rem",y:0})},onLeave:()=>{let n=$(".work-d_hero-timeline_item").first().outerHeight(!0);gsap.to($(".work-d_hero-timeline-active"),{height:"1px",y:n+3+"px"})}}})}function Oi(){let e=$(".work-d_content-part_icon"),t=gsap.timeline({scrollTrigger:{trigger:e}});t.from(e,{scale:0}),t.from(e.find("svg"),{scale:0,delay:.2},"<")}function Qi(){$(document).ready(function(){let e=$(".about_visual-box-inner-extra img"),t=e.length,i=-1,s=[];if(t===0)return;function r(){s=Array.from({length:t},(o,l)=>l);for(let o=s.length-1;o>0;o--){let l=Math.floor(Math.random()*(o+1));[s[o],s[l]]=[s[l],s[o]]}}r(),e.css({display:"block",opacity:0}),$(".about_visual-box-inner").on("click",function(){if(i>=t-1){a();return}n()});function n(){i++;let o=Math.random()*10-5,l=Math.pow(.99,i+1),h=l*.99,c=s[i],d=e.eq(c);gsap.set(d[0],{opacity:0,scale:h,rotation:o+2,zIndex:i+10}),gsap.to(d[0],{opacity:1,scale:l,rotation:o,duration:.6,ease:"back.out(1.2)",delay:.1})}function a(){gsap.to(e,{opacity:0,scale:.8,duration:.4,stagger:.05,ease:"power2.in",onComplete:function(){gsap.set(e,{scale:1,rotation:0,zIndex:"auto"}),i=-1,r()}})}})}function ji(){function e(r){let n=r.activeIndex,a=r.slides[n];B($('[data-work-slider="title"]'),$(a).attr("data-title")),B($('[data-work-slider="desc"]'),$(a).attr("data-description"))}let t=new Swiper(".why-hero_cases-slider",{slidesPerView:1,modules:[Lt],effect:"gl",gl:{shader:"morph-y"},loop:!0,fadeEffect:{crossFade:!0},pagination:{el:".swiper-nav.cc-cases",bulletClass:"swiper-dot",bulletActiveClass:"cc-active",clickable:!0},on:{slideChange:function(){e(this)},init:function(){e(this)}}}),i=new Swiper(".why-hero_quotes-slider",{slidesPerView:1,effect:"fade",fadeEffect:{crossFade:!0},loop:!0,speed:600,pagination:{el:".swiper-nav.cc-quotes",bulletClass:"swiper-dot",bulletActiveClass:"cc-active",clickable:!0},on:{init:function(){s(this),$(".swiper-slide").each(function(){gsap.set($(this).find("[data-item-el]"),{yPercent:50,opacity:0})}),gsap.to($(".swiper-slide-active [data-item-el]"),{yPercent:0,opacity:1,stagger:.2,duration:.6,ease:"power2.out"})},slideChangeTransitionEnd:function(){gsap.to($(".swiper-slide:not(.swiper-slide-active) [data-item-el]"),{yPercent:50,opacity:0,stagger:.1,duration:.3}),gsap.to($(".swiper-slide-active [data-item-el]"),{yPercent:0,opacity:1,stagger:.2,duration:.6,delay:.2,ease:"power2.out"})}}});function s(r){let{slides:n}=r,a=n.length;n.forEach((o,l)=>{let h=$(o).find(".why-hero_quotes-avatar-circle.cc-1"),c=$(o).find(".why-hero_quotes-avatar-circle.cc-2"),d=(l+1)%a,u=(l+2)%a,f=$(n[d]).find(".why-hero_quotes-avatar-circle.cc-avatar img").attr("src"),g=$(n[u]).find(".why-hero_quotes-avatar-circle.cc-avatar img").attr("src");g&&h.find("img").attr("src",g),f&&c.find("img").attr("src",f)})}}function Vi(){document.querySelectorAll("[data-form-validate]").forEach(t=>{let i=new Date().getTime(),s=t.querySelector("form");if(!s)return;let r=s.querySelectorAll("[data-validate]"),n=s.querySelector("[data-submit]");if(!n)return;let a=n.querySelector('input[type="submit"]');if(!a)return;function o(){return new Date().getTime()-i<5e3}r.forEach(function(d){let u=d.querySelector("select");u&&u.querySelectorAll("option").forEach(function(g){(g.value===""||g.value==="disabled"||g.value==="null"||g.value==="false")&&g.setAttribute("disabled","disabled")})});function l(){let d=!0,u=null;return r.forEach(function(f){let g=f.querySelector("input, textarea, select"),p=f.querySelector("[data-radiocheck-group]");!g&&!p||(g&&(g.__validationStarted=!0),p&&(p.__validationStarted=!0,p.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(x){x.__validationStarted=!0})),c(f),h(f)||(d=!1,u||(u=g||p.querySelector("input"))))}),!d&&u&&u.focus(),d}function h(d){let u=d.querySelector("[data-radiocheck-group]");if(u){let A=u.querySelectorAll('input[type="radio"], input[type="checkbox"]'),w=u.querySelectorAll("input:checked"),M=parseInt(u.getAttribute("min"))||1,y=parseInt(u.getAttribute("max"))||A.length,S=w.length;return A[0].type==="radio"?S>=1:A.length===1?A[0].checked:S>=M&&S<=y}let f=d.querySelector("input, textarea, select");if(!f)return!1;let g=!0,p=parseInt(f.getAttribute("min"))||0,m=parseInt(f.getAttribute("max"))||1/0,x=f.value.trim(),{length:v}=x;return f.tagName.toLowerCase()==="select"?(x===""||x==="disabled"||x==="null"||x==="false")&&(g=!1):f.type==="email"?g=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x):(f.hasAttribute("min")&&v<p&&(g=!1),f.hasAttribute("max")&&v>m&&(g=!1)),g}function c(d){let u=d.querySelector("[data-radiocheck-group]");if(u){let f=u.querySelectorAll('input[type="radio"], input[type="checkbox"]');u.querySelectorAll("input:checked").length>0?d.classList.add("is--filled"):d.classList.remove("is--filled"),h(d)?(d.classList.add("is--success"),d.classList.remove("is--error")):(d.classList.remove("is--success"),Array.from(f).some(x=>x.__validationStarted)?d.classList.add("is--error"):d.classList.remove("is--error"))}else{let f=d.querySelector("input, textarea, select");if(!f)return;f.value.trim()?d.classList.add("is--filled"):d.classList.remove("is--filled"),h(d)?(d.classList.add("is--success"),d.classList.remove("is--error")):(d.classList.remove("is--success"),f.__validationStarted?d.classList.add("is--error"):d.classList.remove("is--error"))}}r.forEach(function(d){let u=d.querySelector("input, textarea, select"),f=d.querySelector("[data-radiocheck-group]");f?f.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(p){p.__validationStarted=!1,p.addEventListener("change",function(){requestAnimationFrame(function(){if(!p.__validationStarted){let m=f.querySelectorAll("input:checked").length,x=parseInt(f.getAttribute("min"))||1;m>=x&&(p.__validationStarted=!0)}p.__validationStarted&&c(d)})}),p.addEventListener("blur",function(){p.__validationStarted=!0,c(d)})}):u&&(u.__validationStarted=!1,u.tagName.toLowerCase()==="select"?u.addEventListener("change",function(){u.__validationStarted=!0,c(d)}):(u.addEventListener("input",function(){let g=u.value.trim(),{length:p}=g,m=parseInt(u.getAttribute("min"))||0,x=parseInt(u.getAttribute("max"))||1/0;u.__validationStarted||(u.type==="email"?h(d)&&(u.__validationStarted=!0):(u.hasAttribute("min")&&p>=m||u.hasAttribute("max")&&p<=x)&&(u.__validationStarted=!0)),u.__validationStarted&&c(d)}),u.addEventListener("blur",function(){u.__validationStarted=!0,c(d)})))}),n.addEventListener("click",function(){if(l()){if(o()){alert("Form submitted too quickly. Please try again.");return}a.click()}}),s.addEventListener("keydown",function(d){if(d.key==="Enter"&&d.target.tagName!=="TEXTAREA"&&(d.preventDefault(),l())){if(o()){alert("Form submitted too quickly. Please try again.");return}a.click()}})}),$(".form-checkbox").each(function(){let t=$(this),i=t.find('input[type="checkbox"], input[type="radio"]');function s(){i.attr("type")==="radio"&&$(`input[name="${i.attr("name")}"]`).each(function(){$(this).closest(".form-checkbox").removeClass("cc-active")}),i.is(":checked")?t.addClass("cc-active"):t.removeClass("cc-active")}s(),i.on("change",s)})}function B(e,t){let i="0123456789!@#$%^&*()_+<>?:|";gsap.to(e,{duration:.5,scrambleText:{text:t,chars:i,speed:.3,ease:"power2.inOut"}})}function j(e){let t={lines:{duration:.8,stagger:.08},words:{duration:.6,stagger:.06},chars:{duration:.4,stagger:.01}},i=[],s=[];function r(){s.forEach(o=>{o&&o.kill()}),i.forEach(o=>{o&&o.revert()}),i=[],s=[],$(e).each(function(){let o=$(this);if(o.hasClass("animated"))return;let l=o.data("split-reveal")||"lines",h=l==="lines"?["lines"]:l==="words"?["lines","words"]:["lines","words","chars"],c=o.closest("li").length>0;gsap.set(o,{visibility:"visible",opacity:1}),c&&gsap.set(o.closest("li"),{opacity:0});try{let d=new SplitText(o[0],{type:h.join(", "),mask:"lines",linesClass:"line",wordsClass:"word",charsClass:"letter"});i.push(d);let u=d[l];if(!u||u.length===0){console.warn("No split targets found for",o);return}gsap.set(u,{yPercent:110});let f=t[l],g=o.data("trigger-type")||"load",p=()=>{let m=gsap.timeline({onComplete:()=>{o.addClass("animated")}});return c&&m.to(o.closest("li"),{opacity:1,duration:f.duration*.3,ease:"power2.out"},0),m.to(u,{yPercent:-8,duration:f.duration,stagger:f.stagger,ease:"expo.out"},c?f.duration*.15:0),m};if(g==="scroll"){let m=ScrollTrigger.create({trigger:o[0],start:"clamp(top 80%)",once:!0,markers:o.data("debug-markers")==="true",onEnter:p});s.push(m)}else gsap.delayedCall(.2,p)}catch(d){console.error("Error in SplitText:",d)}})}setTimeout(r,300);function n(o,l){let h;return function(){let c=this,d=arguments;clearTimeout(h),h=setTimeout(()=>o.apply(c,d),l)}}let a=n(r,200);return $(window).on("resize",a),function(){$(window).off("resize",a),s.forEach(l=>{l&&l.kill()}),i.forEach(l=>{l&&l.revert()})}}function Hi(e){let t=[];function i(){t.forEach(n=>{n&&n.kill()}),t=[],$(e).each(function(){let n=$(this);if(n.hasClass("animated"))return;let a=n.data("duration")||.6,o=n.data("delay")||0,l=n.data("trigger-type")||"scroll";gsap.set(n,{opacity:0});let h=()=>{gsap.to(n,{opacity:1,duration:a,delay:o,ease:"power2.out",onComplete:()=>{n.addClass("animated")}})};if(l==="scroll"){let c=ScrollTrigger.create({trigger:n[0],start:"clamp(top 95%)",once:!0,markers:n.data("debug-markers")==="true",onEnter:h});t.push(c)}else gsap.delayedCall(.2,h)})}setTimeout(i,300);function s(n,a){let o;return function(){let l=this,h=arguments;clearTimeout(o),o=setTimeout(()=>n.apply(l,h),a)}}let r=s(i,200);return $(window).on("resize",r),function(){$(window).off("resize",r),t.forEach(a=>{a&&a.kill()})}}function Ot(){gsap.fromTo(".grid-line.is-h",{scaleX:0},{scaleX:1,stagger:.1,duration:3,immediateRender:!0,ease:"power4.inOut"}),gsap.fromTo(".grid-line.is-v",{scaleY:0},{scaleY:1,stagger:.1,duration:2,immediateRender:!0,ease:"power4.inOut"})}function Zi(){document.querySelectorAll("[data-button-animate-chars]").forEach(i=>{let s=i.textContent;i.innerHTML="",[...s].forEach((r,n)=>{let a=document.createElement("span");a.textContent=r,a.style.transitionDelay=`${n*.01}s`,r===" "&&(a.style.whiteSpace="pre"),i.appendChild(a)})})}function Ji(){Gi(),Fi(),Ui(),Ii(),Ot(),Yi(),Ri(),zi(),document.fonts.ready.then(function(){j('[data-split="heading"]'),Hi("[data-item-reveal]"),Zi()}),window.initDarkModeToggle()}function Wi(){Bi(),Pi(),Nt(".hp-hero_content-clients ul",".hp-hero_links"),Di(),Ki()}function qi(){Ni(),Li(),Oi()}function _i(){setTimeout(()=>{Qi(),Ot(),Nt(".about_clients-list.cc-clients",".about_clients-item")},500)}function Xi(){ji()}function $i(){Vi()}$(document).ready(function(){let e=$('[data-barba="container"]').data("barba-namespace");ft(e),ts()});function ft(e){Ji(),e==="home"?Wi():e==="work"?qi():e==="about"?_i():e==="why"?Xi():e==="contact"&&$i(),setTimeout(()=>{gsap.to("[data-barba=container]",{opacity:1})},300)}function ts(){s();let e=null,t=null;barba.init({timeout:7e3,prefetchIgnore:!0,sync:!0,transitions:i()});function i(){function l(h){let c=$("html"),d=$(h.current.container).find(".page-transition"),u=$(h.next.container).find(".page-transition"),f=gsap.timeline({defaults:{duration:.6,ease:"power2.inOut"}});return f.call(()=>{window.scrollTo(0,0)}),f.set([h.current.container,h.next.container],{position:"fixed",top:0,left:0,width:"100%",height:"100vh",overflow:"hidden"}),f.set(c,{backgroundColor:"#4C4C4C"}),f.set(h.next.container,{scale:.8,zIndex:2}),f.set(h.current.container,{zIndex:1}),f.to(d,{scaleY:1,duration:.4}),f.to(h.current.container,{scale:.8,duration:.5},"-=0.1"),f.set(h.current.container,{opacity:0,pointerEvents:"none"},"+=0.2"),f.fromTo(u,{scaleY:1},{scaleY:0,duration:1,onStart:()=>{let g=h.next.container.dataset.barbaNamespace;ft(g)}},"-=0.3"),f.set(h.next.container,{opacity:1},"<"),f.to(h.next.container,{scale:1,duration:1,onComplete:()=>{gsap.set(c,{backgroundColor:""}),gsap.set(h.next.container,{clearProps:"all"}),gsap.set(h.next.container,{opacity:1})}},"<"),f}return{name:"default-transition",before(h){document.documentElement.classList.add("is-animating"),D(!0)},async enter(h){await l(h)},async after(h){D(!1),document.documentElement.classList.remove("is-animating"),ki()}}}function s(){let l=document.createElement("style");l.innerHTML=`
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
    `,document.head.appendChild(l)}function r(){return{name:"home-to-work",from:{namespace:"home"},to:{namespace:"work"},custom:({trigger:l})=>$(l).closest(".work_slider-item").length>0,before(l){document.documentElement.classList.add("is-animating")},beforeLeave(l){D(!0),n(l.trigger)},leave(l){return a(l.current.container)},beforeEnter(l){window.scrollTo(0,0),gsap.set(l.next.container,{opacity:0,visibility:"visible"})},after(l){o(l.next.container);let h=l.next.container.dataset.barbaNamespace;ft(h),D(!1),document.documentElement.classList.remove("is-animating")}}}function n(l){let h=$(l).closest(".work_slider-item");if(h.length){let c=h[0].getBoundingClientRect(),d=window.getComputedStyle(h[0]);t={rect:c,backgroundColor:d.backgroundColor,borderRadius:d.borderRadius||"0px"},e=document.createElement("div"),e.className="work-item-clone";let f=h.find("img").attr("src")||"";if($(e).css({position:"fixed",top:c.top+"px",left:c.left+"px",width:c.width+"px",height:c.height+"px",backgroundColor:t.backgroundColor,borderRadius:t.borderRadius,zIndex:9999}),f){let g=$('<div class="clone-img-container"></div>'),p=$("<img>").attr("src",f);g.css({width:"100%",height:"100%",overflow:"hidden"}),p.css({width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}),g.append(p),$(e).append(g)}document.body.appendChild(e)}}function a(l){let h=gsap.timeline();if(h.to(l,{opacity:0,duration:.5}),e&&t){let c=window.innerWidth,d=window.innerHeight,u=Math.min(c*.8,800),f=u*(t.rect.height/t.rect.width),g=(c-u)/2,p=(d-f)/2;h.to(e,{top:p,left:g,width:u,height:f,duration:.8,ease:"power2.inOut",delay:.1},"-=0.3")}return h}function o(l){return new Promise(h=>{let c=$(l).find(".work-d_hero-list-item").first()[0];e&&c?setTimeout(()=>{let d=Flip.getState(e),u=c.getBoundingClientRect();$(e).css({top:u.top+"px",left:u.left+"px",width:u.width+"px",height:u.height+"px"});let f=$(e).find("img");console.log(f),gsap.timeline({onComplete:()=>{gsap.to(l,{opacity:1,duration:.5,onComplete:()=>{e&&(e.remove(),e=null),h()}})}}).add(Flip.from(d,{duration:.8,ease:"power2.inOut"}))},100):(gsap.to(l,{opacity:1,duration:.5,onComplete:h}),e&&(e.remove(),e=null))})}}})();

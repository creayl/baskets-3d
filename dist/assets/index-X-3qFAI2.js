import{E as Et,V as M,M as X,T as U,S as Ke,Q as le,a as D,R as xt,P as Mt,b as _t,c as Xe,C as ye,d as V,e as ve,f as Ae,g as Ct,h as kt,i as Pt,j as St,W as Lt,H as $t,D as Ot,A as Tt}from"./three-74ADIO2P.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&e(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const Ue={type:"change"},ge={type:"start"},Ge={type:"end"},re=new xt,Ze=new Mt,Dt=Math.cos(70*_t.DEG2RAD);class Rt extends Et{constructor(t,n){super(),this.object=t,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new M,this.cursor=new M,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:X.ROTATE,MIDDLE:X.DOLLY,RIGHT:X.PAN},this.touches={ONE:U.ROTATE,TWO:U.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return r.phi},this.getAzimuthalAngle=function(){return r.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(i){i.addEventListener("keydown",me),this._domElementKeyEvents=i},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",me),this._domElementKeyEvents=null},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(Ue),e.update(),o=s.NONE},this.update=function(){const i=new M,l=new le().setFromUnitVectors(t.up,new M(0,1,0)),y=l.clone().invert(),x=new M,S=new le,j=new M,O=2*Math.PI;return function(At=null){const Be=e.object.position;i.copy(Be).sub(e.target),i.applyQuaternion(l),r.setFromVector3(i),e.autoRotate&&o===s.NONE&&H(J(At)),e.enableDamping?(r.theta+=p.theta*e.dampingFactor,r.phi+=p.phi*e.dampingFactor):(r.theta+=p.theta,r.phi+=p.phi);let F=e.minAzimuthAngle,z=e.maxAzimuthAngle;isFinite(F)&&isFinite(z)&&(F<-Math.PI?F+=O:F>Math.PI&&(F-=O),z<-Math.PI?z+=O:z>Math.PI&&(z-=O),F<=z?r.theta=Math.max(F,Math.min(z,r.theta)):r.theta=r.theta>(F+z)/2?Math.max(F,r.theta):Math.min(z,r.theta)),r.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,r.phi)),r.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(g,e.dampingFactor):e.target.add(g),e.target.sub(e.cursor),e.target.clampLength(e.minTargetRadius,e.maxTargetRadius),e.target.add(e.cursor),e.zoomToCursor&&T||e.object.isOrthographicCamera?r.radius=ue(r.radius):r.radius=ue(r.radius*a),i.setFromSpherical(r),i.applyQuaternion(y),Be.copy(e.target).add(i),e.object.lookAt(e.target),e.enableDamping===!0?(p.theta*=1-e.dampingFactor,p.phi*=1-e.dampingFactor,g.multiplyScalar(1-e.dampingFactor)):(p.set(0,0,0),g.set(0,0,0));let oe=!1;if(e.zoomToCursor&&T){let Q=null;if(e.object.isPerspectiveCamera){const ee=i.length();Q=ue(ee*a);const ae=ee-Q;e.object.position.addScaledVector(_,ae),e.object.updateMatrixWorld()}else if(e.object.isOrthographicCamera){const ee=new M(k.x,k.y,0);ee.unproject(e.object),e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/a)),e.object.updateProjectionMatrix(),oe=!0;const ae=new M(k.x,k.y,0);ae.unproject(e.object),e.object.position.sub(ae).add(ee),e.object.updateMatrixWorld(),Q=i.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;Q!==null&&(this.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(Q).add(e.object.position):(re.origin.copy(e.object.position),re.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(re.direction))<Dt?t.lookAt(e.target):(Ze.setFromNormalAndCoplanarPoint(e.object.up,e.target),re.intersectPlane(Ze,e.target))))}else e.object.isOrthographicCamera&&(oe=a!==1,oe&&(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/a)),e.object.updateProjectionMatrix()));return a=1,T=!1,oe||x.distanceToSquared(e.object.position)>c||8*(1-S.dot(e.object.quaternion))>c||j.distanceToSquared(e.target)>0?(e.dispatchEvent(Ue),x.copy(e.object.position),S.copy(e.object.quaternion),j.copy(e.target),!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",Ve),e.domElement.removeEventListener("pointerdown",je),e.domElement.removeEventListener("pointercancel",q),e.domElement.removeEventListener("wheel",Ne),e.domElement.removeEventListener("pointermove",pe),e.domElement.removeEventListener("pointerup",q),e._domElementKeyEvents!==null&&(e._domElementKeyEvents.removeEventListener("keydown",me),e._domElementKeyEvents=null)};const e=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=s.NONE;const c=1e-6,r=new Ke,p=new Ke;let a=1;const g=new M,f=new D,v=new D,b=new D,w=new D,A=new D,E=new D,m=new D,h=new D,u=new D,_=new M,k=new D;let T=!1;const C=[],L={};let I=!1;function J(i){return i!==null?2*Math.PI/60*e.autoRotateSpeed*i:2*Math.PI/60/60*e.autoRotateSpeed}function Y(i){const l=Math.abs(i*.01);return Math.pow(.95,e.zoomSpeed*l)}function H(i){p.theta-=i}function se(i){p.phi-=i}const Pe=function(){const i=new M;return function(y,x){i.setFromMatrixColumn(x,0),i.multiplyScalar(-y),g.add(i)}}(),Se=function(){const i=new M;return function(y,x){e.screenSpacePanning===!0?i.setFromMatrixColumn(x,1):(i.setFromMatrixColumn(x,0),i.crossVectors(e.object.up,i)),i.multiplyScalar(y),g.add(i)}}(),B=function(){const i=new M;return function(y,x){const S=e.domElement;if(e.object.isPerspectiveCamera){const j=e.object.position;i.copy(j).sub(e.target);let O=i.length();O*=Math.tan(e.object.fov/2*Math.PI/180),Pe(2*y*O/S.clientHeight,e.object.matrix),Se(2*x*O/S.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(Pe(y*(e.object.right-e.object.left)/e.object.zoom/S.clientWidth,e.object.matrix),Se(x*(e.object.top-e.object.bottom)/e.object.zoom/S.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function he(i){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?a/=i:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function Le(i){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?a*=i:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function de(i,l){if(!e.zoomToCursor)return;T=!0;const y=e.domElement.getBoundingClientRect(),x=i-y.left,S=l-y.top,j=y.width,O=y.height;k.x=x/j*2-1,k.y=-(S/O)*2+1,_.set(k.x,k.y,1).unproject(e.object).sub(e.object.position).normalize()}function ue(i){return Math.max(e.minDistance,Math.min(e.maxDistance,i))}function $e(i){f.set(i.clientX,i.clientY)}function st(i){de(i.clientX,i.clientX),m.set(i.clientX,i.clientY)}function Oe(i){w.set(i.clientX,i.clientY)}function ot(i){v.set(i.clientX,i.clientY),b.subVectors(v,f).multiplyScalar(e.rotateSpeed);const l=e.domElement;H(2*Math.PI*b.x/l.clientHeight),se(2*Math.PI*b.y/l.clientHeight),f.copy(v),e.update()}function at(i){h.set(i.clientX,i.clientY),u.subVectors(h,m),u.y>0?he(Y(u.y)):u.y<0&&Le(Y(u.y)),m.copy(h),e.update()}function rt(i){A.set(i.clientX,i.clientY),E.subVectors(A,w).multiplyScalar(e.panSpeed),B(E.x,E.y),w.copy(A),e.update()}function lt(i){de(i.clientX,i.clientY),i.deltaY<0?Le(Y(i.deltaY)):i.deltaY>0&&he(Y(i.deltaY)),e.update()}function ct(i){let l=!1;switch(i.code){case e.keys.UP:i.ctrlKey||i.metaKey||i.shiftKey?se(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):B(0,e.keyPanSpeed),l=!0;break;case e.keys.BOTTOM:i.ctrlKey||i.metaKey||i.shiftKey?se(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):B(0,-e.keyPanSpeed),l=!0;break;case e.keys.LEFT:i.ctrlKey||i.metaKey||i.shiftKey?H(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):B(e.keyPanSpeed,0),l=!0;break;case e.keys.RIGHT:i.ctrlKey||i.metaKey||i.shiftKey?H(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):B(-e.keyPanSpeed,0),l=!0;break}l&&(i.preventDefault(),e.update())}function Te(i){if(C.length===1)f.set(i.pageX,i.pageY);else{const l=K(i),y=.5*(i.pageX+l.x),x=.5*(i.pageY+l.y);f.set(y,x)}}function De(i){if(C.length===1)w.set(i.pageX,i.pageY);else{const l=K(i),y=.5*(i.pageX+l.x),x=.5*(i.pageY+l.y);w.set(y,x)}}function Re(i){const l=K(i),y=i.pageX-l.x,x=i.pageY-l.y,S=Math.sqrt(y*y+x*x);m.set(0,S)}function ht(i){e.enableZoom&&Re(i),e.enablePan&&De(i)}function dt(i){e.enableZoom&&Re(i),e.enableRotate&&Te(i)}function Ie(i){if(C.length==1)v.set(i.pageX,i.pageY);else{const y=K(i),x=.5*(i.pageX+y.x),S=.5*(i.pageY+y.y);v.set(x,S)}b.subVectors(v,f).multiplyScalar(e.rotateSpeed);const l=e.domElement;H(2*Math.PI*b.x/l.clientHeight),se(2*Math.PI*b.y/l.clientHeight),f.copy(v)}function Fe(i){if(C.length===1)A.set(i.pageX,i.pageY);else{const l=K(i),y=.5*(i.pageX+l.x),x=.5*(i.pageY+l.y);A.set(y,x)}E.subVectors(A,w).multiplyScalar(e.panSpeed),B(E.x,E.y),w.copy(A)}function ze(i){const l=K(i),y=i.pageX-l.x,x=i.pageY-l.y,S=Math.sqrt(y*y+x*x);h.set(0,S),u.set(0,Math.pow(h.y/m.y,e.zoomSpeed)),he(u.y),m.copy(h);const j=(i.pageX+l.x)*.5,O=(i.pageY+l.y)*.5;de(j,O)}function ut(i){e.enableZoom&&ze(i),e.enablePan&&Fe(i)}function pt(i){e.enableZoom&&ze(i),e.enableRotate&&Ie(i)}function je(i){e.enabled!==!1&&(C.length===0&&(e.domElement.setPointerCapture(i.pointerId),e.domElement.addEventListener("pointermove",pe),e.domElement.addEventListener("pointerup",q)),yt(i),i.pointerType==="touch"?He(i):mt(i))}function pe(i){e.enabled!==!1&&(i.pointerType==="touch"?wt(i):gt(i))}function q(i){switch(vt(i),C.length){case 0:e.domElement.releasePointerCapture(i.pointerId),e.domElement.removeEventListener("pointermove",pe),e.domElement.removeEventListener("pointerup",q),e.dispatchEvent(Ge),o=s.NONE;break;case 1:const l=C[0],y=L[l];He({pointerId:l,pageX:y.x,pageY:y.y});break}}function mt(i){let l;switch(i.button){case 0:l=e.mouseButtons.LEFT;break;case 1:l=e.mouseButtons.MIDDLE;break;case 2:l=e.mouseButtons.RIGHT;break;default:l=-1}switch(l){case X.DOLLY:if(e.enableZoom===!1)return;st(i),o=s.DOLLY;break;case X.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(e.enablePan===!1)return;Oe(i),o=s.PAN}else{if(e.enableRotate===!1)return;$e(i),o=s.ROTATE}break;case X.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(e.enableRotate===!1)return;$e(i),o=s.ROTATE}else{if(e.enablePan===!1)return;Oe(i),o=s.PAN}break;default:o=s.NONE}o!==s.NONE&&e.dispatchEvent(ge)}function gt(i){switch(o){case s.ROTATE:if(e.enableRotate===!1)return;ot(i);break;case s.DOLLY:if(e.enableZoom===!1)return;at(i);break;case s.PAN:if(e.enablePan===!1)return;rt(i);break}}function Ne(i){e.enabled===!1||e.enableZoom===!1||o!==s.NONE||(i.preventDefault(),e.dispatchEvent(ge),lt(ft(i)),e.dispatchEvent(Ge))}function ft(i){const l=i.deltaMode,y={clientX:i.clientX,clientY:i.clientY,deltaY:i.deltaY};switch(l){case 1:y.deltaY*=16;break;case 2:y.deltaY*=100;break}return i.ctrlKey&&!I&&(y.deltaY*=10),y}function bt(i){i.key==="Control"&&(I=!0,e.domElement.getRootNode().addEventListener("keyup",We,{passive:!0,capture:!0}))}function We(i){i.key==="Control"&&(I=!1,e.domElement.getRootNode().removeEventListener("keyup",We,{passive:!0,capture:!0}))}function me(i){e.enabled===!1||e.enablePan===!1||ct(i)}function He(i){switch(Ye(i),C.length){case 1:switch(e.touches.ONE){case U.ROTATE:if(e.enableRotate===!1)return;Te(i),o=s.TOUCH_ROTATE;break;case U.PAN:if(e.enablePan===!1)return;De(i),o=s.TOUCH_PAN;break;default:o=s.NONE}break;case 2:switch(e.touches.TWO){case U.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;ht(i),o=s.TOUCH_DOLLY_PAN;break;case U.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;dt(i),o=s.TOUCH_DOLLY_ROTATE;break;default:o=s.NONE}break;default:o=s.NONE}o!==s.NONE&&e.dispatchEvent(ge)}function wt(i){switch(Ye(i),o){case s.TOUCH_ROTATE:if(e.enableRotate===!1)return;Ie(i),e.update();break;case s.TOUCH_PAN:if(e.enablePan===!1)return;Fe(i),e.update();break;case s.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;ut(i),e.update();break;case s.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;pt(i),e.update();break;default:o=s.NONE}}function Ve(i){e.enabled!==!1&&i.preventDefault()}function yt(i){C.push(i.pointerId)}function vt(i){delete L[i.pointerId];for(let l=0;l<C.length;l++)if(C[l]==i.pointerId){C.splice(l,1);return}}function Ye(i){let l=L[i.pointerId];l===void 0&&(l=new D,L[i.pointerId]=l),l.set(i.pageX,i.pageY)}function K(i){const l=i.pointerId===C[0]?C[1]:C[0];return L[l]}e.domElement.addEventListener("contextmenu",Ve),e.domElement.addEventListener("pointerdown",je),e.domElement.addEventListener("pointercancel",q),e.domElement.addEventListener("wheel",Ne,{passive:!1}),e.domElement.getRootNode().addEventListener("keydown",bt,{passive:!0,capture:!0}),this.update()}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.19.2
 * @author George Michael Brower
 * @license MIT
 */class R{constructor(t,n,e,s,o="div"){this.parent=t,this.object=n,this.property=e,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),R.nextNameID=R.nextNameID||0,this.$name.id=`lil-gui-name-${++R.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",c=>c.stopPropagation()),this.domElement.addEventListener("keyup",c=>c.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(e)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const n=this.parent.add(this.object,this.property,t);return n.name(this._name),this.destroy(),n}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class It extends R{constructor(t,n,e){super(t,n,e,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function we(d){let t,n;return(t=d.match(/(#|0x)?([a-f0-9]{6})/i))?n=t[2]:(t=d.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?n=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=d.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(n=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),n?"#"+n:!1}const Ft={isPrimitive:!0,match:d=>typeof d=="string",fromHexString:we,toHexString:we},te={isPrimitive:!0,match:d=>typeof d=="number",fromHexString:d=>parseInt(d.substring(1),16),toHexString:d=>"#"+d.toString(16).padStart(6,0)},zt={isPrimitive:!1,match:d=>Array.isArray(d),fromHexString(d,t,n=1){const e=te.fromHexString(d);t[0]=(e>>16&255)/255*n,t[1]=(e>>8&255)/255*n,t[2]=(e&255)/255*n},toHexString([d,t,n],e=1){e=255/e;const s=d*e<<16^t*e<<8^n*e<<0;return te.toHexString(s)}},jt={isPrimitive:!1,match:d=>Object(d)===d,fromHexString(d,t,n=1){const e=te.fromHexString(d);t.r=(e>>16&255)/255*n,t.g=(e>>8&255)/255*n,t.b=(e&255)/255*n},toHexString({r:d,g:t,b:n},e=1){e=255/e;const s=d*e<<16^t*e<<8^n*e<<0;return te.toHexString(s)}},Nt=[Ft,te,zt,jt];function Wt(d){return Nt.find(t=>t.match(d))}class Ht extends R{constructor(t,n,e,s){super(t,n,e,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Wt(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=we(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const n=this._format.fromHexString(t);this.setValue(n)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class fe extends R{constructor(t,n,e){super(t,n,e,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Vt extends R{constructor(t,n,e,s,o,c){super(t,n,e,"number"),this._initInput(),this.min(s),this.max(o);const r=c!==void 0;this.step(r?c:this._getImplicitStep(),r),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,n=!0){return this._step=t,this._stepExplicit=n,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let n=(t-this._min)/(this._max-this._min);n=Math.max(0,Math.min(n,1)),this.$fill.style.width=n*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const n=()=>{let h=parseFloat(this.$input.value);isNaN(h)||(this._stepExplicit&&(h=this._snap(h)),this.setValue(this._clamp(h)))},e=h=>{const u=parseFloat(this.$input.value);isNaN(u)||(this._snapClampSetValue(u+h),this.$input.value=this.getValue())},s=h=>{h.key==="Enter"&&this.$input.blur(),h.code==="ArrowUp"&&(h.preventDefault(),e(this._step*this._arrowKeyMultiplier(h))),h.code==="ArrowDown"&&(h.preventDefault(),e(this._step*this._arrowKeyMultiplier(h)*-1))},o=h=>{this._inputFocused&&(h.preventDefault(),e(this._step*this._normalizeMouseWheel(h)))};let c=!1,r,p,a,g,f;const v=5,b=h=>{r=h.clientX,p=a=h.clientY,c=!0,g=this.getValue(),f=0,window.addEventListener("mousemove",w),window.addEventListener("mouseup",A)},w=h=>{if(c){const u=h.clientX-r,_=h.clientY-p;Math.abs(_)>v?(h.preventDefault(),this.$input.blur(),c=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(u)>v&&A()}if(!c){const u=h.clientY-a;f-=u*this._step*this._arrowKeyMultiplier(h),g+f>this._max?f=this._max-g:g+f<this._min&&(f=this._min-g),this._snapClampSetValue(g+f)}a=h.clientY},A=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",w),window.removeEventListener("mouseup",A)},E=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",n),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",b),this.$input.addEventListener("focus",E),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(m,h,u,_,k)=>(m-h)/(u-h)*(k-_)+_,n=m=>{const h=this.$slider.getBoundingClientRect();let u=t(m,h.left,h.right,this._min,this._max);this._snapClampSetValue(u)},e=m=>{this._setDraggingStyle(!0),n(m.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",o)},s=m=>{n(m.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",o)};let c=!1,r,p;const a=m=>{m.preventDefault(),this._setDraggingStyle(!0),n(m.touches[0].clientX),c=!1},g=m=>{m.touches.length>1||(this._hasScrollBar?(r=m.touches[0].clientX,p=m.touches[0].clientY,c=!0):a(m),window.addEventListener("touchmove",f,{passive:!1}),window.addEventListener("touchend",v))},f=m=>{if(c){const h=m.touches[0].clientX-r,u=m.touches[0].clientY-p;Math.abs(h)>Math.abs(u)?a(m):(window.removeEventListener("touchmove",f),window.removeEventListener("touchend",v))}else m.preventDefault(),n(m.touches[0].clientX)},v=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",f),window.removeEventListener("touchend",v)},b=this._callOnFinishChange.bind(this),w=400;let A;const E=m=>{if(Math.abs(m.deltaX)<Math.abs(m.deltaY)&&this._hasScrollBar)return;m.preventDefault();const u=this._normalizeMouseWheel(m)*this._step;this._snapClampSetValue(this.getValue()+u),this.$input.value=this.getValue(),clearTimeout(A),A=setTimeout(b,w)};this.$slider.addEventListener("mousedown",e),this.$slider.addEventListener("touchstart",g,{passive:!1}),this.$slider.addEventListener("wheel",E,{passive:!1})}_setDraggingStyle(t,n="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${n}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:n,deltaY:e}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(n=0,e=-t.wheelDelta/120,e*=this._stepExplicit?1:10),n+-e}_arrowKeyMultiplier(t){let n=this._stepExplicit?1:10;return t.shiftKey?n*=10:t.altKey&&(n/=10),n}_snap(t){const n=Math.round(t/this._step)*this._step;return parseFloat(n.toPrecision(15))}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Yt extends R{constructor(t,n,e,s){super(t,n,e,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(n=>{const e=document.createElement("option");e.textContent=n,this.$select.appendChild(e)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),n=this._values.indexOf(t);return this.$select.selectedIndex=n,this.$display.textContent=n===-1?t:this._names[n],this}}class Bt extends R{constructor(t,n,e){super(t,n,e,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Kt=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: none;
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
  }
  .lil-gui button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Xt(d){const t=document.createElement("style");t.innerHTML=d;const n=document.querySelector("head link[rel=stylesheet], head style");n?document.head.insertBefore(t,n):document.head.appendChild(t)}let Je=!1;class Ee{constructor({parent:t,autoPlace:n=t===void 0,container:e,width:s,title:o="Controls",closeFolders:c=!1,injectStyles:r=!0,touchStyles:p=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",a=>{(a.code==="Enter"||a.code==="Space")&&(a.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),p&&this.domElement.classList.add("allow-touch-styles"),!Je&&r&&(Xt(Kt),Je=!0),e?e.appendChild(this.domElement):n&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=c}add(t,n,e,s,o){if(Object(e)===e)return new Yt(this,t,n,e);const c=t[n];switch(typeof c){case"number":return new Vt(this,t,n,e,s,o);case"boolean":return new It(this,t,n);case"string":return new Bt(this,t,n);case"function":return new fe(this,t,n)}console.error(`gui.add failed
	property:`,n,`
	object:`,t,`
	value:`,c)}addColor(t,n,e=1){return new Ht(this,t,n,e)}addFolder(t){const n=new Ee({parent:this,title:t});return this.root._closeFolders&&n.close(),n}load(t,n=!0){return t.controllers&&this.controllers.forEach(e=>{e instanceof fe||e._name in t.controllers&&e.load(t.controllers[e._name])}),n&&t.folders&&this.folders.forEach(e=>{e._title in t.folders&&e.load(t.folders[e._title])}),this}save(t=!0){const n={controllers:{},folders:{}};return this.controllers.forEach(e=>{if(!(e instanceof fe)){if(e._name in n.controllers)throw new Error(`Cannot save GUI with duplicate property "${e._name}"`);n.controllers[e._name]=e.save()}}),t&&this.folders.forEach(e=>{if(e._title in n.folders)throw new Error(`Cannot save GUI with duplicate folder "${e._title}"`);n.folders[e._title]=e.save()}),n}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const n=this.$children.clientHeight;this.$children.style.height=n+"px",this.domElement.classList.add("transition");const e=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",e))};this.$children.addEventListener("transitionend",e);const s=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(e=>e.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(n=>{t=t.concat(n.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(n=>{t=t.concat(n.foldersRecursive())}),t}}var Ut=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Gt(d){return d&&d.__esModule&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d}var Qe={exports:{}};(function(d,t){(function(n,e){d.exports=e()})(Ut,function(){var n=function(){function e(b){return c.appendChild(b.dom),b}function s(b){for(var w=0;w<c.children.length;w++)c.children[w].style.display=w===b?"block":"none";o=b}var o=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",function(b){b.preventDefault(),s(++o%c.children.length)},!1);var r=(performance||Date).now(),p=r,a=0,g=e(new n.Panel("FPS","#0ff","#002")),f=e(new n.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var v=e(new n.Panel("MB","#f08","#201"));return s(0),{REVISION:16,dom:c,addPanel:e,showPanel:s,begin:function(){r=(performance||Date).now()},end:function(){a++;var b=(performance||Date).now();if(f.update(b-r,200),b>p+1e3&&(g.update(1e3*a/(b-p),100),p=b,a=0,v)){var w=performance.memory;v.update(w.usedJSHeapSize/1048576,w.jsHeapSizeLimit/1048576)}return b},update:function(){r=this.end()},domElement:c,setMode:s}};return n.Panel=function(e,s,o){var c=1/0,r=0,p=Math.round,a=p(window.devicePixelRatio||1),g=80*a,f=48*a,v=3*a,b=2*a,w=3*a,A=15*a,E=74*a,m=30*a,h=document.createElement("canvas");h.width=g,h.height=f,h.style.cssText="width:80px;height:48px";var u=h.getContext("2d");return u.font="bold "+9*a+"px Helvetica,Arial,sans-serif",u.textBaseline="top",u.fillStyle=o,u.fillRect(0,0,g,f),u.fillStyle=s,u.fillText(e,v,b),u.fillRect(w,A,E,m),u.fillStyle=o,u.globalAlpha=.9,u.fillRect(w,A,E,m),{dom:h,update:function(_,k){c=Math.min(c,_),r=Math.max(r,_),u.fillStyle=o,u.globalAlpha=1,u.fillRect(0,0,g,A),u.fillStyle=s,u.fillText(p(_)+" "+e+" ("+p(c)+"-"+p(r)+")",v,b),u.drawImage(h,w+a,A,E-a,m,w,A,E-a,m),u.fillRect(w+E-a,A,a,m),u.fillStyle=o,u.globalAlpha=.9,u.fillRect(w+E-a,A,a,p((1-_/k)*m))}}},n})})(Qe);var Zt=Qe.exports;const Jt=Gt(Zt),et={baseRadius:5,height:10,numSpokes:16,spokeThickness:.06,baseWeaverThickness:.05,stakeThickness:.08,weaverThickness:.1,weaverSpacing:.4,patternType:"plainWeave",stakeMaterial:"darkWood",weaverMaterial:"lightWood",baseMaterial:"naturalWood",curveSegments:64,radialSegments:8};function qt(d){const t=[];return d.baseRadius<=0&&t.push("baseRadius must be positive"),d.height<=0&&t.push("height must be positive"),d.numSpokes<8&&t.push("numSpokes must be at least 8 for structural integrity"),d.numSpokes%2!==0&&t.push("numSpokes should be even for proper weaving pattern"),d.weaverSpacing<=0&&t.push("weaverSpacing must be positive"),{valid:t.length===0,errors:t}}const Qt={darkWood:{color:6045747,roughness:.85,metalness:.05},lightWood:{color:13808780,roughness:.8,metalness:.05},naturalWood:{color:9139029,roughness:.82,metalness:.05},rattan:{color:12687979,roughness:.75,metalness:.1},willow:{color:10519149,roughness:.9,metalness:0},bamboo:{color:14932681,roughness:.7,metalness:.15}};class ei{constructor(){this.materials=new Map,this.initialized=!1}initialize(){if(!this.initialized){for(const[t,n]of Object.entries(Qt)){const e=new Xe({color:n.color,roughness:n.roughness,metalness:n.metalness});this.materials.set(t,e)}this.initialized=!0}}getMaterial(t){this.initialized||this.initialize();const n=this.materials.get(t);return n||(console.warn(`Material "${t}" not found, using naturalWood as fallback`),this.materials.get("naturalWood"))}createCustomMaterial(t){return new Xe({color:t.color||9139029,roughness:t.roughness||.8,metalness:t.metalness||.05,...t})}dispose(){for(const t of this.materials.values())t.dispose();this.materials.clear(),this.initialized=!1}getAvailableMaterials(){return Array.from(this.materials.keys())}}const N=new ei;class ti{static createRadialBase(t){const{numSpokes:n,spokeThickness:e,baseRadius:s,baseMaterial:o,radialSegments:c=8}=t,r=[],p=[];for(let g=0;g<n;g++){const f=g/n*Math.PI*2,v=new M(0,0,0),b=new M(Math.cos(f)*s,0,Math.sin(f)*s),w=new M().subVectors(b,v),A=w.length(),E=new M().addVectors(v,b).multiplyScalar(.5),m=new ye(e,e,A,c),h=N.getMaterial(o||"naturalWood"),u=new V(m,h);u.position.copy(E);const _=new M(0,1,0),k=new le().setFromUnitVectors(_,w.normalize());u.quaternion.copy(k),r.push(u),p.push({angle:f,position:b.clone(),index:g})}const a=this.createBaseWeaver(t,p);return a&&r.push(a),{meshes:r,spokePositions:p}}static createBaseWeaver(t,n){const{baseRadius:e,baseWeaverThickness:s,weaverMaterial:o,curveSegments:c=64,radialSegments:r=8}=t,p=[],a=c;for(let w=0;w<=a;w++){const A=w/a,E=A*Math.PI*2,h=Math.floor(A*n.length)%2===0,u=1.5,_=h?s*u:-s*u,T=e*.3+_,C=Math.cos(E)*T,L=Math.sin(E)*T,I=h?s:-s*.5;p.push(new M(C,I,L))}const g=new ve(p);g.closed=!0;const f=new Ae(g,c,s,r,!0),v=N.getMaterial(o||"lightWood");return new V(f,v)}static createFlatBase(t){const{baseRadius:n,numSpokes:e,baseMaterial:s}=t,o=new Ct(n,32),c=N.getMaterial(s||"naturalWood"),r=new V(o,c);r.rotation.x=-Math.PI/2;const p=[];for(let a=0;a<e;a++){const g=a/e*Math.PI*2;p.push({angle:g,position:new M(Math.cos(g)*n,0,Math.sin(g)*n),index:a})}return{meshes:[r],spokePositions:p}}static dispose(t){t.forEach(n=>{n.geometry&&n.geometry.dispose(),n.material&&n.material.dispose()})}}class ii{static createStakes(t,n){const{height:e,stakeThickness:s,stakeMaterial:o,radialSegments:c=8}=t,r=[],p=[];return n.forEach(a=>{const g=new ye(s,s,e,c),f=N.getMaterial(o||"darkWood"),v=new V(g,f);v.position.set(a.position.x,e/2,a.position.z),r.push(v),p.push({angle:a.angle,basePosition:a.position.clone(),topPosition:new M(a.position.x,e,a.position.z),index:a.index})}),{meshes:r,positions:p}}static createCurvedStakes(t,n,e=.3){const{height:s,stakeThickness:o,baseRadius:c,stakeMaterial:r,curveSegments:p=32,radialSegments:a=8}=t,g=[],f=[];return n.forEach(v=>{const b=[],w=p;for(let _=0;_<=w;_++){const k=_/w,T=k*s,C=Math.sin(k*Math.PI/2),L=c+C*e*c,I=Math.cos(v.angle)*L,J=Math.sin(v.angle)*L;b.push(new M(I,T,J))}const A=new ve(b),E=new Ae(A,p,o,a,!1),m=N.getMaterial(r||"darkWood"),h=new V(E,m);g.push(h);const u=b[b.length-1];f.push({angle:v.angle,basePosition:v.position.clone(),topPosition:u.clone(),index:v.index,curve:A})}),{meshes:g,positions:f}}static dispose(t){t.forEach(n=>{n.geometry&&n.geometry.dispose(),n.material&&n.material.dispose()})}}class ni{constructor(t){this.config=t,this.weaverMeshes=[]}generateWeavers(t,n,e){throw new Error("BasePattern.generateWeavers() must be implemented by subclass")}dispose(){this.weaverMeshes.forEach(t=>{t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}),this.weaverMeshes=[]}getParameters(){return{}}createTubeFromPoints(t,n,e=!1){const s=new ve(t);return s.closed=e,new Ae(s,this.config.curveSegments||64,n,this.config.radialSegments||8,e)}createCylinderBetweenPoints(t,n,e){const s=new M().subVectors(n,t),o=s.length(),c=new M().addVectors(t,n).multiplyScalar(.5),r=new ye(e,e,o,this.config.radialSegments||8),p=new V(r);p.position.copy(c);const a=new M(0,1,0),g=new le().setFromUnitVectors(a,s.normalize());return p.quaternion.copy(g),p}calculateOverUnder(t,n,e="over1under1"){switch(e){case"over1under1":return(t+n)%2===0;case"over2under2":return Math.floor((t+n)/2)%2===0;case"over3under1":return(t+n)%4!==3;default:return(t+n)%2===0}}getMaterial(t=null){const n=t||this.config.weaverMaterial||"lightWood";return N.getMaterial(n)}calculateRadialOffset(t,n){return t?n*2.5:-n*2.5}smoothTransition(t,n,e){const s=(1-Math.cos(t*Math.PI))/2;return n+(e-n)*s}findNearestStakeIndex(t,n){const e=(t%(Math.PI*2)+Math.PI*2)%(Math.PI*2);return Math.round(e/(Math.PI*2)*n)%n}}class si extends ni{constructor(t){super(t)}generateWeavers(t,n,e){const{weaverThickness:s,weaverSpacing:o,weaverMaterial:c}=this.config,r=[];t.length;const p=Math.floor(e/o);for(let a=0;a<p;a++){const g=a*o+o/2,f=this.createWeaverRow(t,n,g,a,s);f&&r.push(f)}return this.weaverMeshes=r,r}createWeaverRow(t,n,e,s,o){const c=t.length,r=[],a=c*10;for(let b=0;b<=a;b++){const w=b/a,A=w*Math.PI*2,E=Math.floor(w*c)%c,m=(E+1)%c,h=this.calculateOverUnder(E,s,"over1under1"),u=w*c%1,_=this.calculateRadialOffset(h,o),k=this.calculateOverUnder(m,s,"over1under1"),T=this.calculateRadialOffset(k,o);let C=_;if(u>.6&&u<1){const H=(u-.6)/.4;C=this.smoothTransition(H,_,T)}const L=n+C,I=Math.cos(A)*L,J=Math.sin(A)*L,Y=h?o*.3:-o*.3;r.push(new M(I,e+Y,J))}const g=this.createTubeFromPoints(r,o,!0),f=this.getMaterial(weaverMaterial);return s%2===1&&f.color.multiplyScalar(.95),new V(g,f)}getParameters(){return{weaverSpacing:{min:.2,max:.8,step:.05,default:.4,label:"Weaver Spacing"},weaverThickness:{min:.05,max:.2,step:.01,default:.1,label:"Weaver Thickness"}}}}const be={plainWeave:si};class oi{constructor(t,n){this.scene=t,this.config=n,this.baseMeshes=[],this.stakeMeshes=[],this.weaverMeshes=[],this.spokePositions=null,this.stakePositions=null,this.pattern=null,N.initialize()}create(){const t=qt(this.config);if(!t.valid){console.error("Invalid basket configuration:",t.errors);return}this.clear(),this.createBase(),this.createStakes(),this.createWeaving()}createBase(){const t=ti.createRadialBase(this.config);this.baseMeshes=t.meshes,this.spokePositions=t.spokePositions,this.baseMeshes.forEach(n=>this.scene.add(n))}createStakes(){if(!this.spokePositions){console.error("Cannot create stakes: base not created");return}const t=ii.createStakes(this.config,this.spokePositions);this.stakeMeshes=t.meshes,this.stakePositions=t.positions,this.stakeMeshes.forEach(n=>this.scene.add(n))}createWeaving(){if(!this.stakePositions){console.error("Cannot create weaving: stakes not created");return}const t=be[this.config.patternType];if(!t){console.error(`Pattern "${this.config.patternType}" not found in registry`);return}this.pattern=new t(this.config);const n=this.pattern.generateWeavers(this.stakePositions,this.config.baseRadius,this.config.height);this.weaverMeshes=n,this.weaverMeshes.forEach(e=>this.scene.add(e))}clear(){this.baseMeshes.forEach(t=>{this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}),this.baseMeshes=[],this.stakeMeshes.forEach(t=>{this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}),this.stakeMeshes=[],this.weaverMeshes.forEach(t=>{this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}),this.weaverMeshes=[],this.pattern&&(this.pattern.dispose(),this.pattern=null),this.spokePositions=null,this.stakePositions=null}updateConfig(t){this.config={...this.config,...t},this.create()}setPattern(t){if(!be[t]){console.error(`Pattern "${t}" not available`);return}this.config.patternType=t,this.create()}getAvailablePatterns(){return Object.keys(be)}getPatternParameters(){return this.pattern?this.pattern.getParameters():{}}dispose(){this.clear(),N.dispose()}}const G=new kt;G.background=new Pt(16119285);const ie=new St(50,window.innerWidth/window.innerHeight,.1,1e3);ie.position.set(15,12,15);const W=new Lt({antialias:!0});W.setSize(window.innerWidth,window.innerHeight);W.setPixelRatio(Math.min(window.devicePixelRatio,2));document.getElementById("canvas-container").appendChild(W.domElement);const ne=new Rt(ie,W.domElement);ne.enableDamping=!0;ne.dampingFactor=.05;ne.target.set(0,et.height/2,0);ne.update();const ai=new $t(16777215,4473924,.6);G.add(ai);const tt=new Ot(16777215,.8);tt.position.set(5,10,7);G.add(tt);const ri=new Tt(16777215,.3);G.add(ri);const P={...et},$=new oi(G,P);$.create();const Z=new Ee;Z.title("Basket Weaving Simulator");const xe=Z.addFolder("Dimensions");xe.add(P,"baseRadius",3,10,.5).name("Basket Radius").onChange(()=>$.updateConfig(P));xe.add(P,"height",5,20,.5).name("Basket Height").onChange(()=>$.updateConfig(P));xe.open();const Me=Z.addFolder("Structure");Me.add(P,"numSpokes",8,32,2).name("Number of Spokes").onChange(()=>$.updateConfig(P));Me.add(P,"stakeThickness",.04,.15,.01).name("Stake Thickness").onChange(()=>$.updateConfig(P));Me.open();const _e=Z.addFolder("Weaving");_e.add(P,"weaverThickness",.05,.2,.01).name("Weaver Thickness").onChange(()=>$.updateConfig(P));_e.add(P,"weaverSpacing",.2,.8,.05).name("Weaver Spacing").onChange(()=>$.updateConfig(P));_e.open();const it=Z.addFolder("Pattern"),qe=$.getAvailablePatterns();if(qe.length>1){const d={};qe.forEach(t=>{d[t]=t}),it.add(P,"patternType",d).name("Weaving Pattern").onChange(t=>$.setPattern(t))}it.open();const Ce=Z.addFolder("Materials"),ke={darkWood:"Dark Wood",lightWood:"Light Wood",naturalWood:"Natural Wood",rattan:"Rattan",willow:"Willow",bamboo:"Bamboo"};Ce.add(P,"stakeMaterial",ke).name("Stake Material").onChange(()=>$.updateConfig(P));Ce.add(P,"weaverMaterial",ke).name("Weaver Material").onChange(()=>$.updateConfig(P));Ce.add(P,"baseMaterial",ke).name("Base Material").onChange(()=>$.updateConfig(P));const ce=new Jt;ce.showPanel(0);document.body.appendChild(ce.dom);function nt(){requestAnimationFrame(nt),ce.begin(),ne.update(),W.render(G,ie),ce.end()}nt();window.addEventListener("resize",()=>{ie.aspect=window.innerWidth/window.innerHeight,ie.updateProjectionMatrix(),W.setSize(window.innerWidth,window.innerHeight),W.setPixelRatio(Math.min(window.devicePixelRatio,2))});window.addEventListener("beforeunload",()=>{$.dispose(),W.dispose()});

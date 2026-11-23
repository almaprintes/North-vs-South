/* NORTH vs SOUTH DEV 0.3 — procedural 3D articulated fighters.
 * No photographic warping, external packages, or network dependencies.
 * Contest arms: fixed-length upper arm and forearm; moving elbow contact remains
 * on each player's own pad. Left (player) wins on the RIGHT red pin pad.
 */
(function(global){
'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),mix=(a,b,t)=>a+(b-a)*t;
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2], norm=v=>{let l=Math.hypot(...v)||1;return v.map(x=>x/l)};
const dist=(a,b)=>Math.hypot(...sub(a,b));
function persp(fov,aspect,n,f){const t=1/Math.tan(fov/2);return new Float32Array([t/aspect,0,0,0,0,t,0,0,0,0,(f+n)/(n-f),-1,0,0,2*f*n/(n-f),0]);}
function lookAt(eye,at){let z=norm(sub(eye,at)),x=norm(cross([0,1,0],z)),y=cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1]);}
function model(center,bx,by,bz){return new Float32Array([bx[0],bx[1],bx[2],0,by[0],by[1],by[2],0,bz[0],bz[1],bz[2],0,center[0],center[1],center[2],1]);}
function shapeSphere(segments=20,rings=13){const a=[],ix=[];for(let j=0;j<=rings;j++){const phi=j/rings*Math.PI;for(let i=0;i<=segments;i++){let th=i/segments*Math.PI*2,x=Math.sin(phi)*Math.cos(th),y=Math.cos(phi),z=Math.sin(phi)*Math.sin(th);a.push(x,y,z,x,y,z)}}for(let j=0;j<rings;j++)for(let i=0;i<segments;i++){let p=j*(segments+1)+i,q=p+segments+1;ix.push(p,q,p+1,q,q+1,p+1)}return {a,ix}}
function shapeBox(){const a=[],ix=[];for(const f of [
 [[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1],[0,0,1]],
 [[1,-1,-1],[-1,-1,-1],[-1,1,-1],[1,1,-1],[0,0,-1]],
 [[-1,-1,-1],[-1,-1,1],[-1,1,1],[-1,1,-1],[-1,0,0]],
 [[1,-1,1],[1,-1,-1],[1,1,-1],[1,1,1],[1,0,0]],
 [[-1,1,1],[1,1,1],[1,1,-1],[-1,1,-1],[0,1,0]],
 [[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1],[0,-1,0]]]){const start=a.length/6;for(let i=0;i<4;i++)a.push(...f[i],...f[4]);ix.push(start,start+1,start+2,start,start+2,start+3);}return {a,ix}}
function shapeCylinder(segments=20){const a=[],ix=[];for(let i=0;i<=segments;i++){let t=i/segments*2*Math.PI,c=Math.cos(t),s=Math.sin(t);a.push(c,-.5,s,c,0,s,c,.5,s,c,0,s)}for(let i=0;i<segments;i++){let p=2*i;ix.push(p,p+2,p+1,p+1,p+2,p+3)}for(const [y,sign] of [[-.5,-1],[.5,1]]){const center=a.length/6;a.push(0,y,0,0,sign,0);for(let i=0;i<=segments;i++){let t=i/segments*2*Math.PI;a.push(Math.cos(t),y,Math.sin(t),0,sign,0)}for(let i=0;i<segments;i++){if(sign>0)ix.push(center,center+i+1,center+i+2);else ix.push(center,center+i+2,center+i+1)}}return {a,ix}}
// This IK model is usable even without WebGL and is covered by numerical tests.
function poseAt(side,s){
 const eX=side*.53,eY=.757,grip=[.38*s,1.55-.72*Math.pow(Math.abs(s),1.22),.25];
 const wrist=[grip[0]+side*.095,grip[1]-.01,grip[2]];
 const reachX=wrist[0]-eX,reachY=wrist[1]-eY;
 const forearmLength=.975;
 const dz=Math.sqrt(Math.max(.006,forearmLength*forearmLength-reachX*reachX-reachY*reachY));
 const elbow=[eX,eY,grip[2]-dz];
 const shX=side*1.13,shY=1.43,upperarmLength=1.06;
 const shoulder=[shX,shY,elbow[2]+Math.sqrt(Math.max(.008,upperarmLength*upperarmLength-(shX-eX)**2-(shY-eY)**2))];
 return {side,grip,wrist,elbow,shoulder,forearm:dist(elbow,wrist),upperarm:dist(elbow,shoulder),pin:Math.abs(s)>=.999,
   freeHand:[side*1.43,1.015,.74],freeElbow:[side*1.69,.97,.26],freeShoulder:[side*1.74,1.51,shoulder[2]-.25]};
}
function poseAtPct(pct){const s=(clamp(pct,0,100)-50)/50;return {percent:clamp(pct,0,100),left:poseAt(-1,s),right:poseAt(1,s),pinPad:s>=.999?'RED':s<=-.999?'BLUE':null}}
const COL={blue:[.045,.38,.9],blueLite:[.17,.67,1],blueDark:[.025,.12,.31],red:[.85,.075,.11],redLite:[1,.25,.23],redDark:[.32,.025,.055],skinL:[.68,.37,.23],skinR:[.55,.29,.19],hairL:[.24,.15,.09],hairR:[.06,.038,.047],steel:[.22,.29,.39],steelHi:[.56,.68,.82],black:[.035,.053,.087],gold:[.99,.67,.23],white:[.91,.91,.96],padBlue:[.035,.23,.62],padRed:[.58,.035,.09],arena:[.06,.09,.16]};
function create(canvas){if(!canvas)return null;let gl;try{gl=canvas.getContext('webgl2',{alpha:true,antialias:true,depth:true,stencil:false,preserveDrawingBuffer:false,powerPreference:'high-performance'});}catch{}if(!gl)return null;
const vs=`#version 300 es
precision highp float;layout(location=0)in vec3 aPos;layout(location=1)in vec3 aNormal;uniform mat4 uProj,uView,uModel;out vec3 vWorld,vNormal;void main(){vec4 p=uModel*vec4(aPos,1.);vWorld=p.xyz;vNormal=normalize(mat3(uModel)*aNormal);gl_Position=uProj*uView*p;}`;
const fs=`#version 300 es
precision highp float;in vec3 vWorld,vNormal;uniform vec3 uColor;uniform float uGloss;out vec4 color;void main(){vec3 n=normalize(vNormal);vec3 key=normalize(vec3(-.45,.85,1.));vec3 fill=normalize(vec3(.75,.42,.68));vec3 view=normalize(vec3(0.,2.9,7.5)-vWorld);float kd=max(dot(n,key),0.);float fd=max(dot(n,fill),0.);float spec=pow(max(dot(n,normalize(key+view)),0.),22.)*uGloss;float rim=pow(1.-max(dot(n,view),0.),2.)*.21;vec3 c=uColor*(.26+kd*.76)+vec3(.11,.32,.72)*fd*.26*uColor+vec3(.85,.11,.17)*max(dot(n,normalize(vec3(.65,.45,-.3))),0.)*.15*uColor+vec3(.94,.86,.81)*spec*.23+vec3(.24,.45,.76)*rim; color=vec4(c,1.);}`;
function shader(type,src){let s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s}
let program;try{program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vs));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));}catch(e){console.warn('NVS 3D shader unavailable',e);return null;}
const uni={p:gl.getUniformLocation(program,'uProj'),v:gl.getUniformLocation(program,'uView'),m:gl.getUniformLocation(program,'uModel'),c:gl.getUniformLocation(program,'uColor'),g:gl.getUniformLocation(program,'uGloss')};
function mesh(s){let vao=gl.createVertexArray();gl.bindVertexArray(vao);let vbo=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vbo);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(s.a),gl.STATIC_DRAW);let ibo=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibo);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(s.ix),gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,24,0);gl.enableVertexAttribArray(1);gl.vertexAttribPointer(1,3,gl.FLOAT,false,24,12);gl.bindVertexArray(null);return{vao,count:s.ix.length}}
const sphere=mesh(shapeSphere()),cube=mesh(shapeBox()),cylinder=mesh(shapeCylinder());
let calls=0;function draw(geo,mat,color,gloss=.38){gl.uniformMatrix4fv(uni.m,false,mat);gl.uniform3fv(uni.c,color);gl.uniform1f(uni.g,gloss);gl.bindVertexArray(geo.vao);gl.drawElements(gl.TRIANGLES,geo.count,gl.UNSIGNED_SHORT,0);calls++}
function oval(p,r,c,g=.43,angle=0){let co=Math.cos(angle),si=Math.sin(angle);draw(sphere,model(p,[r[0]*co,r[0]*si,0],[-r[1]*si,r[1]*co,0],[0,0,r[2]]),c,g)}
function block(p,r,c,g=.48){draw(cube,model(p,[r[0],0,0],[0,r[1],0],[0,0,r[2]]),c,g)}
function rod(a,b,r,c,g=.36){const dir=norm(sub(b,a));let h=Math.abs(dir[1])>.94?[0,0,1]:[0,1,0];let x=norm(cross(h,dir)),z=norm(cross(dir,x));let p=a.map((v,i)=>(v+b[i])*.5);draw(cylinder,model(p,x.map(v=>v*r),sub(b,a),z.map(v=>v*r)),c,g)}
function capsule(a,b,r,c,g=.32){rod(a,b,r,c,g);oval(a,[r,r,r],c,g);oval(b,[r,r,r],c,g)}
function spectator(x,y,z,color){oval([x,y,z],[.075,.10,.07],color,.08)}
function table(){
 // Dark floor and stage, table top, restrained blue/red lighting.
 block([0,-.14,0],[7.2,.12,4.5],COL.black,.06);
 block([0,.38,0],[1.75,.15,.97],COL.steel,.72);
 block([0,.49,0],[1.80,.055,1.03],COL.black,.80);
 block([0,.565,-.005],[1.72,.035,.95],[.24,.34,.43],.75);
 block([0,.52,.85],[1.80,.09,.13],[.11,.15,.22],.83);
 block([-1.50,.51,.94],[.24,.07,.09],COL.blueLite,1);block([1.50,.51,.94],[.24,.07,.09],COL.redLite,1);
 block([0,.17,0],[.32,.37,.26],COL.steel,.46);
 block([0,.40,.97],[.6,.12,.035],COL.black,.64);
 block([-.75,.42,.96],[.13,.04,.05],COL.blueLite,.88);block([.75,.42,.96],[.13,.04,.05],COL.redLite,.88);
 // Each player's elbow cushion is behind the pin cushion, with enough depth
 // for elbow sliding while maintaining a constant forearm bone length.
 block([-.53,.655,-.40],[.31,.095,.49],COL.padBlue,.52);
 block([.53,.655,-.40],[.31,.095,.49],COL.padRed,.52);
 // PIN cushions, towards the opponent's half, are small and close to the clasp arc.
 block([-.38,.658,.30],[.31,.12,.23],COL.padBlue,.47);
 block([.38,.658,.30],[.31,.12,.23],COL.padRed,.47);
 for(let s of [-1,1]){
    const x=1.43*s;
    rod([x,.50,.74],[x,1.05,.74],.055,COL.steelHi,.9);
    oval([x,1.055,.74],[.087,.055,.087],COL.black,.55);
 }
}
function stage(t){
 block([0,1.95,-3.30],[4.15,1.5,.11],[.028,.043,.09],.07);
 block([-2.26,2.40,-3.05],[.58,1.13,.08],[.035,.17,.43],.21);
 block([2.26,2.40,-3.05],[.58,1.13,.08],[.36,.041,.065],.21);
 for(let i=-3;i<=3;i++){let x=i*.95;
    block([x,3.38,-3.0],[.17,.07,.05],i<0?COL.blueLite:COL.redLite,1);
 }
 // A small distant, low-contrast audience (not hands or athletes).
 for(let j=0;j<3;j++)for(let i=0;i<18;i++){
   let x=(i-8.5)*.46+(j%2)*.17,z=-2.65+(j%2)*.12;
   spectator(x,1.03+j*.24,z,((i+j)%4===0)?[.14,.21,.33]:[.085,.12,.20]);
 }
}
function fighter(side,s,energy,time,active){
 // A fighter occupies ONE side only. Free hand is fixed to that same side's peg.
 const left=side<0,shirt=left?COL.blue:COL.red,shirtDark=left?COL.blueDark:COL.redDark;
 const skin=left?COL.skinL:COL.skinR,hair=left?COL.hairL:COL.hairR;
 const sf=left?1:-1, push=(left?s:-s),strain=clamp(Math.abs(s)*.8+(100-energy)/170,0,1);
 const rig=poseAt(side,s);
 const {elbow,wrist,shoulder}=rig;
 const gripX=rig.grip[0],gripY=rig.grip[1],gripZ=rig.grip[2];
 const shZ=shoulder[2];
 const bX=side*1.55-.13*s,bZ=shZ-.20;
 // Legs and dark pants, torso follows shoulder depth but stays on its own side.
 oval([bX, .72,bZ-.23],[.51,.51,.42],COL.black,.12);
 oval([bX,1.29,bZ],[.57,.72,.40],shirtDark,.25,side*.065);
 oval([bX-side*.035,1.47,bZ+.095],[.48,.44,.41],shirt,.35,side*.07);
 // Fabric edge, chest highlight, sleeve.
 oval([bX+.02*sf,1.45,bZ+.39],[.27,.28,.055],shirt,.40);
 const neck=[shoulder[0]+side*.20,1.81,shZ-.11];
 capsule([neck[0],1.66,neck[2]],[neck[0],1.98,neck[2]],.16,skin,.18);
 const head=[neck[0]+side*.025,2.14,neck[2]+.02];
 oval(head,[.29,.335,.265],skin,.25);
 oval([head[0],head[1]+.21,head[2]-.05],[.30,.15,.28],hair,.18);
 // Ears/eyebrows/eyes/mouth all attached to the head, no image stretching.
 oval([head[0]-side*.235,head[1]-.02,head[2]+.015],[.065,.09,.055],skin,.22);
 for(let eye of [-1,1]){
  const ex=head[0]+eye*.105;
  oval([ex,head[1]+.055,head[2]+.247],[.048,.028,.025],COL.black,.22);
  oval([ex,head[1]+.095,head[2]+.259],[.067,.022,.025],hair,.12);
 }
 oval([head[0],head[1]-.13,head[2]+.234],[.12,.029,.033],hair,.10);
 // Visible tattoo/stripe on shoulder is a real 3D small mesh.
 const sleeve=[shoulder[0]+side*.08,shoulder[1]-.10,shoulder[2]-.03];
 oval(sleeve,[.27,.26,.25],shirt,.34);
 capsule(shoulder,elbow,.185,skin,.26);
 // Forearm and elbow are REAL rigid links, always exactly 0.975 units.
 capsule(elbow,wrist,.143,skin,.58);
 oval(elbow,[.185,.12,.19],skin,.30);
 // Wrist band at hand; hands are modeled separately but connect to a shared grip.
 const wristBand=add(wrist,sub(elbow,wrist).map(v=>v*.11));
 oval(wristBand,[.16,.15,.16],shirt,.8);
 oval(wrist,[.165,.14,.18],skin,.4);
 // Free arm of each fighter grabs the peg ON HIS OWN SIDE (no crossover).
 const freeShoulder=[side*1.74,1.51,bZ-.05];
 const freeElbow=[side*1.69,.97,.26];
 const freeHand=[side*1.43,1.015,.74];
 capsule(freeShoulder,freeElbow,.145,skin,.28);
 capsule(freeElbow,freeHand,.108,skin,.35);
 oval(freeHand,[.14,.17,.12],skin,.30);
 // Minor natural breathing is applied to posture/face only, not to bone length.
 if(active&&Math.sin(time*7+sf)>0.97){oval([head[0],head[1]-.145,head[2]+.238],[.12,.039,.037],hair,.13)}
 return {elbow,wrist,shoulder,forearm:dist(elbow,wrist),upperarm:dist(elbow,shoulder),grip:[gripX,gripY,gripZ],pin:Math.abs(s)>=.999};
}
let shown=50,lastTime=0,ready=true,diag=null;
function render(pos=50,elapsed=0,energy=100,enemyEnergy=100,active=false){
 if(!ready)return false;const t=performance.now(),dt=lastTime?Math.min(.065,(t-lastTime)/1000):.016;lastTime=t;
 const desired=clamp(pos,0,100);shown+=(desired-shown)*Math.min(1,dt*12);if(Math.abs(shown-desired)<.03)shown=desired;
 // Only the UI is allowed to shake a little; never stretch a limb.
 const s=(shown-50)/50;
 const w=canvas.clientWidth||760,h=canvas.clientHeight||570,dpr=Math.min(2,window.devicePixelRatio||1);
 const rw=Math.min(1140,Math.max(2,Math.round(w*dpr))),rh=Math.min(855,Math.max(2,Math.round(h*dpr)));
 if(canvas.width!==rw||canvas.height!==rh){canvas.width=rw;canvas.height=rh;gl.viewport(0,0,rw,rh)}
 gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(program);
 gl.uniformMatrix4fv(uni.p,false,persp(Math.PI*.215,rw/rh,.1,40));gl.uniformMatrix4fv(uni.v,false,lookAt([0,2.87,6.80],[0,1.40,-.08]));
 calls=0;stage(elapsed);table();
 // Draw athletes from far to near: both own pad, both own peg.
 const blue=fighter(-1,s,energy,elapsed,active);
 const red=fighter(1,s,enemyEnergy,elapsed,active);
 // Their RIGHT hands grasp at a shared stationary-size object, only move as a unit.
 const grasp=blue.grip;oval(grasp,[.13,.135,.15],mixColor(COL.skinL,COL.skinR,.5),.40);
 // Small knuckles/fingers, no disembodied crossed hands.
 for(let i=-1;i<=1;i++){oval([grasp[0]+i*.065,grasp[1]+.07,grasp[2]+.09],[.055,.048,.055],i<0?COL.skinL:COL.skinR,.42)}
 diag={pos:shown,grip:[...grasp],blueElbow:[...blue.elbow],redElbow:[...red.elbow],blueForearm:blue.forearm,redForearm:red.forearm,blueUpperarm:blue.upperarm,redUpperarm:red.upperarm,contactsPin:Math.abs(s)>=.997,pinPad:s>0?'RED':s<0?'BLUE':'NONE',drawCalls:calls};
 return true;
}
function mixColor(a,b,t){return a.map((v,i)=>mix(v,b[i],t))}
function inspect(value){const prev=shown;shown=clamp(value,0,100);render(value,0,100,100,false);let out={...diag};shown=prev;return out}
function reset(value=50){shown=value;lastTime=0}
return{render,inspect,reset,available:true,getDiagnostics:()=>diag};
}
global.NVSArmRig={create,pose:poseAtPct};
})(window);
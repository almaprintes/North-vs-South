/* NVS 0.3 accessible fallback: articulated 2D projection of the SAME 3D IK
   joints — not a photo morph, warp, sprite swap or floating marker. */
(function(global){'use strict';
const pose=()=>global.NVSArmRig?.pose;
function create(canvas){const c=canvas.getContext('2d');if(!c||!pose())return null;
const W=760,H=570;const project=p=>[W/2+p[0]*169 +p[2]*.9,500-p[1]*164+p[2]*20];
function line(a,b,weight,color){let x=project(a),y=project(b);c.beginPath();c.moveTo(...x);c.lineTo(...y);c.strokeStyle=color;c.lineWidth=weight;c.lineCap='round';c.lineJoin='round';c.stroke()}
function circle(x,y,r,color){c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=color;c.fill()}
function ellipse(x,y,rx,ry,color,rot=0){c.beginPath();c.ellipse(x,y,rx,ry,rot,0,Math.PI*2);c.fillStyle=color;c.fill()}
function capsule(a,b,r,col,outline='#0c1725'){let x=project(a),y=project(b);c.beginPath();c.moveTo(...x);c.lineTo(...y);c.lineCap='round';c.lineWidth=r*2+5;c.strokeStyle=outline;c.stroke();c.strokeStyle=col;c.lineWidth=r*2;c.stroke();const hi=c.createLinearGradient(x[0],x[1]-r,y[0],y[1]+r);hi.addColorStop(0,'#ffffff30');hi.addColorStop(1,'#00000000');c.strokeStyle=hi;c.lineWidth=r*.42;c.stroke()}
function roundedRect(x,y,w,h,r,color){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill()}
function gradient(y1,y2,stops){let g=c.createLinearGradient(0,y1,0,y2);stops.forEach(([p,v])=>g.addColorStop(p,v));return g}
function drawStadium(t){
 c.fillStyle=gradient(0,H,[[0,'#0c182b'],[.6,'#132942'],[1,'#081120']]);c.fillRect(0,0,W,H);
 let spot=c.createRadialGradient(196,80,20,196,210,330);spot.addColorStop(0,'#2568cb77');spot.addColorStop(1,'#122b5400');c.fillStyle=spot;c.fillRect(0,0,W,H);
 spot=c.createRadialGradient(564,70,20,564,190,330);spot.addColorStop(0,'#cb263f65');spot.addColorStop(1,'#541c3200');c.fillStyle=spot;c.fillRect(0,0,W,H);
 roundedRect(150,0,470,39,4,'#182d4a');roundedRect(160,8,440,19,5,'#384d6b');for(let i=0;i<12;i++){let x=176+i*37;roundedRect(x,10,17,12,3,i<6?'#75bbfa':'#fb9283')}
 for(let j=0;j<4;j++)for(let i=0;i<23;i++){let x=21+i*33+(j%2)*7,y=172+j*32+(i%3)*5;circle(x,y,8+(i%3)*2,j%2?'#273f5b':'#24334f');circle(x,y-12,5,'#455875')}
 c.font='900 20px system-ui';c.textAlign='center';c.fillStyle='#83bdff';c.fillText('NORTH',132,84);c.fillStyle='#f49a97';c.fillText('SOUTH',626,84);
}
function drawTable(){
 roundedRect(54,376,652,72,16,gradient(376,448,[[0,'#657c93'],[.28,'#2d3e53'],[1,'#0e1625']]));
 roundedRect(62,389,636,12,4,'#8998aa');
 roundedRect(75,448,610,48,10,'#111b2d');roundedRect(110,475,540,26,7,'#263247');
 roundedRect(152,494,36,77,7,'#1a2a43');roundedRect(578,494,36,77,7,'#1a2a43');
 roundedRect(242,496,275,31,7,'#0c1726');c.font='900 17px system-ui';c.textAlign='center';c.fillStyle='#e0d7cc';c.fillText('NORTH   VS   SOUTH',380,518);
 roundedRect(259,352,130,40,12,'#164b88');roundedRect(372,352,130,40,12,'#8a2738');
 // Opponent pin pads are low to the table and must actually be touched at pin.
 roundedRect(284,368,70,25,8,'#1352a0');roundedRect(406,368,70,25,8,'#a12d3a');
 for(const [x,col] of [[153,'#91c7e8'],[607,'#e5a1a4']]){roundedRect(x-15,323,30,70,8,'#0b1526');roundedRect(x-8,315,16,79,5,col)}
}
function drawFighter(data,left,energy,elapsed){const side=left?-1:1,shirt=left?'#2065bb':'#b92d3c',shade=left?'#143c78':'#6f1d2c',skin=left?'#b96f4f':'#a45d43',hair=left?'#765038':'#17141c';
 const sh=data.shoulder,elb=data.elbow,wrist=data.wrist;
 const shPix=project(sh);const head=[sh[0]+side*.22,2.12,sh[2]-.09];const phead=project(head);
 const torso=[side*1.47,1.32,sh[2]-.31],pTorso=project(torso);
 c.save();c.shadowColor='#000c';c.shadowBlur=14;
 ellipse(pTorso[0],pTorso[1]+20,96,117,shade,side*.08);
 ellipse(pTorso[0]+side*8,pTorso[1],80,92,shirt,side*.06);
 c.shadowBlur=0;
 // Neck and head: stable shapes, not deformed image pixels.
 capsule([head[0],1.84,head[2]],[head[0],2.02,head[2]],16,skin);
 ellipse(phead[0],phead[1],41,49,skin,side*.1);
 ellipse(phead[0],phead[1]-27,43,24,hair);
 circle(phead[0]-side*21,phead[1]-3,5,'#1c1413');circle(phead[0]+side*7,phead[1]-2,5,'#241414');
 ellipse(phead[0]+side*2,phead[1]+20,18,6,hair);
 // Noncompeting arm: right athlete's LEFT hand remains right, left stays left.
 capsule(data.freeShoulder,data.freeElbow,20,skin);
 capsule(data.freeElbow,data.freeHand,15,skin);
 const hand=project(data.freeHand);ellipse(hand[0],hand[1],17,20,skin);
 capsule(sh,elb,28,skin); // upper arm from shoulder to own elbow pad
 capsule(elb,wrist,23,skin); // forearm, fixed bone length before projection
 const e=project(elb),w=project(wrist);
 ellipse(e[0],e[1],26,18,skin);
 ellipse(w[0],w[1],23,21,skin);
 const band=[wrist[0]+(elb[0]-wrist[0])*.13,wrist[1]+(elb[1]-wrist[1])*.13,wrist[2]+(elb[2]-wrist[2])*.13];
 const bp=project(band);ellipse(bp[0],bp[1],21,18,shirt);
 c.restore();
}
function render(pct=50,elapsed=0,energy=100,enemyEnergy=100){const data=pose()(pct);
 c.clearRect(0,0,W,H);drawStadium(elapsed);
 // Back of arena supports free hands/pegs and left/right elbows.
 const front=gradient(355,430,[[0,'#243f59'],[1,'#0c1724']]);roundedRect(53,361,654,66,12,front);
 drawFighter(data.left,true,energy,elapsed);drawFighter(data.right,false,enemyEnergy,elapsed);
 // Entire table is stationary and shared by both competitors.
 drawTable();
 // The clasp moves physically from upright to opponent's pin pad (both directions).
 const g=project(data.left.grip);c.save();c.shadowColor='#fff3bd88';c.shadowBlur=10;
 ellipse(g[0]-10,g[1],20,23,'#b97053',-.15);ellipse(g[0]+10,g[1],20,23,'#aa674d',.15);
 for(let k=-2;k<=2;k++)ellipse(g[0]+k*7,g[1]-11,6,5,k<=0?'#ca896e':'#c08264');c.restore();
 if(data.pinPad){const px=data.pinPad==='RED'?440:320;const col=data.pinPad==='RED'?'#8ed8ff':'#ff9c9c';c.beginPath();c.arc(px,378,32,0,7);c.strokeStyle=col;c.lineWidth=4;c.stroke();c.font='900 19px system-ui';c.textAlign='center';c.fillStyle=col;c.fillText('PIN',px,338)}
 return data;
}
return{render,available:true,inspect:pose()};}
global.NVSArmRig2D={create};
})(window);
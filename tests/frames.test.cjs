const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(require('path').join(__dirname,'../index.html'),'utf8');
const m=source.match(/function frameForDominance\(northPercent\)\{[\s\S]*?\n\}/);
assert(m,'frameForDominance must exist');
const ctx={};vm.createContext(ctx);vm.runInContext(m[0]+';globalThis.getPose=frameForDominance;',ctx);
function pose(p){return ctx.getPose(p)}
assert.equal(pose(50).side,'NORTH');assert.equal(pose(50).frame,0);
assert.equal(pose(100).side,'NORTH');assert.equal(pose(100).frame,5);
assert.equal(pose(0).side,'SOUTH');assert.equal(pose(0).frame,5);
assert.equal(pose(40).side,'SOUTH');assert.equal(pose(40).frame,1);
assert.equal(pose(60).side,'NORTH');assert.equal(pose(60).frame,1);
for(let p=0;p<=100;p++){const x=pose(p);assert(x.frame>=0&&x.frame<=5);assert.equal(x.north,p)}
assert(source.includes("const framePreview = !devRig;"),'default frame mode');
assert(!source.includes("get('frames') === '1'"),'no hidden ?frames flag');
assert(source.includes("poseDemoStart=performance.now()"),'auto demonstration');
assert(source.includes("frames-south-v041.webp"),'south atlas');
assert(source.includes("frames-north-v04.webp"),'north atlas');
assert(source.includes("pose-scrubber"),'manual scrubber');
for(const side of ['north-v04','south-v041']){
 const file=require('path').join(__dirname,`../assets/frames-${side}.webp`);
 const b=fs.readFileSync(file);
 assert(b.length>40000&&b.toString('latin1',0,4)==='RIFF','WebP '+side);
 // RIFF/WEBP header check
 assert(b.toString('latin1',8,12)==='WEBP','WEBP signature '+side);
}
console.log('PASS: 101 positions, both sides, default autoplay, scrubber and atlases');


// Exercise the actual Canvas renderer with stubbed DOM (without a graphical browser).
const frameFn=source.match(/function drawArena\(g\)\{[\s\S]*?\n\}/);
const northFn=source.match(/const northDom=g=>[^;]+;/);
assert(frameFn&&northFn,"Renderer and orientation mapping exist");
const paint=[];
const canvas={width:724,height:362,getContext(){return {clearRect(){},drawImage(...a){paint.push(a)},fillRect(){},fillText(){},createLinearGradient(){return {addColorStop(){}}}}}};
const label={textContent:''};
const ctx2={
  nvsRig3d:null,nvsRig2d:null,framePreview:true,poseDemoStart:0,poseManual:null,lastPose:50,
  premiumArenaArt:{complete:false,naturalWidth:0,naturalHeight:0},
  northAtlas:{complete:true,naturalWidth:2172,naturalHeight:724,which:'NORTH'},
  southAtlas:{complete:true,naturalWidth:2172,naturalHeight:724,which:'SOUTH'},
  document:{getElementById(){return canvas},querySelector(){return label}},
  drawPoseHud(){},$(){return {textContent:'',style:{}}},
  performance:{now(){return 2000}},currentFighter(){return {hemi:ctx2.testHemi}},
  testHemi:'NORTH',console,
  validAtlas(img){return img.complete&&img.naturalWidth===2172&&img.naturalHeight===724}
};
vm.createContext(ctx2);
vm.runInContext(northFn[0]+m[0]+frameFn[0]+';globalThis.runActualDraw=drawArena;',ctx2);
function drawn(hemi,pct){
  paint.length=0;ctx2.testHemi=hemi;
  ctx2.runActualDraw({pos:pct,running:true,elapsed:1,energy:70,aiEnergy:80});
  assert.equal(paint.length,1,`one sprite at ${hemi} ${pct}`);
  return {side:paint[0][0].which,sx:paint[0][1],sy:paint[0][2]};
}
assert.deepEqual(drawn('NORTH',0),{side:'SOUTH',sx:1448,sy:362});
assert.deepEqual(drawn('NORTH',50),{side:'NORTH',sx:0,sy:0});
assert.deepEqual(drawn('NORTH',100),{side:'NORTH',sx:1448,sy:362});
assert.deepEqual(drawn('SOUTH',0),{side:'NORTH',sx:1448,sy:362});
assert.deepEqual(drawn('SOUTH',100),{side:'SOUTH',sx:1448,sy:362});
console.log('PASS: actual renderer chooses the correct image/pose for both player hemispheres');
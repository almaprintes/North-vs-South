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
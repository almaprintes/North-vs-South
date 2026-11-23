const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const gl=new Proxy({}, {get(t,k){if(k==='getShaderParameter'||k==='getProgramParameter')return ()=>true;if(k==='getShaderInfoLog'||k==='getProgramInfoLog')return ()=>'';if(k==='createShader'||k==='createProgram'||k==='createVertexArray'||k==='createBuffer'||k==='getUniformLocation')return ()=>({});if(k==='canvas')return null;if(k==='VERTEX_SHADER'||k==='FRAGMENT_SHADER'||k==='ARRAY_BUFFER'||k==='ELEMENT_ARRAY_BUFFER'||k==='STATIC_DRAW'||k==='FLOAT'||k==='TRIANGLES'||k==='UNSIGNED_SHORT'||k==='DEPTH_TEST'||k==='LEQUAL'||k==='COLOR_BUFFER_BIT'||k==='DEPTH_BUFFER_BIT')return 1;return ()=>{}}});
const canvas={getContext:()=>gl,width:760,height:570,clientWidth:390,clientHeight:293};
const sandbox={console,Math,performance:{now:(()=>{let t=0;return()=>t+=16})()},window:{devicePixelRatio:2}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','rig3d.js'),'utf8'),sandbox);
const api=sandbox.window.NVSArmRig;const rig=api.create(canvas);assert(rig);
let samples=[];
for(let pos=0;pos<=100;pos+=1){let p=api.pose(pos);
  for(let key of ['left','right']){
    const d=p[key];assert(Math.abs(d.forearm-.975)<1e-9);assert(Math.abs(d.upperarm-1.06)<1e-9);
    assert(d.elbow[0]*d.side>0,'elbow changed side');
    assert(d.freeHand[0]*d.side>0,'free hand crossed side');
    assert(d.elbow[2]>=-.89&&d.elbow[2]<=.12,'elbow left its pad');
  }
  let ok=rig.render(pos,0,100,100,true);assert(ok);let diag=rig.getDiagnostics();
  assert(diag.drawCalls>30);
  if(pos%20===0||pos===100)samples.push({pos,grip:p.left.grip,pin:p.pinPad,drawCalls:diag.drawCalls});
}
assert(api.pose(100).pinPad==='RED');assert(api.pose(0).pinPad==='BLUE');
assert(api.pose(100).left.grip[1]<.85&&api.pose(0).right.grip[1]<.85);
console.log('VALIDATED 101 continuous positions: geometry length, grip shared, elbow on pads, own-side free hands, both PIN directions');
console.log(samples);
import {desk} from "@shared/desk";

type B={pairs:string[][];winners:string[];round:number;pick:number};
type S={b:B;undo:B[];roster:string[]};let names=["Ari","Bo","Cam","Dee","Eli"];
function seed(a:string[]):B{let size=2;while(size<a.length)size*=2;const byes=size-a.length,win=a.slice(0,byes),pool=a.slice(byes),pairs:string[][]=[];for(let i=0;i<pool.length;i+=2)pairs.push(pool.slice(i,i+2));return {pairs,winners:win,round:1,pick:0};}
function fresh(a:string[]):S{return {b:seed(a),undo:[],roster:a.slice()};}
desk<S>({name:"Bracket Desk",accent:"#6DA9E9",motion:{"motif":"turnout","color":"#6DA9E9","shine":"#E2F4FF"},initial:()=>fresh(names),configure:(s,v)=>{const a=String(v.players||"").split(",").map(n=>n.trim().slice(0,14)).filter(Boolean).slice(0,8);if(a.length>=2){names=a;if(!s.undo.length&&s.b.round===1&&s.roster.join("|")!==a.join("|"))Object.assign(s,fresh(a));}},
 render:s=>{const b=s.b,p=b.pairs[0];return {title:p?"Round "+b.round:"Champion",value:p?p[b.pick]:b.winners[0],lines:[p?p.join(" vs "):"Champion "+b.winners[0],"Remaining pairs "+b.pairs.length,"Advanced "+b.winners.length,"Wheel: select winner","Click: advance / Start: undo","Hold Start: new tournament"]};},
 action:(s,k)=>{if(k==="hold-start"){Object.assign(s,fresh(names));return;}if(k==="start"&&s.undo.length){s.b=s.undo.pop()!;return;}const b=s.b,p=b.pairs[0];if(!p)return;
 if(k==="up"||k==="down")b.pick=1-b.pick;if(k==="ok"){s.undo.push(JSON.parse(JSON.stringify(b)) as B);b.winners.push(p[b.pick]);b.pairs.shift();b.pick=0;
 if(!b.pairs.length&&b.winners.length>1){const a=b.winners;b.winners=[];b.round++;for(let i=0;i<a.length;i+=2)b.pairs.push(a.slice(i,i+2));}}}});

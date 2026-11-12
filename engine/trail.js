'use strict';
/* ============================================================
   MUSEUM TRAIL ENGINE
   One engine, many trails. Each trail is one file: games/<name>.js
   Open index.html?game=<name>. Edit trails with editor.html.
   ============================================================ */
const DEMO_BUILD=true;      // Set to false before visitors use it. This removes preview mode (skip signs and order).
const DEFAULT_GAME='demo';  // Trail shown when the link has no ?game=
const QS=new URLSearchParams(location.search);
const gameId=(QS.get('game')||DEFAULT_GAME).replace(/[^a-z0-9-]/gi,'');
const PREVIEW=QS.has('preview'); // used by editor.html

const SIGN_SET={sun:{sym:'☀️',name:'Sun'},cloud:{sym:'☁️',name:'Cloud'},rainbow:{sym:'🌈',name:'Rainbow'},moon:{sym:'🌙',name:'Moon'},star:{sym:'⭐',name:'Star'},rocket:{sym:'🚀',name:'Rocket'},heart:{sym:'❤️',name:'Heart'},tree:{sym:'🌳',name:'Tree'},fish:{sym:'🐟',name:'Fish'},leaf:{sym:'🍃',name:'Leaf'},key:{sym:'🔑',name:'Key'},crown:{sym:'👑',name:'Crown'},bell:{sym:'🔔',name:'Bell'},apple:{sym:'🍎',name:'Apple'},flower:{sym:'🌸',name:'Flower'},drop:{sym:'💧',name:'Raindrop'}};
const DEFAULT_TEXT={
 intro:['Hello! I am {guide}.','Will you help me explore?'],introChips:[],introGrown:'Visit the {zones} in order. Please help with reading and stay behind the barriers.',
 namePrompt:'What is your name?',levelPrompt:'Who is playing?',start:'Let’s go!',
 mapTitle:'Mission map',mapHelp:'Visit the {zones} in order. Collect a stamp in each one.',mapDone:'You got every stamp! Well done!',
 signTitle:'Find {guide}\'s sign',signHelp:['Look for my sign here.','What picture is on it? Tap the same picture.'],signWrong:'Not that one. Look at the sign again!',
 pickStop:'What will you find first?',wrong:'Good try! Look at the real one again 👀',showAnswer:'Here is a clue: try the green one!',right:'Yes! Well done!',
 stampMore:'Can you find more here? Or go to the next one!',stampGold:'You found everything here. Amazing!',collection:'My collection',
 finaleStory:['You did it!','Now make something of your own.'],certTitle:'Official trail crew',certLine:'finished the trail.',certThanks:'Thank you'};
const COLOURS=[['#d6413a','Red'],['#f07a2a','Orange'],['#f2c230','Yellow'],['#2f9e6a','Green'],['#1f6fd1','Blue'],['#8a4fd8','Purple'],['#f07cb0','Pink'],['#f4f4f4','White'],['#2b2f36','Black']];
const PATTERNS=[['none','Plain'],['stripes','Stripes'],['spots','Spots'],['stars','Stars'],['zigzag','Zigzag'],['checks','Checks']];
const DEFAULT_DESIGN={
 plane:{shapes:[['fighter','Propeller'],['jet','Fast jet'],['biplane','Biplane'],['helicopter','Helicopter'],['flyingboat','Flying boat'],['rocket','Rocket plane']],colours:COLOURS,patterns:PATTERNS,stickers:[['none','None'],['roundel','Roundel'],['star','Star'],['heart','Heart'],['bolt','Lightning'],['fish','Fish']],trails:[['none','None'],['smoke','Smoke'],['rainbow','Rainbow'],['sparkle','Sparkles']],noses:[['none','None'],['shark','Shark teeth'],['eyes','Eyes'],['smile','Smile']]},
 badge:{shapes:[['circle','Circle'],['shield','Shield'],['star','Star'],['hexagon','Hexagon']],colours:COLOURS,patterns:PATTERNS,stickers:[['none','None'],['⭐','Star'],['🔍','Explorer'],['🚀','Rocket'],['🦖','Dinosaur'],['🐙','Octopus'],['❤️','Heart']]}};

function fail(){document.getElementById('app').innerHTML=`<div class="error"><h2>Trail not found</h2><p>Could not load <code>games/${gameId}.js</code>. Check the name in the link.</p></div>`}
if(PREVIEW){let booted=false;
 window.addEventListener('message',e=>{if(e.source!==window.parent||!(e.origin===location.origin||location.protocol==='file:'))return;if(e.data&&e.data.type==='trail-preview'&&!booted){booted=true;boot(e.data.game)}});
 window.parent.postMessage({type:'trail-ready'},'*');
}else{const loader=document.createElement('script');loader.src='games/'+gameId+'.js';loader.onload=()=>window.GAME?boot(window.GAME):fail();loader.onerror=fail;document.head.appendChild(loader)}

function boot(G){
const LV=(G.levels&&G.levels.length)?G.levels:[{id:'all',label:''}];
const SIGNS={...SIGN_SET,...(G.signs||{})};
const W={zone:'zone',zones:'zones',stop:'stop',stops:'stops',...(G.words||{})};
const gname=(G.guide&&G.guide.name)||'Guide';
const fill=v=>Array.isArray(v)?v.map(fill):String(v).replace(/\{guide\}/g,gname).replace(/\{zones\}/g,W.zones).replace(/\{zone\}/g,W.zone).replace(/\{stops\}/g,W.stops).replace(/\{stop\}/g,W.stop);
const T={};for(const[k,v]of Object.entries({...DEFAULT_TEXT,...(G.text||{})}))T[k]=fill(v);
const F={type:'none',label:'',title:'',...(G.finale||{})};
const D={...(DEFAULT_DESIGN[F.type]||{}),...(F.design||{})};
const STORE='trail-'+G.id+(PREVIEW?'-preview':'');

/* theme */
const th=G.theme||{},rs=document.documentElement.style,hex=v=>/^#[0-9a-f]{6}$/i.test(v||'');
[['primary','--navy'],['accent','--gold'],['link','--blue'],['background','--sky']].forEach(([k,v])=>{if(hex(th[k]))rs.setProperty(v,th[k])});
if(hex(th.primary))rs.setProperty('--on-navy',isLight(th.primary)?'#14273a':'#fff');
if(hex(th.accent))rs.setProperty('--on-gold',isLight(th.accent)?'#172739':'#fff');
/* layout settings: font, text size, spacing, columns, corners */
const FONTS={rounded:'ui-rounded,"Arial Rounded MT Bold","Nunito","Varela Round",system-ui,sans-serif',clean:'system-ui,-apple-system,"Segoe UI",Arial,sans-serif',classic:'Georgia,"Times New Roman",serif',playful:'"Comic Sans MS","Chalkboard SE","Comic Neue",ui-rounded,sans-serif'};
if(FONTS[th.font])document.body.style.fontFamily=FONTS[th.font];
rs.setProperty('--ts',{small:.88,medium:1,large:1.15}[th.textSize]||1);
rs.setProperty('--sp',{tight:.7,normal:1,roomy:1.35}[th.spacing]||1);
if(+th.columns>0)rs.setProperty('--cols',`repeat(${+th.columns},minmax(0,1fr))`);
document.body.classList.toggle('sq',th.corners==='square');
const B=G.brand||{};
document.title=G.title+' | '+G.museum;
document.getElementById('brand').innerHTML=`${B.logo?`<img src="${esc(B.logo)}" alt="">`:''}${esc(B.header||G.museum||'')}${B.sub?` <span>/ ${esc(B.sub)}</span>`:''}`;
document.getElementById('legal').textContent=G.legal||'';

/* state */
const fresh=()=>({phase:'intro',level:LV[0].id,h:null,a:null,doneA:[],unlocked:[],skipped:[],tries:0,wrong:[],solved:false,t:{},demo:DEMO_BUILD,sound:LV[0].readAloud!==false,name:'',
 make:{shape:(D.shapes||[[]])[0][0],body:'#1f6fd1',wing:'#f2c230',pattern:'none',nose:'none',number:'',sticker:((D.stickers||[])[1]||['none'])[0],trail:((D.trails||[])[1]||['none'])[0],label:''}});
let S=fresh();try{const s=JSON.parse(localStorage.getItem(STORE)||'null');if(s&&Array.isArray(s.doneA))S={...fresh(),...s,make:{...fresh().make,...s.make}}}catch(e){}
if(!DEMO_BUILD)S.demo=false;if(PREVIEW)S.demo=true;
const app=document.getElementById('app'),announce=document.getElementById('announce'),soundBtn=document.getElementById('soundBtn');
const save=()=>{try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}};

/* zones and stops for the chosen level */
let H=[];
const lv=()=>LV.find(l=>l.id===S.level)||LV[0];
const taskOf=a=>(a.tasks&&a.tasks[lv().id])||null;
const calcH=()=>{H=(G.zones||[]).map(z=>({...z,stops:(z.stops||[]).filter(taskOf)})).filter(z=>z.stops.length)};
const hg=id=>H.find(h=>h.id===id)||H[0];
const ac=id=>{for(const z of H)for(const s of z.stops)if(s.id===id)return{...s,h:z.id};return{...H[0].stops[0],h:H[0].id}};
const key=a=>lv().id+':'+a.id,isDone=a=>S.doneA.includes(key(a));
const cnt=h=>h.stops.filter(isDone).length,need=h=>Math.min(lv().stopsToPass||1,h.stops.length);
const stamped=h=>cnt(h)>=need(h),gold=h=>cnt(h)===h.stops.length;
const passed=h=>stamped(h)||S.skipped.includes(h.id);
const open_=i=>i===0||passed(H[i-1]);
const allPassed=()=>H.every(passed)&&H.some(stamped);
const has=l=>PREVIEW||!l.paid||!!(S.access&&S.access[l.id]&&S.access[l.id].exp>Date.now());
const rich=LV.some(l=>l.desc||l.price||l.teaches||l.minutes);
const myst=()=>{const m=lv().mystery;return m&&m.q&&(m.options||[]).length>1?m:null};
const hid=a=>taskOf(a).type==='silhouette'&&!isDone(a);
const players=()=>G.family?[S.name.trim()||'Player 1',...String(S.others||'').split(',').map(x=>x.trim()).filter(Boolean)].slice(0,5):[];
const turn=()=>{const p=players();return p[S.doneA.length%p.length]};
const board=()=>players().length>1?`<div class="board">${players().map(p=>`<span>${esc(p)} <b>${(S.scores||{})[p]||0} ⭐</b></span>`).join('')}</div>`:'';
const PHOTOS={};
/* rewards: ranks, kit for the guide, parts for the ending, collection */
const RANKS=G.ranks||[],done=()=>H.reduce((s,h)=>s+cnt(h),0),total=()=>H.reduce((s,h)=>s+h.stops.length,0);
const rank=()=>{let r='';for(const[n,name]of RANKS)if(done()>=+n)r=name;return r};
const KIT=(G.zones||[]).some(z=>z.reward&&z.reward.outfit);
const wear=()=>KIT?H.filter(stamped).map(h=>h.reward&&h.reward.outfit).filter(Boolean):undefined;
const lockZone=g=>{const zs=H.filter(h=>h.reward&&(h.reward.unlock||[]).includes(g));return !zs.length||zs.some(stamped)||PREVIEW?null:zs[0]};
const unlocked=g=>!lockZone(g);
const mk=()=>{const p={...S.make};if(!unlocked('shape'))p.shape=D.shapes[0][0];if(!unlocked('colour')){p.body='#c3ccd4';p.wing='#a3aeb8'}for(const g of['pattern','sticker','trail','nose'])if(!unlocked(g))p[g]='none';if(!unlocked('nose'))p.number='';return p};
const rewardBox=h=>{const r=h.reward;if(!r)return'';return `<div class="fact earn">${r.outfit&&r.outfitLabel?`<p>🧣 <strong>New kit for ${esc(gname)}:</strong> ${esc(r.outfitLabel)}. ${esc(r.outfitWhy||'')}</p>`:''}${r.part?`<p>🔧 <strong>You earned:</strong> ${esc(r.part)}</p>`:''}</div>`};
const hud=()=>`<div class="hud">${rank()?`<span class="rankchip">🎖️ ${esc(rank())}</span>`:''}<button class="btn soft" data-action="collection">📒 ${esc(T.collection)} · ${done()} of ${total()}</button></div>`; // photos stay in this browser tab only; never uploaded or saved
const pic=o=>/^(https?:|data:|images\/)/.test(o.icon||'')?`<img src="${esc(o.icon)}" alt="">`:icon(o.icon||o.v);

/* helpers */
const btn=(t,a,k='go',x='')=>`<button type="button" class="btn ${k}" data-action="${a}" ${x}>${t}</button>`;
const nm=()=>S.name.trim()?esc(S.name.trim()):'';
const VO=G.guide||{};
function say(){if(!S.sound||!('speechSynthesis'in window))return;speechSynthesis.cancel();const t=[...document.querySelectorAll('[data-say]')].map(e=>e.textContent.trim()).join(' ');if(!t)return;const u=new SpeechSynthesisUtterance(t);u.lang=G.lang||'en-GB';u.rate=+VO.voiceRate||.9;u.pitch=+VO.voicePitch||1.25;const vv=speechSynthesis.getVoices().find(v=>VO.voice&&v.name.toLowerCase().includes(String(VO.voice).toLowerCase()));if(vv)u.voice=vv;speechSynthesis.speak(u)}
const sayNow=t=>{if(!S.sound||!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang=G.lang||'en-GB';u.rate=.9;speechSynthesis.speak(u)};
const hush=()=>{if('speechSynthesis'in window)speechSynthesis.cancel()};
const tell=t=>{announce.textContent='';setTimeout(()=>announce.textContent=t,20)};
const guideArt=()=>G.guide&&G.guide.image?`<img src="${esc(G.guide.image)}" alt="">`:(GUIDES[G.guide&&G.guide.character]||GUIDES.penguin)(wear());
const guideSays=lines=>`<div class="say">${guideArt()}<div class="bubble" data-say>${[].concat(lines).map(l=>`<p>${l}</p>`).join('')}</div></div>`;
const minis=()=>`<div class="stamps-mini" aria-label="Stamps">${H.map((h,i)=>`<span class="sdot ${gold(h)?'got gold':stamped(h)?'got':''}">${stamped(h)?'✓':i+1}</span>`).join('')}</div>`;
const top=(to='map',label='← Map')=>`<div class="topline noprint"><button class="back" data-action="${to}">${label}</button>${minis()}</div>`;
const artOf=a=>a.image?`<img src="${esc(a.image)}" alt="Photo: ${esc(a.name)}">`:a.art?plane(a.art,{body:a.body,wing:a.wing,wingShape:a.wingShape}):`<div class="emoji-art" aria-hidden="true">${esc(a.emoji||'❓')}</div>`;
const signOf=h=>(SIGNS[h.sign]||{sym:'❓',name:'?'});
const draw=(p,o={})=>F.type==='plane'?plane(o.shape||p.shape,{...p,...o}):badge({...p,...o});
const shuffle=(n,seed)=>{const a=[...Array(n).keys()];let s=7;for(const c of String(seed))s=(s*31+c.charCodeAt(0))>>>0;for(let i=n-1;i>0;i--){s=(s*1664525+1013904223)>>>0;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]]}if(n>1&&a.every((v,i)=>v===i))a.push(a.shift());return a};
const optv=t=>(t.options||[]).map((o,i)=>({...o,v:String(i+1)}));
const norm=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,'');

/* ---------------- Game types ----------------
   Each returns {over, body, clue}. To add a game type: add a case here, a handler in ACTS/check(), and a form in editor.html. */
function taskUI(a,t,showAns){const cls=v=>(S.wrong.includes(v)?'wrong':'')+(showAns&&v===String(t.answer)?' show':'');let over='',body='',clue=T.showAnswer;
 switch(t.type){
 case 'hotspot':over=optv(t).map(o=>`<button class="hotspot ${cls(o.v)}" style="left:${+o.x||50}%;top:${+o.y||50}%" data-action="answer" data-v="${o.v}" aria-label="${esc(o.label)}">${o.v}</button>`).join('');
 case 'choice':case 'silhouette':case 'oddone':body=`<div class="choices">${optv(t).map(o=>`<button class="choice ${cls(o.v)}" data-action="answer" data-v="${o.v}" aria-label="${esc(o.label)}">${t.type==='hotspot'?icon(o.v):pic(o)}<span>${esc(o.label)}</span></button>`).join('')}</div>`;break;
 case 'truefalse':body=`<div class="choices">${[['true','👍','True'],['false','👎','False']].map(([v,i,l])=>`<button class="choice ${cls(v)}" data-action="answer" data-v="${v}">${icon(i)}<span>${l}</span></button>`).join('')}</div>`;break;
 case 'spot':{const seen=S.t.seen||[],n=optv(t).filter(o=>o.diff).length;body=`<div class="choices">${optv(t).map(o=>`<button class="choice ${seen.includes(o.v)?'ticked':''} ${S.wrong.includes(o.v)?'wrong':''} ${showAns&&o.diff&&!seen.includes(o.v)?'show':''}" data-action="spot" data-v="${o.v}">${pic(o)}<span>${esc(o.label)}</span></button>`).join('')}</div><p class="count">${seen.length} of ${n} mistakes found</p>`;clue='Clue: the green ones are mistakes.';break}
 case 'jigsaw':{const it=t.items||[],d=S.t.seen||[],cols=it.length>4?3:2;over=`<div class="tiles" style="grid-template-columns:repeat(${cols},1fr)">${it.map((x,i)=>`<span class="tile ${d.includes(String(i))?'off':''}">🧩</span>`).join('')}</div>`;body=`<div class="pile">${it.map((x,i)=>`<button class="mbtn ${d.includes(String(i))?'ok':''}" data-action="jig" data-v="${i}" ${d.includes(String(i))?'disabled':''}>${d.includes(String(i))?'✓':'👀'} ${esc(x)}</button>`).join('')}</div><p class="count">Tap each one when you find it on the real one.</p>`;clue='';break}
 case 'padlock':{const c=t.clues||[],d=S.t.d||c.map(()=>0);body=`<div class="lock">${c.map((x,i)=>`<div class="dig"><span class="dq">${esc(x[0])}</span><div class="counter"><button class="btn dark rnd sm" data-action="dig" data-v="${i}:-1" aria-label="Less">−</button><output class="num">${d[i]||0}</output><button class="btn dark rnd sm" data-action="dig" data-v="${i}:1" aria-label="More">+</button></div></div>`).join('')}</div>${btn('🔓 Open the lock','check','go wide')}`;clue=`The code is ${c.map(x=>esc(x[1])).join(' ')}.`;break}
 case 'poll':body=`<div class="choices">${optv(t).map(o=>`<button class="choice" data-action="poll" data-v="${o.v}">${pic(o)}<span>${esc(o.label)}</span></button>`).join('')}</div><p class="count">There is no wrong answer!</p>`;clue='';break;
 case 'photo':body=`<label class="btn go wide" style="cursor:pointer">📷 Take a photo<input id="photoIn" type="file" accept="image/*" capture="environment" hidden></label><div style="text-align:center;margin-top:8px"><button class="btn link" data-action="nophoto">No camera? Tap here when you have found it</button></div><p class="count">Your photo stays on this phone.</p>`;clue='';break;
 case 'count':body=`<div class="counter"><button class="btn dark rnd" data-action="cnt" data-v="-1" aria-label="One less">−</button><output class="num" aria-live="polite">${S.t.n||0}</output><button class="btn dark rnd" data-action="cnt" data-v="1" aria-label="One more">+</button></div>${btn('Check ✓','check','go wide')}`;clue=`Clue: the answer is ${esc(t.answer)}.`;break;
 case 'order':{const it=t.items||[],k=S.t.k||0;body=`<ol class="slots">${it.map((x,i)=>`<li class="${i<k?'fill':''}">${i<k?esc(x):'&nbsp;'}</li>`).join('')}</ol><div class="pile">${shuffle(it.length,a.id).filter(i=>i>=k).map(i=>`<button class="mbtn ${S.wrong.includes(String(i))?'wrong':''} ${showAns&&i===k?'show':''}" data-action="ord" data-v="${i}">${esc(it[i])}</button>`).join('')}</div>`;clue='Clue: tap the green one next.';break}
 case 'match':{const ps=t.pairs||[],d=S.t.d||[],sel=S.t.s;body=`<div class="match"><div>${ps.map((p,i)=>`<button class="mbtn ${d.includes(i)?'ok':''} ${sel===i?'sel':''}" data-action="ml" data-v="${i}" ${d.includes(i)?'disabled':''}>${esc(p[0])}</button>`).join('')}</div><div>${shuffle(ps.length,a.id).map(i=>`<button class="mbtn ${d.includes(i)?'ok':''} ${S.wrong.includes('r'+i)?'wrong':''} ${showAns&&sel===i?'show':''}" data-action="mr" data-v="${i}" ${d.includes(i)?'disabled':''}>${esc(ps[i][1])}</button>`).join('')}</div></div>`;clue='Clue: tap one on the left. Its partner turns green.';break}
 case 'spy':{const seen=S.t.seen||[],n=Math.min(t.need||99,(t.options||[]).length);body=`<div class="choices">${optv(t).map(o=>`<button class="choice ${seen.includes(o.v)?'ticked':''}" data-action="spy" data-v="${o.v}" aria-pressed="${seen.includes(o.v)}">${icon(o.icon||'👀')}<span>${esc(o.label)}</span></button>`).join('')}</div><p class="count">${seen.length} of ${n} found</p>`;clue='';break}
 case 'code':body=`<label class="field" style="max-width:none"><span class="sr-only">Your answer</span><input id="codeIn" autocomplete="off" autocapitalize="off" maxlength="30" value="${esc(S.t.val||'')}" placeholder="Type your answer"></label><div style="margin-top:12px">${btn('Check ✓','check','go wide')}</div>${S.tries&&t.hint&&!showAns?`<div class="feedback">Hint: ${esc(t.hint)}</div>`:''}`;clue=`The answer is: ${esc(String(t.answer).split('|')[0])}`;break;
 case 'estimate':{const u=t.unit?' '+esc(t.unit):'',v=S.t.val??Math.round((+t.min+ +t.max)/2);body=`<div class="est"><output class="num" id="estOut">${v}${u}</output><input type="range" id="estIn" min="${+t.min}" max="${+t.max}" step="${+t.step||1}" value="${v}" aria-label="Your guess"><div class="ends"><span>${+t.min}${u}</span><span>${+t.max}${u}</span></div></div>${btn('Check ✓','check','go wide')}`;clue=`The answer is about ${esc(t.answer)}${u}.`;break}
 default:body=`<div class="feedback">This game type is not set up: ${esc(t.type)}</div>`}
 return{over,body,clue}}
function rr(){const y=window.scrollY;render();window.scrollTo(0,y)}
function miss(v,msg){if(v!=null&&!S.wrong.includes(v))S.wrong.push(v);S.tries++;S.t.msg=msg||T.wrong;tell(S.t.msg);rr()}
function solve(){const a=ac(S.a),r0=rank();S.solved=true;if(!isDone(a)){if(players().length>1){const p=turn();S.scores={...(S.scores||{}),[p]:((S.scores||{})[p]||0)+(S.tries?1:2)}}S.doneA.push(key(a))}if(rank()!==r0)S.t.rankUp=rank();tell(T.right);rr();say()}
function check(){const t=taskOf(ac(S.a));if(!t||S.solved)return;
 if(t.type==='count')(S.t.n||0)===+t.answer?solve():miss(null,'Good try! Count again 👀');
 else if(t.type==='code')String(t.answer).split('|').map(norm).includes(norm(S.t.val||''))&&norm(S.t.val||'')?solve():miss(null,'Not quite. Look again 👀');
 else if(t.type==='estimate'){const v=S.t.val??Math.round((+t.min+ +t.max)/2);Math.abs(v- +t.answer)<=(+t.tolerance||0)?solve():miss(null,v<+t.answer?'Too low! Try higher ⬆️':'Too high! Try lower ⬇️')}
 else if(t.type==='padlock')(S.t.d||(t.clues||[]).map(()=>0)).join()===(t.clues||[]).map(c=>String(+c[1])).join()?solve():miss(null,'The lock stays shut. Check each number 👀')}

/* ---------------- Pages ---------------- */
function intro(){const n=H.reduce((s,h)=>s+h.stops.length,0),chips=[`${H.length} ${W.zones}`,`${n} ${W.stops}`,...(T.introChips||[])];
 return `<section class="panel hero"><div class="hero-sky"><p class="eyebrow">${esc(G.museum)}${G.ages?' · Ages '+esc(G.ages):''}</p><h1>${esc(G.title)}</h1><div class="hero-guide">${guideArt()}</div></div><div class="hero-body">${guideSays(T.intro)}<label class="field">${esc(T.namePrompt)}<input id="nameIn" maxlength="20" autocomplete="off" value="${esc(S.name)}" placeholder="Type your name"></label>${G.family?`<label class="field">Family game? Add more players<input id="othersIn" maxlength="60" autocomplete="off" value="${esc(S.others||'')}" placeholder="e.g. Mum, Sam"></label>`:''}${(LV.length>1||rich)?`<div style="width:100%"><h3 style="margin-top:0">${esc(T.levelPrompt)}</h3>${levelPick()}</div>`:''}<div class="chips">${chips.map(c=>`<span class="chip">${esc(c)}</span>`).join('')}</div>${has(lv())?btn(esc(T.start)+' →','start','go wide'):btn(`🔒 Unlock ${esc(lv().price||'')} →`,'start','go wide')}${btn('🔊 Hear again','say','soft')}<div class="grownup"><strong>For grown-ups</strong>${T.introGrown}</div></div></section>${settings()}`}
function levelPick(){return rich?`<div class="packs">${LV.map(l=>`<button class="pack" data-action="level" data-v="${esc(l.id)}" aria-pressed="${l.id===lv().id}"><span class="e" aria-hidden="true">${esc(l.emoji||'')}</span><span class="pt"><b>${esc(l.label)}</b>${l.desc?`<span>${esc(l.desc)}</span>`:''}<span class="pm">${[l.minutes&&`⏱ ${esc(l.minutes)} min`,l.teaches&&`🎓 ${esc(l.teaches)}`].filter(Boolean).join(' · ')}</span></span><span class="pp">${has(l)?(l.paid?'✓ Unlocked':'Free'):`🔒 ${esc(l.price||'')}`}</span></button>`).join('')}</div>`:`<div class="levels">${LV.map(l=>`<button class="level" data-action="level" data-v="${esc(l.id)}" aria-pressed="${l.id===lv().id}"><span class="e" aria-hidden="true">${esc(l.emoji||'')}</span>${esc(l.label)}</button>`).join('')}</div>`}
function floor(){const M=G.map;if(!M||!M.image)return'';return `<div class="floor"><img src="${esc(M.image)}" alt="Map of ${esc(G.museum)}">${H.map((h,i)=>{const p=(M.pins||{})[h.id];if(!p)return'';const st=stamped(h),op=open_(i)||S.demo;return `<button class="pin ${st?'done':''} ${op?'':'locked'} ${S.h===h.id?'here':''}" style="left:${+p.x}%;top:${+p.y}%" data-action="openH" data-id="${h.id}" aria-label="${esc(h.label)}">${st?'✓':op?i+1:'🔒'}</button>`}).join('')}</div>`}
const notebook=()=>{const c=myst()?H.filter(h=>h.clue&&stamped(h)):[];return c.length?`<div class="fact"><strong>🔎 Clue notebook</strong>${c.map(h=>`<p>${esc(h.clue)}</p>`).join('')}</div>`:''};
function mapPage(){const done=allPassed();return `${top('home','← Start')}<h2>${esc(T.mapTitle)}</h2>${guideSays([done?T.mapDone:(nm()?`Hi ${nm()}! `:'')+T.mapHelp])}${board()}${hud()}${floor()}${notebook()}<div class="hlist">${H.map((h,i)=>{const st=stamped(h),op=open_(i)||S.demo;return `<button class="hcard ${st?'done':''} ${op?'':'locked'}" data-action="openH" data-id="${h.id}" aria-label="${esc(h.label)}: ${esc(h.title)}${op?'':' (locked)'}"><span class="pic" aria-hidden="true">${op?signOf(h).sym:'🔒'}</span><span class="txt"><span class="when">${esc(h.label)}${h.era?' · '+esc(h.era):''}</span><span class="ttl">${esc(h.title)}</span><span class="meta">${cnt(h)} of ${h.stops.length} found${gold(h)?' · ⭐ Gold!':''}</span><span class="tag">${S.skipped.includes(h.id)&&!st?'Skipped':st?'✓ Stamp':op?'Go →':`Finish ${esc(H[i-1].label)} first`}</span></span></button>`}).join('')}</div><div class="finale-card"><h3 style="margin:0">🏁 ${esc(F.title||'Finish')}</h3>${F.label?`<p>${esc(F.label)}</p>`:''}${done?btn(F.type==='none'?'Get my certificate →':'Start →','design','go wide'):`<p><strong>Get a stamp in every ${esc(W.zone)} to unlock.</strong></p>`}</div>${settings()}`}
function zonePage(){const h=hg(S.h),i=H.indexOf(h),unlocked=S.demo||S.unlocked.includes(h.id),used=new Set(H.map(x=>x.sign));
 const gate=`<h3>${esc(T.signTitle)}</h3>${guideSays(T.signHelp)}<div class="signs">${Object.entries(SIGNS).filter(([k])=>used.has(k)).map(([k,v])=>`<button class="sign-btn ${S.wrong.includes(k)?'wrong':''}" data-action="sign" data-v="${k}" aria-label="${esc(v.name)}"><span class="sym" aria-hidden="true">${v.sym}</span>${esc(v.name)}</button>`).join('')}</div>${S.wrong.length?`<div class="feedback" role="alert">${esc(T.signWrong)}</div>`:''}<div class="grownup"><strong>Grown-up tip</strong>The sign also has a QR code. Scan it with your phone camera to open this part.${DEMO_BUILD?'<br><button class="btn soft" style="margin-top:10px" data-action="skipSign">Test without a sign</button>':''}</div>`;
 const list=`<h3 data-say>${esc(T.pickStop)}</h3><div class="acards">${h.stops.map(a=>`<button class="card ${isDone(a)?'done':''}" data-action="openA" data-id="${a.id}">${isDone(a)?'<span class="tick" aria-hidden="true">✓</span>':''}${hid(a)?`<div class="shadow">${artOf(a)}</div><span>Whose shadow?</span>`:`${artOf(a)}<span>${esc(a.name)}</span>`}</button>`).join('')}</div>`;
 const next=H[i+1];const nav=stamped(h)?`<div class="row" style="margin-top:12px">${next?btn(`Next: ${esc(next.label)} →`,'openH','go wide',`data-id="${next.id}"`):btn('Finish →','design','go wide',allPassed()?'':'disabled')}</div>`:'';
 return `${top()}<section class="panel"><p class="eyebrow">${esc(h.label)}</p><h2>${esc(h.title)}</h2>${h.era?`<span class="era">${esc(h.era)}</span>`:''}${guideSays(h.story&&h.story.length?h.story:[`Welcome to ${esc(h.label)}!`])}${h.grown?`<div class="grownup"><strong>Grown-up tip</strong>${esc(h.grown)}</div>`:''}${unlocked?list+nav:gate}${!stamped(h)?`<div style="text-align:center;margin-top:8px"><button class="btn link" data-action="skipH">Closed or too busy? Skip it</button></div>`:''}</section>`}
function stopPage(){const a=ac(S.a),h=hg(a.h),t=taskOf(a),showAns=S.tries>=(lv().showAnswerAfter||2)&&!S.solved,u=S.solved?{over:'',body:''}:taskUI(a,t,showAns);
 const just=S.solved&&cnt(h)===need(h),g=S.solved&&gold(h),look=t.look||(hid(a)?'':a.look),fact=t.fact||a.fact;
 return `${top('backH',`← ${esc(h.label)}`)}<section class="panel"><p class="eyebrow">${esc(h.label)} · ${hid(a)?'Mystery shadow':esc(a.name)}</p>${!S.solved&&players().length>1?`<div class="turn">🎲 ${esc(turn())}'s turn! Pass the phone.</div>`:''}<div class="scene"><div class="art-wrap${hid(a)?' shadow':''}">${artOf(a)}${u.over}</div><span class="note">Look at the real one!</span></div>${look?`<div class="lookbox"><span class="eyes" aria-hidden="true">👀</span><span data-say>${esc(look)}</span></div>`:''}<h3 data-say>${esc(t.q)}</h3>${S.solved?`<div class="feedback good" role="alert">✓ ${nm()?esc(T.right).replace(/!$/,', '+nm()+'!'):esc(T.right)}</div>${S.t.rankUp?`<div class="feedback good" data-say>🎖️ Promoted to ${esc(S.t.rankUp)}!</div>`:''}${PHOTOS[key(a)]?`<img class="snap" src="${PHOTOS[key(a)]}" alt="Your photo">`:''}${fact?`<div class="fact" data-say>${fact}</div>`:''}${a.talk?`<div class="grownup"><strong>Talk together</strong>${esc(a.talk)}</div>`:''}<div class="row" style="margin-top:14px">${g?btn('Gold stamp! →','stamp','go wide'):just?btn('Get my stamp! →','stamp','go wide'):btn(`Back to ${esc(h.label)} →`,'backH','go wide')}</div>`:`${u.body}${showAns&&u.clue?`<div class="feedback" role="alert">${u.clue}</div>`:S.t.msg?`<div class="feedback" role="alert">${esc(S.t.msg)}</div>`:''}`}<div class="row noprint" style="margin-top:10px">${btn('🔊 Hear again','say','soft')}</div></section>`}
function stampPage(){const h=hg(S.h),g=gold(h),cols=['#ffd36d','#d6413a','#1f6fd1','#2f9e6a','#f07cb0'],next=H[H.indexOf(h)+1];
 return `${top()}<section class="panel reward"><div class="confetti" aria-hidden="true">${Array.from({length:26},(_,k)=>`<i style="left:${(k*37)%100}%;background:${cols[k%5]};animation-delay:${(k%7)*.12}s"></i>`).join('')}</div><p class="eyebrow">${esc(h.label)}</p><h2 data-say>${g?'Wow! A GOLD stamp!':'You got a stamp!'}</h2><div class="stamp ${g?'gold':''}" aria-label="${g?'Gold stamp':'Stamp'} for ${esc(h.label)}"><div><div class="sym" aria-hidden="true">${signOf(h).sym}</div><div class="l1">${esc(h.label.toUpperCase())}</div>${g?'<div class="l1">⭐ GOLD ⭐</div>':''}</div></div>${guideSays([g?T.stampGold:T.stampMore])}${rewardBox(h)}${myst()&&h.clue?`<div class="fact">🔎 <strong>Clue:</strong> ${esc(h.clue)}</div>`:''}<div class="row" style="justify-content:center">${!g?btn('Find more here','backH','soft'):''}${next?btn(`Next: ${esc(next.label)} →`,'openH','go',`data-id="${next.id}"`):btn('Finish →','design','go',allPassed()?'':'disabled')}</div></section>`}
function opt(group,k,l,preview){return `<button class="opt" data-action="set" data-g="${group}" data-v="${esc(k)}" aria-pressed="${S.make[group]===k}">${preview}<span>${esc(l)}</span></button>`}
function designPage(){const p=mk(),plain={trail:'none',sticker:'none',pilot:false},pl=F.type==='plane';
 const sw=g=>`<div class="swatches">${D.colours.map(([c,l])=>`<button class="swatch" style="background:${c}" data-action="set" data-g="${g}" data-v="${c}" aria-label="${l}" aria-pressed="${p[g]===c}"></button>`).join('')}</div>`;
 const none='<path d="M-10-10 10 10M10-10-10 10" stroke="#9fbdd0" stroke-width="4"/>';
 let n=0;const hd=t=>`<h3>${++n}. ${t}</h3>`;
 const sec=(g,t,f)=>unlocked(g)?hd(t)+f():`${hd(t)}<div class="lockbox">🔒 Earn this in ${esc(lockZone(g).label)}</div>`;
 return `${top()}<section class="panel">${F.label?`<p class="eyebrow">${esc(F.label)}</p>`:''}<h2>${esc(F.title)}</h2>${guideSays(F.story||T.finaleStory)}<div class="preview" id="preview">${draw(p,{pilot:true})}<div class="pname" id="pname">${esc(p.label)}</div></div><div class="row noprint" style="justify-content:center">${btn('🎲 Surprise me!','random','soft')}</div>
 ${sec('shape','Shape',()=>`<div class="opts">${D.shapes.map(([k,l])=>opt('shape',k,l,draw(p,{...plain,shape:k}))).join('')}</div>`)}
 ${sec('colour',pl?'Body colour':'Colour',()=>sw('body'))}${sec('colour',pl?'Wing colour':'Edge colour',()=>sw('wing'))}
 ${sec('pattern','Pattern',()=>`<div class="opts">${D.patterns.map(([k,l])=>opt('pattern',k,l,draw(p,{...plain,pattern:k}))).join('')}</div>`)}
 ${sec('sticker',pl?'Sticker':'Picture',()=>`<div class="opts">${D.stickers.map(([k,l])=>opt('sticker',k,l,pl?`<svg viewBox="-20 -20 40 40" aria-hidden="true">${k==='none'?none:sticker(k,0,0)}</svg>`:`<span class="big" aria-hidden="true">${k==='none'?'✖️':esc(k)}</span>`)).join('')}</div>`)}
 ${pl?sec('trail','Trail',()=>`<div class="opts">${D.trails.map(([k,l])=>opt('trail',k,l,`<svg viewBox="${k==='none'?'-20 -20 40 40':'0 60 60 60'}" aria-hidden="true">${k==='none'?none:trail(k,90)}</svg>`)).join('')}</div>`):''}
 ${pl&&D.noses?sec('nose','Nose art',()=>`<div class="opts">${D.noses.map(([k,l])=>opt('nose',k,l,draw(p,{...plain,nose:k}))).join('')}</div>`)+sec('nose','Lucky number',()=>`<label class="field"><span class="sr-only">Lucky number</span><input id="numIn" inputmode="numeric" maxlength="2" autocomplete="off" value="${esc(p.number||'')}" placeholder="e.g. 7"></label>`):''}
 ${hd('Give it a name')}<label class="field"><span class="sr-only">Name</span><input id="planeIn" maxlength="18" autocomplete="off" value="${esc(p.label)}" placeholder="e.g. Sky Fish"></label>
 <div class="row" style="margin-top:18px">${btn('It is ready! →','won','go wide')}</div>${F.grown?`<div class="grownup"><strong>Grown-up tip</strong>${esc(F.grown)}</div>`:''}</section>`}
function wonPage(){const p=mk(),d=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
 return `${top('map','← Map')}<section class="panel cert"><p class="eyebrow">${esc(T.certTitle)}</p><h2>Mission complete!</h2><label class="field noprint" style="margin:12px auto">Your name<input id="nameIn2" maxlength="20" autocomplete="off" value="${esc(S.name)}" placeholder="Type your name"></label><div class="certname" id="certname">${nm()||'Explorer'}</div><p style="font-weight:700">${esc(T.certLine)}</p>${rank()?`<p class="rankline">🎖️ Rank: <strong>${esc(rank())}</strong></p>`:''}<div class="stamps">${H.map(h=>`<span class="mini ${gold(h)?'gold':''} ${stamped(h)?'':'skip'}" title="${esc(h.label)}">${signOf(h).sym}</span>`).join('')}</div>${board()}${Object.values(PHOTOS).length?`<div class="album">${Object.values(PHOTOS).map(u=>`<img src="${u}" alt="Your photo">`).join('')}</div>`:''}${F.type!=='none'?`<div class="preview" style="position:static">${draw(p,{pilot:true})}<div class="pname">${esc(p.label)}</div></div>`:''}${guideSays([`${esc(T.certThanks)}${nm()?', '+nm():''}!`])}<p style="font-size:15px;color:#547084">${esc(G.museum)} · ${d}</p><div class="row noprint" style="justify-content:center;margin-top:14px">${btn('🖨️ Print certificate','print','go')}${F.type!=='none'?btn('Change my design','design','soft'):''}${btn('Play again','restart','soft')}</div></section>`}
function settings(){return `<details class="settings noprint"><summary>Settings for grown-ups and staff</summary>${DEMO_BUILD&&!PREVIEW?`<label><input type="checkbox" data-action="toggleDemo" ${S.demo?'checked':''}> Preview mode: skip signs and order (desk testing)</label>`:''}<button class="btn soft" data-action="restart">Start again</button><p style="font-size:14px;color:#547084;margin-top:8px">Progress is saved on this phone only. Nothing is sent anywhere.</p></details>`}

function mysteryPage(){const m=myst();return `${top()}<section class="panel"><p class="eyebrow">Case file</p><h2 data-say>${esc(m.q)}</h2><div class="fact">${H.filter(h=>h.clue).map(h=>`<p>🔎 ${esc(h.clue)}</p>`).join('')}</div><div class="choices">${m.options.map((x,i)=>{const o=typeof x==='string'?{label:x}:x;return `<button class="choice ${S.wrong.includes(String(i+1))?'wrong':''}" data-action="accuse" data-v="${i+1}">${icon(o.icon||i+1)}<span>${esc(o.label)}</span></button>`}).join('')}</div>${S.t.msg?`<div class="feedback" role="alert">${esc(S.t.msg)}</div>`:''}</section>`}

function collectionPage(){return `${top()}<section class="panel"><h2>${esc(T.collection)}</h2>${guideSays([done()?`You have found ${done()} of ${total()}. ${done()<total()?'Can you find them all?':'You found them all!'}`:'This is empty! Find things on the trail to fill it up.'])}${H.map(h=>`<h3>${esc(h.label)}</h3><div class="acards">${h.stops.map(a=>isDone(a)?`<div class="card done">${artOf(a)}<span>${esc(a.name)}</span><small>${String(a.fact||'').replace(/<[^>]+>/g,'')}</small></div>`:`<div class="card"><div class="shadow">${artOf(a)}</div><span>???</span></div>`).join('')}</div>`).join('')}</section>`}

/* ---------------- Paid packs ----------------
   Provider "demo" = pretend payment. "stripe" and "shopify" need the server in /server (see server/README.md). */
const dev=()=>{let d='';try{d=localStorage.getItem('trail-device')||'';if(!d){d=(crypto.randomUUID?crypto.randomUUID():'d'+Date.now()+Math.random().toString(36).slice(2));localStorage.setItem('trail-device',d)}}catch(e){}return d||'nodevice'+Date.now()};
async function api(path,body){const P=G.pay||{};if(!P.api)throw new Error('Codes are not switched on in this demo.');const r=await fetch(P.api.replace(/\/$/,'')+path,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Something went wrong. Please try again.');return j}
function grant(a){S.access={...(S.access||{}),[a.pack]:{exp:a.exp,code:a.code}};if(LV.some(l=>l.id===a.pack))S.level=a.pack;S.pending=null;go('intro');tell('Unlocked!')}
function payPage(){const l=lv(),P=G.pay||{},pr=l.prices||{1:l.price||''},n=S.t.n||1;
 return `${top('home','← Back')}<section class="panel"><p class="eyebrow">For grown-ups</p><h2>Unlock: ${esc(l.label)}</h2>${l.desc?`<p>${esc(l.desc)}</p>`:''}<div class="grownup"><strong>Ask a grown-up</strong>Only a grown-up should pay. ${!P.provider||P.provider==='demo'?'This is a demo. No money is taken.':`You pay ${esc(G.museum)}. The game unlocks for today.`}</div><h3>How many phones will play?</h3><div class="levels">${Object.entries(pr).map(([k,v])=>`<button class="level" data-action="phones" data-v="${esc(k)}" aria-pressed="${+k===n}">📱 × ${esc(k)}<b>${esc(v)}</b></button>`).join('')}</div><div class="row" style="margin-top:16px">${btn(`Pay ${esc(pr[n]||'')} →`,'checkout','go wide',S.t.busy?'disabled':'')}</div><h3>Already paid?</h3><label class="field" style="max-width:none">Type your code<input id="payCode" autocapitalize="characters" autocomplete="off" maxlength="24" value="${esc(S.t.val||'')}" placeholder="ABCD-1234-EFGH"></label><div style="margin-top:10px">${btn('Use code','redeem','soft')}</div>${S.t.msg?`<div class="feedback" role="alert">${esc(S.t.msg)}</div>`:''}</section>`}
async function resume(){const P=G.pay;if(!P||PREVIEW)return;const clean=()=>history.replaceState(null,'',location.pathname+(QS.get('game')?'?game='+gameId:''));
 try{if(QS.get('paid')){const a=await api('/claim',{trail:G.id,session:QS.get('paid'),device:dev()});clean();QS.delete('paid');grant(a)}
  else if(QS.get('unlock')){const a=await api('/redeem',{trail:G.id,code:QS.get('unlock'),device:dev()});clean();QS.delete('unlock');grant(a)}
  else if(S.pending&&P.provider==='shopify'){grant(await api('/claim',{trail:G.id,pack:S.pending,device:dev()}))}}
 catch(e){if(QS.get('paid')||QS.get('unlock')){S.phase='pay';S.t={msg:e.message};render()}}}
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&S.pending)resume()});

/* ---------------- Engine ---------------- */
const PAGES={intro,collection:collectionPage,pay:payPage,mystery:mysteryPage,map:mapPage,zone:zonePage,stop:stopPage,stamp:stampPage,design:designPage,won:wonPage};
function render(){calcH();save();if(!H.length){app.innerHTML=`<div class="error"><h2>Nothing to play yet</h2><p>This trail has no ${esc(W.stops)} with a game for this level.</p>${LV.length>1?LV.map(l=>`<button class="btn soft" data-action="level" data-v="${esc(l.id)}">${esc(l.label)}</button>`).join(' '):''}</div>`;return}
 if(!PAGES[S.phase]||(['zone','stamp'].includes(S.phase)&&!H.some(h=>h.id===S.h))||(S.phase==='stop'&&!H.some(h=>h.stops.some(s=>s.id===S.a))))S.phase='intro';
 if(!has(lv())&&!['intro','pay'].includes(S.phase))S.phase='intro';if(S.phase==='mystery'&&!myst())S.phase='map';
 app.innerHTML=PAGES[S.phase]();soundBtn.textContent=S.sound?'🔊 Sound on':'🔇 Sound off';soundBtn.setAttribute('aria-pressed',S.sound);save()}
function go(phase,extra={}){hush();Object.assign(S,extra);S.phase=phase;S.tries=0;S.wrong=[];S.solved=false;S.t={};render();window.scrollTo(0,0);document.getElementById('main').focus({preventScroll:true});const z=phase==='zone'&&hg(S.h);if(z&&z.audio&&S.sound){try{new Audio(z.audio).play().catch(()=>say())}catch(e){say()}}else say()}
function openH(id){const i=H.findIndex(h=>h.id===id);if(i<0)return;if(!open_(i)&&!S.demo){tell('Finish the one before first.');sayNow(`Finish ${H[i-1].label} first!`);return}go('zone',{h:id})}
function sign(v){const h=hg(S.h);if(v===h.sign){if(!S.unlocked.includes(h.id))S.unlocked.push(h.id);go('zone')}else{if(!S.wrong.includes(v))S.wrong.push(v);rr()}}
const rnd=arr=>arr[Math.floor(Math.random()*arr.length)];
function scan(){calcH();const id=QS.get('z')||QS.get('h'),code=QS.get('code'),h=H.find(x=>x.id===id);if(h&&code===h.sign){if(!S.unlocked.includes(id))S.unlocked.push(id);S.h=id;S.phase='zone';save();history.replaceState(null,'',location.pathname+(QS.get('game')?'?game='+gameId:''))}}
scan();
const ACTS={home:()=>go('intro'),collection:()=>go('collection'),start:()=>has(lv())?go('map'):go('pay'),
 spot:v=>{const t=taskOf(ac(S.a)),o=optv(t).find(x=>x.v===v);if(!o.diff)return miss(v,'That one is right on the real one. Look again!');S.t.seen=[...new Set([...(S.t.seen||[]),v])];S.t.seen.length>=optv(t).filter(x=>x.diff).length?solve():rr()},
 jig:v=>{const t=taskOf(ac(S.a));S.t.seen=[...new Set([...(S.t.seen||[]),v])];S.t.seen.length>=t.items.length?solve():rr()},
 dig:v=>{const[i,k]=v.split(':').map(Number),c=taskOf(ac(S.a)).clues,d=S.t.d||c.map(()=>0);d[i]=(d[i]+k+10)%10;S.t.d=d;rr()},
 poll:()=>solve(),nophoto:()=>solve(),
 accuse:v=>{+v===+myst().answer?(S.myDone=lv().id,go(F.type==='none'?'won':'design')):miss(v,'Not that one! Read the clues again.')},
 phones:v=>{S.t.n=+v;rr()},
 checkout:async()=>{const l=lv(),P=G.pay||{},n=S.t.n||1;try{
  if(!P.provider||P.provider==='demo'){if(confirm('Demo payment. No money is taken. Pretend to pay?')){const e=new Date();e.setHours(23,59,59);grant({pack:l.id,exp:+e,code:'DEMO'})}return}
  if(P.provider==='shopify'){S.pending=l.id;save();location.href=`https://${P.shop}/cart/${(l.shopify||{})[n]}:1?attributes[trail]=${encodeURIComponent(G.id)}&attributes[pack]=${encodeURIComponent(l.id)}&attributes[device]=${encodeURIComponent(dev())}`;return}
  S.t.busy=true;rr();const j=await api('/checkout',{trail:G.id,pack:l.id,phones:n,device:dev(),back:location.href.split('#')[0]});location.href=j.url}
  catch(e){S.t.busy=false;S.t.msg=e.message;rr()}},
 redeem:async()=>{try{grant(await api('/redeem',{trail:G.id,code:(S.t.val||'').trim(),device:dev()}))}catch(e){S.t.msg=e.message;rr()}},map:()=>go('map'),say,backH:()=>go('zone'),stamp:()=>go('stamp'),won:()=>go('won'),print:()=>window.print(),check,
 level:(v)=>{S.level=v;S.sound=lv().readAloud!==false;go('intro')},
 openH:(v,id)=>openH(id),openA:(v,id)=>{const a=ac(id);go('stop',{a:id,h:a.h});if(isDone(a)){S.solved=true;rr()}},
 skipSign:()=>{if(DEMO_BUILD){S.unlocked.push(S.h);go('zone')}},sign,
 answer:v=>{if(S.solved)return;v===String(taskOf(ac(S.a)).answer)?solve():miss(v)},
 cnt:v=>{const t=taskOf(ac(S.a));S.t.n=Math.max(0,Math.min(+t.max||20,(S.t.n||0)+ +v));rr()},
 ord:v=>{const t=taskOf(ac(S.a)),k=S.t.k||0;if(+v===k){S.t.k=k+1;S.wrong=[];S.t.msg='';S.t.k===t.items.length?solve():rr()}else miss(v,'Not that one yet. Try again!')},
 ml:v=>{S.t.s=+v;S.t.msg='';rr()},
 mr:v=>{const t=taskOf(ac(S.a));if(S.t.s==null){S.t.msg='Tap one on the left first.';rr()}else if(+v===S.t.s){S.t.d=[...(S.t.d||[]),+v];S.t.s=null;S.wrong=[];S.t.msg='';S.t.d.length===t.pairs.length?solve():rr()}else miss('r'+v,'Not a match. Try again!')},
 spy:v=>{const t=taskOf(ac(S.a)),s=S.t.seen||[];S.t.seen=s.includes(v)?s.filter(x=>x!==v):[...s,v];S.t.seen.length>=Math.min(t.need||99,t.options.length)?solve():rr()},
 skipH:()=>{if(confirm('Skip this one? You can come back to it later.')){if(!S.skipped.includes(S.h))S.skipped.push(S.h);const i=H.findIndex(h=>h.id===S.h);H[i+1]?go('zone',{h:H[i+1].id}):go('map')}},
 design:()=>{if(!(allPassed()||S.demo))return;if(myst()&&S.myDone!==lv().id)return go('mystery');go(F.type==='none'?'won':'design')},
 set:(v,id,t)=>{S.make[t.dataset.g]=v;rr()},
 random:()=>{S.make={...S.make,shape:rnd(D.shapes)[0],body:rnd(D.colours)[0],wing:rnd(D.colours)[0],pattern:rnd(D.patterns)[0],sticker:rnd(D.stickers)[0],trail:D.trails?rnd(D.trails)[0]:'none',nose:D.noses?rnd(D.noses)[0]:'none'};rr()},
 restart:()=>{if(confirm('Start again? This clears progress on this phone.')){const keep={sound:S.sound,level:S.level,demo:S.demo,access:S.access};S={...fresh(),...keep};go('intro')}}};
document.addEventListener('click',e=>{const t=e.target.closest('[data-action]');if(!t||t.disabled||!ACTS[t.dataset.action])return;ACTS[t.dataset.action](t.dataset.v,t.dataset.id,t)});
document.addEventListener('input',e=>{const el=e.target;
 if(el.id==='nameIn'||el.id==='nameIn2'){S.name=el.value.slice(0,20);const c=document.getElementById('certname');if(c)c.textContent=S.name.trim()||'Explorer';save()}
 if(el.id==='planeIn'){S.make.label=el.value.slice(0,18);const pn=document.getElementById('pname');if(pn)pn.textContent=S.make.label;save()}
 if(el.id==='codeIn'||el.id==='payCode'){S.t.val=el.value;save()}
 if(el.id==='othersIn'){S.others=el.value;save()}
 if(el.id==='numIn'){S.make.number=el.value.replace(/[^0-9]/g,'').slice(0,2);const pv=document.getElementById('preview');if(pv)pv.firstElementChild.outerHTML=draw(mk(),{pilot:true});save()}
 if(el.id==='estIn'){S.t.val=+el.value;const t=taskOf(ac(S.a));document.getElementById('estOut').textContent=el.value+(t.unit?' '+t.unit:'');save()}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='codeIn')check()});
document.addEventListener('change',e=>{if(e.target.id==='photoIn'&&e.target.files[0]){PHOTOS[key(ac(S.a))]=URL.createObjectURL(e.target.files[0]);solve();return}
 if(e.target.matches('[data-action="toggleDemo"]')&&DEMO_BUILD){S.demo=e.target.checked;rr()}});
soundBtn.addEventListener('click',()=>{S.sound=!S.sound;if(!S.sound)hush();rr()});
render();resume();
}

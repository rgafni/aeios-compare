/* AEIOS · Today · F "Coach". All content is fictional sample data (same demo day as the other versions: Maya's Thursday). */
(function(){
'use strict';
var $=function(i){return document.getElementById(i);};
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function clk(m){var h=Math.floor(m/60),mm=m%60;return (h%12||12)+':'+(mm<10?'0':'')+mm+' '+(h>=12?'PM':'AM');}
function sh(m){var h=Math.floor(m/60),mm=m%60;return (h%12||12)+':'+(mm<10?'0':'')+mm;}
function later(fn,ms){return setTimeout(fn,RM?0:ms);}

/* coach avatar: a friendly purple blob (no images, no external assets) */
function avatar(){return '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="31" fill="#7b5cff"/><path d="M8 26a26 26 0 0 1 48 0" fill="none" stroke="#a991ff" stroke-width="5" stroke-linecap="round"/>'+
 '<circle cx="23" cy="31" r="6" fill="#fff"/><circle cx="41" cy="31" r="6" fill="#fff"/><circle cx="24.5" cy="32" r="3" fill="#1d1838"/><circle cx="42.5" cy="32" r="3" fill="#1d1838"/>'+
 '<path d="M22 43c5 5 15 5 20 0" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/><circle cx="15" cy="41" r="3.5" fill="#ff8fb8" opacity=".8"/><circle cx="49" cy="41" r="3.5" fill="#ff8fb8" opacity=".8"/>'+
 '<path d="M52 6l1.6 3.8L57.5 11l-3.9 1.4L52 16l-1.6-3.6L46.5 11l3.9-1.2z" fill="#ffd35c"/></svg>';}
['av1','av2','av3'].forEach(function(i){$(i).innerHTML=avatar();});

var IC={
 sun:'M12 4V2M12 22v-2M4 12H2M22 12h-2M6 6 4.6 4.6M19.4 19.4 18 18M6 18l-1.4 1.4M19.4 4.6 18 6M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
 bag:'M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2',
 bus:'M6 17V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11M6 12h12M8 20v-3M16 20v-3M6 17h12',
 school:'M3 9l9-5 9 5-9 5zM7 11v5c3 2 7 2 10 0v-5',
 snack:'M12 7c-1.5-1-5-1.5-6.5 1.5S5.5 17 8 19.5c1.3 1.3 2.6 1 4 .3 1.4.7 2.7 1 4-.3 2.5-2.5 4-8 2.5-11S13.5 6 12 7ZM12 7c0-2 1-3.5 3-4',
 lab:'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 15h9',
 music:'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
 math:'M5 5h14v14H5zM8 9h3M9.5 7.5v3M13 9h3M8 15l3-3M8 12l3 3M13 14h3M13 16h3',
 food:'M4 11h16a8 8 0 0 1-16 0ZM9 4v4M12 3v5M15 4v4',
 book:'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5',
 phone:'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1Z',
 moon:'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z',
 check:'M5 12.5l4.5 4.5L19 7.5',
 play:'M8 5v14l11-7z',pause:'M7 5h4v14H7zM13 5h4v14h-4z'};
function ic(n,s,fill){return '<svg width="'+(s||20)+'" height="'+(s||20)+'" viewBox="0 0 24 24" '+(fill?'fill="currentColor"':'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"')+' aria-hidden="true"><path d="'+IC[n]+'"/></svg>';}

/* ---------- sample plan (built with the coach) ---------- */
var BASE=[
 ['bfast',425,460,'Breakfast & bag check','Lab notebook in?','--food','bag'],
 ['leave',465,495,'Leave for school','Bus at 7:45','--school','bus'],
 ['school',495,870,'School','Science is 4th period','--school','school'],
 ['snack',900,960,'Snack & chill','Phone break, guilt-free','--food','snack'],
 ['lab',960,1005,'Lab writeup','Science · due tomorrow','--sci','lab'],
 ['piano',1010,1040,'Piano practice','20 min, then done','--music','music'],
 ['math',1050,1080,'Math worksheet','Pages 40–44 · due Fri','--math','math'],
 ['dinner',1110,1140,'Dinner','Family table','--food','food'],
 ['read',1170,1200,'Read a chapter','Any book you like','--read','book'],
 ['wrap',1230,1245,'Wrap-up with coach','Quick call or text','--call','phone'],
 ['lights',1290,1300,'Lights out','Sleep well','--rest','moon']];
var MOVED={piano:[960,990],lab:[1020,1065],math:[1070,1100]}; /* "Make it 5" */

/* ---------- per-phase content ---------- */
var P={
 morning:{when:435,sent:'texted 7:05 AM',note:'Planned with coach last night at 8:40',pts:110,
  msg:'Morning, Maya! ☀️ Leave by <em>7:45</em>. Is your lab notebook and math worksheet in your bag?',
  chips:[['Bag’s packed ✓','Nice! That’s 4 mornings in a row 🎒 Have a great day. I’ll text you after school.',function(){S.tog.bfast=true;},10],
   ['Remind me at 7:40','You got it. I’ll text you at 7:40 sharp ⏰',null,0],['Talk it through','call']],
  call:[['Coach','Morning! Quick bag check: lab notebook?'],['Coach','And the math worksheet, pages 40 to 44.']],
  say:[['Got both','Perfect. Out the door by 7:45 and you’re golden.'],['Can’t find the worksheet','Check your blue folder first. If it’s not there, I’ll remind you to grab a copy from Ms. Rivera.']],
  notes:['chen','dad0']},
 school:{when:600,sent:'texted 8:05 AM',note:'Planned with coach last night at 8:40',pts:120,
  msg:'Have an awesome day. I’ll stay quiet while you’re in class 🤫 Watch what the cart does in lab, 4th period!',
  chips:[['👍 Got it','See you at 2:30 👋',null,0],['Remind me at lunch','Will do. I’ll text at 11:30.',null,0]],
  call:[['Coach','Hey! You’re at school, so I’ll keep this short. What’s up?']],
  say:[['Just checking in','Love that. Talk after school!']],
  notes:['chen','dad0']},
 afternoon:{when:945,sent:'texted 3:40 PM',note:'Planned with coach at 3:40',pts:130,
  msg:'Hey Maya, you’ve got the <em>science lab writeup</em> due tomorrow and a <em>math worksheet</em>. Want to start with the lab at 4?',
  chips:[['Yes, 4 works','Locked in 🔒 I’ll text you at 4. Tiny first step: open the lab doc and write one sentence about what the cart did.',null,10],
   ['Make it 5','Done! Piano at 4, lab at 5, worksheet after. Your plan’s updated ✨',function(){S.moved=true;},10],['Talk it through','call']],
  call:[['Coach','Hey Maya! So, lab writeup and a math worksheet tonight.'],['Coach','Which one feels bigger right now?']],
  say:[['The lab','Then let’s do it first while your brain is fresh. What’s the one thing the cart did that surprised you?'],['Can I start at 5?','Sure. Piano at 4, lab at 5. I’ll update your plan.'],['I’m stuck on the ending','Endings are just: what happened, and one thing you’d test next time. Want to say it out loud first?']],
  notes:['rivera','chen']},
 dinner:{when:1110,sent:'texted 6:10 PM',note:'Planned with coach at 3:40',pts:140,
  msg:'Lab writeup: <em>done</em> ✅ Nice! Dinner’s at 6:30. Want to do the math worksheet after dinner?',
  chips:[['After dinner','Cool. 7:15, 25 minutes, then reading. I’ll ping you.',null,10],['Doing it now','Go for it 💪 Pages 40 to 44. Text me if a problem gets weird.',null,10],['Talk it through','call']],
  call:[['Coach','Hey! Lab’s done, amazing. Worksheet: now or after dinner?']],
  say:[['After dinner','Deal. I’ll text you at 7:15.']],
  notes:['rivera','dad1']},
 evening:{when:1230,sent:'texted 8:30 PM',note:'Planned with coach at 3:40',pts:150,
  msg:'Hey Maya, wrap-up time 🌙 <em>What got done?</em> Anything for tomorrow?',
  chips:[['All done!','Amazing day 🙌 Tomorrow: argument revision and history sources are due. Bag check at 7:15. Sleep well!',function(){S.tog.math=true;S.tog.read=true;S.tog.wrap=true;},10],
   ['Worksheet’s not done','No stress. I moved it to tomorrow at 3:45, 25 minutes. Anything else for tomorrow?',function(){S.tog.wrap=true;S.tmrw=true;},10],['Talk it through','call']],
  call:[['Coach','Hey Maya! Wrap-up time. What got done today?']],
  say:[['Lab and piano','Two big ones! And the worksheet?'],['Worksheet’s not done','Okay. Tomorrow at 3:45 for 25 minutes. Sound good?'],['Nothing for tomorrow','Then pack your bag and you’re free. Night!']],
  notes:['rivera','dad1']}};
var NOTES={
 rivera:['MR','#7a5cff','Ms. Rivera','Math · today 1:52 PM',9,'Maya, great question in class today about why you flip the sign. That’s real thinking.'],
 chen:['DC','#14a38b','Dr. Chen','Science · yesterday',11,'Nice graph in lab yesterday! Add one limitation to your write-up and it’s a strong one.'],
 dad0:['D','#ff7a3d','Dad','last night',7,'Thanks for packing your bag without me asking. I noticed!'],
 dad1:['D','#ff7a3d','Dad','today 7:05 PM',8,'Saw you start the lab on your own at 4. Proud of you, kiddo.']};
var PRACTICE={call:[['Coach','Okay: giant steel ship floats, tiny pebble sinks.'],['Coach','Quick first guess. Is it about weight?']],
 say:[['It’s about weight','Good start! But the ship is WAY heavier than the pebble, and it floats. So what else could matter?'],['Maybe the shape?','Ooh. What does a ship’s shape do to the water around it?'],['Not sure','Totally fine. Picture pushing a beach ball underwater. What does the water do?']]};

function phaseOf(t){return t<495?'morning':t<870?'school':t<1050?'afternoon':t<1170?'dinner':'evening';}
function themeOf(p){return p==='dinner'?'afternoon':p;}

/* ---------- state ---------- */
var T=945,PH='',S,STREAK=4,THINK=false,BONUS=0;
function freshS(){return {tog:{},moved:false,tmrw:false,thread:[],chose:false,pts:0};}
S=freshS();

function blocks(){var b=BASE.map(function(r){var m=S.moved&&MOVED[r[0]];return {id:r[0],s:m?m[0]:r[1],e:m?m[1]:r[2],t:r[3],sub:r[4],c:r[5],i:r[6]};});
 if(S.moved)b.sort(function(x,y){return x.s-y.s;});return b;}
function isDone(b){if(b.id in S.tog)return S.tog[b.id];if(b.id==='wrap'||b.id==='lights')return false;if(b.id==='math')return false;/* the one thing still open tonight */return b.e<=T;}

/* ---------- render ---------- */
function render(){
 var p=P[PH];
 document.body.className=document.documentElement.className='ph-'+themeOf(PH);
 document.querySelector('meta[name=theme-color]').content=themeOf(PH)==='evening'?'#141238':themeOf(PH)==='morning'?'#fff6dc':themeOf(PH)==='school'?'#eaf3ff':'#fff4e8';
 $('when').textContent='Thu, Oct 8 · '+clk(T);
 [].forEach.call($('seg').children,function(b){var on=b.dataset.p===themeOf(PH);b.setAttribute('aria-checked',on);b.tabIndex=on?0:-1;});
 $('sent').textContent='Your coach · '+p.sent;
 renderThread();renderPlan();renderThink();renderNotes();renderPts();
}
function renderThread(){
 var p=P[PH],h='<div class="bub">'+p.msg+'</div>';
 var th=S.thread.slice(-3);
 th.forEach(function(m){h+='<div class="bub sm'+(m.me?' me':'')+(m.n?' enter':'')+'">'+(m.html?m.text:esc(m.text))+'</div>';m.n=false;});
 if(S.typing)h+='<div class="typing" aria-label="Coach is typing"><i></i><i></i><i></i></div>';
 $('thread').innerHTML=h;
 var q='';if(!S.chose)p.chips.forEach(function(c,i){q+='<button type="button" data-chip="'+i+'">'+esc(c[0])+'</button>';});
 $('qr').innerHTML=q;$('qr').hidden=!q;
}
function renderPlan(){
 var b=blocks(),h='',done=0,nowId=null,nextId=null;
 b.forEach(function(x){if(T>=x.s&&T<x.e)nowId=x.id;if(!nextId&&x.s>T)nextId=x.id;});
 b.forEach(function(x){var d=isDone(x);if(d)done++;var now=x.id===nowId;
  h+='<button type="button" role="listitem" class="blk'+(d?' done':'')+(now?' now':'')+(x.flash?' moved':'')+'" data-b="'+x.id+'" style="--c:var('+x.c+')" aria-pressed="'+d+'" aria-label="'+esc(sh(x.s)+' '+x.t+'. '+(d?'Done':'Tap to mark done'))+'">'+
   (now?'<span class="tag">Now</span>':'')+'<span class="ck">'+ic('check',16)+'</span><span class="tm">'+sh(x.s)+'</span><span class="bi">'+ic(x.i,18)+'</span><span class="bt">'+esc(x.t)+'</span><span class="bs">'+esc(x.id==='math'&&S.tmrw?'Moved to tomorrow 3:45':x.sub)+'</span></button>';});
 h+='<div role="listitem" class="blk tmrw"><span class="tm">Tomorrow · Fri</span><span class="bt">Coming up</span><span class="bs">'+(S.tmrw?'Math worksheet 3:45<br>':'')+'Argument revision due<br>History sources due<br>Basketball 3:15</span></div>';
 $('strip').innerHTML=h;
 $('progT').textContent=done+' of '+b.length+' done';
 $('progB').style.transform='scaleX('+(done/b.length)+')';
 $('planNote').innerHTML=ic('check',14)+esc(S.moved||S.tmrw?'Updated with coach just now':P[PH].note);
 return nowId||nextId;
}
function scrollPlan(smooth){var id=null,b=blocks();b.forEach(function(x){if(!id&&T<x.e)id=x.id;});if(!id)id=b[b.length-1].id;
 var el=$('strip').querySelector('[data-b="'+id+'"]');if(!el)return;var st=$('strip');
 st.scrollTo({left:Math.max(0,el.getBoundingClientRect().left-st.getBoundingClientRect().left+st.scrollLeft-16),behavior:smooth&&!RM?'smooth':'auto'});}
function renderThink(){
 $('stN').textContent=STREAK+(THINK?1:0);
 var d=['M','T','W','T','F'],h='';d.forEach(function(x,i){h+='<i class="'+(i<3||(i===3&&THINK)?'on':i===3?'td':'')+'">'+x+'</i>';});
 $('days').innerHTML=h;
 $('bThink').classList.toggle('did',THINK);
 $('bThink').querySelector('.ic').innerHTML=THINK?ic('check',16):'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-2.1A7 7 0 0 0 19 12Z"/></svg>';
 $('thinkL').textContent=THINK?'Done today · talk again':'Start a 5-min talk';
 document.querySelector('.qh').textContent=THINK?'Nice thinking today. Tomorrow’s question unlocks at 3:30.':PH==='evening'?'Still time tonight to keep your streak going. No wrong first guesses.':'No looking it up. Coach asks, you think out loud. No wrong first guesses.';
}
function renderNotes(){var h='';P[PH].notes.forEach(function(k){var n=NOTES[k],w='';for(var i=0;i<22;i++)w+='<i style="height:'+(6+Math.round(14*Math.abs(Math.sin(i*1.7+n[4]))))+'px"></i>';
 h+='<article class="note-c" data-n="'+k+'"><div class="nh"><span class="nav" style="background:'+n[1]+'">'+n[0]+'</span><div><b>'+esc(n[2])+'</b><span>'+esc(n[3])+' · voice note 0:'+(n[4]<10?'0':'')+n[4]+'</span></div>'+
  '<button type="button" class="play" data-play="'+k+'" aria-label="Play voice note from '+esc(n[2])+'">'+ic('play',18,1)+'</button></div><div class="wave" aria-hidden="true">'+w+'</div><p class="tx">'+esc(n[5])+'</p></article>';});
 $('notes').innerHTML=h;}
function totalPts(){return P[PH].pts+S.pts+BONUS;}
function renderPts(){var t=totalPts();$('pts').innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"/></svg>'+t+'<span class="sr"> points</span>';
 $('rwT').textContent=Math.min(t,200)+' / 200 pts · +10 per check-in';$('rwB').style.transform='scaleX('+Math.min(1,t/200)+')';}
function bump(n,why){if(!n)return;$('pts').classList.remove('bump');void $('pts').offsetWidth;$('pts').classList.add('bump');toast('+'+n+' pts · '+why);}
var tt;function toast(s){var e=$('toast');e.textContent=s;e.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){e.classList.remove('on');},2200);}

/* ---------- time ---------- */
function setT(t,force){t=Math.max(360,Math.min(1350,t|0));var ph=phaseOf(t),changed=ph!==PH;T=t;if(changed||force){PH=ph;S=freshS();}render();scrollPlan(false);}
function parseT(s){var m=/^(\d{1,2}):?(\d{2})$/.exec(s||'');return m?(+m[1])*60+(+m[2]):null;}
function initialT(){var h=/t=([0-9:]+)/.exec(location.hash||''),t=h&&parseT(h[1]);if(t==null){var q=new URLSearchParams(location.search).get('t');t=q&&parseT(q);}return t==null?945:t;}
window.addEventListener('hashchange',function(){var h=/t=([0-9:]+)/.exec(location.hash||''),t=h&&parseT(h[1]);if(t!=null)setT(t);});
/* the compare page posts {type:'demoTime', t:'HH:MM'}; only accept it from our own origin */
window.addEventListener('message',function(e){if(e.origin!==location.origin&&location.origin!=='null')return;var d=e.data;if(d&&d.type==='demoTime'&&typeof d.t==='string'){var t=parseT(d.t);if(t!=null)setT(t);}});
var inFrame=false;try{inFrame=window.self!==window.top;}catch(e){inFrame=true;}
$('pv').hidden=inFrame;
$('seg').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var t=P[b.dataset.p].when;setT(t,true);try{history.replaceState(null,'','#t='+(t<600?'0':'')+Math.floor(t/60)+':'+(t%60<10?'0':'')+t%60);}catch(x){}});
$('seg').addEventListener('keydown',function(e){var k=e.key,o=['morning','afternoon','evening'],i=o.indexOf(themeOf(PH));if(k!=='ArrowRight'&&k!=='ArrowLeft')return;e.preventDefault();i=(i+(k==='ArrowRight'?1:2))%3;$('seg').children[i].click();$('seg').children[i].focus();});

/* ---------- quick replies ---------- */
$('qr').addEventListener('click',function(e){var b=e.target.closest('[data-chip]');if(!b)return;var c=P[PH].chips[+b.dataset.chip];
 if(c[1]==='call'){openCall('call');return;}
 S.chose=true;S.thread.push({me:1,text:c[0],n:1});S.typing=true;renderThread();
 later(function(){S.typing=false;S.thread.push({text:c[1],n:1});if(c[2])c[2]();if(c[3]){S.pts+=c[3];}render();if(S.moved){flash(['piano','lab','math']);}if(c[3])bump(c[3],'check-in');syncText();},900);});
function flash(ids){ids.forEach(function(id){var el=$('strip').querySelector('[data-b="'+id+'"]');if(el){el.classList.add('moved');}});scrollPlan(true);}

/* ---------- plan blocks: tap to mark done ---------- */
$('strip').addEventListener('click',function(e){var b=e.target.closest('[data-b]');if(!b)return;var x=blocks().filter(function(y){return y.id===b.dataset.b;})[0];
 S.tog[x.id]=!isDone(x);var sl=$('strip').scrollLeft;renderPlan();$('strip').scrollLeft=sl;
 var nb=$('strip').querySelector('[data-b="'+x.id+'"]');nb&&nb.focus({preventScroll:true});if(S.tog[x.id])toast('Nice! “'+x.t+'” done');});

/* ---------- voice notes (sample transcripts; no audio in the demo) ---------- */
var playing=null;
$('notes').addEventListener('click',function(e){var b=e.target.closest('[data-play]');if(!b)return;var card=b.closest('.note-c'),k=b.dataset.play;
 if(playing){clearTimeout(playing.t);playing.card.classList.remove('playing');playing.btn.innerHTML=ic('play',18,1);var same=playing.k===k;playing=null;if(same)return;}
 card.classList.add('playing');b.innerHTML=ic('pause',18,1);playing={k:k,card:card,btn:b,t:setTimeout(function(){card.classList.remove('playing');b.innerHTML=ic('play',18,1);playing=null;},NOTES[k][4]*1000)};});

/* ---------- sheets ---------- */
var openSheet=null,lastFocus=null;
function show(el){lastFocus=document.activeElement;openSheet=el;$('scrim').hidden=false;el.hidden=false;document.querySelector('main').inert=true;
 requestAnimationFrame(function(){requestAnimationFrame(function(){$('scrim').classList.add('on');el.classList.add('on');});});}
function hide(){var el=openSheet;if(!el)return;openSheet=null;$('scrim').classList.remove('on');el.classList.remove('on');document.querySelector('main').inert=false;
 later(function(){el.hidden=true;$('scrim').hidden=true;},300);if(lastFocus&&lastFocus.focus)lastFocus.focus({preventScroll:true});}
$('scrim').addEventListener('click',function(){if(openSheet===$('callS'))endCall();else hide();});
document.addEventListener('keydown',function(e){if(!openSheet)return;
 if(e.key==='Escape'){e.preventDefault();if(openSheet===$('callS'))endCall();else hide();return;}
 if(e.key==='Tab'){var f=[].filter.call(openSheet.querySelectorAll('button,input,a[href]'),function(x){return !x.disabled&&x.offsetParent!==null;});if(!f.length)return;
  var a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}}});

/* call (simulated; nothing is dialed) */
var call=null;
function addCap(who,text){var d=document.createElement('div');d.className='cap'+(who==='You'?' me':'')+(RM?'':' enter');d.innerHTML='<b>'+esc(who)+'</b>'+esc(text);$('caps').appendChild(d);$('caps').scrollTop=$('caps').scrollHeight;}
function openCall(mode){var src=mode==='practice'?PRACTICE:P[PH];
 call={mode:mode,sec:0,said:0,timers:[]};$('caps').innerHTML='';$('say').innerHTML='';$('callS').classList.remove('talking');
 $('callH').textContent=mode==='practice'?'Thinking practice · Coach Juno':'Coach Juno';$('callSt').textContent='Calling…';$('mute').setAttribute('aria-pressed','false');
 show($('callS'));later(function(){$('endCall').focus();},60);
 call.timers.push(later(function(){if(!call)return;$('callS').classList.add('talking');tick();call.iv=setInterval(tick,1000);
  src.call.forEach(function(l,i){call.timers.push(later(function(){if(call)addCap(l[0],l[1]);if(i===src.call.length-1&&call)sayChips(src);},700+i*1500));});},1200));}
function tick(){if(!call)return;$('callSt').textContent='On the line · 0:'+(call.sec<10?'0':'')+call.sec;call.sec++;}
function sayChips(src){var h='';src.say.forEach(function(s,i){h+='<button type="button" data-say="'+i+'">“'+esc(s[0])+'”</button>';});$('say').innerHTML=h;}
$('say').addEventListener('click',function(e){var b=e.target.closest('[data-say]');if(!b||!call)return;var src=call.mode==='practice'?PRACTICE:P[PH],s=src.say[+b.dataset.say];
 addCap('You',s[0]);call.said++;b.disabled=true;b.style.opacity=.4;call.timers.push(later(function(){if(call)addCap('Coach',s[1]);},900));});
$('mute').addEventListener('click',function(){var on=this.getAttribute('aria-pressed')!=='true';this.setAttribute('aria-pressed',on);});
function endCall(){if(!call)return hide();var c=call;call=null;clearInterval(c.iv);c.timers.forEach(clearTimeout);hide();
 if(c.sec<1)return;var len='0:'+(c.sec<10?'0':'')+c.sec;
 if(c.mode==='practice'){if(!THINK&&c.said>0){THINK=true;BONUS+=15;renderThink();renderPts();bump(15,'streak '+(STREAK+1)+' 🔥');}else if(!THINK)toast('Answer once to count it for today');}
 else{S.thread.push({text:'📞 You talked with Coach Juno · '+len,n:1});if(!S.called){S.called=true;S.pts+=10;bump(10,'check-in');}S.chose=true;render();syncText();}}
$('endCall').addEventListener('click',endCall);
$('bCall').addEventListener('click',function(){openCall('call');});
$('bThink').addEventListener('click',function(){openCall('practice');});

/* texts (same thread as the top of the page) */
var REPLIES=['Got it 👍 I’ll fold that into your plan.','Good thinking. Want me to add that to today’s plan?','On it. I’ll check back at your next block.'],ri=0;
function syncText(){if(!openSheet||openSheet!==$('textS'))return;var h='<span class="tm">Today '+esc(P[PH].sent.replace('texted ',''))+'</span><div class="bub">'+P[PH].msg+'</div>';
 S.thread.forEach(function(m){h+='<div class="bub'+(m.me?' me':'')+'">'+(m.html?m.text:esc(m.text))+'</div>';});
 if(S.typing)h+='<div class="typing" aria-label="Coach is typing"><i></i><i></i><i></i></div>';
 $('tth').innerHTML=h;$('tth').scrollTop=$('tth').scrollHeight;}
$('bText').addEventListener('click',function(){show($('textS'));syncText();later(function(){$('tinput').focus({preventScroll:true});},320);});
$('closeText').addEventListener('click',hide);
$('tform').addEventListener('submit',function(e){e.preventDefault();var v=($('tinput').value||'').trim();if(!v)return;$('tinput').value='';
 S.thread.push({me:1,text:v.slice(0,300)});S.chose=true;S.typing=true;syncText();renderThread();
 later(function(){S.typing=false;S.thread.push({text:REPLIES[ri++%REPLIES.length]});syncText();renderThread();},900);});

/* ---------- menu: the shared drawer every variant uses ---------- */
$('menu').addEventListener('click',function(){if(window.AEIOSDrawer)window.AEIOSDrawer.open();});

setT(initialT(),true);
})();

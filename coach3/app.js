/* AEIOS Coach v3 prototype. The coach shows up across the app; the kid stays in charge. Fictional sample data only (Maya, Coach Juno, Ms. Ortiz). */
(function(){
'use strict';
var $=function(i){return document.getElementById(i);};
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function mark(){return '<svg viewBox="0 0 36 36" aria-hidden="true"><rect width="36" height="36" rx="10" fill="#5b5bd6"/><path d="M22.5 10v10.5a5.5 5.5 0 0 1-11 0" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/><circle cx="12.5" cy="11.5" r="2" fill="#fff" opacity=".55"/></svg>';}
function M(cls){return '<span class="mark'+(cls?' '+cls:'')+'">'+mark()+'</span>';}
var IC={
 scan:'M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M8 9h8M8 12h8M8 15h5',
 split:'M4 6h7M4 12h11M4 18h16M15 6h5',
 plan:'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
 bell:'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0',
 help:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01',
 chart:'M4 20V10M10 20V4M16 20v-7M22 20H2',
 phone:'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z',
 text:'M4 5h16v11H9l-5 4z',
 check:'M5 12.5l4.5 4.5L19 7',
 up:'M6 15l6-6 6 6',down:'M6 9l6 6 6-6',
 x:'M6 6l12 12M18 6L6 18',
 cam:'M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
 paste:'M9 4h6v3H9zM7 5H5v16h14V5h-2',
 plus:'M12 5v14M5 12h14'
};
function ic(n,s){s=s||22;return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+IC[n]+'"/></svg>';}
function clk(m){var h=Math.floor(m/60),mm=m%60;return (h%12||12)+':'+(mm<10?'0':'')+mm;}
function dur(m){return m>=60?(Math.floor(m/60)+'h'+(m%60?' '+m%60+'m':'')):m+'m';}
var toastT;
function toast(t){var e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){e.classList.remove('on');},2200);}

/* ---------- state (all fictional) ---------- */
var NOW=945, DINNER=1110;
var S={
 plan:[
  {id:'snack',t:'Snack',m:15},
  {id:'lab',t:'Lab writeup',m:25,sub:'Science',hist:[40,45]},
  {id:'math',t:'Math worksheet',m:40,sub:'Math'},
  {id:'piano',t:'Piano lesson',m:45,fixed:1020,sub:'Calendar'},
  {id:'poster',t:'Poster: pick sources',m:45,sub:'Science fair'},
  {id:'read',t:'Read',m:30,sub:'English'}
 ],
 done:{},
 keep:{},              /* flags the kid chose to keep */
 dismissed:{},
 extract:{mode:'paste',ran:null,items:null},
 org:null,
 stuck:{lvl:0,ans:null,loop:null,sent:null},
 ci:{later:false,more:false},
 rev:{note:'',replied:false},
 text:[],
 due:[{t:'Lab writeup',d:'Fri, Oct 9',s:'Science'},{t:'Math worksheet',d:'Fri, Oct 9',s:'Math'}]
};

/* compute times and coach flags for the kid's plan */
function layout(){
 var cur=NOW,out=[],before=[],after=[];
 S.plan.forEach(function(b){(b.after?after:before).push(b);});
 before.forEach(function(b){var s=b.fixed!=null?b.fixed:cur;var o={b:b,s:s,e:s+b.m};out.push(o);cur=Math.max(cur,o.e);if(b.fixed!=null)cur=o.e;});
 var c2=DINNER+45;after.forEach(function(b){out.push({b:b,s:c2,e:c2+b.m,after:1});c2+=b.m;});
 return out;
}
function flags(){
 var L=layout(),f=[];
 for(var i=0;i<L.length;i++){var o=L[i];
  if(o.b.hist&&!S.keep['est-'+o.b.id]&&o.b.m<Math.min.apply(null,o.b.hist)-5)f.push({k:'est',id:o.b.id,type:'est',msg:'You put <em>'+o.b.m+' min</em> for '+esc(o.b.t)+'. Your last two took '+o.b.hist.join(' and ')+'.'});
  var n=L[i+1];
  if(n&&!o.after&&!n.after&&n.b.fixed!=null&&o.b.fixed==null&&o.e>n.s&&!S.keep['con-'+o.b.id])f.push({k:'con',id:o.b.id,type:'con',nx:n.b.id,msg:'<em>'+esc(o.b.t)+'</em> runs to '+clk(o.e)+'. '+esc(n.b.t)+' starts at '+clk(n.s)+'.'});
 }
 var last=L.filter(function(o){return !o.after;}).pop();
 if(last&&last.e>DINNER&&!S.keep.over){var spill=L.filter(function(o){return !o.after&&o.b.fixed==null;}).pop();
  f.push({k:'over',id:spill&&spill.b.id,type:'over',msg:'Your plan runs to <em>'+clk(last.e)+'</em>. Dinner is 6:30.'});}
 return f;
}
function fixBtns(f){
 if(f.type==='est')return '<button class="btn sm" data-a="keep" data-k="est-'+f.id+'">Keep '+S.plan.filter(function(b){return b.id===f.id;})[0].m+'</button><button class="btn sm pri" data-a="setm" data-id="'+f.id+'" data-m="40">Make it 40</button>';
 if(f.type==='con')return '<button class="btn sm" data-a="keep" data-k="con-'+f.id+'">I\'ll handle it</button><button class="btn sm pri" data-a="after" data-id="'+f.id+'" data-nx="'+f.nx+'">Move after '+esc(S.plan.filter(function(b){return b.id===f.nx;})[0].t.split(' ')[0])+'</button>';
 return '<button class="btn sm" data-a="keep" data-k="over">Keep it</button><button class="btn sm pri" data-a="afterdinner" data-id="'+f.id+'">Move '+esc(S.plan.filter(function(b){return b.id===f.id;})[0].t)+' after dinner</button>';
}
function flagHead(f){return f.type==='est'?'Estimate check':f.type==='con'?'Conflict':'Too much for today';}
/* ---------- views ---------- */
var V={};
function cc(kind,head,tag,msg,btns,id){return '<article class="cc'+(kind?' '+kind:'')+'"'+(id?' data-card="'+id+'"':'')+'><div class="top">'+M()+'<span>'+head+'</span>'+(tag?'<span class="tag'+(kind==='warn'?' w':kind==='ok'?' ok':'')+'">'+tag+'</span>':'')+'</div><p class="msg">'+msg+'</p>'+(btns?'<div class="row g">'+btns+'</div>':'')+'</article>';}

V.home=function(){
 var L=layout(),F=flags(),h='';
 var next=L.filter(function(o){return !S.done[o.b.id]&&o.e>NOW;})[0];
 h+='<p class="hi">Hi Maya</p><p class="sub">'+S.due.length+' due this week</p>';
 if(next)h+='<section class="card now" style="margin-top:16px" aria-label="Next"><span class="k">Next · '+clk(next.s)+'</span><b>'+esc(next.b.t)+'</b><span class="t num">'+clk(next.s)+' to '+clk(next.e)+' · '+next.b.m+' min</span><div class="row g"><button class="btn dark sm" data-a="start" data-id="'+next.b.id+'">Start</button><a class="btn sm" href="#/stuck">I\'m stuck</a></div></section>';
 h+='<h2 class="h">'+M()+'Coach Juno<span class="r tag">'+(cardsCount())+' new</span></h2>';var cs=[];
 if(!S.dismissed.ex&&!S.extract.items)cs.push(cc('','From your email','Extract','Ms. Ortiz sent a science email. I found <em>3 dates</em> you don\'t have yet.','<a class="btn sm pri" href="#/extract">Review</a><button class="btn sm" data-a="dismiss" data-k="ex">Later</button>','ex'));
 F.slice(0,2).forEach(function(f){cs.push(cc('warn',flagHead(f),'Plan',f.msg,fixBtns(f),f.k));});
 if(!F.length)cs.push(cc('ok','Plan check','Plan','Your plan fits before dinner. Nice.','<a class="btn sm" href="#/plan">See plan</a>'));
 if(!S.dismissed.org)cs.push(cc('','Big task','Organize','Science fair poster is due <em>Fri, Oct 16</em>. Want to break it into steps?','<a class="btn sm pri" href="#/organize">Break it up</a><button class="btn sm" data-a="dismiss" data-k="org">Not now</button>','org'));
 cs.push(cc('','Next check-in','Check-ins','<em>4:00</em> start nudge for Lab writeup. After that, just one at 6:30.','<a class="btn sm" href="#/checkins">Check-ins</a>'));
 if(!S.dismissed.rev)cs.push(cc('','Yesterday','Reflect','You planned <em>2h 35m</em>. It took <em>3h 05m</em>. Writing ran long again.','<a class="btn sm" href="#/review">See why</a><button class="btn sm" data-a="dismiss" data-k="rev">Got it</button>','rev'));
 h+=cs.slice(0,S.more?99:3).join('');if(cs.length>3)h+='<button class="btn ghost full" style="margin-top:6px" data-a="more">'+(S.more?'Less':cs.length-3+' more from Juno')+'</button>';
 h+='<h2 class="h">My plan<a class="r btn ghost sm" href="#/plan">Edit</a></h2>'+planList(L,F,true);
 h+='<h2 class="h">Coach tools</h2><div class="tools">'+
  tool('#/extract','scan','Scan')+tool('#/organize','split','Break up')+tool('#/plan','plan','Plan')+
  tool('#/checkins','bell','Check-ins')+tool('#/stuck','help','Stuck')+tool('#/review','chart','Reflect')+'</div>';
 h+='<h2 class="h">Reach Juno</h2>'+reach();
 return h;
};
function cardsCount(){var F=flags();var n=Math.min(2,F.length)+(F.length?0:1)+1;if(!S.dismissed.ex&&!S.extract.items)n++;if(!S.dismissed.org)n++;if(!S.dismissed.rev)n++;return n;}
function tool(href,i,l){return '<a class="tool" href="'+href+'"><span class="ti">'+ic(i)+'</span>'+l+'</a>';}
function reach(){return '<div class="reach"><a class="btn pri" href="#/talk">'+ic('phone',20)+'Talk</a><a class="btn" href="#/text">'+ic('text',20)+'Text</a></div>';}
function planList(L,F,compact){
 var h='<div class="card"><ul class="list">';
 L.forEach(function(o,i){var b=o.b,d=S.done[b.id];
  if(o.after&&(i===0||!L[i-1].after))h+='<li class="li" style="background:var(--card2)"><div class="tx"><b>After dinner</b></div></li>';
  h+='<li><div class="li'+(d?' done':'')+(!compact&&b.fixed==null?' edit':'')+'">';
  h+='<div class="tx"><b>'+esc(b.t)+'</b><span class="num">'+clk(o.s)+' to '+clk(o.e)+(b.fixed!=null?' · fixed':'')+'</span></div>';
  var fl=F.filter(function(f){return f.id===b.id;})[0];
  if(!compact&&b.fixed==null)h+='<div class="mv"><button data-a="mv" data-id="'+b.id+'" data-d="-1" aria-label="Move '+esc(b.t)+' up"'+(i===0?' disabled':'')+'>'+ic('up',20)+'</button><button data-a="mv" data-id="'+b.id+'" data-d="1" aria-label="Move '+esc(b.t)+' down"'+(i===L.length-1?' disabled':'')+'>'+ic('down',20)+'</button></div>';
  if(!compact&&b.fixed==null)h+='<div class="stp'+(fl&&fl.type==='est'?' flag':'')+'"><button data-a="m" data-id="'+b.id+'" data-d="-5" aria-label="Less time for '+esc(b.t)+'">&minus;</button><span>'+b.m+'m</span><button data-a="m" data-id="'+b.id+'" data-d="5" aria-label="More time for '+esc(b.t)+'">+</button></div>';
  else h+='<span class="muted small num">'+b.m+'m</span>';
  if(compact||b.fixed!=null)h+='<button class="ck" data-a="done" data-id="'+b.id+'" aria-pressed="'+!!d+'" aria-label="Done: '+esc(b.t)+'"><i>'+ic('check',16)+'</i></button>';
  h+='</div>';
  if(fl&&!compact)h+='<div class="inl'+(fl.type==='est'?'':' w')+'">'+M()+'<div><p>'+fl.msg+'</p><div class="row">'+fixBtns(fl)+'</div></div></div>';
  else if(fl&&compact)h+='<div class="inl'+(fl.type==='est'?'':' w')+'">'+M()+'<div><p>'+fl.msg+'</p></div></div>';
  h+='</li>';
 });
 h+='</ul></div>';return h;
}

V.coach=function(){
 var F=flags();
 var h='<div class="who" style="margin-top:12px">'+M()+'Coach Juno · 3:40 PM</div><div class="th"><div class="bub">'+(F.length?F.length+' things on today\'s plan to look at. ':'Plan looks good. ')+'Poster steps are ready when you are.</div></div>';
 h+='<h2 class="h">What I can do</h2><div class="card"><ul class="list">';
 [['#/extract','scan','Scan','Email from Ms. Ortiz',S.extract.items?'Done':'3 new'],
  ['#/organize','split','Break up','Science fair poster','5 steps'],
  ['#/plan','plan','Plan my day','Today',F.length?F.length+' flags':'Fits'],
  ['#/checkins','bell','Check-ins','Next at 4:00','Level 2'],
  ['#/stuck','help','Stuck','Math worksheet','Hints'],
  ['#/review','chart','Reflect','This week','71%']].forEach(function(r){
  h+='<li><a class="li" href="'+r[0]+'"><span class="tool" style="min-height:0;padding:0;border:0"><span class="ti">'+ic(r[1])+'</span></span><div class="tx"><b>'+r[2]+'</b><span>'+r[3]+'</span></div>'+(r[4]?'<span class="tag">'+r[4]+'</span>':'')+'</a></li>';});
 h+='</ul></div><h2 class="h">Reach Juno</h2>'+reach();
 return h;
};

V.plan=function(){
 var L=layout(),F=flags(),last=L.filter(function(o){return !o.after;}).pop();
 var h='<p class="sub" style="margin-top:10px">Start <b class="num">'+clk(NOW)+'</b> · Done by <b class="num">'+clk(last.e)+'</b> · Dinner 6:30</p>';
 if(F.length)h+='<div class="cc warn" style="margin-top:12px"><div class="top">'+M()+'<span>'+F.length+' thing'+(F.length>1?'s':'')+' to look at</span></div></div>';
 else h+='<div class="cc ok" style="margin-top:12px"><div class="top">'+M()+'<span>Fits before dinner</span></div><p class="msg">No conflicts. Your call on the rest.</p></div>';
 h+='<h2 class="h">My plan<span class="r small">You set the times</span></h2>'+planList(L,F,false);
 h+='<form class="tform" data-f="add"><label class="sr" for="addT">New block</label><input class="inp" id="addT" maxlength="40" placeholder="Add a block" autocomplete="off"><button class="btn pri" type="submit">Add</button></form>';
 return h;
};
/* ---------- Extract ---------- */
var EMAIL='From: Ms. Ortiz (Science)\nSubject: Next two weeks\n\nHi 8th grade! Reminder that the density lab writeup is due Friday 10/9. Science fair topics need my OK by Tuesday 10/13. Posters are due Friday 10/16, and we have a Chapter 4 quiz on Wednesday 10/14. See you tomorrow!';
var FOUND={
 paste:[
  {t:'Lab writeup',d:'Fri, Oct 9',q:'density lab writeup is due Friday 10/9',dup:1},
  {t:'Get science fair topic OK\'d',d:'Tue, Oct 13',q:'topics need my OK by Tuesday 10/13'},
  {t:'Chapter 4 quiz',d:'Wed, Oct 14',q:'Chapter 4 quiz on Wednesday 10/14'},
  {t:'Science fair poster',d:'Fri, Oct 16',q:'Posters are due Friday 10/16'}],
 photo:[
  {t:'Read ch. 7 to 9',d:'Mon, Oct 12',q:'Read chapters 7 to 9 by Mon 10/12'},
  {t:'Vocab quiz, unit 3',d:'Thu, Oct 15',q:'Unit 3 vocab quiz Thu 10/15'},
  {t:'Book talk notes',d:'Tue, Oct 20',q:'Book talk notes due Tue 10/20'}]
};
V.extract=function(p){
 var E=S.extract;E.mode=p==='photo'?'photo':'paste';
 var h='<div class="seg" style="margin-top:12px" role="group" aria-label="Source"><button data-a="exmode" data-m="paste" aria-pressed="'+(E.mode==='paste')+'">'+'Paste</button><button data-a="exmode" data-m="photo" aria-pressed="'+(E.mode==='photo')+'">Photo</button></div>';
 if(E.mode==='paste')h+='<label class="l" for="exT">Email, assignment or syllabus</label><textarea id="exT">'+esc(EMAIL)+'</textarea>';
 else h+='<p class="l">Photo</p><div class="photo" aria-label="Photo of a printed syllabus page"><div class="paper"><b>English 8 · Ms. Patel</b><br>Week of Oct 12<br>• Read chapters 7 to 9 by Mon 10/12<br>• Unit 3 vocab quiz Thu 10/15<br>• Book talk notes due Tue 10/20</div></div><div class="row g"><button class="btn sm" data-a="toast" data-t="Camera opens here">'+ic('cam',20)+'Retake</button></div>';
 h+='<button class="btn pri full" style="margin-top:14px" data-a="exrun">'+M()+'Find dates</button>';
 if(E.ran===E.mode&&E.items){
  var n=E.items.filter(function(x){return x.st==='acc';}).length;
  h+='<h2 class="h" id="found">'+M()+'Juno found '+E.items.length+'<span class="r">'+n+' added</span></h2><div class="card">';
  E.items.forEach(function(x,i){
   h+='<div class="fx'+(x.st==='acc'?' acc':x.st==='skip'?' skip':'')+'"><div class="top"><b>'+esc(x.t)+'</b><span class="tag'+(x.dup?' n':'')+'">'+esc(x.d)+'</span></div><p class="q">"'+esc(x.q)+'"</p>';
   if(x.dup&&x.st==='new')h+='<p class="small muted" style="margin-top:6px">Already on your list</p>';
   if(x.st==='edit')h+='<div class="ed"><label class="sr" for="et'+i+'">Task</label><input class="inp" id="et'+i+'" value="'+esc(x.t)+'"><label class="sr" for="ed'+i+'">Due</label><input class="inp" id="ed'+i+'" value="'+esc(x.d)+'"><button class="btn pri sm" data-a="exsave" data-i="'+i+'">Save and add</button></div>';
   else if(x.st==='new')h+='<div class="row g">'+(x.dup?'<button class="btn sm" data-a="exst" data-i="'+i+'" data-s="skip">Skip</button>':'<button class="btn sm pri" data-a="exst" data-i="'+i+'" data-s="acc">Add</button><button class="btn sm" data-a="exst" data-i="'+i+'" data-s="edit">Edit</button><button class="btn sm" data-a="exst" data-i="'+i+'" data-s="skip">Skip</button>')+'</div>';
   else h+='<div class="row g"><span class="tag '+(x.st==='acc'?'ok':'n')+'">'+(x.st==='acc'?'Added':'Skipped')+'</span><button class="btn ghost sm" data-a="exst" data-i="'+i+'" data-s="new">Undo</button></div>';
   h+='</div>';});
  h+='</div>';
 }
 return h;
};

/* ---------- Organize ---------- */
function orgInit(){if(S.org)return;S.org={step:1,steps:[
 {t:'Pick 3 sources',m:20,use:1},
 {t:'Write the summary',m:15,use:1,why:'Your last 300-word summary took about 40 min.',sug:35},
 {t:'Make 2 charts',m:30,use:1},
 {t:'Build the poster',m:15,use:1,why:'15 min for the whole poster? Last one took about 90.',sug:60},
 {t:'Practice the talk',m:10,use:1}],ok:{}};}
V.organize=function(){
 orgInit();var O=S.org,h='';
 h+='<section class="card pad" style="margin-top:12px"><b style="font-size:20px">Science fair poster</b><p class="muted">Due Fri, Oct 16 · 8 days</p></section>';
 h+='<h2 class="h">'+M()+'Juno\'s steps<span class="r small">Your times</span></h2><div class="card"><ul class="list">';
 O.steps.forEach(function(s,i){
  h+='<li><div class="li edit"'+(s.use?'':' style="opacity:.5"')+'><div class="tx"><label class="sr" for="os'+i+'">Step '+(i+1)+'</label><input class="inp" id="os'+i+'" data-f="ostep" data-i="'+i+'" value="'+esc(s.t)+'" style="border-color:transparent;padding-left:0;font-weight:650"></div>';
  if(s.use)h+='<div class="stp'+(s.why&&!O.ok[i]&&s.m<s.sug?' flag':'')+'"><button data-a="om" data-i="'+i+'" data-d="-5" aria-label="Less time">&minus;</button><span>'+s.m+'m</span><button data-a="om" data-i="'+i+'" data-d="5" aria-label="More time">+</button></div>';
  h+='<button class="ck" style="margin-left:'+(s.use?'0':'auto')+'" data-a="ouse" data-i="'+i+'" aria-label="'+(s.use?'Remove':'Bring back')+' '+esc(s.t)+'">'+ic(s.use?'x':'plus',20)+'</button></div>';
  if(s.use&&s.why&&!O.ok[i]&&s.m<s.sug)h+='<div class="inl w">'+M()+'<div><p>'+esc(s.why)+'</p><div class="row"><button class="btn sm" data-a="ook" data-i="'+i+'">Keep '+s.m+'</button><button class="btn sm pri" data-a="oset" data-i="'+i+'">Make it '+s.sug+'</button></div></div></div>';
  h+='</li>';});
 h+='</ul></div><form class="tform" data-f="oadd"><label class="sr" for="oaT">Add a step</label><input class="inp" id="oaT" placeholder="Add a step" maxlength="40" autocomplete="off"><button class="btn" type="submit">Add</button></form>';
 var tot=O.steps.filter(function(s){return s.use;}).reduce(function(a,s){return a+s.m;},0);
 h+='<div class="cc" style="margin-top:16px"><div class="top">'+M()+'<span>Total</span><span class="tag">'+dur(tot)+'</span></div><p class="msg">'+(tot<150?'That\'s under 2h 30m for a poster. Sure?':'About '+Math.ceil(tot/40)+' homework blocks. Mon to Thu works.')+'</p><div class="row g"><button class="btn pri" data-a="oplan">Add to my week</button></div></div>';
 return h;
};
/* ---------- Check-ins ---------- */
var LV=[['Every block','Before and after each task','Sep 14'],['Start and finish','Start of homework and when done','Sep 28'],['Night only','One check at 8:30','Oct 19'],['Sundays','Weekly plan only','']];
V.checkins=function(p){
 var later=p==='later',cur=later?2:1,h='';
 h+='<div class="seg" style="margin-top:12px" role="group" aria-label="Sample date"><a class="btn sm" href="#/checkins" aria-pressed="'+!later+'" style="border:0;background:'+(later?'transparent':'var(--card)')+'">Oct 8</a><a class="btn sm" href="#/checkins/later" aria-pressed="'+later+'" style="border:0;background:'+(later?'var(--card)':'transparent')+'">Oct 22</a></div>';
 h+='<h2 class="h">Next nudge<span class="r num">'+(later?'8:30 PM':'4:00 PM')+'</span></h2>';
 h+='<div class="notif">'+M()+'<div><small>Coach Juno · '+(later?'8:30 PM':'4:00 PM')+'</small><p>'+(later?'Night check. How did today go?':'Lab writeup at 4:00. Ready?')+'</p></div></div>';
 h+='<div class="row g">'+(later?'<button class="btn sm pri" data-a="toast" data-t="Opening night check">Open</button>':'<button class="btn sm pri" data-a="toast" data-t="Juno: Go for it. See you at 6:30.">Starting</button><button class="btn sm" data-a="toast" data-t="Moved to 4:15">15 more min</button><a class="btn sm" href="#/stuck">Stuck</a>')+'</div>';
 h+='<h2 class="h">Today</h2><div class="card"><ul class="list">';
 (later?[['8:30 PM','Night check','Next']]:[['4:00 PM','Start Lab writeup','Next'],['6:30 PM','Homework done?','Later']]).forEach(function(r){h+='<li class="li"><div class="tx"><b>'+r[1]+'</b><span class="num">'+r[0]+'</span></div><span class="tag n">'+r[2]+'</span></li>';});
 h+='</ul></div>';
 h+='<h2 class="h">Level<span class="r">'+(later?'3':'2')+' of 4</span></h2><div class="card"><ul class="lad">';
 LV.forEach(function(l,i){h+='<li class="'+(i<cur?'past':i===cur?'cur':'')+'"><span class="dot"></span><div class="tx"><b>'+l[0]+'</b><span>'+l[1]+'</span></div>'+(i<=cur&&l[2]?'<span class="small muted">'+l[2]+'</span>':'')+'</li>';});
 h+='</ul></div>';
 h+='<div class="card pad" style="margin-top:12px"><b>'+(later?'1 of 5 days on time':'4 of 5 days on time')+'</b><span class="muted"> to '+LV[cur+1][0]+'</span><div class="dots7">'+(later?'<i class="on">M</i><i>T</i><i>W</i><i>T</i><i>F</i>':'<i class="on">M</i><i class="on">T</i><i class="miss">W</i><i class="on">T</i><i class="on">F</i>')+'</div></div>';
 if(!later)h+='<div class="cc ok"><div class="top">'+M()+'<span>Almost there</span></div><p class="msg">One more on-time day and I\'ll drop to <em>Night only</em>.</p></div>';
 else h+='<div class="cc ok"><div class="top">'+M()+'<span>Level up</span></div><p class="msg">Two weeks on time. Down to <em>one check a night</em>.</p></div>';
 h+='<button class="btn full" style="margin-top:12px" data-a="toast" data-t="Check-ins set to more for this week">More check-ins this week</button>';
 return h;
};

/* ---------- Get support (stuck) ---------- */
var HINTS=['What is the question asking you to find?','The bill is $21.40. Which part of that is the plan, and which part is texts?','Try writing it as: 15 + 0.10 × texts = 21.40. What comes next?'];
V.stuck=function(){
 var T=S.stuck,h='';
 h+='<section class="card pad" style="margin-top:12px"><span class="small muted">Math worksheet · #6</span><p style="margin-top:4px">A phone plan costs $15 a month plus $0.10 per text. Maya\'s bill was $21.40. How many texts did she send?</p></section>';
 h+='<h2 class="h">'+M()+'Hints</h2><div class="th"><div class="bub me">I don\'t get #6</div>';
 for(var i=0;i<=T.lvl&&i<HINTS.length;i++)h+='<div class="bub hint"><span class="small muted">Hint '+(i+1)+' of 3</span><br>'+esc(HINTS[i])+'</div>';
 if(T.ans!=null){h+='<div class="bub me">'+esc(T.ans)+'</div>';
  h+='<div class="bub">'+(String(T.ans).replace(/[^0-9.]/g,'')==='64'?'That works. How could you check it?':'Check it: does 15 + 0.10 × '+esc(T.ans)+' make 21.40?')+'</div>';}
 h+='</div>';
 h+='<form class="tform" data-f="ans"><label class="sr" for="ansI">Your answer</label><input class="inp" id="ansI" placeholder="My answer" inputmode="decimal" autocomplete="off"><button class="btn pri" type="submit">Check</button></form>';
 h+='<div class="row g">'+(T.lvl<2?'<button class="btn sm" data-a="hint">Next hint</button>':'')+'<button class="btn sm" data-a="toast" data-t="Break timer: 5 min">5 min break</button><button class="btn sm" data-a="loop">Still stuck</button></div>';
 if(T.loop){
  h+='<h2 class="h" id="loopH">Ask a person</h2>';
  if(T.sent)h+='<div class="cc ok"><div class="top">'+M()+'<span>Sent to '+esc(T.sent)+'</span></div><p class="msg">Next: #7 while you wait?</p></div>';
  else{
   h+='<div class="seg" role="group" aria-label="Send to"><button data-a="who" data-w="Ms. Kim" aria-pressed="'+(T.loop==='Ms. Kim')+'">Ms. Kim (Math)</button><button data-a="who" data-w="Mom" aria-pressed="'+(T.loop==='Mom')+'">Mom</button></div>';
   h+='<label class="l" for="loopT">Message</label><textarea id="loopT" style="min-height:130px">Hi '+esc(T.loop)+', I\'m stuck on #6 on the math worksheet. I got as far as 15 + 0.10 × texts = 21.40. Can you help me with the next step?</textarea>';
   h+='<button class="btn pri full" style="margin-top:10px" data-a="send">Send</button>';
  }
 }
 return h;
};

/* ---------- Reflect ---------- */
var DAY=[['Snack',15,25],['Lab writeup',25,45],['Math worksheet',40,35],['Poster: pick sources',45,50],['Read',30,30]];
V.review=function(p){
 var wk=p==='week',h='';
 h+='<div class="seg" style="margin-top:12px" role="group" aria-label="Range"><a class="btn sm" href="#/review" aria-pressed="'+!wk+'" style="border:0;background:'+(wk?'transparent':'var(--card)')+'">Yesterday</a><a class="btn sm" href="#/review/week" aria-pressed="'+wk+'" style="border:0;background:'+(wk?'var(--card)':'transparent')+'">This week</a></div>';
 if(!wk){
  h+='<div class="card pad" style="margin-top:14px"><span class="muted">Estimates within 5 min</span><div class="row" style="margin-top:4px;align-items:baseline"><span class="big">3 of 5</span></div><p class="muted num" style="margin-top:6px">Planned 2h 35m · Took 3h 05m</p></div>';
  h+='<div class="cc warn"><div class="top">'+M()+'<span>Insight</span></div><p class="msg">Writing took <em>almost 2x</em> your guess. Math was faster than you thought.</p></div>';
  h+='<h2 class="h">Planned vs actual</h2><div class="card">';
  DAY.forEach(function(r){var mx=50,over=r[2]-r[1]>5;h+='<div class="cmp"><div class="hd"><b>'+r[0]+'</b><span>'+r[1]+' / '+r[2]+'m</span></div><div class="bars"><div style="width:'+(r[1]/mx*100)+'%"></div><div class="a'+(over?' over':'')+'" style="width:'+(r[2]/mx*100)+'%"></div></div></div>';});
  h+='</div><div class="legend"><span><i style="background:var(--line2)"></i>Planned</span><span><i style="background:var(--acc)"></i>Actual</span></div>';
  h+='<h2 class="h">Your turn</h2>';
  if(S.rev.replied)h+='<div class="th"><div class="bub me">'+esc(S.rev.note)+'</div><div class="bub">Good call. I\'ll check how 40 goes for the next writeup.</div></div>';
  else h+='<label class="sr" for="rvT">One thing for tomorrow</label><textarea id="rvT" style="min-height:110px" placeholder="One thing for tomorrow"></textarea><button class="btn pri full" style="margin-top:10px" data-a="rev">Save</button>';
 }else{
  var W=[['Mon',52],['Tue',60],['Wed',58],['Thu',71],['Fri',0]];
  h+='<div class="card pad" style="margin-top:14px"><span class="muted">Estimate accuracy</span><div class="row" style="margin-top:4px;align-items:baseline"><span class="big">71%</span><span class="tag ok">+19 since Mon</span></div></div>';
  h+='<div class="card pad" style="margin-top:10px"><div style="display:flex;align-items:flex-end;gap:10px;height:130px">';
  W.forEach(function(d){h+='<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end"><span class="small num">'+(d[1]?d[1]+'%':'')+'</span><div style="width:100%;border-radius:8px;background:'+(d[1]?'var(--acc)':'var(--line)')+';height:'+(d[1]||8)+'%"></div><span class="small muted">'+d[0]+'</span></div>';});
  h+='</div></div>';
  h+='<div class="cc"><div class="top">'+M()+'<span>Insight</span></div><p class="msg">Writing: you guess <em>25</em>, it takes <em>45</em>. Math: you\'re close. Try 40 for writing next week?</p><div class="row g"><button class="btn sm pri" data-a="toast" data-t="Saved: writing starts at 40 min">Use 40</button><button class="btn sm" data-a="toast" data-t="Okay, keep your own">Not yet</button></div></div>';
  h+='<div class="card" style="margin-top:12px"><ul class="list"><li class="li"><div class="tx"><b>On time</b><span>4 of 5 days</span></div></li><li class="li"><div class="tx"><b>Planned on your own</b><span>5 of 5 days</span></div></li><li class="li"><div class="tx"><b>Asked for a hint</b><span>2 times</span></div></li></ul></div>';
 }
 return h;
};
/* ---------- Talk / Text (simulated) ---------- */
var CAPS=['Juno: Hey Maya. What\'s first today?','You: Lab writeup.','Juno: You put 25 minutes. What part takes longest?','You: The conclusion.','Juno: Want a check-in at 4:30, or just at the end?'];
var callT;
V.talk=function(){
 return '<div class="call"><div class="ring">'+mark()+'</div><p style="font-size:22px;font-weight:750;margin-top:16px">Coach Juno</p><p class="muted num" id="cst">Calling…</p><p class="caps" id="caps" aria-live="polite"></p><div class="row" style="margin-top:28px;justify-content:center"><button class="btn sm" data-a="toast" data-t="Muted">Mute</button><button class="btn sm" style="background:#dc2626;border-color:#dc2626;color:#fff" data-a="end">End</button></div></div>';
};
function runCall(){var i=0,t0=Date.now();clearInterval(callT);
 setTimeout(function(){if(!$('cst'))return;$('cst').textContent='0:00';$('caps').textContent=CAPS[0];},700);
 callT=setInterval(function(){var c=$('cst');if(!c){clearInterval(callT);return;}var s=Math.floor((Date.now()-t0)/1000);c.textContent=Math.floor(s/60)+':'+(s%60<10?'0':'')+s%60;if(s%2===0&&i<CAPS.length-1){i++;$('caps').textContent=CAPS[i];}},1000);}
V.text=function(){
 var h='<div class="who" style="margin-top:12px">'+M()+'Coach Juno · (512) 555-0147</div><div class="th" id="tth"><div class="bub">Two flags on your plan. Want to look now or after snack?</div>';
 S.text.forEach(function(m){h+='<div class="bub'+(m.me?' me':'')+'">'+esc(m.t)+'</div>';});
 h+='</div><form class="tform" data-f="text"><label class="sr" for="txI">Message</label><input class="inp" id="txI" placeholder="Text Juno" maxlength="300" autocomplete="off"><button class="btn pri" type="submit" aria-label="Send">'+ic('text',20)+'</button></form>';
 h+='<div class="row g"><button class="btn sm" data-a="qt" data-t="After snack">After snack</button><button class="btn sm" data-a="qt" data-t="Now">Now</button></div>';
 return h;
};
function coachReply(t){t=t.toLowerCase();
 if(/stuck|help|don.?t get/.test(t))return 'Which question? Tell me what you tried first.';
 if(/now/.test(t))return 'Okay. Lab writeup is set to 25 min. Your last two took 40+. Keep it or change it?';
 if(/snack|later|after/.test(t))return 'Sounds good. I\'ll ask again at 4:00.';
 return 'Got it. What\'s your next step?';}

/* ---------- router ---------- */
var TITLES={home:'Today',coach:'Coach',plan:'Plan my day',extract:'Scan',organize:'Break it up',checkins:'Check-ins',stuck:'Stuck',review:'Reflect',talk:'Talk',text:'Text'};
var TOP={home:1,plan:1,coach:1,review:1};
var depth=0,lastRoute=null;
function parse(){var h=location.hash.replace(/^#\/?/,'').split('/');return {r:V[h[0]]?h[0]:'home',p:h[1]||''};}
function render(keepScroll){
 var R=parse(),y=window.scrollY;
 $('view').innerHTML=V[R.r](R.p);
 $('title').textContent=TITLES[R.r];
 $('when').hidden=R.r!=='home';
 $('back').hidden=!!TOP[R.r]&&!R.p;
 [].forEach.call(document.querySelectorAll('#tabs a'),function(a){var on=a.dataset.r===R.r||(R.r==='checkins'&&false);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 if(keepScroll)window.scrollTo(0,y);
 if(R.r==='talk')runCall();
 document.title='AEIOS · '+TITLES[R.r];
}
window.addEventListener('hashchange',function(){var R=parse();
 if(!history.state||history.state.d==null){history.replaceState({d:depth+1},'');}
 depth=history.state.d;
 var changed=!lastRoute||R.r!==lastRoute.r||R.p!==lastRoute.p;lastRoute=R;render(false);if(changed){window.scrollTo(0,0);$('view').focus({preventScroll:true});}});
$('back').addEventListener('click',function(){if(history.state&&history.state.d>0)history.back();else location.hash='#/';});
document.querySelector('.tmark').innerHTML=mark();

/* ---------- actions ---------- */
function blk(id){return S.plan.filter(function(b){return b.id===id;})[0];}
document.addEventListener('click',function(e){
 var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a,d=b.dataset,R=parse();
 if(a==='toast'){toast(d.t);return;}
 if(a==='dismiss'){S.dismissed[d.k]=1;}
 else if(a==='more'){S.more=!S.more;}
 else if(a==='keep'){S.keep[d.k]=1;toast('Kept. Your call.');}
 else if(a==='setm'){blk(d.id).m=+d.m;toast(blk(d.id).t+': '+d.m+' min');}
 else if(a==='after'){var i=S.plan.indexOf(blk(d.id)),j=S.plan.indexOf(blk(d.nx));var x=S.plan.splice(i,1)[0];S.plan.splice(j,0,x);toast('Moved '+x.t);}
 else if(a==='afterdinner'){blk(d.id).after=1;toast('Moved after dinner');}
 else if(a==='mv'){var k=S.plan.indexOf(blk(d.id)),t=k+(+d.d);if(t<0||t>=S.plan.length)return;var y=S.plan[k];S.plan[k]=S.plan[t];S.plan[t]=y;}
 else if(a==='m'){var B=blk(d.id);B.m=Math.max(5,Math.min(120,B.m+(+d.d)));}
 else if(a==='done'){S.done[d.id]=!S.done[d.id];}
 else if(a==='start'){toast('Timer started: '+blk(d.id).t);return;}
 else if(a==='exmode'){S.extract.mode=d.m;location.hash='#/extract/'+d.m;return;}
 else if(a==='exrun'){var E=S.extract;E.ran=E.mode;E.items=FOUND[E.mode].map(function(x){var o={};for(var k2 in x)o[k2]=x[k2];o.st='new';return o;});render(true);var f=$('found');if(f)f.scrollIntoView({behavior:'smooth',block:'start'});return;}
 else if(a==='exst'){var it=S.extract.items[+d.i];it.st=d.s;if(d.s==='acc')S.due.push({t:it.t,d:it.d});if(d.s==='new')S.due=S.due.filter(function(z){return z.t!==it.t;});}
 else if(a==='exsave'){var it2=S.extract.items[+d.i];it2.t=$('et'+d.i).value||it2.t;it2.d=$('ed'+d.i).value||it2.d;it2.st='acc';S.due.push({t:it2.t,d:it2.d});}
 else if(a==='om'){var s=S.org.steps[+d.i];s.m=Math.max(5,Math.min(180,s.m+(+d.d)));}
 else if(a==='ouse'){S.org.steps[+d.i].use=!S.org.steps[+d.i].use;}
 else if(a==='ook'){S.org.ok[+d.i]=1;toast('Kept. Your call.');}
 else if(a==='oset'){var s2=S.org.steps[+d.i];s2.m=s2.sug;}
 else if(a==='oplan'){S.dismissed.org=1;toast('Added Mon to Thu');}
 else if(a==='hint'){S.stuck.lvl=Math.min(2,S.stuck.lvl+1);}
 else if(a==='loop'){S.stuck.loop=S.stuck.loop||'Ms. Kim';render(true);$('loopH').scrollIntoView({behavior:'smooth'});return;}
 else if(a==='who'){S.stuck.loop=d.w;}
 else if(a==='send'){S.stuck.sent=S.stuck.loop;toast('Sent (demo)');}
 else if(a==='rev'){var v=$('rvT').value.trim();S.rev.note=v||'Give writing 40 min.';S.rev.replied=true;}
 else if(a==='end'){clearInterval(callT);history.back();return;}
 else if(a==='qt'){sendText(d.t);return;}
 else return;
 render(true);
});
document.addEventListener('submit',function(e){e.preventDefault();var f=e.target.dataset.f;
 if(f==='add'){var v=$('addT').value.trim();if(!v)return;S.plan.push({id:'u'+Date.now(),t:v,m:20});toast('Added. Set your time.');}
 else if(f==='oadd'){var v2=$('oaT').value.trim();if(!v2)return;S.org.steps.push({t:v2,m:20,use:1});}
 else if(f==='ans'){var v3=$('ansI').value.trim();if(!v3)return;S.stuck.ans=v3;}
 else if(f==='text'){sendText($('txI').value.trim());return;}
 render(true);
});
document.addEventListener('change',function(e){if(e.target.dataset.f==='ostep'){S.org.steps[+e.target.dataset.i].t=e.target.value;}});
function sendText(t){if(!t)return;S.text.push({me:1,t:t});render(true);setTimeout(function(){S.text.push({t:coachReply(t)});if(parse().r==='text')render(true);},700);}

if(!history.state)history.replaceState({d:0},'');depth=history.state.d||0;
render(false);lastRoute=parse();
})();

(function(){
'use strict';
/* AEIOS · Today (New, v2). Content is the showcase's own demo data (aeios2027.netlify.app), with due dates moved to Thu Oct 8 2026. */
var SUBJ={ela:{name:'English',color:'#DE6A48',teacher:'Mr. Okafor'},history:{name:'History',color:'#AE791F',teacher:'Ms. Adler'},science:{name:'Science',color:'#248674',teacher:'Dr. Chen'},math:{name:'Math',color:'#6250D8',teacher:'Ms. Rivera'}};
var TASKS=[
 {id:'ela-revise',title:'Finish your argument revision',subject:'ela',due:'Due tomorrow',soon:true,dueLong:'Friday, October 9',minutes:15,required:true,steps:['Read the feedback on paragraph 3.','Add one quotation that supports your claim.','Write a sentence explaining the connection.'],detail:'Revise the school-library proposal you wrote in English. Submit your paragraph and the feedback you used.',flex:'You can type or handwrite the revision. The required evidence stays the same.'},
 {id:'history-sources',title:'Get your sources ready',subject:'history',due:'Due tomorrow',soon:true,dueLong:'Friday, October 9',minutes:5,required:true,steps:['Put both Reconstruction sources in your folder.','Underline each author\u2019s main claim.'],detail:'Bring both classroom source sheets for tomorrow\u2019s comparison. This is preparation, not a graded assessment.',flex:'Paper or digital copies are fine.'},
 {id:'science-lab',title:'Explain your lab graph',subject:'science',due:'Due Monday',dueLong:'Monday, October 12',minutes:12,required:true,steps:['Look at the force-and-motion graph.','Describe one pattern using values from the table.','Write your explanation and one limitation.'],detail:'Use the cart investigation from science. Keep your measurements, graph, and explanation together.',flex:'You may split the write-up across two days. School must approve a later deadline.'},
 {id:'math-review',title:'Look over your equation notes',subject:'math',due:'Optional',dueLong:'Before Friday\u2019s classroom check (optional)',minutes:8,required:false,steps:['Choose an example from your class notes.','Write down any question for Ms. Rivera.'],detail:'Optional review before Friday\u2019s classroom check. The app does not assess your answers.',flex:'Optional. You can move this to tomorrow or skip it.'}
];
var LISTS={
 school:{title:'Ready for school',items:[['Equation notes & classwork','Math notebook and English draft'],['History sources','Both source sheets, in your folder'],['Pencil case & charged device','Charger, if you need one'],['Water bottle',''],['Lunch or school-lunch plan',''],['Basketball bag','Shoes and practice clothes']],start:{0:true,2:true}},
 night:{title:'Ready for tomorrow',items:[['Check tomorrow\u2019s classes','Look for changes and anything due'],['Pack tomorrow\u2019s school bag',''],['Set out clothes',''],['Charge your device',''],['Brush teeth',''],['Put away screens & read','']],start:{}}
};
var P=[
 {id:'morning',name:'Before school',icon:'sunrise',items:[[405,425,'Wake up & wash'],[425,460,'Breakfast & get ready',{list:'school'}],[465,495,'Travel to school',{travel:1}]]},
 {id:'school',name:'At school',icon:'school',items:[[495,520,'Advisory',{detail:'Check your day. Ask for what you need.'}],[520,575,'Mathematics',{subject:'math',detail:'Bring your equation notes.'}],[575,630,'English',{subject:'ela',detail:'Partner feedback on your argument.'}],[630,685,'Science',{subject:'science',detail:'Use the force-and-motion lab table.'}],[685,730,'Lunch & recess',{detail:'A real break.'}],[730,785,'Social studies',{subject:'history',detail:'Compare two Reconstruction accounts.'}],[785,850,'Studio & thinking skills',{detail:'Make a plan that actually fits.'}],[850,870,'Pack up',{detail:'Check materials for tomorrow.'}]]},
 {id:'after',name:'After school',icon:'sun',items:[[870,900,'Travel home',{travel:1}],[900,920,'Snack & decompress'],[930,950,'Review math corrections'],[960,985,'Piano practice']]},
 {id:'evening',name:'Evening',icon:'moon',items:[[1095,1125,'Dinner'],[1150,1170,'Read a chapter'],[1230,1260,'Get ready for tomorrow',{list:'night'}],[1260,1290,'Reading & quiet time'],[1290,1305,'Lights out']]}
];
var GOAL={title:'Check tomorrow\u2019s assignments and pack my bag',why:'Each school day, check what\u2019s due tomorrow and pack the materials I\u2019ll need.',done:4,target:7,first:'Open the class list and find tomorrow\u2019s materials',reward:'Pick our Saturday ice-cream stop',helper:'Dad'};
var TEASER={kind:'Reasoning',title:'Work backward',q:'I think of a number, double it, and add 9. The result is 51. What was my number?',a:'21',hints:['Undo the steps in the opposite order.','First subtract the amount added, then divide by two.'],ex:'51 \u2212 9 = 42. Divide by 2 to get 21.'};
var DIFFERENT=null; /* e.g. {text:'Early dismissal at 12:10 PM'} when the school calendar changes the day. Thursday Oct 8 is a normal day in the demo data. */
var ICON={sun:'M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5l1.5 1.5M5 19l1.5-1.5M17.5 6.5l1.5-1.5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',moon:'M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z',sunrise:'M3 18h18M6 14a6 6 0 0 1 12 0M12 3v3M3 9l2 2M21 9l-2 2M3 21h18',school:'M3 21V8l9-5 9 5v13H3ZM9 21v-7h6v7M7 10h.01M17 10h.01M12 7h.01',chev:'M6 9l6 6 6-6',right:'M9 6l6 6-6 6',arrow:'M4 12h16m-6-6 6 6-6 6',check:'M5 12l4 4L19 6',x:'M6 6l12 12M18 6L6 18',book:'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm0 16h15',clock:'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',pencil:'M4 20h4L19 9l-4-4L4 16v4ZM13.5 6.5l4 4',flag:'M5 21V4h13l-3 4.5L18 13H5',journal:'M5 3h14v18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 0v18M9 8h6M9 12h6',puzzle:'M4 4h6a3 3 0 1 1 4 0h6v6a3 3 0 1 0 0 4v6h-6a3 3 0 1 1-4 0H4v-6a3 3 0 1 0 0-4V4Z'};
function svg(n,s,cls){return '<svg'+(cls?' class="'+cls+'"':'')+' width="'+(s||18)+'" height="'+(s||18)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+ICON[n]+'"/></svg>';}
var TICK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function clock(m){var h=Math.floor(m/60),mm=m%60,ap=h>=12?'PM':'AM';h=h%12||12;return h+':'+(mm<10?'0':'')+mm+' '+ap;}
function short(m){var h=Math.floor(m/60)%12||12,mm=m%60;return h+':'+(mm<10?'0':'')+mm;}
function dur(n){return n<60?n+' min':Math.floor(n/60)+' hr'+(n%60?' '+n%60+' min':'');}
/* demo time: ?t=HHMM (the compare wrapper sets this). */
var hm=/t=(\d{1,2}):(\d{2})/.exec(location.hash),q=hm?(hm[1]+hm[2]):new URLSearchParams(location.search).get('t'),T=/^\d{3,4}$/.test(q||'')?(+q.slice(0,-2))*60+(+q.slice(-2)):945;
var KEY='aeios-new-demo-v2';
function fresh(){return {expanded:false,earlier:false,done:{},doneOrder:[],steps:{},checks:{school:JSON.parse(JSON.stringify(LISTS.school.start)),night:{}},journal:[],teaser:{solved:false,hints:0}};}
var S;try{S=JSON.parse(localStorage.getItem(KEY))||fresh();}catch(e){S=fresh();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
var $=function(id){return document.getElementById(id);};
var ALL=[];P.forEach(function(p){p.items.forEach(function(i){var o={s:i[0],e:i[1],n:i[2],phase:p};var x=i[3]||{};for(var k in x)o[k]=x[k];ALL.push(o);});});
function phaseAt(t){return t<495?P[0]:t<870?P[1]:t<1095?P[2]:P[3];}
var PH=phaseAt(T);
function cnt(l){var c=S.checks[l],n=0;for(var k in c)if(c[k])n++;return n;}
function openTasks(){return TASKS.filter(function(t){return t.required&&!S.done[t.id];});}
function task(id){return TASKS.filter(function(x){return x.id===id;})[0];}
function firstOpen(t){var d=S.steps[t.id]||{};for(var i=0;i<t.steps.length;i++)if(!d[i])return i;return -1;}
function ckRow(l,i){var it=LISTS[l].items[i],on=!!S.checks[l][i];return '<button class="ck'+(on?' on':'')+'" data-act="ck" data-list="'+l+'" data-i="'+i+'" role="checkbox" aria-checked="'+on+'"><span class="box">'+TICK+'</span><span class="txt">'+esc(it[0])+(it[1]?'<small>'+esc(it[1])+'</small>':'')+'</span></button>';}
function listBlock(l){var n=cnt(l);var h='<div class="ctx-hd">'+LISTS[l].title+' <span data-count="'+l+'">'+n+' of 6</span></div><div class="meter" aria-hidden="true"><i data-meter="'+l+'" style="width:'+(n/6*100)+'%"></i></div>';for(var i=0;i<6;i++)h+=ckRow(l,i);return h;}
function curNext(){var cur=null,next=null,prev=null;ALL.forEach(function(i){if(i.s<=T&&T<i.e)cur=i;if(i.e<=T)prev=i;if(!next&&i.s>T)next=i;});return {cur:cur,next:next,prev:prev};}
var FIRST=ALL[0],LAST=ALL[ALL.length-1];
var SHORT={'Mathematics':'Math','Lunch & recess':'Lunch','Studio & thinking skills':'Studio','Snack & decompress':'Snack','Read a chapter':'Reading','Reading & quiet time':'Quiet reading','Review math corrections':'Math corrections','Piano practice':'Piano'};
function nm(i){return SHORT[i.n]||i.n;}
var HW=[P[2].items[P[2].items.length-1][1],P[3].items[0][0]]; /* free stretch after the last after-school activity, before dinner */
function inHW(){return T>=HW[0]&&T<HW[1];}
var LEAVE=ALL.filter(function(i){return i.travel;})[0];
function things(n,w){return n+' '+(n===1?'thing':'things')+' '+w;}
function soonOpen(){return openTasks().filter(function(t){return t.soon;});}
function greeting(){
 var c=curNext(),cur=c.cur,next=c.next,o=openTasks(),soon=soonOpen().length;
 if(T<LEAVE.s){
  if(cur&&cur.list==='school'){var n=6-cnt('school');return n?'Leave by '+short(LEAVE.s)+'. '+things(n,'left to pack')+'.':'Bag\u2019s packed. Leave by '+short(LEAVE.s)+'.';}
  if(!cur&&c.prev)return 'Leave in '+dur(LEAVE.s-T)+'.';
  return 'Morning, Maya. Leave by '+short(LEAVE.s)+'.';}
 if(cur&&cur.travel&&cur.phase.id==='morning')return 'On the way. '+nm(next)+' at '+short(next.s)+'.';
 if(T<870){if(cur&&cur.n==='Pack up')return 'Pack up. School\u2019s out at '+short(cur.e)+'.';
  if(cur)return nm(cur)+' till '+short(cur.e)+'.';return nm(next)+' at '+short(next.s)+'.';}
 if(T<HW[0]){
  if(cur&&cur.travel)return 'School\u2019s out. '+nm(next)+' at '+short(next.s)+'.';
  if(cur&&cur.n==='Snack & decompress')return 'Home stretch. '+(o.length?'Homework at '+short(HW[0])+'.':'Nothing due tonight.');
  if(cur)return nm(cur)+' till '+short(cur.e)+'.'+(next&&next.s>=HW[0]&&o.length?' Homework after.':'');
  return 'Free till '+short(next.s)+'.';}
 if(inHW())return o.length?'Homework time. Start with '+SUBJ[o[0].subject].name+'.':'Free till dinner at '+short(HW[1])+'.';
 if(cur&&cur.list==='night'){var m=6-cnt('night');return m?'Almost bedtime. '+things(m,'left to do')+'.':'All set for tomorrow.';}
 if(cur&&cur.n==='Reading & quiet time')return 'Wind down. Lights out at '+short(cur.e)+'.';
 if(cur&&cur.n==='Lights out'||T>=LAST.s)return 'Lights out at '+short(LAST.s)+'. Tomorrow starts at '+short(FIRST.s)+'.';
 if(cur)return nm(cur)+' till '+short(cur.e)+'.';
 return 'Free till '+short(next.s)+'.'+(soon?' '+things(soon,'due tomorrow')+'.':'');
}
function renderGreet(){var g=greeting(),e=$('greet');if(e.getAttribute('aria-label')===g)return;e.setAttribute('aria-label',g);e.innerHTML=g.split(/(?<=\.)\s+/).map(function(s){return '<span>'+esc(s)+'</span>';}).join(' ');}
function linkRow(icon,t,b,s){return '<button class="ctx-row link" data-act="task" data-id="'+t.id+'"><span><b>'+b+'</b><span class="s">'+s+'</span></span>'+svg('right',20,'chev')+'</button>';}
function context(cur){
 var h='',o=openTasks(),top=o[0];
 if(T<LEAVE.s){h+=listBlock('school');}
 else if(cur&&cur.phase.id==='school'&&!cur.travel){
  if(cur.detail)h+='<p class="ctx-note">'+esc(cur.detail)+'</p>';
  if(cur.subject){var t=TASKS.filter(function(x){return x.subject===cur.subject&&!S.done[x.id];})[0];
   if(t)h+=linkRow('',t,esc(t.title),SUBJ[t.subject].name+' \u00b7 '+t.due);}}
 else if(T>=870&&T<HW[1]){
  if(top&&!inHW())h+=linkRow('',top,'Homework at '+clock(HW[0]),'First up: '+esc(top.title)+' \u00b7 '+top.minutes+' min');
  else if(top){var fi=firstOpen(top);h+=linkRow('',top,esc(top.title),SUBJ[top.subject].name+' \u00b7 '+top.due+' \u00b7 '+top.minutes+' min'+(fi>=0?'<br>'+(fi?'Next':'First')+': '+esc(top.steps[fi]):''));}
  else if(T>=900)h+='<p class="ctx-note">No homework left. Afternoon\u2019s yours.</p>';}
 else if(cur&&cur.list==='night'){h+=listBlock('night');}
 else if(T>=HW[1]&&T<1230){var sn=soonOpen()[0];if(sn)h+=linkRow('',sn,esc(sn.title),'Due tomorrow \u00b7 '+sn.minutes+' min');}
 else if(T>=1260&&T<1290&&cnt('night')<6){h+='<button class="ctx-row link" data-act="list" data-list="night"><span><b>Ready for tomorrow</b><span class="s"><span data-count="night">'+cnt('night')+' of 6</span> done</span></span>'+svg('right',20,'chev')+'</button>';}
 return h?'<div class="ctx">'+h+'</div>':'';
}
function row(item,cls){var a='';if(item.list)a='<div><button class="chipbtn" data-act="list" data-list="'+item.list+'">'+svg('check',16)+'Checklist \u00b7 <span data-count="'+item.list+'">'+cnt(item.list)+' of 6</span></button>'+(item.list==='night'?'<button class="chipbtn" data-act="goal">'+svg('flag',16)+'Goal \u00b7 '+GOAL.done+' of 7 days</button>':'')+'</div>';
 return '<div class="it '+(cls||'')+'"><span class="tm">'+short(item.s)+'\u2013'+short(item.e)+'</span><div><span class="nm">'+esc(item.n)+'</span>'+a+'</div></div>';}
function nextLine(next,tomorrow){
 if(tomorrow)return '<div class="now-next"><span class="lbl">Next</span><span><b>'+esc(FIRST.n)+'</b><span class="s">Tomorrow, '+clock(FIRST.s)+'</span></span></div>';
 if(!next)return '';var s2;
 if(next.travel)s2='Leave at '+clock(next.s);else s2=clock(next.s);s2+=' \u00b7 in '+dur(next.s-T);
 if(T>=1230){var n2=ALL[ALL.indexOf(next)+1];if(n2)s2+='<br>Then '+n2.n.toLowerCase()+' at '+clock(n2.s);}
 return '<div class="now-next"><span class="lbl">Next</span><span><b>'+esc(next.n)+'</b><span class="s">'+s2+'</span></span></div>';}
function renderNow(){
 var c=curNext(),cur=c.cur,next=c.next,prev=c.prev,title,sub='',range,left='',pct=null,tomorrow=false;
 if(cur){title=cur.n;range=short(cur.s)+' \u2013 '+clock(cur.e);left=(cur.e-T)+' min left';pct=(T-cur.s)/(cur.e-cur.s);
  if(cur.subject)sub='with '+SUBJ[cur.subject].teacher;}
 else if(!prev){title='Your day starts at '+clock(next.s);range='Nothing planned before then';left='in '+dur(next.s-T);}
 else if(next&&inHW()&&openTasks().length){title='Homework time';range=short(HW[0])+' \u2013 '+clock(HW[1]);left=dur(HW[1]-T)+' left';pct=(T-HW[0])/(HW[1]-HW[0]);sub='Nothing else planned until dinner';}
 else if(next){title='Free time';range='Until '+clock(next.s);left=dur(next.s-T)+' left';pct=(T-prev.e)/(next.s-prev.e);}
 else{title='Day done';range='Lights out was at '+clock(LAST.s);tomorrow=true;}
 var bar=pct==null?'':'<div class="bar" role="img" aria-label="'+left+'"><i style="width:'+Math.round(Math.max(.03,Math.min(1,pct))*100)+'%"></i></div>';
 var h='<div class="now-head"><div class="now-top"><span class="live">'+clock(T)+'</span></div><div class="now-title">'+esc(title)+'</div>'+(sub?'<div class="now-sub">'+esc(sub)+'</div>':'')+'<div class="now-time"><span>'+range+'</span><b>'+left+'</b></div>'+bar+nextLine(prev||cur?next:null,tomorrow)+'</div>';
 h+=context(cur);
 if(S.expanded){
  var earlier=ALL.filter(function(i){return i.e<=T;}),up=ALL.filter(function(i){return i.e>T;}),nowShown=false;
  h+='<div class="day">';
  if(earlier.length){h+='<button class="earlier" data-act="earlier" aria-expanded="'+S.earlier+'"><span>Earlier today \u00b7 '+earlier.length+' '+(earlier.length===1?'activity':'activities')+'</span>'+svg('chev')+'</button>';
   if(S.earlier){earlier.forEach(function(i){h+=row(i,'past');});}}
  if(!up.length)h+='<p class="day-empty">Nothing else today. Tomorrow starts at '+clock(FIRST.s)+'.</p>';
  up.forEach(function(i){
   if(!cur&&!nowShown&&i.s>T){h+='<div class="nowline"><b>Now \u00b7 '+clock(T)+'</b><i></i></div>';nowShown=true;}
   h+=row(i,i===cur?'cur':'');});
  h+='<div class="day-actions"><button data-act="page" data-page="Change my plan">+ Change my plan</button><button data-act="page" data-page="My calendar">Calendar '+svg('arrow',16)+'</button></div></div>';}
 h+='<button class="disclose" data-act="expand" aria-expanded="'+S.expanded+'"><span>'+(S.expanded?'Show less':'See the rest of my day')+'</span>'+svg('chev',20)+'</button>';
 $('now').innerHTML=h;$('app').classList.toggle('expanded',S.expanded);
}
function renderNeeds(){if($('owe'))setTimeout(function(){renderOwe();renderGreet();});
 var open=openTasks(),calm=PH.id==='school'||T>=1260,noFirst=calm||T<870||T>=1230,ndone=S.doneOrder.length;
 var h='<div class="hd"><h2>Needs you</h2>'+(open.length?'<span class="count" aria-label="'+open.length+' items">'+open.length+'</span>':'')+(PH.id==='school'?'<span class="aside">After school</span>':'')+'</div>';
 
 if(!open.length)h+='<div class="empty">All done. Nice.</div>';
 open.forEach(function(t,k){var s=SUBJ[t.subject],fi=firstOpen(t),showFirst=!noFirst&&k===0&&fi>=0;
  h+='<button class="task" data-act="task" data-id="'+t.id+'" id="row-'+t.id+'"><span class="sw" style="background:'+s.color+'"></span><span class="tx"><span class="t">'+esc(t.title)+'</span><span class="m">'+s.name+' \u00b7 '+(t.soon&&!calm?'<b>'+t.due+'</b>':t.due)+' \u00b7 '+t.minutes+' min</span>'+(showFirst?'<span class="first">'+(fi===0?'First step: ':'Next step: ')+esc(t.steps[fi])+'</span>':'')+'</span>'+svg('right',20,'chev')+'</button>';});
 if(ndone)h+='<div class="donebar">'+svg('check',18)+ndone+' done today</div>';
 h+='<button class="all" data-act="allwork"><span>All schoolwork</span>'+svg('arrow')+'</button>';
 $('needs').classList.toggle('calm',calm);$('needs').innerHTML=h;
}
function renderMinute(){
 var h='<h3>Extras</h3>';
 if(PH.id==='school')h+='<p class="calmline">Extras open after school.</p>';
 else h+='<div class="chips"><button class="chip" data-act="journal"><span class="ic">'+svg('journal',20)+'</span><span>Journal<small>One line about today</small></span></button><button class="chip" data-act="teaser"><span class="ic">'+svg('puzzle',20)+'</span><span>Brain teaser<small>'+(S.teaser.solved?'Solved \u2713':'Today\u2019s puzzle')+'</small></span></button><button class="chip" data-act="chess"><span class="ic" style="font-size:20px" aria-hidden="true">\u265e</span><span>Chess puzzle<small>Rated 850</small></span></button></div>';
 $('minute').innerHTML=h;
}
function renderOwe(){var o=openTasks(),soon=o.filter(function(t){return t.soon;}).length,e=$('owe');
 if(!o.length){e.innerHTML='<span>'+svg('check',18)+'Nothing to do</span>';e.disabled=true;return;}e.disabled=false;
 e.innerHTML='<span class="n">'+o.length+'</span><span>'+(PH.id==='school'?'to do after school':'to do')+(soon?((PH.id==='school'||T>=1260)?' \u00b7 '+soon+' due tomorrow':' \u00b7 <b>'+soon+' due tomorrow</b>'):'')+'</span>'+svg('chev',20);}
function render(){renderGreet();renderNow();renderNeeds();renderMinute();renderOwe();
 $('different').innerHTML=DIFFERENT?'<div class="different" role="note">'+svg('flag',20)+'<span><b>Today is different.</b> '+esc(DIFFERENT.text)+'</span></div>':'';}
/* sheets */
var openTask=null,openList=null;
function sheet(title,body){$('sheet').innerHTML='<div class="sh-head"><h2 id="shTitle">'+title+'</h2><button class="sh-x" data-act="close" aria-label="Close">'+svg('x',20)+'</button></div><div class="sh-body">'+body+'</div>';document.body.classList.add('open-sheet');$('sheet').scrollTop=0;var x=$('sheet').querySelector('.sh-x');if(x)x.focus({preventScroll:true});}
function close(){document.body.classList.remove('open-sheet','open-drawer');openTask=null;openList=null;}
function taskSheet(id){openTask=id;openList=null;var t=task(id),s=SUBJ[t.subject],d=S.steps[id]||{},done=!!S.done[id],nd=0;t.steps.forEach(function(_,i){if(d[i])nd++;});
 var b='<div class="sw-bar" style="background:'+s.color+'"></div><div class="sh-meta">'+s.name+' \u00b7 '+s.teacher+'<br>'+(t.required?'Due ':'')+t.dueLong+' \u00b7 about '+t.minutes+' min</div><p>'+esc(t.detail)+'</p><div class="ctx-hd" style="padding-top:6px">Steps <span>'+nd+' of '+t.steps.length+'</span></div>';
 t.steps.forEach(function(st,i){var on=!!d[i];b+='<button class="ck'+(on?' on':'')+'" data-act="step" data-id="'+id+'" data-i="'+i+'" role="checkbox" aria-checked="'+on+'"><span class="box">'+TICK+'</span><span class="txt">'+esc(st)+'</span></button>';});
 b+='<div class="note">'+esc(t.flex)+'</div>';
 b+=done?'<div class="row-btns"><button class="btn ghost" data-act="undone" data-id="'+id+'">Move back to to-do</button></div>':'<div class="row-btns"><button class="btn primary'+(nd===t.steps.length?' ok':'')+'" data-act="markdone" data-id="'+id+'">Mark as done</button></div>';
 sheet(esc(t.title),b);}
function allSheet(){var todo=TASKS.filter(function(t){return !S.done[t.id];}),dn=TASKS.filter(function(t){return S.done[t.id];});
 function r(t){var s=SUBJ[t.subject];return '<button class="list-row" data-act="task" data-id="'+t.id+'"><span class="sw" style="background:'+s.color+'"></span><span class="tx"><span class="t">'+esc(t.title)+'</span><span class="m">'+s.name+' \u00b7 '+t.due+' \u00b7 '+t.minutes+' min</span></span>'+svg('right',20)+'</button>';}
 var b='<div class="sh-sec">To do \u00b7 '+todo.length+'</div>'+todo.map(r).join('')+(todo.length?'':'<p class="sh-meta">Nothing left to do.</p>')+'<div class="sh-sec">Done \u00b7 '+dn.length+'</div>'+dn.map(r).join('')+(dn.length?'':'<p class="sh-meta">Work you mark as done shows up here.</p>')+'<div class="note">In the full app this is the Classes &amp; work page, with grades and teacher feedback.</div>';
 sheet('All my schoolwork',b);}
function listSheet(l){openList=l;openTask=null;var b=listBlock(l);if(l==='night')b+='<button class="goal-line" data-act="goal">'+svg('flag',18)+'<span>Goal: '+esc(GOAL.title.replace(/^./,function(c){return c.toLowerCase();}))+' \u00b7 '+GOAL.done+' of 7 days</span></button>';sheet(LISTS[l].title,b);}
function goalSheet(){var d='';for(var i=0;i<GOAL.target;i++)d+='<i class="'+(i<GOAL.done?'on':'')+'"></i>';
 sheet('My goal','<p style="font-size:18px;font-weight:750">'+esc(GOAL.title)+'</p><div class="dots" role="img" aria-label="'+GOAL.done+' of 7 school days">'+d+'</div><div class="sh-meta">'+GOAL.done+' of '+GOAL.target+' school days</div><p>'+esc(GOAL.why)+'</p><div class="sh-sec">Next step</div><p>'+esc(GOAL.first)+'</p><div class="sh-sec">Reward</div><p>'+esc(GOAL.reward)+' <span class="sh-meta">(helper: '+GOAL.helper+')</span></p><div class="note">In the full app this opens My goals.</div>');}
function teaserSheet(){var Z=S.teaser,b='<div class="sh-meta">'+TEASER.kind+' \u00b7 '+TEASER.title+'</div><p style="font-size:18px;font-weight:650">'+esc(TEASER.q)+'</p>';
 if(Z.solved)b+='<div class="fb ok">\u2713 Correct: '+TEASER.a+'</div><p class="note">'+esc(TEASER.ex)+'</p>';
 else{b+='<label class="sh-sec" for="ans" style="display:block">Your answer</label><input class="ans" id="ans" inputmode="numeric" autocomplete="off"><div id="fb" class="fb" aria-live="polite"></div>';
  for(var i=0;i<Z.hints;i++)b+='<p class="note">Hint '+(i+1)+': '+esc(TEASER.hints[i])+'</p>';
  b+='<div class="row-btns"><button class="btn primary" data-act="answer">Check</button>'+(Z.hints<2?'<button class="btn ghost" data-act="hint">Hint</button>':'')+'</div>';}
 b+='<p class="sh-meta" style="margin-top:14px">Today\u2019s puzzle from the AEIOS daily teaser.</p>';sheet('Brain teaser',b);}
function journalSheet(){var b='<p>One thing worth remembering from today.</p><textarea id="jt" aria-label="Write a moment" placeholder="Today I\u2019m glad that\u2026"></textarea><div class="row-btns"><button class="btn primary" data-act="jsave">Save</button></div>';
 if(S.journal.length){b+='<div class="sh-sec">Saved on this device</div>';S.journal.slice().reverse().forEach(function(j){b+='<p class="note">'+esc(j)+'</p>';});}
 sheet('Gratitude journal',b);}
function pageSheet(name){var map={'Change my plan':'Adjust today\u2019s plans or add an activity. (These were \u201cAdjust plans\u201d and \u201c+ Add an activity\u201d on the old page.)','My calendar':'Other days, deadlines and activities. (Previous/next day moved here from the home page.)','My grades':'Math 88 \u00b7 English 91 \u00b7 Science 89 \u00b7 History 87 (sample grades).','Inbox':'3 messages from teachers (sample).','Colors':'Color themes live here.','Chess puzzle':'A chess puzzle at your 850 puzzle rating. The full board is in the live app.'};
 sheet(esc(name),'<p>'+(map[name]||'')+'</p><div class="note">Placeholder: this demo only builds the Today page.</div><div class="row-btns"><button class="btn ghost" data-act="close">Back to Today</button></div>');}
function drawer(){var items=[['close','Today'],['page','My calendar'],['allwork','Classes & work'],['page','My grades'],['page','Inbox'],['more','More']];
 $('drawer').innerHTML='<div class="side-label" style="margin-top:4px">My school life</div><div class="nav">'+items.map(function(x,i){return '<button class="'+(i===0?'active':'')+'" data-act="'+x[0]+'" data-page="'+esc(x[1])+'">'+esc(x[1])+'</button>';}).join('')+'</div>';document.body.classList.add('open-drawer');}
function moreSheet(){sheet('More','<p>Goals \u00b7 Rewards \u00b7 Labs \u00b7 Crash courses \u00b7 Gratitude journal \u00b7 Profile &amp; support</p><div class="row-btns"><button class="btn ghost" data-act="goal">My goals</button><button class="btn ghost" data-act="journal">Journal</button></div><div class="note">These pages moved off the home screen into More.</div>');}
var tt;function toast(m){var t=$('toast');t.textContent=m;t.style.display='block';clearTimeout(tt);tt=setTimeout(function(){t.style.display='none';},2200);}
/* in-place checkbox update (keeps the check animation) */
function updateList(l){var n=cnt(l);[].forEach.call(document.querySelectorAll('[data-count="'+l+'"]'),function(e){e.textContent=n+' of 6';});[].forEach.call(document.querySelectorAll('[data-meter="'+l+'"]'),function(e){e.style.width=(n/6*100)+'%';});
 [].forEach.call(document.querySelectorAll('.ck[data-list="'+l+'"]'),function(e){var on=!!S.checks[l][e.dataset.i];e.classList.toggle('on',on);e.setAttribute('aria-checked',on);});}
document.addEventListener('click',function(e){
 var b=e.target.closest('[data-act]');if(!b)return;
 var a=b.dataset.act,id=b.dataset.id;
 if(a==='owe'){var n=$('needs');n.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});var f=n.querySelector('.task');if(f)f.focus({preventScroll:true});return;}
 if(a==='expand'){S.expanded=!S.expanded;save();renderNow();return;}
 if(a==='earlier'){S.earlier=!S.earlier;save();renderNow();return;}
 if(a==='ck'){var l=b.dataset.list,i=b.dataset.i,on=!S.checks[l][i];S.checks[l][i]=on;save();updateList(l);renderGreet();if(on){b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop');}if(on&&cnt(l)===6)toast(LISTS[l].title+' \u2713');return;}
 if(a==='step'){S.steps[id]=S.steps[id]||{};var on2=!S.steps[id][b.dataset.i];S.steps[id][b.dataset.i]=on2;save();b.classList.toggle('on',on2);b.setAttribute('aria-checked',on2);if(on2){b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop');}
  var t=task(id),d=S.steps[id],nd=0;t.steps.forEach(function(_,k){if(d[k])nd++;});var hd=$('sheet').querySelector('.ctx-hd span');if(hd)hd.textContent=nd+' of '+t.steps.length;var mb=$('sheet').querySelector('[data-act=markdone]');if(mb)mb.classList.toggle('ok',nd===t.steps.length);renderNeeds();renderNow();return;}
 if(a==='markdone'){S.done[id]=true;S.doneOrder.push(id);save();close();var r=$('row-'+id);var fin=function(){renderNeeds();renderNow();var n=openTasks().length;toast(n?'Done \u2713 \u00b7 '+n+' left':'All caught up \u2713');};
  if(r&&!matchMedia('(prefers-reduced-motion: reduce)').matches){r.classList.add('leaving');setTimeout(fin,300);}else fin();return;}
 if(a==='undone'){delete S.done[id];S.doneOrder=S.doneOrder.filter(function(x){return x!==id;});save();render();taskSheet(id);return;}
 if(a==='task'){close();taskSheet(id);return;}
 if(a==='allwork'){close();allSheet();return;}
 if(a==='list'){listSheet(b.dataset.list);return;}
 if(a==='goal'){close();goalSheet();return;}
 if(a==='teaser'){teaserSheet();return;}
 if(a==='hint'){S.teaser.hints++;save();teaserSheet();return;}
 if(a==='answer'){var v=($('ans').value||'').trim();if(v===TEASER.a){S.teaser.solved=true;save();renderMinute();teaserSheet();toast('Solved \u2713');}else{$('fb').className='fb no';$('fb').textContent=v?'Not quite. Try again, or take a hint.':'Type a number first.';}return;}
 if(a==='journal'){close();journalSheet();return;}
 if(a==='jsave'){var v2=($('jt').value||'').trim();if(!v2){toast('Write a few words first.');return;}S.journal.push(v2);save();journalSheet();toast('Saved on this device');return;}
 if(a==='chess'){pageSheet('Chess puzzle');return;}
 if(a==='page'){close();pageSheet(b.dataset.page);return;}
 if(a==='more'){close();moreSheet();return;}
 if(a==='drawer'){drawer();return;}
 if(a==='role'){toast('This demo shows the Student view only.');return;}
 if(a==='close'){close();return;}
 if(a==='reset'){S=fresh();save();render();toast('Demo reset');return;}
});
function theme(){document.documentElement.classList.toggle('dark',T<405||T>=1140);}
function setTime(m){m=Math.round(m);if(!(m>=0&&m<1440)||m===T)return;T=m;PH=phaseAt(T);theme();renderGreet();renderNow();renderNeeds();renderMinute();renderOwe();
 try{history.replaceState(null,'','?t='+(Math.floor(T/60)*100+T%60)+location.hash);}catch(e){}}
window.addEventListener('message',function(e){if(e.origin!==location.origin)return;var d=e.data;if(d&&d.type==='aeios-time')setTime(+d.minutes);if(d&&d.type==='demoTime'&&/^\d{1,2}:\d{2}$/.test(d.t)){var p=d.t.split(':');setTime(+p[0]*60+(+p[1]));}});
window.aeiosSetTime=setTime;
document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
theme();render();
})();

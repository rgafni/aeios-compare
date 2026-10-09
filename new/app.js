(function(){
'use strict';
/* Data copied from the AEIOS showcase demo records (aeios2027.netlify.app). Dates re-based to Thu Oct 8 2026. */
var SUBJ={ela:{name:'English',color:'#DE6A48',teacher:'Mr. Okafor'},history:{name:'History',color:'#AE791F',teacher:'Ms. Adler'},science:{name:'Science',color:'#248674',teacher:'Dr. Chen'},math:{name:'Math',color:'#6250D8',teacher:'Ms. Rivera'}};
var TASKS=[
 {id:'ela-revise',title:'Finish your argument revision',subject:'ela',due:'Due tomorrow',dueLong:'Friday, October 9',rank:1,minutes:15,required:true,steps:['Read the feedback on paragraph 3.','Add one quotation that supports your claim.','Write a sentence explaining the connection.'],detail:'Revise the school-library proposal you wrote in English. Submit your paragraph and the feedback you used.',flex:'You can type or handwrite the revision. The required evidence stays the same.'},
 {id:'history-sources',title:'Get your sources ready',subject:'history',due:'Due tomorrow',dueLong:'Friday, October 9',rank:2,minutes:5,required:true,steps:['Put both Reconstruction sources in your folder.','Underline each author\u2019s main claim.'],detail:'Bring both classroom source sheets for tomorrow\u2019s comparison. This is preparation, not a graded assessment.',flex:'Paper or digital copies are fine.'},
 {id:'science-lab',title:'Explain your lab graph',subject:'science',due:'Due Monday',dueLong:'Monday, October 12',rank:3,minutes:12,required:true,steps:['Look at the force-and-motion graph.','Describe one pattern using values from the table.','Write your explanation and one limitation.'],detail:'Use the cart investigation from science. Keep your measurements, graph, and explanation together.',flex:'You may split the write-up across two days. School must approve a later deadline.'},
 {id:'math-review',title:'Look over your equation notes',subject:'math',due:'Optional \u00b7 before Friday\u2019s check',dueLong:'Friday, October 9 (optional)',rank:4,minutes:8,required:false,steps:['Choose an example from your class notes.','Write down any question for Ms. Rivera.'],detail:'Optional review before Friday\u2019s classroom check. The app does not assess your answers.',flex:'Optional. You can move this to tomorrow or skip it.'}
];
var LISTS={
 school:{title:'Ready for school',name:'School checklist',items:[['Equation notes & classwork','Math notebook and English draft'],['History sources','Both source sheets, in your folder'],['Pencil case & charged device','Charger, if you need one'],['Water bottle',''],['Lunch or school-lunch plan',''],['Basketball bag','Shoes and practice clothes']]},
 night:{title:'Ready for tomorrow',name:'Nighttime checklist',items:[['Check tomorrow\u2019s classes','Look for changes and anything due'],['Pack tomorrow\u2019s school bag',''],['Set out clothes',''],['Charge your device',''],['Brush teeth',''],['Put away screens & read','']]}
};
var P=[ // phases
 {id:'morning',name:'Before school',tone:'#8a6532',icon:'sunrise',items:[[405,425,'Wake up & wash'],[425,460,'Breakfast & get ready','school'],[465,495,'Travel to school']]},
 {id:'school',name:'At school',tone:'#3a6599',icon:'school',items:[[495,520,'Advisory'],[520,575,'Mathematics'],[575,630,'English'],[630,685,'Science'],[685,730,'Lunch & recess'],[730,785,'Social studies'],[785,850,'Studio & thinking skills'],[850,870,'Pack up']]},
 {id:'after',name:'After school',tone:'#2f6e5d',icon:'sun',items:[[870,900,'Travel home'],[900,920,'Snack & decompress'],[930,950,'Review math corrections'],[960,985,'Piano practice']]},
 {id:'evening',name:'Evening',tone:'#65578f',icon:'moon',items:[[1095,1125,'Dinner'],[1150,1170,'Read a chapter'],[1230,1260,'Get ready for tomorrow','night'],[1260,1290,'Reading & quiet time'],[1290,1305,'Lights out']]}
];
var GOAL={title:'Check tomorrow\u2019s assignments and pack my bag',why:'Each school day, check what\u2019s due tomorrow and pack the materials I\u2019ll need.',done:4,target:7,first:'Open the class list and find tomorrow\u2019s materials',reward:'Pick our Saturday ice-cream stop',helper:'Dad'};
var TEASER={kind:'Reasoning',title:'Work backward',q:'I think of a number, double it, and add 9. The result is 51. What was my number?',a:'21',hints:['Undo the steps in the opposite order.','First subtract the amount added, then divide by two.'],ex:'51 \u2212 9 = 42. Divide by 2 to get 21.'};
var ICON={
 sun:'M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5l1.5 1.5M5 19l1.5-1.5M17.5 6.5l1.5-1.5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
 moon:'M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z',sunrise:'M3 18h18M6 14a6 6 0 0 1 12 0M12 3v3M3 9l2 2M21 9l-2 2M3 21h18',
 school:'M3 21V8l9-5 9 5v13H3ZM9 21v-7h6v7M7 10h.01M17 10h.01M12 7h.01',chev:'M6 9l6 6 6-6',right:'M9 6l6 6-6 6',arrow:'M4 12h16m-6-6 6 6-6 6',check:'M5 12l4 4L19 6',x:'M6 6l12 12M18 6L6 18'};
function svg(n,s){return '<svg width="'+(s||18)+'" height="'+(s||18)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+ICON[n]+'"/></svg>';}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function clock(m){var h=Math.floor(m/60),mm=m%60,ap=h>=12?'PM':'AM';h=h%12||12;return h+':'+(mm<10?'0':'')+mm+' '+ap;}
function short(m){var h=Math.floor(m/60)%12||12,mm=m%60;return h+':'+(mm<10?'0':'')+mm;}
var KEY='aeios-new-demo-v1';
function fresh(){return {time:905,expanded:false,earlier:false,done:{},steps:{},checks:{school:{},night:{}},journal:[],teaser:{solved:false,hints:0}};}
var S;try{S=JSON.parse(localStorage.getItem(KEY))||fresh();}catch(e){S=fresh();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
var $=function(id){return document.getElementById(id);};
var ALL=[];P.forEach(function(p){p.items.forEach(function(i){ALL.push({s:i[0],e:i[1],n:i[2],list:i[3]||null,phase:p});});});
function phaseAt(t){return t<495?P[0]:t<870?P[1]:t<1095?P[2]:P[3];}
function cnt(l){var c=S.checks[l],n=0;for(var k in c)if(c[k])n++;return n;}
function ckRow(l,i){var it=LISTS[l].items[i],on=!!S.checks[l][i];return '<button class="ck'+(on?' on':'')+'" data-act="ck" data-list="'+l+'" data-i="'+i+'" role="checkbox" aria-checked="'+on+'"><span class="box"></span><span class="txt">'+esc(it[0])+(it[1]?'<small>'+esc(it[1])+'</small>':'')+'</span></button>';}
function attach(item){if(!item.list)return '';var l=item.list,h='<div class="attach"><button data-act="list" data-list="'+l+'">'+svg('check',16)+'Checklist \u00b7 '+cnt(l)+' of 6</button>';if(l==='night')h+='<button data-act="goal">Goal: pack my bag \u00b7 '+GOAL.done+' of 7 days</button>';return h+'</div>';}
function row(item,cls){return '<div class="it '+(cls||'')+'"><span class="tm">'+short(item.s)+'\u2013'+short(item.e)+'</span><div><span class="nm">'+esc(item.n)+'</span>'+attach(item)+'</div></div>';}
function renderNow(){
 var t=S.time,ph=phaseAt(t),cur=null,next=null,prev=null;
 ALL.forEach(function(i){if(i.s<=t&&t<i.e)cur=i;if(i.e<=t)prev=i;if(!next&&i.s>t)next=i;});
 var title,range,left,pct;
 if(cur){title=cur.n;range=short(cur.s)+' \u2013 '+clock(cur.e);left=(cur.e-t)+' min left';pct=Math.round((t-cur.s)/(cur.e-cur.s)*100);}
 else{title='Free time';range='Nothing planned until '+clock(next.s);left=(next.s-t)+' min left';pct=Math.round((t-prev.e)/(next.s-prev.e)*100);}
 var h='<div class="now-head"><div class="live"><span class="dot"></span>Right now \u00b7 '+clock(t)+'</div><div class="phase-chip">'+svg(ph.icon,17)+ph.name+'</div><div class="now-title">'+esc(title)+'</div><div class="now-time"><span>'+range+'</span><b>'+left+'</b></div><div class="bar" role="img" aria-label="'+left+'"><i style="width:'+pct+'%"></i></div></div>';
 if(cur&&cur.list){var l=cur.list;h+='<div class="inl"><div class="inl-hd">'+LISTS[l].name+' <span>'+cnt(l)+' of 6</span></div>';for(var i=0;i<6;i++)h+=ckRow(l,i);if(l==='night')h+='<button class="goal" data-act="goal" style="width:100%;text-align:left;min-height:44px">Packing your bag counts toward your goal \u00b7 '+GOAL.done+' of 7 days</button>';h+='</div>';}
 if(next&&!S.expanded){var nl=next.list?' \u00b7 checklist '+cnt(next.list)+' of 6':'';h+='<div class="next"><span class="lbl">Next</span><div><div class="t">'+esc(next.n)+'</div><div class="s">'+clock(next.s)+' \u00b7 '+(next.e-next.s)+' min'+nl+'</div></div></div>';}
 if(S.expanded){
  var earlier=ALL.filter(function(i){return i.e<=t;}),up=ALL.filter(function(i){return i.e>t;});
  h+='<div class="day" style="display:block"><div class="'+(S.earlier?'earlier-open':'')+'"><button class="earlier" data-act="earlier" aria-expanded="'+S.earlier+'"><span>Earlier today \u00b7 '+earlier.length+' activities</span>'+svg('chev')+'</button><div class="earlier-list">';
  var lp=null;earlier.forEach(function(i){if(i.phase!==lp){h+='<div class="ph" style="color:'+i.phase.tone+'">'+svg(i.phase.icon)+i.phase.name+'</div>';lp=i.phase;}h+=row(i,'past');});
  h+='</div></div>';lp=null;var nowShown=false;
  up.forEach(function(i){if(i.phase!==lp){h+='<div class="ph" style="color:'+i.phase.tone+'">'+svg(i.phase.icon)+i.phase.name+'</div>';lp=i.phase;}
   if(!cur&&!nowShown&&i.s>t){h+='<div class="nowline"><b>Now \u00b7 '+clock(t)+'</b><i></i></div>';nowShown=true;}
   h+=row(i,i===cur?'now-it':'');});
  h+='<div class="day-actions"><button data-act="page" data-page="Change my plan">+ Change my plan</button><button data-act="page" data-page="My calendar">Calendar '+svg('arrow',16)+'</button></div></div>';
 }
 h+='<button class="disclose" data-act="expand" aria-expanded="'+S.expanded+'"><span class="dl">'+(S.expanded?'Show less':'See the rest of my day')+'</span>'+svg('chev',20)+'</button>';
 $('now').innerHTML=h;$('app').classList.toggle('expanded',S.expanded);
}
function firstOpen(t){var d=S.steps[t.id]||{};for(var i=0;i<t.steps.length;i++)if(!d[i])return i;return -1;}
function renderNeeds(){
 var open=TASKS.filter(function(t){return t.required&&!S.done[t.id];});
 var h='<div class="hd"><h2>Needs you</h2>'+(open.length?'<span class="count">'+open.length+'</span>':'')+'</div>';
 if(!open.length)h+='<div class="empty">All caught up. Nice work.</div>';
 open.forEach(function(t,k){var s=SUBJ[t.subject],fi=firstOpen(t);
  h+='<button class="task" data-act="task" data-id="'+t.id+'"><span class="sw" style="background:'+s.color+'"></span><span class="tx"><span class="t">'+esc(t.title)+'</span><span class="m">'+s.name+' \u00b7 '+(t.due==='Due tomorrow'?'<b>Due tomorrow</b>':t.due)+' \u00b7 '+t.minutes+' min</span>'+(k===0&&fi>=0?'<span class="first">'+(fi===0?'First step: ':'Next step: ')+esc(t.steps[fi])+'</span>':'')+'</span>'+svg('right',20).replace('<svg','<svg class="chev"')+'</button>';});
 h+='<button class="all" data-act="allwork"><span>All my schoolwork</span>'+svg('arrow')+'</button>';
 $('needs').innerHTML=h;
}
function renderSeg(){[].forEach.call(document.querySelectorAll('#timeSeg button'),function(b){var on=+b.dataset.time===S.time;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);});
 $('teaserSub').textContent=S.teaser.solved?'Solved today \u2713':'A little challenge';}
function render(){renderSeg();renderNow();renderNeeds();}
/* sheets */
var lastSheet=null;
function sheet(title,body){lastSheet=[title,body];$('sheet').innerHTML='<div class="sh-head"><h2 id="shTitle">'+title+'</h2><button class="sh-x" data-act="close" aria-label="Close">'+svg('x',20)+'</button></div><div class="sh-body">'+body+'</div>';document.body.classList.add('open-sheet');$('sheet').scrollTop=0;}
function close(){document.body.classList.remove('open-sheet','open-drawer');openTask=null;openList=null;}
var openTask=null,openList=null;
function taskSheet(id){openTask=id;var t=TASKS.filter(function(x){return x.id===id;})[0],s=SUBJ[t.subject],d=S.steps[id]||{},done=!!S.done[id];
 var b='<div class="sw-bar" style="background:'+s.color+'"></div><div class="sh-meta">'+s.name+' \u00b7 '+s.teacher+'<br>'+(t.required?'Due ':'')+t.dueLong+' \u00b7 about '+t.minutes+' min</div><p>'+esc(t.detail)+'</p><div class="sh-sec">Steps</div>';
 t.steps.forEach(function(st,i){var on=!!d[i];b+='<button class="ck'+(on?' on':'')+'" data-act="step" data-id="'+id+'" data-i="'+i+'" role="checkbox" aria-checked="'+on+'"><span class="box"></span><span class="txt">'+esc(st)+'</span></button>';});
 b+='<div class="note">'+esc(t.flex)+'</div>';
 b+=done?'<div class="row-btns"><button class="btn ghost" data-act="undone" data-id="'+id+'">Move back to to-do</button></div>':'<div class="row-btns"><button class="btn primary" data-act="markdone" data-id="'+id+'">Mark as done</button></div>';
 sheet(esc(t.title),b);}
function allSheet(){var todo=TASKS.filter(function(t){return !S.done[t.id];}),dn=TASKS.filter(function(t){return S.done[t.id];});
 var b='<div class="sh-sec">To do \u00b7 '+todo.length+'</div>';
 function r(t){var s=SUBJ[t.subject];return '<button class="list-row" data-act="task" data-id="'+t.id+'"><span class="sw" style="background:'+s.color+'"></span><span class="tx"><span class="t">'+esc(t.title)+'</span><span class="m">'+s.name+' \u00b7 '+t.due+' \u00b7 '+t.minutes+' min</span></span>'+svg('right',20)+'</button>';}
 todo.forEach(function(t){b+=r(t);});if(!todo.length)b+='<p class="sh-meta">Nothing left to do.</p>';
 b+='<div class="sh-sec">Done \u00b7 '+dn.length+'</div>';dn.forEach(function(t){b+=r(t);});if(!dn.length)b+='<p class="sh-meta">Items you mark as done show up here.</p>';
 b+='<div class="note">In the full app this is the Classes &amp; work page, with grades and teacher feedback.</div>';
 sheet('All my schoolwork',b);}
function listSheet(l){openList=l;var b='<div class="sh-meta">'+cnt(l)+' of 6 ready</div>';for(var i=0;i<6;i++)b+=ckRow(l,i);if(l==='night')b+='<button class="note" data-act="goal" style="width:100%;text-align:left;min-height:44px">Packing your bag counts toward your goal \u00b7 '+GOAL.done+' of 7 days</button>';sheet(LISTS[l].name+': '+LISTS[l].title,b);}
function goalSheet(){var d='';for(var i=0;i<GOAL.target;i++)d+='<i class="'+(i<GOAL.done?'on':'')+'"></i>';
 sheet('My goal','<p style="font-size:18px;font-weight:750">'+esc(GOAL.title)+'</p><div class="dots" aria-label="'+GOAL.done+' of 7 school days">'+d+'</div><div class="sh-meta">'+GOAL.done+' of '+GOAL.target+' school days</div><p>'+esc(GOAL.why)+'</p><div class="sh-sec">Next step</div><p>'+esc(GOAL.first)+'</p><div class="sh-sec">Reward</div><p>'+esc(GOAL.reward)+' <span class="sh-meta">(helper: '+GOAL.helper+')</span></p><div class="note">In the full app this opens My goals.</div>');}
function teaserSheet(){var T=S.teaser,b='<div class="sh-meta">'+TEASER.kind+' \u00b7 '+TEASER.title+'</div><p style="font-size:18px;font-weight:650">'+esc(TEASER.q)+'</p>';
 if(T.solved)b+='<div class="fb ok">\u2713 Correct: '+TEASER.a+'</div><p class="note">'+esc(TEASER.ex)+'</p>';
 else{b+='<label class="sh-sec" for="ans" style="display:block">Your answer</label><input class="ans" id="ans" inputmode="numeric" autocomplete="off"><div id="fb" class="fb" aria-live="polite"></div>';
  for(var i=0;i<T.hints;i++)b+='<p class="note">Hint '+(i+1)+': '+esc(TEASER.hints[i])+'</p>';
  b+='<div class="row-btns"><button class="btn primary" data-act="answer">Check</button>'+(T.hints<2?'<button class="btn ghost" data-act="hint">Hint</button>':'')+'</div>';}
 b+='<p class="sh-meta" style="margin-top:14px">Today\u2019s puzzle from the AEIOS daily teaser.</p>';sheet('Brain teaser',b);}
function journalSheet(){var b='<p>One thing worth remembering from today.</p><textarea id="jt" aria-label="Write a moment" placeholder="Today I\u2019m glad that\u2026"></textarea><div class="row-btns"><button class="btn primary" data-act="jsave">Save</button></div>';
 if(S.journal.length){b+='<div class="sh-sec">Saved on this device</div>';S.journal.slice().reverse().forEach(function(j){b+='<p class="note">'+esc(j)+'</p>';});}
 sheet('Gratitude journal',b);}
function pageSheet(name){var map={'Change my plan':'Here you would adjust today\u2019s plans or add an activity (it was “Adjust plans” and “+ Add an activity” on the old page).','My calendar':'Here you would see other days, deadlines and activities. (Previous/next day moved here from the home page.)','My grades':'Math 88 \u00b7 English 91 \u00b7 Science 89 \u00b7 History 87 (sample grades).','Inbox':'3 messages from teachers (sample).','Colors':'Color themes live here.','Chess puzzle':'A chess puzzle at your 850 puzzle rating. The full board is in the live app.'};
 sheet(esc(name),'<p>'+(map[name]||'')+'</p><div class="note">Placeholder: this demo only builds the Today page.</div><div class="row-btns"><button class="btn ghost" data-act="close">Back to Today</button></div>');}
function drawer(){var items=[['close','Today'],['page','My calendar'],['allwork','Classes & work'],['page','My grades'],['page','Inbox'],['more','More']];
 $('drawer').innerHTML='<div class="side-label" style="margin-top:4px">MY SCHOOL LIFE</div><div class="nav">'+items.map(function(x,i){return '<button class="'+(i===0?'active':'')+'" data-act="'+x[0]+'" data-page="'+esc(x[1])+'">'+esc(x[1])+'</button>';}).join('')+'</div>';document.body.classList.add('open-drawer');}
function moreSheet(){sheet('More','<p>Goals \u00b7 Rewards \u00b7 Labs \u00b7 Crash courses \u00b7 Gratitude journal \u00b7 Profile &amp; support</p><div class="row-btns"><button class="btn ghost" data-act="goal">Open My goals</button><button class="btn ghost" data-act="journal">Gratitude journal</button></div><div class="note">These pages moved off the home screen into More.</div>');}
var tt;function toast(m){var t=$('toast');t.textContent=m;t.style.display='block';clearTimeout(tt);tt=setTimeout(function(){t.style.display='none';},2200);}
function refreshSheet(){if(openTask)taskSheet(openTask);else if(openList)listSheet(openList);}
document.addEventListener('click',function(e){
 var b=e.target.closest('[data-act],[data-time]');if(!b)return;
 if(b.dataset.time){S.time=+b.dataset.time;save();render();return;}
 var a=b.dataset.act,id=b.dataset.id;
 if(a==='expand'){S.expanded=!S.expanded;}
 else if(a==='earlier'){S.earlier=!S.earlier;}
 else if(a==='ck'){var l=b.dataset.list,i=b.dataset.i;S.checks[l][i]=!S.checks[l][i];save();render();refreshSheet();if(cnt(l)===6)toast(LISTS[l].title+': all 6 done \u2713');return;}
 else if(a==='step'){S.steps[id]=S.steps[id]||{};S.steps[id][b.dataset.i]=!S.steps[id][b.dataset.i];save();render();taskSheet(id);return;}
 else if(a==='markdone'){S.done[id]=true;save();render();close();toast('Marked as done \u2713');return;}
 else if(a==='undone'){delete S.done[id];save();render();taskSheet(id);return;}
 else if(a==='task'){close();taskSheet(id);return;}
 else if(a==='allwork'){close();allSheet();return;}
 else if(a==='list'){listSheet(b.dataset.list);return;}
 else if(a==='goal'){close();goalSheet();return;}
 else if(a==='teaser'){teaserSheet();return;}
 else if(a==='hint'){S.teaser.hints++;save();teaserSheet();return;}
 else if(a==='answer'){var v=($('ans').value||'').trim();if(v===TEASER.a){S.teaser.solved=true;save();renderSeg();teaserSheet();toast('Solved \u2713');}else{$('fb').className='fb no';$('fb').textContent=v?'Not quite. Try again, or take a hint.':'Type a number first.';}return;}
 else if(a==='journal'){close();journalSheet();return;}
 else if(a==='jsave'){var v2=($('jt').value||'').trim();if(!v2){toast('Write a few words first.');return;}S.journal.push(v2);save();journalSheet();toast('Saved on this device');return;}
 else if(a==='chess'){pageSheet('Chess puzzle');return;}
 else if(a==='page'){close();pageSheet(b.dataset.page);return;}
 else if(a==='more'){close();moreSheet();return;}
 else if(a==='drawer'){drawer();return;}
 else if(a==='role'){toast('This demo shows the Student view only.');return;}
 else if(a==='close'){close();return;}
 else if(a==='reset'){S=fresh();save();render();toast('Demo reset');return;}
 else return;
 save();render();
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
render();
})();

(function(){
'use strict';
/* AEIOS · Today · Variant B "Focus". Demo data = the showcase's own sample day (aeios2027.netlify.app), same model as the compromise mockup, due dates around Thu Oct 8 2026. */
var SUBJ={ela:{name:'English',color:'#DE6A48',glow:'#ff8a66',teacher:'Mr. Okafor'},history:{name:'History',color:'#AE791F',glow:'#e8b04e',teacher:'Ms. Adler'},science:{name:'Science',color:'#248674',glow:'#3fd0b0',teacher:'Dr. Chen'},math:{name:'Math',color:'#6250D8',glow:'#a99bff',teacher:'Ms. Rivera'}};
var TASKS=[
 {id:'ela-revise',title:'Finish your argument revision',short:'Argument revision',subject:'ela',due:'Due tomorrow',soon:true,dueLong:'Friday, October 9',minutes:15,required:true,steps:['Read the feedback on paragraph 3.','Add one quotation that supports your claim.','Write a sentence explaining the connection.'],detail:'Revise the school-library proposal you wrote in English. Submit your paragraph and the feedback you used.',flex:'You can type or handwrite the revision. The required evidence stays the same.'},
 {id:'history-sources',title:'Get your sources ready',short:'History sources',subject:'history',due:'Due tomorrow',soon:true,dueLong:'Friday, October 9',minutes:5,required:true,steps:['Put both Reconstruction sources in your folder.','Underline each author\u2019s main claim.'],detail:'Bring both classroom source sheets for tomorrow\u2019s comparison. This is preparation, not a graded assessment.',flex:'Paper or digital copies are fine.'},
 {id:'science-lab',title:'Explain your lab graph',short:'Lab graph',subject:'science',due:'Due Monday',dueLong:'Monday, October 12',minutes:12,required:true,steps:['Look at the force-and-motion graph.','Describe one pattern using values from the table.','Write your explanation and one limitation.'],detail:'Use the cart investigation from science. Keep your measurements, graph, and explanation together.',flex:'You may split the write-up across two days. School must approve a later deadline.'},
 {id:'math-review',title:'Look over your equation notes',short:'Equation notes',subject:'math',due:'Optional',dueLong:'Before Friday\u2019s classroom check (optional)',minutes:8,required:false,steps:['Choose an example from your class notes.','Write down any question for Ms. Rivera.'],detail:'Optional review before Friday\u2019s classroom check. The app does not assess your answers.',flex:'Optional. You can move this to tomorrow or skip it.'}
];
var LISTS={
 school:{title:'Bag check',long:'Ready for school',items:[['Equation notes & classwork','Math notebook and English draft'],['History sources','Both source sheets, in your folder'],['Pencil case & charged device','Charger, if you need one'],['Water bottle',''],['Lunch or school-lunch plan',''],['Basketball bag','Shoes and practice clothes']],start:{0:true,2:true},doneMsg:'Bag\u2019s packed.'},
 night:{title:'Tomorrow',long:'Ready for tomorrow',items:[['Check tomorrow\u2019s classes','Look for changes and anything due'],['Pack tomorrow\u2019s school bag',''],['Set out clothes',''],['Charge your device',''],['Brush teeth',''],['Put away screens & read','']],start:{},doneMsg:'All set for tomorrow.'}
};
/* [start,end,name,extra]  minutes after midnight */
var B=[
 [405,425,'Wake up & wash',{short:'Wake up',act:'done'}],
 [425,460,'Breakfast & get ready',{short:'Breakfast',list:'school'}],
 [465,495,'Travel to school',{short:'Head out',travel:1,act:'bag'}],
 [495,520,'Advisory',{detail:'Check your day. Ask for what you need.',act:'day'}],
 [520,575,'Mathematics',{short:'Math',subject:'math',detail:'Bring your equation notes.'}],
 [575,630,'English',{subject:'ela',detail:'Partner feedback on your argument.'}],
 [630,685,'Science',{subject:'science',detail:'Use the force-and-motion lab table.'}],
 [685,730,'Lunch & recess',{short:'Lunch',detail:'A real break.',act:'teaser'}],
 [730,785,'Social studies',{subject:'history',detail:'Compare two Reconstruction accounts.'}],
 [785,850,'Studio & thinking skills',{short:'Studio',detail:'Make a plan that actually fits.',act:'day'}],
 [850,870,'Pack up',{detail:'Check materials for tomorrow.',act:'work'}],
 [870,900,'Travel home',{short:'Travel home',travel:1}],
 [900,920,'Snack & decompress',{short:'Snack',act:'teaser'}],
 [930,950,'Review math corrections',{short:'Math corrections',act:'done'}],
 [960,985,'Piano practice',{short:'Piano',act:'done'}],
 [1095,1125,'Dinner',{}],
 [1150,1170,'Read a chapter',{short:'Reading',act:'done'}],
 [1230,1260,'Get ready for tomorrow',{short:'Pack for tomorrow',list:'night'}],
 [1260,1290,'Reading & quiet time',{short:'Quiet time'}],
 [1290,1305,'Lights out',{}]
].map(function(b,i){var o={id:i,s:b[0],e:b[1],n:b[2]};for(var k in b[3])o[k]=b[3][k];o.short=o.short||o.n;return o;});
var WAKE=405,SCHOOL_S=495,SCHOOL_E=870,DINNER=1095,NIGHT=1170;
var GOAL={title:'Check tomorrow\u2019s assignments and pack my bag',why:'Each school day, check what\u2019s due tomorrow and pack the materials I\u2019ll need.',done:4,target:7,first:'Open the class list and find tomorrow\u2019s materials',reward:'Pick our Saturday ice-cream stop',helper:'Dad'};
var TEASER={kind:'Reasoning',title:'Work backward',q:'I think of a number, double it, and add 9. The result is 51. What was my number?',a:'21',hints:['Undo the steps in the opposite order.','First subtract the amount added, then divide by two.'],ex:'51 \u2212 9 = 42. Divide by 2 to get 21.'};

var ICON={check:'M5 12.5l4.5 4.5L19 7.5',x:'M6 6l12 12M18 6L6 18',right:'M9 6l6 6-6 6',left:'M15 6l-6 6 6 6',play:'M8 5.5v13l11-6.5z',pause:'M8 5v14M16 5v14',moon:'M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z',puzzle:'M4 4h6a3 3 0 1 1 4 0h6v6a3 3 0 1 0 0 4v6h-6a3 3 0 1 1-4 0H4v-6a3 3 0 1 0 0-4V4Z',journal:'M5 3h14v18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 0v18M9 8h6M9 12h6',list:'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',bag:'M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2',flag:'M5 21V4h13l-3 4.5L18 13H5',cal:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',grade:'M4 20V10M10 20V4M16 20v-7M22 20H2',inbox:'M3 13l3-8h12l3 8v6H3zM3 13h5l1 3h6l1-3h5',day:'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0',knight:'M8 20h9M9 20c0-4 1-6 3-8-2 0-4 1-5 2l-1-2 5-6c3 0 6 3 6 8v6',sun:'M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',sparkle:'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z'};
function ic(n,s,w){return '<svg width="'+(s||20)+'" height="'+(s||20)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+ICON[n]+'"/></svg>';}
function lc(d){return d.replace(/^Due /,'due ').replace(/^Optional/,'optional');}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function hm(m){m=((m%1440)+1440)%1440;var h=Math.floor(m/60)%12||12,mm=m%60;return h+':'+(mm<10?'0':'')+mm;}
function ap(m){return hm(m)+(m%1440>=720?' PM':' AM');}
function dur(n){if(n<60)return n+' min';var h=Math.floor(n/60),r=n%60;return h+' hr'+(r?' '+r+' min':'');}
var $=function(id){return document.getElementById(id);};
var RM=window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- demo time ---------- */
function parseT(s){var m=/(\d{1,2}):?(\d{2})/.exec(s||'');if(!m)return null;var h=+m[1],mi=+m[2];if(h>23||mi>59)return null;return h*60+mi;}
function initialT(){var h=/t=([0-9:]+)/.exec(location.hash||'');var t=h&&parseT(h[1]);if(t==null){var q=new URLSearchParams(location.search).get('t');t=q&&parseT(q);}return t==null?945:t;}
var T=initialT();

/* ---------- state ---------- */
var KEY='aeios-b-focus-v1';
function fresh(){return {done:{},order:TASKS.map(function(t){return t.id;}),steps:{},checks:{school:JSON.parse(JSON.stringify(LISTS.school.start)),night:{}},bdone:{},journal:[],teaser:{solved:false,hints:0},peekSchool:false};}
var S;try{S=JSON.parse(localStorage.getItem(KEY))||fresh();}catch(e){S=fresh();}
S.peekSchool=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function task(id){return TASKS.filter(function(t){return t.id===id;})[0];}
function stackTasks(){return S.order.map(task).filter(function(t){return t&&!S.done[t.id];});}
function requiredOpen(){return stackTasks().filter(function(t){return t.required;});}
function cnt(l){var n=0;for(var k in S.checks[l])if(S.checks[l][k])n++;return n;}
function nextItem(l){for(var i=0;i<6;i++)if(!S.checks[l][i])return i;return -1;}
function goalDone(){return GOAL.done+(cnt('night')===6?1:0);}

/* ---------- reading the clock ---------- */
function at(t){var cur=null,prev=null,next=null;
 B.forEach(function(b){var live=b.s<=t&&t<b.e;if(live&&!S.bdone[b.id])cur=b;else if(b.e<=t||live)prev=b;if(!next&&b.s>t)next=b;});
 return {cur:cur,prev:prev,next:next};}
function isNight(t){return t>=NIGHT||t<WAKE;}
function accent(b){if(b&&b.subject)return SUBJ[b.subject].glow;if(isNight(T))return '#aab8ff';if(T<SCHOOL_S)return '#ffc25c';if(T<SCHOOL_E)return '#7fb2ff';if(T<DINNER)return '#ffb36b';return '#8fb6ff';}

/* the whole "what matters now" decision, in one place */
function model(){
 var c=at(T),cur=c.cur,next=c.next,prev=c.prev,m={cur:cur,next:next,acc:accent(cur),act:null,what:'',sm:false};
 var leave=B[2];
 if(cur){
  m.rem=cur.e-T;m.tot=cur.e-cur.s;
  var then=next?'Then '+next.short.toLowerCase()+' at '+hm(next.s)+'.':'';
  if(cur.subject){m.hl=cur.short+' till '+hm(cur.e)+'.';m.what='<b>with '+SUBJ[cur.subject].teacher+'</b><br>'+esc(cur.detail);
   var t=stackTasks().filter(function(x){return x.subject===cur.subject;})[0];if(t)m.act={type:'task',id:t.id};}
  else switch(cur.n){
   case 'Wake up & wash':m.hl='Morning. Leave by '+hm(leave.s)+'.';m.what='Breakfast at '+hm(B[1].s)+'.';m.act={type:'done'};break;
   case 'Breakfast & get ready':m.hl='Leave by '+hm(leave.s)+'.';m.act={type:'list',list:'school'};m.sm=true;break;
   case 'Travel to school':m.hl='Advisory at '+hm(B[3].s)+'.';m.what=cnt('school')===6?'Bag\u2019s packed. You\u2019re good.':'Bag: '+cnt('school')+' of 6 checked.';if(cnt('school')<6)m.act={type:'list-sheet',list:'school'};break;
   case 'Lunch & recess':m.hl='Lunch till '+hm(cur.e)+'.';m.what='A real break.';if(!S.teaser.solved)m.act={type:'teaser'};break;
   case 'Pack up':m.hl='Out at '+hm(cur.e)+'.';m.what='Check materials for tomorrow.';m.act={type:'work'};break;
   case 'Travel home':m.hl='School\u2019s out.';m.what='Snack at '+hm(next.s)+'.';break;
   case 'Snack & decompress':m.hl='Snack. Nothing till '+hm(next.s)+'.';m.what='Do nothing. Seriously.';if(!S.teaser.solved)m.act={type:'teaser'};break;
   case 'Get ready for tomorrow':m.hl='Pack for tomorrow.';m.act={type:'list',list:'night'};m.sm=true;break;
   case 'Reading & quiet time':m.hl='Quiet time till '+hm(cur.e)+'.';m.what='Lights out at '+hm(B[19].e)+'.';break;
   case 'Lights out':m.hl='Lights out at '+hm(cur.e)+'.';m.what='Up at '+hm(WAKE)+' for Friday.';break;
   default:m.hl=cur.short+' till '+hm(cur.e)+'.';m.what=cur.detail?esc(cur.detail):'';if(cur.act)m.act={type:cur.act};
  }
 } else if(next){
  var start=prev?Math.min(prev.e,T):360;if(prev&&S.bdone[prev.id]&&T<prev.e)start=Math.min(prev.s,T);
  m.rem=next.s-T;m.tot=Math.max(m.rem,next.s-start);m.gap=true;
  var early=prev&&S.bdone[prev.id]&&T<prev.e;
  if(T<WAKE){m.hl='Alarm\u2019s at '+hm(WAKE)+'.';m.what='Still early. Nothing yet.';m.lbl='till alarm';}
  else if(next===leave){m.hl='Leave in '+m.rem+'.';m.lbl='min to go';m.what=cnt('school')===6?'Bag\u2019s packed.':'Bag: '+cnt('school')+' of 6.';if(cnt('school')<6){m.act={type:'list',list:'school'};m.sm=true;}}
  else if(next.s===DINNER&&T>=SCHOOL_E){
   var r=requiredOpen()[0];
   if(r){m.hl=(m.rem<=90?m.rem+' min till dinner.':'Dinner\u2019s at '+hm(DINNER)+'.');m.focus=r;m.act={type:'focus',id:r.id};}
   else{m.hl=(early?'Nice. ':'')+'Free till dinner.';m.what='Nothing due. All yours.';m.act={type:S.teaser.solved?'journal':'teaser'};}
  }
  else{m.hl=(early?'Nice. ':'')+'Free till '+hm(next.s)+'.';m.what='Then '+next.short.toLowerCase()+'.';
   m.act={type:T>=DINNER?'journal':(S.teaser.solved?'journal':'teaser')};}
 } else {
  m.after=true;m.hl='That\u2019s a wrap.';m.what='Up at '+hm(WAKE)+'. Tomorrow\u2019s Friday.';m.act={type:'tomorrow'};
 }
 return m;
}

/* ---------- ring ---------- */
var R=88,C=2*Math.PI*R;
function ringHTML(m){
 var big,lbl,p;
 if(m.focus){var f=F&&F.id===m.focus.id?F:null,left=f?f.left:m.focus.minutes*60;big=mmss(left);lbl=f&&f.run?'focus':(f?'paused':m.focus.minutes+'-min focus');p=f?left/f.total:1;}
 else if(m.after){big=hm(WAKE);lbl='alarm';p=0;}
 else{var r=m.rem;big=r<60?String(r):Math.floor(r/60)+':'+(r%60<10?'0':'')+r%60;lbl=m.lbl||(r<60?(m.gap?'min free':'min left'):(m.gap?'hr free':'hr left'));if(T<WAKE)lbl='min till alarm';p=r/m.tot;}
 p=Math.max(0,Math.min(1,p));
 var label=m.focus?'Focus timer '+big:(m.after?'Alarm at '+ap(WAKE):big+' '+lbl);
 return '<div class="ring'+(m.sm?' sm':'')+'" role="img" aria-label="'+esc(label)+'"><svg viewBox="0 0 200 200"><circle class="trk" cx="100" cy="100" r="'+R+'" fill="none" stroke-width="13"/><circle class="bar" id="ringBar" cx="100" cy="100" r="'+R+'" fill="none" stroke-width="13" stroke-linecap="round" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+C.toFixed(1)+'" data-p="'+p.toFixed(4)+'"/></svg><div class="ctr">'+(m.after?'<span class="ico">'+ic('moon',30)+'</span>':'')+'<span class="big'+(m.focus?' t':'')+'" id="ringBig">'+big+'</span><span class="lbl" id="ringLbl">'+lbl+'</span></div></div>';
}
function mmss(s){s=Math.max(0,Math.ceil(s));var mm=Math.floor(s/60),ss=s%60;return mm+':'+(ss<10?'0':'')+ss;}
function setRing(p,instant){var b=$('ringBar');if(!b)return;var off=C*(1-p);if(instant||RM.matches){b.style.transition='none';b.setAttribute('stroke-dashoffset',off.toFixed(1));void b.offsetWidth;b.style.transition='';}else b.setAttribute('stroke-dashoffset',off.toFixed(1));}

/* ---------- primary action ---------- */
function packHTML(l){var n=cnt(l),i=nextItem(l),segs='';for(var k=0;k<6;k++)segs+='<i class="'+(S.checks[l][k]?'on':'')+'"></i>';
 var L=LISTS[l],h='<div class="pack'+(i<0?' done':'')+'" id="pack"><div class="row"><span>'+L.title+'</span><span>'+n+' of 6</span></div><div class="segs" aria-hidden="true">'+segs+'</div>';
 if(i<0)h+='<div class="item">'+ic('check',22,3)+esc(L.doneMsg)+'</div><div class="sub">'+(l==='night'?'Goal: '+goalDone()+' of 7 days. Nice.':'You\u2019re good to go.')+'</div></div><div class="acts"><button class="go glass" data-act="list-sheet" data-list="'+l+'">See the list</button></div>';
 else h+='<div class="item">'+esc(L.items[i][0])+'</div><div class="sub">'+esc(L.items[i][1]||' ')+'</div></div><div class="acts"><button class="go" data-act="pack" data-list="'+l+'" data-i="'+i+'">'+ic('check',22,3)+'Got it</button><button class="lnk" data-act="list-sheet" data-list="'+l+'" aria-label="See all 6 on the list">All 6</button></div>';
 return h;}
function actHTML(m){var a=m.act;if(!a)return '';
 switch(a.type){
  case 'list':return packHTML(a.list);
  case 'list-sheet':return '<div class="acts"><button class="go glass" data-act="list-sheet" data-list="'+a.list+'">'+ic('bag')+'Forgot something? '+cnt(a.list)+' of 6</button></div>';
  case 'task':var t=task(a.id);return '<div class="acts"><button class="go glass" data-act="task" data-id="'+t.id+'">'+esc(t.short)+' <small>\u00b7 '+lc(t.due)+'</small>'+ic('right')+'</button></div>';
  case 'done':return '<div class="acts"><button class="go" data-act="bdone">'+ic('check',22,3)+'Done</button></div>';
  case 'teaser':return '<div class="acts"><button class="go glass" data-act="teaser">'+ic('puzzle')+'Brain teaser <small>\u00b7 1 min</small></button></div>';
  case 'journal':return '<div class="acts"><button class="go glass" data-act="journal">'+ic('journal')+'Write a moment</button></div>';
  case 'day':return '<div class="acts"><button class="go glass" data-act="day">'+ic('list')+'See my day</button></div>';
  case 'work':var n=requiredOpen().filter(function(t){return t.soon;}).length;return '<div class="acts"><button class="go glass" data-act="work">'+ic('bag')+(n?n+' due tomorrow':'What\u2019s due')+ic('right')+'</button></div>';
  case 'tomorrow':return '<div class="acts"><button class="go glass" data-act="tomorrow">'+ic('sun')+'Peek at Friday</button></div>';
  case 'focus':var f=F&&F.id===a.id?F:null;
   return '<div class="acts"><button class="go" data-act="'+(f&&f.run?'fpause':'fstart')+'" data-id="'+a.id+'">'+ic(f&&f.run?'pause':'play',22)+(f&&f.run?'Pause':(f?'Keep going':'Start'))+'</button><button class="lnk" data-act="tdone" data-id="'+a.id+'">'+ic('check',20,3)+'Done</button></div>';
 }return '';}

/* ---------- render ---------- */
function nowCard(m){
 var h='<article class="card now" style="--acc:'+m.acc+'" aria-label="Now">';
 if(m.focus){var s=SUBJ[m.focus.subject];h+='<h1 class="hl">'+esc(m.hl)+'</h1><p class="hsub">Good time for <b>'+esc(m.focus.short)+'</b> \u00b7 '+s.name+', '+lc(m.focus.due)+'</p>';h=h.replace('--acc:'+m.acc,'--acc:'+s.glow);}
 else h+='<h1 class="hl">'+esc(m.hl)+'</h1>';
 h+='<div class="mid">'+ringHTML(m)+(m.what?'<p class="what">'+m.what+'</p>':'')+(m.focus?'<p class="what">'+esc(m.focus.steps[firstStep(m.focus)]||'')+'</p>':'')+'</div>';
 h+=actHTML(m)+'</article>';return h;}
function firstStep(t){var d=S.steps[t.id]||{};for(var i=0;i<t.steps.length;i++)if(!d[i])return i;return 0;}
function queueItems(m){return B.filter(function(b){return b.s>T&&b!==m.cur;}).slice(0,3);}
function qCard(b,i){var acc=accent(b);if(b.subject)acc=SUBJ[b.subject].glow;
 var h='<article class="card q" style="--acc:'+acc+'" aria-label="'+(i===0?'Up next':'Later')+': '+esc(b.n)+'"><div class="eyebrow">'+(i===0?'Up next':'Later')+' \u00b7 in '+dur(b.s-T)+'</div><div class="spacer"></div><div class="qt">'+hm(b.s)+'<small>'+(b.s>=720?'PM':'AM')+'</small></div><h2>'+esc(b.n)+'</h2><div class="qd">'+dur(b.e-b.s)+', till '+hm(b.e)+'</div>';
 if(b.subject)h+='<div class="with"><i></i><span>'+SUBJ[b.subject].teacher+(b.detail?' \u00b7 '+esc(b.detail):'')+'</span></div>';else if(b.detail)h+='<div class="with"><i></i><span>'+esc(b.detail)+'</span></div>';
 h+='<div class="spacer"></div>';
 var t=b.subject&&stackTasks().filter(function(x){return x.subject===b.subject;})[0];
 if(b.list)h+='<div class="acts"><button class="go glass" data-act="list-sheet" data-list="'+b.list+'">'+ic('bag')+LISTS[b.list].title+' \u00b7 '+cnt(b.list)+' of 6</button></div>';
 else if(t)h+='<div class="acts"><button class="go glass" data-act="task" data-id="'+t.id+'">'+esc(t.short)+' <small>\u00b7 '+lc(t.due)+'</small>'+ic('right')+'</button></div>';
 else h+='<div class="acts"><button class="go glass" data-act="tonow">'+ic('left')+'Back to now</button></div>';
 return h+'</article>';}
var M=null,Q=[];
function renderDeck(keep){
 M=model();Q=queueItems(M);
 var deck=$('deck'),pos=keep?Math.round(deck.scrollLeft/Math.max(1,deck.clientWidth)):0;
 deck.innerHTML=nowCard(M)+Q.map(qCard).join('');
 if(!keep)deck.scrollLeft=0;else deck.scrollLeft=pos*(deck.clientWidth+12);
 document.body.classList.toggle('night',isNight(T));
 document.querySelector('meta[name=theme-color]').setAttribute('content',isNight(T)?'#0a1220':'#182b4b');
 $('me').style.setProperty('--acc',M.acc);
 $('clock').innerHTML='<span class="d">Thu, Oct 8 \u00b7 </span>'+ap(T);
 var b=$('ringBar');if(b){var p=+b.dataset.p;if(keep)setRing(p,true);else{setRing(0.0001,true);requestAnimationFrame(function(){requestAnimationFrame(function(){setRing(p);});});}}
 renderNav();renderQueue();}
function deckIndex(){var d=$('deck');return Math.round(d.scrollLeft/Math.max(1,d.clientWidth+12));}
function renderNav(){var n=1+Q.length,i=deckIndex(),d='';if(n>1)for(var k=0;k<n;k++)d+='<i class="'+(k===i?'on':'')+'"></i>';$('dots').innerHTML=d;
 var p=$('peek');if(!Q.length){p.style.display='none';return;}p.style.display='';
 if(i===0){var nx=Q[0];p.innerHTML='<span>Next</span><b>'+esc(nx.short)+'</b><span>'+hm(nx.s)+'</span>'+ic('right');p.setAttribute('aria-label','Next: '+nx.n+' at '+ap(nx.s));p.dataset.to=1;}
 else if(i<Q.length){var n2=Q[i];p.innerHTML='<span>Then</span><b>'+esc(n2.short)+'</b><span>'+hm(n2.s)+'</span>'+ic('right');p.setAttribute('aria-label','Then: '+n2.n+' at '+ap(n2.s));p.dataset.to=i+1;}else{p.innerHTML=ic('left')+'Back to now';p.removeAttribute('aria-label');p.dataset.to=0;}
 [].forEach.call(document.querySelectorAll('.qrow'),function(r){r.classList.toggle('on',+r.dataset.to===i);});}
function renderQueue(){var h='<h2>Up next</h2>';if(!Q.length)h+='<p class="mut" style="padding:6px 8px 12px">Nothing else today.</p>';
 Q.forEach(function(b,i){var c=b.subject?SUBJ[b.subject].color:'#8a97ab';h+='<button class="qrow" data-act="goto" data-to="'+(i+1)+'"><span class="tm">'+hm(b.s)+'</span><i style="background:'+c+'"></i><span class="nm">'+esc(b.n)+'</span><span class="in">in '+dur(b.s-T)+'</span></button>';});
 h+='<button class="qrow" data-act="day"><span class="tm">'+ic('list')+'</span><span class="nm">Whole day</span>'+ic('right')+'</button>';
 $('queue').innerHTML=h;}
function goto(i){var d=$('deck');d.scrollTo({left:i*(d.clientWidth+12),behavior:RM.matches?'auto':'smooth'});}

/* to-do stack */
function renderTodos(){
 var el=$('todos'),list=stackTasks(),req=list.filter(function(t){return t.required;}),school=T<SCHOOL_E||T>=1260,h;
 var why=T>=1260?'not tonight':(T<SCHOOL_S?'later today':'for after school');
 h='<div class="todos-hd"><h2>To-dos</h2><span class="n">'+(req.length?req.length+' left':'')+'</span><button class="all" data-act="work">All'+ic('right',18)+'</button></div>';
 if(school&&!S.peekSchool&&list.length){var ds='';list.slice(0,4).forEach(function(t){ds+='<i style="background:'+SUBJ[t.subject].color+'"></i>';});
  h+='<button class="calm" data-act="peekschool"><span class="ds">'+ds+'</span><span>'+req.length+' to-dos <span class="s">\u00b7 '+why+'</span></span>'+ic('right')+'</button>';el.innerHTML=h;return;}
 h+='<div class="stack" id="stack">';
 if(!list.length)h+='<div class="tc empty" data-k="0"><span class="t">All clear.</span><span class="m">Nothing left on your list. Go do something fun.</span></div>';
 list.slice(0,3).forEach(function(t,k){var s=SUBJ[t.subject],nd=0,d=S.steps[t.id]||{};t.steps.forEach(function(_,i){if(d[i])nd++;});
  h+='<div class="tc" data-k="'+k+'" data-id="'+t.id+'" style="--sc:'+s.color+'"'+(k?' aria-hidden="true"':'')+'><span class="hint h-done">Done \u2713</span><span class="hint h-later">Later</span><button class="open" data-act="task" data-id="'+t.id+'"><span class="meta"><span>'+s.name+'</span>\u00b7<span class="'+(t.soon?'hot':'')+'">'+t.due+'</span></span><span class="t">'+esc(t.title)+'</span><span class="m">'+t.minutes+' min'+(nd?' \u00b7 '+nd+' of '+t.steps.length+' steps':' \u00b7 '+t.steps.length+' steps')+'</span></button><div class="row"><button class="later" data-act="tlater" data-id="'+t.id+'"'+(list.length<2?' disabled style="opacity:.5"':'')+'>Later</button><button class="done" data-act="tdone" data-id="'+t.id+'">'+ic('check',20,3)+'Done</button></div></div>';});
 h+='</div>';el.innerHTML=h;bindSwipe();}
function renderGoal(){var d='';for(var i=0;i<GOAL.target;i++)d+='<i class="'+(i<goalDone()?'on':'')+'"></i>';$('goalmini').innerHTML='<button class="gm" data-act="goal"><span><b>My goal: check &amp; pack</b><span>'+goalDone()+' of 7 school days</span></span><span class="gd" aria-hidden="true">'+d+'</span></button>';}
function render(keep){renderDeck(keep);renderTodos();renderGoal();}

/* ---------- swipe the top to-do card ---------- */
var drag=null,suppress=false;
function bindSwipe(){var c=document.querySelector('.tc[data-k="0"][data-id]');if(!c)return;
 c.addEventListener('pointerdown',function(e){if(e.button)return;drag={x:e.clientX,y:e.clientY,dx:0,el:c,on:false,id:e.pointerId};});
 c.addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(!drag.on){if(Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)){drag.on=true;c.setPointerCapture(drag.id);c.style.transition='none';}else if(Math.abs(dy)>10){drag=null;return;}else return;}
  drag.dx=dx;c.style.transform='translateX('+dx+'px) rotate('+(dx/22)+'deg)';
  c.querySelector('.h-done').style.opacity=Math.max(0,Math.min(1,dx/90));c.querySelector('.h-later').style.opacity=Math.max(0,Math.min(1,-dx/90));});
 function end(){if(!drag)return;var d=drag;drag=null;if(!d.on)return;suppress=true;setTimeout(function(){suppress=false;},50);c.style.transition='';
  if(d.dx>95)fling(c,1,function(){markDone(c.dataset.id);});
  else if(d.dx<-95&&stackTasks().length>1)fling(c,-1,function(){later(c.dataset.id);});
  else{c.style.transform='';[].forEach.call(c.querySelectorAll('.hint'),function(h){h.style.opacity=0;});}}
 c.addEventListener('pointerup',end);c.addEventListener('pointercancel',end);}
function fling(c,dir,cb){if(RM.matches){cb();return;}c.style.transform='translateX('+(dir*120)+'%) rotate('+(dir*14)+'deg)';c.style.opacity='0';setTimeout(cb,260);}

/* ---------- actions ---------- */
var undoFn=null,tt;
function toast(msg,undo){var t=$('toast');$('toastMsg').textContent=msg;undoFn=undo||null;t.classList.toggle('u',!!undo);t.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('on');undoFn=null;},undo?5000:2200);}
function markDone(id){var t=task(id);S.done[id]=true;save();if(F&&F.id===id)stopF();var left=requiredOpen().length;render(true);
 toast(left?'Done: '+t.short+'. '+left+' left.':'Done. That\u2019s everything.',function(){delete S.done[id];save();render(true);});}
function later(id){var i=S.order.indexOf(id);S.order.splice(i,1);S.order.push(id);save();render(true);}
/* focus timer (real seconds) */
var F=null,FI=null;
function startF(id){var t=task(id);if(!F||F.id!==id)F={id:id,total:t.minutes*60,left:t.minutes*60};F.run=true;F.t0=Date.now();F.base=F.left;clearInterval(FI);FI=setInterval(tickF,250);render(true);}
function pauseF(){if(!F)return;tickF();F.run=false;clearInterval(FI);render(true);}
function stopF(){clearInterval(FI);F=null;}
function tickF(){if(!F||!F.run)return;F.left=Math.max(0,F.base-(Date.now()-F.t0)/1000);var b=$('ringBig');if(b)b.textContent=mmss(F.left);setRing(F.left/F.total,true);
 if(F.left<=0){clearInterval(FI);F.run=false;render(true);toast('Time. Done, or a few more minutes?');}}

/* ---------- sheets ---------- */
var opener=null;
function sheet(title,body){opener=document.activeElement;$('sheet').innerHTML='<div class="sh-hd"><h2 id="shT">'+title+'</h2><button class="x" data-act="close" aria-label="Close">'+ic('x')+'</button></div><div class="sh-b">'+body+'</div>';document.body.classList.add('open');$('sheet').scrollTop=0;setTimeout(function(){var x=$('sheet').querySelector('.x');if(x)x.focus({preventScroll:true});},30);}
function close(){if(!document.body.classList.contains('open'))return;document.body.classList.remove('open');if(opener&&document.contains(opener))opener.focus({preventScroll:true});}
var TICK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
function ckRow(act,attrs,on,txt,sub){return '<button class="ck'+(on?' on':'')+'" data-act="'+act+'" '+attrs+' role="checkbox" aria-checked="'+on+'"><span class="bx">'+TICK+'</span><span class="tx">'+esc(txt)+(sub?'<small>'+esc(sub)+'</small>':'')+'</span></button>';}
function listSheet(l){var L=LISTS[l],b='<p class="mut">'+cnt(l)+' of 6 ready</p>';L.items.forEach(function(it,i){b+=ckRow('ck','data-list="'+l+'" data-i="'+i+'"',!!S.checks[l][i],it[0],it[1]);});
 if(l==='night')b+='<div class="note">'+ic('flag',18)+' This counts toward your goal: '+esc(GOAL.title.toLowerCase())+'. '+goalDone()+' of 7 days.</div>';
 sheet(L.long,b);}
function taskSheet(id){var t=task(id),s=SUBJ[t.subject],d=S.steps[id]||{},done=!!S.done[id];
 var b='<div class="subbar" style="background:'+s.color+'"></div><p class="mut" style="margin-top:0">'+s.name+' \u00b7 '+s.teacher+'<br>'+(t.required?'Due ':'')+t.dueLong+' \u00b7 about '+t.minutes+' min</p><p>'+esc(t.detail)+'</p><div class="sec">Steps</div>';
 t.steps.forEach(function(st,i){b+=ckRow('step','data-id="'+id+'" data-i="'+i+'"',!!d[i],st);});
 b+='<div class="note">'+esc(t.flex)+'</div>';
 b+=done?'<div class="btns"><button class="btn gh" data-act="undone" data-id="'+id+'">Move back to to-dos</button></div>':'<div class="btns"><button class="btn gh" data-act="focusnow" data-id="'+id+'">'+ic('play',18)+'Focus '+t.minutes+' min</button><button class="btn pri" data-act="tdone" data-id="'+id+'">'+ic('check',20,3)+'Done</button></div>';
 sheet(esc(t.title),b);}
function workSheet(){var todo=TASKS.filter(function(t){return !S.done[t.id];}),dn=TASKS.filter(function(t){return S.done[t.id];});
 function r(t){var s=SUBJ[t.subject];return '<button class="qrow" style="display:flex;align-items:center;gap:12px;width:100%;min-height:60px;padding:8px 6px;border-bottom:1px solid var(--line)" data-act="task" data-id="'+t.id+'"><i style="width:10px;height:10px;border-radius:50%;background:'+s.color+';flex:none"></i><span style="flex:1"><b style="display:block">'+esc(t.title)+'</b><span class="mut" style="font-size:15px">'+s.name+' \u00b7 '+t.due+' \u00b7 '+t.minutes+' min</span></span>'+ic('right')+'</button>';}
 sheet('All my to-dos','<div class="sec">To do \u00b7 '+todo.length+'</div>'+todo.map(r).join('')+(todo.length?'':'<p class="mut">Nothing left.</p>')+'<div class="sec">Done \u00b7 '+dn.length+'</div>'+(dn.length?dn.map(r).join(''):'<p class="mut">Stuff you finish lands here.</p>')+'<div class="note">In the full app: Classes &amp; work, with grades and teacher feedback.</div>');}
function daySheet(){var b='<ul class="tl">',cur=at(T).cur,nowShown=false;
 B.forEach(function(x){if(!nowShown&&!cur&&x.s>T){b+='<li class="cur"><span class="tm">'+hm(T)+'</span><span class="nm">Now</span><span class="pill">free</span></li>';nowShown=true;}
  var cls=x===cur?'cur':(x.e<=T||S.bdone[x.id]&&x.s<=T?'past':'');b+='<li class="'+cls+'"><span class="tm">'+hm(x.s)+'\u2013'+hm(x.e)+'</span><span class="nm">'+esc(x.n)+'</span>'+(x===cur?'<span class="pill">now</span>':'')+'</li>';});
 if(!nowShown&&!cur)b+='<li class="cur"><span class="tm">'+hm(T)+'</span><span class="nm">Now</span><span class="pill">done</span></li>';
 sheet('Thursday, Oct 8',b+'</ul><div class="btns"><button class="btn gh" data-act="page" data-page="Change my plan">Change my plan</button><button class="btn gh" data-act="page" data-page="Calendar">Calendar</button></div>');}
function goalSheet(){var d='';for(var i=0;i<GOAL.target;i++)d+='<i class="'+(i<goalDone()?'on':'')+'"></i>';
 sheet('My goal','<p style="font-size:19px;font-weight:800">'+esc(GOAL.title)+'</p><div class="gdots" role="img" aria-label="'+goalDone()+' of 7 school days">'+d+'</div><p class="mut">'+goalDone()+' of '+GOAL.target+' school days</p><p>'+esc(GOAL.why)+'</p><div class="sec">Next step</div><p>'+esc(GOAL.first)+'</p><div class="sec">Reward</div><p>'+esc(GOAL.reward)+' <span class="mut">(with '+GOAL.helper+')</span></p>');}
function teaserSheet(){var Z=S.teaser,b='<p class="mut">'+TEASER.kind+' \u00b7 '+TEASER.title+'</p><p style="font-size:19px;font-weight:700">'+esc(TEASER.q)+'</p>';
 if(Z.solved)b+='<div class="fb ok">\u2713 '+TEASER.a+'. Got it.</div><p class="note">'+esc(TEASER.ex)+'</p>';
 else{b+='<label class="sec" for="ans" style="display:block">Your answer</label><input class="ans" id="ans" inputmode="numeric" autocomplete="off"><div id="fb" class="fb" aria-live="polite"></div>';
  for(var i=0;i<Z.hints;i++)b+='<p class="note">Hint '+(i+1)+': '+esc(TEASER.hints[i])+'</p>';
  b+='<div class="btns"><button class="btn pri" data-act="answer">Check</button>'+(Z.hints<2?'<button class="btn gh" data-act="hint">Hint</button>':'')+'</div>';}
 sheet('Brain teaser',b);}
function journalSheet(){var b='<p>One thing worth remembering from today.</p><textarea id="jt" aria-label="Write a moment" placeholder="Today I\u2019m glad that\u2026"></textarea><div class="btns"><button class="btn pri" data-act="jsave">Save</button></div>';
 if(S.journal.length){b+='<div class="sec">Saved on this device</div>';S.journal.slice().reverse().forEach(function(j){b+='<p class="note">'+esc(j)+'</p>';});}
 sheet('Gratitude journal',b);}
function tomorrowSheet(){var due=TASKS.filter(function(t){return t.soon;});
 var b='<p style="font-size:19px;font-weight:800">Up at '+ap(WAKE)+' \u00b7 leave by '+ap(B[2].s)+'</p><p class="mut">Same school-day plan as today (sample schedule).</p><div class="sec">Due Friday</div>';
 due.forEach(function(t){b+='<p>'+(S.done[t.id]?'\u2713 ':'\u2022 ')+esc(t.title)+(S.done[t.id]?' <span class="mut">done</span>':'')+'</p>';});
 b+='<p>\u2022 Math classroom check <span class="mut">(optional review)</span></p><div class="sec">Bag</div><p>'+(cnt('night')===6?'Packed. \u2713':'Tomorrow list: '+cnt('night')+' of 6')+'</p>';
 sheet('Friday',b);}
function menuSheet(){var tiles=[['day','list','My day','Whole schedule'],['work','check','To-dos',requiredOpen().length+' left'],['list-sheet','bag','Bag check',cnt('school')+' of 6','school'],['list-sheet','moon','Tomorrow',cnt('night')+' of 6','night'],['goal','flag','My goal',goalDone()+' of 7 days'],['teaser','puzzle','Brain teaser',S.teaser.solved?'Solved \u2713':'1 min'],['journal','journal','Journal','Write a moment'],['page','knight','Chess puzzle','850 rating','Chess puzzle'],['page','cal','Calendar','Other days','Calendar'],['page','grade','Grades','4 classes','Grades'],['page','inbox','Inbox','3 new','Inbox'],['page','user','Me','Profile & support','Profile & support']];
 var b='<div class="tiles">'+tiles.map(function(x){var extra=x[0]==='list-sheet'?' data-list="'+x[4]+'"':(x[0]==='page'?' data-page="'+esc(x[4])+'"':'');return '<button class="tile" data-act="'+x[0]+'"'+extra+'><span class="ti">'+ic(x[1],22)+'</span><span><b style="display:block">'+x[2]+'</b><span>'+x[3]+'</span></span></button>';}).join('')+'</div><button class="btn gh" style="width:100%;margin-top:16px" data-act="reset">Reset demo</button>';
 sheet('Maya R. \u00b7 Grade 8',b);}
function pageSheet(name){var map={'Change my plan':'Move something, add an activity, or shift homework time.','Calendar':'Other days, deadlines and activities.','Grades':'Math 88 \u00b7 English 91 \u00b7 Science 89 \u00b7 History 87 (sample).','Inbox':'3 messages from teachers (sample).','Chess puzzle':'A puzzle at your 850 rating. The board lives in the full app.','Profile & support':'Profile, colors and support.'};
 sheet(esc(name),'<p>'+(map[name]||'')+'</p><div class="note">This demo only builds the Today screen.</div><div class="btns"><button class="btn gh" data-act="close">Back</button></div>');}

function refreshTaskSheetIfOpen(id){if(document.body.classList.contains('open')&&$('sheet').querySelector('[data-act=step][data-id="'+id+'"]'))taskSheet(id);}

document.addEventListener('click',function(e){
 var b=e.target.closest('[data-act]');if(!b||b.disabled)return;
 if(suppress&&b.closest('.tc')){e.preventDefault();return;}
 var a=b.dataset.act,id=b.dataset.id;
 switch(a){
  case 'menu':menuSheet();break;
  case 'close':close();break;
  case 'peek':goto(+b.dataset.to);break;
  case 'goto':goto(+b.dataset.to);break;
  case 'tonow':goto(0);break;
  case 'pack':var l=b.dataset.list;S.checks[l][b.dataset.i]=true;save();renderDeck(true);renderGoal();var p=$('pack');if(p&&!RM.matches)p.classList.add('pop');
   if(cnt(l)===6)toast(l==='night'?'Packed. Goal: '+goalDone()+' of 7 days.':'Bag\u2019s packed.');break;
  case 'ck':var l2=b.dataset.list,i=b.dataset.i,on=!S.checks[l2][i];S.checks[l2][i]=on;save();b.classList.toggle('on',on);b.setAttribute('aria-checked',on);var pm=$('sheet').querySelector('.mut');if(pm)pm.textContent=cnt(l2)+' of 6 ready';renderDeck(true);if(on&&cnt(l2)===6)toast(l2==='night'?'Packed. Goal: '+goalDone()+' of 7 days.':'Bag\u2019s packed.');break;
  case 'step':S.steps[id]=S.steps[id]||{};var o2=!S.steps[id][b.dataset.i];S.steps[id][b.dataset.i]=o2;save();b.classList.toggle('on',o2);b.setAttribute('aria-checked',o2);renderTodos();renderDeck(true);break;
  case 'task':taskSheet(id);break;
  case 'tdone':close();var c=document.querySelector('.tc[data-k="0"][data-id="'+id+'"]');if(c&&!b.closest('.sheet'))fling(c,1,function(){markDone(id);});else markDone(id);break;
  case 'tlater':var c2=document.querySelector('.tc[data-k="0"][data-id="'+id+'"]');if(c2)fling(c2,-1,function(){later(id);});else later(id);break;
  case 'undone':delete S.done[id];save();render(true);taskSheet(id);break;
  case 'undo':if(undoFn){var f=undoFn;undoFn=null;f();$('toast').classList.remove('on');}break;
  case 'bdone':var cur=at(T).cur;if(cur){S.bdone[cur.id]=true;save();render();toast('Nice. '+cur.short+' done.',function(){delete S.bdone[cur.id];save();render();});}break;
  case 'fstart':startF(id);break;
  case 'fpause':pauseF();break;
  case 'focusnow':close();if(!(M.focus&&M.focus.id===id)){S.order.splice(S.order.indexOf(id),1);S.order.unshift(id);save();render(true);}if(M.focus&&M.focus.id===id)startF(id);else toast('Focus works in homework time. Timer\u2019s on the card then.');break;
  case 'peekschool':S.peekSchool=true;save();renderTodos();break;
  case 'list-sheet':listSheet(b.dataset.list);break;
  case 'work':workSheet();break;
  case 'day':daySheet();break;
  case 'goal':goalSheet();break;
  case 'teaser':teaserSheet();break;
  case 'hint':S.teaser.hints++;save();teaserSheet();break;
  case 'answer':var v=($('ans').value||'').trim();if(v===TEASER.a){S.teaser.solved=true;save();teaserSheet();render(true);toast('Solved \u2713');}else{$('fb').className='fb no';$('fb').textContent=v?'Not quite. Try again, or grab a hint.':'Type a number first.';}break;
  case 'journal':journalSheet();break;
  case 'jsave':var v2=($('jt').value||'').trim();if(!v2){toast('Write a few words first.');break;}S.journal.push(v2);save();journalSheet();toast('Saved on this device');break;
  case 'tomorrow':tomorrowSheet();break;
  case 'page':pageSheet(b.dataset.page);break;
  case 'reset':stopF();S=fresh();save();close();render();toast('Demo reset');break;
 }
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close();
 if(document.body.classList.contains('open'))return;
 if(e.target===document.body||e.target.closest('.deck')){if(e.key==='ArrowRight')goto(Math.min(Q.length,deckIndex()+1));if(e.key==='ArrowLeft')goto(Math.max(0,deckIndex()-1));}});
var st;$('deck').addEventListener('scroll',function(){clearTimeout(st);st=setTimeout(renderNav,60);},{passive:true});
window.addEventListener('resize',function(){renderNav();});

/* demo time: #t=HH:MM, hashchange, and postMessage {type:'demoTime', t:'HH:MM'} */
function setT(t){if(t==null||t===T)return;T=t;S.peekSchool=false;if(F)stopF();close();render();}
window.addEventListener('hashchange',function(){var h=/t=([0-9:]+)/.exec(location.hash||'');if(h)setT(parseT(h[1]));});
window.addEventListener('message',function(e){var d=e.data;if(d&&d.type==='demoTime'&&typeof d.t==='string')setT(parseT(d.t));});
render();
})();

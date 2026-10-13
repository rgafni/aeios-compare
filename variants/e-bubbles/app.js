(function(){
'use strict';
/* AEIOS · Today · "Bubbles". Every action is a labeled bubble; tap one and it grows (one circle, transform only)
   into a full page, the other bubbles drift aside, Back shrinks it home. Demo data = the showcase's sample day
   (same model as the other versions), due dates around Thu Oct 8 2026. No names of real people. */

/* ---------- sample data ---------- */
var SUBJ={ela:{name:'English',color:'#ff9a7a',teacher:'Mr. Okafor'},history:{name:'History',color:'#f2c46b',teacher:'Ms. Adler'},science:{name:'Science',color:'#5fe0c3',teacher:'Dr. Chen'},math:{name:'Math',color:'#b9adff',teacher:'Ms. Rivera'}};
var TASKS=[
 {id:'ela-revise',title:'Finish your argument revision',short:'Argument revision',subject:'ela',due:'Due tomorrow',soon:true,minutes:15,required:true,steps:['Read the feedback on paragraph 3.','Add one quotation that backs up your claim.','Write a sentence explaining the connection.']},
 {id:'history-sources',title:'Get your sources ready',short:'History sources',subject:'history',due:'Due tomorrow',soon:true,minutes:5,required:true,steps:['Put both Reconstruction sources in your folder.','Underline each author\u2019s main claim.']},
 {id:'science-lab',title:'Explain your lab graph',short:'Lab graph',subject:'science',due:'Due Monday',minutes:12,required:true,steps:['Look at the force-and-motion graph.','Describe one pattern using numbers from the table.','Write your explanation and one limitation.']},
 {id:'math-review',title:'Look over your equation notes',short:'Equation notes',subject:'math',due:'Optional',minutes:8,required:false,steps:['Pick an example from your class notes.','Write down any question for Ms. Rivera.']}
];
var LISTS={school:{label:'Pack your bag',items:[['Equation notes & classwork','Math notebook and English draft'],['History sources','Both sheets, in your folder'],['Pencil case & charged device',''],['Water bottle',''],['Lunch or lunch plan',''],['Basketball bag','Shoes and practice clothes']],start:{0:true,2:true}},
 night:{label:'Pack for tomorrow',items:[['Check tomorrow\u2019s classes','Look for changes and anything due'],['Pack tomorrow\u2019s school bag',''],['Set out clothes',''],['Charge your device',''],['Brush teeth',''],['Screens away, read a bit','']],start:{}}};
var B=[[405,425,'Wake up & wash'],[425,460,'Breakfast & get ready'],[465,495,'Travel to school'],[495,520,'Advisory'],[520,575,'Math','math'],[575,630,'English','ela'],[630,685,'Science','science'],[685,730,'Lunch & recess'],[730,785,'Social studies','history'],[785,850,'Studio & thinking skills'],[850,870,'Pack up'],
 [870,900,'Travel home'],[900,920,'Snack & chill'],[930,950,'Math corrections'],[960,985,'Piano practice'],[1095,1125,'Dinner'],[1150,1170,'Read a chapter'],[1230,1260,'Get ready for tomorrow'],[1260,1290,'Reading & quiet time'],[1290,1305,'Lights out']];
var WAKE=405,LEAVE=465;
var SHORT={'Wake up & wash':'Wake up','Breakfast & get ready':'Breakfast','Travel to school':'Bus','Lunch & recess':'Lunch','Social studies':'History','Studio & thinking skills':'Studio','Math corrections':'Math fixes','Piano practice':'Piano','Read a chapter':'Reading','Get ready for tomorrow':'Get ready','Reading & quiet time':'Quiet time','Snack & chill':'Snack'};
var GOAL={title:'Check tomorrow\u2019s work and pack my bag',why:'Every school night, check what\u2019s due and pack what I need.',done:4,target:7,next:'Open \u201cPack for tomorrow\u201d after dinner.',reward:'Pick the Saturday ice-cream stop'};
var TEASER={q:'I think of a number, double it, and add 9. I get 51. What was my number?',a:'21',hints:['Undo the steps in reverse order.','First take away 9, then halve it.'],ex:'51 \u2212 9 = 42, and 42 \u00f7 2 = 21.'};
var GRADES=[['math','88','Quiz 3: 9/10'],['ela','91','Argument draft: strong claim'],['science','89','New: lab check-in'],['history','87','Source notes: complete']];
var INBOX=[['math','Quiz Friday covers pages 40\u201344. Bring your equation notes.'],['science','Nice graph in lab today! Add one limitation to your write-up.'],['ela','Feedback on your library proposal is posted.']];
var CLUBS=[['bball','Basketball','Tue & Fri \u00b7 3:15 \u00b7 Gym'],['chess','Chess club','Mon \u00b7 lunch \u00b7 Room 204'],['robot','Robotics','Wed \u00b7 3:15 \u00b7 Lab'],['art','Art studio','Thu \u00b7 lunch \u00b7 Studio'],['debate','Debate','Tue \u00b7 lunch \u00b7 Library']];
var WEEK=[['Thu',8,['Classes 8:15\u20132:30','Piano 4:00']],['Fri',9,['Argument revision due','History sources due','Math classroom check','Basketball 3:15']],['Sat',10,['No school']],['Sun',11,['No school']],['Mon',12,['Lab graph due','Chess club at lunch']],['Tue',13,['Basketball 3:15','Debate at lunch']],['Wed',14,['Robotics 3:15']]];
var STARTERS=['Can I get help with\u2026','I was absent. What did I miss?','Can I have a bit more time on\u2026','Thanks for the feedback!'];

/* ---------- icons ---------- */
var ICON={hw:'M4 19.5V5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2Zm0 0A2 2 0 0 0 6 21h12M9 8h6M9 12h4',due:'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9',day:'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',bag:'M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2',cal:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',grades:'M4 20V10M10 20V4M16 20v-7M21 20H3',msg:'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z',clubs:'M16 20v-1a4 4 0 0 0-8 0v1M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM21 20v-1a3 3 0 0 0-3-3M18 5a3 3 0 0 1 0 6M3 20v-1a3 3 0 0 1 3-3M6 5a3 3 0 0 0 0 6',goal:'M5 21V4h13l-3 4.5L18 13H5',teaser:'M4 4h6a3 3 0 1 1 4 0h6v6a3 3 0 1 0 0 4v6h-6a3 3 0 1 1-4 0H4v-6a3 3 0 1 0 0-4V4Z',journal:'M12 20h9M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z',check:'M5 12.5l4.5 4.5L19 7.5',play:'M8 5.5v13l11-6.5z',pause:'M8 5v14M16 5v14',back:'M15 6l-6 6 6 6',now:'M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',sched:'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',more:'M4 7h16M4 12h16M4 17h10',chores:'M3 11l9-7 9 7v9H3zM9 20v-6h6v6'};
function ic(n,s,w){return '<svg width="'+(s||22)+'" height="'+(s||22)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2.2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+ICON[n]+'"/></svg>';}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function hm(m){m=((m%1440)+1440)%1440;var h=Math.floor(m/60)%12||12,mm=m%60;return h+':'+(mm<10?'0':'')+mm;}
function ap(m){return hm(m)+(m%1440>=720?' PM':' AM');}
var $=function(id){return document.getElementById(id);};
var RM=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};

/* ---------- demo time ---------- */
function parseT(s){var m=/(\d{1,2}):?(\d{2})/.exec(s||'');if(!m)return null;var h=+m[1],mi=+m[2];if(h>23||mi>59)return null;return h*60+mi;}
function initialT(){var h=/t=([0-9:]+)/.exec(location.hash||''),t=h&&parseT(h[1]);if(t==null){var q=new URLSearchParams(location.search).get('t');t=q&&parseT(q);}return t==null?945:t;}
var T=initialT();

/* ---------- state (this device only) ---------- */
var KEY='aeios-e-bubbles-v1';
function fresh(){return {done:{},steps:{},checks:{school:{0:true,2:true},night:{}},teaser:{solved:false,hints:0},journal:[],clubs:{bball:true},read:false,sent:[],cur:null,chores:{}};}
var S;try{S=JSON.parse(localStorage.getItem(KEY))||fresh();}catch(e){S=fresh();}
(function(){var f=fresh();for(var k in f)if(S[k]==null)S[k]=f[k];})();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function task(id){for(var i=0;i<TASKS.length;i++)if(TASKS[i].id===id)return TASKS[i];return null;}
function openTasks(){return TASKS.filter(function(t){return !S.done[t.id];});}
function requiredOpen(){return openTasks().filter(function(t){return t.required;});}
function dueTomorrow(){return TASKS.filter(function(t){return t.soon&&!S.done[t.id];});}
function curTask(){var c=S.cur&&task(S.cur);if(c&&!S.done[c.id])return c;return requiredOpen()[0]||openTasks()[0]||null;}
function listKey(){return T<870?'school':'night';}
function cnt(l){var n=0;for(var k in S.checks[l])if(S.checks[l][k])n++;return n;}
function goalDone(){return GOAL.done+(cnt('night')===6?1:0);}
function blockAt(t){for(var i=0;i<B.length;i++)if(t>=B[i][0]&&t<B[i][1])return B[i];return null;}
function nextBlock(t){for(var i=0;i<B.length;i++)if(B[i][0]>t)return B[i];return null;}

/* phase -> theme + which bubble matters most */
function phase(t){if(t<WAKE)return 'early';if(t<495)return 'before';if(t>=685&&t<730)return 'lunch';if(t<870)return 'school';if(t<930)return 'home';if(t<1095)return 'after';if(t<1230)return 'evening';if(t<1290)return 'night';return 'bed';}
var THEME={early:'night',before:'before',school:'school',lunch:'school',home:'after',after:'after',evening:'after',night:'night',bed:'night'};
var ALL=['now','day','cal','msg','more','hw','due','sched','bag','chores'];
var LEVELS={top:['now','day','cal','msg','more'],day:['hw','sched','bag','due','chores']};
var LEVEL='top';var ORDER=LEVELS.top;
var CHORES=[['Feed the dog','Morning & 6:00 PM'],['Empty the dishwasher','After school'],['Take out recycling','Thursday night'],['Practice piano 20 min','Before dinner']];
function chDone(){var n=0;for(var k in S.chores)if(S.chores[k])n++;return n;}
function nowTarget(){var p=phase(T);if((p==='home'||p==='after'||p==='evening')&&requiredOpen().length&&T>=930)return 'hw';if((p==='before'||p==='night'||p==='early')&&cnt(listKey())<6)return 'bag';return 'sched';}
var TIERS={
 early:  {day:0,bag:1,due:2,goal:2,cal:3,hw:3,msg:3,grades:3,clubs:3,teaser:3,journal:3},
 before: {bag:0,day:1,due:1,cal:2,goal:2,msg:3,hw:3,grades:3,clubs:3,teaser:3,journal:3},
 school: {day:0,due:1,msg:1,cal:2,grades:2,clubs:2,hw:3,bag:3,goal:3,teaser:3,journal:3},
 lunch:  {teaser:0,day:1,clubs:1,msg:2,due:2,grades:2,cal:3,hw:3,bag:3,goal:3,journal:3},
 home:   {hw:0,teaser:1,due:1,day:2,msg:2,clubs:2,grades:3,cal:3,goal:3,bag:3,journal:3},
 after:  {hw:0,due:1,teaser:2,day:2,msg:2,grades:2,cal:3,clubs:3,goal:3,bag:3,journal:3},
 evening:{hw:0,due:1,journal:1,bag:2,day:2,teaser:2,cal:3,msg:3,grades:3,clubs:3,goal:3},
 night:  {bag:0,day:1,journal:1,goal:2,due:2,cal:3,hw:3,msg:3,grades:3,clubs:3,teaser:3},
 bed:    {day:0,journal:1,bag:2,goal:2,due:3,cal:3,hw:3,msg:3,grades:3,clubs:3,teaser:3}
};
function tiers(){if(LEVEL==='top'){var nt=nowTarget();return {now:0,day:0,cal:1,msg:1,more:2};}
 var p=phase(T),t={};for(var k in TIERS[p])t[k]=TIERS[p][k];
 function hero(id,old){t[old]=2;t[id]=0;}
 if((p==='home'||p==='after'||p==='evening')&&!requiredOpen().length)hero(p==='evening'||S.teaser.solved?'journal':'teaser','hw');
 if(t.bag===0&&cnt(listKey())===6)hero('day','bag');
 if(p==='night'&&cnt('night')<6)t.bag=0;
 var o={hw:t.hw,due:t.due,sched:t.day,bag:t.bag,chores:2};var mn=9;for(var q in o)mn=Math.min(mn,o[q]);for(q in o)o[q]=Math.max(0,o[q]-mn);return o;}

/* ---------- bubble text (short, action-style) ---------- */
function bubbleText(id){var p=phase(T),c,n;
 switch(id){
 case 'hw':c=curTask();if(LEVEL==='day'||1){}
  if(F&&F.run)return ['Start homework',mmss(F.left)+' left'];
  if(!c)return ['Start homework','All done \u2713'];
  if(T<870)return ['Start homework','After school'];
  if(T<930)return ['Start homework','Starts at 3:30'];
  return ['Homework',c.short];
 case 'due':n=dueTomorrow().length;return ['What\u2019s due',n?n+' due tomorrow':'Nothing tomorrow \u2713'];
 case 'now':var nt=nowTarget(),y=bubbleText(nt);return ['Now: '+(nt==='hw'?'Homework':nt==='bag'?'Pack up':(blockAt(T)?(SHORT[blockAt(T)[2]]||blockAt(T)[2]):'Free time')),nt==='sched'?y[1]:y[1]];
 case 'day':var lft=requiredOpen().length;return ['My day',(lft?lft+' to-dos':'To-dos done \u2713')+' \u00b7 '+cnt(listKey())+'/6 packed'];
 case 'more':return ['Everything else','Courses, chess, grades\u2026'];
 case 'chores':return ['Responsibilities',chDone()+' of '+CHORES.length+' done'];
 case 'sched':var b=blockAt(T),nx=nextBlock(T);
  if(p==='night'||p==='bed')return ['Tomorrow','Up at '+hm(WAKE)];
  if(T<WAKE)return ['Schedule','Alarm at '+hm(WAKE)];
  if(b)return ['Schedule',(SHORT[b[2]]||b[2])+' till '+hm(b[1])];
  return ['Schedule',nx?'Free till '+hm(nx[0]):'Free time'];
 case 'bag':var l=listKey();n=cnt(l);return ['Checklist',n===6?'All packed \u2713':n+' of 6 packed'];
 case 'cal':return ['Calendar','This week \u00b7 '+dueTomorrow().length+' due Fri'];
 case 'msg':return ['Messages',S.read?'Write to a teacher':'3 new from teachers'];
 case 'grades':return ['Grades','1 new'];
 case 'clubs':n=0;for(var k in S.clubs)if(S.clubs[k])n++;return ['Clubs',n?n+' joined':'Find one'];
 case 'goal':return ['My goal',goalDone()+' of 7 days'];
 case 'teaser':return ['Brain teaser',S.teaser.solved?'Solved \u2713':'1-min puzzle'];
 case 'journal':return ['Journal',S.journal.length?S.journal.length+' saved':'Write one line'];
 }}

/* ---------- build bubbles ---------- */
var field=$('field'),EL={},GEO={},FLT=['','f2','f3'];
ALL.forEach(function(id,i){var b=document.createElement('button');b.type='button';b.className='b';b.dataset.id=id;b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','pop');
 b.innerHTML='<span class="dr"><span class="fl '+FLT[i%3]+'" style="animation-delay:-'+(i*1.37%7).toFixed(2)+'s"><span class="face c-'+id+'"><span class="now" hidden>Now</span><span class="ico">'+ic(id,22,2.2).replace(/width="22" height="22" /,'')+'</span><span class="lb"></span><span class="sb"></span></span></span></span>';
 field.appendChild(b);EL[id]=b;});

function paintBubbles(){var t=tiers();ALL.forEach(function(id){EL[id].hidden=ORDER.indexOf(id)<0;});ORDER.forEach(function(id){var b=EL[id],x=bubbleText(id);
 b.querySelector('.lb').textContent=x[0];b.querySelector('.sb').textContent=x[1];
 b.querySelector('.now').hidden=!(id==='now'||(LEVEL==='day'&&id===nowTarget()));
 b.className='b t'+t[id]+(OPEN===id||SRC===id?' src':'')+(LEVEL==='top'?' top':'');b.querySelector('.ico').innerHTML=ic(id,22,2.2).replace(/width="22" height="22" /,'');b.setAttribute('aria-label',x[0]+'. '+x[1]);});}

/* ---------- packing: greedy, center-out on an ellipse, then centered. Never overlaps, never leaves the field. ---------- */
var REL=[1,.78,.62,.6],TIER={},lastKey='';
function hdrH(){return $('hd').offsetHeight;}
function footH(){return $('foot').offsetHeight;}
var PTS={key:'',pts:null};
function grid(W,H,pad,VH){var k=W+'x'+H+'x'+VH;if(PTS.key===k)return PTS.pts;
 var step=Math.max(4,Math.round(Math.min(W,VH)/90)),cx=W/2,cy=VH/2,pts=[];
 for(var y=pad;y<=H-pad;y+=step)for(var x=pad;x<=W-pad;x+=step){var dx=(x-cx)/W,dy=(y-cy)/VH;pts.push([x,y,dx*dx+dy*dy]);}
 pts.sort(function(a,b){return a[2]-b[2];});PTS={key:k,pts:pts};return pts;}
function pack(W,H,ds,gap,pad,VH){
 var pts=grid(W,H,pad,VH||H),out=[];
 for(var i=0;i<ds.length;i++){var r=ds[i]/2,ok=false;
  for(var k=0;k<pts.length;k++){var x=pts[k][0],y=pts[k][1];
   if(x<r+pad||x>W-r-pad||y<r+pad||y>H-r-pad)continue;
   var hit=false;for(var j=0;j<out.length;j++){var q=out[j],ddx=x-q.x,ddy=y-q.y,m=r+q.r+gap;if(ddx*ddx+ddy*ddy<m*m){hit=true;break;}}
   if(!hit){out.push({x:x,y:y,r:r});ok=true;break;}}
  if(!ok)return null;}
 /* center the cluster */
 var x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;out.forEach(function(c){x0=Math.min(x0,c.x-c.r);x1=Math.max(x1,c.x+c.r);y0=Math.min(y0,c.y-c.r);y1=Math.max(y1,c.y+c.r);});
 var sx=(W-(x1+x0))/2,sy=VH?pad-y0:(H-(y1+y0))/2;out.forEach(function(c){c.x+=sx;c.y+=sy;});
 out.h=VH?Math.ceil(y1-y0+2*pad):H;return out;}
function layout(animate){
 var W=Math.min(document.documentElement.clientWidth,1100),vh=window.innerHeight,H=Math.max(300,vh-hdrH()-footH());
 if(W<120)return;
 if(LEVEL==='top'&&layoutTop(W,H,animate))return;
 var t=tiers(),ids=ORDER.slice().sort(function(a,b){return t[a]-t[b]||ORDER.indexOf(a)-ORDER.indexOf(b);});
 var key=LEVEL+W+'x'+H+'|'+ids.map(function(i){return i+t[i];}).join(',');
 if(key===lastKey&&!animate)return;lastKey=key;
 var minB=Math.min(104,W*.29),Dmax=Math.min(W*.47,Math.max(H*.36,150),250),Dmin=Math.min(140,Dmax),res=null,D,gap,pad=10,HH=H;
 for(var tries=0;!res&&tries<6;tries++){
  for(D=Dmax;D>=Dmin-0.1;D-=6){
   var ds=ids.map(function(id){return Math.round(Math.max(minB+(EL[id].querySelector('.lb').textContent.length>12||EL[id].querySelector('.sb').textContent.length>13?10:0),REL[t[id]]*D));});gap=Math.max(9,D*.06);
   res=pack(W,HH,ds,gap,pad,HH>H?H:0);if(res)break;}
  if(!res)HH=Math.round(HH*1.15);}
 HH=Math.max(H,res.h);field.style.height=HH+'px';field.style.maxWidth=W+'px';
 var old={};ORDER.forEach(function(id){old[id]=GEO[id];});
 ids.forEach(function(id,i){var c=res[i],d=c.r*2,b=EL[id];GEO[id]={x:c.x,y:c.y,d:d};
  b.style.width=b.style.height=d+'px';b.style.transform='';b.style.left=(c.x-c.r)+'px';b.style.top=(c.y-c.r)+'px';
  b.style.setProperty('--d',d+'px');b.style.setProperty('--fs',Math.max(15,Math.min(25,d*.108)).toFixed(1)+'px');
  b.style.setProperty('--fs2',Math.max(13,Math.min(16,d*.08)).toFixed(1)+'px');b.style.setProperty('--ic',Math.max(18,Math.min(34,d*.16)).toFixed(0)+'px');
  b.querySelector('.sb').hidden=d<100;
  var o=old[id];
  if(animate&&o&&!RM.matches&&!OPEN&&b.animate&&(Math.abs(o.x-c.x)>1||Math.abs(o.y-c.y)>1||Math.abs(o.d-d)>1)){
   b.animate([{transform:'translate('+(o.x-c.x)+'px,'+(o.y-c.y)+'px) scale('+(o.d/d)+')'},{transform:'none'}],{duration:700,easing:'cubic-bezier(.3,1.25,.4,1)'});}
 });}

var TOPPOS={day:[130,150,230],now:[265,345,210],cal:[95,420,150],msg:[175,560,160],more:[320,545,120]};
function layoutTop(W,H,animate){var sc=Math.min(W/390,H/650,1.5);if(sc<.62)return false;var ox=(W-390*sc)/2,oy=Math.max(0,(H-650*sc)/2);
 field.style.height=Math.max(H,650*sc)+'px';field.style.maxWidth=W+'px';lastKey='top';
 ORDER.forEach(function(id){var q=TOPPOS[id],d=q[2]*sc,x=ox+q[0]*sc,y=oy+q[1]*sc,b=EL[id];GEO[id]={x:x,y:y,d:d};
  b.style.width=b.style.height=d+'px';b.style.left=(x-d/2)+'px';b.style.top=(y-d/2)+'px';b.style.transform='';
  b.style.setProperty('--d',d+'px');b.style.setProperty('--fs',Math.max(16,Math.min(28,d*.115)).toFixed(1)+'px');
  b.style.setProperty('--fs2',Math.max(13,Math.min(17,d*.075)).toFixed(1)+'px');b.style.setProperty('--ic',Math.max(20,Math.min(38,d*.15)).toFixed(0)+'px');b.querySelector('.sb').hidden=false;});
 return true;}
/* ---------- header ---------- */
function paintHeader(){var p=phase(T),b=blockAt(T),nx=nextBlock(T);
 var hi={early:'Still sleepy?',before:'Good morning!',school:'You\u2019re at school',lunch:'Lunch break!',home:'School\u2019s out!',after:'Good afternoon',evening:'Good evening',night:'Almost bedtime',bed:'Lights out soon'}[p];
 $('hi').textContent=hi;
 var now=b?b[2]:(nx?'Free till '+hm(nx[0]):'Free time');
 $('st').innerHTML='<b>Thu, Oct 8 \u00b7 '+ap(T)+'</b><span>'+esc(now)+'</span><span class="tip">Tap a bubble to open it.</span>';
 ['before','school','after','night'].forEach(function(k){$('bg-'+k).classList.toggle('on',THEME[p]===k);});
 var tc={before:'#1f2550',school:'#0f1d40',after:'#1b1739',night:'#060a18'}[THEME[p]];var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',tc);}

/* ---------- panels (what a bubble grows into) ---------- */
function rowCk(attrs,title,sub,on,lead){return '<button type="button" class="row" role="checkbox" aria-checked="'+(!!on)+'" '+attrs+'>'+(lead||'')+'<span class="tx"><b>'+esc(title)+'</b>'+(sub?'<span>'+esc(sub)+'</span>':'')+'</span><span class="ck">'+ic('check',18,3)+'</span></button>';}
function backBtn(){return '<div class="btns" style="margin-top:22px"><button type="button" class="btn gh" data-act="close">'+ic('back',20,2.6)+'Back to bubbles</button></div>';}
var CALSEL=0,MSGTO='math';
var PANELS={
 hw:function(){var c=curTask();
  if(!c)return '<div class="card"><p style="font-size:20px;font-weight:800">All done for today \u2713</p><p class="mut">Nothing left. Go do something fun.</p></div>';
  var st=S.steps[c.id]||{},f=F&&F.id===c.id?F:null,left=f?f.left:c.minutes*60,tot=c.minutes*60;
  var h='<div class="card"><span class="pill">'+SUBJ[c.subject].name+' \u00b7 '+esc(c.due)+'</span><p style="font-size:21px;font-weight:800;margin-top:10px">'+esc(c.title)+'</p>'+
   '<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin:14px 0 10px"><span class="big" id="tmr">'+mmss(left)+'</span><span class="mut" style="font-weight:700">'+(f&&f.run?'focusing':c.minutes+'-min focus')+'</span></div>'+
   '<div class="prog"><i id="tbar" style="transform:scaleX('+(left/tot).toFixed(3)+')"></i></div>'+
   '<div class="btns" style="margin-top:14px"><button type="button" class="btn" data-act="'+(f&&f.run?'pause':'start')+'" data-id="'+c.id+'">'+ic(f&&f.run?'pause':'play',20,2.4)+(f&&f.run?'Pause':(f?'Keep going':'Start'))+'</button><button type="button" class="btn gh" data-act="tdone" data-id="'+c.id+'">'+ic('check',20,2.6)+'Done</button></div></div>';
  h+='<p class="sec">Steps</p>';c.steps.forEach(function(s,i){h+=rowCk('data-act="step" data-id="'+c.id+'" data-i="'+i+'"',s,'',st[i]);});
  var others=openTasks().filter(function(x){return x.id!==c.id;});
  if(others.length){h+='<p class="sec">Up next \u00b7 tap to switch</p>';others.forEach(function(x){h+='<button type="button" class="row" data-act="pick" data-id="'+x.id+'"><i class="dot" style="background:'+SUBJ[x.subject].color+'"></i><span class="tx"><b>'+esc(x.short)+'</b><span>'+SUBJ[x.subject].name+' \u00b7 '+esc(x.due)+' \u00b7 '+x.minutes+' min</span></span></button>';});}
  return h;},
 due:function(){var h='<p class="mut">Tap one when it\u2019s done.</p><div>';
  TASKS.forEach(function(t){h+=rowCk('data-act="toggle" data-id="'+t.id+'"',t.title,SUBJ[t.subject].name+' \u00b7 '+t.due+' \u00b7 '+t.minutes+' min',S.done[t.id],'<i class="dot" style="background:'+SUBJ[t.subject].color+'"></i>');});
  return h+'</div>';},
 chores:function(){var h='<p class="mut">Your jobs at home today. Tap when done.</p><div>';CHORES.forEach(function(c,i){h+=rowCk('data-act="chore" data-i="'+i+'"',c[0],c[1],S.chores[i]);});return h+'</div><div class="card" style="margin-top:14px"><b>Weekly goal</b><p class="mut">'+esc(GOAL.title)+' \u00b7 '+goalDone()+' of 7 days</p></div>';},
 sched:function(){var p=phase(T);
  if(p==='night'||p==='bed'){var d=dueTomorrow();return '<div class="card"><p style="font-size:21px;font-weight:800">Friday, Oct 9</p><p class="mut">Up at '+ap(WAKE)+' \u00b7 leave by '+ap(LEAVE)+'</p></div><p class="sec">Due tomorrow</p>'+
   (d.length?d.map(function(t){return '<div class="row"><i class="dot" style="background:'+SUBJ[t.subject].color+'"></i><span class="tx"><b>'+esc(t.short)+'</b><span>'+SUBJ[t.subject].name+'</span></span></div>';}).join(''):'<div class="card">Nothing. You\u2019re all set \u2713</div>')+
   '<p class="sec">Also tomorrow</p><div class="row"><span class="tx"><b>Math classroom check</b><span>Optional review</span></span></div><div class="row"><span class="tx"><b>Basketball</b><span>3:15 \u00b7 Gym</span></span></div>';}
  var h='<ul class="tl">',cur=blockAt(T),shown=false;
  B.forEach(function(x){if(!cur&&!shown&&x[0]>T){h+='<li class="cur"><span class="tm">'+hm(T)+'</span><span>Now \u00b7 free</span></li>';shown=true;}
   h+='<li class="'+(x===cur?'cur':(x[1]<=T?'past':''))+'"'+(x===cur?' aria-current="time"':'')+'><span class="tm">'+hm(x[0])+'\u2013'+hm(x[1])+'</span><span>'+esc(x[2])+(x===cur?' \u00b7 now':'')+'</span></li>';});
  return h+'</ul>';},
 bag:function(){var l=listKey(),L=LISTS[l],n=cnt(l);
  var h='<div class="card"><div style="display:flex;justify-content:space-between;font-weight:800"><span>'+(l==='school'?'Ready for school':'Ready for tomorrow')+'</span><span id="bagn">'+n+' of 6</span></div><div class="prog" style="margin-top:10px"><i id="bagbar" style="transform:scaleX('+(n/6).toFixed(3)+')"></i></div></div><div>';
  L.items.forEach(function(it,i){h+=rowCk('data-act="pack" data-l="'+l+'" data-i="'+i+'"',it[0],it[1],S.checks[l][i]);});
  return h+'</div>';},
 cal:function(){var h='<div class="days" role="group" aria-label="Pick a day">';
  WEEK.forEach(function(d,i){h+='<button type="button" data-act="calday" data-i="'+i+'" aria-pressed="'+(i===CALSEL)+'" aria-label="'+d[0]+' Oct '+d[1]+'"><span>'+d[0]+'</span>'+d[1]+(d[2][0]!=='No school'?'<i></i>':'')+'</button>';});
  var d=WEEK[CALSEL];h+='</div><p class="sec">'+(CALSEL===0?'Today \u00b7 ':'')+d[0]+', Oct '+d[1]+'</p>';
  d[2].forEach(function(x){h+='<div class="row"><span class="tx"><b>'+esc(x)+'</b></span></div>';});return h;},
 grades:function(){var h='';GRADES.forEach(function(g){var s=SUBJ[g[0]];h+='<div class="row gr"><span class="n">'+g[1]+'</span><span class="tx"><b>'+s.name+'</b><span>'+esc(g[2])+'</span></span><i class="dot" style="background:'+s.color+'"></i></div>';});
  return h+'<p class="note">Sample grades. Your real ones live in the school portal.</p>';},
 msg:function(){var h='<p class="sec" style="margin-top:0">From your teachers</p>';
  INBOX.forEach(function(m){h+='<div class="msg"><b>'+SUBJ[m[0]].teacher+' \u00b7 '+SUBJ[m[0]].name+'</b>'+esc(m[1])+'</div>';});
  S.sent.forEach(function(m){h+='<div class="msg me"><b>You \u2192 '+esc(SUBJ[m[0]]?SUBJ[m[0]].teacher:'')+'</b>'+esc(m[1])+'</div>';});
  h+='<p class="sec">Write to</p><div class="chips" role="radiogroup" aria-label="Teacher">';
  for(var k in SUBJ)h+='<button type="button" class="chip" role="radio" data-act="to" data-k="'+k+'" aria-checked="'+(k===MSGTO)+'">'+SUBJ[k].teacher+'</button>';
  h+='</div><p class="sec">Start with</p><div class="chips">';STARTERS.forEach(function(s,i){h+='<button type="button" class="chip" data-act="starter" data-i="'+i+'">'+esc(s)+'</button>';});
  return h+'</div><label class="sr" for="mt">Your message</label><textarea id="mt" maxlength="500" placeholder="Type your message\u2026"></textarea><div class="btns"><button type="button" class="btn" data-act="send">Send</button></div><p class="fb" id="mfb" aria-live="polite"></p><p class="note">Demo: messages stay on this device.</p>';},
 clubs:function(){var h='';CLUBS.forEach(function(c){var on=!!S.clubs[c[0]];h+='<div class="row"><span class="tx"><b>'+c[1]+'</b><span>'+esc(c[2])+'</span></span><button type="button" class="join" data-act="club" data-k="'+c[0]+'" aria-pressed="'+on+'" aria-label="'+(on?'Leave ':'Join ')+c[1]+'">'+(on?'Joined \u2713':'Join')+'</button></div>';});return h;},
 goal:function(){var d='';for(var i=0;i<GOAL.target;i++)d+='<i class="'+(i<goalDone()?'on':'')+'"></i>';
  return '<div class="card"><p style="font-size:21px;font-weight:800">'+esc(GOAL.title)+'</p><div class="gdots" role="img" aria-label="'+goalDone()+' of 7 school days">'+d+'</div><p class="mut">'+goalDone()+' of '+GOAL.target+' school days</p></div>'+
   '<p class="sec">Why</p><div class="card">'+esc(GOAL.why)+'</div><p class="sec">Next step</p><div class="card">'+esc(GOAL.next)+'</div><p class="sec">Reward</p><div class="card">'+esc(GOAL.reward)+'</div>';},
 teaser:function(){var Z=S.teaser,h='<div class="card"><p style="font-size:20px;font-weight:750">'+esc(TEASER.q)+'</p></div>';
  if(Z.solved)return h+'<div class="card" style="margin-top:12px"><p style="font-size:22px;font-weight:850">\u2713 '+TEASER.a+'. Nice!</p><p class="mut">'+esc(TEASER.ex)+'</p></div>';
  h+='<label class="sec" for="ans" style="display:block">Your answer</label><input class="ans" id="ans" inputmode="numeric" autocomplete="off" maxlength="6"><p class="fb" id="tfb" aria-live="polite"></p>';
  for(var i=0;i<Z.hints;i++)h+='<div class="card">Hint '+(i+1)+': '+esc(TEASER.hints[i])+'</div>';
  return h+'<div class="btns"><button type="button" class="btn" data-act="answer">Check</button>'+(Z.hints<2?'<button type="button" class="btn gh" data-act="hint">Hint</button>':'')+'</div>';},
 journal:function(){var h='<p class="mut">One thing worth remembering from today.</p><label class="sr" for="jt">Write a line</label><textarea id="jt" maxlength="280" placeholder="Today I\u2019m glad that\u2026"></textarea><div class="btns"><button type="button" class="btn" data-act="jsave">Save</button></div><p class="fb" id="jfb" aria-live="polite"></p>';
  if(S.journal.length){h+='<p class="sec">Saved on this device</p>';S.journal.slice().reverse().forEach(function(j){h+='<div class="msg">'+esc(j)+'</div>';});}
  return h;}
};

/* ---------- focus timer ---------- */
var F=null,FT=0;
function mmss(s){s=Math.max(0,Math.ceil(s));var m=Math.floor(s/60),x=s%60;return m+':'+(x<10?'0':'')+x;}
function tick(){if(!F||!F.run)return;F.left=Math.max(0,F.total-(Date.now()-F.t0)/1000);
 var e=$('tmr');if(e&&OPEN==='hw'){e.textContent=mmss(F.left);var bb=$('tbar');if(bb)bb.style.transform='scaleX('+(F.left/F.total).toFixed(3)+')';}
 var sb=EL.hw.querySelector('.sb');sb.textContent=mmss(F.left)+' left';
 if(F.left<=0){F.run=false;clearInterval(FT);if(OPEN==='hw')renderBody();paintBubbles();}}
function startF(id){var t=task(id);if(!F||F.id!==id)F={id:id,total:t.minutes*60,left:t.minutes*60};F.total=F.left;F.t0=Date.now();F.run=true;clearInterval(FT);FT=setInterval(tick,1000);}
function pauseF(){if(!F)return;tick();F.run=false;clearInterval(FT);}

/* ---------- open / close: one circle grows from the bubble (transform: scale only) ---------- */
var SRC=null,OPEN=null,busy=false,anims=[],pop=$('pop'),blob=$('blob'),panel=$('panel');
function vw(){return window.innerWidth;}function vh(){return window.innerHeight;}
function placeBlob(cx,cy){var R=Math.ceil(Math.max(Math.hypot(cx,cy),Math.hypot(vw()-cx,cy),Math.hypot(cx,vh()-cy),Math.hypot(vw()-cx,vh()-cy)))+4;
 blob.style.width=blob.style.height=2*R+'px';blob.style.left=(cx-R)+'px';blob.style.top=(cy-R)+'px';return R;}
function renderHead(){var x=bubbleText(OPEN);$('pIco').innerHTML=ic(OPEN,30,2.2);$('pTitle').textContent=x[0];$('pSub').textContent=x[1];}
function renderBody(){if(!OPEN)return;var sc=panel.scrollTop;$('pBody').innerHTML=PANELS[OPEN]()+backBtn();renderHead();panel.scrollTop=sc;}
function flipFrom(el,from,fromEl){var to=el.getBoundingClientRect();if(!to.width||!from.width)return null;
 var s=fromEl?parseFloat(getComputedStyle(fromEl).fontSize)/parseFloat(getComputedStyle(el).fontSize):from.width/to.width;
 var dx=(from.left+from.width/2)-(to.left+to.width/2),dy=(from.top+from.height/2)-(to.top+to.height/2);
 return 'translate('+dx.toFixed(1)+'px,'+dy.toFixed(1)+'px) scale('+s.toFixed(3)+')';}
function open(id,from){
 if(OPEN||busy)return;from=from||id;SRC=from;var b=EL[from],face=b.querySelector('.face'),r=face.getBoundingClientRect();
 var lbR=b.querySelector('.lb').getBoundingClientRect(),icR=b.querySelector('.ico').getBoundingClientRect(),sbE=b.querySelector('.sb'),sbR=sbE.hidden?null:sbE.getBoundingClientRect();
 OPEN=id;busy=true;S.read=S.read||id==='msg';
 if(id==='msg')save();
 var cx=r.left+r.width/2,cy=r.top+r.height/2,R=placeBlob(cx,cy);
 pop.className='pop on c-'+id;renderBody();panel.scrollTop=0;
 b.setAttribute('aria-expanded','true');document.body.classList.add('opened');
 try{if(!history.state||!history.state.bubble)history.pushState({bubble:id},'');}catch(e){}
 var done=function(){busy=false;field.inert=true;$('foot').inert=true;try{$('back').focus({preventScroll:true});}catch(e){}};
 if(RM.matches||!blob.animate){b.classList.add('src');pop.animate&&pop.animate([{opacity:0},{opacity:1}],{duration:160});done();return;}
 var k=r.width/2/R,E='cubic-bezier(.2,.9,.22,1)',D=560;
 b.classList.add('src');
 anims=[];
 anims.push(blob.animate([{transform:'scale('+k+')'},{transform:'scale(1)'}],{duration:D,easing:E}));
 /* the title, icon and subtitle fly from the bubble into the header */
 [['pTitle',lbR,b.querySelector('.lb')],['pIco',icR],['pSub',sbR,sbE]].forEach(function(p){var el=$(p[0]);if(!p[1]){el.animate([{opacity:0},{opacity:1}],{duration:300,delay:250,fill:'backwards'});return;}
  var tf=flipFrom(el,p[1],p[2]);if(tf)el.animate([{transform:tf},{transform:'none'}],{duration:D,easing:'cubic-bezier(.3,1.15,.4,1)'});});
 /* content rises in once the circle has mostly grown */
 var kids=[document.querySelector('.bar')].concat([].slice.call($('pBody').children,0,12));
 kids.forEach(function(el,i){el.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'none'}],{duration:340,delay:210+i*28,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'});});
 /* the other bubbles drift aside */
 ORDER.forEach(function(o){if(o===from)return;var g=EL[o].getBoundingClientRect(),ox=g.left+g.width/2-cx,oy=g.top+g.height/2-cy,d=Math.hypot(ox,oy)||1,push=60+9000/(d+60);
  EL[o].firstChild.animate([{transform:'none'},{transform:'translate('+(ox/d*push).toFixed(1)+'px,'+(oy/d*push).toFixed(1)+'px) scale(.82)'}],{duration:D,easing:E,fill:'forwards'});});
 setTimeout(done,D);}
function close(fromPop){
 if(!OPEN||busy)return;var id=SRC||OPEN,b=EL[id];
 if(!fromPop&&history.state&&history.state.bubble){try{history.back();return;}catch(e){}}
 busy=true;field.inert=false;$('foot').inert=false;
 var fin=function(){pop.className='pop';b.classList.remove('src');b.setAttribute('aria-expanded','false');document.body.classList.remove('opened');OPEN=null;SRC=null;busy=false;
  ORDER.forEach(function(o){EL[o].firstChild.getAnimations&&EL[o].firstChild.getAnimations().forEach(function(a){a.cancel();});});
  paintBubbles();try{b.focus({preventScroll:true});}catch(e){}};
 if(RM.matches||!blob.animate){fin();return;}
 /* measure where the bubble is now (it may have moved if the time changed while open) */
 var face=b.querySelector('.face');b.classList.remove('src');b.style.visibility='hidden';
 var r=face.getBoundingClientRect(),lbR=b.querySelector('.lb').getBoundingClientRect(),icR=b.querySelector('.ico').getBoundingClientRect();
 b.style.visibility='';b.classList.add('src');
 var cx=r.left+r.width/2,cy=r.top+r.height/2,R=placeBlob(cx,cy),k=r.width/2/R,D=440,E='cubic-bezier(.5,0,.2,1)';
 var kids=[document.querySelector('.bar'),$('pBody'),$('pSub')];
 kids.forEach(function(el){el.animate([{opacity:1},{opacity:0}],{duration:160,fill:'forwards'});});
 [['pTitle',lbR,b.querySelector('.lb')],['pIco',icR]].forEach(function(p){var el=$(p[0]),tf=flipFrom(el,p[1],p[2]);if(tf)el.animate([{transform:'none',opacity:1},{transform:tf,opacity:1,offset:.85},{transform:tf,opacity:0}],{duration:D,easing:E,fill:'forwards'});});
 var a=blob.animate([{transform:'scale(1)'},{transform:'scale('+k+')'}],{duration:D,easing:E,fill:'forwards'});
 ORDER.forEach(function(o){if(o===id)return;var an=EL[o].firstChild.getAnimations?EL[o].firstChild.getAnimations():[];an.forEach(function(x){x.updatePlaybackRate?x.updatePlaybackRate(560/D):null;x.reverse();});});
 a.onfinish=function(){[blob,$('pTitle'),$('pIco'),$('pSub'),$('pBody'),document.querySelector('.bar')].forEach(function(el){el.getAnimations&&el.getAnimations().forEach(function(x){x.cancel();});});
  fin();face.animate([{transform:'scale(1.06)'},{transform:'scale(.97)'},{transform:'none'}],{duration:380,easing:'ease-out'});};}
window.addEventListener('popstate',function(){if(OPEN)close(true);else if(LEVEL!=='top')goLevel('top');});

/* ---------- interactions ---------- */
field.addEventListener('click',function(e){var b=e.target.closest('.b');if(!b||busy||OPEN)return;var id=b.dataset.id;
 if(id==='day'){goLevel('day',id);return;}
 if(id==='more'){if(window.AEIOSDrawer)window.AEIOSDrawer.open();return;}
 if(id==='now'){open(nowTarget(),'now');return;}
 open(id);});
function goLevel(lv,fromId){if(lv===LEVEL)return;var g=GEO[fromId]||GEO.day||{x:field.clientWidth/2,y:200,d:100};var prev=ORDER.slice();
 LEVEL=lv;ORDER=LEVELS[lv];paintNav();paintBubbles();layout(false);
 if(!RM.matches&&field.animate){var c=lv==='top'?(GEO.day||g):g;ORDER.forEach(function(id,i){var q=GEO[id];if(!q)return;EL[id].animate([{transform:'translate('+(c.x-q.x)+'px,'+(c.y-q.y)+'px) scale(.25)',opacity:0},{transform:'none',opacity:1}],{duration:560,delay:i*45,easing:'cubic-bezier(.3,1.3,.45,1)',fill:'backwards'});});}
 try{if(lv!=='top')history.pushState({level:lv},'');}catch(e){}
 var f=EL[ORDER[0]];try{(lv==='top'?EL.day:$('lvback')).focus({preventScroll:true});}catch(e){}}
function paintNav(){var n=$('nav');if(!n)return;var top=LEVEL==='top';n.hidden=top;$('st').hidden=!top;$('lvt').textContent=top?'':'My day';$('lvs').textContent=top?'':'Schedule, checklist, homework, jobs';$('hi').hidden=!top;}
$('lvback').addEventListener('click',function(){if(history.state&&history.state.level){history.back();}else goLevel('top');});
$('menu').addEventListener('click',function(){if(window.AEIOSDrawer)window.AEIOSDrawer.open();});
$('back').addEventListener('click',function(){close();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(OPEN)close();else if(LEVEL!=='top'&&!document.querySelector('.adw.on'))goLevel('top');}});
$('pBody').addEventListener('click',function(e){
 var b=e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,id=b.dataset.id,on;
 switch(a){
 case 'close':close();return;
 case 'step':S.steps[id]=S.steps[id]||{};on=!S.steps[id][b.dataset.i];S.steps[id][b.dataset.i]=on;b.setAttribute('aria-checked',on);save();return;
 case 'chore':S.chores[b.dataset.i]=!S.chores[b.dataset.i];b.setAttribute('aria-checked',!!S.chores[b.dataset.i]);save();$('pSub').textContent=bubbleText('chores')[1];paintBubbles();return;
 case 'pack':var l=b.dataset.l;on=!S.checks[l][b.dataset.i];S.checks[l][b.dataset.i]=on;b.setAttribute('aria-checked',on);save();
  var n=cnt(l);$('bagn').textContent=n===6?'All packed \u2713':n+' of 6';$('bagbar').style.transform='scaleX('+(n/6).toFixed(3)+')';$('pSub').textContent=bubbleText('bag')[1];paintBubbles();return;
 case 'toggle':on=!S.done[id];if(on)S.done[id]=true;else delete S.done[id];b.setAttribute('aria-checked',on);save();$('pSub').textContent=bubbleText('due')[1];paintBubbles();return;
 case 'start':startF(id);break;
 case 'pause':pauseF();break;
 case 'tdone':if(F&&F.id===id){pauseF();F=null;}S.done[id]=true;S.cur=null;save();break;
 case 'pick':if(F&&F.run)pauseF();S.cur=id;save();break;
 case 'calday':CALSEL=+b.dataset.i;break;
 case 'to':MSGTO=b.dataset.k;[].forEach.call(document.querySelectorAll('[data-act=to]'),function(c){c.setAttribute('aria-checked',c===b);});return;
 case 'starter':var t=$('mt');t.value=STARTERS[+b.dataset.i].replace(/\u2026$/,' ');t.focus();return;
 case 'send':var v=($('mt').value||'').trim();if(!v){$('mfb').textContent='Type a few words first.';return;}S.sent.push([MSGTO,v.slice(0,500)]);save();renderBody();$('mfb').textContent='Saved as sent to '+SUBJ[MSGTO].teacher+' (demo).';return;
 case 'club':S.clubs[b.dataset.k]=!S.clubs[b.dataset.k];save();break;
 case 'hint':S.teaser.hints=Math.min(2,S.teaser.hints+1);save();break;
 case 'answer':var ans=($('ans').value||'').trim();if(ans===TEASER.a){S.teaser.solved=true;save();break;}$('tfb').textContent=ans?'Not quite. Try again, or grab a hint.':'Type a number first.';return;
 case 'jsave':var j=($('jt').value||'').trim();if(!j){$('jfb').textContent='Write a few words first.';return;}S.journal.push(j.slice(0,280));if(S.journal.length>30)S.journal.shift();save();renderBody();$('jfb').textContent='Saved on this device.';return;
 }
 renderBody();paintBubbles();});
$('pBody').addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.id==='ans'){e.preventDefault();var b=document.querySelector('[data-act=answer]');if(b)b.click();}});
$('reset').addEventListener('click',function(){if(F){pauseF();F=null;}S=fresh();save();LEVEL='top';ORDER=LEVELS.top;render(true);});

/* ---------- render + demo time ---------- */
function render(animate){paintHeader();paintNav();paintBubbles();layout(animate);if(OPEN)renderBody();}
function setT(t){if(t==null||t===T)return;T=t;render(true);}
window.addEventListener('hashchange',function(){var h=/t=([0-9:]+)/.exec(location.hash||'');if(h)setT(parseT(h[1]));});
/* the compare page posts {type:'demoTime', t:'HH:MM'}; only accept it from our own origin */
window.addEventListener('message',function(e){if(e.origin!==location.origin&&!(location.origin==='null'))return;var d=e.data;if(d&&d.type==='demoTime'&&typeof d.t==='string'&&/^\d{1,2}:\d{2}$/.test(d.t))setT(parseT(d.t));});
var rz;window.addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){layout(false);if(OPEN){var g=EL[OPEN].getBoundingClientRect();placeBlob(g.left+g.width/2,g.top+g.height/2);}},120);});
document.addEventListener('visibilitychange',function(){document.body.classList.toggle('hidden-doc',document.hidden);});
render(false);
/* first paint: bubbles pop in, staggered */
if(!RM.matches&&field.animate){ORDER.slice().sort(function(a,b){return GEO[a].y-GEO[b].y;}).forEach(function(id,i){EL[id].animate([{transform:'scale(.4)',opacity:0},{transform:'none',opacity:1}],{duration:620,delay:60+i*45,easing:'cubic-bezier(.3,1.35,.45,1)',fill:'backwards'});});}
window.__bubbles={goLevel:goLevel,get level(){return LEVEL;},get T(){return T;},setT:setT,open:open,close:close,get open_(){return OPEN;},get busy(){return busy;},geo:function(){return GEO;}};
})();

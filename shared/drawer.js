/* AEIOS shared side drawer: same panel in every variant. Sample data only; state stays on this device (localStorage). */
(function(){
'use strict';
if(window.AEIOSDrawer)return;
var base=(document.currentScript&&document.currentScript.src||'').replace(/drawer\.js.*$/,'');
var lk=document.createElement('link');lk.rel='stylesheet';lk.href=base+'drawer.css';document.head.appendChild(lk);
var KEY='aeios-drawer-v1';
function fresh(){return {lists:{school:{0:true},night:{},home:{}},journal:[],clubs:{bball:true},goal:4,teaser:{solved:false,hints:0},sent:[],lesson:{},set:{big:false,motion:true,sound:false},chess:null};}
var S;try{S=JSON.parse(localStorage.getItem(KEY))||fresh();}catch(e){S=fresh();}
(function(){var f=fresh();for(var k in f)if(S[k]==null)S[k]=f[k];})();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
var P={menu:'M4 7h16M4 12h16M4 17h16',x:'M6 6l12 12M18 6L6 18',back:'M15 6l-6 6 6 6',check:'M5 12.5l4.5 4.5L19 7.5',list:'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',chess:'M9 21h6M8 18h8l-1-6h-6zM12 3v3M10.5 4.5h3M9.5 12a2.5 3 0 1 1 5 0',course:'M3 7l9-4 9 4-9 4zM7 9v5c3 2 7 2 10 0V9',teaser:'M4 4h6a3 3 0 1 1 4 0h6v6a3 3 0 1 0 0 4v6h-6a3 3 0 1 1-4 0H4v-6a3 3 0 1 0 0-4V4Z',grades:'M4 20V10M10 20V4M16 20v-7M21 20H3',clubs:'M16 20v-1a4 4 0 0 0-8 0v1M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',journal:'M12 20h9M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z',goal:'M5 21V4h13l-3 4.5L18 13H5',cal:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',msg:'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z',set:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19 12l2-1-2-4-2 .5-1.5-1L15 4h-6l-.5 2.5-1.5 1L5 7l-2 4 2 1v0l-2 1 2 4 2-.5 1.5 1L9 20h6l.5-2.5 1.5-1 2 .5 2-4z'};
function ic(n){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+P[n]+'"/></svg>';}
var CK=ic('check');
/* sample data (same day as the other versions) */
var LISTS={school:['Pack your bag',['Math notebook & English draft','History sources in folder','Pencil case & charged device','Water bottle','Lunch or lunch plan','Basketball bag']],
 home:['After-school routine',['Snack & 15 min break','Math corrections','Piano practice (20 min)','Read a chapter','Tidy desk']],
 night:['Pack for tomorrow',['Check tomorrow\u2019s classes','Pack tomorrow\u2019s bag','Set out clothes','Charge your device','Brush teeth','Screens away, read a bit']]};
var COURSES=[
 {id:'eq',t:'Solving two-step equations',s:'Math \u00b7 3 cards',c:[['Undo in reverse','To solve 2x + 9 = 51, undo the last step first: subtract 9, then divide by 2.'],['Keep it balanced','Whatever you do to one side, do to the other. 2x + 9 \u2212 9 = 51 \u2212 9 \u2192 2x = 42.'],['Check it','Put x = 21 back in: 2\u00b721 + 9 = 51 \u2713. Always plug your answer back.']],q:['Solve 3x \u2212 4 = 11','5']},
 {id:'claim',t:'Backing up a claim',s:'English \u00b7 3 cards',c:[['Claim','A claim is what you want the reader to believe. Make it one clear sentence.'],['Evidence','Add a quotation or fact that supports it. Introduce it: \u201cAs the author notes, \u2026\u201d'],['Explain','Connect the evidence to the claim in your own words: \u201cThis shows that\u2026\u201d']],q:['What comes right after the evidence? (one word)','explain']},
 {id:'graph',t:'Reading a motion graph',s:'Science \u00b7 3 cards',c:[['Axes first','Check what each axis measures and its units before reading the line.'],['Slope = speed','On a distance\u2013time graph, a steeper line means faster motion. Flat = stopped.'],['Use numbers','Describe a pattern with data: \u201cfrom 2 s to 4 s it moved 6 m, so 3 m/s.\u201d']],q:['A flat line on a distance\u2013time graph means the object is\u2026','stopped']},
 {id:'src',t:'Primary vs. secondary sources',s:'History \u00b7 3 cards',c:[['Primary','Made at the time by someone involved: letters, photos, speeches.'],['Secondary','Made later by someone studying it: textbooks, articles.'],['Ask','Who made it, when, and why? That tells you how to use it.']],q:['A letter written in 1866 is a ___ source.','primary']}];
var TEASERS=[{q:'I think of a number, double it, and add 9. I get 51. What was my number?',a:'21',h:['Undo the steps in reverse order.','First take away 9, then halve it.']},{q:'What comes next: 2, 6, 12, 20, 30, \u2026?',a:'42',h:['Look at the gaps between numbers.','Gaps are 4, 6, 8, 10\u2026']}];
var GRADES=[['Math','88','Quiz 3: 9/10','#6a48ee'],['English','91','Argument draft: strong claim','#d0432a'],['Science','89','New: lab check-in','#0b7f6b'],['History','87','Source notes: complete','#b0561a']];
var CLUBS=[['bball','Basketball','Tue & Fri \u00b7 3:15 \u00b7 Gym'],['chess','Chess club','Mon \u00b7 lunch \u00b7 Room 204'],['robot','Robotics','Wed \u00b7 3:15 \u00b7 Lab'],['art','Art studio','Thu \u00b7 lunch \u00b7 Studio'],['debate','Debate','Tue \u00b7 lunch \u00b7 Library']];
var WEEK=[['Thu',8,['Classes 8:15\u20132:30','Math corrections 3:30','Piano 4:00']],['Fri',9,['Argument revision due','History sources due','Basketball 3:15']],['Sat',10,['No school']],['Sun',11,['No school']],['Mon',12,['Lab graph due','Chess club at lunch']],['Tue',13,['Basketball 3:15','Debate at lunch']],['Wed',14,['Robotics 3:15']]];
var TEACH={math:['Ms. Rivera','Math','Quiz Friday covers pages 40\u201344. Bring your equation notes.'],science:['Dr. Chen','Science','Nice graph in lab today! Add one limitation to your write-up.'],ela:['Mr. Okafor','English','Feedback on your library proposal is posted.'],history:['Ms. Adler','History','Bring both Reconstruction sources tomorrow.']};
var ITEMS=[['Today',[['lists','Checklists','Bag, routine, bedtime','list','#0b7f6b'],['cal','Calendar','This week','cal','#3d4fcf'],['msg','Messages','3 from teachers','msg','#0a74b0']]],
 ['Learn & play',[['courses','Crash courses','4 quick lessons','course','#2563e0'],['teaser','Brain teaser','1-min puzzle','teaser','#8e3cc8'],['chess','Chess','Play the computer','chess','#5b4a3a']]],
 ['Me',[['grades','Grades','1 new','grades','#b02f8f'],['clubs','Clubs','Join or leave','clubs','#b0561a'],['goals','Goals','Check & pack','goal','#2a7d36'],['journal','Journal','One line a day','journal','#c03850'],['settings','Settings','Text size, motion','set','#4b5563']]]];
var NAME={};ITEMS.forEach(function(g){g[1].forEach(function(i){NAME[i[0]]=i;});});
function lcount(k){var n=0;for(var i in S.lists[k])if(S.lists[k][i])n++;return n;}
function badge(id){switch(id){case 'lists':var t=0,d=0;for(var k in LISTS){t+=LISTS[k][1].length;d+=lcount(k);}return d+'/'+t;case 'msg':return S.sent.length?'':'3';case 'grades':return '1';case 'goals':return S.goal+'/7';case 'journal':return S.journal.length||'';case 'teaser':return S.teaser.solved?'\u2713':'';case 'courses':var n=0;for(var c in S.lesson)if(S.lesson[c]==='done')n++;return n+'/4';}return '';}
/* ---------- DOM ---------- */
var tab=document.createElement('button');tab.type='button';tab.className='adw-tab';tab.setAttribute('aria-label','Open menu: checklists, chess, courses and more');tab.innerHTML=ic('menu');
var sc=document.createElement('div');sc.className='adw-sc';
var dw=document.createElement('aside');dw.className='adw';dw.setAttribute('aria-label','Menu');dw.setAttribute('aria-hidden','true');dw.inert=true;
dw.innerHTML='<div class="adw-h"><button type="button" class="adw-ib" data-a="back" aria-label="Back to menu" hidden>'+ic('back')+'</button><h2 id="adwT">Everything else</h2><button type="button" class="adw-ib" data-a="close" aria-label="Close menu">'+ic('x')+'</button></div><div class="adw-b" id="adwB"></div>';
function mount(){document.body.appendChild(tab);document.body.appendChild(sc);document.body.appendChild(dw);document.body.classList.toggle('adw-big',!!S.set.big);}
if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount);
var VIEW='home',sub={};
function $b(){return dw.querySelector('#adwB');}
function render(){var h='';dw.querySelector('[data-a=back]').hidden=VIEW==='home';dw.querySelector('#adwT').textContent=VIEW==='home'?'Everything else':NAME[VIEW][1];
 h=VIEW==='home'?home():SCR[VIEW]();var b=$b(),st=b.scrollTop;b.innerHTML=h;b.scrollTop=sub.keep?st:0;sub.keep=false;}
function home(){var h='';ITEMS.forEach(function(g){h+='<p class="adw-sec">'+g[0]+'</p>';g[1].forEach(function(i){var bd=badge(i[0]);h+='<button type="button" class="adw-it" data-go="'+i[0]+'"><span class="i" style="background:'+i[4]+'">'+ic(i[3])+'</span><span class="t"><b>'+i[1]+'</b><span>'+i[2]+'</span></span>'+(bd!==''?'<span class="bd">'+bd+'</span>':'')+'</button>';});});return h+'<p class="adw-mut" style="text-align:center;margin-top:12px">Sample data only \u00b7 saved on this device</p>';}
function row(attr,t,s,on){return '<button type="button" class="adw-row" role="checkbox" aria-checked="'+!!on+'" '+attr+'><span class="adw-ck">'+CK+'</span><span class="t"><b>'+esc(t)+'</b>'+(s?'<span>'+esc(s)+'</span>':'')+'</span></button>';}
var CAL=0,TO='math',TZ=0;
var SCR={
 lists:function(){var h='';for(var k in LISTS){var L=LISTS[k],n=lcount(k),N=L[1].length;h+='<div class="adw-card"><h3>'+L[0]+'</h3><p class="adw-mut">'+(n===N?'All done \u2713':n+' of '+N+' done')+'</p><div class="adw-prog"><i style="width:'+(100*n/N)+'%"></i></div></div>';L[1].forEach(function(it,i){h+=row('data-a="ck" data-l="'+k+'" data-i="'+i+'"',it,'',S.lists[k][i]);});}return h+'<div class="adw-btns"><button type="button" class="adw-btn gh" data-a="clr">Clear all checks</button></div>';},
 cal:function(){var h='<div class="adw-days">';WEEK.forEach(function(d,i){h+='<button type="button" data-a="day" data-i="'+i+'" aria-pressed="'+(i===CAL)+'"><span>'+d[0]+'</span>'+d[1]+'</button>';});h+='</div><p class="adw-sec">'+(CAL===0?'Today \u00b7 ':'')+WEEK[CAL][0]+', Oct '+WEEK[CAL][1]+'</p>';WEEK[CAL][2].forEach(function(x){h+='<div class="adw-row"><span class="t"><b>'+esc(x)+'</b></span></div>';});return h;},
 msg:function(){var h='<p class="adw-sec">From your teachers</p>';for(var k in TEACH)if(k!=='history')h+='<div class="adw-msg"><b>'+TEACH[k][0]+' \u00b7 '+TEACH[k][1]+'</b>'+esc(TEACH[k][2])+'</div>';S.sent.forEach(function(m){h+='<div class="adw-msg me"><b>You \u2192 '+esc(TEACH[m[0]]?TEACH[m[0]][0]:'')+'</b>'+esc(m[1])+'</div>';});
  h+='<p class="adw-sec">Write to</p><div class="adw-chips">';for(k in TEACH)h+='<button type="button" class="adw-chip" data-a="to" data-k="'+k+'" aria-pressed="'+(k===TO)+'">'+TEACH[k][0]+'</button>';
  h+='</div><div class="adw-chips">';['Can I get help with ','I was absent. What did I miss?','Can I have more time on ','Thanks for the feedback!'].forEach(function(s){h+='<button type="button" class="adw-chip" data-a="st" data-s="'+esc(s)+'">'+esc(s.trim())+'</button>';});
  return h+'</div><textarea id="adwM" maxlength="500" placeholder="Type your message\u2026" aria-label="Message"></textarea><div class="adw-btns"><button type="button" class="adw-btn" data-a="send">Send</button></div><p class="adw-fb" id="adwF" aria-live="polite"></p><p class="adw-mut">Demo: messages stay on this device.</p>';},
 courses:function(){if(sub.c!=null)return lesson(COURSES[sub.c]);var h='<p class="adw-mut">Three short cards and one quick check each.</p>';COURSES.forEach(function(c,i){var st=S.lesson[c.id];h+='<button type="button" class="adw-it" data-a="crs" data-i="'+i+'"><span class="i" style="background:#2563e0">'+ic('course')+'</span><span class="t"><b>'+c.t+'</b><span>'+c.s+'</span></span>'+(st==='done'?'<span class="bd">\u2713 Done</span>':'')+'</button>';});return h;},
 teaser:function(){var Z=TEASERS[TZ],solved=S.teaser.solved&&TZ===0||sub.tsol;var h='<div class="adw-card"><h3>Puzzle '+(TZ+1)+' of '+TEASERS.length+'</h3><p style="font-size:18px;font-weight:700">'+esc(Z.q)+'</p></div>';
  if(solved)return h+'<div class="adw-card"><h3>\u2713 '+Z.a+'. Nice!</h3></div><div class="adw-btns"><button type="button" class="adw-btn" data-a="tnext">Next puzzle</button></div>';
  for(var i=0;i<(sub.th||0);i++)h+='<div class="adw-card">Hint '+(i+1)+': '+esc(Z.h[i])+'</div>';
  return h+'<input id="adwA" inputmode="numeric" maxlength="6" aria-label="Your answer" placeholder="Your answer"><div class="adw-btns"><button type="button" class="adw-btn" data-a="tchk">Check</button>'+((sub.th||0)<2?'<button type="button" class="adw-btn gh" data-a="thint">Hint</button>':'')+'</div><p class="adw-fb" id="adwF" aria-live="polite"></p>';},
 chess:function(){return chess();},
 grades:function(){var h='';GRADES.forEach(function(g){h+='<div class="adw-row"><span style="font-size:28px;font-weight:850;width:54px">'+g[1]+'</span><span class="t"><b>'+g[0]+'</b><span>'+esc(g[2])+'</span></span><i style="width:12px;height:12px;border-radius:50%;background:'+g[3]+'"></i></div>';});return h+'<p class="adw-mut">Sample grades. Real ones live in the school portal.</p>';},
 clubs:function(){var h='';CLUBS.forEach(function(c){var on=!!S.clubs[c[0]];h+='<div class="adw-row"><span class="t"><b>'+c[1]+'</b><span>'+c[2]+'</span></span><button type="button" class="adw-btn'+(on?' gh':'')+'" data-a="club" data-k="'+c[0]+'" aria-pressed="'+on+'">'+(on?'Joined \u2713':'Join')+'</button></div>';});return h;},
 goals:function(){var d='';for(var i=0;i<7;i++)d+='<i style="flex:1;height:14px;border-radius:7px;background:'+(i<S.goal?'#2a7d36':'#e3e7f2')+'"></i>';
  return '<div class="adw-card"><h3>Check tomorrow\u2019s work and pack my bag</h3><div style="display:flex;gap:6px;margin:10px 0">'+d+'</div><p class="adw-mut">'+S.goal+' of 7 school days \u00b7 reward: pick the Saturday ice-cream stop</p><div class="adw-btns"><button type="button" class="adw-btn" data-a="gup"'+(S.goal>=7?' disabled':'')+'>I did it today</button><button type="button" class="adw-btn gh" data-a="gdn">Undo</button></div></div><div class="adw-card"><h3>Why</h3><p class="adw-mut">Every school night, check what\u2019s due and pack what I need.</p></div><div class="adw-card"><h3>Next step</h3><p class="adw-mut">Open \u201cPack for tomorrow\u201d in Checklists after dinner.</p><div class="adw-btns"><button type="button" class="adw-btn gh" data-go="lists">Open checklists</button></div></div>';},
 journal:function(){var h='<p class="adw-mut">One thing worth remembering from today.</p><textarea id="adwJ" maxlength="280" placeholder="Today I\u2019m glad that\u2026" aria-label="Journal entry"></textarea><div class="adw-btns"><button type="button" class="adw-btn" data-a="jsave">Save</button></div><p class="adw-fb" id="adwF" aria-live="polite"></p>';if(S.journal.length){h+='<p class="adw-sec">Saved</p>';S.journal.slice().reverse().forEach(function(j,i){h+='<div class="adw-msg">'+esc(j)+'</div>';});}return h;},
 settings:function(){function t(k,l,s){return '<div class="adw-card adw-tog"><span><b>'+l+'</b><br><span class="adw-mut">'+s+'</span></span><button type="button" class="adw-sw" role="switch" aria-label="'+l+'" aria-checked="'+!!S.set[k]+'" data-a="set" data-k="'+k+'"></button></div>';}
  return t('big','Bigger text','Makes this menu easier to read')+t('motion','Animations','Smooth slides and grows')+t('sound','Timer sound','Chime when focus time ends')+'<div class="adw-card"><b>Signed in as</b><br><span class="adw-mut">Sample student \u00b7 Grade 7</span></div><div class="adw-btns"><button type="button" class="adw-btn gh" data-a="reset">Reset menu demo data</button></div><p class="adw-fb" id="adwF" aria-live="polite"></p>';}
};
function lesson(c){var k=sub.k||0,h='<div class="adw-card adw-lesson"><p class="adw-mut">'+c.s.split(' \u00b7 ')[0]+' \u00b7 card '+Math.min(k+1,4)+' of 4</p><div class="adw-prog"><i style="width:'+(25*(k+1))+'%;background:#2563e0"></i></div>';
 if(k<3)h+='<h3 style="margin-top:12px">'+c.c[k][0]+'</h3><p>'+esc(c.c[k][1])+'</p></div><div class="adw-btns">'+(k?'<button type="button" class="adw-btn gh" data-a="lk" data-d="-1">Previous</button>':'')+'<button type="button" class="adw-btn" data-a="lk" data-d="1">Next</button></div>';
 else h+='<h3 style="margin-top:12px">Quick check</h3><p>'+esc(c.q[0])+'</p></div>'+(S.lesson[c.id]==='done'?'<div class="adw-card"><h3>\u2713 Correct: '+esc(c.q[1])+'</h3><p class="adw-mut">Lesson complete.</p></div>':'<input id="adwA" maxlength="20" aria-label="Your answer" placeholder="Your answer"><div class="adw-btns"><button type="button" class="adw-btn gh" data-a="lk" data-d="-1">Previous</button><button type="button" class="adw-btn" data-a="lq">Check</button></div><p class="adw-fb" id="adwF" aria-live="polite"></p>');
 return h+'<div class="adw-btns"><button type="button" class="adw-btn gh" data-a="lall">All courses</button></div>';}
/* ---------- chess: full piece moves + check/checkmate, auto-queen; you are white vs a simple computer ---------- */
var START='rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNR';
var G=S.chess||{b:START,turn:'w',last:null,msg:''},SEL=null;
var GL={p:'\u265F',n:'\u265E',b:'\u265D',r:'\u265C',q:'\u265B',k:'\u265A'},VAL={p:1,n:3,b:3,r:5,q:9,k:0};
function white(c){return c>='A'&&c<='Z';}
function own(c,s){return c!=='.'&&(s==='w'?white(c):!white(c));}
function pseudo(b,s){var mv=[],D={n:[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]],b:[[1,1],[1,-1],[-1,1],[-1,-1]],r:[[1,0],[-1,0],[0,1],[0,-1]]};D.q=D.b.concat(D.r);D.k=D.q;
 for(var i=0;i<64;i++){var c=b[i];if(!own(c,s))continue;var p=c.toLowerCase(),r=i>>3,f=i&7;
  if(p==='p'){var dir=s==='w'?-1:1,r1=r+dir;if(r1>=0&&r1<8){if(b[r1*8+f]==='.'){mv.push([i,r1*8+f]);var sr=s==='w'?6:1;if(r===sr&&b[(r+2*dir)*8+f]==='.')mv.push([i,(r+2*dir)*8+f]);}
   [-1,1].forEach(function(df){var f1=f+df;if(f1>=0&&f1<8){var t=b[r1*8+f1];if(t!=='.'&&!own(t,s))mv.push([i,r1*8+f1]);}});}continue;}
  var slide=p==='b'||p==='r'||p==='q';D[p].forEach(function(d){var rr=r+d[0],ff=f+d[1];while(rr>=0&&rr<8&&ff>=0&&ff<8){var t=b[rr*8+ff];if(t==='.'){mv.push([i,rr*8+ff]);}else{if(!own(t,s))mv.push([i,rr*8+ff]);break;}if(!slide)break;rr+=d[0];ff+=d[1];}});}
 return mv;}
function apply(b,m){var a=b.split(''),c=a[m[0]];a[m[1]]=c;a[m[0]]='.';if(c==='P'&&m[1]<8)a[m[1]]='Q';if(c==='p'&&m[1]>55)a[m[1]]='q';return a.join('');}
function inCheck(b,s){var k=b.indexOf(s==='w'?'K':'k');return pseudo(b,s==='w'?'b':'w').some(function(m){return m[1]===k;});}
function legal(b,s){return pseudo(b,s).filter(function(m){return !inCheck(apply(b,m),s);});}
function status(){var L=legal(G.b,G.turn),ch=inCheck(G.b,G.turn);if(!L.length)return ch?(G.turn==='w'?'Checkmate. The computer wins.':'Checkmate! You win \ud83c\udf89'):'Stalemate. It\u2019s a draw.';return ch?(G.turn==='w'?'You\u2019re in check!':'Check!'):(G.turn==='w'?'Your move (white).':'Computer is thinking\u2026');}
function ai(){var L=legal(G.b,'b');if(!L.length)return;var best=null,bs=-1e9;L.forEach(function(m){var t=G.b[m[1]],sc=(t!=='.'?VAL[t.toLowerCase()]*10:0)+Math.random()*3;var nb=apply(G.b,m);if(inCheck(nb,'w'))sc+=4;if(!legal(nb,'w').length&&inCheck(nb,'w'))sc+=1000;
  if(pseudo(nb,'w').some(function(x){return x[1]===m[1];}))sc-=VAL[G.b[m[0]].toLowerCase()]*9;if(sc>bs){bs=sc;best=m;}});G.b=apply(G.b,best);G.last=best;G.turn='w';S.chess=G;save();}
function chess(){var L=G.turn==='w'?legal(G.b,'w'):[],tg={};if(SEL!=null)L.forEach(function(m){if(m[0]===SEL)tg[m[1]]=1;});
 var h='<div class="adw-card" style="padding:10px"><p style="font-weight:800;margin:0 0 8px" aria-live="polite">'+status()+'</p><div class="adw-board" role="grid" aria-label="Chess board">';
 for(var i=0;i<64;i++){var c=G.b[i],cl=(((i>>3)+(i&7))%2?'d':'l')+(i===SEL?' sel':'')+(tg[i]?' mv':'')+(G.last&&(G.last[0]===i||G.last[1]===i)?' lm':'');
  h+='<button type="button" class="'+cl+'" data-a="sq" data-i="'+i+'" aria-label="'+'abcdefgh'[i&7]+(8-(i>>3))+(c!=='.'?' '+(white(c)?'white ':'black ')+({p:'pawn',n:'knight',b:'bishop',r:'rook',q:'queen',k:'king'})[c.toLowerCase()]:'')+'">'+(c!=='.'?'<span class="'+(white(c)?'w':'k')+'">'+GL[c.toLowerCase()]+'</span>':'')+'</button>';}
 return h+'</div><p class="adw-mut" style="margin:8px 0 0">Tap a white piece, then a dot. Pawns promote to queens.</p></div><div class="adw-btns"><button type="button" class="adw-btn gh" data-a="cnew">New game</button></div>';}
function sq(i){if(G.turn!=='w')return;var L=legal(G.b,'w');if(SEL!=null&&L.some(function(m){return m[0]===SEL&&m[1]===i;})){G.b=apply(G.b,[SEL,i]);G.last=[SEL,i];SEL=null;G.turn='b';S.chess=G;save();sub.keep=true;render();setTimeout(function(){ai();if(VIEW==='chess'){sub.keep=true;render();}},450);return;}
 SEL=own(G.b[i],'w')&&SEL!==i?i:null;sub.keep=true;render();}
/* ---------- open/close ---------- */
var last=null;
function open(id){last=document.activeElement;VIEW=id&&SCR[id]?id:'home';sub={};render();dw.classList.add('on');sc.classList.add('on');dw.inert=false;dw.setAttribute('aria-hidden','false');document.documentElement.style.overflow='hidden';setTimeout(function(){var b=dw.querySelector('[data-a=close]');b&&b.focus({preventScroll:true});},60);}
function close(){dw.classList.remove('on');sc.classList.remove('on');dw.inert=true;dw.setAttribute('aria-hidden','true');document.documentElement.style.overflow='';try{(last||tab).focus({preventScroll:true});}catch(e){}}
tab.addEventListener('click',function(){open();});sc.addEventListener('click',close);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&dw.classList.contains('on')){e.stopPropagation();if(VIEW!=='home'){VIEW='home';render();}else close();}},true);
function fb(t){var f=dw.querySelector('#adwF');if(f)f.textContent=t;}
dw.addEventListener('click',function(e){var g=e.target.closest('[data-go]');if(g){VIEW=g.dataset.go;sub={};render();return;}
 var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a,k=b.dataset.k;
 switch(a){case 'close':close();return;case 'back':if(VIEW==='courses'&&sub.c!=null){sub={};render();return;}VIEW='home';render();return;
 case 'ck':var l=b.dataset.l,i=b.dataset.i;S.lists[l][i]=!S.lists[l][i];save();sub.keep=true;break;
 case 'clr':S.lists={school:{},night:{},home:{}};save();break;
 case 'day':CAL=+b.dataset.i;sub.keep=true;break;
 case 'to':TO=k;[].forEach.call(dw.querySelectorAll('[data-a=to]'),function(c){c.setAttribute('aria-pressed',c===b);});return;
 case 'st':var m=dw.querySelector('#adwM');m.value=b.dataset.s;m.focus();return;
 case 'send':var v=(dw.querySelector('#adwM').value||'').trim();if(!v){fb('Type a few words first.');return;}S.sent.push([TO,v.slice(0,500)]);save();sub.keep=true;render();fb('Sent to '+TEACH[TO][0]+' (demo, saved on this device).');return;
 case 'crs':sub={c:+b.dataset.i,k:0};break;
 case 'lk':sub.k=Math.max(0,Math.min(3,(sub.k||0)+ +b.dataset.d));break;
 case 'lq':var ans=(dw.querySelector('#adwA').value||'').trim().toLowerCase(),C=COURSES[sub.c];if(ans===C.q[1]){S.lesson[C.id]='done';save();break;}fb(ans?'Not quite. Tap Previous to review.':'Type an answer first.');return;
 case 'lall':sub={};break;
 case 'thint':sub.th=(sub.th||0)+1;sub.keep=true;break;
 case 'tchk':var t=(dw.querySelector('#adwA').value||'').trim();if(t===TEASERS[TZ].a){if(TZ===0){S.teaser.solved=true;save();}sub.tsol=true;break;}fb(t?'Not quite. Try again or grab a hint.':'Type a number first.');return;
 case 'tnext':TZ=(TZ+1)%TEASERS.length;sub={};break;
 case 'sq':sq(+b.dataset.i);return;
 case 'cnew':G={b:START,turn:'w',last:null};SEL=null;S.chess=G;save();break;
 case 'club':S.clubs[k]=!S.clubs[k];save();sub.keep=true;break;
 case 'gup':S.goal=Math.min(7,S.goal+1);save();break;case 'gdn':S.goal=Math.max(0,S.goal-1);save();break;
 case 'jsave':var j=(dw.querySelector('#adwJ').value||'').trim();if(!j){fb('Write a few words first.');return;}S.journal.push(j.slice(0,280));save();render();fb('Saved on this device.');return;
 case 'set':S.set[k]=!S.set[k];save();document.body.classList.toggle('adw-big',!!S.set.big);sub.keep=true;break;
 case 'reset':var keep=S.set;S=fresh();S.set=keep;G={b:START,turn:'w',last:null};save();render();fb('Menu demo data reset.');return;}
 render();});
dw.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.id==='adwA'){var b=dw.querySelector('[data-a=tchk],[data-a=lq]');b&&b.click();}});
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-dw]');if(t&&!dw.contains(t)){e.preventDefault();open(t.getAttribute('data-dw'));}});
var ROUTE={'change my plan':'cal','my calendar':'cal','calendar':'cal','my grades':'grades','grades':'grades','inbox':'msg','messages':'msg','colors':'settings','chess puzzle':'chess','chess':'chess','profile & support':'settings','me':'settings','my labs':'courses','classes & work':'courses','my rewards':'goals','my goals':'goals','gratitude journal':'journal','journal':'journal','brain teaser':'teaser','clubs':'clubs','checklists':'lists'};
function route(n){var id=ROUTE[String(n||'').toLowerCase()];if(!id)return false;open(id);return true;}
window.AEIOSDrawer={route:route,open:open,close:close,state:function(){return S;}};
})();

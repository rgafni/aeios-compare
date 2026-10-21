/* AEIOS · Today · G "Middle": Maya builds her own plan; the coach reviews and asks. Fictional sample data only. */
(function(){
'use strict';
var $=function(i){return document.getElementById(i);};
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function clk(m){var h=Math.floor(m/60),mm=m%60;return (h%12||12)+':'+(mm<10?'0':'')+mm+' '+(h>=12?'PM':'AM');}
function sh(m){var h=Math.floor(m/60),mm=m%60;return (h%12||12)+':'+(mm<10?'0':'')+mm;}
function later(fn,ms){return setTimeout(fn,RM?0:ms);}
function mark(){return '<svg viewBox="0 0 36 36" aria-hidden="true"><rect width="36" height="36" rx="10" fill="#5b5bd6"/><path d="M22.5 10v10.5a5.5 5.5 0 0 1-11 0" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/><circle cx="12.5" cy="11.5" r="2" fill="#fff" opacity=".55"/></svg>';}
['av1','av2','av3'].forEach(function(i){$(i).innerHTML=mark();});
var I={up:'M6 15l6-6 6 6',dn:'M6 9l6 6 6-6',ck:'M5 12.5l4.5 4.5L19 7.5',minus:'M6 12h12',plus:'M12 6v12M6 12h12'};
function ic(n,s){return '<svg width="'+(s||16)+'" height="'+(s||16)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+I[n]+'"/></svg>';}

/* ---------- sample data ---------- */
function planFor(ph){
 if(ph==='evening')return {start:960,b:[{id:'snack',t:'Snack',est:15,took:15,done:1},{id:'lab',t:'Lab writeup',est:40,took:45,done:1},{id:'piano',t:'Piano',est:20,took:20,done:1},{id:'math',t:'Math worksheet',est:30},{id:'read',t:'Read',est:20,took:25,done:1}]};
 return {start:945,b:[{id:'snack',t:'Snack',est:15},{id:'lab',t:'Lab writeup',est:20},{id:'piano',t:'Piano',est:20},{id:'math',t:'Math worksheet',est:30},{id:'read',t:'Read',est:20}]};}
var HEAD={morning:['Today','Bus 7:45 · <b>Lab writeup</b> due Fri'],school:['Today','School till 2:30'],
 afternoon:['This afternoon','Due Fri: <b>Lab writeup</b>, <b>Math worksheet</b>'],evening:['Tonight','Lights out 9:30']};
var EDITED={morning:'Made last night',school:'Made last night',afternoon:'Edited 3:38 PM',evening:''};
var SKILLS=[['Planning',7,''],['Estimates',4,'+1'],['On time',5,'']];
var CALL={afternoon:'Saw your plan. Anything you want to change?',evening:'Read your check-in. Want to go over tomorrow?',morning:'Morning. Need anything before the bus?',school:'Hey. What’s up?'};

/* ---------- state ---------- */
var T=945,PH='',S;
function fresh(ph){return {plan:planFor(ph),rv:{},review:true,ci:{morning:false,after:false,night:true},ref:null,reply:null,typing:false,thread:[]};}
function phaseOf(t){return t<495?'morning':t<870?'school':t<1170?'afternoon':'evening';}
function theme(p){return p==='evening'?'evening':'afternoon';}

/* ---------- render ---------- */
function render(){
 document.body.className=document.documentElement.className='ph-'+theme(PH);
 document.querySelector('meta[name=theme-color]').content=PH==='evening'?'#0c0c0e':'#f4f4f5';
 $('when').textContent='Thu, Oct 8 · '+clk(T);
 [].forEach.call($('seg').children,function(b){var on=b.dataset.p===(PH==='school'?'':PH);b.setAttribute('aria-checked',on);b.tabIndex=on||(PH==='school'&&b.dataset.p==='morning')?0:-1;});
 $('h1').textContent=HEAD[PH][0];$('hsub').innerHTML=HEAD[PH][1];
 $('pts').textContent=pts()+' pts';
 $('rwT').textContent=pts()+' / 200 pts';$('rwB').style.transform='scaleX('+Math.min(1,pts()/200)+')';
 renderReflect();renderPlan();renderSkills();renderCI();
}
function pts(){return PH==='evening'?(S.ref?160:150):130;}
function renderPlan(){
 var ev=PH==='evening',p=S.plan,t=p.start,h='',n=p.b.length;
 $('planH').textContent=ev?'Today':'My plan';
 $('planEd').textContent=EDITED[PH];
 var st=S.rv.start;
 $('startRow').innerHTML=ev?'<span class="lbl">Started '+sh(p.start)+'</span><span class="end">'+done()+' of '+n+' done</span>':
  '<span class="lbl">Start</span><span class="stp"><button type="button" data-a="st-" aria-label="Start 5 minutes earlier">'+ic('minus',14)+'</button><span>'+sh(p.start)+'</span><button type="button" data-a="st+" aria-label="Start 5 minutes later">'+ic('plus',14)+'</button></span><span class="end">Done by <b>'+sh(endT())+'</b></span>';
 var startNote='';
 if(!ev&&S.review){if(!st&&p.start<960)startNote=note('start','Last 3 days you started around 4:05.','Keep','Make it 4:05');
  else if(st)startNote='<div class="rv closed" style="margin:0;padding:6px 12px 0"><span class="mark">'+mark()+'</span><p>'+(st==='keep'?'Kept '+sh(p.start):'Moved to '+sh(p.start))+'</p></div>';}
 p.b.forEach(function(b,i){
  var sub=ev?(b.done?'Plan '+b.est+'m · took <span class="ok">'+b.took+'m</span>':b.moved?'Moved to Fri 3:45':'Plan '+b.est+'m · not started'):sh(t)+' – '+sh(t+b.est);
  h+='<li class="row'+(ev?' ev':'')+(b.done?' done':'')+(b.flash?' flash':'')+'" data-i="'+i+'">'+
   (ev?'':'<span class="mv"><button type="button" data-a="up" aria-label="Move '+esc(b.t)+' up"'+(i===0?' disabled':'')+'>'+ic('up',14)+'</button><button type="button" data-a="dn" aria-label="Move '+esc(b.t)+' down"'+(i===n-1?' disabled':'')+'>'+ic('dn',14)+'</button></span>')+
   '<span class="rt"><b>'+esc(b.t)+'</b><span>'+sub+'</span></span>'+
   (ev?'':'<span class="stp"><button type="button" data-a="e-" aria-label="Less time for '+esc(b.t)+'">'+ic('minus',14)+'</button><span>'+b.est+'m</span><button type="button" data-a="e+" aria-label="More time for '+esc(b.t)+'">'+ic('plus',14)+'</button></span>')+
   '<button type="button" class="ck" data-a="ck" aria-pressed="'+!!b.done+'" aria-label="'+esc(b.t)+(b.done?', done':', mark done')+'">'+ic('ck')+'</button>';
  if(!ev&&S.review&&b.id==='lab'){var r=S.rv.lab;
   if(!r&&b.est<35)h+=note('lab','You put '+b.est+' min. Last two took ~40.','Keep','Adjust');
   else if(r)h+='<div class="rv closed"><span class="mark">'+mark()+'</span><p>'+(r==='keep'?'Kept '+b.est+' min':'Changed to '+b.est+' min')+'</p></div>';}
  h+='</li>';b.flash=false;t+=b.est;});
 $('rows').innerHTML=h;
 var old=document.getElementById('stNote');if(old)old.remove();
 if(startNote){$('startRow').insertAdjacentHTML('afterend','<div id="stNote" style="padding:0 12px 10px;border-bottom:1px solid var(--line)">'+startNote+'</div>');}
 $('addF').hidden=ev;$('rvSw').parentNode.hidden=ev;
 $('rvSw').setAttribute('aria-checked',S.review);$('rvSub').textContent=S.review?'Estimates and start time':'Off';
}
function note(k,txt,a,b){return '<div class="rv"><span class="mark">'+mark()+'</span><div style="flex:1"><p>'+esc(txt)+'</p><div class="acts"><button type="button" class="btn sm" data-rv="'+k+'" data-v="keep">'+a+'</button><button type="button" class="btn sm pri" data-rv="'+k+'" data-v="adj">'+b+'</button></div></div></div>';}
function endT(){var t=S.plan.start;S.plan.b.forEach(function(b){t+=b.est;});return t;}
function done(){return S.plan.b.filter(function(b){return b.done;}).length;}
function renderSkills(){var h='';SKILLS.forEach(function(s){var seg='';for(var i=0;i<10;i++)seg+='<i class="'+(i<s[1]?'on':'')+'"></i>';
 h+='<div><b>'+s[0]+'</b><span class="lv">'+s[1]+'<small>'+s[2]+'</small></span><span class="seg10" role="img" aria-label="'+s[0]+' level '+s[1]+' of 10">'+seg+'</span></div>';});$('skills').innerHTML=h;}
function renderCI(){var c=S.ci,rows=[['morning','Morning','7:00'],['after','After school','3:40'],['night','Night','8:30']],h='';
 rows.forEach(function(r){h+='<div class="r'+(c[r[0]]?'':' off')+'"><b>'+r[1]+'</b><span>'+r[2]+'</span><button type="button" class="sw" role="switch" data-ci="'+r[0]+'" aria-checked="'+c[r[0]]+'" aria-label="'+r[1]+' check-in"></button></div>';});
 $('checkins').innerHTML=h;var on=rows.filter(function(r){return c[r[0]];});
 $('ciTag').textContent=!on.length?'Off':on.length===1?on[0][1]+' only':on.length===3?'All on':on.map(function(r){return r[1];}).join(' + ');}
function renderReflect(){var ev=PH==='evening';$('reflect').hidden=!ev;if(!ev)return;var h='';
 if(!S.ref){h='<div class="card rf"><label class="sr" for="rfIn">Your check-in</label><textarea id="rfIn" maxlength="400" placeholder="What got done? Anything for tomorrow?"></textarea><div class="bt"><span id="rfN">0 / 400</span><button type="button" class="btn pri sm" id="rfSave" disabled>Save</button></div></div>';}
 else{h='<div class="card mine"><small>You · 8:31 PM</small>'+esc(S.ref)+'</div>';
  if(S.typing)h+='<div class="card reply"><span class="mark">'+mark()+'</span><div class="typing" style="border:0;padding:6px 0"><i></i><i></i><i></i></div></div>';
  else if(S.reply!==undefined&&S.reply!==null){var m=S.plan.b.filter(function(b){return b.id==='math';})[0],lab=S.plan.b.filter(function(b){return b.id==='lab';})[0];
   h+='<div class="card reply enter"><span class="mark">'+mark()+'</span><div><p>Lab took '+lab.took+' min, planned '+lab.est+'. Close. '+(m&&!m.done?'Worksheet: Fri 3:45?':'Nice.')+'</p>'+
    (m&&!m.done&&!S.reply?'<div class="acts"><button type="button" class="btn sm pri" data-ref="move">Move it</button><button type="button" class="btn sm" data-ref="tonight">I’ll do it now</button></div>':'')+
    (S.reply==='move'?'<p style="margin-top:6px;font-size:12.5px;color:var(--muted)">Moved to Fri 3:45</p>':S.reply==='tonight'?'<p style="margin-top:6px;font-size:12.5px;color:var(--muted)">Ok. 30 min.</p>':'')+'</div></div>';}}
 $('rfBox').innerHTML=h;}

/* ---------- interactions ---------- */
$('rfBox').addEventListener('input',function(e){if(e.target.id!=='rfIn')return;var v=e.target.value;$('rfN').textContent=v.length+' / 400';$('rfSave').disabled=!v.trim();});
$('rfBox').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
 if(b.id==='rfSave'){var v=$('rfIn').value.trim();if(!v)return;S.ref=v;S.typing=true;S.reply=null;render();toast('+10 pts');
  later(function(){S.typing=false;S.reply='';renderReflect();},1000);return;}
 if(b.dataset.ref){S.reply=b.dataset.ref;if(S.reply==='move')S.plan.b.forEach(function(x){if(x.id==='math')x.moved=true;});render();}});
$('planSec').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var p=S.plan,a=b.dataset.a;
 if(b.dataset.rv){var k=b.dataset.rv,v=b.dataset.v;S.rv[k]=v;if(v==='adj'){if(k==='lab')p.b.forEach(function(x){if(x.id==='lab'){x.est=40;x.flash=true;}});if(k==='start')p.start=965;}render();return;}
 if(b.id==='rvSw'){S.review=!S.review;render();return;}
 if(a==='st-'||a==='st+'){p.start=Math.max(900,Math.min(1080,p.start+(a==='st+'?5:-5)));render();return;}
 var li=b.closest('.row');if(!li)return;var i=+li.dataset.i,x=p.b[i];
 if(a==='up'&&i>0){p.b.splice(i,1);p.b.splice(i-1,0,x);x.flash=true;render();focusRow(i-1,'up');}
 else if(a==='dn'&&i<p.b.length-1){p.b.splice(i,1);p.b.splice(i+1,0,x);x.flash=true;render();focusRow(i+1,'dn');}
 else if(a==='e-'||a==='e+'){x.est=Math.max(5,Math.min(120,x.est+(a==='e+'?5:-5)));render();focusRow(i,a);}
 else if(a==='ck'){x.done=!x.done;if(x.done&&!x.took)x.took=x.est;render();focusRow(i,'ck');}});
function focusRow(i,a){var r=$('rows').children[i];if(!r)return;var b=r.querySelector('[data-a="'+a+'"]');if(b&&!b.disabled)b.focus({preventScroll:true});}
$('addF').addEventListener('submit',function(e){e.preventDefault();var t=($('addT').value||'').trim();if(!t)return;
 S.plan.b.push({id:'u'+Date.now(),t:t.slice(0,40),est:+$('addM').value,flash:true});$('addT').value='';render();});
$('checkins').addEventListener('click',function(e){var b=e.target.closest('[data-ci]');if(!b)return;S.ci[b.dataset.ci]=!S.ci[b.dataset.ci];renderCI();
 var nb=$('checkins').querySelector('[data-ci="'+b.dataset.ci+'"]');nb&&nb.focus({preventScroll:true});});
var tt;function toast(s){var e=$('toast');e.textContent=s;e.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){e.classList.remove('on');},2000);}

/* ---------- sheets (Talk / Text are secondary here) ---------- */
var openSheet=null,lastFocus=null,call=null;
function show(el){lastFocus=document.activeElement;openSheet=el;$('scrim').hidden=false;el.hidden=false;document.querySelector('main').inert=true;
 requestAnimationFrame(function(){requestAnimationFrame(function(){$('scrim').classList.add('on');el.classList.add('on');});});}
function hide(){var el=openSheet;if(!el)return;openSheet=null;$('scrim').classList.remove('on');el.classList.remove('on');document.querySelector('main').inert=false;
 later(function(){el.hidden=true;$('scrim').hidden=true;},280);if(lastFocus&&lastFocus.focus)lastFocus.focus({preventScroll:true});}
function endCall(){if(call){clearInterval(call.iv);call.to.forEach(clearTimeout);call=null;}hide();}
$('scrim').addEventListener('click',function(){openSheet===$('callS')?endCall():hide();});
document.addEventListener('keydown',function(e){if(!openSheet)return;if(e.key==='Escape'){e.preventDefault();openSheet===$('callS')?endCall():hide();}
 if(e.key==='Tab'){var f=[].filter.call(openSheet.querySelectorAll('button,input'),function(x){return x.offsetParent!==null;});if(!f.length)return;var a=f[0],z=f[f.length-1];
  if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}}});
$('bCall').addEventListener('click',function(){call={s:0,to:[]};$('caps').innerHTML='';$('callSt').textContent='Calling…';show($('callS'));later(function(){$('endCall').focus();},60);
 call.to.push(later(function(){if(!call)return;call.iv=setInterval(function(){if(call){$('callSt').textContent='0:'+(call.s<10?'0':'')+call.s;call.s++;}},1000);
  call.to.push(later(function(){if(!call)return;var d=document.createElement('div');d.className='cap';d.innerHTML='<b>Coach</b>'+esc(CALL[PH]);$('caps').appendChild(d);},700));},1200));});
$('endCall').addEventListener('click',endCall);
function syncText(){var h='<span class="tm">Today</span>';S.thread.forEach(function(m){h+='<div class="bub'+(m.me?' me':'')+'">'+esc(m.text)+'</div>';});$('tth').innerHTML=h;$('tth').scrollTop=1e5;}
$('bText').addEventListener('click',function(){show($('textS'));syncText();later(function(){$('tinput').focus({preventScroll:true});},300);});
$('closeText').addEventListener('click',hide);
$('tform').addEventListener('submit',function(e){e.preventDefault();var v=($('tinput').value||'').trim();if(!v)return;$('tinput').value='';S.thread.push({me:1,text:v.slice(0,300)});syncText();
 later(function(){S.thread.push({text:'Got it.'});syncText();},800);});
$('menu').addEventListener('click',function(){if(window.AEIOSDrawer)window.AEIOSDrawer.open();});

/* ---------- time ---------- */
function setT(t,force){t=Math.max(360,Math.min(1350,t|0));var ph=phaseOf(t);T=t;if(ph!==PH||force){PH=ph;S=fresh(ph);}render();}
function parseT(s){var m=/^(\d{1,2}):?(\d{2})$/.exec(s||'');return m?(+m[1])*60+(+m[2]):null;}
function initialT(){var h=/t=([0-9:]+)/.exec(location.hash||''),t=h&&parseT(h[1]);if(t==null){var q=new URLSearchParams(location.search).get('t');t=q&&parseT(q);}return t==null?945:t;}
window.addEventListener('hashchange',function(){var h=/t=([0-9:]+)/.exec(location.hash||''),t=h&&parseT(h[1]);if(t!=null)setT(t);});
window.addEventListener('message',function(e){if(e.origin!==location.origin&&location.origin!=='null')return;var d=e.data;if(d&&d.type==='demoTime'&&typeof d.t==='string'){var t=parseT(d.t);if(t!=null)setT(t);}});
var inFrame=false;try{inFrame=window.self!==window.top;}catch(x){inFrame=true;}
$('pv').hidden=inFrame;
var PV={morning:435,afternoon:945,evening:1230};
$('seg').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var t=PV[b.dataset.p];setT(t,true);try{history.replaceState(null,'','#t='+Math.floor(t/60)+':'+(t%60<10?'0':'')+t%60);}catch(x){}});
$('seg').addEventListener('keydown',function(e){var k=e.key,o=['morning','afternoon','evening'],i=Math.max(0,o.indexOf(PH));if(k!=='ArrowRight'&&k!=='ArrowLeft')return;e.preventDefault();i=(i+(k==='ArrowRight'?1:2))%3;$('seg').children[i].click();$('seg').children[i].focus();});
setT(initialT(),true);
})();

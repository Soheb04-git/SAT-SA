const ENTITIES=[["CSE-01",1320,0,0,0,0],["CSE-02",1580,5,0,1,1],["CSE-03",1410,0,3,0,1],["CSE-04",1250,0,0,0,0],["CSE-05",1690,0,0,2,0],["CSE-06",1380,0,0,0,0],["CSE-07",2140,23,1,3,1],["CSE-08",1470,0,0,0,0],["CSE-09",1560,0,1,4,0],["CSE-10",1330,0,0,0,0],["CSE-11",1820,3,0,2,1],["CSE-12",1470,0,0,0,0]];
const RECORDS=[
 {id:"ALT-70412",ts:"2026-08-14 02:41",en:"CSE-07",sev:"CRITICAL",as:"ASSET-017",inv:133,esc:"No",disp:"Closed",pat:"Generic note",f:"Potential Execution Gap",r:"Critical alert closed in 02:13 without escalation; note matches template used in 11 other cases.",m:"Duration 02:13 vs peer median 38:00 (critical)"},
 {id:"ALT-70455",ts:"2026-08-15 11:07",en:"CSE-07",sev:"CRITICAL",as:"ASSET-021",inv:171,esc:"No",disp:"Closed",pat:"Generic note",f:"Potential Execution Gap",r:"Closure time below 5-minute review threshold for critical severity.",m:"Duration 02:51 · threshold 05:00"},
 {id:"ALT-70518",ts:"2026-08-19 23:15",en:"CSE-07",sev:"CRITICAL",as:"ASSET-017",inv:240,esc:"No",disp:"False Positive",pat:"Generic note",f:"Escalation Gap",r:"Critical alert marked false positive with no escalation or supporting evidence.",m:"Escalation expected: Yes · recorded: No"},
 {id:"ALT-70602",ts:"2026-08-22 09:30",en:"CSE-07",sev:"HIGH",as:"ASSET-009",inv:1920,esc:"Yes",disp:"Resolved",pat:"Detailed",f:"No signal",r:"Record consistent with expected investigation and escalation process.",m:"Duration 32:00 · within peer range"},
 {id:"ALT-31207",ts:"2026-08-11 14:02",en:"CSE-03",sev:"CRITICAL",as:"ASSET-031",inv:2710,esc:"Yes",disp:"Resolved",pat:"Detailed",f:"No signal",r:"Record consistent with expected process.",m:"Duration 45:10 · within peer range"},
 {id:"ALT-31288",ts:"2026-08-09 04:55",en:"CSE-03",sev:"LOW",as:"ASSET-042",inv:410,esc:"No",disp:"Closed",pat:"Detailed",f:"Negative Space (context)",r:"Last alert recorded for ASSET-042 before telemetry dropped to near zero.",m:"ASSET-042 events W32 to W37: 14 vs expected 2,900 to 4,100"},
 {id:"ALT-11843",ts:"2026-08-27 16:20",en:"CSE-11",sev:"HIGH",as:"ASSET-064",inv:600,esc:"No",disp:"Closed",pat:"Repetitive",f:"Investigation Pattern",r:"Investigation note is near-identical to 37 other sampled notes.",m:"Text similarity 0.96 · sample 38/60"},
 {id:"ALT-11861",ts:"2026-08-28 10:48",en:"CSE-11",sev:"MEDIUM",as:"ASSET-066",inv:540,esc:"No",disp:"Closed",pat:"Repetitive",f:"Investigation Pattern",r:"Repeated note text across unrelated assets.",m:"Text similarity 0.94"},
 {id:"ALT-20514",ts:"2026-08-18 13:12",en:"CSE-02",sev:"CRITICAL",as:"ASSET-011",inv:1560,esc:"No",disp:"Resolved",pat:"Detailed",f:"Peer Deviation",r:"Entity escalation rate for critical alerts is below the peer range.",m:"Escalation rate 18% vs peer IQR 41% to 63%"},
 {id:"ALT-90377",ts:"2026-08-30 08:05",en:"CSE-09",sev:"MEDIUM",as:"ASSET-088",inv:1210,esc:"No",disp:"Resolved",pat:"Detailed",f:"Anomaly",r:"Weekly alert volume dropped 61% against entity baseline in W35.",m:"z-score -3.1 on weekly volume"},
 {id:"ALT-50133",ts:"2026-08-12 19:44",en:"CSE-05",sev:"HIGH",as:"ASSET-052",inv:2280,esc:"Yes",disp:"Resolved",pat:"Detailed",f:"No signal",r:"Record consistent with expected process.",m:"Duration 38:00 · within peer range"},
 {id:"ALT-12090",ts:"2026-08-24 07:26",en:"CSE-12",sev:"LOW",as:"ASSET-101",inv:780,esc:"No",disp:"Closed",pat:"Detailed",f:"No signal",r:"Record consistent with expected process.",m:"Duration 13:00 · within peer range"}
];
const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');

/* Views */
const views=["import","analysis","overview","entities","findings","queue","evidence","methodology"];
function show(v){
 document.getElementById('view-intro').classList.add('hidden');
 document.getElementById('app').classList.remove('hidden');
 views.forEach(x=>{const el=document.getElementById('view-'+x);el.classList.toggle('hidden',x!==v);});
 const el=document.getElementById('view-'+v);el.classList.remove('view');void el.offsetWidth;el.classList.add('view');
 document.querySelectorAll('.nav-btn').forEach(b=>b.dataset.view===v?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current'));
 window.scrollTo(0,0);
}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.view)));
document.getElementById('btn-start').onclick=()=>show('import');
document.getElementById('btn-intro-method').onclick=()=>show('methodology');
const returnHome=()=>{document.getElementById('app').classList.add('hidden');document.getElementById('view-intro').classList.remove('hidden');window.scrollTo(0,0);};
document.getElementById('btn-home').onclick=returnHome;
document.getElementById('btn-header-home').onclick=returnHome;
document.querySelectorAll('.go-queue').forEach(b=>b.onclick=()=>show('queue'));
document.querySelectorAll('.go-evidence').forEach(b=>b.onclick=()=>{show('evidence');document.getElementById('ev-search').value='CSE-07';renderEvidence();});

/* Import */
const setVal=(r,e,d,f,s,ok)=>{val_records.textContent=r;val_entities.textContent=e;val_range.textContent=d;val_fields.textContent=f;val_status.textContent=s;val_status.style.color=ok?'#3fb67b':'#e2a13b';};
const val_records=document.getElementById('val-records'),val_entities=document.getElementById('val-entities'),val_range=document.getElementById('val-range'),val_fields=document.getElementById('val-fields'),val_status=document.getElementById('val-status');
const runBtn=document.getElementById('btn-run'),msg=document.getElementById('import-msg');
document.getElementById('btn-load-demo').onclick=()=>{setVal('18,420','12','2026-07-01 to 2026-09-15','8 / 8 present','Passed',true);runBtn.disabled=false;msg.textContent='Synthetic Demo Dataset loaded locally.';};
const REQ=["alert_id","timestamp","entity","severity","asset","investigation_time","escalated","disposition"];
document.getElementById('file-input').addEventListener('change',e=>{
 const file=e.target.files[0];if(!file)return;
 const rd=new FileReader();
 rd.onload=()=>{
  let rows=[],keys=[];
  try{
   if(file.name.toLowerCase().endsWith('.json')){const j=JSON.parse(rd.result);rows=Array.isArray(j)?j:(j.records||[]);keys=rows[0]?Object.keys(rows[0]):[];}
   else{const lines=rd.result.split(/\r?\n/).filter(l=>l.trim());keys=(lines[0]||'').split(',').map(k=>k.trim().toLowerCase());rows=lines.slice(1).map(l=>{const v=l.split(',');const o={};keys.forEach((k,i)=>o[k]=v[i]);return o;});}
  }catch(err){setVal('-','-','-','-','Could not parse file',false);runBtn.disabled=true;return;}
  const present=REQ.filter(k=>keys.includes(k));
  const ents=new Set(rows.map(r=>r.entity).filter(Boolean));
  const ts=rows.map(r=>r.timestamp).filter(Boolean).sort();
  const ok=present.length===REQ.length&&rows.length>0;
  setVal(rows.length.toLocaleString('en-IN'),ents.size||'-',ts.length?ts[0].slice(0,10)+' to '+ts[ts.length-1].slice(0,10):'-',present.length+' / 8 present',ok?'Passed':'Missing fields',ok);
  runBtn.disabled=true;
  msg.textContent=(ok?'File validated locally. ':'Required fields missing. ')+'This prototype runs analytics on the Synthetic Demo Dataset only. Load it to continue.';
 };
 rd.readAsText(file);
});

/* Analysis */
const STAGE_MSG=["18,420 records · 0 rejected","12 entities · schema v1","31 execution gaps","5 negative space signals","12 anomalies","4 peer deviations","Evidence links mapped","6 priority review items"];
runBtn.onclick=()=>{
 show('analysis');runBtn.disabled=true;
 const stages=[...document.querySelectorAll('.stage')],prog=document.getElementById('an-progress'),st=document.getElementById('an-status'),open=document.getElementById('btn-open-overview');
 open.disabled=true;
 stages.forEach(s=>{s.className='stage panel-2 px-4 py-3 flex items-center gap-3';s.querySelector('.stage-icon').innerHTML='';s.querySelector('.st-msg').textContent='';});
 let i=0;
 const step=()=>{
  if(i>0){const p=stages[i-1];p.classList.remove('run');p.classList.add('done');p.querySelector('.stage-icon').innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>';p.querySelector('.st-msg').textContent=STAGE_MSG[i-1];}
  prog.style.width=(i/stages.length*100)+'%';
  if(i===stages.length){st.textContent='Complete · local processing · no external connections';open.disabled=false;runBtn.disabled=false;open.focus();return;}
  const c=stages[i];c.classList.add('run');c.querySelector('.stage-icon').innerHTML='<svg class="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.2-8.6"/></svg>';
  st.textContent='Running stage '+(i+1)+' of '+stages.length;
  i++;setTimeout(step,550);
 };
 step();
};
document.getElementById('btn-open-overview').onclick=()=>show('overview');

/* Overview chart + entity table */
(function(){
 const chart=document.getElementById('sig-chart'),max=28,cols=['#e5534b','#e2a13b','#3b8eea','#8b94a3'];
 ENTITIES.forEach(e=>{
  const tot=e[2]+e[3]+e[4]+e[5];
  const row=document.createElement('div');row.className='grid items-center gap-3';row.style.gridTemplateColumns='60px 1fr 28px';
  let bars='';[2,3,4,5].forEach((k,j)=>{if(e[k])bars+=`<div style="width:${e[k]/max*100}%;background:${cols[j]}"></div>`;});
  row.innerHTML=`<span class="mono text-xs" style="color:#aab3c0">${e[0]}</span><div class="bar-track flex overflow-hidden">${bars}</div><span class="mono text-xs text-right">${tot}</span>`;
  chart.appendChild(row);
  const tr=document.createElement('tr');
  const state=tot>=10?'<span class="sev sev-HIGH">Review</span>':tot>0?'<span class="sev sev-MEDIUM">Monitor</span>':'<span class="sev sev-OK">No signal</span>';
  tr.innerHTML=`<td class="mono">${e[0]}</td><td class="mono">${e[1].toLocaleString('en-IN')}</td><td class="mono">${e[2]}</td><td class="mono">${e[3]}</td><td class="mono">${e[4]}</td><td class="mono">${e[5]}</td><td>${state}</td>`;
  if(e[0]==='CSE-07')tr.classList.add('selected');
  document.getElementById('entity-body').appendChild(tr);
 });
})();

/* Findings tabs */
document.querySelectorAll('.sub-btn').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('.sub-btn').forEach(x=>x.setAttribute('aria-selected',String(x===b)));
 document.querySelectorAll('.sub-panel').forEach(p=>p.classList.toggle('hidden',p.id!=='sub-'+b.dataset.sub));
}));

/* Queue */
function updateQueue(){
 const f=document.getElementById('q-filter').value,counts={};
 document.querySelectorAll('.q-row').forEach(r=>{const s=r.querySelector('.q-status').value;counts[s]=(counts[s]||0)+1;r.classList.toggle('hidden',f!=='all'&&s!==f);});
 ["Pending Review","Under Review","Need More Evidence","Reviewed"].forEach(s=>document.getElementById('qc-'+s).textContent=counts[s]||0);
}
document.querySelectorAll('.q-status').forEach(s=>s.addEventListener('change',updateQueue));
document.getElementById('q-filter').addEventListener('change',updateQueue);
updateQueue();

/* Evidence */
let sortDir=0,selId=null;
const evBody=document.getElementById('ev-body'),rowMap=new Map();
RECORDS.forEach(r=>{
 const tr=document.createElement('tr');tr.tabIndex=0;tr.className='cursor-pointer';tr.setAttribute('aria-selected','false');
 const flag=r.f!=='No signal';
 tr.innerHTML=`<td class="mono">${r.id}</td><td class="mono" style="color:#aab3c0">${r.ts}</td><td class="mono">${r.en}</td><td><span class="sev sev-${r.sev}">${r.sev}</span></td><td class="mono">${r.as}</td><td class="mono" style="color:${r.sev==='CRITICAL'&&r.inv<300?'#f08a84':'inherit'}">${fmt(r.inv)}</td><td>${r.esc==='Yes'?'<span style="color:#3fb67b">Yes</span>':'<span style="color:#8b94a3">No</span>'}</td><td>${r.disp}</td><td>${r.pat==='Repetitive'||r.pat==='Generic note'?'<span class="sev sev-MEDIUM">'+r.pat+'</span>':'<span class="sev sev-OK">'+r.pat+'</span>'}${flag?'':''}</td>`;
 const pick=()=>selectRecord(r.id);
 tr.addEventListener('click',pick);tr.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick();}});
 rowMap.set(r.id,tr);
});
function renderEvidence(){
 const q=document.getElementById('ev-search').value.trim().toLowerCase(),sv=document.getElementById('ev-sev').value;
 let list=RECORDS.filter(r=>(sv==='all'||r.sev===sv)&&(!q||[r.id,r.en,r.as].join(' ').toLowerCase().includes(q)));
 if(sortDir)list=[...list].sort((a,b)=>(a.inv-b.inv)*sortDir);
 list.forEach(r=>evBody.appendChild(rowMap.get(r.id)));
 rowMap.forEach((tr,id)=>tr.classList.toggle('hidden',!list.find(r=>r.id===id)));
 document.getElementById('ev-empty').classList.toggle('hidden',list.length>0);
}
function selectRecord(id){
 selId=id;const r=RECORDS.find(x=>x.id===id);
 rowMap.forEach((tr,k)=>{tr.classList.toggle('selected',k===id);tr.setAttribute('aria-selected',String(k===id));});
 document.getElementById('chain-empty').classList.add('hidden');document.getElementById('chain').classList.remove('hidden');
 const cf=document.getElementById('c-finding');cf.textContent=r.f;cf.style.color=r.f==='No signal'?'#3fb67b':'#efbd6b';
 document.getElementById('c-reason').textContent=r.r;
 document.getElementById('c-metric').textContent=r.m;
 document.getElementById('c-record').textContent=`${r.id} · ${r.en} · ${r.as}`;
 document.getElementById('c-original').textContent=JSON.stringify({alert_id:r.id,timestamp:r.ts,entity:r.en,severity:r.sev,asset:r.as,investigation_time:fmt(r.inv),escalated:r.esc,disposition:r.disp,note_class:r.pat,source:"synthetic_demo_dataset"},null,1);
}
document.getElementById('ev-search').addEventListener('input',renderEvidence);
document.getElementById('ev-sev').addEventListener('change',renderEvidence);
document.getElementById('sort-inv').addEventListener('click',()=>{sortDir=sortDir===1?-1:1;renderEvidence();});
renderEvidence();

lucide.createIcons();

// SCROLL
let toastTimer;
window.addEventListener('scroll',()=>{
  const s=window.scrollY,tot=document.body.scrollHeight-window.innerHeight;
  document.getElementById('nav-progress').style.width=(s/tot*100)+'%';
  document.getElementById('navbar').classList.toggle('scrolled',s>60);
  const secs=document.querySelectorAll('section[id]');let cur='';
  secs.forEach(x=>{if(s>=x.offsetTop-120)cur=x.id});
  document.querySelectorAll('.nav-link').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight-80)el.classList.add('visible');
  });
  // count-up
  const c2=document.getElementById('cnt2'),c3=document.getElementById('cnt3');
  if(c2&&!c2.dataset.done&&c2.getBoundingClientRect().top<window.innerHeight-50){c2.dataset.done=1;countUp(c2,0,3,'','');countUp(c3,0,100,'','%')}
});

function countUp(el,from,to,pre,suf){
  const dur=1200,start=performance.now();
  (function step(now){
    const p=Math.min((now-start)/dur,1),e=1-Math.pow(1-p,3);
    el.textContent=pre+Math.round(from+(to-from)*e)+suf;
    if(p<1)requestAnimationFrame(step);
  })(performance.now());
}

// HERO GLOW
document.querySelector('.hero').addEventListener('mousemove',e=>{
  const r=e.currentTarget.getBoundingClientRect();
  const g=document.getElementById('hero-glow');
  g.style.left=((e.clientX-r.left)/r.width*100)+'%';
  g.style.top=((e.clientY-r.top)/r.height*100)+'%';
  g.style.transform='translate(-50%,-50%)';
});

// TOAST
function showToast(icon,msg){
  const t=document.getElementById('toast');
  document.getElementById('toast-icon').textContent=icon;
  document.getElementById('toast-msg').textContent=msg;
  t.classList.add('show');clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),3500);
}

// PAIN ACCORDION
function togglePain(el){
  const was=el.classList.contains('active');
  document.querySelectorAll('.pain-item').forEach(p=>p.classList.remove('active'));
  if(!was)el.classList.add('active');
}

// MAP PINS — pre-fill form
function fillAddr(addr){
  document.getElementById('f-address').value=addr;
  showToast('📍','Endereço "'+addr+'" pré-preenchido no formulário!');
  setTimeout(()=>document.getElementById('reporte').scrollIntoView({behavior:'smooth'}),600);
}

// CANVAS TABS
function switchCanvas(id,btn){
  document.querySelectorAll('.canvas-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.canvas-panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('canvas-'+id).classList.add('active');
}

// DRAG & DROP
let dragEl=null;
function dragStart(e){dragEl=e.target;e.target.classList.add('dragging');e.dataTransfer.effectAllowed='move'}
function dragOver(e){e.preventDefault();e.currentTarget.classList.add('drag-over')}
function drop(e,col){
  e.preventDefault();e.currentTarget.classList.remove('drag-over');
  if(dragEl){
    dragEl.classList.remove('dragging','done','wip');
    if(col==='concluido')dragEl.classList.add('done');
    else if(col==='fazendo')dragEl.classList.add('wip');
    e.currentTarget.appendChild(dragEl);
    showToast('✅','Card movido para '+col.charAt(0).toUpperCase()+col.slice(1)+'!');
    dragEl=null;
  }
}
document.addEventListener('dragend',()=>{
  document.querySelectorAll('.task-chip').forEach(c=>c.classList.remove('dragging'));
  document.querySelectorAll('.sprint-col').forEach(c=>c.classList.remove('drag-over'));
});

// SIMULATOR
let curScr=0;
function goToScreen(n){
  const screens=['sc0','sc1','sc2','sc3'].map(id=>document.getElementById(id));
  const steps=document.querySelectorAll('.sim-step');
  screens[curScr].classList.add(n>curScr?'prev':'hidden');
  screens[curScr].classList.remove(); 
  // cleanup
  setTimeout(()=>{screens[curScr].classList.add('hidden');screens[curScr].classList.remove('prev');},480);
  screens[n].classList.remove('hidden','prev');
  steps.forEach((s,i)=>s.classList.toggle('active',i===n));
  curScr=n;
  if(n===2){const now=new Date();document.getElementById('conf-time').textContent=now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0')}
  if(n===3){document.getElementById('report-id').textContent=Math.floor(1000+Math.random()*9000);showToast('🎉','Reporte enviado! A prefeitura foi notificada.')}
}
// GPS cam flicker
setInterval(()=>{
  const el=document.getElementById('cam-gps');if(!el)return;
  const n=(Math.random()-.5)*.0002;
  el.textContent='📍 GPS: '+(-27.3401+n).toFixed(4)+', '+(-48.5642+n).toFixed(4)+' · Precisão: '+(3+Math.floor(Math.random()*3))+'m';
},2200);

// LIVE MAP PIN click
function pinInfo(addr,sev,status){
  const icons={Alta:'🔴',Média:'🟡',Baixa:'🟢',Resolvido:'✅'};
  showToast(icons[sev]||'📍',addr+' · '+sev+' · '+status);
}

// SEVERITY
let selSev='';
function setSev(btn,level){
  document.querySelectorAll('.sev-btn').forEach(b=>b.className='sev-btn');
  btn.classList.add('active-'+level);
  selSev=level==='low'?'Baixa':level==='med'?'Média':'Alta';
}

// GPS
function getGPS(){
  const el=document.getElementById('f-gps');el.value='Obtendo...';
  setTimeout(()=>{
    const lat=(-27.3401+(Math.random()-.5)*.01).toFixed(4);
    const lng=(-48.5642+(Math.random()-.5)*.01).toFixed(4);
    el.value=lat+', '+lng;showToast('📍','Localização capturada com precisão de 4m!');
  },1100);
}

// FORM SUBMIT
function submitReport(){
  const addr=document.getElementById('f-address').value.trim();
  const bairro=document.getElementById('f-bairro').value;
  const desc=document.getElementById('f-desc').value.trim();
  if(!addr){showToast('❌','Preencha o endereço do dano!');return}
  if(!bairro){showToast('❌','Selecione o bairro!');return}
  if(!desc){showToast('❌','Descreva o problema encontrado!');return}
  const btn=document.querySelector('.form-submit');
  btn.textContent='Enviando...';btn.style.opacity='.7';btn.disabled=true;
  setTimeout(()=>{
    const prot='VS-'+new Date().getFullYear()+'-'+Math.floor(1000+Math.random()*9000);
    document.getElementById('form-protocol').textContent=prot;
    document.getElementById('form-wrap').style.display='none';
    document.getElementById('form-success').classList.add('show');
    showToast('🎉','Reporte '+prot+' enviado com sucesso!');
    addLivePin();
  },1400);
}

function addLivePin(){
  const svg=document.getElementById('live-svg');
  const g=document.createElementNS('http://www.w3.org/2000/svg','g');
  const x=80+Math.random()*740,y=40+Math.random()*220;
  g.setAttribute('style','cursor:pointer');
  g.setAttribute('onclick',"pinInfo('Novo reporte','Novo','Pendente')");
  g.innerHTML=`<circle cx="${x}" cy="${y}" r="13" fill="rgba(76,255,122,.2)" stroke="#4cff7a" stroke-width="2"/>
<text x="${x}" y="${y+5}" text-anchor="middle" font-size="12" fill="#4cff7a">🆕</text>
<circle cx="${x}" cy="${y}" r="21" fill="none" stroke="#4cff7a" stroke-width="1" opacity=".4"><animate attributeName="r" values="13;25;13" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;0;.4" dur="2s" repeatCount="indefinite"/></circle>`;
  svg.appendChild(g);
}

function resetForm(){
  ['f-address','f-bairro','f-desc','f-name','f-gps'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});
  document.querySelectorAll('.sev-btn').forEach(b=>b.className='sev-btn');selSev='';
  document.getElementById('form-wrap').style.display='';
  document.getElementById('form-success').classList.remove('show');
  const btn=document.querySelector('.form-submit');
  if(btn){btn.textContent='📍 Enviar Reporte ao ViaSegura';btn.style.opacity='1';btn.disabled=false}
}

// Initial trigger
window.dispatchEvent(new Event('scroll'));
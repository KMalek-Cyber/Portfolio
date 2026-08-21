const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{if(glow){glow.style.left=(e.clientX-130)+'px';glow.style.top=(e.clientY-130)+'px';}});
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.08});
document.querySelectorAll('.section,.experience-card,.thm-card,.cert-card,.secondary-project').forEach(e=>{e.classList.add('reveal');observer.observe(e)});

// TryHackMe filters
const filterButtons=[...document.querySelectorAll('.room-filters button')];
const roomCards=[...document.querySelectorAll('.room-card')];
const roomCount=document.getElementById('room-count');
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const f=btn.dataset.filter; let visible=0;
  roomCards.forEach(card=>{const show=f==='all'||card.dataset.cat===f; card.classList.toggle('hidden',!show); if(show)visible++;});
  if(roomCount) roomCount.textContent=visible+' / 28';
}));

// Lightweight image lightbox
document.querySelectorAll('[data-lightbox]').forEach(link=>link.addEventListener('click',e=>{
  e.preventDefault(); const box=document.createElement('div'); box.className='lightbox';
  const img=document.createElement('img'); img.src=link.getAttribute('href'); img.alt='Aperçu';
  const close=document.createElement('button'); close.type='button'; close.setAttribute('aria-label','Fermer'); close.textContent='×';
  box.append(img,close); document.body.appendChild(box);
  const remove=()=>box.remove(); close.addEventListener('click',remove); box.addEventListener('click',ev=>{if(ev.target===box)remove()}); document.addEventListener('keydown',function esc(ev){if(ev.key==='Escape'){remove();document.removeEventListener('keydown',esc)}});
}));


// Certification expandable modules
const certToggles=[...document.querySelectorAll('.cert-toggle')];
certToggles.forEach(btn=>btn.addEventListener('click',()=>{
  const details=btn.nextElementSibling; const open=details.classList.toggle('open');
  btn.setAttribute('aria-expanded',open?'true':'false');
  btn.querySelector('span').textContent=open?'−':'+';
}));

// TryHackMe room interaction modal
const roomModal=document.getElementById('room-modal');
const roomTitle=document.getElementById('room-modal-title');
const roomCat=document.getElementById('room-modal-cat');
const roomText=document.getElementById('room-modal-text');
const roomTags=document.getElementById('room-modal-tags');
const roomDescriptions={
  recon:'Reconnaissance : collecte d’informations, découverte de cibles et préparation de l’analyse.',
  network:'Réseau : découverte d’hôtes, scans de ports, protocoles, services et analyse de l’exposition.',
  offense:'Offensif : méthodologie de pentest, frameworks et premières étapes d’une évaluation de sécurité.',
  web:'Web : reconnaissance d’applications, Burp Suite, découverte de contenu et attaques de serveurs Web.',
  defense:'Défensif : compréhension de la Cyber Kill Chain et des fondamentaux de la sécurité défensive.',
  fundamentals:'Fondamentaux : compréhension des composants et mécanismes de base d’un système informatique.',
  osint:'OSINT : recherche et exploitation d’informations accessibles depuis des sources ouvertes.',
  orientation:'Orientation cyber : découverte des métiers et des trajectoires possibles dans la cybersécurité.'
};
const roomLabels={recon:'RECONNAISSANCE',network:'RÉSEAU',offense:'OFFENSIF',web:'WEB',defense:'DÉFENSIF',fundamentals:'FONDAMENTAUX',osint:'OSINT',orientation:'CYBER'};
function closeRoom(){if(roomModal)roomModal.classList.remove('open');document.body.style.overflow='';}
roomCards.forEach(card=>card.addEventListener('click',()=>{
  const cat=card.dataset.cat, title=card.querySelector('strong')?.textContent||'Room';
  roomTitle.textContent=title; roomCat.textContent=roomLabels[cat]||cat.toUpperCase(); roomText.textContent=roomDescriptions[cat]||'Room TryHackMe complétée dans le cadre de mon parcours pratique en cybersécurité.';
  roomTags.innerHTML=''; [roomLabels[cat]||cat.toUpperCase(),'COMPLETED','HANDS-ON'].forEach(t=>{const el=document.createElement('span');el.textContent=t;roomTags.appendChild(el)});
  roomModal.classList.add('open'); document.body.style.overflow='hidden';
}));
document.querySelector('.room-modal-close')?.addEventListener('click',closeRoom);
roomModal?.addEventListener('click',e=>{if(e.target===roomModal)closeRoom()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeRoom()});

// Subtle tilt on major interactive cards
if(matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.thm-card,.cert-card,.experience-card').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${(-y*1.2).toFixed(2)}deg) rotateY(${(x*1.2).toFixed(2)}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave',()=>{card.style.transform=''});
  });
}


// V10: reading progress
const progress=document.getElementById('scroll-progress');
window.addEventListener('scroll',()=>{if(progress){const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(h>0?(window.scrollY/h)*100:0)+'%';}},{passive:true});

// V10: cyber focus mode — intentionally hides secondary projects
const focusToggle=document.getElementById('focus-toggle');
focusToggle?.addEventListener('click',()=>{const active=document.body.classList.toggle('cyber-focus');focusToggle.classList.toggle('active',active);focusToggle.setAttribute('aria-pressed',active?'true':'false');focusToggle.querySelector('span').textContent=active?'ON':'OFF';});

// V10: collapsible professional experience details
const expToggles=[...document.querySelectorAll('.exp-toggle')];
expToggles.forEach(btn=>btn.addEventListener('click',()=>{const card=btn.closest('.experience-card');const collapsed=card.classList.toggle('details-collapsed');btn.setAttribute('aria-expanded',collapsed?'false':'true');btn.firstChild.textContent=collapsed?'Voir les détails ':'Réduire les détails ';btn.querySelector('span').textContent=collapsed?'+':'−';}));

// V10: image lightbox for project/experience galleries too
for(const img of document.querySelectorAll('.photo-strip img,.secursense-gallery img,.pcb-gallery img,.revime-gallery img')){
  img.addEventListener('click',()=>{const box=document.createElement('div');box.className='lightbox';const full=document.createElement('img');full.src=img.src;full.alt=img.alt;const close=document.createElement('button');close.textContent='×';close.setAttribute('aria-label','Fermer');box.append(full,close);document.body.appendChild(box);const rm=()=>box.remove();close.onclick=rm;box.onclick=e=>{if(e.target===box)rm()};});
}

// V10: active navigation indicator
const navLinks=[...document.querySelectorAll('.nav nav a')];
const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('nav-active',a.getAttribute('href')==='#'+entry.target.id));}}),{rootMargin:'-25% 0px -65% 0px'});
sections.forEach(s=>navObserver.observe(s));

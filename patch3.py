from pathlib import Path
p=Path('/mnt/data/portfolio_v8/Portfolio-Malek-Klimane-V7/script.js')
s=p.read_text()
s += r'''

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
'''
p.write_text(s)

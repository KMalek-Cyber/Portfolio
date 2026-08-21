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

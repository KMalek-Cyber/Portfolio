// Small progressive-enhancement touches — no framework required.
document.querySelectorAll('a[data-placeholder]').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const kind = link.dataset.placeholder;
    alert(`Ajoute ton lien ${kind} dans index.html avant de publier le portfolio.`);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.08});

document.querySelectorAll('.section, .project, .timeline-item, .skill-group').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity .65s ease, transform .65s ease';
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = '.visible{opacity:1!important;transform:none!important}';
document.head.appendChild(style);

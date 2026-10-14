const b=document.querySelector('.menu-btn'),m=document.querySelector('.mobile-menu');b?.addEventListener('click',()=>m.classList.toggle('open'));const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const heroActions=document.querySelector('.hero-actions');if(heroActions&&!document.querySelector('.hero-video-wrap')){const wrap=document.createElement('div');wrap.className='hero-video-wrap';const video=document.createElement('video');video.className='hero-video';video.src='/video-presentacion.mp4';video.controls=true;video.playsInline=true;video.preload='metadata';video.setAttribute('aria-label','Video de presentación de Geraldine Angarita');wrap.appendChild(video);heroActions.insertAdjacentElement('afterend',wrap);}


// Meta Pixel: mide los clics de contacto y solicitud de reunión sin duplicarlos.
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || typeof window.fbq !== 'function') return;

  let url;
  try { url = new URL(link.href, window.location.href); }
  catch { return; }

  const isWhatsApp = url.hostname === 'wa.me' ||
    url.hostname === 'api.whatsapp.com' ||
    url.hostname === 'web.whatsapp.com';
  if (!isWhatsApp) return;

  const label = (link.textContent || link.getAttribute('aria-label') || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const isMeetingButton = /agend(?:a|ar).*reunion/.test(label);

  window.fbq('track', isMeetingButton ? 'Schedule' : 'Contact', {
    content_name: isMeetingButton ? 'Agendar reunion' : 'WhatsApp',
    contact_method: 'WhatsApp'
  });
});

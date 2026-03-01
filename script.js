// HORLOGE SMS
function updateClock() {
  const el = document.getElementById('sms-clock');
  if (!el) return;
  const now = new Date();
  el.textContent = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}
updateClock();
setInterval(updateClock, 30000);

// SMS SEND
function sendSMS(e) {
  e.preventDefault();
  const name = document.getElementById('sms-name').value.trim();
  const email = document.getElementById('sms-email').value.trim();
  const msg = document.getElementById('sms-msg').value.trim();
  if (!name || !email || !msg) return;

  const thread = document.getElementById('sms-thread');

  const sent = document.createElement('div');
  sent.className = 'sms-bubble sent';
  sent.textContent = msg;
  thread.appendChild(sent);
  thread.scrollTop = thread.scrollHeight;

  document.getElementById('sms-name').value = '';
  document.getElementById('sms-email').value = '';
  document.getElementById('sms-msg').value = '';

  setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'sms-bubble recv';
    reply.innerHTML = `Merci ${name} ♥ Je vous réponds très vite sur <em>${email}</em>`;
    thread.appendChild(reply);
    thread.scrollTop = thread.scrollHeight;
  }, 1200);
}

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.bloc');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

revealEls.forEach(el => observer.observe(el));

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

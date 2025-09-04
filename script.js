  
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    menuToggle?.addEventListener('click', () => navMenu.classList.toggle('open'));

    // Close mobile menu on link click
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

    // Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Reveal on scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
    }, { threshold: .15 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Testimonials slider (auto)
    const track = document.getElementById('testiTrack');
    const slides = Array.from(track.children);
    const dotsWrap = document.getElementById('dots');
    let idx = 0;
    slides.forEach((_, i) => {
      const d = document.createElement('div'); d.className = 'dot' + (i===0 ? ' active':'' ); dotsWrap.appendChild(d);
    });
    const update = () => {
      track.style.transform = `translateX(-${idx * 100}%)`;
      dotsWrap.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i===idx));
    };
    setInterval(() => { idx = (idx + 1) % slides.length; update(); }, 4200);

    // Form (demo only)
const form = document.getElementById('quoteForm');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  // WhatsApp number with country code (no +, no spaces)
  const phoneNumber = "+917006465123"; // replace with your WhatsApp number

  // Create message
  const message = `Hello, my name is ${data.name}. I am interested in ${data.service || 'a project'}. Please contact me.`;

  // Encode and open WhatsApp
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

  // Optional UI feedback
  msg.textContent = `Redirecting you to WhatsApp...`;
  form.reset();
});


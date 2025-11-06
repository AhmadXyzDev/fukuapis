function createParticles() {
  const particleCount = 80;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    const colors = ['#667eea', '#764ba2', '#f43f5e', '#4ade80', '#3b82f6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 10px ${color}`;
    particle.style.animation = `float ${Math.random() * 8 + 6}s infinite ease-in-out`;
    document.body.appendChild(particle);
  }
}
createParticles();

function updateTime() {
  const now = new Date();
  const options = { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const timeString = now.toLocaleTimeString('id-ID', options);
  const dayOptions = { timeZone: 'Asia/Jakarta', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dayString = now.toLocaleDateString('id-ID', dayOptions);
  document.getElementById('current-time').textContent = `${timeString} WIB | ${dayString}`;
}
updateTime();
setInterval(updateTime, 1000);

const startTime = new Date();
function updateUptime() {
  const now = new Date();
  const diffMs = now - startTime;
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffMins = Math.floor((diffMs % 3600000) / 60000);
  const diffSecs = Math.floor((diffMs % 60000) / 1000);
  document.getElementById('uptime').textContent = `Uptime: ${diffHrs}h ${diffMins}m ${diffSecs}s`;
}
setInterval(updateUptime, 1000);

function animateCounter(element, target, suffix = '') {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 20);
}

const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      if (entry.target.classList.contains('stat-card')) {
        const valueEl = entry.target.querySelector('.stat-value');
        const text = valueEl.textContent;
        if (text.includes('ms')) animateCounter(valueEl, 50, 'ms');
        else if (text.includes('M+')) animateCounter(valueEl, 10, 'M+');
        else if (text.includes('%')) {
          const value = parseFloat(text);
          let current = 0;
          const timer = setInterval(() => {
            current += 0.5;
            if (current >= value) {
              valueEl.textContent = value + '%';
              clearInterval(timer);
            } else {
              valueEl.textContent = current.toFixed(2) + '%';
            }
          }, 20);
        }
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.endpoint, .contact, .stat-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(50px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  observer.observe(el);
});

document.getElementById('try-button').addEventListener('click', () => {
  document.getElementById('docs').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => { document.getElementById('input-text').focus(); }, 800);
});


document.addEventListener("DOMContentLoaded", () => {
  const بصر = document.getElementById("U2xP5vQa");
  const فهد = document.getElementById("R9dM6kFt");

  if (!بصر || !فهد) return console.error("Elemen tidak ditemukan!");

  بصر.addEventListener("click", () => {
    const كلم = document.getElementById("Qp8zR1aX").value.trim();
    const فهم = document.getElementById("L7yK2nWb").value.trim();
    const علم = document.getElementById("T4hC9eZm").value.trim();

    if (!كلم || !فهم || !علم) {
      فهد.style.color = "red";
      فهد.innerHTML = "Isi colom diatas";
      فهد.style.opacity = 1;
      return;
    }

    فهد.style.color = "#6366f1";
    فهد.innerHTML = "<div class='loading'></div> Loading ...";

    const وصل = `https://www.fuku-api.my.id/api/nanobanana?image=${encodeURIComponent(كلم)}&prompt=${encodeURIComponent(فهم)}&apikeyFuku=${encodeURIComponent(علم)}`;
    setTimeout(() => { window.location.href = وصل; }, 900);
  });

  document.querySelectorAll("#Qp8zR1aX, #L7yK2nWb, #T4hC9eZm").forEach(عنصر => {
    عنصر.addEventListener("keypress", حدث => {
      if (حدث.key === "Enter") document.getElementById("U2xP5vQa").click();
    });
  });
});

document.getElementById('convert-cpanel').addEventListener('click', () => {
  const username = document.getElementById('user-cpanel').value.trim();
  const paket = document.getElementById('paket-cpanel').value.trim();
  const akses = document.getElementById('akses-cpanel').value.trim();
  const re = document.getElementById('goto-cpanel');

  if (!username || !paket || !akses) {
    re.innerHTML = ' <span style="color: #f59e0b;">Isi kolom diatas.</span>';
    re.classList.add('show');
    return;
  }

  re.innerHTML = '<div class="loading"></div> <span style="color: #667eea;">Loading...</span>';
  re.classList.add('show');

  setTimeout(() => {
    window.location.href = `https://www.fuku-api.my.id/api/cpanel?username=${encodeURIComponent(username)}&paket=${encodeURIComponent(paket)}&akses=${encodeURIComponent(akses)}`;
  }, 800);
});

document.getElementById('akses-cpanel').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') document.getElementById('convert-cpanel').click();
});

document.addEventListener("DOMContentLoaded", () => {
  const tombol = document.getElementById("panggang");
  const wadah = document.getElementById("panci");

  tombol.addEventListener("click", () => {
    const kaleng = document.getElementById("kaleng").value.trim();
    if (!kaleng) {
      wadah.innerHTML = "<span style='color:red'>Masukkan teks terlebih dahulu!</span>";
      return;
    }

    wadah.innerHTML = "<div class='loading'></div> <span style='color:#667eea;'>Loading...</span>";

    const imgUrl = `https://www.fuku-api.my.id/api/brat?text=${encodeURIComponent(kaleng)}`;
    setTimeout(() => {
      window.location.href = `https://www.fuku-api.my.id/api/brat?text=${encodeURIComponent(kaleng)}`;
    }, 800);
  });

  document.getElementById("kaleng").addEventListener("keypress", e => {
    if (e.key === "Enter") tombol.click();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("send-chat").addEventListener("click", () => {
    const pre = document.getElementById("pre").value.trim();
    const qu = document.getElementById("qu").value.trim();
    const divRess = document.getElementById("divRess");

    if (!qu) {
      divRess.innerHTML = "<span style='color:red'>Masukkan query terlebih dahulu!</span>";
      divRess.classList.add('show');
      return;
    }

    divRess.innerHTML = '<div class="loading"></div> <span style="color: #667eea;">Proses...</span>';
    divRess.classList.add('show');

    setTimeout(() => {
      window.location.href = `https://www.fuku-api.my.id/api/chatbot?prompt=${encodeURIComponent(pre)}&query=${encodeURIComponent(qu)}`;
    }, 800);
  });

  document.getElementById('pre').addEventListener('keypress', (e) => { 
    if (e.key === 'Enter') document.getElementById('send-chat').click(); 
  });

  document.getElementById('qu').addEventListener('keypress', (e) => { 
    if (e.key === 'Enter') document.getElementById('send-chat').click(); 
  });
});


document.getElementById('pre').addEventListener('keypress', (e) => { 
  if (e.key === 'Enter') document.getElementById('send-chat').click(); 
});

document.getElementById('qu').addEventListener('keypress', (e) => { 
  if (e.key === 'Enter') document.getElementById('send-chat').click(); 
});

document.getElementById('WpZ').addEventListener('click', () => {
  const prompt = document.getElementById('cxA').value.trim();
  const ratio = document.getElementById('hRt').value.trim();
  const result = document.getElementById('qLb');

  if (!prompt || !ratio) {
    result.innerHTML = '⚠️ <span style="color:#f59e0b;">Harap isi semua field!</span>';
    result.classList.add('show');
    return;
  }

  result.innerHTML = '<div class="loading"></div> <span style="color:#667eea;">Memproses...</span>';
  result.classList.add('show');

  setTimeout(() => {
    window.location.href = `https://www.fuku-api.my.id/api/imagen?prompt=${encodeURIComponent(prompt)}&ratio=${encodeURIComponent(ratio)}`;
  }, 800);
});

document.getElementById('hRt').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') document.getElementById('WpZ').click();
});

document.getElementById('convert-beton').addEventListener('click', () => {
  const urlyt = document.getElementById('urlnya').value.trim();
  const re = document.getElementById('goto');
  if (!urlyt) {
    re.innerHTML = '⚠️ <span style="color: #f59e0b;">Masukkan input</span>';
    re.classList.add('show');
    return;
  }
  re.innerHTML = '<div class="loading"></div> <span style="color: #667eea;">Proses...</span>';
  re.classList.add('show');
  setTimeout(() => { window.location.href = `https://www.fuku-api.my.id/api/ytmp3?url=${encodeURIComponent(urlyt)}&quality=128`; }, 800);
});
document.getElementById('urlnya').addEventListener('keypress', (e) => { if (e.key === 'Enter') document.getElementById('convert-beton').click(); });

document.getElementById('convert-button').addEventListener('click', () => {
  const inputText = document.getElementById('input-text').value.trim();
  const resultDiv = document.getElementById('result');
  if (!inputText) {
    resultDiv.innerHTML = '⚠️ <span style="color: #f59e0b;">Please enter some text first!</span>';
    resultDiv.classList.add('show');
    return;
  }
  resultDiv.innerHTML = '<div class="loading"></div> <span style="color: #667eea;">Redirecting to API...</span>';
  resultDiv.classList.add('show');
  setTimeout(() => { window.location.href = `https://www.fuku-api.my.id/api/tobase64?text=${encodeURIComponent(inputText)}`; }, 800);
});
document.getElementById('input-text').addEventListener('keypress', (e) => { if (e.key === 'Enter') document.getElementById('convert-button').click(); });

document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const button = e.target.querySelector('button');
  const originalText = button.textContent;
  button.innerHTML = '<div class="loading"></div> Sending...';
  button.disabled = true;
  setTimeout(() => {
    button.textContent = '✓ Message Sent!';
    button.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
      button.disabled = false;
      e.target.reset();
    }, 2000);
  }, 1500);
});

document.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
  document.querySelectorAll('.orb').forEach((orb, index) => {
    const speed = (index + 1) * 0.5;
    orb.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    link.style.color = 'rgba(255, 255, 255, 0.8)';
    if (link.getAttribute('href').slice(1) === current) link.style.color = '#667eea';
  });
});

setInterval(() => {
  const responseTime = document.getElementById('response-time');
  const randomMs = Math.floor(Math.random() * 20) + 40;
  responseTime.textContent = `< ${randomMs}ms`;
}, 5000);

setInterval(() => {
  const requests = document.getElementById('requests');
  const currentVal = parseInt(requests.textContent);
  requests.textContent = (currentVal + Math.floor(Math.random() * 100)) + 'M+';
}, 10000);

document.querySelectorAll('.code-block').forEach(block => {
  block.addEventListener('mouseenter', () => { block.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.4)'; });
  block.addEventListener('mouseleave', () => { block.style.boxShadow = ''; });
});
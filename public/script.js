// public/script.js
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Try button scroll to docs
  document.getElementById('try-button').addEventListener('click', () => {
    document.getElementById('docs').scrollIntoView({ behavior: 'smooth' });
  });

  // Convert button functionality
  document.getElementById('convert-button').addEventListener('click', async () => {
    const input = document.getElementById('input-text').value;
    if (!input) {
      alert('Please enter some text!');
      return;
    }
    
    try {
      const response = await fetch(`/api/tobase64?text=${encodeURIComponent(input)}`);
      const data = await response.json();
      if (data.error) {
        document.getElementById('result').innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
      } else {
        document.getElementById('result').innerHTML = `
          <p>Original: ${data.original}</p>
          <p>Base64: ${data.base64}</p>
        `;
      }
    } catch (err) {
      document.getElementById('result').innerHTML = `<p style="color: red;">Failed to convert: ${err.message}</p>`;
    }
  });

  // Simple particle animation for background (unique touch)
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1
    });
  }
  
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
      if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#00ffcc';
      ctx.fill();
    });
  }
  animate();

  // Resize canvas on window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
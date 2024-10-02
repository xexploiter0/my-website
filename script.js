document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < window.innerHeight - 50) {
                bar.style.width = bar.parentElement.getAttribute('data-progress') + '%';
            }
        });
    };

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Initial check on page load

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    const greeting = document.querySelector('.greeting');
    const text = greeting.textContent;
    greeting.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            greeting.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    typeWriter();

    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numberOfParticles = 50; 

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.01;
        }
        draw() {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
            if (particles[i].size <= 0.2) {
                particles.splice(i, 1);
                i--;
                particles.push(new Particle());
            }
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    const audio = document.getElementById('background-music');
    
    function attemptPlayMusic() {
        audio.play().catch(error => {
            console.log('Auto-play was prevented. Retrying...');
            setTimeout(attemptPlayMusic, 1000);
        });
    }

    attemptPlayMusic();

    document.addEventListener('click', () => {
        if (audio.paused) {
            attemptPlayMusic();
        }
    });
});
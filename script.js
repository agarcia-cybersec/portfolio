
const canvas = document.getElementById('cyber-bg');
const ctx = canvas.getContext('2d');

let particles = [];
const maxParticles = 60;
const connectionDist = 120;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00ffcc';
        ctx.fill();
    }
}


for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
}

function animateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDist) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 255, 204, ${1 - dist / connectionDist})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateBackground);
}
animateBackground();


const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');


window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


navToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});


document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});






const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output-container');
const terminalBody = document.getElementById('terminal-body');


function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}


let commandHistory = [];
let historyIndex = -1;

const commandRegistry = {
    help: () => {
        return `Comandos disponibles:
  <span class="term-cmd">about</span>          - Breve descripción del consultor de ciberseguridad.
  <span class="term-cmd">skills</span>         - Muestra la matriz de competencias técnicas destacadas.
  <span class="term-cmd">experience</span>     - Imprime el historial de trayectoria laboral.
  <span class="term-cmd">certifications</span> - Lista las certificaciones obtenidas y en curso.
  <span class="term-cmd">projects</span>       - Imprime detalles del NAS autoalojado seguro.
  <span class="term-cmd">clear</span>          - Limpia la pantalla de la terminal.`;
    },
    about: () => {
        return `[PERFIL PROFESIONAL]
Aarón García Díaz - Administrador de Sistemas Informáticos en Red (ASIR) y Especialista en Ciberseguridad en Entornos TI.
Mi filosofía es la "Seguridad por Diseño". Cuento con experiencia sólida en consultoría de seguridad defensiva, bastionado de sistemas empresariales Windows/Linux y despliegues de redes complejas.`;
    },
    skills: () => {
        return `[MATRIZ DE COMPETENCIAS]
  • Bastionado / Hardening: Guías para Linux y Windows Server.
  • Compliance Scanning: Auditoría automatizada con Tenable.io.
  • Cloud Security: Despliegues y escaneos de cumplimiento en AWS, GCP, Azure y OCI.
  • SIEM & Análisis: Procesamiento analítico e ingesta de logs en Splunk.
  • Redes & Sistemas: VPNs seguras (Tailscale/WireGuard), Docker, Portainer, Administración Linux.
  • Ingeniería: Planos AsBuilt con QGis y diseño CAD con AutoCAD.`;
    },
    experience: () => {
        return `[TRAYECTORIA LABORAL]
  1. <strong>Cybersecurity Consultant</strong> en IndraMind Cybersecurity (2023 - 2025)
     - Redacción de guías de bastionado, compliance scripts en Tenable.io, auditoría multinube y análisis SIEM en Splunk.
  2. <strong>Departamento de Ingeniería</strong> en Grupo Gestioniza (2022)
     - Despliegue de fibra óptica, planos AsBuilt QGis y permisos oficiales en AutoCAD.
  3. <strong>Departamento de Ingeniería</strong> en Gestioniza Infraestructuras (2021)
     - Estudios de viabilidad técnica y trazado cartográfico.`;
    },
    certifications: () => {
        return `[CREDENCIALES Y OBJETIVOS]
  • <strong>Hacking Web Avanzado</strong> (Hack4u - 51h) - <span class="term-system">[CURSANDO ACTUALMENTE]</span>
  • <strong>Introducción al Hacking Ético</strong> (Hack4u - 53h) - <span class="term-system">[CURSANDO ACTUALMENTE]</span>
  • <strong>eJPTv2</strong> (eLearnSecurity Certified Junior Penetration Tester) - <span class="term-system">[EN PREPARACIÓN]</span>`;
    },
    projects: () => {
        return `[PROYECTOS Y LABORATORIOS]
  <strong>• Proyecto Personal: NAS Autoalojado Seguro</strong>
    - Infraestructura: Raspberry Pi 5 ejecutando Debian OS Lite (headless, 24/7).
    - Contenedores: Docker + Portainer (Nextcloud aislado).
    - Acceso Seguro: VPN Mesh Tailscale (protocolo WireGuard, sin puertos abiertos).
    - Persistencia: SSD externo independiente del host.

  <strong>• Laboratorios de Especialidad (21 proyectos):</strong>
    - Hacking Ético, Análisis Forense, Bastionado de Sistemas, Gestión de Incidentes e Ingeniería Inversa. Navega por la galería gráfica para más detalles.`;
    },
    clear: () => {
        terminalOutput.innerHTML = '';
        return '';
    }
};

if (terminalInput && terminalOutput && terminalBody) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const fullInput = terminalInput.value.trim();
            const cmd = fullInput.toLowerCase();
            
            if (fullInput !== '') {
                
                commandHistory.push(fullInput);
                historyIndex = commandHistory.length;
                
                
                const userCommandLine = document.createElement('div');
                userCommandLine.className = 'terminal-line';
                userCommandLine.innerHTML = `<span class="term-prompt">guest@sentinel.cyber:~$</span> <span>${escapeHTML(fullInput)}</span>`;
                terminalOutput.appendChild(userCommandLine);
                
                
                let outputText = '';
                if (commandRegistry[cmd]) {
                    outputText = commandRegistry[cmd]();
                } else {
                    outputText = `Comando no reconocido: <span class="term-cmd">${escapeHTML(fullInput)}</span>. Escribe <span class="term-cmd">help</span> para ver la lista de comandos.`;
                }
                
                
                if (cmd !== 'clear' && outputText !== '') {
                    const outputBlock = document.createElement('div');
                    outputBlock.className = 'terminal-output-block';
                    outputBlock.innerHTML = outputText;
                    terminalOutput.appendChild(outputBlock);
                }
                
                
                terminalInput.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        } else if (e.key === 'ArrowUp') {
            
            if (commandHistory.length > 0 && historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
            e.preventDefault();
        }
    });

    const termContainer = document.querySelector('.terminal-container');
    if (termContainer) {
        termContainer.addEventListener('click', () => {
            terminalInput.focus();
        });
    }
}




const cursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('custom-cursor-dot');

let mouseX = 0, mouseY = 0; 
let cursorX = 0, cursorY = 0; 


window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
    
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateCursor);
}
animateCursor();


function bindCursorEvents() {
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .node-group, .tab-btn, .proj-tab-btn, .module-card, .filter-btn, .gallery-card');

    interactiveElements.forEach(el => {
        
        el.removeEventListener('mouseenter', onCursorEnter);
        el.removeEventListener('mouseleave', onCursorLeave);
        
        el.addEventListener('mouseenter', onCursorEnter);
        el.addEventListener('mouseleave', onCursorLeave);
    });
}

function onCursorEnter() {
    cursor.classList.add('cursor-hover');
    cursorDot.classList.add('cursor-dot-hover');
}

function onCursorLeave() {
    cursor.classList.remove('cursor-hover');
    cursorDot.classList.remove('cursor-dot-hover');
}


bindCursorEvents();


document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
});


function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            
            filterButtons.forEach(b => b.classList.remove('active'));
            
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');

            galleryCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                    
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(8px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
            
            
            bindCursorEvents();
        });
    });
}


initProjectFilters();

const roles = [
    "Experto en ciberseguridad",
    "Auditor de ciberseguridad",
    "Consultor de ciberseguridad",
    "Hacker ético"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById('dynamic-role');

function typeEffect() {
    if (!roleEl) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 40 : 80;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

if (roleEl) {
    typeEffect();
}




// --- STARFIELD LOGIC ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let mouseX = 0;
let mouseY = 0;

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 400; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5,
            opacity: Math.random(),
            speed: Math.random() * 0.05
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        // Calculates a parallax offset based on distance from screen center and individual star speed
        let shiftX = (mouseX - window.innerWidth / 2) * star.speed * -1;
        let shiftY = (mouseY - window.innerHeight / 2) * star.speed * -1;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        // Draws each star as a circle shifted dynamically by the calculated mouse interaction vectors
        ctx.arc(star.x + shiftX, star.y + shiftY, star.size, 0, Math.PI * 2);
        ctx.fill();
        if (Math.random() > 0.98) star.opacity = Math.random();
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('resize', initStars);
initStars();
animateStars();

// --- PLANET LOGIC ---
const planetSpecs = [
    { name: "Mercury", file: "mercury.glb", radius: 200, speed: 0.018, size: 0.12 },
    { name: "Venus", file: "venus (2).glb", radius: 300, speed: 0.013, size: 0.18 },
    { name: "Earth", file: "earth (4).glb", radius: 420, speed: 0.01, size: 0.2 },
    { name: "Mars", file: "mars (1).glb", radius: 540, speed: 0.008, size: 0.15 },
    { name: "Jupiter", file: "jupiter.glb", radius: 720, speed: 0.005, size: 0.45 },
    { name: "Saturn", file: "saturn (17).glb", radius: 950, speed: 0.0035, size: 0.4 },
    { name: "Uranus", file: "urano.glb", radius: 1150, speed: 0.0025, size: 0.28 },
    { name: "Neptune", file: "neptune (2).glb", radius: 1350, speed: 0.002, size: 0.28 }
];

const universe = document.getElementById('universe');
const planetElements = [];

planetSpecs.forEach((spec) => {
    // Generates a visual HTML ring element representing the planet's fixed orbital pathway
    const orbit = document.createElement('div');
    orbit.className = 'orbit-path';
    orbit.style.width = `${spec.radius * 2}px`;
    orbit.style.height = `${spec.radius * 2}px`;
    universe.appendChild(orbit);

    // Instantiates the 3D custom component used to render and spin the GLTF planet model
    const model = document.createElement('model-viewer');
    model.setAttribute('src', `./image/${spec.file}`);
    model.setAttribute('auto-rotate', '');
    model.setAttribute('rotation-per-second', '40deg');
    model.setAttribute('interaction-prompt', 'none');
    model.setAttribute('shadow-intensity', '1.5');
    model.style.pointerEvents = "none";
    
    universe.appendChild(model);
    
    planetElements.push({
        el: model,
        spec: spec,
        angle: Math.random() * Math.PI * 2
    });
});

function animate() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    planetElements.forEach(p => {
        p.angle += p.spec.speed;
        
        // Circular orbit math
        const x = centerX + Math.cos(p.angle) * p.spec.radius;
        // The 0.25 multiplier creates the elliptical look matching the orbit-path rotation
        const y = centerY + Math.sin(p.angle) * p.spec.radius * 0.25;

        // Centers the planet container on its coordinates by offsetting half its width and height
        p.el.style.left = `${x - 150}px`;
        p.el.style.top = `${y - 150}px`;
        
        // Handle Z-index so planets pass behind/in front of the sun
        const zIndex = Math.sin(p.angle) > 0 ? 600 : 400;
        p.el.style.zIndex = zIndex;
        
        // Simulates perspective depth by scaling the model larger when closer to the screen foreground
        const depthScale = 0.85 + (Math.sin(p.angle) + 1) * 0.15;
        const finalScale = p.spec.size * depthScale;
        p.el.style.transform = `scale(${finalScale})`;
    });

    requestAnimationFrame(animate);
}

animate();
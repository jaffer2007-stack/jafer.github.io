// --- STARFIELD LOGIC ---
// Selecting the canvas element and getting its 2D rendering context for the stars
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let mouseX = 0;
let mouseY = 0;

function initStars() {
    // Synchronize the canvas dimensions with the current width and height of the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    // Loop four hundred times to populate the stars array with unique coordinate objects
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
    // Clear the entire canvas surface before drawing the next frame of the animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        // Calculate the parallax shift based on the current horizontal and vertical mouse position
        let shiftX = (mouseX - window.innerWidth / 2) * star.speed * -1;
        let shiftY = (mouseY - window.innerHeight / 2) * star.speed * -1;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x + shiftX, star.y + shiftY, star.size, 0, Math.PI * 2);
        ctx.fill();
        // Randomly update the star opacity to create a subtle twinkling effect in space
        if (Math.random() > 0.98) star.opacity = Math.random();
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('mousemove', (e) => {
    // Capture and store the mouse coordinates whenever the user moves their cursor
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Reinitialize the starfield positions whenever the browser window is resized by the user
window.addEventListener('resize', initStars);
initStars();
animateStars();

// --- TOGGLE LOGIC ---
const starToggle = document.getElementById('toggle-stars');
starToggle.addEventListener('click', () => {
    // Check the current opacity of the canvas to toggle its visibility on screen
    if (canvas.style.opacity === '0') {
        canvas.style.opacity = '1';
        starToggle.innerText = 'HIDE STARS';
    } else {
        canvas.style.opacity = '0';
        starToggle.innerText = 'SHOW STARS';
    }
});

// --- PLANET DATA ---
// An array containing information for each planet used to update the dynamic interface
const planets = [
    { 
        name: "MERCURY", tagline: "The Swift Planet",
        desc: "The smallest planet in our solar system and closest to the Sun.", 
        longDesc: "Mercury is the smallest planet in the Solar System. It has no atmosphere to retain heat.",
        model: "/image/mercury.glb" 
    },
    { 
        name: "VENUS", tagline: "The Morning Star",
        desc: "Venus is the hottest planet, and has a thick atmosphere.", 
        longDesc: "Venus is the second planet from the Sun. It is hot enough to melt lead.",
        model: "/image/venus (2).glb" 
    },
    { 
        name: "EARTH", tagline: "The Blue Planet",
        desc: "Learn more about this fascinating miracle that we call our home.", 
        longDesc: "Earth is our home planet. It is the only planet known to harbor life.",
        model: "/image/earth (4).glb" 
    },
    { 
        name: "MARS", tagline: "The Red Planet",
        desc: "The Red Planet is a dusty, cold, desert world.", 
        longDesc: "Mars is a cold desert world. It is half the size of Earth.",
        model: "/image/mars (1).glb" 
    },
    { 
        name: "JUPITER", tagline: "The Gas Giant",
        desc: "Jupiter is more than twice as massive than the other planets combined.", 
        longDesc: "Jupiter is the largest planet in the solar system.",
        model: "/image/jupiter.glb" 
    },
    { 
        name: "SATURN", tagline: "The Ringed Jewel",
        desc: "Adorned with a dazzling system of icy rings.", 
        longDesc: "Saturn is most famous for its spectacular ring system.",
        model: "/image/saturn (17).glb" 
    },
    { 
        name: "URANUS", tagline: "The Ice Giant",
        desc: "Uranus is the seventh planet from the Sun.", 
        longDesc: "Uranus is a cold ice giant that rotates at a nearly 90-degree angle.",
        model: "/image/urano.glb" 
    },
    { 
        name: "NEPTUNE", tagline: "The Windy Planet",
        desc: "Dark, cold and whipped by supersonic winds.", 
        longDesc: "Neptune is the eighth and farthest known solar planet from the Sun.",
        model: "/image/neptune (2).glb" 
    }
];

let currentIndex = 2;
const hero = document.getElementById('hero-container');
const nameEl = document.getElementById('planet-name');
const descEl = document.getElementById('planet-desc');
const modelEl = document.getElementById('planet-model');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const learnMoreBtn = document.getElementById('learn-more-btn');
const detName = document.getElementById('det-name');
const detTag = document.getElementById('det-tagline');
const detDesc = document.getElementById('det-long-desc');

function updatePlanet(index) {
    // Handle index overflow and underflow to ensure the planet selection loops infinitely
    if (index < 0) index = planets.length - 1;
    if (index >= planets.length) index = 0;
    currentIndex = index;

    // Remove the animation class to reset text reveal effects for the next planet
    hero.classList.remove('animate');
    void hero.offsetWidth; 

    setTimeout(() => {
        const planet = planets[currentIndex];
        // Populate the DOM elements with the specific data from the selected planet object
        nameEl.innerText = planet.name;
        descEl.innerText = planet.desc;
        detName.innerText = planet.name;
        detTag.innerText = planet.tagline;
        detDesc.innerText = planet.longDesc;
        modelEl.src = planet.model;
        modelEl.classList.add('model-fade');

        // Apply a unique orientation for specific ringed planets to display them more effectively
        if (planet.name === "SATURN" || planet.name === "URANUS") {
            modelEl.setAttribute('orientation', '90deg 0 8');
        } else {
            modelEl.setAttribute('orientation', '0 0 0');
        }

        // Calculate neighboring indices to update the labels on the left and right buttons
        let prevIdx = (currentIndex - 1 + planets.length) % planets.length;
        let nextIdx = (currentIndex + 1) % planets.length;
        prevBtn.innerText = "◀ " + planets[prevIdx].name + " ▶";
        nextBtn.innerText = "◀ " + planets[nextIdx].name + " ▶";

        hero.classList.add('animate');
    }, 50);

    // Fade the 3D model back into view once the glb file has finished loading
    modelEl.addEventListener('load', () => {
        modelEl.classList.remove('model-fade');
    }, { once: true });
}

startBtn.addEventListener('click', () => {
    // Transition the layout into the detailed technical view by adding a CSS class
    document.body.classList.add('detailed-view');
});

backBtn.addEventListener('click', () => {
    // Return to the main overview screen by removing the detailed view CSS class
    document.body.classList.remove('detailed-view');
});

learnMoreBtn.addEventListener('click', () => {
    // Redirect the user to a specific timeline page based on the currently selected planet
    const planetName = planets[currentIndex].name.toLowerCase();
    window.location.href = `html/timeline.html?planet=${planetName}`;
});

// Event listeners for the side navigation labels to cycle through the planetary system
prevBtn.addEventListener('click', () => updatePlanet(currentIndex - 1));
nextBtn.addEventListener('click', () => updatePlanet(currentIndex + 1));

window.addEventListener('load', () => {
    // Parse the URL parameters to determine if a specific planet should be loaded initially
    const urlParams = new URLSearchParams(window.location.search);
    const planetParam = urlParams.get('planet');
    if (planetParam) {
        const foundIndex = planets.findIndex(p => p.name.toLowerCase() === planetParam.toLowerCase());
        if (foundIndex !== -1) currentIndex = foundIndex;
    }
    updatePlanet(currentIndex);
});
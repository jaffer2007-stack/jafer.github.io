const planetData = {
  mercury: {
    title: "Mercury Timeline",
    bgColor: "#E5E5E5",
    scrollColors: ["#E7D3A0", "#828282"],
    milestones: [
      { h: "The Beginning", p: "Formed 4.5 billion years ago, Mercury is the smallest planet and the closest to our Sun.", img: "/image/mercury.png" },
      { h: "Extreme Climate", p: "Lacking an atmosphere to trap heat, it swings from 430°C in the day to -180°C at night.", img: "/image/mercury1.png" },
      { h: "The Iron World", p: "Modern scans reveal a massive iron core, making it the second densest planet after Earth.", img: "/image/mercury2.png" }
    ]
  },
  venus: {
    title: "Venus Timeline",
    bgColor: "#F9EBEA",
    scrollColors: ["#F5B7B1", "#E7A56F"],
    milestones: [
      { h: "Earth's Twin", p: "Venus formed with a similar size and rocky composition to Earth billions of years ago.", img: "/image/Earth's Twin.png" },
      { h: "Greenhouse Trap", p: "A thick CO2 atmosphere trapped heat, making it the hottest planet in the solar system.", img: "/image/Greenhouse Trap.png" },
      { h: "Modern Hellscape", p: "Pressures are 90x Earth's, hot enough to melt lead. It remains a mystery under the clouds.", img: "/image/Modern Hellscape.png" }
    ]
  },
  earth: {
    title: "Earth Timeline",
    bgColor: "#D7DFF1",
    scrollColors: ["#9795B5", "#938DED", "#F5F2B8", "#bf8d83", "#F9DFC1", "#EBDEF0"],
    milestones: [
      { h: "Beginning of Time", p: "The universe forms after the Big Bang, around 13.8 billion years ago.", img: "/image/Big Bang.webp" },
      { h: "How it was Made", p: "Earth forms about 4.5 billion years ago from cosmic dust and gas, a swirling mass of molten rock.", img: "/image/Formation Earth.jfif" },
      { h: "First Life", p: "Simple organisms appear in the oceans about 3.5 billion years ago.", img: "/image/Unspecified.jpg" },
      { h: "Dinosaurs", p: "For 165 million years, these giant creatures dominated the land.", img: "/image/Dinosaurs.jpg" },
      { h: "Humans Appear", p: "Early humans evolve and begin to master tools and fire.", img: "/image/cave paintings 1.jpg" },
      { h: "Modern Day", p: "Technology and global civilization transform Earth at an unprecedented pace.", img: "/image/rocket_launch.jpg" }
    ]
  },
  mars: {
    title: "Mars Timeline",
    bgColor: "#F0E0BB",
    scrollColors: ["#E6B0AA", "#EBB697"],
    milestones: [
      { h: "Ancient Rivers", p: "4 billion years ago, Mars was likely warm and wet with a much thicker atmosphere.", img: "/image/Ancient Rivers.png" },
      { h: "The Great Drying", p: "The loss of its magnetic field allowed solar winds to strip the planet of its water.", img: "/image/The Great Drying.png" },
      { h: "Robotic Frontier", p: "Mars is now inhabited solely by robots as we prepare for the first human footprints.", img: "/image/Robotic Frontier.png" }
    ]
  },
  jupiter: {
    title: "Jupiter Timeline",
    bgColor: "#FFDCBC",
    scrollColors: ["#E4C4A7", "#A7B2C4"],
    milestones: [
      { h: "The First Giant", p: "The first planet to form, capturing most of the gas left over after the Sun was born.", img: "/image/The First Giant.png" },
      { h: "Eternal Storm", p: "The Great Red Spot, a storm twice the size of Earth, has raged for hundreds of years.", img: "/image/Red Spot.png" },
      { h: "The Guardian", p: "Jupiter's massive gravity acts as a shield, deflecting comets away from the inner planets.", img: "/image/The Guardian 1.png" }
    ]
  },
  saturn: {
    title: "Saturn Timeline",
    bgColor: "#FCF3CF",
    scrollColors: ["#F0E0BB", "#D8C087"],
    milestones: [
      { h: "The Gas King", p: "Formed 4.5 billion years ago as a massive ball of hydrogen and helium.", img: "/image/The Gas King.png" },
      { h: "The Ring System", p: "Comets and shattered moons created the most spectacular ring system in the galaxy.", img: "/image/The Ring System.png" },
      { h: "The Moon Colony", p: "With over 140 moons, Saturn is a mini-solar system of its own, rich with icy secrets.", img: "/image/mini-solar-system (2).png" }
    ]
  },
  uranus: {
    title: "Uranus Timeline",
    bgColor: "#EBF5FB",
    scrollColors: ["#AED6F1", "#6EBDBB"],
    milestones: [
      { h: "Tilted Origin", p: "An ancient collision likely knocked Uranus on its side early in its formation.", img: "/image/Uranus on its side.png" },
      { h: "The Ice Giant", p: "Unlike Jupiter, it's mostly made of icy materials like water, methane, and ammonia.", img: "/image/The Ice Giant.png" },
      { h: "Coldest World", p: "Uranus holds the record for the coldest temperatures ever measured in our system.", img: "/image/Coldest World.png" }
    ]
  },
  neptune: {
    title: "Neptune Timeline",
    bgColor: "#B6C6E9",
    scrollColors: ["#A9CCE3", "#849FC4"],
    milestones: [
      { h: "Far Frontier", p: "The most distant planet from the Sun, Neptune was found via math before it was seen.", img: "/image/Far Frontier 2.jpg" },
      { h: "Supersonic Wind", p: "Neptune features winds faster than the speed of sound—the fiercest in the solar system.", img: "/image/neptune.png" },
      { h: "Dark Spots", p: "Modern observations show shifting dark storms that appear and disappear over years.", img: "/image/dark spots.png" }
    ]
  }
};

// Render Logic
const urlParams = new URLSearchParams(window.location.search);
const currentPlanet = urlParams.get('planet') || 'earth';
const data = planetData[currentPlanet] || planetData.earth;

document.getElementById('page-title').innerText = data.title;
document.body.style.backgroundColor = data.bgColor;

const textCol = document.getElementById('text-content');
const imgCol = document.getElementById('image-content');

data.milestones.forEach((m, i) => {
  textCol.innerHTML += `
    <div class="arch__info">
      <div class="content">
        <h2 class="header">${m.h}</h2>
        <p class="desc">${m.p}</p>
        <a href="../index.html?planet=${currentPlanet}" class="learn-more">Explore Others</a>
      </div>
    </div>`;

  imgCol.innerHTML += `
    <div class="img-wrapper" data-index="${data.milestones.length - i}">
      <img src="${m.img}" alt="${m.h}">
    </div>`;
});

// Animations
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.querySelectorAll(".img-wrapper").forEach((el) => {
  el.style.zIndex = el.getAttribute("data-index");
});

const imgs = gsap.utils.toArray(".img-wrapper img");
const wrappers = gsap.utils.toArray(".img-wrapper");

ScrollTrigger.matchMedia({
  "(min-width: 769px)": function() {
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".arch",
        start: "top top",
        end: "bottom bottom",
        pin: ".arch__right",
        scrub: true,
      }
    });

    imgs.forEach((img, index) => {
      if (index < imgs.length - 1) {
        mainTimeline.to(img, {
          clipPath: "inset(0px 0px 100% 0px)",
          duration: 1,
          ease: "none"
        }, index); 
        
        mainTimeline.to("body", {
          backgroundColor: data.scrollColors[index],
          duration: 0.5
        }, index);
      }
    });

    window.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth) - 0.5;
      const yPos = (clientY / window.innerHeight) - 0.5;

      gsap.to(wrappers, {
        duration: 0.8,
        rotationY: xPos * 20,
        rotationX: yPos * -20,
        ease: "power2.out",
      });

      gsap.to(".cursor", {
        duration: 0.3,
        x: clientX - 10,
        y: clientY - 10,
        ease: "power2.out"
      });
    });
  }
});
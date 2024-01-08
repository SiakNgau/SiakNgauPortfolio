/*ANIME.JS */

/*PROFILE SECTION */

document.addEventListener("DOMContentLoaded", function () {
  const profileAnimation = anime({
    targets: "#profile",
    opacity: [0, 1],
    translateY: [-150, 0],
    duration: 700,
    easing: "easeInOutQuad",
  });
});

/*ABOUT SECTIONS  */

document.addEventListener("DOMContentLoaded", function () {
  // Select the elements to be animated
  var aboutAnimation = document.querySelector(".about-animation");

  // Function to check if an element is in the viewport
  const isInViewport = (elem) => {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  // Stagger the appearance of the text container in the "About" section
  const aboutSection = document.getElementById("about");
  const textContainer = document.querySelector(".about-details-container");

  window.addEventListener("scroll", function () {
    if (isInViewport(aboutSection)) {
      anime({
        targets: textContainer,
        opacity: [0, 1],
        translateY: [100, 0],
        duration: 700,
        easing: "easeInOutQuad",
        delay: anime.stagger(100),
      });
    }
  });
  // Function to handle the scroll event
  function handleScroll() {
    if (isInViewport(aboutAnimation)) {
      // Start the anime.js stagger animation
      anime({
        targets: ".about-animation .details-container",
        translateY: [-100, 0],
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 700,
        delay: anime.stagger(100),
      });

      // Remove the scroll event listener after animation is triggered to avoid unnecessary calls
      window.removeEventListener("scroll", handleScroll);
    }
  }

  // Attach the scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Trigger the animation once on page load (in case the "About Me" section is already in the viewport)
  handleScroll();
});

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* Typing Effect */

let isDeveloper = true; // Initial state

function startTypewriterEffect() {
  const textContainer = document.querySelector(".section__text__p2");
  const developerText = "Developer";
  const designerText = "Designer";

  setInterval(() => {
    let newText;
    let textColor;
    const darkModeStatus = localStorage.getItem("darkMode");

    if (darkModeStatus === "enabled") {
      newText = isDeveloper ? designerText : developerText;
      textColor = isDeveloper ? "#E0D6FF" : "#FFDBF2";
    } else {
      newText = isDeveloper ? designerText : developerText;
      textColor = isDeveloper ? "#D5B8FF" : "#FFADED";
    }

    typewriterEffect(textContainer, newText, textColor);
    isDeveloper = !isDeveloper;
  }, 3000); // Change text every 3 seconds
}

function typewriterEffect(element, text, color) {
  let i = 0;
  const speed = 100; // Typing speed in milliseconds

  function type() {
    if (i < text.length) {
      element.innerHTML += `<span style="color: ${color};">${text.charAt(
        i
      )}</span>`;
      i++;
      setTimeout(type, speed);
    }
  }

  element.innerHTML = ""; // Clear existing text
  type();
}

// Start the typewriter effect when the page loads
document.addEventListener("DOMContentLoaded", startTypewriterEffect);

/* CURSOR EFFECT */

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ff7f7f",
  "#ff818a",
  "#ff8494",
  "#ff889f",
  "#ff8baa",
  "#ff8fb4",
  "#ff94be",
  "#ff98c8",
  "#ff9dd2",
  "#ffa2db",
  "#ffa8e4",
  "#ffaded",
  "#fcaeef",
  "#f8aff1",
  "#f4b0f4",
  "#f1b1f5",
  "#edb2f7",
  "#e9b3f9",
  "#e5b4fa",
  "#e1b5fc",
  "#ddb6fd",
  "#d9b7fe",
  "#d5b8ff",
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

function toggleCursorVisibility() {
  const body = document.body;
  body.classList.toggle("hide-cursor");
}

// Call this function when you want to hide/show the cursor
toggleCursorVisibility();

/* CAROUSEL */

const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  // showing and hiding prev/next icon according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
    // if clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});

const autoSlide = () => {
  // if there is no image left to scroll then return from here
  if (
    carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
    carousel.scrollLeft <= 0
  )
    return;

  positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
  let firstImgWidth = firstImg.clientWidth + 14;
  // getting difference value that needs to add or reduce from carousel left to take middle img center
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    // if user is scrolling to the right
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  // if user is scrolling to the left
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  // updatating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  // scrolling images/carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

/* DARK MODE */

// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem("darkMode");

const darkModeToggle = document.querySelector("#dark-mode-toggle");

const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add("darkmode");
  // 2. Update darkMode in localStorage
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove("darkmode");
  // 2. Update darkMode in localStorage
  localStorage.setItem("darkMode", null);
};

// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === "enabled") {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener("click", () => {
  // get their darkMode setting
  darkMode = localStorage.getItem("darkMode");

  // if it not current enabled, enable it
  if (darkMode !== "enabled") {
    enableDarkMode();
    // if it has been enabled, turn it off
  } else {
    disableDarkMode();
  }
});

/* BUTTON EFFECT */

const root = document.querySelector(":root");
const button = document.querySelector(".button");

button.addEventListener("mousemove", (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  root.style.setProperty("--gradient-pos-x", `${x}%`);
  root.style.setProperty("--gradient-pos-y", `${y}%`);
});

button.addEventListener("mouseout", () => {
  root.style.setProperty("--gradient-pos-x", `50%`);
  root.style.setProperty("--gradient-pos-y", `50%`);
});

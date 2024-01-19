/*ANIME.JS */

/*PROFILE SECTION */

document.addEventListener("DOMContentLoaded", function () {
  const profileAnimation = anime({
    targets: "#profile",
    opacity: [0, 1],
    translateY: [-200, 0],
    duration: 1200,
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

// const root = document.querySelector(":root");
// const button = document.querySelector(".button");

// button.addEventListener("mousemove", (e) => {
//   const rect = e.target.getBoundingClientRect();
//   const x = ((e.clientX - rect.left) / rect.width) * 100;
//   const y = ((e.clientY - rect.top) / rect.height) * 100;

//   root.style.setProperty("--gradient-pos-x", `${x}%`);
//   root.style.setProperty("--gradient-pos-y", `${y}%`);
// });

// button.addEventListener("mouseout", () => {
//   root.style.setProperty("--gradient-pos-x", `50%`);
//   root.style.setProperty("--gradient-pos-y", `50%`);
// });

// Select all radio buttons
const radios = document.querySelectorAll('input[type="radio"]');
let currentRadioId = null;

// Function to handle radio button change
function handleRadioChange(event) {
  const radioButton = event.target;
  currentRadioId = radioButton.id;

  // Determine which projectInfoContainer to update based on radio button id
  let projectTitle, projectDesc;
  if (radioButton.name === "slide-c") {
    projectTitle = document.querySelector("#projectTitle1");
    projectDesc = document.querySelector("#projectDesc1");
  } else if (radioButton.name === "slide-d") {
    projectTitle = document.querySelector("#projectTitle2");
    projectDesc = document.querySelector("#projectDesc2");
  }

  // Assign specific titles and descriptions to each radio button
  if (projectTitle && projectDesc) {
    if (radioButton.name === "slide-c") {
      switch (
        radioButton.id // Use id instead of name
      ) {
        case "c1":
          projectTitle.innerHTML = "<br>E-Commerce Website";
          projectDesc.innerHTML =
            "<br>Made using Adobe XD,<br>a seamless platform that showcases different shoes,<br>to make online shopping experience enjoyable and efficient.<br>The aesthetic appeal is crucial in attracting customers.<br>From color schemes to typography,<br>every element was carefully chosen to resonate with the<br>brand identity and create a cohesive visual experience.<br><br><br>Click <a href='https://xd.adobe.com/view/a5d57b80-5bc9-4473-896f-338d3055b061-f086/?fullscreen' style='color: #ff7750'>here</a> to view the prototype.";
          break;
        case "c2":
          projectTitle.innerHTML = "<br>Ice-cream shop namecard";
          projectDesc.innerHTML =
            "<br>Made using Adobe Illustrator,<br>the namecard is designed to be simple and minimalistic.<br>The color scheme is inspired by the colors of ice-cream.";
          break;
        case "c3":
          projectTitle.innerHTML = "<br>Creating my own font";
          projectDesc.innerHTML =
            "<br>Made using Adobe illustrator,<br>Underwater / Coral theme font ";
          break;
        case "c4":
          projectTitle.innerHTML = "<br>Fitness / Tracker App";
          projectDesc.innerHTML =
            "<br>Made with Adobe XD,<br>an app that helps users to track their fitness progress.<br>It is designed to be simple and easy to use.<br><br><br>Click <a href='https://xd.adobe.com/view/0c07e591-a95f-4515-97fc-a5bc374f1fcb-5954/' style='color: #ff7750'>here</a> to view the prototype.";
          break;
        case "c5":
          projectTitle.innerHTML = "<br>Online Toy Store";
          projectDesc.innerHTML =
            "<br>Made using Adobe XD,<br>an online toy store that sells toys for kids<br>from the age of 3 to 12.<br><br><br>Click <a href='https://xd.adobe.com/view/9dd9a964-3a29-4e85-a873-b01699b55409-c88a/?fullscreen' style='color: #ff7750'>here</a> to view the prototype.";
          break;
        case "c6":
          projectTitle.innerHTML = "<br>Playing with typography";
          projectDesc.innerHTML =
            "<br>using text to make shapes and turning them into food";
          break;
      }
    } else if (radioButton.name === "slide-d") {
      switch (radioButton.id) {
        case "d1":
          projectTitle.innerHTML = "<br>Travel / Tourism Website";
          projectDesc.innerHTML =
            "<br>Made using HTML, CSS, Javascript<br>responsive travel website showcasing different countries<br>and the different activities/attractions to visit.";
          break;
        case "d2":
          projectTitle.innerHTML = "<br>Movie Website";
          projectDesc.innerHTML =
            "<br>Rotten Potatoes, a movie website crafted with<br>NetBeans and XAMPP,<br>prioritizing practicality over aesthetics,<br>this project seamlessly blends PHP, CSS, HTML, and MySQL<br>to deliver a straightforward yet effective movie-centric experience.";
          break;
        case "d3":
          projectTitle.innerHTML = "<br>Supermarket Website";
          projectDesc.innerHTML =
            "<br>SuperMarket is a dynamic supermarket website designed to<br>streamline the grocery shopping experience for users.<br>Crafted using PHP, HTML, and CSS,<br>this platform emphasizes user-friendly navigation<br>and a visually appealing interface.";
          break;
        case "d4":
          projectTitle.innerHTML = "<br>Weather App";
          projectDesc.innerHTML =
            "<br>Made with Java,<br>using information from an official weather API<br>to display the weather of a specific location.";
          break;
        case "d5":
          projectTitle.innerHTML = "<br>Bill Calculator App";
          projectDesc.innerHTML =
            "<br>Made with Java,<br>an app that calculates the total bill of a restaurant.<br>It also allows users to split the bill<br>and calculate service and GST charges.<br>";
          ``;
          break;
        case "d6":
          projectTitle.innerHTML = "<br>Portfolio Website";
          projectDesc.innerHTML =
            "<br>Made with HTML, CSS, Javascript<br>Portfolio website to showcase my projects and skills.<br>Consists of a light and dark mode.<br>";
          break;
      }
    }
  }
}

// Add event listener to each radio button
radios.forEach((radio) => radio.addEventListener("change", handleRadioChange));

// MODAL

// Get the modal and the modal content
var modal = document.getElementById("myModal");
var modalContent = document.getElementById("modal-content");

// Get the "More Info" links
var moreInfoLinks = document.querySelectorAll(".more-info");

// Add event listener to each "More Info" link
// Add event listener to each "More Info" link
moreInfoLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    // Prevent the default action
    event.preventDefault();

    // Show the modal
    modal.style.display = "block";

    // Clear previous images
    modalContent.innerHTML = "";

    // Get the images corresponding to the current radio ID
    // This assumes that the images are stored in an object called images
    var images = {
      c1: ["images/xd hifi.png", "images/xd lofi.png"], // replace with your actual image URLs
      c2: ["images/design-namecard.png", "images/NamecardSketch2.png"], // replace with your actual image URLs
      c3: ["images/design-typography.png"], // replace with your actual image URLs
      c4: ["images/lofi-bananaza.png", "images/bababa.png"], // replace with your actual image URLs
      c5: ["images/HOME.png", "images/Shop Boys.png", "images/Our Story.png"], // replace with your actual image URLs
      c6: ["images/design-icecream.jpg"], // replace with your actual image URLs
      d1: ["images/wx.mp4"], // replace with your actual image URLs
      d2: ["images/movie.mp4"],
      d3: ["images/supermarket.mp4"],
      d4: ["images/code-weatherApp.png"],
      d5: ["images/code-billCalculator.png"],
      d6: ["images/light-portfolio.png", "images/dark-porfolio.png"],
    };
    var radioImages = images[currentRadioId];

    // Add the images or videos to the modal content
    radioImages.forEach((media) => {
      if (media.endsWith(".mp4")) {
        // Create a video element for .mp4 files
        var video = document.createElement("video");
        video.src = media;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.style.width = "100%";
        video.style.height = "auto";
        modalContent.appendChild(video);
      } else {
        // Create an img element for other files
        var img = document.createElement("img");
        img.src = media;
        img.style.width = "100%";
        img.style.height = "auto";
        modalContent.appendChild(img);
      }
    });
  });
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

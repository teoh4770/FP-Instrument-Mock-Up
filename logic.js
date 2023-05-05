// Variables
const COLUMNS = 3;
const ANIMATIONCHANGED = 1500; //1.5s

// Selectors
const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const navBtn = document.querySelector(".navbar__btns");
const gridItems = document.getElementsByClassName("grid-item");
const toggleBtn = document.getElementById("toggle");
const logos = Array.from(document.getElementsByClassName("grid-logo"));

// background toggle
// mix-blend-mode
toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("light-mode");

  // blend in the logo color with the background
  if (document.documentElement.classList.contains("light-mode")) {
    logos.forEach((logo) => {
      logo.style.mixBlendMode = "difference";
    });
  } else {
    logos.forEach((logo) => {
      logo.style.mixBlendMode = "unset";
    });
  }

  // sound
  const clickSound = document.getElementById("clickSound");

  if (!clickSound) return;
  clickSound.currentTime = 0;
  clickSound.play();
});

// animation logos
/**
 * 1. get all the logos, and turns it into arrays
 * 2. assign index to all of them
 * 3. apply and remove the classes respectively with setInterval
 */
// flags
let flag = 0;
let groupIndex = 0;

logos.forEach((logo, index) => {
  if (index % COLUMNS === 0) {
    logo.dataset.id = 0;
  } else if (index % COLUMNS === 1) {
    logo.dataset.id = 1;
  } else if (index % COLUMNS === 2) {
    logo.dataset.id = 2;
  }
});

let animatedLogos = null;

animate();

setInterval(() => {
  animate();
}, ANIMATIONCHANGED);

function animate() {
  animatedLogos = getGroup(logos, groupIndex);
  addClassToList(animatedLogos, "animation");
  animatedLogos[0].addEventListener("animationend", animationFunction);
}

function animationFunction() {
  // as the animation has 2 parts, so animationend would trigger twice if i don't put flag on it
  flag += 1;
  if (flag === 2) {
    console.log("reaching");
    // reset the flag
    flag = 0;
    // remove the animation
    removeClassFromList(animatedLogos, "animation");

    // update the group to be animated, reset if reaching the limit
    groupIndex += 1;
    groupIndex = resetIndex(groupIndex, COLUMNS);

    // remove the eventlistener from the element
    animatedLogos[0].removeEventListener("animationend", animationFunction);
  }
}

// animation function
function getGroup(elements, index) {
  return elements.filter((element) => element.dataset.id === String(index));
}

function addClassToList(elements, className) {
  elements.forEach((e) => {
    e.classList.add(className);
  });
}

function removeClassFromList(elements, className) {
  elements.forEach((e) => {
    e.classList.remove(className);
  });
}

function resetIndex(currentIndex, limit) {
  if (currentIndex === limit) {
    return 0;
  }
  return currentIndex;
}

// navbar

navBtn.addEventListener("click", () => {
  console.log("click");
  [menu, closeBtn, menuBtn].forEach((e) => {
    e.classList.toggle("not-sr-only");
  });
  [menuBtn].forEach((e) => {
    e.classList.toggle("sr-only");
  });
});

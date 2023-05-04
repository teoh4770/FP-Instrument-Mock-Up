const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const navBtn = document.querySelector(".navbar__btns");

// Array.from(
//   document.getElementsByClassName("menu-item")).forEach((item, index) => {
//     item.onmouseover = () => {
//       menu.dataset.activeIndex = index;
//     };
//   }
// );

// Array.from(document.getElementsByClassName("menu-item")).forEach(
//   (item, index) => {
//     item.onmouseover = () => {
//       menu.dataset.activeIndex = index;
//     };
//   }
// );

navBtn.addEventListener("click", () => {
  console.log("click");
  [menu, closeBtn, menuBtn].forEach((e) => {
    e.classList.toggle("not-sr-only");
  });
  menuBtn.classList.toggle("sr-only");
});

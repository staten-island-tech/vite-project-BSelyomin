import * as module from "../styles/style.css";
import { menu } from "./menu.js";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

let theme = "foodLight";

const window = {
  view: document.getElementById("view"),
  bar: document.querySelector(".bar"),
  tab: document.querySelectorAll(".tab"),
  menu: document.querySelector(".menu"),
  logoPic: document.querySelectorAll(".logoPic"),
  food: document.querySelectorAll(".food"),
};

window.view.addEventListener("click", function () {
  console.log(this.style.backgroundImage);
  if (this.style.backgroundImage == 'url("../images/sun.png")') {
    this.style.backgroundImage = "url('../images/moon.png')";
    document.body.classList = "dark";
    window.bar.style.backgroundColor = "rgb(0, 33, 55)";
    window.bar.style.borderColor = "black";
    window.tab.forEach((tab) => {
      tab.style.borderColor = "black";
    });
    window.logoPic.forEach((pic) => {
      pic.src = "../images/logo-blue.png";
    });
    theme = "foodDark";
    createMenu();
  } else {
    this.style.backgroundImage = 'url("../images/sun.png")';
    document.body.classList = ["light"];
    console.log(window.tab);
    window.bar.style.backgroundColor = "rgb(255, 218, 185)";
    window.bar.style.borderColor = "rgb(205, 180, 219)";
    window.tab.forEach((pic) => {
      pic.style.borderColor = "rgb(205, 180, 219)";
    });
    window.logoPic.forEach((pic) => {
      pic.src = "../images/logo-red.png";
    });
    theme = "foodLight";
    createMenu();
  }
});

document.body.onload = function () {
  window.view.style.backgroundImage = "url('../images/sun.png')";
  createMenu();
};

function createMenu() {
  window.menu.replaceChildren();

  menu.forEach((item) => {
    window.menu.insertAdjacentHTML(
      "afterbegin",
      `<div class="food ${theme}">
        <p1 class="name">${item.dish}</p1>
        <p2 class="description">${item.description}</p2>
        <p3 class="price">$${item.price}</p3>
        <img src="${item.image}" class="foodImg">`
    );
  });
}

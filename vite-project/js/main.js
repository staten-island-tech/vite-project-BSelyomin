import { menu } from "./menu.js";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

let theme = "foodLight";
let dayToday = 0;
let dailyMenu = 0;

const window = {
  view: document.getElementById("view"),
  bar: document.querySelector(".bar"),
  tab: document.querySelectorAll(".tab"),
  menu: document.querySelector(".menu"),
  logoPic: document.querySelector(".logoPic"),
  food: document.querySelectorAll(".food"),
  meatTitle: document.querySelector(".meatTitle"),
  meatOption: document.querySelectorAll(".selectopt"),
  meatSelect: document.querySelector('input[name="test"]:checked').value,
  root: document.querySelector(":root"),
  showVeg: document.querySelector(".showVeg"),
  showFull: document.querySelector(".showFull"),
};

window.view.addEventListener("click", function () {
  if (this.style.backgroundImage == 'url("../images/sun.png")') {
    this.style.backgroundImage = "url('../images/moon.png')";
    window.logoPic.src = "../images/logo-blue.png";

    document.body.classList = "dark";
    theme = "foodDark";
    createMenu();
  } else {
    this.style.backgroundImage = 'url("../images/sun.png")';
    window.logoPic.src = "../images/logo-red.png";

    document.body.classList = ["light"];
    theme = "foodLight";
    createMenu();
  }
});

document.body.onload = function () {
  window.view.style.backgroundImage = "url('../images/sun.png')";
  createMenu();
  update();
};

window.showVeg.addEventListener("click", function () {
  sortMenu("no meat");
});

window.meatOption.forEach((input) =>
  input.addEventListener("click", function () {
    if (this.value == "all") {
      createMenu();
    } else {
      sortMenu(this.value);
    }
  })
);

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

function sortMenu(meatType) {
  let sortedMenu = menu.filter((meat) => meat.meat.includes(meatType));

  window.menu.replaceChildren();
  sortedMenu.forEach((food) => {
    window.menu.insertAdjacentHTML(
      "afterbegin",
      `<div class="food ${theme}">
          <p1 class="name">${food.dish}</p1>
          <p2 class="description">${food.description}</p2>
          <p3 class="price">$${food.price}</p3>
          <img src="${food.image}" class="foodImg">`
    );
  });
}

window.showFull.addEventListener("click", function () {
  deals("buttonPress");
});

setInterval(update, 10000);

function update() {
  console.log("running");
  let date = new Date();
  if (dayToday != date.getDay()) {
    dayToday = date.getDay();
    dailyMenu = menu.filter((item) => item.days.includes(dayToday));
    console.log(freeProduct(dailyMenu));
    let sale = dailyMenu.map((item) => item.price / 2);
    for (let i = 0; i < dailyMenu.length; i++) {
      dailyMenu[i].price = sale[i];
    }
    createDayMenu();
  }
}

const freeProduct = function (products) {
  return products.map((item) => {
    return Object.assign(item.price / 2);
  });
};

function deals(change) {
  if (change == "buttonPress") {
    if (window.showFull.innerHTML == "Show Full Menu") {
      window.showFull.innerHTML = "Show Daily Deals";
      createMenu();
    } else {
      window.showFull.innerHTML = "Show Full Menu";
      createDayMenu();
    }
  } else {
    createDayMenu();
  }
}

function createDayMenu() {
  console.log(1);

  window.menu.replaceChildren();
  dailyMenu.forEach((item) => {
    window.menu.insertAdjacentHTML(
      "afterbegin",
      `<div class="food ${theme}">
          <p1 class="name">${item.dish}</p1>
          <p2 class="description">${item.description}</p2>
          <strike>$${item.price * 2}</strike>
          <p3 class="price">$ ${item.price}</p3>
          <img src="${item.image}" class="foodImg">`
    );
  });
}

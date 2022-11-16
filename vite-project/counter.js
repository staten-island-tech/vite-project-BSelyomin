export function setupCounter(element) {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
}

let array = ["touch", "touch", "touch", "touch"];

let touch = "touch";

for (let hi of array) {
  console.log(`${entry.events.length} events.`);
}

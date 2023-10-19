// Add your code here

const text = document.querySelector("#content");
let textString = text.textContent;

addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
  let user_input;
  if (e.key !== "Backspace") {
    user_input = document.querySelector("input").value + e.key;
  } else {
    user_input = document.querySelector("input").value;
    user_input = user_input.slice(0, -1);
  }
  console.log(user_input);
  user_input = user_input.trim();
  let textString = text.textContent;
  textString = textString.replace(
    new RegExp(user_input, "g"),
    (match) => `<span class="bg-warning">${match}</span>`
  );
  text.innerHTML = textString;
}

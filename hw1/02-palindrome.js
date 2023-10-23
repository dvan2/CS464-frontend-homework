const elem = document.querySelector("input");
const resultElem = document.querySelector("div:empty");

elem.addEventListener("input", handleInput);

function handleInput() {
  if (elem.validity.badInput || elem.value < 0) {
    resultElem.style.color = "red";
    resultElem.innerHTML = "ERROR.  Please enter only numbers.";
    return;
  }

  const user_input = elem.value;
  if (user_input === "") {
    resultElem.innerHTML = "";
    return;
  }

  if (isPalinDrome(user_input)) {
    resultElem.style.color = "green";
    resultElem.innerHTML = "Yes. This is a palindrome";
  } else {
    resultElem.style.color = "red";
    resultElem.innerHTML = "Not palindrome. Try again.";
  }
}

function isPalinDrome(s) {
  let first = 0;
  let last = s.length - 1;
  while (first <= last) {
    if (s[first] !== s[last]) {
      return false;
    }
    first += 1;
    last -= 1;
  }

  return true;
}

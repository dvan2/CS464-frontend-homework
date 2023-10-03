const elem = document.querySelector("input");
const resultElem = document.querySelector("div:empty");

elem.addEventListener("input", handleInput);

let user_input;
function handleInput() {
  user_input = document.querySelector("[type]").value;
  if (!isValidNumber(user_input)) {
    console.log(`valid: ${isValidNumber(user_input)}`);
    resultElem.style.color = "red";
    resultElem.innerHTML = "ERROR.  Please enter only numbers.";
    return;
  }
  if (isPalinDrome(user_input)) {
    resultElem.style.color = "green";
    resultElem.innerHTML = "Yes. This is a palindrome";
  } else {
    resultElem.style.color = "red";
    resultElem.innerHTML = "No. Try again.";
  }
}

function isValidNumber(s) {
  //using regex to check if it's 0-9
  const regex = new RegExp(/^\d+$/);
  return regex.test(s);
}

function isPalinDrome(s) {
  let first = 0;
  let last = s.length - 1;
  while (first <= last) {
    if (s[first] != s[last]) {
      return false;
    }
    first++;
    last--;
  }
  return true;
}

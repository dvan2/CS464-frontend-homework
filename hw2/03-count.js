// Add your code here

const text = document.querySelector('#content');
let textString = text.textContent;

addEventListener('keydown', searchForMatch);

function searchForMatch(e) {
  let user_input;
  if (validCharacter(e.keyCode)) {
    console.log(validCharacter(e.key));
    user_input = document.querySelector('input').value + e.key;
  } else {
    return;
  }

  if (e.key === 'Backspace') {
    user_input = document.querySelector('input').value;
    user_input = user_input.slice(0, -1);
  }
  user_input = user_input.trim();
  let textString = text.textContent;
  textString = textString.replace(
    new RegExp(user_input, 'g'),
    (match) => `<span class="bg-warning">${match}</span>`
  );
  text.innerHTML = textString;
}

//https://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
function validCharacter(keycode) {
  var valid =
    keycode === 8 ||
    (keycode > 47 && keycode < 58) || // number keys
    keycode == 32 ||
    keycode == 13 || // spacebar & return key(s) (if you want to allow carriage returns)
    (keycode > 64 && keycode < 91) || // letter keys
    (keycode > 95 && keycode < 112) || // numpad keys
    (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
    (keycode > 218 && keycode < 223); // [\]' (in order)

  return valid;
}

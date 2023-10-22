// Add your code here

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fullName = document.querySelector('#nameInput').value;
  console.log(`Full Name: ${fullName}`);
  const emailInput = document.querySelector('#emailInput').value;
  console.log(`Email: ${emailInput}`);
  const registrationInput = document.querySelector('#userRegistration').value;
  console.log(`Status: ${registrationInput}`);
  const pLanguages = document.querySelector('#pLanguages').checked;
  const oSystems = document.querySelector('#operatingSystems').checked;
  const fullStack = document.querySelector('#fullStack').checked;
  console.log('Courses Taken: ');
  if (!pLanguages && !oSystems && !fullStack) {
    console.log('None');
  }
  if (pLanguages === true) {
    console.log('Programming Languages');
  }
  if (oSystems === true) {
    console.log('Operating Systems');
  }
  if (fullStack === true) {
    console.log('Full Stack Web Development');
  }
  const message = document.querySelector('textarea').value;
  console.log(`Comments: ${message}`);
});

// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';
const root = document.querySelector('#root');

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.map((character) =>
      createCharacter(character.imageUrl, character.fullName, character.title)
    );
  });

function createCharacter(img, fullName, title) {
  //container for character elements
  const container = document.createElement('div');
  container.className = 'characterContainer';

  //image
  const imgElem = document.createElement('img');
  imgElem.src = img;
  imgElem.alt = `An image of ${fullName}`;

  //Text elements
  const nameElem = document.createElement('div');
  nameElem.className = 'fullName';
  nameElem.textContent = `${fullName}`;

  const titleElem = document.createElement('div');
  titleElem.className = 'title';
  titleElem.textContent = `${title}`;

  container.append(imgElem);
  container.append(nameElem);
  container.append(titleElem);
  root.append(container);
}

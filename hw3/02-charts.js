const backgroundColors = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(199, 199, 199, 0.8)',
  'rgba(83, 102, 255, 0.8)',
  'rgba(40, 159, 64, 0.8)',
  'rgba(210, 199, 199, 0.8)',
  'rgba(78, 52, 199, 0.8)',
];

const borderColors = [
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(159, 159, 159, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(40, 159, 64, 1)',
  'rgba(210, 199, 199, 1)',
  'rgba(78, 52, 199, 1)',
];

// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';
const house = [];

function getThronesData(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(`Cannot fetch data ${error.message}`);
    });
}

function main() {
  getThronesData(url).then((data) => {
    data.forEach((character) => groupCharacters(character));
    fixAbnormalData();
    groupSingleCharacters();
    renderChart();
  });
}

main();

function groupCharacters(character) {
  const index = house.findIndex((element) => element.name === character.family);
  if (index !== -1) {
    house[index].count++;
    house[index].characterArr.push(character);
  } else {
    house.push({
      name: character.family,
      count: 1,
      characterArr: [character],
    });
  }
}

function fixAbnormalData() {
  moveCharacters('House Lannister', 'Lannister');
  moveCharacters('House Targaryen', 'Targaryan');
  moveCharacters('House Baratheon', 'Baratheon');
  moveCharacters('House Greyjoy', 'Greyjoy');
  moveCharacters('House Tyrell', 'Tyrell');
  moveCharacters('House Stark', 'Stark');

  // moveCharacters('Lorathi', 'Lora');
  //Unknowns
  moveCharacters('Unknown', 'Unkown');
  moveCharacters('Unknown', '');
  moveCharacters('Unknown', 'None');
}

function moveCharacters(houseName, name) {
  const index = house.findIndex((element) => element.name === name);
  const houseIndex = house.findIndex((element) => element.name === houseName);

  for (let i = 0; i < house[index].count; i++) {
    house[houseIndex].count++;
    house[houseIndex].characterArr.push(house[index].characterArr[i]);
  }

  //remove the element
  house.splice(index, 1);
}

//Group characters that are alone
function groupSingleCharacters() {
  const baelish = house.findIndex(
    (element) => element.name === 'House Baelish'
  );

  //Manually update a random alone characcter
  house.push({
    name: 'Alone',
    count: 1,
    characterArr: [house[baelish].characterArr[0]],
  });
  house.splice(baelish, 1);

  house.forEach((element) => {
    if (element.count === 1) {
      moveCharacters('Alone', element.name);
    }
  });

  //For some reason all the characters that have count === 1 are not moved :(
  moveCharacters('Alone', 'House Seaworth');
  moveCharacters('Alone', 'Naathi');
  moveCharacters('Alone', 'Lorathi');
  moveCharacters('Alone', 'Viper');
  moveCharacters('Alone', 'Sand');
  moveCharacters('Alone', 'Qyburn');
}

const renderChart = () => {
  const donutChart = document.querySelector('.donut-chart');

  new Chart(donutChart, {
    type: 'doughnut',
    data: {
      labels: house.map((houseElem) => houseElem.name),
      datasets: [
        {
          label: 'My First Dataset',
          data: house.map((houseElem) => houseElem.count),
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
  });
};

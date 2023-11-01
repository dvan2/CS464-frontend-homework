import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '../App.css';

ChartJS.register(ArcElement, Tooltip, Legend);

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

export function House() {
  const [house, setHouse] = React.useState([]);

  React.useEffect(() => {
    fetch('https://thronesapi.com/api/v2/Characters')
      .then((response) => response.json())
      .then((data) => setHouse(groupCharacters(data)));
  }, []);

  function groupCharacters(data) {
    const groupHouse = data.reduce((accumulate, current) => {
      let family = current.family;

      //Append 'House' if there is not
      if (!family.includes('House')) {
        family = `House ${family}`;
      }

      //Creating an object of family where the key is the family name
      //and its value is all the characters in the family
      /*
      Example: 
      {
        'House Stark': {
          [character1, character2,...],
          count: 2,
        }
        'House Lannister': {
          [character3, character4,...]
          count: 3,
        }
      }
      */
      if (!accumulate[family]) {
        //if the family doesn't exist create a family with empty character
        accumulate[family] = {
          characters: [],
          count: 0,
        };
      }

      //add the character to the family
      accumulate[family].characters.push(current);
      accumulate[family].count++;
      return accumulate;

      //initialize with empty accumulate {}
    }, {});

    const groupSingleCharacters = Object.keys(groupHouse).reduce(
      (acc, current) => {
        //If house have only 1 character move them in a house 'Alone'

        if (groupHouse[current].count === 1) {
          acc['Alone'] = acc['Alone'] || { count: 0, characters: [] };
          acc['Alone'].count++;
          acc['Alone'].characters.push(...groupHouse[current].characters);
        } else {
          acc[current] = groupHouse[current];
        }
        return acc;
      },
      {}
    );

    //loop over all the family keys
    return Object.keys(groupSingleCharacters).map((family) => ({
      name: family,
      characters: groupSingleCharacters[family].characters,
      count: groupSingleCharacters[family].count,
    }));
  }

  const data = {
    labels: house.map((element) => element.name),
    datasets: [
      {
        label: 'Character Count',
        data: house.map((element) => element.count),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='house--chart'>
      <Doughnut data={data} />
    </div>
  );
}

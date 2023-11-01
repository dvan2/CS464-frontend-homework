import React from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Character } from './Character';

export function Search() {
  const [userInput, setUserInput] = React.useState('');
  const [charactersArr, setCharactersArr] = React.useState([]);
  const [character, setCharacter] = React.useState([
    {
      firstName: 'Welcome',
      lastName: '',
      imageUrl:
        'https://img.freepik.com/free-photo/magnifying-glass_1385-637.jpg?w=740&t=st=1698820876~exp=1698821476~hmac=8cc3ce064be25af2032af7e1a912aafff37fcabe152ed9f53e0c1382075ce0ad',
    },
  ]);

  const searchCharacter = (event) => {
    event.preventDefault();

    //Check first or last name for a match
    const matchedCharacters = charactersArr.filter((current) => {
      return (
        current.firstName.toUpperCase() === userInput ||
        current.lastName.toUpperCase() === userInput
      );
    });

    if (matchedCharacters.length === 0) {
      //If there is no match
      setCharacter([
        {
          firstName: `Couldn't find any Match`,
          lastName: ``,
          imageUrl:
            'https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png',
        },
      ]);
    } else {
      setCharacter(matchedCharacters);
    }
  };

  React.useEffect(() => {
    fetch('https://thronesapi.com/api/v2/Characters')
      .then((response) => response.json())
      .then((data) => setCharactersArr(data));
  }, []);

  return (
    //https://mui.com/material-ui/react-text-field/
    <Box
      onSubmit={searchCharacter}
      component='form'
      noValidate
      autoComplete='off'
      className='search-bar'
    >
      <TextField
        fullWidth
        id='outlined-search'
        label='Search Character'
        type='search'
        onChange={(event) => setUserInput(event.target.value.toUpperCase())}
      />
      <div className='characters'>
        {character.map((element) => (
          <Character
            key={element.id}
            fullName={`${element.firstName} ${element.lastName}`}
            img={element.imageUrl}
          />
        ))}
      </div>
    </Box>
  );
}

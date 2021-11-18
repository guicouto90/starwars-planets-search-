const url = 'https://swapi-trybe.herokuapp.com/api/films/';

export const fetchNameFilms = async () => {
  try {
    const fetch = await fetch(url);
    const results = await fetch.json();
    return results;
  } catch (error) {
    console.error(error);
  }
}; 

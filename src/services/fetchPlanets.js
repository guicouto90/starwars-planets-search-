const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchPlanets = async () => {
  try {
    const data = await fetch(url);
    const planets = await data.json();
    return planets.results;
  } catch (error) {
    console.error(error);
  }
};

export default fetchPlanets;

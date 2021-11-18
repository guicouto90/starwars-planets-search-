import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '.';
import fetchPlanets from '../services/fetchPlanets';
import { fetchNameFilms } from '../services/fetchNameFilms';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataRemoved, setDataRemoved] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadDrop, setLoadDrop] = useState(false);
  const [column, setColumn] = useState('');
  const [comparision, setComparision] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  const [columnValues, setColumnValues] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  /* 
    Films
    https://swapi-trybe.herokuapp.com/api/films/1 = The Phantom Menace
    https://swapi-trybe.herokuapp.com/api/films/2 = Attack of the Clones
    https://swapi-trybe.herokuapp.com/api/films/3 = Revenge of the Sith
    https://swapi-trybe.herokuapp.com/api/films/4 = A New Hope
    https://swapi-trybe.herokuapp.com/api/films/5 = The Empire Strikes Back
    https://swapi-trybe.herokuapp.com/api/films/6 = Return of the Jedi
  */

  const arrayFilms = [
    ['The Phantom Menace', 'Return of the Jedi'],
    ['Attack of the Clones'],
    ['Revenge of the Sith', 'A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
    ['Attack of the Clones', 'Revenge of the Sith', 'Return of the Jedi'],
    ['Revenge of the Sith'],
    ['Attack of the Clones'],
    ['The Empire Strikes Back'],
    ['Revenge of the Sith', 'A New Hope', 'The Empire Strikes Back', 'Return of The Jedi'],
    ['The Phantom Menace', 'Revenge of the Sith', 'A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
    ['The Phantom Menace']
  ]

  useEffect(() => {
    const getPlanets = async () => {
      const results = await fetchPlanets();
      let newArray = [];
      newArray = results.sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
      newArray.forEach((teste, index) => teste.films = arrayFilms[index]);
      console.log(newArray)
      setFilteredData(newArray);
      setData(results);
      setIsLoading(false);
    };

    const getNames = async () => {
      const names = await fetchNameFilms();
      console.log(names);
    }
    getPlanets();
    getNames();
  }, []);

  const context = {
    filters,
    setFilters,
    data,
    setData,
    filteredData,
    setFilteredData,
    isLoading,
    value,
    comparision,
    column,
    setValue,
    setComparision,
    setColumn,
    columnValues,
    setColumnValues,
    dataRemoved,
    setDataRemoved,
    loadDrop,
    setLoadDrop,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf([]).isRequired,
};

export default Provider;

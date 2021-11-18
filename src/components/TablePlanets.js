import React, { useContext, useEffect } from 'react';
import Context from '../context';

function TablePlanets() {
  const {
    filteredData,
    isLoading,
    filters: { filterByName: { name } },
    loadDrop, setLoadDrop,
  } = useContext(Context);

  useEffect(() => {
    const loadPage = () => {
      if (loadDrop === true) {
        setLoadDrop(false);
      }
    };
    loadPage();
  }, [loadDrop, setLoadDrop]);

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Climate</th>
            <th>Created</th>
            <th>Diameter</th>
            <th>Edited</th>
            <th>Films</th>
            <th>Gravity</th>
            <th>Name</th>
            <th>Orbital Period</th>
            <th>Population</th>
            <th>Residents</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            <th>Terrain</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.filter((result) => result.name.includes(name))
            .map((result) => (
              <tr key={ result.name }>
                <td>{result.climate}</td>
                <td>{result.created}</td>
                <td>{result.diameter}</td>
                <td>{result.edited}</td>
                <td>{result.films}</td>
                <td>{result.gravity}</td>
                <td data-testid="planet-name">{result.name}</td>
                <td>{result.orbital_period}</td>
                <td>{result.population}</td>
                <td>{result.population}</td>
                <td>{result.residents}</td>
                <td>{result.rotation_period}</td>
                <td>{result.surface_water}</td>
                <td>{result.terrain}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}

//

export default TablePlanets;

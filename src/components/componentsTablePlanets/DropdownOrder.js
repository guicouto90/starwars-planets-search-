import React, { useContext } from 'react';
import Context from '../../context';

function DropdownOrder() {
  const {
    filteredData, setFilteredData,
    filters, setFilters,
    filters: { order: { sort, column } },
    setLoadDrop,
  } = useContext(Context);

  const arrayColumn = [
    'Climate',
    'Created',
    'Diameter',
    'Edited',
    'Films',
    'Gravity',
    'Name',
    'Orbital_Period',
    'Population',
    'Residents',
    'Rotation Period',
    'Surface Water',
    'Terrain',
  ];

  const handleOnClickRadio = ({ target }) => {
    setFilters({
      ...filters,
      order: {
        column,
        sort: target.value,
      },
    });
  };

  const handleOnChangeSelect = ({ target }) => {
    setFilters({
      ...filters,
      order: {
        column: target.value.toLowerCase(),
        sort,
      },
    });
  };

  // Funcao para ordenar asc ou desc
  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  const ascOrDescSort = () => {
    let newArray = [];
    switch (sort) {
    case 'ASC':
      if (column === 'diameter'
          || column === 'population'
          || column === 'residents'
          || column === 'surface water'
          || column === 'orbital_period') {
        newArray = filteredData.sort((a, b) => ((Number(a[column]) > Number(b[column])) ? 1 : ((Number(b[column]) > Number(a[column])) ? -1 : 0)));
      } else {
        newArray = filteredData.sort((a, b) => ((a[column] > b[column]) ? 1 : ((b[column] > a[column]) ? -1 : 0)));
      }
      setFilteredData(newArray);
      break;

    case 'DESC':
      if (column === 'diameter'
          || column === 'population'
          || column === 'residents'
          || column === 'surface water'
          || column === 'orbital_period') {
        newArray = filteredData.sort((a, b) => ((Number(a[column]) > Number(b[column])) ? -1 : ((Number(b[column]) > Number(a[column])) ? 1 : 0)));
      } else {
        newArray = filteredData.sort((a, b) => ((a[column] > b[column]) ? -1 : ((b[column] > a[column]) ? 1 : 0)));
      }
      setFilteredData(newArray);
      break;

    default:
      return filteredData;
    }
  };

  const handleOnClickSort = () => {
    ascOrDescSort();
    setLoadDrop(true);
  };

  return (
    <section>
      <h5>Ordene de forma ascendente ou descendente</h5>
      <div>
        <label>
          Selecione a coluna:
          <select
            data-testid="column-sort"
            value={ column }
            onChange={ handleOnChangeSelect }
          >
            {arrayColumn.map((column) => <option key={ column }>{ column.toLowerCase() }</option>)}
          </select>
        </label>
        <label>
          Ascendente:
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            value="ASC"
            name="sort"
            onClick={ handleOnClickRadio }
          />
        </label>
        <label>
          Descendente:
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            value="DESC"
            name="sort"
            onClick={ handleOnClickRadio }
          />
        </label>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ handleOnClickSort }
        >
          Selecionar
        </button>
      </div>
    </section>
  );
}

export default DropdownOrder;

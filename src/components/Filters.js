import React, { useContext } from 'react';
import Context from '../context';
import '../css/Filters.css';
import DropdownOrder from './componentsTablePlanets/DropdownOrder';

function Filters() {
  const {
    setFilteredData, filteredData,
    filters, setFilters,
    filters: { filterByNumericValues },
    column, setColumn,
    comparision, setComparision,
    value, setValue,
    columnValues, setColumnValues,
    dataRemoved, setDataRemoved,
  } = useContext(Context);

  // Funcao para alterar o valor do input name
  const handleOnChangeName = ({ target }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
  };

  // Funcao para adicionar os filtros selecionados
  const addNumericFilters = () => {
    const filterArray = { column, comparision, value };
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, filterArray],
    });
  };

  // Funcao para remover valores do filtro "Column"
  const removeColumn = () => {
    let newColumns = [];
    newColumns = columnValues.filter((result) => result !== column);
    setColumnValues(newColumns);
  };

  // Funcoes para alterar os valores dos filtros
  const handleOnChangeColumn = ({ target }) => {
    setColumn(target.value);
  };

  const handleOnChangeComparision = ({ target }) => {
    setComparision(target.value);
  };

  const handleOnChangeValue = ({ target }) => {
    setValue(Number(target.value));
  };
  // ================================================

  // Funcao para filtrar os filtros selecionados:
  const selectFilter = () => {
    let newArray = [];
    let newArrayRemove = [];
    switch (comparision) {
    case 'maior que':
      newArray = filteredData.filter((result) => Number(result[column]) > value);
      newArrayRemove = filteredData.filter((result) => !newArray.includes(result));
      setFilteredData(newArray);
      setDataRemoved([...dataRemoved, newArrayRemove]);
      break;
    case 'menor que':
      newArray = filteredData.filter((result) => Number(result[column]) < value);
      newArrayRemove = filteredData.filter((result) => !newArray.includes(result));
      setFilteredData(newArray);
      setDataRemoved([...dataRemoved, newArrayRemove]);
      break;
    case 'igual a':
      newArray = filteredData.filter((result) => Number(result[column]) === value);
      newArrayRemove = filteredData.filter((result) => !newArray.includes(result));
      setFilteredData(newArray);
      setDataRemoved([...dataRemoved, newArrayRemove]);
      break;
    default:
      return filteredData;
    }
  };

  const handleOnClickAdd = () => {
    addNumericFilters();
    selectFilter();
    removeColumn();
  };

  //= ====Funcoes para remover os filtros:

  const removeFilter = (index) => {
    let newFilter = [];
    newFilter = filterByNumericValues.filter((result, idx) => idx !== index);
    setColumnValues([...columnValues, filterByNumericValues[index].column]);
    setFilters({
      ...filters,
      filterByNumericValues: newFilter,
    });
  };

  const removeSelectFilter = (index) => {
    const newArray = filteredData.concat(dataRemoved[index]);
    dataRemoved.splice(index, 1);
    setDataRemoved(dataRemoved);

    /* filteredData.map((data) => newArray.push(data));
    console.log(newArray);
    dataRemoved[index].forEach((data) => newArray.push(data));
    console.log(newArray); */
    setFilteredData(newArray);
  };

  const handleOnClickRemove = (index) => {
    removeFilter(index);
    removeSelectFilter(index);
  };

  return (
    <section className="container-filters">
      <div>
        <h1>StarWars Searching Planets</h1>
      </div>
      <div className="container-name-filter">
        <label htmlFor="name-filter">
          Digite o nome do planeta a ser filtrado:
          <input
            type="text"
            data-testid="name-filter"
            id="name-filter"
            name="name-filter"
            onChange={ handleOnChangeName }
          />
        </label>
      </div>
      <div>
        <h3>Selecione um filtro: </h3>
        <label htmlFor="column-filter">
          Coluna:
          <select
            data-testid="column-filter"
            type="text"
            id="column-filter"
            name="column-filter"
            value={ column }
            onChange={ handleOnChangeColumn }
          >
            {columnValues.map((result) => (
              <option
                value={ result }
                key={ result }
              >
                {result}
              </option>))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Comparação:
          <select
            data-testid="comparison-filter"
            type="text"
            id="comparison-filter"
            name="comparison-filter"
            value={ comparision }
            onChange={ handleOnChangeComparision }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Valor numérico:
          <input
            type="number"
            data-testid="value-filter"
            id="value-filter"
            name="value-filter"
            onChange={ handleOnChangeValue }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleOnClickAdd }
        >
          Adicionar filtros
        </button>
      </div>
      <DropdownOrder />
      <div>
        {filterByNumericValues.map((result, index) => (
          <div
            data-testid="filter"
            key={ index }
          >
            <span key={ result.column }>
              Coluna:
              { result.column }
            </span>
            <span key={ result.comparision }>
              Comparação:
              { result.comparision }
            </span>
            <span key={ result.value }>
              Valor:
              { result.value }
            </span>
            <button
              type="button"
              onClick={ () => handleOnClickRemove(index) }
            >
              {' '}
              X
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Filters;

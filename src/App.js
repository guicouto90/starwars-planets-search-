import React from 'react';
import './App.css';
import Filters from './components/Filters';
import TablePlanets from './components/TablePlanets';
import Provider from './context/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <Filters />
      <TablePlanets />
    </Provider>

  );
}

export default App;

import React from 'react';


import TableState from './context/tableState';
import Home from './pages/Home'

const App = () => {
  return (
    <TableState>
      <div className="home">
        <Home />
      </div>
    </TableState>
  );
}

export default App;
